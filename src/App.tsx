import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopGrid } from './components/ShopGrid';
import { ProductSpotlight } from './components/ProductSpotlight';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartDrawer />
      <main className="pt-20">
        <Hero onShopClick={scrollToShop} />
        <ShopGrid />
        <ProductSpotlight />
        <AboutSection />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
