import { useState } from 'react';
import { navigate } from '../hooks/useRoute';
import { subscribeNewsletter } from '../lib/shopify';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await subscribeNewsletter(email.trim());
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <footer className="border-t border-neutral-200">
      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 md:py-20">
        {/* Newsletter */}
        <div className="mb-10 md:mb-16">
          <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-4">
            Stay updated on drops
          </p>
          {status === 'success' ? (
            <p className="text-sm text-black py-3">
              You're in — we'll keep you posted.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex items-center border border-neutral-200 rounded-full overflow-hidden max-w-sm"
            >
              <input
                type="email"
                required
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 px-4 md:px-5 py-3 text-sm bg-transparent outline-none placeholder:text-neutral-300"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 px-4 md:px-5 py-3 text-[11px] tracking-[0.15em] uppercase text-black hover:bg-neutral-50 transition-colors border-l border-neutral-200 disabled:opacity-50"
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-xs text-red-400 mt-2">{errorMsg}</p>
          )}
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
              Navigate
            </p>
            <nav className="flex flex-col gap-2.5">
              <button onClick={() => navigate('/shop')} className="text-left text-sm text-neutral-400 hover:text-black transition-colors">
                Shop
              </button>
              <button onClick={() => navigate('/gallery')} className="text-left text-sm text-neutral-400 hover:text-black transition-colors">
                Gallery
              </button>
              <button onClick={() => navigate('/about')} className="text-left text-sm text-neutral-400 hover:text-black transition-colors">
                About
              </button>
            </nav>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
              Follow us
            </p>
            <a
              href="https://www.instagram.com/aspenovaclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 hover:text-black transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
              Contact
            </p>
            <a
              href="mailto:ryanzsawyerm@googlegroups.com"
              className="text-sm text-neutral-400 hover:text-black transition-colors"
            >
              ryanzsawyerm@googlegroups.com
            </a>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
              Legal
            </p>
            <button onClick={() => navigate('/policies')} className="text-left text-sm text-neutral-400 hover:text-black transition-colors">
              Policies
            </button>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[10px] tracking-wider text-neutral-300 mt-10 md:mt-16">
          &copy; {new Date().getFullYear()} Aspenova Club. All rights reserved
        </p>
      </div>

      {/* Large brand text — white bg, clipped at bottom */}
      <div className="overflow-hidden border-t border-neutral-100">
        <p
          className="font-bold text-neutral-100 select-none text-center whitespace-nowrap"
          aria-hidden="true"
          style={{ fontSize: '6.5vw', lineHeight: '1', padding: '0.3em 0' }}
        >
          ASPENOVA CLUB
        </p>
      </div>
    </footer>
  );
}
