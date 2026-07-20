import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Globe, Quote } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const highlights = [
  'Thought-provoking insights from industry leaders, experts, and influencers',
  'Stakeholders had the chance to connect with peers, forge new partnerships, and expand their professional networks',
];

const focusAreas = [
  { label: 'Maritime Policy', desc: 'Collaborating with host governments and regional institutions to strengthen maritime policies.' },
  { label: 'Capacity Building', desc: 'Developing skills and knowledge across Africa\'s maritime workforce.' },
  { label: 'Technology', desc: 'Driving adoption of zero-emission technologies in shipping.' },
  { label: 'Financing', desc: 'Creating pathways for sustainable financing of the green energy transition.' },
  { label: 'Skill Development', desc: 'Building the human capital needed to lead Africa\'s maritime energy transition.' },
];

const GMAC = () => {
  return (
    <div className="w-full min-h-screen" style={{ fontFamily: FONT, backgroundColor: '#F9FAFB' }}>

      {/* HERO */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/gmacpic.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.95) 0%, rgba(19,37,82,0.80) 100%)' }} />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <Link
            to="/secretariat"
            className="inline-flex items-center gap-2 text-sm mb-10 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'white' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Secretariat Services
          </Link>

          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
            style={{ backgroundColor: 'rgba(142,52,0,0.2)', borderColor: 'rgba(142,52,0,0.4)' }}
          >
            <Globe className="w-4 h-4" style={{ color: '#8E3400' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
              Secretariat · 2023
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Green Maritime<br />Africa Coalition
          </h1>

          <p className="text-lg md:text-xl font-semibold mb-4 uppercase tracking-wide" style={{ color: '#8E3400' }}>
            Theme: Advancing Net-Zero Emissions and Maritime Resilience in Africa through Continental Collaboration
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8E3400' }} />
              November 2023
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8E3400' }} />
              37 Stakeholders Engaged
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: '#8E3400' }}>
                About GMAC
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                A Continental Initiative for the Green Energy Transition
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  GoGMI collaborates with the Nigerian Maritime Administration and Safety Agency to host the Green Maritime Africa Coalition (GMAC). GMAC's mission is a shared continental initiative aimed at leading the global energy transition. By 2030, GMAC intends to provide zero-emission fuels for the maritime industry and implement them in both international and domestic shipping throughout Africa.
                </p>
                <p>
                  During the launch in November 2023, hosted by GoGMI, 37 stakeholders from the shipping industry — including the private sector, ship and port operators, fuel operators, and charterers — joined forces to advance the mission. The primary objective is to amplify Africa's collective voice in global greenhouse gas (GHG) emissions reduction efforts. GMAC aims to foster awareness, create opportunities, and implement concrete near and long-term actions for the continent.
                </p>
                <p>
                  The coalition places a strategic focus on maritime policy, capacity building, technology, financing, and skill development. The overarching goal is to collaborate with host governments and regional institutions, strengthening maritime policies, streamlining processes, and aligning with Africa's priorities for sustainable development and economic growth.
                </p>
              </div>
            </div>

            <div>
              <img
                src="/gmacpic.jpg"
                alt="Green Maritime Africa Coalition launch"
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KEY HIGHLIGHTS */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Event Highlights
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
              Key Highlights
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {highlights.map((item, i) => (
              <div key={i} className="rounded-2xl p-8 flex gap-5 items-start" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} />
                <p className="text-base leading-relaxed text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC FOCUS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Strategic Direction
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Areas of Strategic Focus
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              GMAC's multi-faceted approach reflects its commitment to driving impactful change in Africa's maritime sector.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, i) => (
              <div key={i} className="rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: '#8E3400' }} />
                <h3 className="text-xl font-bold mb-3" style={{ color: '#132552' }}>{area.label}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto max-w-4xl px-6">
          <div className="rounded-3xl p-12 md:p-16 text-center" style={{ backgroundColor: '#132552' }}>
            <Quote className="w-12 h-12 mx-auto mb-8 opacity-40 text-white" />
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-white mb-10" style={{ fontStyle: 'italic' }}>
              "I applaud the organizers, GoGMI and the Nigerian Maritime Administration and Safety Agency, for orchestrating an event that has set a new standard for collaboration, innovation, and commitment to sustainability. GMAC's summit was not just a meeting; it was a catalyst for change, and I am excited to see the positive impact it will have on Africa's maritime industry in the years to come."
            </blockquote>
            <div>
              <div className="text-base font-bold text-white">Amb. Nancy Karigithu</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Special Envoy and Advisor in the Office of the President on Blue Economy and Maritime Affairs, Kenya
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Interested in Partnering<br />with GoGMI?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Get in touch to learn more about the Green Maritime Africa Coalition or explore secretariat services for your next maritime initiative.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-xl"
            style={{ backgroundColor: '#8E3400', color: 'white' }}
          >
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default GMAC;
