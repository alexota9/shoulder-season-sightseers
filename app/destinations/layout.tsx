import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Destinations',
  description: 'Explore our travels across 4 continents. Discover budget-friendly destinations, travel tips, and stunning photography from Morocco, Iceland, Germany, Belgium, and more.',
  openGraph: {
    title: 'Our Destinations | Shoulder Season Sightseers',
    description: 'Explore budget-friendly travel adventures across multiple countries',
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
