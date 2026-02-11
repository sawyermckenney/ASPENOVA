import { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useVariantAvailability } from '../hooks/useVariantAvailability';

export function ShopGrid() {
  const { products, isLoading, error } = useProducts();

  const allVariantIds = useMemo(
    () => products.flatMap((p) => p.variants.map((v) => v.id)),
    [products]
  );

  const availabilityMap = useVariantAvailability(allVariantIds);

  return (
    <section className="pt-28 pb-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl tracking-[0.15em] font-light uppercase">
            Shop
          </h1>
          <div className="w-12 h-px bg-neutral-300 mt-6" />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-neutral-100" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 bg-neutral-100 w-3/4" />
                  <div className="h-3 bg-neutral-100 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-32">
            <p className="text-neutral-400 text-sm tracking-wide">
              Unable to load products. Please try again.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-32">
            <p className="text-neutral-400 text-sm tracking-wide">
              No products available.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                availabilityMap={availabilityMap}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
