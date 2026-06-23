import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Microscope,
} from 'lucide-react';

/* ─── Single source of truth for fonts ─── */
const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const Research = () => {
  const researchThemes = [
    {
      question: "MARITIME SECURITY INTERVENTIONS AUDIT",
      description: "Comprehensive audit mapping maritime security interventions across the Gulf of Guinea, analyzing their evolution, effectiveness, and the complex interplay of regional and international actors in addressing maritime threats",
      image: "/Marsof operators fastrope on A Dutch naval vessel.jpg",
      // lead: "Dr. Julliet",
      team: "GoGMI Research Team",
      partners: ["", ""],
      impact: "Framework for harmonizing 15+ security initiatives"
    },
    {
      question: "GOG MARITIME GOVERNANCE INDEX",
      description: "Mapping untapped blue economy opportunities across fisheries, tourism, renewable energy, and marine biotechnology.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&fit=crop",
      // lead: "Dr. Ama Osei",
      team: 3,
      partners: [""],
      impact: "€200M in new investments catalyzed"
    }
  
  ];

  const liveData = [
    { label: "Active Research Projects", value: "3" },
    { label: "Data Points Collected",    value: "2000" },
    { label: "Partner Institutions",     value: "12" },
  ];

  return (
    <div
      className="w-full overflow-x-hidden"
      style={{ fontFamily: FONT }}   /* ← one declaration, entire page inherits */
    >

      {/* ═══ HERO ═══ */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/researchimage.jpg"
            alt="Research Hero"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.92) 0%, rgba(26,51,108,0.88) 100%)' }}
          />
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
              style={{
                backgroundColor: 'rgba(142,52,0,0.2)',
                borderColor: 'rgba(142,52,0,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Microscope className="w-4 h-4" style={{ color: '#8E3400' }} />
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: '#8E3400', fontWeight: 700 }}
              >
                Research &amp; Innovation
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
              style={{ fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              Answering the Big Questions in Maritime Security
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 400 }}
            >
              We focus on strategic maritime research addressing safety, security, and
              environmental challenges in the Gulf of Guinea.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="http://www.gulfspectrumjournal.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl transition-all shadow-lg hover:scale-105"
                style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 600 }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#6B2700'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#8E3400'}
              >
                <span>Explore Our Gulf Spectrum Journal</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIVE DASHBOARD ═══ */}
      <section className="relative -mt-16 z-20 px-6 pb-12">
        <div className="container mx-auto max-w-7xl">
          <div
            className="bg-white rounded-2xl p-6 shadow-xl"
            style={{ border: '1px solid #E5E7EB' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#8E3400' }}
                />
                <h3 className="text-lg" style={{ fontWeight: 700, color: '#132552' }}>
                  Research Dashboard
                </h3>
              </div>
              <span className="text-xs" style={{ fontWeight: 500, color: '#6B7280' }}>
                Updated 2 min ago
              </span>
            </div>

            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full">
                {liveData.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-center p-4 rounded-xl transition-all hover:scale-105"
                    style={{ backgroundColor: '#F9FAFB' }}
                  >
                    <div className="text-3xl mb-1" style={{ fontWeight: 800, color: '#132552' }}>
                      {item.value}
                    </div>
                    <p className="text-xs" style={{ fontWeight: 500, color: '#6B7280' }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RESEARCH THEMES — stacking cards ═══ */}
      <section id="themes" className="bg-white">
        <div className="text-center py-16 md:py-20 px-6">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontWeight: 600, color: '#8E3400', letterSpacing: '0.1em' }}
          >
            Research Themes
          </span>
          <h2
            className="text-4xl md:text-5xl mt-3 mb-4"
            style={{ fontWeight: 800, color: '#132552', letterSpacing: '-0.01em' }}
          >
            Our Research Focus
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ fontWeight: 400, color: '#4B5563' }}>
            Ambitious research tackling pressing challenges in Gulf of Guinea maritime security
          </p>
        </div>

        {researchThemes.map((theme, idx) => (
          <div key={idx} className="sticky top-0 h-screen flex items-center justify-center"
            style={{ zIndex: idx + 1 }}
          >
            <Link
              to={idx === 0 ? '/research/maritime-security-audit' : `/research/project-${idx + 1}`}
              className="group w-[90%] max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              style={{
                backgroundColor: idx % 2 === 0 ? '#132552' : '#1a3370',
                boxShadow: '0 -4px 24px 4px rgba(0,0,0,0.25), 0 8px 32px rgba(0,0,0,0.3)',
                marginTop: `${idx * 20}px`,
              }}
            >
              {/* Image */}
              <div className="md:w-1/2 h-56 md:h-auto overflow-hidden relative">
                <img
                  src={theme.image}
                  alt={theme.question}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(19,37,82,0.4))' }} />
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                <span
                  className="text-xs uppercase tracking-widest mb-3 block"
                  style={{ fontWeight: 700, color: '#8E3400' }}
                >
                  Research Theme {idx + 1}
                </span>

                <h3
                  className="text-2xl md:text-3xl mb-4 leading-tight"
                  style={{ fontWeight: 800, color: '#ffffff' }}
                >
                  {theme.question}
                </h3>

                <p
                  className="text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {theme.description}
                </p>

                <div
                  className="inline-flex items-center gap-2 text-sm group-hover:gap-4 transition-all"
                  style={{ fontWeight: 600, color: '#8E3400' }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* spacer so last card can fully scroll into view */}
        <div style={{ height: `${researchThemes.length * 20 + 40}px` }} />
      </section>

    </div>
  );
};

export default Research;
