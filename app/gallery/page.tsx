'use client';

import { useState, useMemo } from 'react';
import MasonryGallery from '@/components/ui/MasonryGallery';
import { destinations } from '@/lib/data/destinations';

export default function GalleryPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get all images with metadata
  const allImages = useMemo(() => {
    return destinations.flatMap((dest) =>
      dest.images.map((img) => ({
        ...img,
        destination: dest.name,
        destinationId: dest.id,
        continent: dest.continent,
        country: dest.country,
      }))
    );
  }, []);

  // Filter images based on selected country and search query
  const filteredImages = useMemo(() => {
    let filtered = allImages;

    if (selectedCountry !== 'all') {
      filtered = filtered.filter((img) => img.destinationId === selectedCountry);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (img) =>
          img.destination.toLowerCase().includes(query) ||
          img.alt.toLowerCase().includes(query) ||
          img.caption?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allImages, selectedCountry, searchQuery]);

  // Get unique countries for filter
  const countries = useMemo(() => {
    return destinations.map((dest) => ({
      id: dest.id,
      name: dest.name,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/Germany%2011-24/dom.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(3px)',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1
            className="text-5xl md:text-6xl font-display font-bold mb-6"
            style={{
              color: '#70b8b8',
              textShadow: '0 0 30px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,1), 3px 3px 6px rgba(0,0,0,1), -2px -2px 0 rgba(0,0,0,1), 2px -2px 0 rgba(0,0,0,1), -2px 2px 0 rgba(0,0,0,1), 2px 2px 0 rgba(0,0,0,1)',
            }}
          >
            Photo Gallery
          </h1>
          <p
            className="text-xl text-white max-w-2xl mx-auto font-bold"
            style={{
              textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 6px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1)'
            }}
          >
            Explore our collection of travel photography from 16 countries around the world.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search photos by location, caption..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent bg-gray-800 text-gray-300 placeholder-gray-500"
              />
            </div>

            {/* Country Filter */}
            <div className="md:w-64">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent bg-gray-800 text-gray-300"
              >
                <option value="all">All Countries ({allImages.length})</option>
                {countries.map((country) => {
                  const count = allImages.filter((img) => img.destinationId === country.id).length;
                  return (
                    <option key={country.id} value={country.id}>
                      {country.name} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCountry !== 'all' || searchQuery) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-400">Active filters:</span>
              {selectedCountry !== 'all' && (
                <button
                  onClick={() => setSelectedCountry('all')}
                  className="px-3 py-1 bg-teal/10 text-teal rounded-full text-sm flex items-center gap-2 hover:bg-teal/20 transition-colors"
                >
                  {countries.find((c) => c.id === selectedCountry)?.name}
                  <span>×</span>
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1 bg-coral/10 text-coral rounded-full text-sm flex items-center gap-2 hover:bg-coral/20 transition-colors"
                >
                  Search: "{searchQuery}"
                  <span>×</span>
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedCountry('all');
                  setSearchQuery('');
                }}
                className="text-sm text-gray-400 hover:text-gray-200 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 text-gray-400">
            Showing {filteredImages.length} of {allImages.length} photos
          </div>

          {filteredImages.length > 0 ? (
            <MasonryGallery images={filteredImages} />
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2">No photos found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSelectedCountry('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-teal text-white rounded-full hover:bg-teal-600 transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple/10 to-gold/10 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Our Photo Journey
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-teal mb-2">{allImages.length}</div>
              <div className="text-gray-300">Photos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-coral mb-2">{destinations.length}</div>
              <div className="text-gray-300">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple mb-2">
                {new Set(destinations.map((d) => d.continent)).size}
              </div>
              <div className="text-gray-300">Continents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">∞</div>
              <div className="text-gray-300">Memories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
