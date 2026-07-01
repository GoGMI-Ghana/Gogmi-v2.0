import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Loader2, Mail } from 'lucide-react';

const API_URL = 'https://api.gogmi.org.gh/api';
const LIMIT = 12;

const Blog = () => {
  const [tab, setTab] = useState('blog'); // 'blog' | 'newsletter'

  // Blog state
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);
  const [postsOffset, setPostsOffset] = useState(0);
  const [postsHasMore, setPostsHasMore] = useState(false);
  const [postsTotal, setPostsTotal] = useState(0);

  // Newsletter state
  const [newsletters, setNewsletters] = useState([]);
  const [nlLoading, setNlLoading] = useState(false);
  const [nlError, setNlError] = useState(null);
  const [nlOffset, setNlOffset] = useState(0);
  const [nlHasMore, setNlHasMore] = useState(false);
  const [nlTotal, setNlTotal] = useState(0);
  const [nlFetched, setNlFetched] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  // ── Fetch blogs ────────────────────────────────────────────────────────
  const fetchPosts = async (newOffset = 0) => {
    setPostsLoading(true);
    setPostsError(null);
    try {
      const res = await fetch(`${API_URL}/courses/hubspot-blog.php?action=list&limit=${LIMIT}&offset=${newOffset}`);
      const data = await res.json();
      if (data.success) {
        setPosts(prev => newOffset === 0 ? data.data.posts : [...prev, ...data.data.posts]);
        setPostsTotal(data.data.total);
        setPostsHasMore(data.data.hasMore);
        setPostsOffset(newOffset);
      } else {
        setPostsError(data.message || 'Failed to load posts');
      }
    } catch {
      setPostsError('Unable to load blog posts. Please try again later.');
    } finally {
      setPostsLoading(false);
    }
  };

  // ── Fetch newsletters ──────────────────────────────────────────────────
  const fetchNewsletters = async (newOffset = 0) => {
    setNlLoading(true);
    setNlError(null);
    try {
      const res = await fetch(`${API_URL}/courses/hubspot-newsletter.php?action=list&limit=${LIMIT}&offset=${newOffset}`);
      const data = await res.json();
      if (data.success) {
        setNewsletters(prev => newOffset === 0 ? data.data.newsletters : [...prev, ...data.data.newsletters]);
        setNlTotal(data.data.total);
        setNlHasMore(data.data.hasMore);
        setNlOffset(newOffset);
        setNlFetched(true);
      } else {
        setNlError(data.message || 'Failed to load newsletters');
      }
    } catch {
      setNlError('Unable to load newsletters. Please try again later.');
    } finally {
      setNlLoading(false);
    }
  };

  useEffect(() => { fetchPosts(0); }, []);

  // Lazy-load newsletters only when tab is first opened
  useEffect(() => {
    if (tab === 'newsletter' && !nlFetched) {
      fetchNewsletters(0);
    }
  }, [tab]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const filteredPosts = searchQuery
    ? posts.filter(p =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.metaDescription || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.authorName || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  const filteredNewsletters = searchQuery
    ? newsletters.filter(n =>
        (n.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (n.previewText || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newsletters;

  const isLoading = tab === 'blog' ? postsLoading : nlLoading;
  const currentError = tab === 'blog' ? postsError : nlError;
  const currentTotal = tab === 'blog' ? postsTotal : nlTotal;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #132552 0%, #1A336C 50%, #8E3400 100%)' }} />
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-sm uppercase tracking-wider" style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>News & Insights</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl leading-tight mt-4 mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              News & Blog
            </h1>
            <p className="text-xl leading-relaxed" style={{ fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
              Insights, analysis, and updates on maritime security, blue economy, and governance in the Gulf of Guinea.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs + Search */}
      <section className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: '#F3F4F6' }}>
              {[
                { key: 'blog', label: 'Blog Posts' },
                { key: 'newsletter', label: 'Newsletters' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => { setTab(key); setSearchQuery(''); }}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: tab === key ? 'white' : 'transparent',
                    color: tab === key ? '#132552' : '#6B7280',
                    boxShadow: tab === key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    fontWeight: tab === key ? 700 : 500,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Search + count */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  type="text"
                  placeholder={`Search ${tab === 'blog' ? 'posts' : 'newsletters'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent"
                  style={{ borderColor: '#E5E7EB', width: '220px' }}
                />
              </div>
              <span className="text-sm whitespace-nowrap" style={{ color: '#6B7280', fontWeight: 500 }}>
                {currentTotal} {tab === 'blog' ? 'posts' : 'newsletters'}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">

          {/* Loading */}
          {isLoading && (tab === 'blog' ? posts.length === 0 : newsletters.length === 0) && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#8E3400' }} />
              <span className="ml-3 text-lg" style={{ color: '#6B7280', fontWeight: 500 }}>Loading…</span>
            </div>
          )}

          {/* Error */}
          {currentError && (
            <div className="text-center py-20">
              <p className="text-lg mb-4" style={{ color: '#EF4444', fontWeight: 600 }}>{currentError}</p>
              <button
                onClick={() => tab === 'blog' ? fetchPosts(0) : fetchNewsletters(0)}
                className="px-6 py-3 rounded-lg text-white font-bold"
                style={{ backgroundColor: '#8E3400' }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* ── BLOG POSTS ── */}
          {tab === 'blog' && !postsLoading && !postsError && (
            <>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-2xl font-bold mb-2" style={{ color: '#132552' }}>
                    {searchQuery ? 'No posts match your search' : 'No blog posts yet'}
                  </p>
                  <p className="text-base" style={{ color: '#6B7280' }}>
                    {searchQuery ? 'Try a different search term.' : 'Check back soon for new content.'}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug || post.id}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      style={{ border: '1px solid #E5E7EB' }}
                    >
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
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" style={{ color: '#8E3400' }} />
                            <span className="text-xs" style={{ color: '#6B7280', fontWeight: 500 }}>{formatDate(post.publishDate)}</span>
                          </div>
                          {post.authorName && (
                            <div className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" style={{ color: '#8E3400' }} />
                              <span className="text-xs" style={{ color: '#6B7280', fontWeight: 500 }}>{post.authorName}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg mb-3 line-clamp-2 group-hover:text-[#8E3400] transition-colors" style={{ fontWeight: 700, color: '#132552' }}>
                          {post.title}
                        </h3>
                        <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: '#6B7280' }}>
                          {post.metaDescription || post.postSummary || ''}
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

              {postsHasMore && !searchQuery && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => fetchPosts(postsOffset + LIMIT)}
                    disabled={postsLoading}
                    className="px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                    style={{ backgroundColor: '#132552', color: 'white' }}
                  >
                    {postsLoading ? 'Loading…' : 'Load More Posts'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* ── NEWSLETTERS ── */}
          {tab === 'newsletter' && !nlLoading && !nlError && (
            <>
              {filteredNewsletters.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-2xl font-bold mb-2" style={{ color: '#132552' }}>
                    {searchQuery ? 'No newsletters match your search' : 'No newsletters yet'}
                  </p>
                  <p className="text-base" style={{ color: '#6B7280' }}>
                    {searchQuery ? 'Try a different search term.' : 'Check back soon.'}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredNewsletters.map((nl) => (
                    <Link
                      key={nl.id}
                      to={`/newsletter/${nl.id}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      style={{ border: '1px solid #E5E7EB' }}
                    >
                      {/* Thumbnail or placeholder */}
                      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#F5F7FA' }}>
                        {nl.thumbnail ? (
                          <img
                            src={nl.thumbnail}
                            alt={nl.subject}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ backgroundColor: '#132552' }}>
                            <Mail className="w-10 h-10" style={{ color: 'rgba(255,255,255,0.2)' }} />
                            <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.2)' }}>Newsletter</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-1.5 mb-3">
                          <Calendar className="w-3.5 h-3.5" style={{ color: '#8E3400' }} />
                          <span className="text-xs" style={{ color: '#6B7280', fontWeight: 500 }}>{formatDate(nl.publishDate)}</span>
                        </div>

                        <h3 className="text-lg mb-3 line-clamp-2 group-hover:text-[#8E3400] transition-colors" style={{ fontWeight: 700, color: '#132552' }}>
                          {nl.subject}
                        </h3>

                        {nl.previewText && (
                          <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: '#6B7280' }}>
                            {nl.previewText}
                          </p>
                        )}

                        <div className="inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all" style={{ fontWeight: 600, color: '#8E3400' }}>
                          Read Newsletter
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {nlHasMore && !searchQuery && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => fetchNewsletters(nlOffset + LIMIT)}
                    disabled={nlLoading}
                    className="px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                    style={{ backgroundColor: '#132552', color: 'white' }}
                  >
                    {nlLoading ? 'Loading…' : 'Load More Newsletters'}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </div>
  );
};

export default Blog;
