import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
vi.stubEnv('VITE_SHOPIFY_STORE_DOMAIN', 'test-store.myshopify.com');
vi.stubEnv('VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN', 'test-token');
vi.stubEnv('VITE_SHOPIFY_STOREFRONT_API_VERSION', '2024-07');
