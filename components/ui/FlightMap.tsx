'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface FlightRoute {
  from: string;
  to: string;
  fromCoords: [number, number];
  toCoords: [number, number];
  airline: string;
  date: string;
  isInternational: boolean;
}

interface FlightMapProps {
  routes: FlightRoute[];
}

export default function FlightMap({ routes }: FlightMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightRoute | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Initialize map
    const map = L.map(mapContainer.current).setView([20, 0], 2);
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || routes.length === 0) return;

    const map = mapInstance.current;

    // Clear existing layers
    map.eachLayer(layer => {
      if (layer instanceof L.Polyline || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Add airport markers and routes
    const airports = new Map<string, [number, number]>();

    routes.forEach(route => {
      airports.set(route.from, route.fromCoords);
      airports.set(route.to, route.toCoords);

      // Draw route line
      const color = route.isInternational ? '#a85c5c' : '#4a8585';
      const line = L.polyline([route.fromCoords, route.toCoords], {
        color,
        weight: 2,
        opacity: 0.6,
      }).addTo(map);

      line.on('click', () => setSelectedFlight(route));
      line.bindPopup(`
        <div class="font-sans">
          <strong>${route.from} → ${route.to}</strong><br/>
          ${route.airline}<br/>
          ${new Date(route.date).toLocaleDateString()}
        </div>
      `);
    });

    // Add airport markers
    airports.forEach((coords, code) => {
      L.circleMarker(coords, {
        radius: 5,
        fillColor: '#6b5ca3',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .addTo(map)
        .bindPopup(`<strong>${code}</strong>`);
    });

    // Fit bounds to show all routes
    if (airports.size > 0) {
      const bounds = L.latLngBounds(Array.from(airports.values()));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [routes]);

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-[600px] rounded-2xl shadow-lg" />
      {selectedFlight && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-lg max-w-xs">
          <button
            onClick={() => setSelectedFlight(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-2">
            {selectedFlight.from} → {selectedFlight.to}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Airline:</strong> {selectedFlight.airline}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Date:</strong> {new Date(selectedFlight.date).toLocaleDateString()}
          </p>
          <p className="text-sm">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                selectedFlight.isInternational
                  ? 'bg-coral/10 text-coral-700'
                  : 'bg-teal/10 text-teal-700'
              }`}
            >
              {selectedFlight.isInternational ? 'International' : 'Domestic'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
