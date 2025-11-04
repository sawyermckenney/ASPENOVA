import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProductSpotlight() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-zinc-50 flex items-center justify-center p-12">
              <ImageWithFallback
                src="/src/components/images/hatLogo.JPG"
                alt="The Aspen Trucker Hat"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-zinc-200 -z-10" />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-black text-white text-xs tracking-widest">
                FEATURED
              </div>
              
              <h2 className="tracking-wide text-black">
                The Aspen
              </h2>
              
              <div className="h-px w-16 bg-zinc-800" />
              
              <p className="text-zinc-600 leading-relaxed">
                Born between the mountains and the streets. Aspenova Club flips perspective.
              </p>
              
              <p className="text-zinc-600 leading-relaxed">
                This isn't just a hat — it's a statement. The upside-down "ASPEN" logo 
                represents seeing the world from a different angle, challenging convention, 
                and embracing the rebellion of urban creativity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-black tracking-wider">$48</span>
                <span className="text-zinc-400 text-sm">Free shipping on orders over $75</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm tracking-wider text-black">Details</h4>
                <ul className="space-y-1 text-zinc-600 text-sm">
                  <li>• Premium mesh back construction</li>
                  <li>• Adjustable snapback closure</li>
                  <li>• Embroidered upside-down logo</li>
                  <li>• Structured front panel</li>
                  <li>• One size fits most</li>
                </ul>
              </div>

              <Button className="w-full md:w-auto px-12 py-6 bg-black text-white hover:bg-zinc-800 tracking-wider">
                View Product
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
