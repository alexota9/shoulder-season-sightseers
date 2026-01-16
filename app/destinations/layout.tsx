import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Destinations',
  description: 'Explore our travels through 16 countries across 4 continents. Discover budget-friendly destinations, travel tips, and stunning photography from Morocco, Iceland, Germany, Belgium, and more.',
  openGraph: {
    title: 'Our Destinations | Shoulder Season Sightseers',
    description: 'Explore 16 countries of budget-friendly travel adventures',
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
