# Copilot Instructions for ASPENOVA Website

## Project Overview
Modern React 18 e-commerce landing page for Aspenova Club's product drops. Built with Vite + TypeScript, Tailwind CSS, and real-time Shopify Storefront API integration.

## Architecture Patterns

### Cart Management (CartContext)
- **Location:** `src/contexts/CartContext.tsx`
- **Pattern:** React Context with localStorage persistence
- **Key feature:** Cart data syncs automatically to localStorage on every change
- **Analytics integration:** Every add/remove/update tracks to analytics via `ecommerce.*` functions
- **Structure:**
  - Items stored as `CartItem[]` with id, name, price, image, quantity, variant
  - Uses `shopifyVariantId` to link items to Shopify inventory
  - Computed totals: `totalItems`, `totalPrice` are memoized

### Shopify Integration (lib/shopify.ts)
- **Storefront API only** (safe for client-side, never use Admin API)
- **Environment config:** `VITE_SHOPIFY_STORE_DOMAIN`, `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `VITE_SHOPIFY_API_VERSION` (defaults to 2024-07)
- **Entry point:** `createShopifyCheckout()` converts CartItem[] into GraphQL mutation with lineItems map
- **Error pattern:** Missing `shopifyVariantId` throws descriptive error (products must have variant mapping)

### Inventory/Availability Hook (useVariantAvailability)
- **Location:** `src/hooks/useVariantAvailability.ts`
- **Pattern:** Custom hook with client-side cache (2-min TTL)
- **Two modes:**
  - Query by variantIds: Direct API call for known IDs
  - Query by productHandle: Batch fetch all variants for a product
- **Caching:** In-memory Map prevents redundant API calls; always safe to re-call hook
- **Returns:** `Record<string, VariantAvailability | undefined>` for loading states
- **Usage in ShopGrid:** Stock display derives from `quantityAvailable` minus `quantityInCart`

### Analytics (lib/analytics.ts)
- **Dual-provider support:** Google Analytics 4 + optional Plausible
- **Production-only:** Tracking disabled in dev mode (`import.meta.env.PROD`)
- **Key events tracked:**
  - `ecommerce.addToCart()` - called on cart item add/increment
  - `ecommerce.removeFromCart()` - called on item removal
  - `ecommerce.purchase()` - called on successful checkout redirect
- **Initialization:** Both providers auto-init if env vars present; safe to call without tokens

## Component Patterns

### Motion (Framer Motion)
- **Import:** `from 'motion/react'` (not `framer-motion`)
- **Used in:** Hero, Lookbook, ShopGrid for entrance animations
- **Pattern:** Use `motion` components for performant scroll-based and stagger animations

### Error Handling
- **ErrorBoundary:** Wraps entire app in `src/components/ErrorBoundary.tsx`
- **Pattern:** Component errors don't crash page; logs to console with fallback UI

### Image Handling
- **Optimization:** Vite automatically converts to WebP in production via `vite-plugin-image-optimizer`
- **Fallback:** `ImageWithFallback` component in `components/figma/` handles missing images gracefully
- **Development:** Images stay unoptimized for fast refresh cycles

## Development Workflows

### Setup
```bash
npm install
cp .env.example .env  # Fill in VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
npm run dev          # http://localhost:3000
```

### Testing
- **Framework:** Vitest + React Testing Library (happy-dom environment)
- **Setup file:** `src/test/setup.ts` (mock config applied here)
- **Commands:**
  - `npm test` - run once
  - `npm run test:watch` - auto-rerun on changes
  - `npm run test:ui` - visual runner at localhost
  - `npm run test:coverage` - coverage report
- **Key convention:** Mock analytics in tests with `vi.mock('../lib/analytics')`
- **Storage:** Tests clear localStorage in beforeEach to avoid cross-test pollution

### Build
- `npm run build` → `build/` directory optimized for production
- Vite with SWC plugin for fast refresh + compilation
- Image optimizer only runs in production builds

## Critical Implementation Notes

1. **Shopify Variant Mapping:** Products in ShopGrid hardcode `shopifyVariantId` (e.g., `VITE_SHOPIFY_PRIMARY_VARIANT_ID`). Missing IDs cause checkout to fail.

2. **Cart Persistence:** Cart reads from localStorage on mount (in CartProvider useState initializer). Always safe to reload—cart survives page refreshes.

3. **Inventory Display:** Stock count is `quantityAvailable - quantityInCart`. If `quantityAvailable` is null, show loading state; don't assume unlimited stock.

4. **Analytics Timing:** Events fire synchronously. For checkout redirect, call `ecommerce.purchase()` before window location redirect so analytics can flush.

5. **Environment Config:** All Shopify config validated at module load time in dev (non-breaking error log if missing). Undefined env vars silently fail at runtime in production.

## Common Tasks

- **Add new product:** Define in ShopGrid product object, map Shopify variant ID, hook inventory via `useVariantAvailability`
- **New section component:** Import Motion for animations; wrap CartContext usage in CartProvider (it's at App root)
- **Debug cart sync:** Check localStorage under key `aspenova_cart`; verify CartContext useEffect runs after state update
- **Inventory not loading:** Check Shopify API token, domain env vars; inspect network tab for GraphQL errors in DevTools
