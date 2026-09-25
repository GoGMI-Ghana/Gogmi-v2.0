import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Play, Users, Calendar, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Non-translatable data: video ids and funders (organisation names kept as-is)
const programmeIIData = {
  funders: ['UNESCO', 'Norad'],
  videoIds: ['jN0EXvXLAJU', 'lRS9p5dqhVk', 'rPpby0kToOs'],
};

const programmeIData = {
  funders: ['Norwegian Agency for Development Cooperation', 'IOC-UNESCO'],
  videoIds: ['6b6iSxtEG0A', 'Ad_gQXJeHfs', 'ngDvvWALkXI', '63EtiBewwMs'],
};

const VideoCard = ({ videoId, title, number, label, t }) => {
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
                aria-label={t('programmes.playLabel', { title })}
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

const ProgrammeSection = ({ programme, label, defaultOpen = false, t }) => {
  const [open, setOpen] = useState(defaultOpen);
  const items = programme.modules || programme.sessions;
  const itemLabel = programme.modules ? t('programmes.moduleLabel') : t('programmes.sessionLabel');

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
              <Globe className="w-4 h-4" /> {t('programmes.fundedBy')}: {programme.funders.join(' & ')}
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
                t={t}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ECOP = () => {
  const { t } = useTranslation('ecop');

  const programmeII = {
    theme: t('programmes.programmeII.theme'),
    dates: t('programmes.programmeII.dates'),
    funders: programmeIIData.funders,
    modules: t('programmes.programmeII.modules', { returnObjects: true }).map((m, idx) => ({
      ...m,
      number: idx + 1,
      videoId: programmeIIData.videoIds[idx],
    })),
  };

  const programmeI = {
    theme: t('programmes.programmeI.theme'),
    dates: t('programmes.programmeI.dates'),
    funders: programmeIData.funders,
    sessions: t('programmes.programmeI.sessions', { returnObjects: true }).map((s, idx) => ({
      ...s,
      number: idx + 1,
      videoId: programmeIData.videoIds[idx],
    })),
  };

  const sdgItems = t('sdg.items', { returnObjects: true });

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
            {t('hero.backLink')}
          </Link>

          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
            style={{ backgroundColor: 'rgba(142,52,0,0.2)', borderColor: 'rgba(142,52,0,0.4)' }}
          >
            <Users className="w-4 h-4" style={{ color: '#8E3400' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
              {t('hero.eyebrow')}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            {t('hero.heading1')}<br />{t('hero.heading2')}
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mb-14" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {t('hero.subtitle')}
          </p>

        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: '#8E3400' }}>
                {t('about.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {t('about.heading1')}<br />{t('about.heading2')}
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  {t('about.para1')}
                </p>
                <p>
                  {t('about.para2')}
                </p>
                <p>
                  {t('about.para3')}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/ecop-photo.jpg"
                  alt={t('about.imageAlt')}
                  className="w-full h-auto"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl p-6 shadow-xl"
                style={{ backgroundColor: '#8E3400' }}
              >
                <div className="text-3xl font-black text-white">2022</div>
                <div className="text-sm text-white opacity-80 mt-1">{t('about.yearLaunched')}</div>
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
              {t('sdg.heading')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('sdg.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {sdgItems.map((item, i) => (
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
              {t('programmes.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              {t('programmes.heading')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              {t('programmes.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            <ProgrammeSection
              programme={programmeII}
              label={t('programmes.labelII')}
              defaultOpen={true}
              t={t}
            />
            <ProgrammeSection
              programme={programmeI}
              label={t('programmes.labelI')}
              defaultOpen={false}
              t={t}
            />
          </div>
        </div>
      </section>

      {/* ═══ PHOTO STRIP ═══ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              {t('photoStrip.eyebrow')}
            </span>
            <h2 className="text-4xl font-black" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              {t('photoStrip.heading')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src="/ecop1.jpg" alt={t('photoStrip.img1Alt')} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src="/ecop-photo.jpg" alt={t('photoStrip.img2Alt')} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FUNDERS ═══ */}
      <section className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              {t('funders.eyebrow')}
            </span>
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              {t('funders.heading')}
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            <img src="/GoGMI_PNG.png" alt={t('funders.logoAlts.gogmi')} className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/norad.jpg" alt={t('funders.logoAlts.norad')} className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/unlogo.jpg" alt={t('funders.logoAlts.un')} className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            {t('cta.heading1')}<br />{t('cta.heading2')}
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {t('cta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-xl"
            style={{ backgroundColor: '#8E3400', color: 'white' }}
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ECOP;
