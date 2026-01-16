import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <div className="text-xl font-display font-bold bg-gradient-to-r from-teal to-coral bg-clip-text text-transparent">
                Shoulder Season Sightseers
              </div>
              <div className="text-xs text-gray-400 tracking-wider font-semibold mt-1">
                TRIPLE S TRAVEL
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Budget travel adventures with just our backpacks and a love for shoulder season exploration.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations" className="text-gray-400 hover:text-teal transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-teal transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-teal transition-colors">
                  Travel Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-coral transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about#travel-style" className="text-gray-400 hover:text-coral transition-colors">
                  Travel Style
                </Link>
              </li>
              <li>
                <Link href="/about#gear" className="text-gray-400 hover:text-coral transition-colors">
                  Our Gear
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Stats */}
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Our Journey</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <span className="text-teal">🌍</span>
                <span>16 Countries Explored</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-coral">🎒</span>
                <span>2 Backpacks Only</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-purple">📸</span>
                <span>Thousands of Photos</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gold">💰</span>
                <span>Budget Conscious</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Shoulder Season Sightseers. All rights reserved.</p>
          <p className="mt-2">
            Also visit{' '}
            <Link href="https://triples.travel" className="text-teal hover:underline">
              triples.travel
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
