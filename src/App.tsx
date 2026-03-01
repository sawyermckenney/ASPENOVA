import { useRoute } from './hooks/useRoute';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopGrid } from './components/ShopGrid';
import { ProductDetail } from './components/ProductDetail';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Policies } from './components/Policies';
import { CartSidebar } from './components/CartSidebar';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

function PageContent({ page, handle }: { page: string; handle?: string }) {
  switch (page) {
    case 'home': return <Hero />;
    case 'shop': return <ShopGrid />;
    case 'gallery': return <Gallery />;
    case 'about': return <About />;
    case 'policies': return <Policies />;
    case 'product': return <ProductDetail handle={handle!} />;
    default: return <Hero />;
  }
}

export default function App() {
  const route = useRoute();
  const routeKey = route.page === 'product' ? `product-${route.handle}` : route.page;

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <CartSidebar />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={routeKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <PageContent page={route.page} handle={route.page === 'product' ? route.handle : undefined} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
