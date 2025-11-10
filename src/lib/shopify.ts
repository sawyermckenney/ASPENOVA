import type { CartItem } from '../contexts/CartContext';

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION ?? '2024-07';

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

function assertShopifyConfig() {
  if (!SHOPIFY_STORE_DOMAIN) {
    throw new Error('Missing Shopify store domain. Set VITE_SHOPIFY_STORE_DOMAIN.');
  }
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Missing Shopify Storefront access token. Set VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN.');
  }
  return {
    domain: SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, ''),
    token: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    version: SHOPIFY_API_VERSION,
  };
}

export async function createShopifyCheckout(items: CartItem[]): Promise<string> {
  const config = assertShopifyConfig();

  const lines = items.map((item) => {
    if (!item.shopifyVariantId) {
      throw new Error(`Missing Shopify variant mapping for "${item.name}".`);
    }
    return {
      quantity: item.quantity,
      merchandiseId: item.shopifyVariantId,
    };
  });

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
