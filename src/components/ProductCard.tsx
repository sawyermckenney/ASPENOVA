import { navigate } from '../hooks/useRoute';
import type { ShopifyProduct, VariantAvailability } from '../lib/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
  availabilityMap: Record<string, VariantAvailability | undefined>;
}

export function ProductCard({ product, availabilityMap }: ProductCardProps) {
  const allSoldOut = product.variants.every((v) => {
    const availability = availabilityMap[v.id];
    return availability?.availableForSale === false || !v.availableForSale;
  });

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const hasRange = maxPrice > price;
  const primaryImage = product.images[0];
  const hoverImage = product.images[1];

  return (
    <button
      onClick={() => navigate(`/product/${product.handle}`)}
      className="group text-left w-full"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">
        {primaryImage && (
          <img
            src={primaryImage.url}
            alt={primaryImage.altText ?? product.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
              hoverImage ? 'group-hover:opacity-0' : ''
            }`}
            loading="lazy"
          />
        )}
        {hoverImage && (
          <img
            src={hoverImage.url}
            alt={hoverImage.altText ?? product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
        {allSoldOut && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-white text-[10px] tracking-[0.15em] uppercase text-neutral-500">
            Sold Out
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-0.5">
        <h3 className="text-[13px] tracking-wide text-black">{product.title}</h3>
        <p className="text-[13px] text-neutral-400">
          {hasRange ? `From $${price.toFixed(2)}` : `$${price.toFixed(2)}`}
        </p>
      </div>
    </button>
  );
}
