'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DetailedItinerary } from '@/lib/types/itinerary';
import PersonalHighlightCard from './PersonalHighlightCard';
import BusynessRating from '../ui/BusynessRating';
import ExpandableItineraryDay from './ExpandableItineraryDay';
import { moroccoLocations, icelandLocations } from '@/lib/data/map-locations';

// Dynamically import map to avoid SSR issues
const DestinationMap = dynamic(() => import('./DestinationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-800 rounded-2xl flex items-center justify-center">
      <div className="text-gray-400">Loading map...</div>
    </div>
  ),
});

interface DetailedItinerarySectionProps {
  itinerary: DetailedItinerary;
  destinationName: string;
}

export default function DetailedItinerarySection({
  itinerary,
  destinationName
}: DetailedItinerarySectionProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  const toggleDay = (dayIndex: number) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dayIndex)) {
        newSet.delete(dayIndex);
      } else {
        newSet.add(dayIndex);
      }
      return newSet;
    });
  };

  // Determine which map locations to use
  const mapLocations = destinationName.toLowerCase().includes('morocco')
    ? moroccoLocations
    : destinationName.toLowerCase().includes('iceland')
    ? icelandLocations
    : null;

  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-100">
            Our {destinationName} Journey
          </h2>
          <p className="text-xl text-gray-300">{itinerary.dates}</p>
        </div>

        {/* Interactive Map */}
        {mapLocations && (
          <div className="mb-12">
            <h3 className="text-3xl font-display font-bold mb-6 text-center text-gray-100">
              Our Route
            </h3>
            <DestinationMap locations={mapLocations} showRoute={true} />
          </div>
        )}

        {/* Busyness Rating */}
        {itinerary.busynessRating && (
          <div className="mb-12">
            <BusynessRating
              rating={itinerary.busynessRating.stars}
              description={itinerary.busynessRating.description}
            />
          </div>
        )}

        {/* Personal Highlights */}
        {itinerary.personalHighlights && itinerary.personalHighlights.length > 0 && (
          <div className="mb-12">
            <h3 className="text-3xl font-display font-bold mb-6 text-center text-gray-100">
              Personal Highlights
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {itinerary.personalHighlights.map((highlight, index) => (
                <PersonalHighlightCard
                  key={index}
                  author={highlight.author}
                  title={highlight.title}
                  quote={highlight.quote}
                  favoritePhoto={highlight.favoritePhoto}
                  topMoments={highlight.topMoments}
                />
              ))}
            </div>
          </div>
        )}

        {/* Day-by-day itinerary */}
        <div className="mb-16">
          <h3 className="text-3xl font-display font-bold mb-8 text-center text-gray-100">
            Day by Day
          </h3>
          <div className="space-y-4">
            {itinerary.days.map((day, index) => (
              <ExpandableItineraryDay
                key={index}
                day={day}
                dayNumber={index + 1}
                isExpanded={expandedDays.has(index)}
                onToggle={() => toggleDay(index)}
              />
            ))}
          </div>
        </div>

        {/* Top Recommendations */}
        {itinerary.topRecommendations && itinerary.topRecommendations.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-display font-bold mb-8 text-center text-gray-100">
              Our Top Recommendations
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.topRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-teal/10 to-coral/10 border border-gray-700 rounded-xl p-6"
                >
                  <div className="text-coral font-bold text-sm mb-2">{rec.title}</div>
                  <h4 className="text-xl font-bold text-gray-100 mb-2">{rec.item}</h4>
                  <p className="text-gray-300 text-sm">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Observations (if present) */}
        {itinerary.culturalObservations && itinerary.culturalObservations.length > 0 && (
          <div className="mb-16 bg-gray-800 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-3xl font-display font-bold mb-6 text-gray-100">
              Cultural Observations
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {itinerary.culturalObservations.map((observation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-teal text-lg">•</span>
                  <span className="text-gray-300">{observation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Essential Info (if present) */}
        {itinerary.essentialInfo && itinerary.essentialInfo.length > 0 && (
          <div className="mb-16 bg-gray-800 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-3xl font-display font-bold mb-6 text-gray-100">
              Essential Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {itinerary.essentialInfo.map((section, index) => (
                <div key={index}>
                  <h4 className="text-xl font-bold text-teal mb-3">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-teal">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Budget Breakdown */}
        {itinerary.budgetBreakdown && (
          <div className="mb-16">
            <h3 className="text-3xl font-display font-bold mb-8 text-center text-gray-100">
              Budget Breakdown
            </h3>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <div className="space-y-4">
                {itinerary.budgetBreakdown.accommodation && (
                  <div className="flex justify-between items-start pb-4 border-b border-gray-700">
                    <span className="text-gray-300 font-semibold">Accommodation</span>
                    <span className="text-teal text-sm text-right max-w-md">
                      {itinerary.budgetBreakdown.accommodation}
                    </span>
                  </div>
                )}
                {itinerary.budgetBreakdown.food && (
                  <div className="flex justify-between items-start pb-4 border-b border-gray-700">
                    <span className="text-gray-300 font-semibold">Food & Dining</span>
                    <span className="text-teal text-sm text-right max-w-md">
                      {itinerary.budgetBreakdown.food}
                    </span>
                  </div>
                )}
                {itinerary.budgetBreakdown.tours && (
                  <div className="flex justify-between items-start pb-4 border-b border-gray-700">
                    <span className="text-gray-300 font-semibold">Tours & Activities</span>
                    <span className="text-teal text-sm text-right max-w-md">
                      {itinerary.budgetBreakdown.tours}
                    </span>
                  </div>
                )}
                {itinerary.budgetBreakdown.activities && (
                  <div className="flex justify-between items-start pb-4 border-b border-gray-700">
                    <span className="text-gray-300 font-semibold">Activities</span>
                    <span className="text-teal text-sm text-right max-w-md">
                      {itinerary.budgetBreakdown.activities}
                    </span>
                  </div>
                )}
                {itinerary.budgetBreakdown.transportation && (
                  <div className="flex justify-between items-start pb-4 border-b border-gray-700">
                    <span className="text-gray-300 font-semibold">Transportation</span>
                    <span className="text-teal text-sm text-right max-w-md">
                      {itinerary.budgetBreakdown.transportation}
                    </span>
                  </div>
                )}
                {itinerary.budgetBreakdown.shopping && (
                  <div className="flex justify-between items-start pb-4 border-b border-gray-700">
                    <span className="text-gray-300 font-semibold">Shopping & Souvenirs</span>
                    <span className="text-teal text-sm text-right max-w-md">
                      {itinerary.budgetBreakdown.shopping}
                    </span>
                  </div>
                )}
                {itinerary.budgetBreakdown.total && (
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-gray-100 font-bold text-lg">Total / Daily Average</span>
                    <span className="text-coral font-bold text-lg">
                      {itinerary.budgetBreakdown.total}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
