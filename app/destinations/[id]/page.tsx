import { notFound } from 'next/navigation';
import Link from 'next/link';
import { destinations } from '@/lib/data/destinations';
import MasonryGallery from '@/components/ui/MasonryGallery';
import DetailedItinerarySection from '@/components/destinations/DetailedItinerarySection';
import { moroccoItinerary } from '@/lib/data/morocco-itinerary';
import { DetailedItinerary } from '@/lib/types/itinerary';

// Iceland-specific itinerary data (will be migrated to new structure later)
const icelandItinerary: DetailedItinerary = {
  dates: 'September 2024 - 6 Days',
  busynessRating: {
    stars: 3,
    description: "Moderate crowds at popular spots like Golden Circle and Jökulsárlón. Remote areas like Westfjords were much quieter. September is perfect shoulder season!"
  },
  days: [
    {
      date: 'Day 1',
      title: 'Silfra Snorkeling & Golden Circle',
      description: 'Start the adventure with snorkeling between two continents at Silfra, then explore the iconic Golden Circle route',
      highlights: [
        'Silfra Snorkeling - drift between North American and Eurasian tectonic plates',
        'Þingvellir National Park - UNESCO World Heritage site',
        'Geysir geothermal area - watch Strokkur erupt every 5-10 minutes',
        'Gullfoss waterfall - powerful two-tiered cascade',
        'Secret Lagoon - natural hot spring for evening relaxation'
      ],
      accommodation: 'Camping at Skjól Campsite (near Selfoss)',
      meals: ['Breakfast on the go', 'Packed lunch', 'Camp dinner'],
      notes: 'Book Silfra snorkeling in advance. Drive time: ~4-5 hours total for the circuit'
    },
    {
      date: 'Day 2',
      title: 'Golden Circle to South Coast',
      description: 'Continue exploring Golden Circle highlights before heading to the dramatic South Coast',
      highlights: [
        'Kerid Crater - stunning volcanic crater lake',
        'Seljalandsfoss - walk behind this beautiful waterfall',
        'Skógafoss - iconic 60m waterfall perfect for photos',
        'Black sand beaches near Vik'
      ],
      accommodation: 'Camping near Skógafoss or Vik',
      meals: ['Camp breakfast', 'Lunch stop', 'Dinner in Vik'],
      notes: 'Pack waterproof gear for Seljalandsfoss. Drive time: ~3-4 hours'
    },
    {
      date: 'Day 3',
      title: 'South Coast Exploration',
      description: 'Discover more of Iceland\'s stunning southern coastline with dramatic landscapes',
      highlights: [
        'Reynisfjara Black Sand Beach - iconic basalt columns',
        'Reynisdrangar sea stacks',
        'Vik town - southernmost village',
        'Fjaðrárgljúfur Canyon - dramatic moss-covered canyon (weather permitting)',
        'Dyrhólaey Peninsula - puffin watching (seasonal)'
      ],
      accommodation: 'Continue camping in Vik area',
      meals: ['Camp breakfast', 'Local lunch', 'Camp dinner'],
      notes: 'Be cautious of sneaker waves at Reynisfjara. Drive time: ~2-3 hours total'
    },
    {
      date: 'Day 4',
      title: 'Glacier & Lagoon Adventure',
      description: 'Experience Iceland\'s incredible glacial landscapes and the famous glacier lagoon',
      highlights: [
        'Skaftafell Nature Reserve - gateway to Vatnajökull glacier',
        'Svartifoss waterfall - surrounded by hexagonal basalt columns',
        'Jökulsárlón Glacier Lagoon - icebergs floating in serene lagoon',
        'Diamond Beach - ice chunks on black sand',
        'Optional: Glacier hiking or ice cave tour'
      ],
      accommodation: 'Camping near Jökulsárlón',
      meals: ['Camp breakfast', 'Packed lunch', 'Camp dinner'],
      notes: 'Book glacier activities in advance. Drive time: ~3-4 hours. Consider zodiac boat tour of lagoon'
    },
    {
      date: 'Day 5',
      title: 'Snæfellsnes Peninsula Drive',
      description: 'Explore the diverse landscapes of the Snæfellsnes Peninsula - "Iceland in Miniature"',
      highlights: [
        'Kirkjufell Mountain - one of Iceland\'s most photographed mountains',
        'Kirkjufellsfoss waterfall',
        'Snæfellsjökull glacier and National Park',
        'Arnarstapi coastal cliffs',
        'Djúpalónssandur black pebble beach',
        'Lóndrangar basalt cliffs',
        'Charming fishing villages'
      ],
      accommodation: 'Camping on Snæfellsnes Peninsula',
      meals: ['Camp breakfast', 'Local seafood lunch', 'Camp dinner'],
      notes: 'Full day of driving (~6-8 hours) with many stops. Alternative: Westman Islands ferry and exploration',
      alternativeDay: {
        title: 'Alternative: Westman Islands',
        description: 'Take the ferry to Vestmannaeyjar (Westman Islands) for unique volcanic landscapes',
        highlights: [
          'Ferry from Landeyjahöfn',
          'Explore Heimaey island',
          'Eldfell volcano - climb the 1973 eruption site',
          'Elephant Rock formation',
          'Puffin colonies (seasonal)',
          'Local museum and town'
        ],
        notes: 'Ferry runs year-round, book in advance. Consider weather conditions'
      }
    },
    {
      date: 'Day 6',
      title: 'Return to Reykjavik & Blue Lagoon',
      description: 'Final day with relaxation at the Blue Lagoon before departure',
      highlights: [
        'Drive back to Reykjavik area',
        'Blue Lagoon geothermal spa - perfect end to the trip',
        'Reykjavik exploration if time permits',
        'Last Icelandic meal'
      ],
      accommodation: 'Near Keflavik Airport for early departure',
      meals: ['Camp breakfast', 'Lunch at Blue Lagoon', 'Dinner in Reykjavik'],
      notes: 'Book Blue Lagoon tickets in advance (3+ weeks recommended). Drive time: ~3-4 hours total'
    }
  ],
  essentialInfo: [
    {
      title: 'Camping Tips',
      items: [
        'Wild camping is prohibited - use designated campsites',
        'Campsites cost ~1,500-2,500 ISK per person per night',
        'Facilities usually include showers, toilets, cooking areas',
        'Bring warm sleeping bag and good tent (weather can be harsh)',
        'Many campsites close after September'
      ]
    },
    {
      title: 'Must Book in Advance',
      items: [
        'Silfra snorkeling/diving',
        'Blue Lagoon tickets (3+ weeks ahead)',
        'Glacier hiking tours',
        'Ice cave tours (seasonal)',
        'Westman Islands ferry (if choosing alternative Day 5)',
        'Rental car (book early for better rates)'
      ]
    },
    {
      title: 'Driving Notes',
      items: [
        'Speed limits: 90 km/h on paved roads, 80 km/h on gravel roads',
        'Watch for sheep on roads, especially in rural areas',
        'F-roads (mountain roads) require 4WD and are closed in winter',
        'Gas stations can be far apart - fill up regularly',
        'Single-lane bridges require yielding',
        'Weather changes rapidly - check road.is and safetravel.is'
      ]
    },
    {
      title: 'Optional Activities',
      items: [
        'Whale watching from Reykjavik or Húsavík',
        'Lava show in Vik',
        'Glacier hiking on Sólheimajökull',
        'Ice cave tours (winter only)',
        'Puffin watching (May-August)',
        'Northern Lights tours (September-April)'
      ]
    }
  ],
  budgetBreakdown: {
    accommodation: 'Camping: ~1,500-2,500 ISK per person per night (~$11-18 USD)',
    food: 'Groceries and camp cooking: ~3,000-4,000 ISK per person per day (~$22-30 USD). Restaurant meals: 2,000-4,000 ISK (~$15-30 USD)',
    activities: 'Silfra snorkeling: ~25,000 ISK (~$180 USD), Blue Lagoon: ~10,000-15,000 ISK (~$75-110 USD), Glacier tours: 10,000-20,000 ISK (~$75-150 USD)',
    transportation: 'Rental car: ~8,000-15,000 ISK per day (~$60-110 USD), Gas: expensive, budget ~15,000 ISK per tank (~$110 USD)'
  },
  topRecommendations: [
    {
      title: 'Must Visit',
      item: 'Jökulsárlón Glacier Lagoon',
      reason: 'Absolutely stunning and otherworldly. Don\'t miss Diamond Beach across the road.'
    },
    {
      title: 'Must Do',
      item: 'Silfra Snorkeling',
      reason: 'Once-in-a-lifetime experience swimming between continents in crystal clear water'
    },
    {
      title: 'Budget Tip',
      item: 'Camping + Grocery Shopping',
      reason: 'Camping saves a fortune vs hotels. Buy groceries at Bonus supermarket for major savings on food'
    },
    {
      title: 'Hidden Gem',
      item: 'Fjaðrárgljúfur Canyon',
      reason: 'Stunning moss-covered canyon that feels like another planet (check if open before visiting)'
    },
    {
      title: 'Weather Tip',
      item: 'Layer Everything',
      reason: 'Weather changes multiple times per day. Waterproof outer layer is essential year-round'
    }
  ]
};

export async function generateStaticParams() {
  return destinations.map((dest) => ({
    id: dest.id,
  }));
}

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    notFound();
  }

  // Check if this destination has a detailed itinerary
  const isMorocco = id === 'morocco';
  const isIceland = id === 'iceland';
  const hasDetailedItinerary = isMorocco || isIceland;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        {destination.images && destination.images.length > 0 && (
          <>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${destination.images[0].src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.3) blur(3px)',
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </>
        )}

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/destinations" className="text-white hover:text-teal transition-colors font-semibold"
              style={{
                textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 4px rgba(0,0,0,1)'
              }}>
              ← Back to Destinations
            </Link>
          </div>

          <div className="text-sm text-white mb-2 font-semibold" style={{
            textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 4px rgba(0,0,0,1)'
          }}>{destination.continent}</div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 aurora-text">
            {destination.name}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-6 font-bold" style={{
            textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 6px rgba(0,0,0,1)'
          }}>
            {destination.description}
          </p>
          <div className="flex items-center space-x-4 text-white font-semibold">
            <div className="flex items-center space-x-2" style={{
              textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 4px rgba(0,0,0,1)'
            }}>
              <span>📅</span>
              <span>Visited: {destination.visited}</span>
            </div>
            <div className="flex items-center space-x-2" style={{
              textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 4px rgba(0,0,0,1)'
            }}>
              <span>💰</span>
              <span>Budget Friendly</span>
            </div>
            <div className="flex items-center space-x-2" style={{
              textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 4px rgba(0,0,0,1)'
            }}>
              <span>🎒</span>
              <span>Light Travel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery - only show for destinations without detailed itinerary */}
      {/* For Morocco and Iceland, photos are inline with itinerary days */}
      {!hasDetailedItinerary && (
        <section className="py-16 px-4 bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-gray-100">
              Our Photos
            </h2>
            <MasonryGallery images={destination.images} />
          </div>
        </section>
      )}

      {/* Coming Soon Notice for destinations without detailed itinerary */}
      {!hasDetailedItinerary && (
        <section className="py-12 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gold/10 to-coral/10 border border-gold/20 rounded-2xl p-8 text-center">
              <div className="inline-block px-4 py-1 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4">
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-3">
                Detailed Itinerary In Progress
              </h3>
              <p className="text-gray-300">
                We're working on compiling our detailed day-by-day itinerary, recommendations, and insider tips for {destination.name}.
                Check back soon for the full experience guide!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Detailed Itinerary Section (Morocco & Iceland) - using new components */}
      {hasDetailedItinerary && (
        <DetailedItinerarySection
          itinerary={isMorocco ? moroccoItinerary : icelandItinerary}
          destinationName={destination.name}
        />
      )}

      {/* Highlights */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-gray-100">
            Top Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destination.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-4 bg-gradient-to-br from-teal/10 to-transparent rounded-lg border border-gray-700"
              >
                <span className="text-2xl text-teal">✓</span>
                <span className="text-lg text-gray-300">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Tips */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <span className="text-4xl">💰</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-100">
              Budget Tips
            </h2>
          </div>
          <div className="space-y-4">
            {destination.budgetTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-sm"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gold to-coral text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg text-gray-300 pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-gray-100">
            Location
          </h2>
          <div className="bg-gradient-to-br from-purple/20 to-teal/20 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <div className="text-xl font-semibold mb-2 text-gray-200">
              {destination.coordinates.lat.toFixed(4)}°, {destination.coordinates.lng.toFixed(4)}°
            </div>
            <p className="text-gray-400">Interactive map coming soon</p>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-gray-100">
            More Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations
              .filter((d) => d.id !== destination.id)
              .slice(0, 3)
              .map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="group bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-teal/20 to-coral/20 flex items-center justify-center">
                    <div className="text-5xl">📍</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-teal transition-colors text-gray-100">
                      {dest.name}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {dest.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/destinations"
              className="inline-block px-8 py-3 bg-teal text-white rounded-full hover:bg-teal-600 transition-colors font-semibold"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
