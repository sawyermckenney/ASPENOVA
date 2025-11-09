import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { cn } from './ui/utils';

interface ProductImage {
  src: string;
  alt: string;
  label: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Navigate to previous image
  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZoomed) {
        if (e.key === 'Escape') setIsZoomed(false);
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image Display */}
        <div className="relative aspect-square bg-zinc-50 flex items-center justify-center p-12 overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="w-full h-full object-contain cursor-zoom-in"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setIsZoomed(true)}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>

          {/* Zoom Button */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-5 h-5 text-black" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs tracking-wider backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
          
          {/* Decorative Element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-zinc-200 -z-10" />
        </div>

        {/* Thumbnail Navigation */}
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative aspect-square bg-zinc-50 border-2 transition-all duration-300 overflow-hidden group",
                selectedIndex === index
                  ? "border-black"
                  : "border-zinc-200 hover:border-zinc-400"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain p-2"
              />
              
              {/* Label Overlay */}
              <div className={cn(
                "absolute inset-x-0 bottom-0 bg-black/80 text-white text-[10px] tracking-wider py-1 text-center transition-opacity",
                selectedIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}>
                {image.label}
              </div>
              
              {/* Active Indicator */}
              {selectedIndex === index && (
                <motion.div
                  layoutId="activeImage"
                  className="absolute inset-0 ring-2 ring-black ring-offset-2"
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Current View Label */}
        <div className="text-center">
          <p className="text-zinc-500 text-xs tracking-widest uppercase">
            {images[selectedIndex].label}
          </p>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
            onClick={() => setIsZoomed(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Close zoom"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 text-white tracking-wider backdrop-blur-sm border border-white/20">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Zoomed Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[90vh] w-full"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </motion.div>

            {/* Image Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 text-white text-xs tracking-widest backdrop-blur-sm border border-white/20">
              {images[selectedIndex].label}
            </div>

            {/* Hint Text */}
            <div className="absolute bottom-6 right-6 text-white/60 text-xs tracking-wider">
              Press ESC to close • Use arrow keys to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}