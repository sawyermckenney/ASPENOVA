import img1 from './images/gallery/_PBJ2824.JPEG';
import img2 from './images/gallery/_PBJ2867.JPEG';
import img3 from './images/gallery/_PBJ2900.JPEG';
import img4 from './images/gallery/FullSizeRender-preview.JPG';
import img5 from './images/gallery/IMG_4945.jpeg';

const images: { src: string; alt: string }[] = [
  { src: img1, alt: 'Aspenova lookbook' },
  { src: img2, alt: 'Aspenova lookbook' },
  { src: img3, alt: 'Aspenova lookbook' },
  { src: img4, alt: 'Aspenova lookbook' },
  { src: img5, alt: 'Aspenova lookbook' },
];

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
          {images.map((image, i) => (
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
