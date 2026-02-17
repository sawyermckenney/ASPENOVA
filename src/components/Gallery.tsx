import { useMemo } from 'react';
import { useGalleryImages } from '../hooks/useGalleryImages';

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Gallery() {
  const { images, isLoading, error } = useGalleryImages();
  const shuffledImages = useMemo(() => shuffle(images), [images]);

  return (
    <section className="pt-24 pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <h1 className="text-[11px] tracking-[0.3em] uppercase text-center mb-12">
        Gallery
      </h1>

      {isLoading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden bg-neutral-100 animate-pulse"
              style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/5' : '1/1' }}
            />
          ))}
        </div>
      ) : error || images.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-neutral-400 text-sm tracking-wide">
            {error
              ? 'Unable to load gallery — please try again later.'
              : 'Coming soon — photos of the crew wearing Aspenova.'}
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {shuffledImages.map((image) => (
            <div key={image.public_id} className="break-inside-avoid overflow-hidden">
              <img
                src={image.url}
                alt="Aspenova lookbook"
                className="w-full block hover:opacity-90 transition-opacity"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
