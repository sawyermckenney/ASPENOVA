import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const lookbookImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1668343978900-0acf1d35eed6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBzdHlsZSUyMG1vZGVsfGVufDF8fHx8MTc2MjExOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Urban Movement',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1566750797799-8d69b31753f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjByb29mdG9wfGVufDF8fHx8MTc2MjExOTA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Rooftop Sessions',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1673264758225-86b5175422f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYWxsZXklMjBuaWdodHxlbnwxfHx8fDE3NjIxMTkwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'City Nights',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1671408913477-7fad16acaac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMHN0cmVldHxlbnwxfHx8fDE3NjIwNzU1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Neon Glow',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1668343978900-0acf1d35eed6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBzdHlsZSUyMG1vZGVsfGVufDF8fHx8MTc2MjExOTA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Street Culture',
  },
];

export function Lookbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background Grain */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white tracking-[0.2em] mb-4">
            LOOKBOOK
          </h2>
          <p className="text-white/70 italic tracking-wider">
            Every Peak Has Its Streets.
          </p>
        </motion.div>

        {/* Horizontal Scroll Gallery */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-8">
            <div className="flex gap-6 w-max">
              {lookbookImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative w-[350px] md:w-[450px] h-[500px] md:h-[600px] overflow-hidden"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt={image.caption}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Caption */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-8 left-8 right-8"
                  >
                    <p className="text-white tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {image.caption}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm tracking-wider">
              ← Scroll to explore →
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
