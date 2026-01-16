import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the couple behind Shoulder Season Sightseers. Learn about our travel philosophy, essential gear, and journey exploring 16 countries on a budget.',
  openGraph: {
    title: 'About Us | Shoulder Season Sightseers',
    description: 'Our story and travel philosophy',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
