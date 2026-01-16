'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex flex-col">
              <div className="text-base sm:text-xl font-display font-bold bg-gradient-to-r from-teal to-coral bg-clip-text text-transparent leading-tight">
                Shoulder Season Sightseers
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 tracking-wider">
                TRIPLE S TRAVEL
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/destinations"
              className="text-gray-300 hover:text-teal transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="/gallery"
              className="text-gray-300 hover:text-coral transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/flights"
              className="text-gray-300 hover:text-purple transition-colors"
            >
              Flights
            </Link>
            <Link
              href="/blog"
              className="text-gray-300 hover:text-purple transition-colors"
            >
              Travel Tips
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-gold transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in-up">
            <Link
              href="/destinations"
              className="block px-4 py-2 text-gray-300 hover:bg-teal/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="/gallery"
              className="block px-4 py-2 text-gray-300 hover:bg-coral/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/flights"
              className="block px-4 py-2 text-gray-300 hover:bg-purple/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-gray-300 hover:bg-purple/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Travel Tips
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-300 hover:bg-gold/10 rounded-lg transition-colors"
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
