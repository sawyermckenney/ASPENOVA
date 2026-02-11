import { navigate } from '../hooks/useRoute';
import { useProducts } from '../hooks/useProducts';

export function Hero() {
  const { products, isLoading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-16">
        <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] font-light text-black uppercase">
            ASPENOVA CLUB
          </h1>
          <div className="w-12 h-px bg-neutral-300 my-8" />
          <p className="text-[13px] tracking-[0.2em] text-neutral-400 uppercase font-light">
            Elevating Perspective
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-16 px-10 py-3.5 border border-black text-[11px] tracking-[0.25em] uppercase text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      {!isLoading && featured.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-neutral-400">
                Featured
              </h2>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product) => {
                const image = product.images[0];
                const price = parseFloat(product.priceRange.minVariantPrice.amount);
                const allSoldOut = product.variants.every((v) => !v.availableForSale);

                return (
                  <button
                    key={product.id}
                    onClick={() => navigate(`/product/${product.handle}`)}
                    className="group text-left"
                  >
                    <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText ?? product.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                      {allSoldOut && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-white text-[10px] tracking-[0.15em] uppercase text-neutral-500">
                          Sold Out
                        </div>
                      )}
                    </div>
                    <p className="text-[12px] tracking-wide text-black">{product.title}</p>
                    <p className="text-[12px] text-neutral-400 mt-0.5">${price.toFixed(2)}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
