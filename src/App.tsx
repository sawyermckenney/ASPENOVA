import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopGrid } from './components/ShopGrid';
import { ProductSpotlight } from './components/ProductSpotlight';
import { Lookbook } from './components/Lookbook';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04060d] via-[#070a12] to-white text-white/90">
      <div className="relative isolate">
        <Header />
        <main className="text-white/90">
          <Hero onShopClick={scrollToShop} />
          <ShopGrid />
          <ProductSpotlight />
          <Lookbook />
          <AboutSection />
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
