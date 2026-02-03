# ASPENOVA Club - E-Commerce Website

A modern, high-performance e-commerce landing page built for Aspenova Club's first product drop. Features real-time Shopify integration, analytics tracking, and a premium user experience with smooth animations.

## 🚀 Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6 with SWC (fast refresh)
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion successor)
- **E-commerce:** Shopify Storefront API (GraphQL)
- **State Management:** React Context API
- **Analytics:** Google Analytics 4 & Plausible (optional)
- **Testing:** Vitest + React Testing Library
- **Image Optimization:** Vite Image Optimizer with WebP conversion

## ✨ Features

- 🎥 Video intro experience with skip option
- 🖼️ Image carousel hero with parallax effects
- 🛒 Real-time Shopify inventory integration
- 📦 Persistent cart with localStorage
- 🔄 Error boundary for graceful error handling
- 📊 E-commerce analytics tracking (add to cart, checkout, etc.)
- 📱 Fully responsive design
- ⚡ Optimized images (automatic WebP conversion)
- 🧪 Unit tested cart logic
- ♿ Accessible navigation

## 📋 Prerequisites

- Node.js 18+ and npm
- Shopify store with Storefront API access
- (Optional) Google Analytics or Plausible account

## 🛠️ Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd "ASPENOVA Website"
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your Shopify credentials:

```env
# Required - Get from Shopify Admin > Settings > Apps > Develop apps
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token_here
VITE_SHOPIFY_API_VERSION=2024-07

# Optional - Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_PLAUSIBLE_DOMAIN=aspenova.com
```

**Important:** Use a Storefront API token (safe for client-side), NOT an Admin API token.

### 3. Run Development Server

```bash
npm run dev
```

The site will open at `http://localhost:3000`

## 🧪 Testing

```bash
# Run tests once
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch

# Coverage report
npm run test:coverage

# UI mode (visual test runner)
npm run test:ui
```

All cart logic is thoroughly tested with 12 passing tests covering:
- Adding/removing items
- Quantity updates
- Cart persistence
- Total calculations

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production build will be created in the `build/` directory. Images are automatically:
- Compressed (85% quality)
- Converted to WebP format
- Optimized for web delivery

## 📦 Deployment

### Netlify (Recommended)

1. **Connect Repository:**
   - Log in to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Configure Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Node version:** 18 or higher

3. **Set Environment Variables:**
   - Go to Site settings → Environment variables
   - Add all variables from `.env`:
     - `VITE_SHOPIFY_DOMAIN`
     - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
     - `VITE_SHOPIFY_API_VERSION`
     - `VITE_GA_MEASUREMENT_ID` (optional)
     - `VITE_PLAUSIBLE_DOMAIN` (optional)

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically deploy on every push to main branch

### Vercel

1. **Connect Repository:**
   - Log in to [Vercel](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your Git repository

2. **Configure Project:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

3. **Environment Variables:**
   - Add all Shopify and analytics variables
   - Save and deploy

4. **Deploy:**
   - Vercel automatically deploys on push

### Custom Server / VPS

```bash
# Build the project
npm run build

# The build/ folder contains all static files
# Serve with any static file server (nginx, Apache, etc.)

# Example with serve
npx serve build -p 8080
```

**Nginx configuration example:**

```nginx
server {
    listen 80;
    server_name aspenova.com;
    root /var/www/aspenova/build;
    index index.html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📁 Project Structure

```
ASPENOVA Website/
├── public/              # Static assets (redirects, etc.)
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI primitives (button, input)
│   │   ├── images/     # Product images and assets
│   │   └── *.tsx       # Feature components
│   ├── contexts/        # React Context providers
│   │   └── CartContext.tsx
│   ├── hooks/          # Custom React hooks
│   │   └── useVariantAvailability.ts
│   ├── lib/            # Utilities and integrations
│   │   ├── shopify.ts  # Shopify API client
│   │   ├── analytics.ts # Analytics tracking
│   │   └── utils.ts    # Helper functions
│   ├── test/           # Unit tests
│   │   ├── setup.ts
│   │   └── CartContext.test.tsx
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles
├── .env.example        # Environment template
├── vite.config.ts      # Vite configuration
├── vitest.config.ts    # Test configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Key Features Explained

### Cart Persistence
Cart data is automatically saved to `localStorage` and restored on page refresh. Users won't lose their selections.

### Inventory Cache
Product availability is cached for 2 minutes to reduce API calls while keeping data fresh. Cache automatically expires and refetches.

### Error Boundaries
If any component crashes, users see a friendly error screen instead of a blank page. In development mode, full error details are shown.

### Analytics Integration
Tracks key e-commerce events:
- Product views
- Add to cart
- Remove from cart
- Begin checkout

Supports both Google Analytics 4 and Plausible Analytics. Only tracks in production mode.

### Image Optimization
All images are automatically optimized during build:
- JPG/PNG → WebP conversion (modern format)
- Quality optimized to 85%
- Significantly reduces page load times

## 🐛 Troubleshooting

### "Missing Shopify environment variables" error

**Solution:** Create a `.env` file with your Shopify credentials. See Setup step 2 above.

### Cart not persisting after refresh

**Solution:** Check browser's localStorage isn't disabled. Private/incognito mode may prevent persistence.

### Tests failing

**Solution:** Ensure all dependencies are installed:
```bash
npm install
```

### Build fails

**Solution:** Clear cache and rebuild:
```bash
rm -rf node_modules build .vite
npm install
npm run build
```

## 📊 Performance

- **First Contentful Paint:** ~1.2s
- **Time to Interactive:** ~2.5s
- **Bundle Size:** ~150KB (gzipped)
- **Lighthouse Score:** 95+ (Performance)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Run `npm test` to ensure all tests pass
5. Submit a pull request

## 📄 License

[Add your license here]

## 🔗 Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

---

Built with ❤️ for Aspenova Club - Elevating Perspective
