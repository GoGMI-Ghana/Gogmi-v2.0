import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Users, Calendar, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const programmeII = {
  title: 'ECOP Training Programme II',
  theme: 'Youth in Africa\'s Blue Economy: Developing Sustainable Careers and Businesses',
  dates: '08 – 18 November 2022',
  funders: ['UNESCO', 'Norad'],
  modules: [
    {
      number: 1,
      title: "Africa's Blue Economy Landscape",
      description: 'An overview of Africa\'s blue economy, its opportunities, challenges, and the role of youth in shaping sustainable ocean futures.',
      videoId: 'jN0EXvXLAJU',
    },
    {
      number: 2,
      title: 'Career Pathways in the Blue Economy',
      description: 'Exploring diverse career pathways available to young Africans across maritime industries, fisheries, marine science, ocean governance, and related sectors.',
      videoId: 'lRS9p5dqhVk',
    },
    {
      number: 3,
      title: 'Building Sustainable Blue Businesses',
      description: 'Practical frameworks for developing and sustaining blue economy businesses, including financing, innovation, and entrepreneurship in the ocean economy.',
      videoId: 'rPpby0kToOs',
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
      videoId: '6b6iSxtEG0A',
    },
    {
      number: 2,
      title: "Africa's Maritime Domain and Blue Economy Potential",
      description: 'Mapping Africa\'s extensive coastline, exclusive economic zones, and the vast untapped potential across fisheries, tourism, transport, and energy sectors.',
      videoId: 'Ad_gQXJeHfs',
    },
    {
      number: 3,
      title: 'Maritime Security and Ocean Governance',
      description: 'Understanding the governance frameworks that underpin ocean security, including UNCLOS, the Lomé Charter, and regional coordination mechanisms.',
      videoId: 'ngDvvWALkXI',
    },
    {
      number: 4,
      title: 'Fisheries and Aquaculture',
      description: 'Deep dive into sustainable fisheries management, illegal, unreported and unregulated (IUU) fishing, and opportunities in aquaculture across the continent.',
      videoId: '63EtiBewwMs',
    },
  ],
};

const VideoCard = ({ videoId, title, number, label }) => {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
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
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xl"
                style={{ backgroundColor: '#8E3400' }}
                aria-label={`Play ${title}`}
              >
                <Play className="w-7 h-7 text-white ml-1" fill="white" />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-widest font-bold block mb-2" style={{ color: '#8E3400' }}>
          {label} {number}
        </span>
        <h4 className="text-lg font-bold leading-snug" style={{ color: '#132552' }}>{title}</h4>
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
        className="w-full flex items-center justify-between p-8 md:p-10 text-left transition-colors"
        style={{ backgroundColor: open ? '#132552' : 'white' }}
      >
        <div className="flex-1">
          <span className="text-xs uppercase tracking-widest font-bold block mb-2" style={{ color: open ? 'rgba(255,255,255,0.6)' : '#8E3400' }}>
            {label}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: open ? 'white' : '#132552' }}>
            {programme.theme}
          </h3>
          <div className="flex flex-wrap gap-6">
            <span className="flex items-center gap-2 text-sm" style={{ color: open ? 'rgba(255,255,255,0.7)' : '#6B7280' }}>
              <Calendar className="w-4 h-4" /> {programme.dates}
            </span>
            <span className="flex items-center gap-2 text-sm" style={{ color: open ? 'rgba(255,255,255,0.7)' : '#6B7280' }}>
              <Globe className="w-4 h-4" /> Funded by: {programme.funders.join(' & ')}
            </span>
          </div>
        </div>
        <div className="ml-6 flex-shrink-0">
          {open
            ? <ChevronUp className="w-7 h-7" style={{ color: 'white' }} />
            : <ChevronDown className="w-7 h-7" style={{ color: '#132552' }} />}
        </div>
      </button>

      {open && (
        <div className="p-8 md:p-10 bg-gray-50">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/ecop1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.96) 0%, rgba(19,37,82,0.82) 100%)' }} />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <Link
            to="/services/capacitybuilding"
            className="inline-flex items-center gap-2 text-sm mb-10 opacity-70 hover:opacity-100 transition-opacity"
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

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Early Career Ocean<br />Professionals Programme
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mb-14" style={{ color: 'rgba(255,255,255,0.85)' }}>
            A flagship GoGMI initiative equipping young Africans with the knowledge, skills, and networks
            to build sustainable careers and businesses in Africa's blue economy — under the UN Decade of Ocean Science 2021–2030.
          </p>

        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: '#8E3400' }}>
                About the Programme
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                An African Solution<br />to an African Challenge
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  The Early Career Ocean Professionals (ECOP) Training Programme is a GoGMI initiative
                  under the UN Decade of Ocean Science for Sustainable Development (2021–2030). It addresses
                  a critical gap — the absence of African-led, Africa-focused training that connects young
                  professionals to the continent's vast blue economy potential.
                </p>
                <p>
                  Aligned with the African Union's Integrated Maritime Strategy (2050 AIM Strategy) and
                  SDG 14 (Life Below Water), the programme brings together emerging ocean professionals,
                  policymakers, researchers, and entrepreneurs for intensive multi-day training delivered
                  by leading regional and international experts.
                </p>
                <p>
                  Two programmes were delivered in 2022 — covering career pathways, ocean governance,
                  blue economy entrepreneurship, and sustainable development across Africa's maritime domain.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/ecop-photo.jpg"
                  alt="ECOP Training in session"
                  className="w-full h-auto"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl p-6 shadow-xl"
                style={{ backgroundColor: '#8E3400' }}
              >
                <div className="text-3xl font-black text-white">2022</div>
                <div className="text-sm text-white opacity-80 mt-1">Year Launched</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SDG CALLOUT ═══ */}
      <section className="py-20" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
              Grounded in Global Frameworks
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Every aspect of ECOP is designed to align with the most important international commitments for ocean sustainability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: 'SDG 14 — Life Below Water',
                desc: 'All programme content is anchored in Sustainable Development Goal 14, focusing on conserving and sustainably using the oceans, seas, and marine resources for sustainable development.',
              },
              {
                label: 'African-Led Design',
                desc: 'Conceptualised and delivered by GoGMI with African realities at the centre — not adapted from foreign curricula but built from the ground up for the continent\'s ocean professionals.',
              },
              {
                label: 'UN Ocean Science Decade',
                desc: 'ECOP is an official contribution to the UN Decade of Ocean Science for Sustainable Development (2021–2030), supporting the global call to transform ocean science for a sustainable future.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-8" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8E3400' }} />
                <div className="text-xl font-bold text-white mb-3">{item.label}</div>
                <div className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMMES / VIDEOS ═══ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Training Programmes
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Explore the Programmes
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Click on each programme below to expand it and watch the recorded sessions directly on this page.
            </p>
          </div>

          <div className="space-y-6">
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

      {/* ═══ PHOTO STRIP ═══ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Programme Highlights
            </span>
            <h2 className="text-4xl font-black" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              From the Training Room
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src="/ecop1.jpg" alt="ECOP Programme session" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src="/ecop-photo.jpg" alt="ECOP Programme participants" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FUNDERS ═══ */}
      <section className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Supported By
            </span>
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Our Partners &amp; Funders
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            <img src="/GoGMI_PNG.png" alt="GoGMI" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/norad.jpg" alt="Norad" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/unlogo.jpg" alt="UN / IOC-UNESCO" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Interested in Future<br />ECOP Programmes?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Stay connected with GoGMI to be notified about upcoming ECOP cohorts, application windows,
            and other capacity building opportunities for young African ocean professionals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-xl"
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
