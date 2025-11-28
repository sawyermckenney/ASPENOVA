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
  const handleViewProductClick = () => {
    const shopSection = document.getElementById('shop');
    shopSection?.scrollIntoView({ behavior: 'smooth' });
  };

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
                The Aspen is our flagship piece: a daily reminder to look at life from a higher vantage point. 
                Built on a classic 5-panel silhouette, it blends mountain mindset with city movement so it feels 
                as natural on a ridge line as it does on a late-night walk downtown.
              </p>
              
              <p className="text-zinc-600 leading-relaxed">
                Our signature upside down Aspenova mark is intentional, it flips the usual view, 
                a subtle reminder that perspective changes everything. Clean lines, considered details, 
                and an adjustable snapback closure come together in a hat built for people who move through 
                the city with a mountain state of mind.
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

              <Button
                className="w-full md:w-auto px-12 py-6 bg-black text-white hover:bg-zinc-800 tracking-wider"
                onClick={handleViewProductClick}
              >
                View Product
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
