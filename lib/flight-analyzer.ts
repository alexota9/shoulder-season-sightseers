// Flight data analysis utilities

export interface Flight {
  date: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  fromAirport?: string;
  toAirport?: string;
  departureScheduled?: string;
  departureActual?: string;
  arrivalScheduled?: string;
  arrivalActual?: string;
  aircraft?: string;
  distance?: number;
  isInternational?: boolean;
  isConnecting?: boolean;
}

export interface FlightStats {
  totalFlights: number;
  internationalFlights: number;
  domesticFlights: number;
  countries: string[];
  airlines: string[];
  totalDistance: number;
  totalTimeInAir: number;
  aircraftTypes: string[];
  longestFlight?: Flight;
  mostFrequentRoute?: { route: string; count: number };
  mostUsedAirline?: { airline: string; count: number };
}

// Airport code to country mapping (major airports)
const airportCountries: Record<string, string> = {
  // US airports
  ABQ: 'United States', DEN: 'United States', PHX: 'United States', LAX: 'United States',
  SAN: 'United States', LAS: 'United States', SEA: 'United States', PDX: 'United States',
  SFO: 'United States', OAK: 'United States', SMF: 'United States', ONT: 'United States',
  ATL: 'United States', DFW: 'United States', ORD: 'United States', IAH: 'United States',
  EWR: 'United States', JFK: 'United States', BOS: 'United States', IAD: 'United States',
  DTW: 'United States', MDW: 'United States', DAL: 'United States', HOU: 'United States',
  MCI: 'United States', IND: 'United States', TPA: 'United States', FLL: 'United States',
  PHL: 'United States', BWI: 'United States', BNA: 'United States', AUS: 'United States',
  SLC: 'United States', COS: 'United States', GSP: 'United States', SAF: 'United States',

  // European airports
  LGW: 'United Kingdom', LHR: 'United Kingdom', CDG: 'France', MXP: 'Italy',
  SPU: 'Croatia', AMS: 'Netherlands', DUB: 'Ireland', MUC: 'Germany',
  HEL: 'Finland', RVN: 'Finland', BCN: 'Spain', BRU: 'Belgium',
  SEN: 'United Kingdom', KEF: 'Iceland', RAK: 'Morocco', TNG: 'Morocco',

  // Asian airports
  NRT: 'Japan', FUK: 'Japan', HND: 'Japan',
};

// Calculate distance between two airport codes (approximate)
const airportCoordinates: Record<string, { lat: number; lng: number }> = {
  ABQ: { lat: 35.0402, lng: -106.6092 },
  DEN: { lat: 39.8561, lng: -104.6737 },
  PHX: { lat: 33.4352, lng: -112.0101 },
  LAX: { lat: 33.9416, lng: -118.4085 },
  LGW: { lat: 51.1537, lng: -0.1821 },
  CDG: { lat: 49.0097, lng: 2.5479 },
  NRT: { lat: 35.7720, lng: 140.3929 },
  KEF: { lat: 63.9850, lng: -22.6056 },
  RAK: { lat: 31.6069, lng: -8.0363 },
  BCN: { lat: 41.2974, lng: 2.0833 },
  MXP: { lat: 45.6301, lng: 8.7231 },
  SPU: { lat: 43.5389, lng: 16.2980 },
  // Add more as needed
};

function calculateDistance(from: string, to: string): number {
  const fromCoords = airportCoordinates[from];
  const toCoords = airportCoordinates[to];

  if (!fromCoords || !toCoords) return 0;

  const R = 3959; // Earth's radius in miles
  const dLat = (toCoords.lat - fromCoords.lat) * Math.PI / 180;
  const dLng = (toCoords.lng - fromCoords.lng) * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(fromCoords.lat * Math.PI / 180) * Math.cos(toCoords.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function parseFlightData(csvText: string): Flight[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const flights: Flight[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');
    if (values.length < 4) continue;

    const flight: Flight = {
      date: values[0],
      airline: values[1],
      flightNumber: values[2],
      from: values[3],
      to: values[4],
      departureScheduled: values[11],
      departureActual: values[12],
      arrivalScheduled: values[17],
      arrivalActual: values[18],
      aircraft: values[19],
    };

    // Determine if international
    const fromCountry = airportCountries[flight.from];
    const toCountry = airportCountries[flight.to];
    flight.isInternational = fromCountry !== toCountry;

    // Calculate distance
    flight.distance = calculateDistance(flight.from, flight.to);

    flights.push(flight);
  }

  return flights;
}

export function analyzeFlights(flights: Flight[]): FlightStats {
  const countries = new Set<string>();
  const airlines = new Set<string>();
  const aircraftTypes = new Set<string>();
  const routes: Record<string, number> = {};
  const airlineCounts: Record<string, number> = {};

  let totalDistance = 0;
  let internationalCount = 0;
  let domesticCount = 0;

  flights.forEach(flight => {
    // Count countries
    const fromCountry = airportCountries[flight.from];
    const toCountry = airportCountries[flight.to];
    if (fromCountry) countries.add(fromCountry);
    if (toCountry) countries.add(toCountry);

    // Count airlines
    airlines.add(flight.airline);
    airlineCounts[flight.airline] = (airlineCounts[flight.airline] || 0) + 1;

    // Count aircraft types
    if (flight.aircraft) aircraftTypes.add(flight.aircraft);

    // Count routes
    const route = `${flight.from}-${flight.to}`;
    routes[route] = (routes[route] || 0) + 1;

    // Calculate distance
    if (flight.distance) totalDistance += flight.distance;

    // Count international vs domestic
    if (flight.isInternational) {
      internationalCount++;
    } else {
      domesticCount++;
    }
  });

  // Find most frequent route
  let mostFrequentRoute = { route: '', count: 0 };
  Object.entries(routes).forEach(([route, count]) => {
    if (count > mostFrequentRoute.count) {
      mostFrequentRoute = { route, count };
    }
  });

  // Find most used airline
  let mostUsedAirline = { airline: '', count: 0 };
  Object.entries(airlineCounts).forEach(([airline, count]) => {
    if (count > mostUsedAirline.count) {
      mostUsedAirline = { airline, count };
    }
  });

  return {
    totalFlights: flights.length,
    internationalFlights: internationalCount,
    domesticFlights: domesticCount,
    countries: Array.from(countries),
    airlines: Array.from(airlines),
    totalDistance: Math.round(totalDistance),
    totalTimeInAir: 0, // Would need actual flight times
    aircraftTypes: Array.from(aircraftTypes),
    mostFrequentRoute,
    mostUsedAirline,
  };
}

export function filterInternationalAndConnecting(flights: Flight[]): Flight[] {
  const filtered: Flight[] = [];

  // First pass: identify all international flights
  const internationalFlights = flights.filter(f => f.isInternational);
  filtered.push(...internationalFlights);

  // Second pass: find connecting domestic flights (within 24 hours of international flights)
  internationalFlights.forEach(intlFlight => {
    const flightDate = new Date(intlFlight.date);

    // Look for flights within 24 hours before or after
    flights.forEach(flight => {
      if (flight.isInternational) return; // Skip international flights

      const checkDate = new Date(flight.date);
      const timeDiff = Math.abs(checkDate.getTime() - flightDate.getTime());
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      if (hoursDiff <= 24) {
        flight.isConnecting = true;
        if (!filtered.includes(flight)) {
          filtered.push(flight);
        }
      }
    });
  });

  return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
