'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fallbackIcon?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality = 75,
  fallbackIcon = '📸',
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-teal/20 to-coral/20 ${className}`}>
        <div className="text-6xl opacity-50">{fallbackIcon}</div>
      </div>
    );
  }

  // Use regular img for local images to avoid Next.js Image optimization issues with missing images
  if (src.startsWith('/images/')) {
    return (
      <>
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          onLoad={() => setLoading(false)}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          style={{ objectFit }}
        />
        {loading && (
          <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-coral/20 animate-pulse" />
        )}
      </>
    );
  }

  // Use Next.js Image for external images (Unsplash)
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={className}
        priority={priority}
        sizes={sizes}
        quality={quality}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        style={{ objectFit }}
      />
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-coral/20 animate-pulse" />
      )}
    </>
  );
}
