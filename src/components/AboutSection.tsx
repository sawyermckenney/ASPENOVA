import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
                Aspenova Club is where urban grit meets mountain calm. A creative rebellion 
                stitched into every hat.
              </p>
              
              <p>
                We believe in the power of perspective — that the most interesting views 
                come when you flip the script, challenge the norm, and see things upside down.
              </p>

              <p>
                Born from the streets but inspired by elevation, our pieces are designed 
                for those who refuse to be defined by a single landscape. You're not just 
                mountain. You're not just city. You're the intersection.
              </p>

              <p className="italic text-black">
                This is more than streetwear. This is elevation culture.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-200">
              <div>
                <p className="text-black tracking-wider mb-1">Est.</p>
                <p className="text-zinc-600">2025</p>
              </div>
              <div>
                <p className="text-black tracking-wider mb-1">Location</p>
                <p className="text-zinc-600">Denver, CO</p>
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
                src="https://images.unsplash.com/photo-1513563326940-e76e4641069e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMG5pZ2h0fGVufDF8fHx8MTc2MjExMjM0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="City skyline at night"
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
