'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '@/lib/data/destinations';

export default function TravelMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [45, 10],
      zoom: 4,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom marker icon using brand colors
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #70b8b8, #b87070);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add markers for each destination
    destinations.forEach((dest) => {
      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], {
        icon: customIcon,
      }).addTo(map);

      // Add popup
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; font-size: 18px; margin-bottom: 8px; color: #70b8b8;">
            ${dest.name}
          </h3>
          <p style="color: #666; margin-bottom: 8px; font-size: 14px;">
            ${dest.description.substring(0, 100)}...
          </p>
          <a href="/destinations/${dest.id}" style="
            display: inline-block;
            padding: 6px 16px;
            background: linear-gradient(135deg, #70b8b8, #b87070);
            color: white;
            text-decoration: none;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
          ">
            Learn More
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[500px] rounded-2xl shadow-lg z-0" />
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md z-10">
        <div className="text-sm font-semibold text-gray-700">
          📍 {destinations.length} Countries Explored
        </div>
      </div>
    </div>
  );
}
