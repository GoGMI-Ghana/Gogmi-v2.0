import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, Loader2, Mail, ExternalLink } from 'lucide-react';

const API_URL = 'https://api.gogmi.org.gh/api';

const NewsletterPost = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_URL}/courses/hubspot-newsletter.php?action=single&id=${encodeURIComponent(id)}`
        );
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
    load();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3F4F6', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Top bar */}
      <div className="bg-white border-b sticky top-0 z-30" style={{ borderColor: '#E5E7EB' }}>
        <div className="container mx-auto max-w-5xl px-6 py-4 flex items-center justify-between gap-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: '#132552' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News & Blog
          </Link>

          {newsletter?.absoluteUrl && (
            <a
              href={newsletter.absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-70 transition-opacity"
              style={{ color: '#6B7280' }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open original
            </a>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#8E3400' }} />
          <span className="ml-3 text-lg" style={{ color: '#6B7280' }}>Loading newsletter…</span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-40">
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
        <div className="container mx-auto max-w-3xl px-4 py-10">

          {/* Meta header */}
          <div className="bg-white rounded-2xl px-8 py-6 mb-6 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                 style={{ backgroundColor: 'rgba(142,52,0,0.1)' }}>
              <Mail className="w-3.5 h-3.5" style={{ color: '#8E3400' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8E3400' }}>Newsletter</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black mb-3" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              {newsletter.subject}
            </h1>

            {newsletter.previewText && (
              <p className="text-base leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                {newsletter.previewText}
              </p>
            )}

            <div className="flex items-center gap-2 text-sm" style={{ color: '#9CA3AF' }}>
              <Calendar className="w-4 h-4" />
              <span>{formatDate(newsletter.publishDate)}</span>
            </div>
          </div>

          {/* Email body */}
          {newsletter.html ? (
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
              style={{ border: '1px solid #E5E7EB' }}
            >
              {/* Render the email HTML exactly as HubSpot sends it */}
              <div
                className="newsletter-content"
                dangerouslySetInnerHTML={{ __html: newsletter.html }}
              />
            </div>
          ) : (
            /* Fallback: content couldn't be fetched */
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
              <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: '#D1D5DB' }} />
              <p className="text-base font-semibold mb-2" style={{ color: '#132552' }}>
                Content could not be loaded inline.
              </p>
              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
                This newsletter may not have a public web version yet.
              </p>
              {newsletter.absoluteUrl && (
                <a
                  href={newsletter.absoluteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white"
                  style={{ backgroundColor: '#8E3400' }}
                >
                  Read on HubSpot
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}

        </div>
      )}

      {/* Scoped styles — make email HTML look clean inside our page */}
      <style>{`
        .newsletter-content {
          max-width: 100%;
          overflow-x: auto;
        }
        .newsletter-content * {
          max-width: 100% !important;
        }
        .newsletter-content img {
          height: auto !important;
          border-radius: 6px;
        }
        .newsletter-content table {
          width: 100% !important;
          border-collapse: collapse;
        }
        .newsletter-content a {
          word-break: break-word;
        }
        /* Remove HubSpot's fixed-width email wrapper */
        .newsletter-content .email-body,
        .newsletter-content .wrapper,
        .newsletter-content [width] {
          width: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default NewsletterPost;
