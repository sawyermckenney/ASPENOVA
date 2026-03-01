import { navigate } from '../hooks/useRoute';
import { useProducts } from '../hooks/useProducts';
import heroImage from '../components/images/hero.jpeg';

export function Hero() {
  const { products, isLoading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero Section - full viewport width */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Full-bleed hero image */}
        <img src={heroImage} alt="Aspenova Club" className="absolute inset-0 w-full h-full object-cover" />

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Text overlay - bottom left */}
        <div className="absolute bottom-10 left-6 md:bottom-16 md:left-16 right-6 md:right-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-8">
            Elevating
            <br />
            Perspective
          </h1>

          <div className="flex items-end justify-between">
            <button
              onClick={() => navigate('/shop')}
              className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 md:px-8 md:py-4 border border-white/20 hover:bg-white/20 transition-colors"
            >
              <span className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase">
                Shop Now
              </span>
            </button>

            <p className="text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-white/60">
              Aspenova Club
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {!isLoading && featured.length > 0 && (
        <section className="px-6 pb-24 pt-16">
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
