import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { useCart } from '../contexts/CartContext';
import { createShopifyCheckout } from '../lib/shopify';
import { useVariantAvailability } from '../hooks/useVariantAvailability';
import { navigate } from '../hooks/useRoute';
import { ecommerce } from '../lib/analytics';

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Fetch availability for all variant IDs currently in the cart
  const variantIds = useMemo(
    () => items.map((item) => item.shopifyVariantId).filter(Boolean) as string[],
    [items]
  );
  const availabilityMap = useVariantAvailability(variantIds);

  const handleIncrement = (itemId: string, currentQty: number, shopifyVariantId?: string) => {
    if (shopifyVariantId) {
      const availability = availabilityMap[shopifyVariantId];
      const maxQty = availability?.quantityAvailable;
      if (typeof maxQty === 'number' && currentQty >= maxQty) {
        toast.info(`Only ${maxQty} available.`);
        return;
      }
    }
    updateQuantity(itemId, currentQty + 1);
  };

  const handleCheckout = async () => {
    if (!items.length) {
      toast.info('Add something to the cart first.');
      return;
    }

    try {
      setIsProcessingCheckout(true);
      ecommerce.beginCheckout(items, totalPrice);
      const checkoutUrl = await createShopifyCheckout(items);
      toast.success('Redirecting to checkout...');
      clearCart();
      window.location.assign(checkoutUrl);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to start checkout. Please try again.';
      toast.error(message);
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate('/shop');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white sm:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <h2 className="text-[11px] tracking-[0.3em] uppercase">
                Cart {totalItems > 0 && `(${totalItems})`}
              </h2>
              <button
                onClick={closeCart}
                className="text-neutral-400 hover:text-black transition-colors"
                aria-label="Close cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-neutral-400 text-sm">Your cart is empty</p>
                  <button
                    onClick={handleContinueShopping}
                    className="mt-6 px-6 py-3 border border-black text-[11px] tracking-[0.2em] uppercase text-black hover:bg-black hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => {
                    const availability = item.shopifyVariantId
                      ? availabilityMap[item.shopifyVariantId]
                      : undefined;
                    const maxQty = availability?.quantityAvailable;
                    const atMax = typeof maxQty === 'number' && item.quantity >= maxQty;

                    return (
                      <div key={item.id} className="flex gap-4 pb-6 border-b border-neutral-100">
                        {/* Thumbnail */}
                        <div className="w-20 h-24 flex-shrink-0 bg-neutral-100 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <h3 className="text-[13px] tracking-wide text-black truncate">
                              {item.name}
                            </h3>
                            {item.variant && (
                              <p className="text-[11px] text-neutral-400 mt-0.5">{item.variant}</p>
                            )}
                            <p className="text-[13px] text-neutral-500 mt-1">${item.price.toFixed(2)}</p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity */}
                            <div className="flex items-center border border-neutral-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-black transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                              </button>
                              <span className="w-8 text-center text-[12px] text-black">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleIncrement(item.id, item.quantity, item.shopifyVariantId)}
                                disabled={atMax}
                                className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-black disabled:text-neutral-200 disabled:cursor-not-allowed transition-colors"
                                aria-label="Increase quantity"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                  <line x1="12" y1="5" x2="12" y2="19" />
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                              </button>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => {
                                removeItem(item.id);
                                toast.success('Removed from cart');
                              }}
                              className="text-neutral-300 hover:text-black transition-colors"
                              aria-label="Remove item"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-200 px-6 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-400">
                    Subtotal
                  </span>
                  <span className="text-sm text-black">${totalPrice.toFixed(2)}</span>
                </div>

                <p className="text-[11px] text-neutral-400">
                  Shipping calculated at checkout
                </p>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessingCheckout}
                  className="w-full py-4 bg-black text-white text-[11px] tracking-[0.25em] uppercase hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessingCheckout ? 'Redirecting...' : 'Checkout'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
