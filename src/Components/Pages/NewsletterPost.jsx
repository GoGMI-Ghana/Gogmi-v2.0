import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, Loader2, Mail } from 'lucide-react';

const API_URL = 'https://api.gogmi.org.gh/api';

const NewsletterPost = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/courses/hubspot-newsletter.php?action=single&id=${encodeURIComponent(id)}`);
        const data = await res.json();
        if (data.success) {
          setNewsletter(data.data);
        } else {
          setError(data.message || 'Newsletter not found');
        }
      } catch {
        setError('Unable to load this newsletter. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header bar */}
      <div className="border-b py-4" style={{ borderColor: '#E5E7EB' }}>
        <div className="container mx-auto max-w-4xl px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: '#132552' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News & Blog
          </Link>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#8E3400' }} />
          <span className="ml-3 text-lg" style={{ color: '#6B7280' }}>Loading newsletter…</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-32">
          <p className="text-lg mb-4 font-semibold" style={{ color: '#EF4444' }}>{error}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: '#8E3400' }}
          >
            Back to Blog
          </Link>
        </div>
      )}

      {/* Content */}
      {newsletter && !loading && (
        <>
          {/* Hero */}
          <section className="py-16 md:py-24" style={{ backgroundColor: '#132552' }}>
            <div className="container mx-auto max-w-4xl px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                   style={{ backgroundColor: 'rgba(142,52,0,0.25)' }}>
                <Mail className="w-4 h-4" style={{ color: '#C4501A' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#C4501A' }}>Newsletter</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-6"
                  style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {newsletter.subject}
              </h1>

              {newsletter.previewText && (
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {newsletter.previewText}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Calendar className="w-4 h-4" />
                <span>{formatDate(newsletter.publishDate)}</span>
              </div>
            </div>
          </section>

          {/* Body */}
          <section className="py-12">
            <div className="container mx-auto max-w-4xl px-6">
              {newsletter.html ? (
                <div
                  className="newsletter-body"
                  dangerouslySetInnerHTML={{ __html: newsletter.html }}
                />
              ) : (
                /* Fallback if no HTML was returned */
                <div className="text-center py-16">
                  <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: '#D1D5DB' }} />
                  <p className="text-lg font-semibold mb-2" style={{ color: '#132552' }}>
                    Full content not available to display inline.
                  </p>
                  {newsletter.absoluteUrl && (
                    <a
                      href={newsletter.absoluteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white mt-4"
                      style={{ backgroundColor: '#8E3400' }}
                    >
                      Read on HubSpot
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Scoped styles to contain HubSpot email HTML */}
          <style>{`
            .newsletter-body {
              color: #1F2937;
              font-size: 1rem;
              line-height: 1.75;
            }
            .newsletter-body img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
            }
            .newsletter-body a {
              color: #8E3400;
              text-decoration: underline;
            }
            .newsletter-body h1,
            .newsletter-body h2,
            .newsletter-body h3 {
              color: #132552;
              font-weight: 800;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
            }
            .newsletter-body p {
              margin-bottom: 1rem;
            }
            .newsletter-body table {
              max-width: 100% !important;
              width: 100% !important;
            }
            .newsletter-body td {
              padding: 8px;
            }
          `}</style>
        </>
      )}

    </div>
  );
};

export default NewsletterPost;
