import { useState, useEffect, useCallback } from 'react';

export type Route =
  | { page: 'home' }
  | { page: 'shop' }
  | { page: 'gallery' }
  | { page: 'about' }
  | { page: 'policies' }
  | { page: 'product'; handle: string };

function parseHash(hash: string): Route {
  const path = hash.replace('#', '') || '/';
  if (path === '/' || path === '') return { page: 'home' };
  if (path === '/shop') return { page: 'shop' };
  if (path === '/about') return { page: 'about' };
  if (path === '/gallery') return { page: 'gallery' };
  if (path === '/policies') return { page: 'policies' };
  const productMatch = path.match(/^\/product\/(.+)$/);
  if (productMatch) return { page: 'product', handle: productMatch[1] };
  return { page: 'home' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function useNavigate() {
  return useCallback((path: string) => navigate(path), []);
}
