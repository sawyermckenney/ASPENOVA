import img1 from './images/gallery/_PBJ2824.webp';
import img2 from './images/gallery/_PBJ2867.webp';
import img3 from './images/gallery/_PBJ2900.webp';
import img4 from './images/gallery/FullSizeRender-preview.webp';
import img5 from './images/gallery/IMG_4945.webp';
import img7 from './images/gallery/IMG_0492.webp';
import img8 from './images/gallery/IMG_0554.webp';
import img9 from './images/gallery/IMG_0570.webp';
import img10 from './images/gallery/IMG_0573.webp';
import img11 from './images/gallery/IMG_0987.webp';
import img12 from './images/gallery/IMG_1050.webp';
import img13 from './images/gallery/IMG_0494.webp';

const images: { src: string; alt: string }[] = [
  { src: img1, alt: 'Aspenova lookbook' },
  { src: img2, alt: 'Aspenova lookbook' },
  { src: img3, alt: 'Aspenova lookbook' },
  { src: img4, alt: 'Aspenova lookbook' },
  { src: img5, alt: 'Aspenova lookbook' },
  { src: img7, alt: 'Aspenova lookbook' },
  { src: img8, alt: 'Aspenova lookbook' },
  { src: img9, alt: 'Aspenova lookbook' },
  { src: img10, alt: 'Aspenova lookbook' },
  { src: img11, alt: 'Aspenova lookbook' },
  { src: img12, alt: 'Aspenova lookbook' },
  { src: img13, alt: 'Aspenova lookbook' },
];

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const shuffledImages = shuffle(images);

export function Gallery() {
  return (
    <section className="pt-24 pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <h1 className="text-[11px] tracking-[0.3em] uppercase text-center mb-12">
        Gallery
      </h1>

      {images.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-neutral-400 text-sm tracking-wide">
            Coming soon — photos of the crew wearing Aspenova.
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {shuffledImages.map((image, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
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
