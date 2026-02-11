import { navigate } from '../hooks/useRoute';
import { useCart } from '../contexts/CartContext';
import headerLogo from './images/headerlogo.png';

export function Header() {
  const { openCart, totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            onClick={() => navigate('/')}
            className="hover:opacity-60 transition-opacity"
          >
            <img src={headerLogo} alt="Aspenova Club" className="h-10 w-auto" />
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <button
              onClick={() => navigate('/shop')}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-black transition-colors"
            >
              Shop
            </button>

            <button
              onClick={() => navigate('/gallery')}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-black transition-colors"
            >
              Gallery
            </button>

            <button
              onClick={() => navigate('/about')}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-black transition-colors"
            >
              About
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative text-neutral-500 hover:text-black transition-colors"
              aria-label="Open cart"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
