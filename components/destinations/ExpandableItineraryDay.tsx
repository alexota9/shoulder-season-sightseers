'use client';

import { useState } from 'react';
import { ItineraryDay } from '@/lib/types/itinerary';
import ThoughtsTabPanel from './ThoughtsTabPanel';

interface ExpandableItineraryDayProps {
  day: ItineraryDay;
  dayNumber: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ExpandableItineraryDay({
  day,
  dayNumber,
  isExpanded,
  onToggle
}: ExpandableItineraryDayProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const photoCount = day.photos?.length || 0;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg overflow-hidden transition-all">
      {/* Header - always visible, clickable */}
      <button
        onClick={onToggle}
        className={`w-full p-6 text-left transition-colors ${
          isExpanded ? 'bg-gray-800 border-b border-gray-700' : 'hover:border-teal/30'
        }`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-3 py-1 bg-coral/20 text-coral rounded-full text-sm font-bold">
                {day.date}
              </span>
              <span className="text-gray-400 text-sm">Day {dayNumber}</span>
              {photoCount > 0 && (
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <span>📸</span>
                  {photoCount}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-teal mb-2">{day.title}</h3>
            <p className="text-gray-400 text-sm">{day.description}</p>
          </div>
          <div className={`text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="p-6 space-y-6 animate-fade-in">
          {/* Highlights */}
          {day.highlights && day.highlights.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Highlights:</h4>
              <ul className="space-y-2">
                {day.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start">
                    <span className="text-teal mr-2">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Photos */}
          {day.photos && day.photos.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Photos from this day:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {day.photos.map((photo, idx) => (
                  <div key={idx} className="relative group">
                    <button
                      onClick={() => setLightboxImage(photo.src)}
                      className="relative aspect-square w-full overflow-hidden rounded-lg"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      {photo.takenBy && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          📸 {photo.takenBy}
                        </div>
                      )}
                    </button>
                    {photo.caption && (
                      <p className="text-xs text-gray-400 mt-1">{photo.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal thoughts tabs */}
          {day.thoughts && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Our Thoughts:</h4>
              <ThoughtsTabPanel thoughts={day.thoughts} />
            </div>
          )}

          {/* Accommodation and Meals */}
          <div className="grid md:grid-cols-2 gap-4">
            {day.accommodation && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-xl">🏨</span>
                <div>
                  <div className="text-gray-400 font-semibold">Accommodation</div>
                  <div className="text-gray-300">{day.accommodation}</div>
                </div>
              </div>
            )}
            {day.meals && day.meals.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-xl">🍽️</span>
                <div>
                  <div className="text-gray-400 font-semibold">Meals</div>
                  <div className="text-gray-300">{day.meals.join(', ')}</div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {day.notes && (
            <div className="p-4 bg-teal/10 border border-teal/20 rounded-lg">
              <div className="text-sm text-teal-300">💡 {day.notes}</div>
            </div>
          )}

          {/* Alternative day (for Iceland) */}
          {day.alternativeDay && (
            <div className="p-6 bg-purple/10 border border-purple/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔄</span>
                <h4 className="text-lg font-bold text-purple-300">{day.alternativeDay.title}</h4>
              </div>
              <p className="text-gray-300 mb-3">{day.alternativeDay.description}</p>
              {day.alternativeDay.highlights && (
                <ul className="space-y-1 mb-3">
                  {day.alternativeDay.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start text-sm">
                      <span className="text-purple-300 mr-2">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
              {day.alternativeDay.notes && (
                <div className="text-sm text-purple-300">💡 {day.alternativeDay.notes}</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Simple lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
