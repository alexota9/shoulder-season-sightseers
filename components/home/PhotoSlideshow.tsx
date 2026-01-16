'use client';

import { useEffect, useRef, useState } from 'react';

const photos = [
  { src: '/images/Morocco 11-25/nightsahara.JPEG', alt: 'Sahara Desert at night', destination: 'Morocco' },
  { src: '/images/Iceland/Iceland 2024/aurorariver.jpg', alt: 'Northern lights over river', destination: 'Iceland' },
  { src: '/images/Belgium 11-24/brugge1.jpg', alt: 'Bruges canals', destination: 'Belgium' },
  { src: '/images/Germany 11-24/christmasmarkets.jpg', alt: 'German Christmas markets', destination: 'Germany' },
  { src: '/images/Morocco 11-25/saharacamel.JPEG', alt: 'Sahara camel trek', destination: 'Morocco' },
  { src: '/images/Iceland/Iceland 2024/diamondbeach1.jpg', alt: 'Diamond Beach ice chunks', destination: 'Iceland' },
  { src: '/images/Belgium 11-24/bruggewindmill.jpg', alt: 'Bruges windmill', destination: 'Belgium' },
  { src: '/images/Germany 11-24/monchau.jpg', alt: 'Monschau village', destination: 'Germany' },
  { src: '/images/Morocco 11-25/fes.JPEG', alt: 'Fes medina', destination: 'Morocco' },
  { src: '/images/Iceland/Iceland 2024/blacksandtoll.jpg', alt: 'Black sand beach', destination: 'Iceland' },
  { src: '/images/Belgium 11-24/brugge2.jpg', alt: 'Bruges architecture', destination: 'Belgium' },
  { src: '/images/Germany 11-24/dom.jpg', alt: 'Cologne Cathedral', destination: 'Germany' },
  { src: '/images/Morocco 11-25/tangiersunsetbeach.JPEG', alt: 'Tangier sunset', destination: 'Morocco' },
  { src: '/images/Iceland/Iceland 2024/gulfoss.jpg', alt: 'Gullfoss waterfall', destination: 'Iceland' },
  { src: '/images/Belgium 11-24/bruggeboat.jpg', alt: 'Bruges boat tour', destination: 'Belgium' },
  { src: '/images/Germany 11-24/alley.jpg', alt: 'German alley', destination: 'Germany' },
  { src: '/images/Morocco 11-25/oasis.JPEG', alt: 'Desert oasis', destination: 'Morocco' },
  { src: '/images/Iceland/Iceland 2024/westfjords1.jpg', alt: 'Westfjords landscape', destination: 'Iceland' },
  { src: '/images/Belgium 11-24/antwerp.jpg', alt: 'Antwerp architecture', destination: 'Belgium' },
  { src: '/images/Germany 11-24/clock.jpg', alt: 'Historic clock tower', destination: 'Germany' },
];

export default function PhotoSlideshow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;

        // Reset scroll position when we've scrolled through all photos
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  return (
    <div className="w-full overflow-hidden py-12" style={{ backgroundColor: 'var(--section-bg)' }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold aurora-text mb-2">
          Our Journey in Photos
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>A glimpse into our adventures around the world</p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Duplicate photos for seamless loop */}
        {[...photos, ...photos].map((photo, index) => (
          <div
            key={`photo-${index}`}
            className="flex-shrink-0 w-80 h-64 relative group"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.classList.add('bg-gradient-to-br', 'from-teal/20', 'to-coral/20', 'flex', 'items-center', 'justify-center');
                  parent.innerHTML = '<div class="text-6xl opacity-50">📸</div>';
                }
              }}
              className="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-semibold">{photo.destination}</p>
                <p className="text-xs opacity-90">{photo.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Hover to pause • Auto-scrolling through our memories
        </p>
      </div>
    </div>
  );
}
