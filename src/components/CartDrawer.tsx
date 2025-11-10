import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { cn } from './ui/utils';
import { createShopifyCheckout } from '../lib/shopify';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const DESKTOP_HEADER_OFFSET = 72; // px roughly matches header height
const COMPACT_HEIGHT_BREAKPOINT = 540; // screens shorter than this need mobile layout safeguards

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total, clearCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const updateLayout = () => {
      const visualViewport = window.visualViewport;
      const currentWidth = visualViewport?.width ?? window.innerWidth;
      const currentHeight = visualViewport?.height ?? window.innerHeight;

      setIsMobile(currentWidth < 768 || currentHeight < COMPACT_HEIGHT_BREAKPOINT);
      setViewportHeight(currentHeight);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener('resize', updateLayout);
    visualViewport?.addEventListener('scroll', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
      visualViewport?.removeEventListener('resize', updateLayout);
      visualViewport?.removeEventListener('scroll', updateLayout);
    };
  }, []);

  const drawerHeightPx = useMemo(() => {
    if (!viewportHeight) return null;
    if (isMobile) {
      const available = Math.min(viewportHeight * 0.92, viewportHeight - 16);
      return Math.max(0, Math.round(available));
    }

    return Math.max(0, Math.round(viewportHeight - DESKTOP_HEADER_OFFSET));
  }, [isMobile, viewportHeight]);

  const drawerHeightValue =
    drawerHeightPx !== null
      ? `${drawerHeightPx}px`
      : isMobile
        ? '85vh'
        : `calc(100vh - ${DESKTOP_HEADER_OFFSET}px)`;

  const drawerMaxHeight = isMobile
    ? 'calc(100dvh - env(safe-area-inset-top, 0px))'
    : `calc(100dvh - ${DESKTOP_HEADER_OFFSET}px)`;

  const shouldEnableDrawerScroll =
    drawerHeightPx !== null && drawerHeightPx < COMPACT_HEIGHT_BREAKPOINT;

  const handleCheckout = async () => {
    if (!items.length) {
      toast.info('Add something to the cart first.');
      return;
    }

    try {
      setIsProcessingCheckout(true);
      const checkoutUrl = await createShopifyCheckout(items);
      toast.success('Redirecting you to Shopify checkout...');
      clearCart();
      window.location.assign(checkoutUrl);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to start checkout. Please try again.';
      toast.error(message);
      console.error('[Checkout] Failed to create Shopify checkout', error);
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  const handleShopClick = () => {
    closeCart();
    const section = document.getElementById('shop');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const panelVariants = useMemo(
    () => ({
      hidden: isMobile ? { y: '100%' } : { x: '100%' },
      visible: isMobile ? { y: 0 } : { x: 0 },
    }),
    [isMobile]
  );

  const hasItems = items.length > 0;

  const checkoutPaddingBottom = isMobile ? 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            className={cn(
              'fixed z-50 flex flex-col bg-white/90 text-black shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl',
              'dark:bg-zinc-900/90 dark:text-white',
              shouldEnableDrawerScroll ? 'overflow-y-auto' : 'overflow-hidden',
              isMobile
                ? 'bottom-0 left-0 right-0 rounded-t-[32px]'
                : 'right-0 border-l border-black/10 dark:border-white/10'
            )}
            style={{
              width: isMobile ? '100%' : 'clamp(320px, 33vw, 480px)',
              top: isMobile ? undefined : `${DESKTOP_HEADER_OFFSET}px`,
              height: drawerHeightValue,
              maxHeight: drawerMaxHeight,
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={{ type: 'tween', duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-black/10 dark:border-white/10">
              <div className="space-y-1">
                <p className="text-[11px] tracking-[0.4em] uppercase text-black/60 dark:text-white/60">
                  Aspenova Club
                </p>
                <h3 className="text-2xl tracking-[0.15em]">Your Cart</h3>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition hover:bg-white/60 dark:border-white/20 dark:hover:bg-white/10"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className={cn(
                'flex-1 px-6 py-6',
                shouldEnableDrawerScroll ? 'overflow-visible' : 'overflow-y-auto'
              )}
            >
              {!hasItems ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center text-black/60 dark:text-white/60">
                  <div className="flex h-28 w-28 aspect-square items-center justify-center rounded-full border border-dashed border-black/15 bg-black/5 text-black/40 dark:border-white/20 dark:bg-white/5 dark:text-white/50">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg tracking-[0.3em] uppercase">Cart Empty</p>
                    <p className="text-sm text-black/50 dark:text-white/50">
                      Drop 01 awaits—add a piece and elevate the fit.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleShopClick}
                    className="rounded-full border border-black bg-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-black/90 active:translate-y-0 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    Shop the Drop
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[110px_1fr] gap-5 rounded-3xl bg-white/90 p-5 shadow-2xl shadow-black/10 dark:bg-zinc-900/80"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-black/5 p-3 dark:bg-white/5">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="h-28 w-full rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <p className="text-sm font-medium uppercase tracking-[0.25em] text-black dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm font-semibold">{currency.format(item.price)}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex aspect-square h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[2ch] text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex aspect-square h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-black/40 transition hover:text-black dark:text-white/40 dark:hover:text-white"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="space-y-5 border-t border-black/10 px-6 py-6 dark:border-white/10"
              style={{ paddingBottom: checkoutPaddingBottom }}
            >
              <div className="flex items-center justify-between text-black dark:text-white">
                <span className="text-xs uppercase tracking-[0.35em] text-black/60 dark:text-white/60">
                  Subtotal
                </span>
                <span className="text-2xl tracking-[0.2em]">{currency.format(total)}</span>
              </div>
              <p className="text-xs text-black/50 tracking-[0.25em] dark:text-white/50">
                Taxes calculated at checkout
              </p>
              <button
                type="button"
                onClick={hasItems && !isProcessingCheckout ? handleCheckout : handleShopClick}
                disabled={!hasItems || isProcessingCheckout}
                className={cn(
                  'w-full rounded-full px-6 py-6 text-xs font-semibold uppercase tracking-[0.4em] transition',
                  hasItems
                    ? 'bg-black text-white shadow-[0_15px_40px_rgba(0,0,0,0.45)] hover:bg-black/90'
                    : 'bg-zinc-200 text-black'
                )}
              >
                {hasItems ? (isProcessingCheckout ? 'Redirecting…' : 'Checkout') : 'Empty'}
              </button>
              <p className="text-center text-[11px] uppercase tracking-[0.4em] text-black/80 dark:text-white">
                Free shipping over $75
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
