import React, { useState } from 'react';
import { Play, X, Quote, Building2, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'individual', label: 'Individuals' },
  { id: 'organization', label: 'Organisations' },
  { id: 'video', label: 'Videos' },
  { id: 'letter', label: 'Letters & Messages' },
];

const TESTIMONIALS = [
  {
    id: 1,
    type: 'individual',
    format: 'quote',
    name: 'Rear Admiral (Rtd.) Issah Adam Issifu',
    role: 'Former Chief of Naval Staff, Ghana Navy',
    country: 'Ghana',
    content: 'GoGMI has consistently demonstrated its commitment to maritime security in the Gulf of Guinea. Their research outputs and capacity building programmes have directly strengthened our regional response mechanisms. I wholeheartedly commend the Institute\'s work to any stakeholder serious about maritime governance in West Africa.',
    featured: true,
  },
  {
    id: 2,
    type: 'organization',
    format: 'letter',
    name: 'Economic Community of West African States (ECOWAS)',
    role: 'Regional Organisation · Abuja, Nigeria',
    country: 'Nigeria',
    content: 'The Gulf of Guinea Maritime Institute has proven itself an indispensable partner in our efforts to implement the ECOWAS Integrated Maritime Strategy. GoGMI\'s policy briefs, expert consultations, and capacity building initiatives have materially advanced regional maritime cooperation. We look forward to deepening this partnership in the years ahead.',
    featured: true,
  },
  {
    id: 3,
    type: 'individual',
    format: 'quote',
    name: 'Dr. Nana Ama Asante',
    role: 'Maritime Policy Researcher · University of Ghana',
    country: 'Ghana',
    content: 'As a researcher, access to GoGMI\'s library and policy network has been transformative. The quality of discourse at their forums matches anything I have encountered at international institutions. GoGMI is building something genuinely significant for African maritime scholarship.',
  },
  {
    id: 4,
    type: 'individual',
    format: 'quote',
    name: 'Capt. Emeka Okafor',
    role: 'Master Mariner & Port Operations Consultant',
    country: 'Nigeria',
    content: 'I completed the Maritime Governance course in 2026 and returned to my role a fundamentally better professional. The curriculum was rigorous, the instructors were practitioners, and the cohort I trained with became a network I still rely on today.',
  },
  {
    id: 5,
    type: 'organization',
    format: 'letter',
    name: 'Ghana Shippers Authority',
    role: 'Government Agency · Accra, Ghana',
    country: 'Ghana',
    content: 'GoGMI\'s engagement with the shipping community has added real value to our work. Their ability to bridge the gap between academic research and operational realities in Ghana\'s ports is rare and commendable. We are proud to be associated with the Institute and support its ongoing mission.',
  },
  {
    id: 6,
    type: 'individual',
    format: 'quote',
    name: 'Fatoumata Diallo',
    role: 'Blue Economy Officer · Ministry of Fisheries, Senegal',
    country: 'Senegal',
    content: 'GoGMI offered me a platform I did not have before — a space where West African voices lead the conversation on our own maritime future. The IMSWG forum alone is worth the membership. I have formed lasting professional relationships through this institute.',
  },
  {
    id: 7,
    type: 'video',
    format: 'video',
    name: 'Prof. Kweku Ainuson',
    role: 'Director, Centre for African Affairs · University of Ghana',
    country: 'Ghana',
    content: 'Professor Ainuson reflects on GoGMI\'s growing influence in shaping African maritime policy and its role in training a new generation of maritime professionals.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&fit=crop',
  },
  {
    id: 8,
    type: 'organization',
    format: 'letter',
    name: 'International Maritime Organization (IMO)',
    role: 'United Nations Specialised Agency · London, UK',
    country: 'United Kingdom',
    content: 'GoGMI\'s contribution to advancing the IMO\'s goals in the Gulf of Guinea region has been noted with appreciation. The Institute\'s commitment to capacity building and maritime safety aligns closely with the IMO\'s mandate, and we recognise GoGMI as a credible and constructive partner in the region.',
    featured: true,
  },
  {
    id: 9,
    type: 'individual',
    format: 'quote',
    name: 'Lt. Cdr. Abena Mensah',
    role: 'Ghana Navy · Marine Casualty Investigator',
    country: 'Ghana',
    content: 'The Marine Casualty Investigation course equipped me with methodologies I had never been formally taught despite years of service. GoGMI filled a critical gap in my professional development and I have already applied those learnings to active investigations.',
  },
  {
    id: 10,
    type: 'video',
    format: 'video',
    name: 'Amb. Kojo Vanderpuye',
    role: 'Former Ghanaian Ambassador · Maritime Affairs Advocate',
    country: 'Ghana',
    content: 'Ambassador Vanderpuye speaks to GoGMI\'s unique positioning as a think tank that combines African perspectives with global maritime standards.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&fit=crop',
  },
];

const TypeIcon = ({ type }) => {
  if (type === 'organization') return <Building2 style={{ width: '14px', height: '14px' }} />;
  if (type === 'video') return <Play style={{ width: '14px', height: '14px' }} />;
  return <User style={{ width: '14px', height: '14px' }} />;
};

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [videoModal, setVideoModal] = useState(null);
  const navigate = useNavigate();

  const filtered = TESTIMONIALS.filter(t => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'video') return t.format === 'video';
    if (activeFilter === 'letter') return t.format === 'letter';
    return t.type === activeFilter;
  });

  const featured = filtered.filter(t => t.featured);
  const rest = filtered.filter(t => !t.featured);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>

      <style>{`
        .tes-fade { animation: tesFade 0.5s ease both; }
        @keyframes tesFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .tes-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(19,37,82,0.10); }
        .tes-card { transition: transform 0.2s, box-shadow 0.2s; }
        .play-btn:hover { transform: scale(1.1); }
        .play-btn { transition: transform 0.2s; }
        .filter-pill:hover { background-color: #132552; color: white; border-color: #132552; }
      `}</style>

      {/* Hero */}
      <div style={{ backgroundColor: '#132552', borderBottom: '4px solid #8E3400' }} className="pt-28 pb-14 px-6">
        <div className="max-w-5xl mx-auto">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#93C5FD', textTransform: 'uppercase', marginBottom: '10px' }}>
            Gulf of Guinea Maritime Institute
          </p>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px' }}>
            Voices of GoGMI
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.65)', maxWidth: '560px' }}>
            What individuals, institutions and partners say about GoGMI — in their own words, letters and messages.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ backgroundColor: '#EBEDF0', borderBottom: '1px solid #D1D5DB' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '12px 0', scrollbarWidth: 'none' }}>
            {FILTERS.map(f => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="filter-pill"
                  style={{
                    flexShrink: 0,
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

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Count */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7280', marginBottom: '28px' }}>
          <strong style={{ color: '#111827', fontWeight: 600 }}>{filtered.length}</strong> {filtered.length === 1 ? 'testimonial' : 'testimonials'}
        </p>

        {/* Featured */}
        {featured.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '16px' }}>
              Featured
            </p>
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))' }}>
              {featured.map((t, i) => (
                <TestimonialCard key={t.id} t={t} onPlay={setVideoModal} delay={i * 60} />
              ))}
            </div>
          </div>
        )}

        {/* Rest */}
        {rest.length > 0 && (
          <div>
            {featured.length > 0 && (
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '16px' }}>
                All Testimonials
              </p>
            )}
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))' }}>
              {rest.map((t, i) => (
                <TestimonialCard key={t.id} t={t} onPlay={setVideoModal} delay={i * 60} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', border: '1px solid #D1D5DB', borderRadius: '8px', backgroundColor: 'white' }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', fontWeight: 700, color: '#132552', marginBottom: '8px' }}>
              No testimonials found
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280' }}>
              Try a different filter
            </p>
          </div>
        )}

        {/* Submit CTA */}
        <div style={{ marginTop: '60px', padding: '36px', backgroundColor: '#132552', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
            Share Your Experience
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
            Have you worked with GoGMI? We'd love to hear from you.
          </p>
          <a
            href="mailto:info@gogmi.org.gh?subject=My GoGMI Testimonial"
            style={{
              display: 'inline-block',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: '#8E3400',
              color: 'white',
              padding: '11px 28px',
              borderRadius: '6px',
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
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '800px', position: 'relative' }}
          >
            <button
              onClick={() => setVideoModal(null)}
              style={{
                position: 'absolute', top: '-40px', right: 0,
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'white', display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: "'Inter', sans-serif", fontSize: '13px',
              }}
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

const TestimonialCard = ({ t, onPlay, delay }) => {
  const isVideo = t.format === 'video';
  const isLetter = t.format === 'letter';

  const formatLabel = isVideo ? 'Video' : isLetter ? 'Letter' : 'Testimonial';
  const formatColor = isVideo ? '#8E3400' : isLetter ? '#1B6CA8' : '#2D6A4F';
  const formatBg = isVideo ? '#FEF3C7' : isLetter ? '#EFF6FF' : '#ECFDF5';

  return (
    <div
      className="tes-card tes-fade"
      style={{
        backgroundColor: t.featured ? '#FFFBEB' : 'white',
        border: t.featured ? '1px solid #FDE68A' : '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '24px',
        animationDelay: `${delay}ms`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          backgroundColor: formatBg,
          color: formatColor,
          padding: '3px 10px',
          borderRadius: '3px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}>
          <TypeIcon type={t.type} />
          {formatLabel}
        </span>
        {t.featured && (
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            backgroundColor: '#8E3400',
            color: 'white',
            padding: '3px 10px',
            borderRadius: '3px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>Featured</span>
        )}
      </div>

      {/* Video thumbnail */}
      {isVideo && (
        <div
          onClick={() => onPlay(t.videoUrl)}
          style={{
            position: 'relative',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '16px',
            cursor: 'pointer',
            aspectRatio: '16/9',
            backgroundColor: '#132552',
          }}
        >
          {t.thumbnail && (
            <img
              src={t.thumbnail}
              alt={t.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              className="play-btn"
              style={{
                width: '52px', height: '52px',
                backgroundColor: '#8E3400',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              <Play style={{ width: '20px', height: '20px', color: 'white', marginLeft: '3px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Quote mark for text testimonials */}
      {!isVideo && (
        <Quote style={{ width: '22px', height: '22px', color: '#D1D5DB', marginBottom: '10px', flexShrink: 0 }} />
      )}

      {/* Content */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: 400,
        color: '#374151',
        lineHeight: 1.75,
        marginBottom: '20px',
        flex: 1,
        fontStyle: isVideo ? 'italic' : 'normal',
      }}>
        {t.content}
      </p>

      {/* Attribution */}
      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>
          {t.name}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 400, color: '#6B7280' }}>
          {t.role}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: '#9CA3AF', marginTop: '4px' }}>
          {t.country}
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
