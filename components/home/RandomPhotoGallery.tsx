'use client';

import { useState, useEffect } from 'react';
import { destinations } from '@/lib/data/destinations';
import Image from 'next/image';

export default function RandomPhotoGallery() {
  const [randomImages, setRandomImages] = useState<any[]>([]);

  useEffect(() => {
    // Only use destinations with actual uploaded photos
    const destinationsWithPhotos = ['morocco', 'iceland', 'germany', 'belgium'];

    // Get all images from destinations with uploaded photos
    const allImages = destinations
      .filter(dest => destinationsWithPhotos.includes(dest.id))
      .flatMap((dest) =>
        dest.images.map((img) => ({
          ...img,
          destination: dest.name,
          destinationId: dest.id,
        }))
      );

    // Shuffle the images using Fisher-Yates algorithm
    const shuffled = [...allImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Select roughly 16 images
    const selectedImages = shuffled.slice(0, 16);

    setRandomImages(selectedImages);
  }, []);

  // Show placeholder while loading
  if (randomImages.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading photos...</div>
      </div>
    );
  }

  // Collage layout - perfectly balanced grid with no gaps
  // Define a pattern that repeats and fills space perfectly
  const sizePattern = [
    'col-span-2 row-span-2', // Large
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-2', // Tall
    'col-span-1 row-span-1', // Small
    'col-span-2 row-span-1', // Wide
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-2', // Tall
    'col-span-1 row-span-1', // Small
    'col-span-2 row-span-1', // Wide
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-1', // Small
    'col-span-2 row-span-2', // Large
    'col-span-1 row-span-1', // Small
  ];

  return (
    <div className="grid grid-cols-4 auto-rows-[200px] gap-2">
      {randomImages.slice(0, 16).map((image, index) => {
        const sizeClass = sizePattern[index % sizePattern.length];

        return (
          <div
            key={`${image.destinationId}-${index}`}
            className={`relative overflow-hidden rounded-lg group ${sizeClass}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-semibold">{image.destination}</p>
                {image.caption && (
                  <p className="text-white/80 text-xs">{image.caption}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
