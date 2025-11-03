import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  badge?: string;
  onAddToCart?: () => void;
}

export function ProductCard({ name, price, image, badge, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs tracking-wider">
            {badge}
          </div>
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/10 flex items-center justify-center"
        >
          <span className="text-white tracking-[0.2em] text-sm">
            DROP 01 — THE ASPEN
          </span>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="tracking-wide text-black">{name}</h3>
          <p className="text-zinc-600">${price}</p>
        </div>

        <Button
          onClick={onAddToCart}
          className="w-full bg-black text-white hover:bg-zinc-800 transition-colors"
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
