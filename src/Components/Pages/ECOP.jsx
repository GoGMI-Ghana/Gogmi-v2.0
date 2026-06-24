import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Users, Calendar, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const programmeII = {
  title: 'ECOP Training Programme II',
  theme: 'Youth in Africa\'s Blue Economy: Developing Sustainable Careers and Businesses',
  dates: '08 – 18 November 2022',
  funders: ['UNESCO', 'Norad (Norwegian Agency for Development Cooperation)'],
  modules: [
    {
      number: 1,
      title: 'Africa's Blue Economy Landscape',
      description: 'An overview of Africa\'s blue economy, its opportunities, challenges, and the role of youth in shaping sustainable ocean futures.',
      videoId: 'ZsWq9Hn-PDM',
    },
    {
      number: 2,
      title: 'Career Pathways in the Blue Economy',
      description: 'Exploring diverse career pathways available to young Africans across maritime industries, fisheries, marine science, ocean governance, and related sectors.',
      videoId: '1Ia0V4PaHYQ',
    },
    {
      number: 3,
      title: 'Building Sustainable Blue Businesses',
      description: 'Practical frameworks for developing and sustaining blue economy businesses, including financing, innovation, and entrepreneurship in the ocean economy.',
      videoId: 'q2WLn3IxrEw',
    },
  ],
};

const programmeI = {
  title: 'ECOP Training Programme I',
  theme: 'Exploring Pathways to a Vibrant Ocean Economy for Africa',
  dates: '14 – 24 March 2022',
  funders: ['Norwegian Agency for Development Cooperation', 'IOC-UNESCO'],
  sessions: [
    {
      number: 1,
      title: 'Introduction to the Ocean Economy',
      description: 'Foundational concepts of the ocean economy and its importance for African nations, including key terminology, frameworks, and the SDG 14 connection.',
      videoId: 'BG6GQoBjWcI',
    },
    {
      number: 2,
      title: 'Africa\'s Maritime Domain and Blue Economy Potential',
      description: 'Mapping Africa\'s extensive coastline, exclusive economic zones, and the vast untapped potential across fisheries, tourism, transport, and energy sectors.',
      videoId: 'X2wvVpP3Ego',
    },
    {
      number: 3,
      title: 'Maritime Security and Ocean Governance',
      description: 'Understanding the governance frameworks that underpin ocean security, including UNCLOS, the Lomé Charter, and regional coordination mechanisms.',
      videoId: 'RpSa9rp3_wY',
    },
    {
      number: 4,
      title: 'Fisheries and Aquaculture',
      description: 'Deep dive into sustainable fisheries management, illegal, unreported and unregulated (IUU) fishing, and opportunities in aquaculture across the continent.',
      videoId: 'Zg9LfT3eMYk',
    },
    {
      number: 5,
      title: 'Marine Tourism and Coastal Recreation',
      description: 'The economics of marine and coastal tourism, community-based tourism models, and strategies for sustainable development that protect ecosystems.',
      videoId: 'PJz6RurV7Oc',
    },
    {
      number: 6,
      title: 'Ocean Energy and Offshore Resources',
      description: 'Emerging opportunities in offshore wind, wave energy, and oil & gas governance — balancing extraction with environmental responsibility.',
      videoId: 'TzmgxFdXwbw',
    },
    {
      number: 7,
      title: 'Shipping, Ports, and Maritime Trade',
      description: 'The role of Africa\'s ports and shipping industry in continental integration, trade facilitation, and the blue economy supply chain.',
      videoId: 'W3I5H6L9QmM',
    },
    {
      number: 8,
      title: 'Climate Change and Ocean Health',
      description: 'Examining the impacts of climate change on African coastal and marine ecosystems, and the adaptation strategies being developed by regional institutions.',
      videoId: 'KxQd1TtPniU',
    },
    {
      number: 9,
      title: 'Building a Career in the Blue Economy',
      description: 'Practical guidance for young Africans on navigating academic pathways, professional networks, and career opportunities in maritime and ocean-related fields.',
      videoId: 'nB8vHUkLt7E',
    },
  ],
};

const VideoCard = ({ videoId, title, number, label }) => {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative aspect-video bg-gray-900">
        {playing ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img src={thumb} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button
                onClick={() => setPlaying(true)}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: '#8E3400' }}
                aria-label={`Play ${title}`}
              >
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="p-5">
        <span className="text-xs uppercase tracking-widest font-bold block mb-1" style={{ color: '#8E3400' }}>
          {label} {number}
        </span>
        <h4 className="text-base font-bold leading-snug" style={{ color: '#132552' }}>{title}</h4>
      </div>
    </div>
  );
};

const ProgrammeSection = ({ programme, label, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const items = programme.modules || programme.sessions;
  const itemLabel = programme.modules ? 'Module' : 'Session';

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
        style={{ backgroundColor: open ? '#132552' : 'white' }}
      >
        <div>
          <span className="text-xs uppercase tracking-widest font-bold block mb-1" style={{ color: open ? 'rgba(255,255,255,0.6)' : '#8E3400' }}>
            {label}
          </span>
          <h3 className="text-xl md:text-2xl font-bold" style={{ color: open ? 'white' : '#132552' }}>
            {programme.theme}
          </h3>
          <div className="flex flex-wrap gap-4 mt-2">
            <span className="flex items-center gap-1 text-sm" style={{ color: open ? 'rgba(255,255,255,0.7)' : '#6B7280' }}>
              <Calendar className="w-4 h-4" /> {programme.dates}
            </span>
            <span className="flex items-center gap-1 text-sm" style={{ color: open ? 'rgba(255,255,255,0.7)' : '#6B7280' }}>
              <Globe className="w-4 h-4" /> Funded by: {programme.funders.join(' & ')}
            </span>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          {open
            ? <ChevronUp className="w-6 h-6" style={{ color: 'white' }} />
            : <ChevronDown className="w-6 h-6" style={{ color: '#132552' }} />}
        </div>
      </button>

      {open && (
        <div className="p-6 md:p-8 bg-gray-50">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <VideoCard
                key={item.number}
                videoId={item.videoId}
                title={item.title}
                number={item.number}
                label={itemLabel}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ECOP = () => {
  return (
    <div className="w-full min-h-screen" style={{ fontFamily: FONT, backgroundColor: '#F9FAFB' }}>

      {/* ═══ HERO ═══ */}
      <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#132552' }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/ecop.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.95) 0%, rgba(19,37,82,0.8) 100%)' }} />

        <div className="container mx-auto max-w-5xl px-6 relative z-10">
          <Link
            to="/services/capacitybuilding"
            className="inline-flex items-center gap-2 text-sm mb-8 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'white' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Capacity Building
          </Link>

          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
            style={{ backgroundColor: 'rgba(142,52,0,0.2)', borderColor: 'rgba(142,52,0,0.4)' }}
          >
            <Users className="w-4 h-4" style={{ color: '#8E3400' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
              Capacity Building · ECOP
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Early Career Ocean<br />Professionals Programme
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.85)' }}>
            A flagship GoGMI initiative equipping young Africans with the knowledge, skills, and networks
            to build sustainable careers and businesses in Africa's blue economy.
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {[
              { value: '2', label: 'Programmes Delivered' },
              { value: '12', label: 'Training Sessions' },
              { value: '2022', label: 'Year Launched' },
              { value: 'UNESCO', label: 'Key Partner' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
                About the Programme
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
                An African Solution to an African Challenge
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  The Early Career Ocean Professionals (ECOP) Training Programme is a GoGMI initiative
                  under the UN Decade of Ocean Science for Sustainable Development (2021–2030). It is
                  designed to address a critical gap: the absence of African-led, Africa-focused training
                  that connects young professionals to the continent's vast blue economy potential.
                </p>
                <p>
                  Aligned with the African Union's Integrated Maritime Strategy (2050 AIM Strategy) and
                  SDG 14 (Life Below Water), the programme brings together emerging ocean professionals,
                  policymakers, researchers, and entrepreneurs for intensive multi-day training delivered
                  by leading regional and international experts.
                </p>
                <p>
                  Two programmes have been delivered — in March and November 2022 — covering career
                  pathways, ocean governance, blue economy entrepreneurship, and sustainable development
                  across Africa's maritime domain.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/ecop.png"
                alt="ECOP Training Programme"
                className="w-full h-full object-cover"
                style={{ minHeight: '320px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SDG CALLOUT ═══ */}
      <section className="py-12" style={{ backgroundColor: '#F0F4FF' }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: '#132552' }}>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { icon: '🌊', label: 'SDG 14', desc: 'Life Below Water — core alignment of all programme content' },
                { icon: '🌍', label: 'African-Led', desc: 'Designed for Africa, delivered by African and global experts' },
                { icon: '🔬', label: 'UN Decade', desc: 'Official contribution to the UN Ocean Science Decade 2021–2030' },
              ].map((item, i) => (
                <div key={i} className="p-4">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="text-lg font-bold text-white mb-2">{item.label}</div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMMES ═══ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Training Programmes
            </span>
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Explore the Programmes
            </h2>
            <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: '#6B7280' }}>
              Click on each programme to explore the modules, sessions, and recorded video content.
            </p>
          </div>

          <div className="space-y-5">
            <ProgrammeSection
              programme={programmeII}
              label="Programme II · November 2022"
              defaultOpen={true}
            />
            <ProgrammeSection
              programme={programmeI}
              label="Programme I · March 2022"
              defaultOpen={false}
            />
          </div>
        </div>
      </section>

      {/* ═══ FUNDERS ═══ */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs uppercase tracking-widest font-bold mb-6" style={{ color: '#8E3400' }}>
            Supported By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { src: '/GoGMI_PNG.png', alt: 'GoGMI' },
            ].map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt} className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            ))}
            <span className="text-base font-semibold" style={{ color: '#132552' }}>UNESCO</span>
            <span className="text-base font-semibold" style={{ color: '#132552' }}>Norad</span>
            <span className="text-base font-semibold" style={{ color: '#132552' }}>IOC-UNESCO</span>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
            Interested in Future ECOP Programmes?
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Stay connected with GoGMI to be notified about upcoming ECOP cohorts, application windows,
            and other capacity building opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#8E3400', color: 'white' }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ECOP;
