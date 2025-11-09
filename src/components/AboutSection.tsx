import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import foundersChildImage from './images/founders/foundersChildImage.jpg';

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 border border-black text-xs tracking-widest">
                OUR STORY
              </div>
              
              <h2 className="tracking-wide text-black">
                Where Mountains Meet Streets
              </h2>
              
              <div className="h-px w-16 bg-zinc-800" />
            </div>

            <div className="space-y-6 text-zinc-600 leading-relaxed">
              <p>
                Aspenova Club started with two friends, Ryan and Sawyer, who always looked for the view nobody else saw—a perspective that challenges the ordinary and celebrates what happens when you flip the script.
              </p>
              
              <p>
                United by a shared drive for creativity and a love of the unexpected, they believed that greatness lives at the crossroads of contrast. Whether it’s city streets or mountain peaks, they set out to create pieces that embody that spirit—and a hat was the first step.
              </p>

              <p>
                This isn't just a drop of streetwear; this is the very beginning of a lifelong venture rooted in curiosity, friendship, and the conviction that fresh perspectives can change everything. One product, and a whole journey ahead.
              </p>

              <p className="italic text-black">
                Our story is just getting started.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-200">
              <div>
                <p className="text-black tracking-wider mb-1">Est.</p>
                <p className="text-zinc-600">2025</p>
              </div>
              <div>
                <p className="text-black tracking-wider mb-1">Location</p>
                <p className="text-zinc-600">Aspen, CO</p>
              </div>
              <div>
                <p className="text-black tracking-wider mb-1">Mission</p>
                <p className="text-zinc-600">Redefine Elevation</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-black">
              <ImageWithFallback
                src={foundersChildImage}
                alt="Aspenova Club founder as a child"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            
            {/* Decorative Frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-zinc-300 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
