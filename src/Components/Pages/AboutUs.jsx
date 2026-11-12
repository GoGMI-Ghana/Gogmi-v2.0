import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, SectionHeader } from '../ui/Editorial';

// Official UN colours for the goals the Institute's work supports, in the order listed in about.json.
// ink is the label colour on the goal colour and text the heading colour on white; both meet WCAG AA.
// SDG 14's light blue is too pale for small white text or blue-on-white headings, so it gets darker ones.
const SDG_META = [
  { number: '14', color: '#0A97D9', ink: '#132552', text: '#0B6E9E' },
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

const RING_COLORS = { vision: '#132552', mission: '#8E3400' };

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
    className={`flex cursor-default items-start gap-4 rounded-[2px] p-4 transition-colors duration-200 ${align === 'right' ? 'lg:flex-row-reverse lg:text-right' : ''}`}
    style={{ backgroundColor: active ? `${meta.color}12` : 'transparent' }}
    onMouseEnter={onActivate}
  >
    <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-[2px]"
         style={{ backgroundColor: meta.color, color: meta.ink || '#fff' }} aria-hidden="true">
      <span className="text-[9px] font-bold uppercase leading-none tracking-wider">SDG</span>
      <span className="mt-1 text-xl font-bold leading-none">{meta.number}</span>
    </div>
    <div>
      <h3 className="mb-1 font-display text-[1.125rem] font-semibold leading-snug" style={{ color: active ? meta.text || meta.color : 'var(--color-ink)' }}>
        <span className="sr-only">SDG {meta.number}: </span>{sdg.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{sdg.desc}</p>
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
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8" onMouseLeave={() => setActive(null)}>
      <ul className="hidden space-y-4 lg:order-1 lg:block">{LEFT_SEGMENTS.map((idx) => callout(idx, 'right'))}</ul>

      <div className="relative order-1 mx-auto w-full lg:order-2" style={{ maxWidth: WHEEL.size }}>
        {/* Faint sunburst of all 17 goals */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: '-22%',
            background: sunburst,
            opacity: 0.18,
            WebkitMaskImage: 'radial-gradient(circle, transparent 46%, #000 47%, #000 62%, transparent 72%)',
            maskImage: 'radial-gradient(circle, transparent 46%, #000 47%, #000 62%, transparent 72%)'
          }}
          aria-hidden="true"
        ></div>

        <svg viewBox={`0 0 ${WHEEL.size} ${WHEEL.size}`} className="relative h-auto w-full font-body" aria-hidden="true">
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
                <text x={nx} y={ny - 6} textAnchor="middle" fill={meta.ink || '#fff'} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', opacity: dimmed ? 0.5 : 1 }}>SDG</text>
                <text x={nx} y={ny + 22} textAnchor="middle" fill={meta.ink || '#fff'} style={{ fontSize: 30, fontWeight: 700, opacity: dimmed ? 0.5 : 1 }}>{meta.number}</text>
              </g>
            );
          })}
          <circle cx={WHEEL.size / 2} cy={WHEEL.size / 2} r={WHEEL.inner - 10} fill="#fff" />
          <image href="/GoGMI_PNG.png" x={WHEEL.size / 2 - 62} y={WHEEL.size / 2 - 62} width="124" height="124" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>

      <ul className="hidden space-y-4 lg:order-3 lg:block">{RIGHT_SEGMENTS.map((idx) => callout(idx, 'left'))}</ul>

      {/* Small screens: one list in goal order below the wheel */}
      <ul className="order-2 space-y-2 lg:hidden">{SDG_META.map((_, idx) => callout(idx, 'left'))}</ul>
    </div>
  );
};

// Large serif heading used beside each ring.
const RING_HEADING = 'absolute font-display font-semibold leading-none';

const AboutUs = () => {
  const { t } = useTranslation('about');
  return (
    <div className="w-full overflow-x-hidden font-body text-text">

      {/* PAGE HEADER: title on navy beside the photograph */}
      <header className="bg-ink-deep pt-[84px]">
        <div className="grid lg:grid-cols-2">
          {/* The text column lines up with the site container's left edge on wide screens */}
          <div className="flex items-end lg:justify-end">
            <div className="w-full px-6 py-16 md:px-10 md:py-24 lg:max-w-[600px] lg:pr-16">
              <h1 className="heading-display !text-white text-[2.75rem] md:text-[4rem]">{t('hero.title')}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-dark md:text-xl">{t('hero.subtitle')}</p>
            </div>
          </div>
          <img
            src="/about-hero-1600.jpg"
            alt="A participant taking notes at a GoGMI training session"
            className="h-64 w-full object-cover md:h-80 lg:h-full lg:min-h-[420px]"
          />
        </div>
      </header>

      {/* WHO WE ARE: portrait photograph beside the story */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="about-story">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
              <img
                src="/about-story-1600.jpg"
                alt="Two GoGMI colleagues in conversation"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[2px] object-cover"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-sm font-semibold text-rust">{t('story.eyebrow')}</p>
              <h2 id="about-story" className="heading-display mt-3 text-[2.25rem] md:text-[3rem]">{t('story.heading')}</h2>
              <p className="prose-lead mt-8">{t('story.para1')}</p>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">{t('story.para2')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* VISION AND MISSION: two linked rings */}
      <section className="overflow-hidden bg-paper py-20 md:py-28" aria-labelledby="about-purpose">
        <Container>
          <SectionHeader id="about-purpose" title={t('purpose.heading')} />

          {/* Large screens: the ring diagram */}
          <div className="relative mx-auto mt-16 hidden lg:block" style={{ width: 960, height: 880 }}>
            {/* Vision */}
            <div className="absolute" style={{ left: 500, top: 0, width: 400, height: 400 }}>
              <Ring size={400} color={RING_COLORS.vision} start={210} sweep={-280} arrow />
              <div className="absolute inset-0 flex items-center justify-center px-24">
                <p className="text-center font-display text-[1.25rem] font-medium leading-snug text-ink">
                  {t('vision.body')}
                </p>
              </div>
            </div>
            <h3 className={`${RING_HEADING} text-right`} style={{ left: 40, top: 170, width: 420, color: RING_COLORS.vision, fontSize: 56 }}>
              {t('vision.heading')}
            </h3>

            {/* Mission */}
            <div className="absolute" style={{ left: 40, top: 300, width: 580, height: 580 }}>
              <Ring size={580} color={RING_COLORS.mission} start={150} sweep={280} />
              <div className="absolute inset-0 flex items-center justify-center" style={{ padding: '0 132px' }}>
                <p className="text-center text-[0.875rem] font-bold leading-normal text-text">
                  {t('mission.body')}
                </p>
              </div>
            </div>
            <h3 className={RING_HEADING} style={{ left: 650, top: 560, width: 310, color: RING_COLORS.mission, fontSize: 56 }}>
              {t('mission.heading')}
            </h3>
          </div>

          {/* Small screens: the same two steps stacked, joined by a line */}
          <div className="relative mx-auto mt-12 max-w-xl lg:hidden">
            <div className="absolute bottom-8 top-8 w-0.5" style={{ left: 27, background: `linear-gradient(${RING_COLORS.vision}, ${RING_COLORS.mission})` }} aria-hidden="true"></div>
            <ol className="relative space-y-12">
              {[
                { key: 'vision', heading: t('vision.heading'), body: <p className="font-display text-lg font-medium leading-snug text-ink">{t('vision.body')}</p> },
                { key: 'mission', heading: t('mission.heading'), body: <p className="text-base font-bold leading-relaxed text-text">{t('mission.body')}</p> }
              ].map((item) => (
                <li key={item.key} className="relative flex gap-6">
                  <div className="relative h-14 w-14 flex-shrink-0 rounded-full bg-paper"
                       style={{ border: `7px solid ${RING_COLORS[item.key]}` }} aria-hidden="true"></div>
                  <div className="pt-2">
                    <h3 className="mb-3 font-display text-[1.75rem] font-semibold leading-tight" style={{ color: RING_COLORS[item.key] }}>
                      {item.heading}
                    </h3>
                    {item.body}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* BUSINESS MODEL: a single reading column with a drop capital */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="about-model">
        <Container>
          <div className="mx-auto max-w-[44rem]">
            <p className="text-sm font-semibold text-rust">{t('businessModel.eyebrow')}</p>
            <h2 id="about-model" className="heading-display mt-3 text-[2.25rem] md:text-[3rem]">{t('businessModel.heading')}</h2>
            <p className="prose-lead mt-8 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.25rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-rust">
              {t('businessModel.body')}
            </p>
          </div>
        </Container>
      </section>

      {/* SDGs: six-goal wheel over a faint SDG sunburst */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-28" aria-labelledby="about-sdg">
        <Container>
          <SectionHeader
            id="about-sdg"
            title={`${t('sdg.headingLine1')} ${t('sdg.headingLine2')}`}
            intro={t('sdg.subtitle')}
          />
          <div className="mt-16">
            <SdgWheel items={t('sdg.items', { returnObjects: true })} />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
