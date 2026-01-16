'use client';

import dynamic from 'next/dynamic';

const FlightMap = dynamic(() => import('@/components/ui/FlightMap'), {
  ssr: false,
});

interface FlightRoute {
  from: string;
  to: string;
  fromCoords: [number, number];
  toCoords: [number, number];
  airline: string;
  date: string;
  isInternational: boolean;
}

interface FlightMapWrapperProps {
  routes: FlightRoute[];
}

export default function FlightMapWrapper({ routes }: FlightMapWrapperProps) {
  return <FlightMap routes={routes} />;
}
