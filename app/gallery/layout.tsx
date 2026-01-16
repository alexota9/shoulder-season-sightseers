import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Browse our stunning travel photography from countries around the world. Filter by destination and discover the beauty of budget travel adventures from Iceland to Morocco.',
  openGraph: {
    title: 'Photo Gallery | Shoulder Season Sightseers',
    description: 'Explore thousands of travel photos from our adventures',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
