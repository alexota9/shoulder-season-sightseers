'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  description?: string;
  day?: number;
}

interface DestinationMapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  showRoute?: boolean;
}

export default function DestinationMap({
  locations,
  center,
  zoom = 6,
  showRoute = true
}: DestinationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Calculate center if not provided
    const mapCenter = center || [
      locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length,
      locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length
    ];

    // Initialize map
    const map = L.map(mapRef.current, {
      center: mapCenter as [number, number],
      zoom: zoom,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Add tile layer with better styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create numbered marker icons
    const createNumberedIcon = (number: number) => {
      return L.divIcon({
        className: 'custom-numbered-marker',
        html: `
          <div style="
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #70b8b8, #4a9696);
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 16px;
          ">${number}</div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });
    };

    // Add markers for each location
    const markers: L.Marker[] = [];
    locations.forEach((location, index) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createNumberedIcon(location.day || index + 1),
      }).addTo(map);

      markers.push(marker);

      // Add popup
      const popupContent = `
        <div style="min-width: 200px;">
          <div style="
            font-weight: bold;
            font-size: 14px;
            color: #70b8b8;
            margin-bottom: 4px;
          ">
            ${location.day ? `Day ${location.day}` : `Stop ${index + 1}`}
          </div>
          <h3 style="
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 6px;
            color: #333;
          ">
            ${location.name}
          </h3>
          ${location.description ? `
            <p style="
              color: #666;
              font-size: 13px;
              margin: 0;
            ">
              ${location.description}
            </p>
          ` : ''}
        </div>
      `;

      marker.bindPopup(popupContent);
    });

    // Draw route line if requested
    if (showRoute && locations.length > 1) {
      const routeCoordinates = locations.map(loc => [loc.lat, loc.lng] as [number, number]);

      L.polyline(routeCoordinates, {
        color: '#70b8b8',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10',
      }).addTo(map);
    }

    // Fit bounds to show all markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations, center, zoom, showRoute]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[500px] rounded-2xl shadow-lg z-0" />
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md z-10">
        <div className="text-sm font-semibold text-gray-700">
          📍 {locations.length} Stops on This Journey
        </div>
      </div>
    </div>
  );
}
