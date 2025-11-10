
  # Shopify Landing Site Design

  This is a code bundle for Shopify Landing Site Design. The original project is available at https://www.figma.com/design/EBilkL10V7E0WBmNm5uhxp/Shopify-Landing-Site-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Shopify checkout integration

  1. Copy `.env.example` to `.env.local` (or `.env`) and populate it with your Shopify store details:
     - `VITE_SHOPIFY_STORE_DOMAIN` – your `myshopify.com` domain (without protocol).
     - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` – Storefront API access token with read access.
     - `VITE_SHOPIFY_STOREFRONT_API_VERSION` – optional, defaults to `2024-07`.
     - `VITE_SHOPIFY_PRIMARY_VARIANT_ID` – GraphQL ID for the product variant you are selling (`gid://shopify/ProductVariant/...`).
  2. Restart `npm run dev` after updating environment variables so Vite can pick them up.
  
