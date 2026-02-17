import { useEffect, useState } from 'react';
import { fetchGalleryImages, type CloudinaryImage } from '../lib/cloudinary';

interface UseGalleryImagesResult {
  images: CloudinaryImage[];
  isLoading: boolean;
  error: string | null;
}

export function useGalleryImages(): UseGalleryImagesResult {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchGalleryImages();
        if (!cancelled) {
          setImages(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load gallery images.');
          console.error('[Gallery] Failed to fetch images', err);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { images, isLoading, error };
}
