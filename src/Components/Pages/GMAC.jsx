import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, Globe, Quote } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const GMAC = () => {
  const { t } = useTranslation('gmac');
  const highlights = t('highlights', { returnObjects: true });
  const focusAreas = t('focusAreas', { returnObjects: true });
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
            {t('hero.backLink')}
          </Link>

          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
            style={{ backgroundColor: 'rgba(142,52,0,0.2)', borderColor: 'rgba(142,52,0,0.4)' }}
          >
            <Globe className="w-4 h-4" style={{ color: '#8E3400' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            {t('hero.titleLine1')}<br />{t('hero.titleLine2')}
          </h1>

          <p className="text-lg md:text-xl font-semibold mb-4 uppercase tracking-wide" style={{ color: '#8E3400' }}>
            {t('hero.theme')}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8E3400' }} />
              {t('hero.date')}
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8E3400' }} />
              {t('hero.stakeholders')}
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
                {t('overview.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {t('overview.heading')}
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  {t('overview.para1')}
                </p>
                <p>
                  {t('overview.para2')}
                </p>
                <p>
                  {t('overview.para3')}
                </p>
              </div>
            </div>

            <div>
              <img
                src="/gmacpic.jpg"
                alt={t('overview.imageAlt')}
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
              {t('highlightsSection.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
              {t('highlightsSection.heading')}
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
              {t('focusSection.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              {t('focusSection.heading')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              {t('focusSection.subtitle')}
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
              "{t('testimonial.quote')}"
            </blockquote>
            <div>
              <div className="text-base font-bold text-white">{t('testimonial.name')}</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {t('testimonial.title')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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

export default GMAC;
