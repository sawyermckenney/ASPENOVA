import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import logoImage from './images/logoImage.svg';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <img src={logoImage} alt="Aspenova Logo" className="w-16 h-16 md:w-7 md:h-7" />
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
              About Us
            </motion.button>

            <motion.button
              className="p-2 text-black transition-colors hover:text-zinc-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
            >
              <Search size={20} />
            </motion.button>

            <motion.button
              className="p-2 text-black transition-colors hover:text-zinc-600 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {/* Cart count badge - optional */}
              {/* <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span> */}
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
                About Us
              </motion.button>

              <div className="flex gap-6 pt-4 border-t border-black/10">
                <motion.button
                  className="p-2 text-black transition-colors hover:text-zinc-600"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Search"
                >
                  <Search size={22} />
                </motion.button>

                <motion.button
                  className="p-2 text-black transition-colors hover:text-zinc-600"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart size={22} />
                </motion.button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
