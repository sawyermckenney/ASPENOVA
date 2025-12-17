import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopGrid } from './components/ShopGrid';
import { ProductSpotlight } from './components/ProductSpotlight';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { CartSidebar, CartToggle } from './components/CartSidebar';
import { VideoIntro } from './components/VideoIntro';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <VideoIntro
          onComplete={() => {
            setShowIntro(false);
            window.setTimeout(scrollToShop, 0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartToggle />
      <CartSidebar />
      <main className="pt-16">
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
