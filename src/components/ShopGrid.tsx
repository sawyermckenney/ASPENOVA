import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { toast } from 'sonner@2.0.3';
import hatLogo from './images/hatLogo.JPG';

const product = {
  id: 1,
  name: 'The Aspen — Black',
  price: 48,
  image: hatLogo,
  badge: 'DROP 01',
};

export function ShopGrid() {
  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to cart`);
  };

  return (
    <section id="shop" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="tracking-[0.2em] text-black mb-6">
            DROP 01
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-zinc-600">
              The beginning of something different.
            </p>
            <p className="text-black tracking-wide">
              One Product, One Drop, One Style
            </p>
            <p className="text-zinc-500 tracking-widest uppercase">
              12.01.25 @ 12 PM MDT
            </p>
            <p className="text-zinc-500 text-sm tracking-widest uppercase">
              Limited Quantities Available
            </p>
          </div>
        </motion.div>

        {/* Single Product Feature */}
        <div className="max-w-xl mx-auto">
          <ProductCard
            name={product.name}
            price={product.price}
            image={product.image}
            badge={product.badge}
            onAddToCart={() => handleAddToCart(product.name)}
          />
        </div>

        {/* Coming Soon Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="py-16 border-t border-zinc-200">
            <p className="text-zinc-400 tracking-[0.3em] text-sm mb-2">
              COMING SOON
            </p>
            <h3 className="text-black tracking-wide">
              Drop 02 — Winter 2025
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
