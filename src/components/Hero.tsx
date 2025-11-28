import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from './images/heroImage.jpeg';
import heroImage2 from './images/heroImage2.jpeg';
import heroImage3 from './images/heroImage3.jpeg';
import heroImage4 from './images/heroImage4.jpeg';
import heroImage5 from './images/heroImage5.jpeg';

const HERO_IMAGES = [heroImage2, heroImage, heroImage4,];
const SLIDE_DURATION_MS = 6000;

interface HeroProps {
  onShopClick: () => void;
}

export function Hero({ onShopClick }: HeroProps) {
  const isFirstRender = useRef(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={isFirstRender.current ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <ImageWithFallback
              src={HERO_IMAGES[currentImage]}
              alt="Snowy Mountains Colorado"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          {/* Logo/Brand Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-white tracking-[0.3em] text-4xl md:text-6xl lg:text-7xl">
              ASPENOVA CLUB
            </h1>
          </motion.div>

          <p className="text-white/90 text-lg md:text-xl tracking-wide max-w-2xl mx-auto">
            For those who see the world differently.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="pt-8"
          >
            <Button
              onClick={onShopClick}
              className="px-12 py-6 bg-white text-black hover:bg-zinc-100 transition-all duration-300 tracking-widest shadow-xl hover:shadow-2xl"
            >
              Preview The Drop 
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
