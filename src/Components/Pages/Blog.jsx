import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Loader2 } from 'lucide-react';

const API_URL = 'https://api.gogmi.org.gh/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const LIMIT = 12;

  const fetchPosts = async (newOffset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/blog/hubspot-blog.php?action=list&limit=${LIMIT}&offset=${newOffset}`);
      const data = await res.json();
      if (data.success) {
        if (newOffset === 0) {
          setPosts(data.data.posts);
        } else {
          setPosts(prev => [...prev, ...data.data.posts]);
        }
        setTotal(data.data.total);
        setHasMore(data.data.hasMore);
        setOffset(newOffset);
      } else {
        setError(data.message || 'Failed to load posts');
      }
    } catch (err) {
      setError('Unable to load blog posts. Please try again later.');
      console.error('Blog fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getExcerpt = (post) => {
    const text = post.metaDescription || post.postSummary || '';
    if (text.length > 160) return text.substring(0, 160) + '...';
    return text;
  };

  const filteredPosts = searchQuery
    ? posts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.metaDescription || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.authorName || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #132552 0%, #1A336C 50%, #8E3400 100%)' }}></div>
        </div>
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-sm uppercase tracking-wider" style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>News & Insights</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl leading-tight mt-4 mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              GoGMI Blog
            </h1>
            <p className="text-xl leading-relaxed" style={{ fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
              Insights, analysis, and updates on maritime security, blue economy, and governance in the Gulf of Guinea.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent"
                style={{ borderColor: '#E5E7EB' }}
              />
            </div>
            <p className="text-sm" style={{ color: '#6B7280', fontWeight: 500 }}>
              {total} {total === 1 ? 'post' : 'posts'}
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">

          {/* Loading */}
          {loading && posts.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#8E3400' }} />
              <span className="ml-3 text-lg" style={{ color: '#6B7280', fontWeight: 500 }}>Loading posts...</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-20">
              <p className="text-lg mb-4" style={{ color: '#EF4444', fontWeight: 600 }}>{error}</p>
              <button
                onClick={() => fetchPosts(0)}
                className="px-6 py-3 rounded-lg text-white font-bold"
                style={{ backgroundColor: '#8E3400' }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* No posts */}
          {!loading && !error && filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl font-bold mb-2" style={{ color: '#132552' }}>
                {searchQuery ? 'No posts match your search' : 'No blog posts yet'}
              </p>
              <p className="text-base" style={{ color: '#6B7280' }}>
                {searchQuery ? 'Try a different search term.' : 'Check back soon for new content.'}
              </p>
            </div>
          )}

          {/* Posts grid */}
          {filteredPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug || post.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ border: '1px solid #E5E7EB' }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#F5F7FA' }}>
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.featuredImageAlt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#132552' }}>
                        <span className="text-4xl font-black text-white/20">GoGMI</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" style={{ color: '#8E3400' }} />
                        <span className="text-xs" style={{ color: '#6B7280', fontWeight: 500 }}>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" style={{ color: '#8E3400' }} />
                        <span className="text-xs" style={{ color: '#6B7280', fontWeight: 500 }}>{post.authorName}</span>
                      </div>
                    </div>

                    <h3 className="text-lg mb-3 line-clamp-2 group-hover:text-[#8E3400] transition-colors" style={{ fontWeight: 700, color: '#132552' }}>
                      {post.title}
                    </h3>

                    <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: '#6B7280' }}>
                      {getExcerpt(post)}
                    </p>

                    <div className="flex items-center gap-2 text-sm group-hover:gap-3 transition-all" style={{ fontWeight: 600, color: '#8E3400' }}>
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && !searchQuery && (
            <div className="text-center mt-12">
              <button
                onClick={() => fetchPosts(offset + LIMIT)}
                disabled={loading}
                className="px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                style={{ backgroundColor: '#132552', color: 'white' }}
              >
                {loading ? 'Loading...' : 'Load More Posts'}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
