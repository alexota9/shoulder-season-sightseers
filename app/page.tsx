import Link from 'next/link';
import { readFileSync } from 'fs';
import path from 'path';
import { destinations } from '@/lib/data/destinations';
import CuratedPhotoGallery from '@/components/home/CuratedPhotoGallery';
import CountUpNumber from '@/components/ui/CountUpNumber';
import CountryCards from '@/components/home/CountryCards';

// Airport to country mapping (same as flights page)
const airportCountries: Record<string, string> = {
  ABQ: 'USA', DEN: 'USA', PHX: 'USA', LAX: 'USA', SAN: 'USA', LAS: 'USA',
  SEA: 'USA', PDX: 'USA', OAK: 'USA', SMF: 'USA', ONT: 'USA', ATL: 'USA',
  DFW: 'USA', ORD: 'USA', IAH: 'USA', EWR: 'USA', JFK: 'USA', IAD: 'USA',
  DTW: 'USA', MDW: 'USA', HOU: 'USA', MCI: 'USA', IND: 'USA', TPA: 'USA',
  FLL: 'USA', PHL: 'USA', BNA: 'USA', AUS: 'USA', SLC: 'USA', COS: 'USA',
  LGW: 'UK', CDG: 'France', MXP: 'Italy', SPU: 'Croatia', AMS: 'Netherlands',
  DUB: 'Ireland', MUC: 'Germany', HEL: 'Finland', RVN: 'Finland', BCN: 'Spain',
  BRU: 'Belgium', KEF: 'Iceland', RAK: 'Morocco', NRT: 'Japan', FUK: 'Japan',
  TNG: 'Morocco',
};

const airportCoords: Record<string, [number, number]> = {
  ABQ: [35.0402, -106.6092], DEN: [39.8561, -104.6737], PHX: [33.4352, -112.0101],
  LAX: [33.9416, -118.4085], SAN: [33.7003, -117.1683], LAS: [36.0840, -115.1537],
  SEA: [47.4502, -122.3088], PDX: [45.5898, -122.5951], OAK: [37.7213, -122.2208],
  SMF: [38.6954, -121.5908], ONT: [34.0560, -117.6012], ATL: [33.6407, -84.4277],
  DFW: [32.8998, -97.0403], ORD: [41.9742, -87.9073], IAH: [29.9902, -95.3368],
  EWR: [40.6895, -74.1745], JFK: [40.6413, -73.7781], IAD: [38.9531, -77.4565],
  DTW: [42.2162, -83.3554], MDW: [41.7868, -87.7522], HOU: [29.6465, -95.2789],
  MCI: [39.2976, -94.7139], IND: [39.7173, -86.2944], TPA: [27.9755, -82.5332],
  FLL: [26.0742, -80.1506], PHL: [39.8744, -75.2424], BNA: [36.1245, -86.6782],
  AUS: [30.1945, -97.6699], SLC: [40.7899, -111.9791], COS: [38.8058, -104.7004],
  LGW: [51.1537, -0.1821], CDG: [49.0097, 2.5479], MXP: [45.6301, 8.7231],
  SPU: [43.5389, 16.2980], AMS: [52.3105, 4.7683], DUB: [53.4213, -6.2701],
  MUC: [48.3538, 11.7750], HEL: [60.3172, 24.9633], RVN: [66.5647, 25.8304],
  BCN: [41.2974, 2.0833], BRU: [50.9010, 4.4856], KEF: [63.9850, -22.6056],
  RAK: [31.6069, -8.0363], NRT: [35.7720, 140.3929], FUK: [33.5859, 130.4511],
  TNG: [35.7269, -5.9169],
};

function calculateDistance(from: string, to: string): number {
  const fromCoords = airportCoords[from];
  const toCoords = airportCoords[to];
  if (!fromCoords || !toCoords) return 0;

  const R = 3959; // Earth radius in miles
  const [lat1, lon1] = fromCoords;
  const [lat2, lon2] = toCoords;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function parseFlightData() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'FlightyExport-2026-01-16.csv');
    const csvContent = readFileSync(filePath, 'utf-8');
    const lines = csvContent.split('\n').slice(1);

    let totalFlights = 0;
    let totalMiles = 0;
    let longestDistance = 0;
    let longestRoute = '';

    for (const line of lines) {
      if (!line.trim()) continue;
      const values = line.split(',');
      if (values.length < 5) continue;

      const from = values[3];
      const to = values[4];
      if (!from || !to) continue;

      const fromCountry = airportCountries[from];
      const toCountry = airportCountries[to];
      const isInternational = fromCountry && toCountry && fromCountry !== toCountry;

      if (isInternational) {
        totalFlights++;
        const distance = calculateDistance(from, to);
        totalMiles += distance;

        if (distance > longestDistance) {
          longestDistance = distance;
          longestRoute = `${from} → ${to}`;
        }
      }
    }

    return { totalFlights, totalMiles: Math.round(totalMiles), longestRoute };
  } catch (error) {
    return { totalFlights: 0, totalMiles: 0, longestRoute: 'LAX → NRT' };
  }
}

export default function Home() {
  // Calculate dynamic stats
  const currentYear = new Date().getFullYear();
  const yearsOfTravel = currentYear - 2018; // Started in May 2018
  const countriesVisited = destinations.length;
  const continentsVisited = new Set(destinations.map(d => d.continent)).size;
  const flightData = parseFlightData();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/Iceland/Iceland%202024/aurorashed.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(3px)',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-4">
            <span className="text-sm text-white tracking-[0.3em] font-bold" style={{
              textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 4px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1)'
            }}>
              TRIPLE S TRAVEL
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            style={{
              color: '#70b8b8',
              textShadow: '0 0 30px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,1), 3px 3px 6px rgba(0,0,0,1), -2px -2px 0 rgba(0,0,0,1), 2px -2px 0 rgba(0,0,0,1), -2px 2px 0 rgba(0,0,0,1), 2px 2px 0 rgba(0,0,0,1)',
            }}
          >
            Shoulder Season Sightseers
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto font-bold" style={{
            textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 6px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1)'
          }}>
            Follow our journey exploring 16 countries with nothing but our Osprey backpacks,
            a budget mindset, and a love for shoulder season adventures.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/destinations"
              className="px-8 py-3 bg-teal text-white rounded-full hover:bg-teal-700 transition-colors font-semibold shadow-lg"
            >
              Explore Destinations
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 bg-gray-800 text-gray-100 border-2 border-gray-700 rounded-full hover:border-coral hover:bg-gray-700 transition-colors font-semibold"
            >
              Travel Tips
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <CountUpNumber end={0} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent" />
            <div className="text-gray-300 text-sm">Checked Bags</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <CountUpNumber end={2} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent" />
            <div className="text-gray-300 text-sm">Backpacks</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <CountUpNumber end={continentsVisited} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent" />
            <div className="text-gray-300 text-sm">Continents</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <CountUpNumber end={yearsOfTravel} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent" />
            <div className="text-gray-300 text-sm">Years Traveling</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <CountUpNumber end={countriesVisited} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent" />
            <div className="text-gray-300 text-sm">Countries Visited</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <CountUpNumber end={500} prefix="$" className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent" />
            <div className="text-gray-300 text-sm">Avg Flights</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <CountUpNumber end={14789} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent px-1" />
            <div className="text-gray-300 text-sm">Photos & Videos</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '700ms' }}>
            <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">∞</div>
            <div className="text-gray-300 text-sm">Memories Made</div>
          </div>
        </div>
      </section>

      {/* Flight Stats Section - Minimal */}
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-1">
                ✈️ <CountUpNumber end={flightData.totalFlights} duration={1500} className="inline" />
              </div>
              <div className="text-gray-400 text-sm">Total Flights</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-gray-700"></div>

            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-1">
                {flightData.longestRoute}
              </div>
              <div className="text-gray-400 text-sm">Longest Flight</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-gray-700"></div>

            <div className="text-center">
              <CountUpNumber end={flightData.totalMiles} duration={2000} className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-1" />
              <div className="text-gray-400 text-sm">Total Miles Flown</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Trip Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gold/10 via-gray-900 to-purple/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4">
              Coming Soon
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-100">
              Next Adventure: Self-Curated East African Safari
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-2">
              June 2026 • Semi-DIY Safari Experience
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-teal mb-4">The Plan</h3>
                <p className="text-gray-300 mb-6">
                  We're embarking on our most ambitious adventure yet - a self-curated, semi-DIY safari
                  across four incredible countries. We're planning our own itinerary to include the Great
                  Migration in the Serengeti, trekking with mountain gorillas and chimpanzees, and even
                  a stay at the famed Giraffe Manor. This budget-conscious approach lets us create our
                  dream safari without the premium tour price tag.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🦁</span>
                    <div>
                      <div className="font-semibold text-gray-200">Serengeti Safari</div>
                      <div className="text-gray-400 text-sm">Witness the Great Migration in Tanzania</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🦒</span>
                    <div>
                      <div className="font-semibold text-gray-200">Giraffe Manor</div>
                      <div className="text-gray-400 text-sm">Breakfast with giraffes at Kenya's iconic boutique hotel</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌋</span>
                    <div>
                      <div className="font-semibold text-gray-200">Ngorongoro Crater</div>
                      <div className="text-gray-400 text-sm">Explore the world's largest intact volcanic caldera</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🦍</span>
                    <div>
                      <div className="font-semibold text-gray-200">Gorilla Trekking</div>
                      <div className="text-gray-400 text-sm">Trek through Rwanda and Uganda's misty mountains</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🐵</span>
                    <div>
                      <div className="font-semibold text-gray-200">Chimpanzee Encounters</div>
                      <div className="text-gray-400 text-sm">Track chimps in their natural habitat</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-coral mb-4">Countries</h3>
                <CountryCards />

                <div className="bg-gradient-to-br from-purple/10 to-gold/10 border border-purple/20 rounded-xl p-6">
                  <div className="text-sm text-gray-400 mb-2">Stay tuned for:</div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-purple">•</span>
                      <span>Budget safari tips and tricks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple">•</span>
                      <span>Gorilla trekking permits guide</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple">•</span>
                      <span>Packing for safari adventures</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple">•</span>
                      <span>Full itinerary and photos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <CuratedPhotoGallery />
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-block px-8 py-3 bg-gradient-to-r from-teal to-coral text-white rounded-full hover:shadow-lg transition-shadow font-semibold"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.slice(0, 6).map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="aspect-[4/3] relative">
                  {dest.images && dest.images.length > 0 ? (
                    <img
                      src={dest.images[0].src}
                      alt={dest.images[0].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal/20 to-coral/20 flex items-center justify-center">
                      <div className="text-6xl opacity-50">📍</div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {dest.name}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2">
                      {dest.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/destinations"
              className="inline-block px-8 py-3 bg-coral text-white rounded-full hover:bg-coral-600 transition-colors font-semibold"
            >
              See All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Philosophy */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple/10 to-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-gray-100">
            Our Travel Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="text-4xl mb-4">🎒</div>
              <h3 className="text-xl font-bold mb-2 text-teal">Travel Light</h3>
              <p className="text-gray-300">
                Everything fits in our Osprey Farpoint backpacks. No checked bags, no hassle.
              </p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2 text-coral">Budget Conscious</h3>
              <p className="text-gray-300">
                Amazing experiences don't have to break the bank. We share all our money-saving tips.
              </p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="text-4xl mb-4">🍂</div>
              <h3 className="text-xl font-bold mb-2 text-gold">Shoulder Season</h3>
              <p className="text-gray-300">
                Fewer crowds, better prices, and authentic experiences. That's our sweet spot.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
