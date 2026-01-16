'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the map component (client-side only)
const TravelMap = dynamic(() => import('@/components/ui/TravelMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gradient-to-br from-teal/20 to-coral/20 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <div className="text-gray-400">Loading map...</div>
      </div>
    </div>
  ),
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/Iceland/Iceland%202024/diamondbeach1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(3px)',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1
            className="text-5xl md:text-6xl font-display font-bold mb-6"
            style={{
              color: '#70b8b8',
              textShadow: '0 0 30px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,1), 3px 3px 6px rgba(0,0,0,1), -2px -2px 0 rgba(0,0,0,1), 2px -2px 0 rgba(0,0,0,1), -2px 2px 0 rgba(0,0,0,1), 2px 2px 0 rgba(0,0,0,1)',
            }}
          >
            About Us
          </h1>
          <p
            className="text-xl md:text-2xl text-white max-w-2xl mx-auto font-bold"
            style={{
              textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 6px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1)'
            }}
          >
            We're a couple who believes that amazing travel experiences don't require luxury budgets or heavy luggage.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="aspect-square bg-gradient-to-br from-teal/20 to-coral/20 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-8xl mb-4">👫</div>
                <div className="text-2xl font-semibold text-gray-300">Us</div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-display font-bold mb-6 text-teal">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                <p>
                  We started traveling together with the dream of seeing the world, but not the budget
                  of luxury travelers. What we discovered changed everything.
                </p>
                <p>
                  By traveling light, choosing shoulder season, and embracing budget-friendly options,
                  we found we could travel longer, see more, and have more authentic experiences than
                  we ever imagined.
                </p>
                <p>
                  Now, after exploring 16 countries across 4 continents, we're here to share everything
                  we've learned about making travel accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Philosophy */}
      <section id="travel-style" className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Our Travel Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">🎒</div>
              <h3 className="text-2xl font-bold mb-4 text-teal">Travel Light</h3>
              <p className="text-gray-300 leading-relaxed">
                Everything we need fits in our Osprey Farpoint 40L backpacks. No checked bags means
                more freedom, lower costs, and less stress. We've mastered the art of packing smart,
                not packing more.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-coral">Budget Conscious</h3>
              <p className="text-gray-300 leading-relaxed">
                We believe incredible experiences shouldn't require a trust fund. By staying in hostels,
                cooking our own meals, and seeking out free activities, we stretch our budget without
                sacrificing adventure.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">🍂</div>
              <h3 className="text-2xl font-bold mb-4 text-gold">Shoulder Season</h3>
              <p className="text-gray-300 leading-relaxed">
                Visiting destinations in shoulder season means fewer crowds, better prices, and more
                authentic interactions with locals. It's the sweet spot between peak tourist season
                and the off-season.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Gear */}
      <section id="gear" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Our Essential Gear</h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-teal/10 to-transparent rounded-xl p-6 border border-teal/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎒</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Osprey Farpoint 40L</h3>
                  <p className="text-gray-300">
                    Our go-to travel backpack. Carry-on sized, comfortable, and incredibly durable.
                    We've put these through thousands of miles and they're still going strong.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-coral/10 to-transparent rounded-xl p-6 border border-coral/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📸</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Camera Equipment</h3>
                  <p className="text-gray-300">
                    My fiancé captures our journey with a mirrorless camera and a couple of versatile
                    lenses. Light enough to carry all day, powerful enough for stunning shots.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple/10 to-transparent rounded-xl p-6 border border-purple/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">👕</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Quick-Dry Clothing</h3>
                  <p className="text-gray-300">
                    Merino wool and synthetic fabrics are our best friends. They dry overnight, resist
                    odors, and can be worn multiple times before washing.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gold/10 to-transparent rounded-xl p-6 border border-gold/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔌</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Electronics</h3>
                  <p className="text-gray-300">
                    Universal adapter, portable power bank, and our phones for navigation and booking.
                    We keep electronics minimal to save space and weight.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog/osprey-farpoint-review"
              className="inline-block px-8 py-3 bg-teal text-white rounded-full hover:bg-teal-600 transition-colors font-semibold"
            >
              Read Our Full Gear Review
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-4 text-center">Where We've Been</h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            16 countries and counting. Click on the markers to learn more about each destination.
          </p>
          <TravelMap />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-teal mb-2">16</div>
              <div className="text-gray-300">Countries Visited</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-coral mb-2">4</div>
              <div className="text-gray-300">Continents</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple mb-2">40L</div>
              <div className="text-gray-300">Backpack Size</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">100%</div>
              <div className="text-gray-300">Budget Travel</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple/10 to-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Join Us on Our Journey
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our destinations, read our travel tips, and start planning your own budget adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/destinations"
              className="px-8 py-3 bg-teal text-white rounded-full hover:bg-teal-600 transition-colors font-semibold"
            >
              View Destinations
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 bg-gray-800 text-gray-300 border-2 border-gray-700 rounded-full hover:border-coral transition-colors font-semibold"
            >
              Read Travel Tips
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
