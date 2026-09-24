import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Star, Lightbulb, Globe, CheckCircle, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const originStatValues = ['30', '200+', '2022', '3'];
const elementNumbers = ['01', '02', '03'];

const BlueMentorship = () => {
  const { t } = useTranslation('blueMentorship');
  const impacts = t('impacts.items', { returnObjects: true });
  const elements = t('elements.items', { returnObjects: true }).map((el, i) => ({ ...el, number: elementNumbers[i] }));
  const incubatorThemes = t('incubator.themes', { returnObjects: true });
  const originStats = t('origin.stats', { returnObjects: true }).map((s, i) => ({ ...s, value: originStatValues[i] }));
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
            {t('hero.backLink')}
          </Link>

          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
            style={{ backgroundColor: 'rgba(142,52,0,0.2)', borderColor: 'rgba(142,52,0,0.4)' }}
          >
            <Star className="w-4 h-4" style={{ color: '#8E3400' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            {t('hero.titleLine1')}<br />{t('hero.titleLine2')}
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {t('hero.subtitle')}
          </p>

          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8E3400' }} />
            {t('hero.statusBadge')}
          </div>
        </div>
      </section>

      {/* ═══ ORIGIN ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: '#8E3400' }}>
                {t('origin.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {t('origin.heading')}
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  {t('origin.para1')}
                </p>
                <p>
                  {t('origin.para2')}
                </p>
                <p>
                  {t('origin.para3')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {originStats.map((stat, i) => (
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
              {t('impacts.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
              {t('impacts.heading')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('impacts.subtitle')}
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
              {t('elements.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              {t('elements.heading')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              {t('elements.subtitle')}
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
                {t('incubator.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {t('incubator.heading')}
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  {t('incubator.para1')}
                </p>
                <p>
                  {t('incubator.para2')}
                </p>
                <p>
                  {t('incubator.para3')}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#132552' }}>{t('incubator.themesHeading')}</h3>
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
            {t('cta.headingLine1')}<br />{t('cta.headingLine2')}
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

export default BlueMentorship;
