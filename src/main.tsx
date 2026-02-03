
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './contexts/CartContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initAnalytics } from './lib/analytics';

// Initialize analytics
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <CartProvider>
      <App />
    </CartProvider>
  </ErrorBoundary>
);
