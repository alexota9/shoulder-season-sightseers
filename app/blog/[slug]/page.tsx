import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getPostBySlug } from '@/lib/data/blog-posts';

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

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <article className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/blog" className="text-gray-600 hover:text-teal transition-colors">
              ← Back to Blog
            </Link>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[post.category]}`}>
              {categoryLabels[post.category]}
            </span>
            <span className="text-gray-500">{post.readTime}</span>
            <span className="text-gray-500">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Featured Image Placeholder */}
          <div className="aspect-[21/9] bg-gradient-to-br from-teal/20 via-purple/20 to-coral/20 rounded-2xl mb-12 flex items-center justify-center shadow-lg">
            <div className="text-8xl">
              {post.category === 'budget' && '💰'}
              {post.category === 'packing' && '🎒'}
              {post.category === 'shoulder-season' && '🍂'}
              {post.category === 'tips' && '💡'}
              {post.category === 'gear' && '⚙️'}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="
                [&>h1]:text-4xl [&>h1]:font-display [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-12
                [&>h2]:text-3xl [&>h2]:font-display [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:text-teal
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:mt-8
                [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-6
                [&>ul]:mb-6 [&>ul]:space-y-2
                [&>ul>li]:text-gray-700 [&>ul>li]:leading-relaxed
                [&>ol]:mb-6 [&>ol]:space-y-2 [&>ol]:list-decimal [&>ol]:ml-6
                [&>ol>li]:text-gray-700 [&>ol>li]:leading-relaxed
                [&>strong]:font-semibold [&>strong]:text-gray-900
                [&>blockquote]:border-l-4 [&>blockquote]:border-teal [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
              "
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </div>
      </article>

      {/* Share Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">Found this helpful? Share it with fellow travelers!</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-white rounded-full shadow hover:shadow-md transition-shadow text-gray-700">
              Share on Twitter
            </button>
            <button className="px-6 py-2 bg-white rounded-full shadow hover:shadow-md transition-shadow text-gray-700">
              Share on Facebook
            </button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-teal/20 to-coral/20 flex items-center justify-center">
                    <div className="text-5xl">
                      {relatedPost.category === 'budget' && '💰'}
                      {relatedPost.category === 'packing' && '🎒'}
                      {relatedPost.category === 'shoulder-season' && '🍂'}
                      {relatedPost.category === 'tips' && '💡'}
                      {relatedPost.category === 'gear' && '⚙️'}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[relatedPost.category]}`}>
                      {categoryLabels[relatedPost.category]}
                    </span>
                    <h3 className="text-lg font-bold mt-3 mb-2 group-hover:text-teal transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal/10 to-coral/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Start Your Budget Travel Adventure?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Explore our destination guides and see where we've been.
          </p>
          <Link
            href="/destinations"
            className="inline-block px-8 py-3 bg-gradient-to-r from-teal to-coral text-white rounded-full hover:shadow-lg transition-shadow font-semibold"
          >
            Explore Destinations
          </Link>
        </div>
      </section>
    </div>
  );
}
