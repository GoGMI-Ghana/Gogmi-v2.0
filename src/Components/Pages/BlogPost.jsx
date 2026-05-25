import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Loader2 } from 'lucide-react';

const API_URL = 'https://api.gogmi.org.gh/api';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/blog/hubspot-blog.php?action=post&slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (data.success) {
          setPost(data.data);
        } else {
          setError(data.message || 'Post not found');
        }
      } catch (err) {
        setError('Unable to load this post. Please try again.');
        console.error('Post fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#8E3400' }} />
        <span className="ml-3 text-lg" style={{ color: '#6B7280' }}>Loading post...</span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: '#132552' }}>Post Not Found</h2>
          <p className="text-base mb-6" style={{ color: '#6B7280' }}>{error || 'This post could not be found.'}</p>
          <Link to="/blog" className="px-6 py-3 rounded-lg text-white font-bold" style={{ backgroundColor: '#8E3400' }}>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Hero */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          {post.featuredImage ? (
            <>
              <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(19, 37, 82, 0.85) 0%, rgba(19, 37, 82, 0.95) 100%)' }}></div>
            </>
          ) : (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #132552 0%, #1A336C 100%)' }}></div>
          )}
        </div>

        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 mb-8 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Back to Blog</span>
          </button>

          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" style={{ color: '#8E3400' }} />
              <span className="text-sm font-semibold">{post.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: '#8E3400' }} />
              <span className="text-sm font-semibold">{formatDate(post.publishDate)}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <article
            className="prose prose-lg max-w-none"
            style={{
              color: '#374151',
              lineHeight: 1.8,
              fontSize: '17px',
            }}
            dangerouslySetInnerHTML={{ __html: post.postBody }}
          />
        </div>
      </section>

      {/* Bottom nav */}
      <section className="py-12 border-t" style={{ borderColor: '#E5E7EB', backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all"
              style={{ backgroundColor: '#132552', color: 'white' }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Posts
            </Link>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold border-2 transition-all"
              style={{ borderColor: '#8E3400', color: '#8E3400' }}
            >
              <Share2 className="w-4 h-4" />
              Share Post
            </button>
          </div>
        </div>
      </section>

      {/* Scoped styles for HubSpot HTML content */}
      <style>{`
        article.prose h1, article.prose h2, article.prose h3, article.prose h4 {
          color: #132552;
          font-weight: 800;
          margin-top: 2em;
          margin-bottom: 0.5em;
        }
        article.prose h2 { font-size: 1.75rem; }
        article.prose h3 { font-size: 1.4rem; }
        article.prose p { margin-bottom: 1.25em; }
        article.prose img {
          border-radius: 12px;
          max-width: 100%;
          height: auto;
          margin: 2em 0;
        }
        article.prose a {
          color: #8E3400;
          font-weight: 600;
          text-decoration: underline;
        }
        article.prose a:hover { color: #6B2700; }
        article.prose ul, article.prose ol {
          padding-left: 1.5em;
          margin-bottom: 1.25em;
        }
        article.prose li { margin-bottom: 0.5em; }
        article.prose blockquote {
          border-left: 4px solid #8E3400;
          padding: 1em 1.5em;
          margin: 2em 0;
          background-color: #F5F7FA;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #4B5563;
        }
        article.prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
        }
        article.prose th, article.prose td {
          border: 1px solid #E5E7EB;
          padding: 0.75em 1em;
          text-align: left;
        }
        article.prose th {
          background-color: #132552;
          color: white;
          font-weight: 700;
        }
        article.prose iframe {
          max-width: 100%;
          border-radius: 12px;
          margin: 2em 0;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
