'use client';

import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('@/components/ui/ThemeToggle'), {
  ssr: false,
  loading: () => <div className="w-20 h-8" />,
});

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{
      backgroundColor: 'var(--nav-bg)',
      borderColor: 'var(--card-border)',
      opacity: 0.95
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex flex-col">
              <div className="text-base sm:text-xl font-display font-bold aurora-text leading-tight">
                Shoulder Season Sightseers
              </div>
              <div className="text-[10px] sm:text-xs tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                TRIPLE S TRAVEL
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/destinations"
              className="hover:text-teal transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Destinations
            </Link>
            <Link
              href="/gallery"
              className="hover:text-coral transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Gallery
            </Link>
            <Link
              href="/flights"
              className="hover:text-purple transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Flights
            </Link>
            <Link
              href="/blog"
              className="hover:text-purple transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Travel Tips
            </Link>
            <Link
              href="/about"
              className="hover:text-gold transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              About
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile: Theme Toggle and Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in-up">
            <Link
              href="/destinations"
              className="block px-4 py-2 hover:bg-teal/10 rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="/gallery"
              className="block px-4 py-2 hover:bg-coral/10 rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/flights"
              className="block px-4 py-2 hover:bg-purple/10 rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 hover:bg-purple/10 rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Travel Tips
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-gold/10 rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
