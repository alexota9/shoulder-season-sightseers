import { readFileSync } from 'fs';
import path from 'path';
import FlightMapWrapper from '@/components/flights/FlightMapWrapper';

// Airport coordinates for mapping
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

// Airport to country mapping
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

// Airline code to full name mapping
const airlineNames: Record<string, string> = {
  AAL: 'American Airlines',
  DAL: 'Delta Airlines',
  DLH: 'Lufthansa',
  EZY: 'EasyJet',
  FIN: 'Finnair',
  JJP: 'Jetstar',
  NRS: 'Norwegian',
  RYR: 'Ryanair',
  SWA: 'Southwest Airlines',
  TZP: 'ZIPAIR',
  UAL: 'United Airlines',
  VLG: 'Vueling',
};

interface ParsedFlight {
  date: string;
  airline: string;
  from: string;
  to: string;
  isInternational: boolean;
  distance: number;
}

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

function parseFlightCSV() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'FlightyExport-2026-01-16.csv');
    const csvContent = readFileSync(filePath, 'utf-8');

    const lines = csvContent.split('\n').slice(1); // Skip header
    const flights: ParsedFlight[] = [];

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

      flights.push({
        date: values[0],
        airline: values[1],
        from,
        to,
        isInternational: isInternational || false,
        distance: calculateDistance(from, to),
      });
    }

    return flights;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}

export default function FlightsPage() {
  const allFlights = parseFlightCSV();

  // Filter for international flights and their connecting domestic flights
  const internationalFlights = allFlights.filter(f => f.isInternational);

  // Find connecting domestic flights (within 24 hours)
  const connectingFlights: ParsedFlight[] = [];
  internationalFlights.forEach(intlFlight => {
    const intlDate = new Date(intlFlight.date).getTime();

    allFlights.forEach(flight => {
      if (flight.isInternational) return;

      const flightDate = new Date(flight.date).getTime();
      const hoursDiff = Math.abs(flightDate - intlDate) / (1000 * 60 * 60);

      if (hoursDiff <= 24 && !connectingFlights.includes(flight)) {
        connectingFlights.push(flight);
      }
    });
  });

  const relevantFlights = [...internationalFlights, ...connectingFlights]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate statistics
  const countries = new Set<string>();
  internationalFlights.forEach(f => {
    const fromCountry = airportCountries[f.from];
    const toCountry = airportCountries[f.to];
    if (fromCountry) countries.add(fromCountry);
    if (toCountry) countries.add(toCountry);
  });

  // Count flights per airline
  const airlineCounts = relevantFlights.reduce((acc, f) => {
    acc[f.airline] = (acc[f.airline] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const airlines = Object.keys(airlineCounts);
  const totalDistance = Math.round(relevantFlights.reduce((sum, f) => sum + f.distance, 0));

  // Prepare data for map
  const mapRoutes = relevantFlights
    .filter(f => airportCoords[f.from] && airportCoords[f.to])
    .map(f => ({
      from: f.from,
      to: f.to,
      fromCoords: airportCoords[f.from],
      toCoords: airportCoords[f.to],
      airline: f.airline,
      date: f.date,
      isInternational: f.isInternational,
    }));

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-teal/20 to-coral/20 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-gray-100">
            My Flight History
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Explore my international travels and connecting flights with interactive maps and detailed statistics.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-teal mb-2">{relevantFlights.length}</div>
              <div className="text-gray-400">Total Flights</div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-coral mb-2">{internationalFlights.length}</div>
              <div className="text-gray-400">International</div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-purple mb-2">{countries.size}</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-gold mb-2">{airlines.length}</div>
              <div className="text-gray-400">Airlines</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-teal mb-2">{totalDistance.toLocaleString()}</div>
              <div className="text-gray-400">Total Miles Flown</div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl font-bold text-coral mb-2">{connectingFlights.length}</div>
              <div className="text-gray-400">Connecting Flights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-gray-100">
            Flight Route Map
          </h2>
          <FlightMapWrapper routes={mapRoutes} />
          <div className="mt-6 text-center text-sm text-gray-400">
            <p className="mb-2">
              <span className="inline-block w-4 h-1 bg-coral mr-2"></span>
              International Flights
              <span className="inline-block w-4 h-1 bg-teal ml-6 mr-2"></span>
              Domestic Connecting Flights
            </p>
            <p>Click on any route or airport for more details</p>
          </div>
        </div>
      </section>

      {/* Countries Flown To */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-gray-100">
            Countries Flown To
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from(countries).sort().map(country => (
              <span
                key={country}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-full shadow-sm text-gray-300 font-medium"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Airlines Used */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-gray-100">
            Airlines Flown
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {airlines.sort().map(airline => (
              <div
                key={airline}
                className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 shadow-sm hover:border-teal transition-colors"
              >
                <div className="text-sm text-gray-400 mb-1">{airlineNames[airline] || airline}</div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-teal">{airline}</span>
                  <span className="text-sm text-gray-300">{airlineCounts[airline]} flights</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
