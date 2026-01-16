import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-20" style={{
      backgroundColor: 'var(--section-bg)',
      borderColor: 'var(--card-border)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <div className="text-xl font-display font-bold aurora-text">
                Shoulder Season Sightseers
              </div>
              <div className="text-xs tracking-wider font-semibold mt-1" style={{ color: 'var(--text-secondary)' }}>
                TRIPLE S TRAVEL
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Budget travel adventures with just our backpacks and a love for shoulder season exploration.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations" className="hover:text-teal transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-teal transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  Travel Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-coral transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about#travel-style" className="hover:text-coral transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  Travel Style
                </Link>
              </li>
              <li>
                <Link href="/about#gear" className="hover:text-coral transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  Our Gear
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Stats */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Our Journey</h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
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

        <div className="mt-8 pt-8 border-t text-center text-sm" style={{
          borderColor: 'var(--card-border)',
          color: 'var(--text-secondary)'
        }}>
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
