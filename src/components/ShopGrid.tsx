import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { toast } from 'sonner@2.0.3';
import hatLogo from './images/productImages/hatLogo.JPG';
import { useCart } from '../contexts/CartContext';
import { useVariantAvailability } from '../hooks/useVariantAvailability';

const DEFAULT_VARIANT_ID = import.meta.env.VITE_SHOPIFY_PRIMARY_VARIANT_ID ?? '';
const PRODUCT_HANDLE = import.meta.env.VITE_SHOPIFY_PRODUCT_HANDLE ?? '';

const product = {
  id: 1,
  name: 'The Aspen — Black',
  price: 39.99,
  image: hatLogo,
  badge: 'DROP 01',
  shopifyVariantId: DEFAULT_VARIANT_ID,
};

export function ShopGrid() {
  const { addItem, getVariantQuantity } = useCart();
  const availabilityMap = useVariantAvailability(
    product.shopifyVariantId ? [product.shopifyVariantId] : [],
    {
      productHandle: PRODUCT_HANDLE || undefined,
    }
  );
  const variantAvailability = availabilityMap[product.shopifyVariantId];

  const quantityAvailable = variantAvailability?.quantityAvailable ?? null;
  const quantityInCart = getVariantQuantity(product.shopifyVariantId);
  const remainingStock =
    typeof quantityAvailable === 'number'
      ? Math.max(quantityAvailable - quantityInCart, 0)
      : undefined;
  const isOutOfStock =
    variantAvailability?.availableForSale === false ||
    (typeof quantityAvailable === 'number' && quantityAvailable <= quantityInCart);
  const isInventoryLoading = variantAvailability === undefined;

  const inventoryLabel = isInventoryLoading
    ? 'Checking inventory…'
    : isOutOfStock
      ? 'Sold Out'
      : typeof remainingStock === 'number'
        ? `${remainingStock} Left In Stock`
        : undefined;

  const inventoryTone: 'muted' | 'warning' | 'danger' =
    isOutOfStock || remainingStock === 0
      ? 'danger'
      : typeof remainingStock === 'number' && remainingStock <= 5
        ? 'warning'
        : 'muted';

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.info('This item is currently sold out.');
      return;
    }

    if (typeof quantityAvailable === 'number' && quantityInCart >= quantityAvailable) {
      toast.info('You have added the maximum available quantity.');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: 'Snowfield / Onyx',
      shopifyVariantId: product.shopifyVariantId,
    });
    toast.success(`${product.name} added to cart`);
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
            stockLeft={remainingStock}
            isOutOfStock={isOutOfStock}
            inventoryLabel={inventoryLabel}
            inventoryTone={inventoryTone}
            onAddToCart={handleAddToCart}
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
