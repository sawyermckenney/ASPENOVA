import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import hatLogo from './images/blackLogo.png';

const navItems = [
  { label: 'Shop', target: 'shop' },
  { label: 'Lookbook', target: 'lookbook' },
  { label: 'About', target: 'about' },
];

const navLinkAnimation = {
  hidden: { y: 14, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      delay: 0.25 + index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

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
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-white text-zinc-900 font-sans shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-3 sm:px-5 lg:px-8">
        <div className="flex w-full items-center justify-between gap-3 sm:gap-5">
          {/* Brand */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex min-w-0 items-center gap-3 text-zinc-900 transition-colors duration-300 hover:text-zinc-600"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Home"
          >
            <motion.img
              src={hatLogo}
              alt="Aspenova logo"
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-black/10 md:h-14 md:w-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <span className="truncate text-[0.6rem] font-medium uppercase tracking-[0.42em] text-zinc-600 sm:text-[0.62rem] sm:tracking-[0.5em] md:text-xs lg:tracking-[0.7em]">
              ASPENOVA
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center justify-center gap-10 md:flex lg:gap-14 xl:gap-16">
            {navItems.map((item, index) => (
              <motion.button
                key={item.target}
                custom={index}
                variants={navLinkAnimation}
                initial="hidden"
                animate="visible"
                onClick={() => scrollToSection(item.target)}
                className="group relative text-[0.56rem] uppercase tracking-[0.42em] text-zinc-500 transition-colors duration-300 hover:text-zinc-900 sm:text-[0.58rem] sm:tracking-[0.48em] md:text-[0.6rem] md:tracking-[0.52em] lg:text-[0.62rem] lg:tracking-[0.64em]"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative inline-flex items-center pb-1 after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-6 after:-translate-x-1/2 after:scale-x-0 after:bg-black after:opacity-0 after:transition-all after:duration-300 after:ease-out group-hover:after:scale-x-100 group-hover:after:opacity-100 md:after:w-8">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="flex min-w-0 items-center justify-end gap-2">
            <div className="hidden items-center gap-3 md:flex">
              <motion.button
                className="group rounded-full p-2 text-zinc-500 transition-colors duration-300 hover:bg-zinc-900/5 hover:text-zinc-900"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Search"
              >
                <Search size={18} />
              </motion.button>

              <motion.button
                className="group rounded-full p-2 text-zinc-500 transition-colors duration-300 hover:bg-zinc-900/5 hover:text-zinc-900"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={18} />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-zinc-700 transition-colors duration-300 hover:bg-zinc-900/5 md:hidden"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[45vh] flex-col gap-4 bg-[rgba(0,0,0,0.8)] px-6 py-6 text-white shadow-[0_22px_42px_rgba(0,0,0,0.55)] backdrop-blur-md"
            >
              {[shopAction, ...navItems].map((item) => (
                <motion.button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className="py-2 text-left text-sm uppercase tracking-[0.56em] text-white/80 transition-colors duration-300 hover:text-white"
                  whileTap={{ scale: 0.97 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="mt-6 flex gap-6 border-t border-white/10 pt-6">
                <motion.button
                  className="rounded-full p-3 text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                  whileTap={{ scale: 0.94 }}
                  aria-label="Search"
                >
                  <Search size={20} />
                </motion.button>

                <motion.button
                  className="rounded-full p-3 text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                  whileTap={{ scale: 0.94 }}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart size={20} />
                </motion.button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
