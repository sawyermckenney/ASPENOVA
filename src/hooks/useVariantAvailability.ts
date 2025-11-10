import { useEffect, useMemo, useState } from 'react';
import {
  fetchProductVariantAvailabilityByHandle,
  fetchVariantAvailability,
  type VariantAvailability,
} from '../lib/shopify';

type AvailabilityMap = Record<string, VariantAvailability | undefined>;

const cache = new Map<string, VariantAvailability>();

function getCache(ids: string[]) {
  const map: AvailabilityMap = {};
  ids.forEach((id) => {
    if (cache.has(id)) {
      map[id] = cache.get(id);
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
      const idsToFetch = normalizedIds.filter((id) => !cache.has(id));
      if (!idsToFetch.length) return;

      try {
        if (productHandle) {
          const availabilityByHandle = await fetchProductVariantAvailabilityByHandle(productHandle);
          if (cancelled) return;

          setState((prev) => {
            const next = { ...prev };
            Object.entries(availabilityByHandle).forEach(([id, availability]) => {
              cache.set(id, availability);
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
              cache.set(id, availability);
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
    acc[id] = cache.get(id) ?? state[id];
    return acc;
  }, {});
}
