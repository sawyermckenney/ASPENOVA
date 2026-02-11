import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';
import { navigate } from '../hooks/useRoute';
import { useProducts } from '../hooks/useProducts';
import { useVariantAvailability } from '../hooks/useVariantAvailability';
import { useCart } from '../contexts/CartContext';
import type { ShopifyProduct } from '../lib/shopify';

interface ProductDetailProps {
  handle: string;
}

export function ProductDetail({ handle }: ProductDetailProps) {
  const { products, isLoading, error } = useProducts();
  const product = products.find((p) => p.handle === handle);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="pt-28 pb-24 px-6 text-center">
        <p className="text-neutral-400 text-sm tracking-wide">Unable to load product.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-24 px-6 text-center">
        <p className="text-neutral-400 text-sm tracking-wide">Product not found.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 text-[11px] tracking-[0.2em] uppercase text-black underline underline-offset-4 hover:opacity-60"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: ShopifyProduct }) {
  const { addItem, items } = useCart();

  const variantIds = useMemo(() => product.variants.map((v) => v.id), [product.variants]);
  const availabilityMap = useVariantAvailability(variantIds, { productHandle: product.handle });

  const variants = product.variants;
  const hasSingleDefaultVariant = variants.length === 1 && variants[0].title === 'Default Title';

  const optionGroups = useMemo(() => {
    if (hasSingleDefaultVariant) return [];
    const groups: Record<string, string[]> = {};
    for (const v of variants) {
      for (const opt of v.selectedOptions) {
        if (!groups[opt.name]) groups[opt.name] = [];
        if (!groups[opt.name].includes(opt.value)) {
          groups[opt.name].push(opt.value);
        }
      }
    }
    return Object.entries(groups).map(([name, values]) => ({ name, values }));
  }, [variants, hasSingleDefaultVariant]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (hasSingleDefaultVariant) return {};
    const firstAvailable =
      variants.find((v) => v.availableForSale && availabilityMap[v.id]?.availableForSale !== false) ??
      variants[0];
    const initial: Record<string, string> = {};
    for (const opt of firstAvailable.selectedOptions) {
      initial[opt.name] = opt.value;
    }
    return initial;
  });

  const selectedVariant = useMemo(() => {
    if (hasSingleDefaultVariant) return variants[0];
    return (
      variants.find((v) => v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)) ??
      variants[0]
    );
  }, [variants, selectedOptions, hasSingleDefaultVariant]);

  const availability = availabilityMap[selectedVariant.id];
  const quantityAvailable = availability?.quantityAvailable ?? null;
  const isOutOfStock =
    availability?.availableForSale === false ||
    (typeof quantityAvailable === 'number' && quantityAvailable <= 0);
  const showLowStock = !isOutOfStock && typeof quantityAvailable === 'number' && quantityAvailable <= 5;

  const price = parseFloat(selectedVariant.price.amount);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Reset image when navigating to different product
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product.id]);

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const quantityInCart = items
      .filter((item) => item.shopifyVariantId === selectedVariant.id)
      .reduce((sum, item) => sum + item.quantity, 0);

    if (typeof quantityAvailable === 'number' && quantityInCart >= quantityAvailable) {
      toast.info('Maximum available quantity reached.');
      return;
    }

    const variantLabel = selectedVariant.title !== 'Default Title' ? selectedVariant.title : undefined;

    addItem({
      id: `${product.id}-${selectedVariant.id}`,
      name: product.title,
      price,
      image: product.images[0]?.url ?? '',
      variant: variantLabel,
      shopifyVariantId: selectedVariant.id,
    });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <section className="pt-20 pb-24">
      {/* Back link */}
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto py-6">
        <button
          onClick={() => navigate('/shop')}
          className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 hover:text-black transition-colors"
        >
          &larr; Back to Shop
        </button>
      </div>

      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
              {product.images[selectedImageIndex] && (
                <img
                  src={product.images[selectedImageIndex].url}
                  alt={product.images[selectedImageIndex].altText ?? product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-neutral-100 overflow-hidden transition-opacity ${
                      index === selectedImageIndex ? 'opacity-100 ring-1 ring-black' : 'opacity-50 hover:opacity-80'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image.url}
                      alt={image.altText ?? `${product.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <h1 className="text-2xl md:text-3xl tracking-[0.1em] font-light uppercase">
              {product.title}
            </h1>

            <p className="text-lg text-neutral-500 mt-3">${price.toFixed(2)}</p>

            {/* Inventory Status */}
            {isOutOfStock && (
              <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mt-3">
                Sold Out
              </p>
            )}
            {showLowStock && (
              <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mt-3">
                Only {quantityAvailable} left
              </p>
            )}

            <div className="w-full h-px bg-neutral-200 my-8" />

            {/* Variant Selectors */}
            {optionGroups.map((group) => (
              <div key={group.name} className="mb-6">
                <label className="block text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
                  {group.name}
                </label>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={group.name}>
                  {group.values.map((value) => {
                    const isSelected = selectedOptions[group.name] === value;
                    return (
                      <button
                        key={value}
                        onClick={() => setSelectedOptions((prev) => ({ ...prev, [group.name]: value }))}
                        role="radio"
                        aria-checked={isSelected}
                        className={`px-4 py-2.5 text-[11px] tracking-[0.15em] uppercase border transition-colors ${
                          isSelected
                            ? 'border-black bg-black text-white'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-4 bg-black text-white text-[11px] tracking-[0.25em] uppercase hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </button>

            {/* Description */}
            {product.description && (
              <div className="mt-10">
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-4">
                  Description
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDetailSkeleton() {
  return (
    <section className="pt-28 pb-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 animate-pulse">
          <div className="aspect-[3/4] bg-neutral-100" />
          <div className="lg:py-8 space-y-4">
            <div className="h-6 bg-neutral-100 w-3/4" />
            <div className="h-5 bg-neutral-100 w-1/4" />
            <div className="h-px bg-neutral-100 my-8" />
            <div className="h-10 bg-neutral-100 w-full" />
            <div className="space-y-2 mt-8">
              <div className="h-3 bg-neutral-100 w-full" />
              <div className="h-3 bg-neutral-100 w-5/6" />
              <div className="h-3 bg-neutral-100 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
