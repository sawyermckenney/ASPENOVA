import { useState, useEffect, useCallback } from 'react';

export type Route =
  | { page: 'home' }
  | { page: 'shop' }
  | { page: 'gallery' }
  | { page: 'about' }
  | { page: 'policies' }
  | { page: 'product'; handle: string };

function parsePath(path: string): Route {
  const clean = path || '/';
  if (clean === '/') return { page: 'home' };
  if (clean === '/shop') return { page: 'shop' };
  if (clean === '/about') return { page: 'about' };
  if (clean === '/gallery') return { page: 'gallery' };
  if (clean === '/policies') return { page: 'policies' };
  const productMatch = clean.match(/^\/product\/(.+)$/);
  if (productMatch) return { page: 'product', handle: productMatch[1] };
  return { page: 'home' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parsePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function useNavigate() {
  return useCallback((path: string) => navigate(path), []);
}
