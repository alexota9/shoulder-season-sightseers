import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shoulderseasonsightseers.com'),
  title: {
    default: "Shoulder Season Sightseers - Triple S Travel",
    template: "%s | Shoulder Season Sightseers"
  },
  description: "Follow our journey traveling light and on a budget through 16+ countries. Discover shoulder season travel tips, stunning photography, and authentic experiences.",
  keywords: ["travel", "budget travel", "backpacking", "shoulder season", "travel photography", "light travel", "triple s travel", "budget backpacking", "travel blog"],
  authors: [{ name: "Shoulder Season Sightseers" }],
  creator: "Shoulder Season Sightseers",
  publisher: "Shoulder Season Sightseers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shoulderseasonsightseers.com',
    siteName: 'Shoulder Season Sightseers',
    title: 'Shoulder Season Sightseers - Budget Travel Adventures',
    description: 'Follow our journey traveling light and on a budget through 16+ countries across 4 continents.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shoulder Season Sightseers',
    description: 'Budget travel adventures through 16+ countries',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
