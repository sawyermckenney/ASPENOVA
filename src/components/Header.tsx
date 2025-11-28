import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import logoImage from './images/logoImage.svg';
import mobileLogo from './images/blackLogo.png';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const MOBILE_HEADER_BREAKPOINT = 768;
const COMPACT_HEIGHT_BREAKPOINT = 540;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompactLogo, setIsCompactLogo] = useState(false);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const updateLogoVariant = () => {
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;

      setIsCompactLogo(width < MOBILE_HEADER_BREAKPOINT || height < COMPACT_HEIGHT_BREAKPOINT);
    };

    updateLogoVariant();
    window.addEventListener('resize', updateLogoVariant);
    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener('resize', updateLogoVariant);
    visualViewport?.addEventListener('scroll', updateLogoVariant);

    return () => {
      window.removeEventListener('resize', updateLogoVariant);
      visualViewport?.removeEventListener('resize', updateLogoVariant);
      visualViewport?.removeEventListener('scroll', updateLogoVariant);
    };
  }, []);

  const logoSrc = isCompactLogo ? mobileLogo : logoImage;

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 tracking-[0.3em] text-lg md:text-xl text-black transition-colors hover:text-zinc-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ImageWithFallback
              src={logoSrc}
              alt="Aspenova logo"
              className="w-16 h-16 shrink-0 md:w-7 md:h-7"
            />
            ASPENOVA
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <motion.button
              onClick={() => scrollToSection('about')}
              className="tracking-wider uppercase text-sm text-black transition-colors hover:text-zinc-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Aspenova Club
            </motion.button>

            {/* <motion.button
              type="button"
              className="p-2 text-black transition-colors hover:text-zinc-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
            >
              <Search size={20} />
            </motion.button> */}

            <motion.button
              type="button"
              onClick={openCart}
              className="p-2 text-black transition-colors hover:text-zinc-600 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-black transition-colors hover:text-zinc-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-black/10"
          >
            <nav className="flex flex-col gap-4 px-6 py-6">
              <motion.button
                onClick={() => scrollToSection('about')}
                className="tracking-wider uppercase text-sm text-left py-2 text-black transition-colors hover:text-zinc-600"
                whileTap={{ scale: 0.98 }}
              >
                About Aspenova Club
              </motion.button>

              <div className="flex gap-6 pt-4 border-t border-black/10">
                <motion.button
                  type="button"
                  className="p-2 text-black transition-colors hover:text-zinc-600"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Search"
                >
                  <Search size={22} />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => {
                    openCart();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2 text-black transition-colors hover:text-zinc-600 relative"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart size={22} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                      {totalItems}
                    </span>
                  )}
                </motion.button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
