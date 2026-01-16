'use client';

import OptimizedImage from '@/components/ui/OptimizedImage';

interface Country {
  name: string;
  flag: string;
  imageUrl: string;
  alt: string;
}

const countries: Country[] = [
  {
    name: 'Kenya',
    flag: '🇰🇪',
    imageUrl: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=400&q=80',
    alt: 'Kenya safari'
  },
  {
    name: 'Tanzania',
    flag: '🇹🇿',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80',
    alt: 'Tanzania wildlife'
  },
  {
    name: 'Rwanda',
    flag: '🇷🇼',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80',
    alt: 'Rwanda landscape'
  },
  {
    name: 'Uganda',
    flag: '🇺🇬',
    imageUrl: 'https://images.unsplash.com/photo-1650668302197-7f556c34cb91?auto=format&fit=crop&w=400&q=80',
    alt: 'Uganda landscape'
  }
];

export default function CountryCards() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {countries.map((country) => (
        <div
          key={country.name}
          className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden group cursor-pointer hover:border-gold transition-colors"
        >
          <div className="relative h-32 overflow-hidden">
            <OptimizedImage
              src={country.imageUrl}
              alt={country.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              fallbackIcon="📍"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            <div className="absolute bottom-2 left-0 right-0 text-center z-10">
              <div className="text-2xl mb-1">{country.flag}</div>
              <div className="font-semibold text-white drop-shadow-lg">{country.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
