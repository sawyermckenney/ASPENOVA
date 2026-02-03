import { useEffect, useMemo, useState } from 'react';
import {
  fetchProductVariantAvailabilityByHandle,
  fetchVariantAvailability,
  type VariantAvailability,
} from '../lib/shopify';

type AvailabilityMap = Record<string, VariantAvailability | undefined>;

// Cache with timestamp for TTL (Time To Live)
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

interface CacheEntry {
  data: VariantAvailability;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

function isCacheValid(entry: CacheEntry | undefined): boolean {
  if (!entry) return false;
  return Date.now() - entry.timestamp < CACHE_TTL_MS;
}

function getCache(ids: string[]) {
  const map: AvailabilityMap = {};
  ids.forEach((id) => {
    const entry = cache.get(id);
    if (entry && isCacheValid(entry)) {
      map[id] = entry.data;
    }
  });
  return map;
}

interface Options {
  productHandle?: string;
}

export function useVariantAvailability(variantIds: string[], options?: Options): AvailabilityMap {
  const normalizedIds = useMemo(
    () => Array.from(new Set(variantIds.filter(Boolean))).sort(),
    [variantIds.join('|')]
  );
  const idsKey = normalizedIds.join('|');
  const productHandle = options?.productHandle;

  const [state, setState] = useState<AvailabilityMap>(() => getCache(normalizedIds));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const idsToFetch = normalizedIds.filter((id) => !isCacheValid(cache.get(id)));
      if (!idsToFetch.length) return;

      try {
        if (productHandle) {
          const availabilityByHandle = await fetchProductVariantAvailabilityByHandle(productHandle);
          if (cancelled) return;

          setState((prev) => {
            const next = { ...prev };
            Object.entries(availabilityByHandle).forEach(([id, availability]) => {
              cache.set(id, { data: availability, timestamp: Date.now() });
              next[id] = availability;
            });
            return next;
          });
          return;
        }

        const entries = await Promise.all(
          idsToFetch.map(async (id) => {
            try {
              const availability = await fetchVariantAvailability(id);
              cache.set(id, { data: availability, timestamp: Date.now() });
              return [id, availability] as const;
            } catch (error) {
              console.error(`[Inventory] Failed to fetch availability for ${id}`, error);
              return [id, undefined] as const;
            }
          })
        );

        if (cancelled) return;

        setState((prev) => {
          const next = { ...prev };
          entries.forEach(([id, availability]) => {
            if (availability) {
              next[id] = availability;
            }
          });
          return next;
        });
      } catch (error) {
        console.error('[Inventory] Failed to load availability', error);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [idsKey, productHandle]);

  return normalizedIds.reduce<AvailabilityMap>((acc, id) => {
    const entry = cache.get(id);
    acc[id] = (entry && isCacheValid(entry) ? entry.data : undefined) ?? state[id];
    return acc;
  }, {});
}
