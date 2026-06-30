import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Star, Lightbulb, Globe, CheckCircle, TrendingUp } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const impacts = [
  {
    title: 'Industry Mentorship Access',
    desc: 'Provide youth with access to maritime industry mentorship, support services, educational and networking events, while keeping them updated on the latest developments and engagements in Africa\'s blue economy community.',
  },
  {
    title: 'Corporate & Industry Engagement',
    desc: 'Facilitate youth engagement with corporate and industry partners who are passionate about innovation, diversity and inclusion of young minds in the development of Africa\'s blue economy.',
  },
  {
    title: 'Blue Economy Incubation Hub',
    desc: 'Serve as an incubation hub for blue economy start-ups, providing resources, networks, and structured support to help young entrepreneurs turn ocean ideas into viable businesses.',
  },
  {
    title: 'Career & Business Support',
    desc: 'Provide learning and support for youth through their career, entrepreneurial or business journey — from idea conception through to implementation and growth.',
  },
];

const elements = [
  {
    number: '01',
    title: 'Mentor Pairing',
    desc: 'At the start of the programme, mentees are paired with mentors who offer guidance in their blue career and entrepreneurship pursuits across a broad range of areas. This mentorship continues for the full duration of the programme and forms the foundation upon which all other activities commence.',
    period: 'Month 1 onwards',
  },
  {
    number: '02',
    title: 'Blue Success Speaker Series (BLUESSS) 2022',
    desc: 'The BLUESSS platform creates the opportunity for young people to hear first-hand accounts from successful blue economy entrepreneurs, ocean innovators, and other ocean professionals. Speakers share insights into their career and entrepreneurial journey — including notable successes and failures. Mentees are clustered into sector groups to receive specialised advice tailored to their interests.',
    period: 'Month 2–3',
  },
  {
    number: '03',
    title: 'Maritime Business Support Hub 2023',
    desc: 'Following the BLUESSS, mentees build on lessons learned through a year-long Maritime Business Incubator. Sessions are held each quarter: Quarter 1 (The Mind Map) — guided brainstorming to identify blue economy opportunities; Quarter 2 (The Blue Economy Innovation Challenge) — mentees pitch innovative ocean ideas to a panel; Quarter 3 (The Blue Platform) — a virtual community for mentees to connect with innovators, experts, potential partners and advisers.',
    period: 'Month 4–12',
  },
];

const incubatorThemes = [
  { label: 'Entrepreneurship', desc: 'Developing new blue economy businesses and ventures from the ground up.' },
  { label: 'Mentorship', desc: 'One-on-one and group guidance from experienced maritime professionals.' },
  { label: 'Networking & Knowledge-Sharing', desc: 'Conferences, roundtables, fireside chats and boardrooms connecting young minds.' },
  { label: 'Maritime Innovation', desc: 'Technology, data, and digital application development for the maritime industry.' },
  { label: 'Blue Human Capital Innovation', desc: 'Building the next generation of skilled ocean professionals for the Gulf of Guinea.' },
];

const BlueMentorship = () => {
  return (
    <div className="w-full min-h-screen" style={{ fontFamily: FONT, backgroundColor: '#F9FAFB' }}>

      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/bluementorshipimage.png)',
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
            <Star className="w-4 h-4" style={{ color: '#8E3400' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
              Capacity Building · Mentorship
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            The Blue Mentorship<br />Programme
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
            An African maritime accelerator connecting 30 young individuals with industry leaders,
            entrepreneurs, and ocean professionals to prime them for success in Africa's blue economy.
          </p>

          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8E3400' }} />
            Programme Completed
          </div>
        </div>
      </section>

      {/* ═══ ORIGIN ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: '#8E3400' }}>
                Where It All Began
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Born from the Blue Career & Business Expo
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  In November 2021, GoGMI held its flagship Blue Career and Business Expo (BCBE) —
                  creating multi-opportunity exchange platforms for young people to learn from maritime
                  industry leaders and gain an appreciation of the range of opportunities within Ghana's
                  blue economy sectors. The Expo was attended by over 200 individuals, including high
                  profile personalities, maritime industry practitioners, students, and other stakeholders.
                </p>
                <p>
                  The BCBE was always intended as the first in a series of events aimed at actively engaging
                  African youth on the path towards building a resilient blue economy. As intended, it was
                  used to initiate a Mentorship Programme for which several participating youth showed
                  strong interest.
                </p>
                <p>
                  GoGMI took it a step further by selecting thirty young individuals for the Blue Mentorship
                  Programme — a full mentorship and grooming experience designed to prime them for blue
                  success.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '30', label: 'Young Mentees Selected' },
                { value: '200+', label: 'BCBE Attendees' },
                { value: '2022', label: 'Programme Year' },
                { value: '3', label: 'Programme Elements' },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl p-8 text-center" style={{ backgroundColor: i % 2 === 0 ? '#132552' : '#F9FAFB', border: i % 2 !== 0 ? '2px solid #E5E7EB' : 'none' }}>
                  <div className="text-4xl font-black mb-2" style={{ color: i % 2 === 0 ? 'white' : '#132552' }}>{stat.value}</div>
                  <div className="text-sm font-medium" style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.7)' : '#6B7280' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMME IMPACTS ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              About the Programme
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
              Programme Impact Areas
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              The Blue Mentorship Programme is designed to deliver four core impacts for young African maritime professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {impacts.map((item, i) => (
              <div key={i} className="rounded-2xl p-8" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: '#8E3400' }} />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ELEMENTS ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Programme Structure
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Elements of the Programme
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Three structured elements running across the full programme lifecycle.
            </p>
          </div>

          <div className="space-y-6">
            {elements.map((el) => (
              <div key={el.number} className="rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 flex gap-8 items-start">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ backgroundColor: '#132552', color: 'white' }}
                >
                  {el.number}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#132552' }}>{el.title}</h3>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgba(142,52,0,0.1)', color: '#8E3400' }}
                    >
                      {el.period}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{el.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIGGER PICTURE / INCUBATOR ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: '#8E3400' }}>
                The Bigger Picture
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                A Maritime Business Incubator
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  Beyond the Blue Mentorship Programme, GoGMI aims to expand its engagement with youth
                  to develop a Maritime Business Incubator (MBI) — partnering with global maritime industry
                  and practitioners to provide solutions and resources to improve career and business
                  connections and financing for innovations in blue start-ups across the Gulf of Guinea region.
                </p>
                <p>
                  The MBI will collaborate with academia to develop collaborative research networks across
                  the sub-region, dedicated to enhancing indigenous understanding of Africa's blue economy
                  sectors. It will also feature a Maritime Data Hub — a one-stop data repository for
                  developing and test-bedding new digital applications and services for the maritime industry.
                </p>
                <p>
                  Private sector involvement will help bring about an innovative spirit of change for young
                  entrepreneurs and the broader Gulf of Guinea blue economy business community.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#132552' }}>Themes of the Incubator</h3>
              <div className="space-y-4">
                {incubatorThemes.map((theme, i) => (
                  <div key={i} className="rounded-2xl p-6 bg-white shadow-sm border border-gray-100 flex gap-4 items-start">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black"
                      style={{ backgroundColor: '#132552', color: 'white' }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-base font-bold mb-1" style={{ color: '#132552' }}>{theme.label}</div>
                      <div className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{theme.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Interested in Future<br />Mentorship Cohorts?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Get in touch with GoGMI to express your interest in the next Blue Mentorship Programme
            cohort or the Maritime Business Incubator.
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

export default BlueMentorship;
