import type { CartItem } from '../contexts/CartContext';

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION ?? '2024-07';

// Validate environment variables at module load time in development
if (import.meta.env.DEV) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.error(
      '❌ Missing Shopify environment variables!\n' +
      'Required: VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN\n' +
      'Copy .env.example to .env and fill in your Shopify credentials.'
    );
  }
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const VARIANT_AVAILABILITY_QUERY = /* GraphQL */ `
  query VariantAvailability($id: ID!) {
    productVariant(id: $id) {
      id
      availableForSale
      quantityAvailable
    }
  }
`;

const PRODUCT_VARIANT_AVAILABILITY_QUERY = /* GraphQL */ `
  query ProductVariantAvailability($handle: String!) {
    product(handle: $handle) {
      variants(first: 100) {
        edges {
          node {
            id
            availableForSale
            quantityAvailable
          }
        }
      }
    }
  }
`;

const normalizeHost = (value: string) => value.replace(/^https?:\/\//, '').replace(/\/+$/, '');

function assertShopifyConfig() {
  if (!SHOPIFY_STORE_DOMAIN) {
    throw new Error('Missing Shopify store domain. Set VITE_SHOPIFY_STORE_DOMAIN.');
  }
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Missing Shopify Storefront access token. Set VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN.');
  }
  return {
    domain: normalizeHost(SHOPIFY_STORE_DOMAIN),
    token: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    version: SHOPIFY_API_VERSION,
  };
}

export async function createShopifyCheckout(items: CartItem[]): Promise<string> {
  const config = assertShopifyConfig();

  const lineMap = new Map<string, number>();
  for (const item of items) {
    if (!item.shopifyVariantId) {
      throw new Error(`Missing Shopify variant mapping for "${item.name}".`);
    }
    lineMap.set(item.shopifyVariantId, (lineMap.get(item.shopifyVariantId) ?? 0) + item.quantity);
  }

  const lines = Array.from(lineMap.entries()).map(([variantId, quantity]) => ({
    quantity,
    merchandiseId: variantId,
  }));

  const response = await fetch(
    `https://${config.domain}/api/${config.version}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.token,
      },
      body: JSON.stringify({
        query: CART_CREATE_MUTATION,
        variables: { lines },
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.errors?.[0]?.message ?? 'Unable to reach Shopify.');
  }

  const userErrors: Array<{ message: string }> | undefined = result?.data?.cartCreate?.userErrors;
  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors.map((error) => error.message).join(', '));
  }

  const checkoutUrl: string | undefined = result?.data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error('Shopify did not return a checkout URL.');
  }

  return checkoutUrl;
}

export interface VariantAvailability {
  availableForSale: boolean;
  quantityAvailable: number | null;
}

export async function fetchVariantAvailability(variantId: string): Promise<VariantAvailability> {
  const config = assertShopifyConfig();

  const response = await fetch(
    `https://${config.domain}/api/${config.version}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.token,
      },
      body: JSON.stringify({
        query: VARIANT_AVAILABILITY_QUERY,
        variables: { id: variantId },
      }),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.errors?.[0]?.message ?? 'Unable to reach Shopify for inventory.');
  }

  const variant = result?.data?.productVariant;
  if (!variant) {
    throw new Error('Variant not found when fetching availability.');
  }

  return {
    availableForSale: Boolean(variant.availableForSale),
    quantityAvailable: typeof variant.quantityAvailable === 'number' ? variant.quantityAvailable : null,
  };
}

export async function fetchProductVariantAvailabilityByHandle(
  handle: string
): Promise<Record<string, VariantAvailability>> {
  const config = assertShopifyConfig();

  const response = await fetch(
    `https://${config.domain}/api/${config.version}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.token,
      },
      body: JSON.stringify({
        query: PRODUCT_VARIANT_AVAILABILITY_QUERY,
        variables: { handle },
      }),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.errors?.[0]?.message ?? 'Unable to reach Shopify for product inventory.');
  }

  const edges: Array<{ node?: { id?: string; availableForSale?: boolean; quantityAvailable?: number | null } }> =
    result?.data?.product?.variants?.edges ?? [];

  if (!result?.data?.product) {
    throw new Error(`Product with handle "${handle}" was not found.`);
  }

  const availabilityMap: Record<string, VariantAvailability> = {};
  edges.forEach((edge) => {
    const node = edge?.node;
    if (!node?.id) return;
    availabilityMap[node.id] = {
      availableForSale: Boolean(node.availableForSale),
      quantityAvailable: typeof node.quantityAvailable === 'number' ? node.quantityAvailable : null,
    };
  });

  return availabilityMap;
}
