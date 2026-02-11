import { navigate } from '../hooks/useRoute';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <button
            onClick={() => navigate('/')}
            className="text-[11px] tracking-[0.3em] uppercase text-black hover:opacity-60 transition-opacity"
          >
            ASPENOVA CLUB
          </button>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-[0.15em] uppercase text-neutral-400">
            <button
              onClick={() => navigate('/shop')}
              className="hover:text-black transition-colors"
            >
              Shop
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="hover:text-black transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hover:text-black transition-colors"
            >
              About
            </button>
            <a
              href="mailto:ryanzsawyerm@googlegroups.com"
              className="hover:text-black transition-colors"
            >
              Contact
            </a>
            <a
              href="https://www.instagram.com/aspenovaclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Instagram
            </a>
            <button
              onClick={() => navigate('/policies')}
              className="hover:text-black transition-colors"
            >
              Policies
            </button>
          </nav>

          {/* Copyright */}
          <p className="text-[10px] tracking-wider text-neutral-300">
            &copy; {new Date().getFullYear()} Aspenova Club
          </p>
        </div>
      </div>
    </footer>
  );
}
