'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { destinations } from '@/lib/data/destinations';

// Dynamically import the map component (client-side only)
const TravelMap = dynamic(() => import('@/components/ui/TravelMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gradient-to-br from-teal/20 to-coral/20 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <div className="text-gray-400">Loading map...</div>
      </div>
    </div>
  ),
});

export default function DestinationsPage() {
  // Use state to store random images, initialized after hydration to prevent mismatch
  const [destinationImages, setDestinationImages] = useState<Array<typeof destinations[0]['images'][0] | null>>(() =>
    destinations.map((dest) => dest.images.length > 0 ? dest.images[0] : null)
  );

  // Generate random selections only on client after hydration
  useEffect(() => {
    const randomImages = destinations.map((dest) => {
      if (dest.images.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * dest.images.length);
      return dest.images[randomIndex];
    });
    setDestinationImages(randomImages);
  }, []);

  // Group destinations by continent
  const continents = destinations.reduce((acc, dest) => {
    if (!acc[dest.continent]) {
      acc[dest.continent] = [];
    }
    acc[dest.continent].push(dest);
    return acc;
  }, {} as Record<string, typeof destinations>);

  // Helper function to handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent) {
      const fallback = parent.querySelector('.fallback-icon');
      if (fallback) {
        (fallback as HTMLElement).style.display = 'flex';
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/Morocco%2011-25/nightsahara.JPEG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(3px)',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 aurora-text">
            Our Destinations
          </h1>
          <p
            className="text-xl text-white max-w-2xl mx-auto font-bold"
            style={{
              textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 6px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1)'
            }}
          >
            Countless memories and all the tips you need to explore the world on a budget.
          </p>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-12 px-4" style={{ backgroundColor: 'var(--section-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center aurora-text">
            Our Travel Map
          </h2>
          <p className="text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
            Click on any marker to learn more about that destination
          </p>
          <TravelMap />
        </div>
      </section>

      {/* Destinations by Continent */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto space-y-16">
          {Object.entries(continents).map(([continent, dests]) => (
            <div key={continent}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 aurora-text">
                {continent}
                <span className="text-teal ml-3">({dests.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dests.map((dest) => {
                  const destIndex = destinations.findIndex((d) => d.id === dest.id);
                  const randomImage = destinationImages[destIndex];
                  return (
                    <Link
                      key={dest.id}
                      href={`/destinations/${dest.id}`}
                      className="group"
                    >
                      <div className="rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden" style={{ backgroundColor: 'var(--card-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--card-border)' }}>
                        {/* Image */}
                        <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-teal/20 to-coral/20">
                          {randomImage ? (
                            <>
                              <img
                                src={randomImage.src}
                                alt={randomImage.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={handleImageError}
                              />
                              <div className="fallback-icon absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-teal/20 to-coral/20">
                                <div className="text-5xl">📍</div>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-5xl">📍</div>
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-gray-900/90 px-3 py-1 rounded-full text-sm font-semibold" style={{ color: 'var(--text-primary)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--card-border)' }}>
                            {dest.visited}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-teal transition-colors" style={{ color: 'var(--text-primary)' }}>
                            {dest.name}
                          </h3>
                          <p className="mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                            {dest.description}
                          </p>

                          {/* Highlights */}
                          <div className="space-y-2">
                            <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Top Highlights:</div>
                            <div className="flex flex-wrap gap-2">
                              {dest.highlights.slice(0, 3).map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-teal/20 text-teal-300 rounded-full"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Budget indicator */}
                          <div className="mt-4 flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span className="mr-2">💰</span>
                            <span>Budget tips included</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple/10 to-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 aurora-text">
            Ready to Start Your Own Adventure?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'var(--text-primary)' }}>
            Check out our travel tips and budget guides to plan your perfect trip.
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-gradient-to-r from-teal to-coral text-white rounded-full hover:shadow-lg transition-shadow font-semibold"
          >
            Read Travel Tips
          </Link>
        </div>
      </section>
    </div>
  );
}
