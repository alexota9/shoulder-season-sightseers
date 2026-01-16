'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Image {
  src: string;
  alt: string;
  caption?: string;
  destination?: string;
  destinationId?: string;
}

interface MasonryGalleryProps {
  images: Image[];
  limit?: number;
}

export default function MasonryGallery({ images, limit }: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const displayImages = limit ? images.slice(0, limit) : images;

  // Generate random heights for masonry effect
  const heights = ['h-48', 'h-64', 'h-80', 'h-56', 'h-72'];

  return (
    <>
      <div className="masonry-grid">
        {displayImages.map((image, index) => (
          <div key={index} className="masonry-item group cursor-pointer">
            <div
              className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-gray-200"
              onClick={() => setSelectedImage(image)}
            >
              {/* Actual Image */}
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 w-full">
                  {image.destination && (
                    <div className="text-white font-semibold">{image.destination}</div>
                  )}
                  {image.caption && (
                    <div className="text-white/80 text-sm">{image.caption}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <div className="relative w-full max-h-[70vh] mb-4 bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain max-h-[70vh]"
                  unoptimized
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {selectedImage.destination && (
                    <div className="font-semibold text-lg">{selectedImage.destination}</div>
                  )}
                  {selectedImage.caption && (
                    <div className="text-gray-600">{selectedImage.caption}</div>
                  )}
                </div>
                {selectedImage.destinationId && (
                  <Link
                    href={`/destinations/${selectedImage.destinationId}`}
                    className="px-6 py-2 bg-teal text-white rounded-full hover:bg-teal-600 transition-colors"
                  >
                    View Destination
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
