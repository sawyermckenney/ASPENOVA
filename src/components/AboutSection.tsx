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
                Elevating Perspective, Every Day
              </h2>
              
              <div className="h-px w-16 bg-zinc-800" />
            </div>

            <div className="space-y-6 text-zinc-600 leading-relaxed">
              <p>
                Aspenova Club was started by two friends, Sawyer and Ryan, who wanted to turn a feeling into something real. That feeling came from Aspen, Colorado, standing up on the mountain top looking down at a place we call home. Realizing how different life looks when you’re higher up and have a moment to reflect. 
              </p>
              
              <p>
                For us, ‘Elevating Perspective” isn’t just a phrase; it’s a way of living. It’s the practice of stepping outside your immediate thoughts and emotions to view a different perspective. Being able to choose compassion over reaction, pulling back from any negativity, and asking what truly matters. It is remembering that in a world this vast, we are small, and that smallness is freeing, not frightening.
              </p>

              <p>
                Aspenova Club is our way of bringing that mindset into everyday life. We created this brand to encourage people to rise above the fear, sadness, judgement, and overthinking. It’s about learning to move through this chaotic world with a calmness and compassion for others and yourself. 
              </p>

              <p className="italic text-black">
                We are glad to have you on this journey. 
                <br />
                This is just the beginning,
              </p>

              <div className="flex justify-end pt-2">
                <span className="block text-black text-base font-normal tracking-widest uppercase">
                  — ASPENOVA CLUB
                </span>
              </div>
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
                <p className="text-zinc-600">Elevate Perspective</p>
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
