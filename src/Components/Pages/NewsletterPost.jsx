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
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Top bar */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#132552', textDecoration: 'none', opacity: 1 }}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            Back to News & Blog
          </Link>
          {newsletter?.absoluteUrl && (
            <a
              href={newsletter.absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#6B7280', textDecoration: 'none' }}
            >
              <ExternalLink style={{ width: 14, height: 14 }} />
              Open original
            </a>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '160px 0' }}>
          <Loader2 style={{ width: 32, height: 32, color: '#8E3400', animation: 'spin 1s linear infinite' }} />
          <span style={{ marginLeft: 12, fontSize: 18, color: '#6B7280' }}>Loading newsletter…</span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ textAlign: 'center', padding: '160px 24px' }}>
          <p style={{ fontSize: 18, fontWeight: 600, color: '#EF4444', marginBottom: 16 }}>{error}</p>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, backgroundColor: '#8E3400', color: 'white', fontWeight: 700, textDecoration: 'none' }}>
            Back to Blog
          </Link>
        </div>
      )}

      {/* Content */}
      {newsletter && !loading && (
        <div>

          {/* Meta strip */}
          <div style={{ backgroundColor: '#132552', padding: '40px 24px' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(142,52,0,0.25)', padding: '6px 14px', borderRadius: 999, marginBottom: 16 }}>
                <Mail style={{ width: 14, height: 14, color: '#C4501A' }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4501A' }}>Newsletter</span>
              </div>
              <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12 }}>
                {newsletter.subject}
              </h1>
              {newsletter.previewText && (
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', marginBottom: 16, lineHeight: 1.6 }}>
                  {newsletter.previewText}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
                <Calendar style={{ width: 15, height: 15 }} />
                <span>{formatDate(newsletter.publishDate)}</span>
              </div>
            </div>
          </div>

          {/* Email body — true full width */}
          {newsletter.html ? (
            <div className="nl-body" dangerouslySetInnerHTML={{ __html: newsletter.html }} />
          ) : (
            <div style={{ maxWidth: 560, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
              <Mail style={{ width: 48, height: 48, color: '#D1D5DB', margin: '0 auto 16px' }} />
              <p style={{ fontSize: 16, fontWeight: 600, color: '#132552', marginBottom: 8 }}>Content could not be loaded inline.</p>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>This newsletter may not have a public web version yet.</p>
              {newsletter.absoluteUrl && (
                <a href={newsletter.absoluteUrl} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, backgroundColor: '#8E3400', color: 'white', fontWeight: 700, textDecoration: 'none' }}>
                  Read on HubSpot <ExternalLink style={{ width: 16, height: 16 }} />
                </a>
              )}
            </div>
          )}

        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .nl-body { width: 100%; background: white; }
        .nl-body > div { width: 100% !important; box-sizing: border-box; }
        .nl-body img { max-width: 100% !important; height: auto !important; display: block; }
        .nl-body table { width: 100% !important; border-collapse: collapse; }
        .nl-body td, .nl-body th { box-sizing: border-box; }
        .nl-body p, .nl-body h1, .nl-body h2, .nl-body h3, .nl-body li { max-width: 100%; }
        .nl-body a { word-break: break-word; }
        /* Expand inner padding on wide screens so content breathes */
        @media (min-width: 768px) {
          .nl-body { max-width: 860px; margin: 0 auto; }
        }
      `}</style>
    </div>
  );
};

export default NewsletterPost;
