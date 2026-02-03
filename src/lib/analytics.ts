/**
 * Analytics tracking utilities
 * Supports Google Analytics 4 and Plausible Analytics
 */

// Environment configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
const ANALYTICS_ENABLED = import.meta.env.PROD; // Only track in production

// Google Analytics 4
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

/**
 * Initialize Google Analytics 4
 */
export function initGA() {
  if (!ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) return;

  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=None;Secure',
  });

  console.log('[Analytics] Google Analytics initialized');
}

/**
 * Initialize Plausible Analytics
 */
export function initPlausible() {
  if (!ANALYTICS_ENABLED || !PLAUSIBLE_DOMAIN) return;

  // Load Plausible script
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);

  console.log('[Analytics] Plausible initialized');
}

/**
 * Initialize all enabled analytics
 */
export function initAnalytics() {
  initGA();
  initPlausible();
}

/**
 * Track a page view (useful for SPAs)
 */
export function trackPageView(path?: string) {
  if (!ANALYTICS_ENABLED) return;

  const pagePath = path || window.location.pathname;

  // Google Analytics
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
    });
  }

  // Plausible automatically tracks page views
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (!ANALYTICS_ENABLED) return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: eventParams });
  }

  console.log('[Analytics] Event tracked:', eventName, eventParams);
}

/**
 * Track e-commerce events
 */
export const ecommerce = {
  /**
   * Track when user views a product
   */
  viewItem(product: {
    id: string;
    name: string;
    price: number;
    variant?: string;
  }) {
    trackEvent('view_item', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_variant: product.variant,
          price: product.price,
        },
      ],
    });
  },

  /**
   * Track when user adds item to cart
   */
  addToCart(product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    variant?: string;
  }) {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_variant: product.variant,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    });
  },

  /**
   * Track when user removes item from cart
   */
  removeFromCart(product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }) {
    trackEvent('remove_from_cart', {
      currency: 'USD',
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    });
  },

  /**
   * Track when user views cart
   */
  viewCart(items: any[], totalValue: number) {
    trackEvent('view_cart', {
      currency: 'USD',
      value: totalValue,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  },

  /**
   * Track when user initiates checkout
   */
  beginCheckout(items: any[], totalValue: number) {
    trackEvent('begin_checkout', {
      currency: 'USD',
      value: totalValue,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  },
};
