import React, { useState } from 'react';
import { Play, X, Quote, Download, FileText } from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'organization', label: 'Organisations' },
  { id: 'individual', label: 'Individuals' },
  { id: 'video', label: 'Videos' },
];

const TESTIMONIALS = [
  {
    id: 1,
    type: 'organization',
    format: 'letter',
    name: 'Atlantic Centre',
    role: 'Atlantic Centre Coordinator',
    signatory: 'Rear Admiral Nuno de Noronha Bragança',
    country: 'Lisbon, Portugal',
    date: 'April 21, 2026',
    logo: '/logos/atlantic-centre.png',
    excerpt: 'GoGMI is arising to one of the key African-led Think Tanks in the broad geography of the Gulf of Guinea. What distinguishes GoGMI apart is not only the quality of its training and research, but also its commitment to inclusive, African-led solutions.',
    downloadUrl: '/Testimonial_from_AC_GoGMI.pdf',
    featured: true,
  },
  {
    id: 2,
    type: 'organization',
    format: 'letter',
    name: 'Economic Community of West African States (ECOWAS)',
    role: 'Regional Organisation',
    signatory: 'Office of the Commissioner, Political Affairs',
    country: 'Abuja, Nigeria',
    date: '2025',
    logo: null,
    excerpt: 'GoGMI\'s policy briefs, expert consultations, and capacity building initiatives have materially advanced regional maritime cooperation. We look forward to deepening this partnership in the years ahead.',
    downloadUrl: null,
    featured: true,
  },
  {
    id: 3,
    type: 'individual',
    format: 'quote',
    name: 'Rear Admiral (Rtd.) Issah Adam Issifu',
    role: 'Former Chief of Naval Staff, Ghana Navy',
    country: 'Ghana',
    date: '2025',
    logo: null,
    excerpt: 'GoGMI has consistently demonstrated its commitment to maritime security in the Gulf of Guinea. Their research outputs and capacity building programmes have directly strengthened our regional response mechanisms.',
    downloadUrl: null,
    featured: false,
  },
  {
    id: 4,
    type: 'individual',
    format: 'quote',
    name: 'Fatoumata Diallo',
    role: 'Blue Economy Officer · Ministry of Fisheries, Senegal',
    country: 'Senegal',
    date: '2025',
    logo: null,
    excerpt: 'GoGMI offered me a platform I did not have before — a space where West African voices lead the conversation on our own maritime future. The IMSWG forum alone is worth the membership.',
    downloadUrl: null,
    featured: false,
  },
  {
    id: 5,
    type: 'video',
    format: 'video',
    name: 'Prof. Kweku Ainuson',
    role: 'Director, Centre for African Affairs · University of Ghana',
    country: 'Ghana',
    date: '2025',
    logo: null,
    excerpt: 'Professor Ainuson reflects on GoGMI\'s growing influence in shaping African maritime policy and its role in training a new generation of maritime professionals.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&fit=crop',
    downloadUrl: null,
    featured: false,
  },
];

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [videoModal, setVideoModal] = useState(null);

  const filtered = TESTIMONIALS.filter(t => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'video') return t.format === 'video';
    return t.type === activeFilter;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#132552', borderBottom: '4px solid #8E3400' }} className="pt-28 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#93C5FD', textTransform: 'uppercase', marginBottom: '10px' }}>
            Gulf of Guinea Maritime Institute
          </p>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px' }}>
            Voices of GoGMI
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.6)', maxWidth: '500px' }}>
            What partners, institutions and professionals say about our work.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ backgroundColor: '#EBEDF0', borderBottom: '1px solid #D1D5DB' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div style={{ display: 'flex', gap: '6px', padding: '12px 0' }}>
            {FILTERS.map(f => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '4px',
                    border: isActive ? '1px solid #132552' : '1px solid #C4C9D4',
                    backgroundColor: isActive ? '#132552' : 'white',
                    color: isActive ? 'white' : '#374151',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(t => (
            <TestimonialCard key={t.id} t={t} onPlay={setVideoModal} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', fontWeight: 700, color: '#132552' }}>
              No testimonials in this category yet.
            </p>
          </div>
        )}

        {/* Submit CTA */}
        <div style={{ marginTop: '52px', padding: '32px', backgroundColor: '#132552', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>
            Share Your Experience
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '18px' }}>
            Have you worked with GoGMI? We'd love to hear from you.
          </p>
          <a
            href="mailto:info@gogmi.org.gh?subject=My GoGMI Testimonial"
            style={{
              display: 'inline-block',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: '#8E3400',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '5px',
              textDecoration: 'none',
            }}
          >
            Send Your Testimonial →
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          onClick={() => setVideoModal(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '800px', position: 'relative' }}>
            <button
              onClick={() => setVideoModal(null)}
              style={{ position: 'absolute', top: '-40px', right: 0, background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}
            >
              <X style={{ width: '16px', height: '16px' }} /> Close
            </button>
            <div style={{ paddingBottom: '56.25%', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe
                src={videoModal}
                title="Testimonial video"
                allow="autoplay; fullscreen"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TestimonialCard = ({ t, onPlay }) => {
  const isVideo = t.format === 'video';
  const isLetter = t.format === 'letter';

  return (
    <div style={{
      backgroundColor: 'white',
      border: t.featured ? '1px solid #FDE68A' : '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '28px',
      backgroundColor: t.featured ? '#FFFBEB' : 'white',
    }}>

      {/* Top: logo + name + badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Logo or initial */}
          <div style={{
            width: '48px', height: '48px', borderRadius: '6px', flexShrink: 0,
            backgroundColor: '#EFF6FF',
            border: '1px solid #DBEAFE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {t.logo ? (
              <img src={t.logo} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
            ) : (
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', fontWeight: 800, color: '#132552' }}>
                {t.name.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0, marginBottom: '2px' }}>
              {t.name}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#6B7280', margin: 0 }}>
              {t.role} · {t.country}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {t.featured && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, backgroundColor: '#8E3400', color: 'white', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Featured
            </span>
          )}
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
            color: isVideo ? '#8E3400' : isLetter ? '#1E40AF' : '#065F46',
            backgroundColor: isVideo ? '#FEF3C7' : isLetter ? '#EFF6FF' : '#ECFDF5',
            padding: '2px 8px', borderRadius: '3px',
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            {isVideo ? 'Video' : isLetter ? 'Letter' : 'Testimonial'}
          </span>
        </div>
      </div>

      {/* Video thumbnail */}
      {isVideo && (
        <div
          onClick={() => onPlay(t.videoUrl)}
          style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px', cursor: 'pointer', aspectRatio: '16/9', backgroundColor: '#132552', maxWidth: '480px' }}
        >
          {t.thumbnail && <img src={t.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#8E3400', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>
              <Play style={{ width: '18px', height: '18px', color: 'white', marginLeft: '3px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Quote icon for non-video */}
      {!isVideo && (
        <Quote style={{ width: '20px', height: '20px', color: '#D1D5DB', marginBottom: '10px' }} />
      )}

      {/* Excerpt */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: '#374151', lineHeight: 1.75, marginBottom: isLetter && t.downloadUrl ? '16px' : '0' }}>
        "{t.excerpt}"
      </p>

      {/* Letter download */}
      {isLetter && t.downloadUrl && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
            <FileText style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            Full letter available · {t.date}
            {t.signatory && <> · Signed by {t.signatory}</>}
          </p>
          <a
            href={t.downloadUrl}
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600,
              color: '#132552', textDecoration: 'none',
              border: '1px solid #132552', padding: '6px 14px', borderRadius: '4px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#132552'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#132552'; }}
          >
            <Download style={{ width: '13px', height: '13px' }} />
            Download Letter
          </a>
        </div>
      )}

      {/* Date for non-letter */}
      {!isLetter && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#9CA3AF', marginTop: '14px' }}>
          {t.date}
        </p>
      )}
    </div>
  );
};

export default Testimonials;
