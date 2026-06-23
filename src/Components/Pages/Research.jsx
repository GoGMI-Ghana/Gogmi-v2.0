import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope } from 'lucide-react';
import { useTransform, motion, useScroll } from 'framer-motion';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const researchThemes = [
  {
    question: "MARITIME SECURITY INTERVENTIONS AUDIT",
    description: "Comprehensive audit mapping maritime security interventions across the Gulf of Guinea, analyzing their evolution, effectiveness, and the complex interplay of regional and international actors in addressing maritime threats.",
    image: "/Marsof operators fastrope on A Dutch naval vessel.jpg",
    color: '#132552',
    link: '/research/maritime-security-audit',
  },
  {
    question: "GOG MARITIME GOVERNANCE INDEX",
    description: "Mapping untapped blue economy opportunities across fisheries, tourism, renewable energy, and marine biotechnology.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&fit=crop",
    color: '#1a336e',
    link: '/research/project-2',
  },
];

/* ── Individual stacking card ── */
const Card = ({ i, title, description, image, color, link, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-2xl lg:p-10 sm:p-6 p-4 origin-top shadow-2xl"
      >
        {/* Theme label */}
        <span
          className="text-xs uppercase tracking-widest mb-2 block"
          style={{ fontWeight: 700, color: '#8E3400' }}
        >
          Research Theme {i + 1}
        </span>

        <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-0">{title}</h2>

        <div className="flex h-full mt-5 gap-8">
          {/* Text side */}
          <div className="w-[40%] relative top-[5%]">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {description}
            </p>
            <Link
              to={link}
              className="inline-flex items-center gap-2 pt-4 text-sm font-semibold"
              style={{ color: '#8E3400' }}
            >
              <span className="underline underline-offset-2">Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Image side */}
          <div className="relative w-[60%] h-full rounded-xl overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Page ── */
const Research = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const liveData = [
    { label: "Active Research Projects", value: "3" },
    { label: "Data Points Collected",    value: "2000" },
    { label: "Partner Institutions",     value: "12" },
  ];

  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: FONT }}>

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
              <span className="text-xs uppercase tracking-wider" style={{ color: '#8E3400', fontWeight: 700 }}>
                Research &amp; Innovation
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
              style={{ fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              Answering the Big Questions in Maritime Security
            </h1>

            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.95)' }}>
              We focus on strategic maritime research addressing safety, security, and
              environmental challenges in the Gulf of Guinea.
            </p>

            <a
              href="http://www.gulfspectrumjournal.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl transition-all shadow-lg hover:scale-105"
              style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 600 }}
            >
              <span>Explore Our Gulf Spectrum Journal</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ LIVE DASHBOARD ═══ */}
      <section className="relative -mt-16 z-20 px-6 pb-12">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-2xl p-6 shadow-xl" style={{ border: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#8E3400' }} />
                <h3 className="text-lg" style={{ fontWeight: 700, color: '#132552' }}>Research Dashboard</h3>
              </div>
              <span className="text-xs" style={{ fontWeight: 500, color: '#6B7280' }}>Updated 2 min ago</span>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full">
                {liveData.map((item, idx) => (
                  <div key={idx} className="text-center p-4 rounded-xl" style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="text-3xl mb-1" style={{ fontWeight: 800, color: '#132552' }}>{item.value}</div>
                    <p className="text-xs" style={{ fontWeight: 500, color: '#6B7280' }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STACKING CARDS ═══ */}
      <section className="bg-slate-950 pb-20">
        <div className="text-center py-16 px-6">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontWeight: 600, color: '#8E3400', letterSpacing: '0.1em' }}
          >
            Research Themes
          </span>
          <h2
            className="text-4xl md:text-5xl mt-3 mb-4 text-white"
            style={{ fontWeight: 800, letterSpacing: '-0.01em' }}
          >
            Our Research Focus
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Ambitious research tackling pressing challenges in Gulf of Guinea maritime security
          </p>
        </div>

        <div ref={container}>
          {researchThemes.map((theme, i) => {
            const targetScale = 1 - (researchThemes.length - i) * 0.05;
            return (
              <Card
                key={i}
                i={i}
                title={theme.question}
                description={theme.description}
                image={theme.image}
                color={theme.color}
                link={theme.link}
                progress={scrollYProgress}
                range={[i * (1 / researchThemes.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Research;
