import { useRoute } from './hooks/useRoute';
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

export default function App() {
  const route = useRoute();

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <CartSidebar />
      <main>
        {route.page === 'home' && <Hero />}
        {route.page === 'shop' && <ShopGrid />}
        {route.page === 'gallery' && <Gallery />}
        {route.page === 'about' && <About />}
        {route.page === 'policies' && <Policies />}
        {route.page === 'product' && <ProductDetail handle={route.handle} />}
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
