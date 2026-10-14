import React, { useState } from 'react';
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

// All 17 official SDG colours, used for the faint sunburst behind the wheel.
const ALL_SDG_COLORS = [
  '#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21', '#26BDE2', '#FCC30B', '#A21942', '#FD6925',
  '#DD1367', '#FD9D24', '#BF8B2E', '#3F7E44', '#0A97D9', '#56C02B', '#00689D', '#19486A'
];

const sunburst = (() => {
  const slice = 360 / ALL_SDG_COLORS.length;
  const stops = ALL_SDG_COLORS.map((color, i) => {
    const from = i * slice;
    return `${color} ${from}deg ${from + slice - 3}deg, transparent ${from + slice - 3}deg ${from + slice}deg`;
  });
  return `conic-gradient(from -90deg, ${stops.join(', ')})`;
})();

// Six-segment wheel: segment i covers the 60 degrees clockwise from i * 60 (0 = 12 o'clock).
const WHEEL = { size: 460, outer: 220, inner: 112, gap: 2.5 };

const wheelPoint = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [WHEEL.size / 2 + r * Math.sin(a), WHEEL.size / 2 - r * Math.cos(a)];
};

const segmentPath = (i) => {
  const a0 = i * 60 + WHEEL.gap;
  const a1 = (i + 1) * 60 - WHEEL.gap;
  const [ox0, oy0] = wheelPoint(WHEEL.outer, a0);
  const [ox1, oy1] = wheelPoint(WHEEL.outer, a1);
  const [ix1, iy1] = wheelPoint(WHEEL.inner, a1);
  const [ix0, iy0] = wheelPoint(WHEEL.inner, a0);
  return `M ${ox0} ${oy0} A ${WHEEL.outer} ${WHEEL.outer} 0 0 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${WHEEL.inner} ${WHEEL.inner} 0 0 0 ${ix0} ${iy0} Z`;
};

// Callouts beside the wheel: segments 0-2 sit on the right (top to bottom), 5-3 on the left.
const RIGHT_SEGMENTS = [0, 1, 2];
const LEFT_SEGMENTS = [5, 4, 3];

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

const SdgCallout = ({ sdg, meta, align, active, onActivate }) => (
  <li
    className={`flex gap-4 items-start rounded-xl p-4 transition-all duration-200 cursor-default ${align === 'right' ? 'lg:flex-row-reverse lg:text-right' : ''}`}
    style={{ backgroundColor: active ? `${meta.color}12` : 'transparent' }}
    onMouseEnter={onActivate}
    onFocus={onActivate}
    tabIndex={0}
  >
    <div className="flex-shrink-0 w-14 h-14 rounded-lg flex flex-col items-center justify-center text-white shadow-sm"
         style={{ backgroundColor: meta.color }}>
      <span className="text-[9px] uppercase tracking-wider leading-none" style={{ fontWeight: 700 }}>SDG</span>
      <span className="text-xl leading-none mt-1" style={{ fontWeight: 900 }}>{meta.number}</span>
    </div>
    <div>
      <h3 className="text-base font-bold mb-1" style={{ color: active ? meta.color : '#132552', fontWeight: 800, lineHeight: 1.3 }}>
        {sdg.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{sdg.desc}</p>
    </div>
  </li>
);

const SdgWheel = ({ items }) => {
  const [active, setActive] = useState(null);
  // Highlighting follows the mouse; on touch screens it would stick after a tap, so it is skipped there.
  const [canHover] = useState(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches);
  const activate = (idx) => { if (canHover) setActive(idx); };
  const callout = (idx, align) => (
    <SdgCallout key={idx} sdg={items[idx]} meta={SDG_META[idx]} align={align} active={active === idx} onActivate={() => activate(idx)} />
  );

  return (
    <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-8 items-center" onMouseLeave={() => setActive(null)}>
      <ul className="hidden lg:block lg:order-1 space-y-4">{LEFT_SEGMENTS.map((idx) => callout(idx, 'right'))}</ul>

      <div className="order-1 lg:order-2 relative mx-auto w-full" style={{ maxWidth: WHEEL.size }}>
        {/* Faint sunburst of all 17 goals */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-22%',
            background: sunburst,
            opacity: 0.18,
            WebkitMaskImage: 'radial-gradient(circle, transparent 46%, #000 47%, #000 62%, transparent 72%)',
            maskImage: 'radial-gradient(circle, transparent 46%, #000 47%, #000 62%, transparent 72%)'
          }}
          aria-hidden="true"
        ></div>

        <svg viewBox={`0 0 ${WHEEL.size} ${WHEEL.size}`} className="relative w-full h-auto drop-shadow-xl" role="img"
             aria-label={items.map((item, idx) => `SDG ${SDG_META[idx].number}: ${item.title}`).join(', ')}>
          {SDG_META.map((meta, idx) => {
            const [nx, ny] = wheelPoint((WHEEL.outer + WHEEL.inner) / 2, idx * 60 + 30);
            const dimmed = active !== null && active !== idx;
            return (
              <g key={meta.number} onMouseEnter={() => activate(idx)} style={{ cursor: 'default' }}>
                <path
                  d={segmentPath(idx)}
                  fill={meta.color}
                  style={{
                    opacity: dimmed ? 0.35 : 1,
                    transform: active === idx ? 'scale(1.04)' : 'scale(1)',
                    transformOrigin: 'center',
                    transformBox: 'view-box',
                    transition: 'opacity 0.2s, transform 0.2s'
                  }}
                />
                <text x={nx} y={ny - 6} textAnchor="middle" fill="#fff" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', opacity: dimmed ? 0.5 : 1 }}>SDG</text>
                <text x={nx} y={ny + 22} textAnchor="middle" fill="#fff" style={{ fontSize: 30, fontWeight: 900, opacity: dimmed ? 0.5 : 1 }}>{meta.number}</text>
              </g>
            );
          })}
          <circle cx={WHEEL.size / 2} cy={WHEEL.size / 2} r={WHEEL.inner - 10} fill="#fff" />
          <image href="/GoGMI_PNG.png" x={WHEEL.size / 2 - 62} y={WHEEL.size / 2 - 62} width="124" height="124" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>

      <ul className="hidden lg:block lg:order-3 space-y-4">{RIGHT_SEGMENTS.map((idx) => callout(idx, 'left'))}</ul>

      {/* Small screens: one list in goal order below the wheel */}
      <ul className="order-2 lg:hidden space-y-2">{SDG_META.map((_, idx) => callout(idx, 'left'))}</ul>
    </div>
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
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
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

        </div>
      </section>

      {/* SDG Section: a six-goal wheel over a faint SDG sunburst */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container mx-auto max-w-7xl px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-4"
                  style={{ color: '#8E3400', fontWeight: 600, letterSpacing: '0.1em' }}>
              {t('sdg.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              {t('sdg.headingLine1')} {t('sdg.headingLine2')}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
              {t('sdg.subtitle')}
            </p>
          </div>

          <SdgWheel items={t('sdg.items', { returnObjects: true })} />
        </div>
      </section>

    </div>
  );
};

export default AboutUs;