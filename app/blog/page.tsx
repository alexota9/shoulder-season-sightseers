import Link from 'next/link';
import { blogPosts } from '@/lib/data/blog-posts';

const categoryColors = {
  budget: 'bg-gold/10 text-gold-700',
  packing: 'bg-teal/10 text-teal-700',
  'shoulder-season': 'bg-coral/10 text-coral-700',
  tips: 'bg-purple/10 text-purple-700',
  gear: 'bg-teal/10 text-teal-700',
};

const categoryLabels = {
  budget: 'Budget Travel',
  packing: 'Packing Tips',
  'shoulder-season': 'Shoulder Season',
  tips: 'Travel Tips',
  gear: 'Gear Reviews',
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/Belgium%2011-24/brugge1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(3px)',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 aurora-text">
            Travel Tips & Guides
          </h1>
          <p
            className="text-xl text-white max-w-2xl mx-auto font-bold"
            style={{
              textShadow: '0 0 20px rgba(0,0,0,1), 2px 2px 6px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1)'
            }}
          >
            Learn from our experiences traveling light and on a budget around the world.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 text-sm font-semibold text-teal uppercase">Featured Post</div>
          {sortedPosts[0] && (
            <Link href={`/blog/${sortedPosts[0].slug}`} className="group">
              <div className="bg-gradient-to-br from-teal/20 to-coral/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="md:flex">
                  <div className="md:w-1/2 aspect-[16/9] md:aspect-auto bg-gradient-to-br from-purple/30 to-gold/30 flex items-center justify-center">
                    <div className="text-8xl">📝</div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[sortedPosts[0].category]}`}>
                        {categoryLabels[sortedPosts[0].category]}
                      </span>
                      <span className="text-gray-400 text-sm">{sortedPosts[0].readTime}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-teal transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {sortedPosts[0].title}
                    </h2>
                    <p className="text-lg mb-6" style={{ color: 'var(--text-primary)' }}>
                      {sortedPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span>{new Date(sortedPosts[0].date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--section-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 aurora-text">All Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                style={{ backgroundColor: 'var(--card-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--card-border)' }}
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-teal/20 to-coral/20 flex items-center justify-center">
                  <div className="text-5xl">
                    {post.category === 'budget' && '💰'}
                    {post.category === 'packing' && '🎒'}
                    {post.category === 'shoulder-season' && '🍂'}
                    {post.category === 'tips' && '💡'}
                    {post.category === 'gear' && '⚙️'}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}>
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-teal transition-colors line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--text-primary)' }}>
                    {post.excerpt}
                  </p>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center aurora-text">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const count = blogPosts.filter((post) => post.category === key).length;
              return (
                <div
                  key={key}
                  className={`${categoryColors[key as keyof typeof categoryColors]} rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer`}
                >
                  <div className="text-3xl mb-2">
                    {key === 'budget' && '💰'}
                    {key === 'packing' && '🎒'}
                    {key === 'shoulder-season' && '🍂'}
                    {key === 'tips' && '💡'}
                    {key === 'gear' && '⚙️'}
                  </div>
                  <div className="font-semibold mb-1">{label}</div>
                  <div className="text-sm opacity-75">{count} posts</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple/10 to-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 aurora-text">
            Want More Travel Tips?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'var(--text-primary)' }}>
            Follow our journey as we continue exploring the world on a budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-6 py-3 rounded-full focus:outline-none focus:border-teal"
              style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              disabled
            />
            <button
              className="px-8 py-3 bg-gradient-to-r from-teal to-coral text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
