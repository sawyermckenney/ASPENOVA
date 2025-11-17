import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { createShopifyCheckout } from '../lib/shopify';

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

  const handleShopClick = () => {
    closeCart();
    const section = document.getElementById('shop');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = async () => {
    if (!items.length) {
      toast.info('Add something to the cart first.');
      return;
    }

    try {
      setIsProcessingCheckout(true);
      const checkoutUrl = await createShopifyCheckout(items);
      toast.success('Redirecting to checkout…');
      clearCart();
      window.location.assign(checkoutUrl);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to start checkout. Please try again.';
      toast.error(message);
      console.error('[Checkout] Failed to create Shopify checkout', error);
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl sm:w-[450px]"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 p-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                <h2 className="tracking-wider text-black">
                  CART {totalItems > 0 && `(${totalItems})`}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="rounded-full p-2 transition-colors hover:bg-zinc-100"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-16 w-16 text-zinc-300" aria-hidden="true" />
                  <p className="mb-2 text-zinc-500">Your cart is empty</p>
                  <p className="text-sm text-zinc-400">Add items to get started</p>
                  <Button
                    onClick={handleShopClick}
                    className="mt-6 rounded-full border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow transition hover:bg-black/90"
                  >
                    Shop the Drop
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 border-b border-zinc-100 pb-6"
                    >
                      <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-50">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="mb-1 tracking-wide text-black">{item.name}</h3>
                          {item.variant && (
                            <p className="text-xs text-zinc-500 tracking-wider">{item.variant}</p>
                          )}
                          <p className="mt-1 text-sm text-zinc-600">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100/80 px-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white hover:text-black"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold text-zinc-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white hover:text-black"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              removeItem(item.id);
                              toast.success('Item removed from cart');
                            }}
                            className="group rounded-full p-2 transition-colors hover:bg-red-50"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-4 border-t border-zinc-200 bg-zinc-50 p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600">Subtotal</span>
                  <span className="text-zinc-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600">Shipping</span>
                  <span className="text-zinc-900">
                    {totalPrice >= 75 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>

                <div className="h-px bg-zinc-300" />

                <div className="flex items-center justify-between">
                  <span className="tracking-wider text-black">TOTAL</span>
                  <span className="tracking-wide text-black">${totalPrice.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isProcessingCheckout}
                  className="w-full py-6 bg-black text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-black/40 tracking-widest transition-all duration-300"
                >
                  {isProcessingCheckout ? 'REDIRECTING…' : 'CHECKOUT'}
                </Button>

                <p className="text-center text-xs text-zinc-500">Free shipping on orders over $75</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function CartToggle() {
  const { openCart, totalItems } = useCart();

  return (
    <motion.button
      onClick={openCart}
      className="fixed top-24 right-6 z-40 rounded-full bg-black p-4 text-white shadow-lg transition-all duration-300 hover:bg-zinc-800 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open cart"
    >
      <div className="relative">
        <ShoppingBag className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black bg-white text-xs text-black"
            >
              {totalItems}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
