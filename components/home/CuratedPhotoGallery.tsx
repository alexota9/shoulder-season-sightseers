'use client';

// Curated selection of best photos - flexible count for perfect layout
// Selected for visual diversity, quality, and representation of all trips

const curatedPhotos = [
  { src: '/images/Morocco 11-25/nightsahara.JPEG', alt: 'Sahara night sky', destination: 'Morocco', size: 'large' },
  { src: '/images/Iceland/Iceland 2024/blacksandtoll.jpg', alt: 'Black sand beach', destination: 'Iceland', size: 'small' },
  { src: '/images/Iceland/Iceland 2024/diamondbeach1.jpg', alt: 'Diamond Beach', destination: 'Iceland', size: 'small' },
  { src: '/images/Germany 11-24/dom.jpg', alt: 'Cologne Cathedral', destination: 'Germany', size: 'tall' },

  { src: '/images/Belgium 11-24/brugge1.jpg', alt: 'Bruges canals', destination: 'Belgium', size: 'small' },
  { src: '/images/Iceland/Iceland 2024/gulfoss.jpg', alt: 'Gullfoss waterfall', destination: 'Iceland', size: 'wide' },
  { src: '/images/Morocco 11-25/fesriad.JPEG', alt: 'Fes riad', destination: 'Morocco', size: 'small' },

  { src: '/images/Belgium 11-24/bruggewindmill.jpg', alt: 'Bruges windmill', destination: 'Belgium', size: 'small' },
  { src: '/images/Morocco 11-25/oasis.JPEG', alt: 'Desert oasis', destination: 'Morocco', size: 'small' },
  { src: '/images/Morocco 11-25/saharalissisilhouette.JPEG', alt: 'Sahara silhouette', destination: 'Morocco', size: 'tall' },
  { src: '/images/Germany 11-24/christmasmarkets.jpg', alt: 'Christmas markets', destination: 'Germany', size: 'small' },
  { src: '/images/Iceland/Iceland 2024/bruarfoss.jpg', alt: 'Bruarfoss waterfall', destination: 'Iceland', size: 'small' },

  { src: '/images/Belgium 11-24/bruggeboat.jpg', alt: 'Bruges boat', destination: 'Belgium', size: 'wide' },
  { src: '/images/Iceland/Iceland 2024/westfjords1.jpg', alt: 'Westfjords', destination: 'Iceland', size: 'small' },

  { src: '/images/Morocco 11-25/tangiersunsetpalm.JPEG', alt: 'Tangier sunset', destination: 'Morocco', size: 'small' },
  { src: '/images/Germany 11-24/monchau.jpg', alt: 'Monschau', destination: 'Germany', size: 'small' },
  { src: '/images/Morocco 11-25/marrakechsouk.JPEG', alt: 'Marrakech souk', destination: 'Morocco', size: 'small' },
  { src: '/images/Iceland/Iceland 2024/aurorashed.jpg', alt: 'Northern Lights', destination: 'Iceland', size: 'large' },
  { src: '/images/Morocco 11-25/essouriaboas.JPEG', alt: 'Essaouira boats', destination: 'Morocco', size: 'small' },

  { src: '/images/Belgium 11-24/antwerp.jpg', alt: 'Antwerp', destination: 'Belgium', size: 'small' },
  { src: '/images/Iceland/Iceland 2024/biebercanyon1.jpg', alt: 'Fjaðrárgljúfur', destination: 'Iceland', size: 'small' },
  { src: '/images/Germany 11-24/clock.jpg', alt: 'Historic clock', destination: 'Germany', size: 'small' },
];

export default function CuratedPhotoGallery() {
  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large': return 'col-span-2 row-span-2';
      case 'wide': return 'col-span-2 row-span-1';
      case 'tall': return 'col-span-1 row-span-2';
      default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-2">
      {curatedPhotos.map((photo, index) => (
        <div
          key={`photo-${index}`}
          className={`relative overflow-hidden rounded-lg group ${getSizeClass(photo.size)}`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.classList.add('bg-gradient-to-br', 'from-teal/20', 'to-coral/20');
                parent.innerHTML += '<div class="flex items-center justify-center h-full text-4xl">📸</div>';
              }
            }}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-semibold">{photo.destination}</p>
              <p className="text-white/80 text-xs">{photo.alt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
