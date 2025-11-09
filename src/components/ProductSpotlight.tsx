import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ProductImageGallery } from './ProductImageGallery';

import frontViewImage from './images/productImages/hatLogo.JPG';
import leftViewImage from './images/productImages/leftSide.jpg';
import rightViewImage from './images/productImages/rightSide.jpg';
import insideViewImage from './images/productImages/inSide.jpg';
import backViewImage from './images/productImages/backSide.jpg';

// Product images for different views
const productImages = [
  {
    src: frontViewImage,
    alt: 'The Aspen Trucker Hat - Front View',
    label: 'FRONT VIEW',
  },
  {
    src: leftViewImage,
    alt: 'The Aspen Trucker Hat - Left Side View',
    label: 'LEFT VIEW',
  },
  {
    src: rightViewImage,
    alt: 'The Aspen Trucker Hat - Right Side View',
    label: 'RIGHT VIEW',
  },
  {
    src: backViewImage,
    alt: 'The Aspen Trucker Hat - Back View',
    label: 'BACK VIEW',
  },
  {
    src: insideViewImage,
    alt: 'The Aspen Trucker Hat - Inside Detail',
    label: 'INSIDE DETAIL',
  },
];

export function ProductSpotlight() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ProductImageGallery images={productImages} />
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
                A premium take on the classic city wear silhouette. The Aspen combines time-honored 5-panel 
                construction with contemporary streetwear sensibility, delivering comfort and style in equal measure.
              </p>
              
              <p className="text-zinc-600 leading-relaxed">
                Our signature embroidered upside-down logo sits proudly on the structured front panel, 
                delivering a distinct look that stands out. Finished with an adjustable 
                snapback closure for the perfect fit — this is city wear hat craftsmanship elevated.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-black tracking-wider">$39.99</span>
                <span className="text-zinc-400 text-sm">Free shipping on orders over $75</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm tracking-wider text-black">SPECIFICATIONS</h4>
                <ul className="space-y-1 text-zinc-600 text-sm">
                  <li>• 5-panel city wear construction</li>
                  <li>• Premium embroidered upside-down logo</li>
                  <li>• Adjustable snapback closure</li>
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