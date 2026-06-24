import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const sections = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Contact', path: '/contact' },
      { label: 'Blog', path: '/blog' },
      { label: 'Resources', path: '/resources' },
      { label: 'Media Gallery', path: '/mediagallery' },
      { label: 'Testimonials', path: '/testimonials' },
      { label: 'Careers & Opportunities', path: '/CareersOpportunities' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Advocacy', path: '/services/advocacy' },
      { label: 'Research', path: '/services/research' },
      { label: 'Capacity Building', path: '/services/capacitybuilding' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Maritime Security Interventions Audit', path: '/research/maritime-security-audit' },
    ],
  },
  {
    title: 'Capacity Building & Training',
    links: [
      { label: 'Maritime Governance Course', path: '/maritime-governance-course' },
      { label: 'Marine Casualty Investigation Course', path: '/marine-casualty-course' },
      { label: 'Early Career Ocean Professionals (ECOP)', path: '/ecop' },
      { label: 'WYTEC Blue Training', path: '/wytec' },
      { label: 'Journalist Training', path: '/journalist-training' },
    ],
  },
  {
    title: 'Programmes & Initiatives',
    links: [
      { label: 'IMSWG', path: '/imswg' },
      { label: 'IMSWG Forum', path: '/imswg-forum' },
      { label: 'IMSWG Events', path: '/imswg-events' },
      { label: 'IMSWG Sign Up', path: '/imswg-signup' },
      { label: 'Blue Career Expo', path: '/bluecareerexpo' },
      { label: 'Blue World Initiative', path: '/blue-world-initiative' },
      { label: 'Blue Business Directory', path: '/blue-business-directory' },
      { label: 'SHADE', path: '/shade' },
      { label: 'Gulf Spectrum Podcast', path: '/gulf-spectrum-podcast' },
    ],
  },
  {
    title: 'Organisation',
    links: [
      { label: 'Executive Chairman', path: '/ExecutiveChairman' },
      { label: 'Management', path: '/management' },
      { label: 'Advisory Board', path: '/advisoryboard' },
      { label: 'Secretariat', path: '/secretariat' },
      { label: 'Partners', path: '/Partners' },
      { label: 'Membership', path: '/membership' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  },
];

const Sitemap = () => {
  return (
    <div className="w-full min-h-screen" style={{ fontFamily: FONT, backgroundColor: '#F9FAFB' }}>

      {/* ═══ HERO ═══ */}
      <section className="relative py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm mb-8 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'white' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(142,52,0,0.25)' }}>
              <Map className="w-6 h-6" style={{ color: '#8E3400' }} />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#8E3400' }}>Navigation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Sitemap
          </h1>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
            A complete overview of all pages on the GoGMI website.
          </p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                  <h2 className="text-lg font-bold" style={{ color: '#132552' }}>{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="flex items-center gap-2 text-sm group transition-colors"
                        style={{ color: '#4B5563' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                          style={{ backgroundColor: '#D1D5DB' }}
                        />
                        <span className="group-hover:underline" style={{ color: '#4B5563' }}
                          onMouseEnter={e => e.target.style.color = '#8E3400'}
                          onMouseLeave={e => e.target.style.color = '#4B5563'}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Sitemap;
