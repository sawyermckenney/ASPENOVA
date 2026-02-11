# CLAUDE.md - Project Context for Claude Code

## What This Is

Aspenova Club is a streetwear/lifestyle brand founded by Sawyer and Ryan, inspired by Aspen, Colorado. The brand's tagline is "Elevating Perspective" — the upside-down logo represents looking at the world differently.

This repository is the brand's **e-commerce storefront** that dynamically pulls all products from Shopify. It integrates with the Shopify Storefront API for product data, cart creation, checkout, and inventory.

## Tech Stack

- **React 18 + TypeScript** — SPA, no router (single-page scroll layout)
- **Vite 6** with SWC plugin for fast dev/build
- **Tailwind CSS v4** — utility-first styling
- **Motion (Framer Motion)** — used only for CartSidebar slide-in animation
- **Shopify Storefront API** — GraphQL for product fetching, cart creation, checkout redirect, and inventory queries
- **Radix UI** — accessible UI primitives (used via shadcn-style components in `src/components/ui/`)
- **Vitest + React Testing Library** — test framework

## Architecture

### Page Flow
1. **Hero** — full-viewport image carousel (3 Colorado mountain photos, CSS crossfade, 6s interval) with "Shop Now" CTA
2. **ShopGrid** — dynamic product grid fetched from Shopify, responsive (1/2/3 cols), with add-to-cart and variant selection
3. **AboutSection** — brand story ("Our Story" section about the founders)
4. **Footer** — newsletter signup, social links (Instagram), contact email

### Key Files
- `src/App.tsx` — main layout: Header → Hero → ShopGrid → AboutSection → Footer
- `src/main.tsx` — entry point, wraps app in CartProvider + ErrorBoundary
- `src/contexts/CartContext.tsx` — cart state with localStorage persistence
- `src/lib/shopify.ts` — Shopify Storefront API client (product fetch, cart create, variant availability)
- `src/lib/analytics.ts` — GA4 + Plausible event tracking (e-commerce events)
- `src/hooks/useProducts.ts` — hook that fetches all products from Shopify on mount
- `src/hooks/useVariantAvailability.ts` — hook for polling Shopify inventory with caching
- `src/components/ShopGrid.tsx` — dynamic product grid using useProducts + useVariantAvailability
- `src/components/ProductCard.tsx` — product card with variant selection, image hover, add-to-cart
- `src/components/CartSidebar.tsx` — slide-out cart drawer with checkout flow

### Environment Variables (in `.env`)
- `VITE_SHOPIFY_STORE_DOMAIN` — Shopify store domain
- `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` — Storefront API token (safe for client-side)
- `VITE_SHOPIFY_STOREFRONT_API_VERSION` — API version (default: 2024-07)
- `VITE_GA_MEASUREMENT_ID` — Google Analytics 4 (optional)
- `VITE_PLAUSIBLE_DOMAIN` — Plausible Analytics domain (optional)

## Commands

```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build → build/ directory
npm test             # Run tests once (vitest --run)
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## Deployment

- Hosted as static site (Netlify recommended — has `public/_redirects` for SPA fallback)
- Build output goes to `build/` directory
- Images are optimized during build (WebP conversion, 85% quality)

## Important Patterns

- **No router** — navigation is scroll-based (`scrollToSection()` utility)
- **Dynamic products** — all products are fetched from Shopify via `fetchProducts()` GraphQL query; no hardcoded product data
- **Variant selection** — ProductCard extracts option groups (Size, Color) from Shopify variants; single "Default Title" variants hide selectors
- **Cart persists** to localStorage under key `aspenova_cart`
- **Checkout** creates a Shopify cart via GraphQL, then redirects to Shopify's hosted checkout URL
- **Inventory** is fetched from Shopify and cached; shows "X left" when stock <= 5, "Sold Out" when unavailable
- **Minimalistic design** — typography-driven, black/white palette, CSS transitions only (no motion/framer-motion except CartSidebar)
- **Analytics** only fires in production (`import.meta.env.PROD`)
- **Vite aliases** map versioned package names (e.g., `sonner@2.0.3` → `sonner`) for import compatibility
- **Product images** come from Shopify CDN; hero/about images stored in `src/components/images/`

## Social / Contact
- Instagram: @aspenovaclub
- Email: ryanzsawyerm@googlegroups.com
- Domain: aspenova.com
