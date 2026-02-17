const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export interface CloudinaryImage {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  url: string;
}

interface CloudinaryListResponse {
  resources: Array<{
    public_id: string;
    version: number;
    format: string;
    width: number;
    height: number;
  }>;
}

export async function fetchGalleryImages(): Promise<CloudinaryImage[]> {
  if (!CLOUD_NAME) {
    throw new Error('Missing Cloudinary cloud name. Set VITE_CLOUDINARY_CLOUD_NAME.');
  }

  const response = await fetch(
    `https://res.cloudinary.com/${CLOUD_NAME}/image/list/gallery.json`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch gallery images (${response.status}).`);
  }

  const data: CloudinaryListResponse = await response.json();

  return (data.resources ?? []).map((resource) => ({
    ...resource,
    url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/v${resource.version}/${resource.public_id}.${resource.format}`,
  }));
}
