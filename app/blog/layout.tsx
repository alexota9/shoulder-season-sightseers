import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Tips & Blog',
  description: 'Practical budget travel tips, packing guides, and shoulder season advice from our experiences exploring 16 countries with just our backpacks.',
  openGraph: {
    title: 'Travel Tips & Blog | Shoulder Season Sightseers',
    description: 'Learn from our budget travel experiences',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
