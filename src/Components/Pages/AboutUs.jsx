import React from 'react';
import { Users, BookOpen, Share2, Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Official UN colours for the goals the Institute's work supports, in the order listed in about.json.
const SDG_META = [
  { number: '14', color: '#0A97D9' },
  { number: '8', color: '#A21942' },
  { number: '4', color: '#C5192D' },
  { number: '13', color: '#3F7E44' },
  { number: '16', color: '#00689D' },
  { number: '17', color: '#19486A' }
];

const CYCLE_ICONS = [Users, BookOpen, Share2, Globe];

const RING_COLORS = { vision: '#132552', mission: '#8E3400', values: '#0F766E' };

// Point on a circle, with angles in degrees measured clockwise from 12 o'clock.
const polar = (c, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [c + r * Math.sin(a), c - r * Math.cos(a)];
};

// An open ring drawn as an arc, optionally ending in an arrowhead that points the way the arc travels.
const Ring = ({ size, color, start, sweep, arrow = false }) => {
  const stroke = Math.round(size * 0.075);
  const c = size / 2;
  const r = c - stroke * 1.2;
  const arrowLength = stroke * 1.6;
  const dir = Math.sign(sweep);
  // Stop the arc a little early so the arrowhead sits on its end.
  const arcEnd = arrow ? start + sweep - dir * ((arrowLength * 0.35) / r) * (180 / Math.PI) : start + sweep;
  const [x0, y0] = polar(c, r, start);
  const [x1, y1] = polar(c, r, arcEnd);
  const largeArc = Math.abs(arcEnd - start) > 180 ? 1 : 0;
  const sweepFlag = dir > 0 ? 1 : 0;

  let head = null;
  if (arrow) {
    const a = (arcEnd * Math.PI) / 180;
    const tx = Math.cos(a) * dir;
    const ty = Math.sin(a) * dir;
    const nx = Math.sin(a);
    const ny = -Math.cos(a);
    const w = stroke * 1.15;
    const points = [
      [x1 + tx * arrowLength, y1 + ty * arrowLength],
      [x1 + nx * w, y1 + ny * w],
      [x1 - nx * w, y1 - ny * w]
    ].map((p) => p.join(',')).join(' ');
    head = <polygon points={points} fill={color} />;
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="absolute inset-0 overflow-visible" aria-hidden="true">
      <path
        d={`M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} ${sweepFlag} ${x1} ${y1}`}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="butt"
      />
      {head}
    </svg>
  );
};

const AboutUs = () => {
  const { t } = useTranslation('about');
  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/aboutus.enoch.jpg"
            alt="Maritime vessel in the Gulf of Guinea"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#132552]/90 to-[#132552]/70"></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
              style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
             style={{ fontWeight: 400 }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 md:py-40" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-[1400px] px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="space-y-8 lg:col-span-6">
              <div>
                <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-6" 
                      style={{ color: '#8E3400', fontWeight: 600 }}>
                  {t('story.eyebrow')}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8"
                    style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
                  {t('story.heading')}
                </h2>
</div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
                 {t('story.para1')}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
                {t('story.para2')}
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[550px] lg:col-span-6">
              <img 
                src="/fav11.jpg" 
                alt="Maritime operations in the Gulf of Guinea"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values: three linked rings, each leading into the next */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-4"
                  style={{ color: '#8E3400', fontWeight: 600, letterSpacing: '0.1em' }}>
              {t('purpose.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              {t('purpose.heading')}
            </h2>
          </div>

          {/* Large screens: the ring diagram */}
          <div className="hidden lg:block relative mx-auto" style={{ width: 960, height: 1190 }}>
            {/* Vision */}
            <div className="absolute" style={{ left: 500, top: 0, width: 400, height: 400 }}>
              <Ring size={400} color={RING_COLORS.vision} start={210} sweep={-280} arrow />
              <div className="absolute inset-0 flex items-center justify-center px-24">
                <p className="text-lg leading-snug text-center" style={{ color: '#132552', fontWeight: 600 }}>
                  {t('vision.body')}
                </p>
              </div>
            </div>
            <h3 className="absolute text-right uppercase"
                style={{ left: 40, top: 160, width: 420, color: RING_COLORS.vision, fontWeight: 900, fontSize: 56, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {t('vision.heading')}
            </h3>

            {/* Mission */}
            <div className="absolute" style={{ left: 40, top: 300, width: 580, height: 580 }}>
              <Ring size={580} color={RING_COLORS.mission} start={150} sweep={280} arrow />
              <div className="absolute inset-0 flex items-center justify-center" style={{ padding: '0 136px' }}>
                <p className="text-sm leading-normal text-center" style={{ color: '#374151', fontWeight: 700 }}>
                  {t('mission.body')}
                </p>
              </div>
            </div>
            <h3 className="absolute uppercase"
                style={{ left: 650, top: 540, width: 310, color: RING_COLORS.mission, fontWeight: 900, fontSize: 56, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {t('mission.heading')}
            </h3>

            {/* Values */}
            <div className="absolute" style={{ left: 520, top: 790, width: 400, height: 400 }}>
              <Ring size={400} color={RING_COLORS.values} start={340} sweep={310} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <ul className="space-y-3 text-center">
                  {t('mission.values', { returnObjects: true }).map((value) => (
                    <li key={value} className="text-2xl" style={{ color: '#0F766E', fontWeight: 800 }}>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className="absolute text-right uppercase"
                style={{ left: 40, top: 960, width: 440, color: RING_COLORS.values, fontWeight: 900, fontSize: 56, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {t('mission.valuesLabel')}
            </h3>
          </div>

          {/* Small screens: the same three steps stacked, joined by a line */}
          <div className="lg:hidden relative max-w-xl mx-auto">
            <div className="absolute top-8 bottom-8 w-1 rounded-full" style={{ left: 26, background: `linear-gradient(${RING_COLORS.vision}, ${RING_COLORS.mission}, ${RING_COLORS.values})` }} aria-hidden="true"></div>
            <ol className="relative space-y-12">
            {[
              { key: 'vision', heading: t('vision.heading'), body: <p className="text-lg leading-snug" style={{ color: '#132552', fontWeight: 600 }}>{t('vision.body')}</p> },
              { key: 'mission', heading: t('mission.heading'), body: <p className="text-base leading-relaxed" style={{ color: '#374151', fontWeight: 700 }}>{t('mission.body')}</p> },
              {
                key: 'values',
                heading: t('mission.valuesLabel'),
                body: (
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {t('mission.values', { returnObjects: true }).map((value) => (
                      <li key={value} className="text-xl" style={{ color: RING_COLORS.values, fontWeight: 800 }}>{value}</li>
                    ))}
                  </ul>
                )
              }
            ].map((item) => (
              <li key={item.key} className="relative flex gap-6">
                <div className="relative flex-shrink-0 w-14 h-14 rounded-full bg-white"
                     style={{ border: `8px solid ${RING_COLORS[item.key]}` }} aria-hidden="true"></div>
                <div className="pt-2">
                  <h3 className="uppercase mb-3" style={{ color: RING_COLORS[item.key], fontWeight: 900, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                    {item.heading}
                  </h3>
                  {item.body}
                </div>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            <div className="lg:col-span-5">
              <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-4"
                    style={{ color: '#8E3400', fontWeight: 600, letterSpacing: '0.1em' }}>
                {t('businessModel.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight"
                  style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
                {t('businessModel.heading')}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
                {t('businessModel.body')}
              </p>
            </div>
          </div>

          <h3 className="text-sm uppercase tracking-wider mb-6" style={{ color: '#132552', fontWeight: 700, letterSpacing: '0.1em' }}>
            {t('businessModel.cycleHeading')}
          </h3>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t('businessModel.steps', { returnObjects: true }).map((step, idx, steps) => {
              const Icon = CYCLE_ICONS[idx];
              return (
                <li key={step.title} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#132552' }}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-3xl font-black" style={{ color: '#E5E7EB', fontWeight: 900 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: '#132552', fontWeight: 700 }}>{step.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>{step.desc}</p>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-5 w-8 h-8 -translate-y-1/2 rounded-full items-center justify-center z-10"
                         style={{ backgroundColor: '#8E3400' }} aria-hidden="true">
                      <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-4"
                    style={{ color: '#8E3400', fontWeight: 600, letterSpacing: '0.1em' }}>
                {t('sdg.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight"
                  style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
                {t('sdg.headingLine1')} {t('sdg.headingLine2')}
              </h2>
            </div>
            <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
              {t('sdg.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-gray-200"
               style={{ backgroundColor: '#E5E7EB' }}>
            {t('sdg.items', { returnObjects: true }).map((sdg, idx) => {
              const meta = SDG_META[idx];
              return (
                <div key={meta.number} className="bg-white p-8 flex gap-5 transition-colors duration-200 hover:bg-gray-50">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white"
                       style={{ backgroundColor: meta.color }}>
                    <span className="text-[10px] uppercase tracking-wider leading-none" style={{ fontWeight: 700 }}>SDG</span>
                    <span className="text-2xl leading-none mt-1" style={{ fontWeight: 900 }}>{meta.number}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ fontWeight: 700, lineHeight: '1.3', color: '#132552' }}>
                      {sdg.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ fontWeight: 400, color: '#4B5563' }}>
                      {sdg.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;