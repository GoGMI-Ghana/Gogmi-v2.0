import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Clock, Users, Globe } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const partnerMeta = [
  { id: 1, name: 'DOTCAN Institute', logo: '/DOTCANLOGO.png' },
  { id: 2, name: 'Gulf of Guinea Maritime Institute (GoGMI)', logo: '/GoGMI_PNG.png' },
  { id: 3, name: 'Biosfera 1', logo: '/biosfera.jpg' },
  { id: 4, name: 'Sustainable Ocean Applied Research (SOAR)', logo: '/soar.jpg' },
  { id: 5, name: 'Initiative For Africa (IFA)', logo: '/ifa.jpg' },
  { id: 6, name: "Canada's Ocean Supercluster", logo: '/osp.jpg' },
];

const WYTEC = () => {
  const { t } = useTranslation('wytec');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const partners = partnerMeta.map((p) => ({
    ...p,
    description: t(`partnersSection.items.${p.id}.description`),
    country: t(`partnersSection.items.${p.id}.country`),
  }));

  const streams = [1, 2, 3].map((i) => ({
    title: t(`curriculum.streams.${i}.title`),
    highlights: t(`curriculum.streams.${i}.highlights`, { returnObjects: true }),
  }));

  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: FONT }}>

      {/* ═══ HERO ═══ */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden" style={{ backgroundColor: '#132552' }}>
        <div className="absolute inset-0">
          <img
            src="/wytec1.jpg"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.95) 0%, rgba(26,51,108,0.9) 100%)' }} />
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{ backgroundColor: 'rgba(142,52,0,0.2)', borderColor: 'rgba(142,52,0,0.4)' }}
            >
              <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
                {t('hero.badgeLabel')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
              {t('hero.title')}
            </h1>
            <p className="text-xl font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {t('hero.edition')}
            </p>
            <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ QUICK FACTS ═══ */}
      <section className="relative -mt-12 z-20 px-6 pb-12">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ border: '1px solid #E5E7EB' }}>
            {[
              { icon: <Clock className="w-5 h-5" />, label: t('quickFacts.duration.label'), value: `9 ${t('quickFacts.duration.unit')}` },
              { icon: <MapPin className="w-5 h-5" />, label: t('quickFacts.locations.label'), value: t('quickFacts.locations.value') },
              { icon: <Globe className="w-5 h-5" />, label: t('quickFacts.format.label'), value: t('quickFacts.format.value') },
              { icon: <Users className="w-5 h-5" />, label: t('quickFacts.delivery.label'), value: t('quickFacts.delivery.value') },
            ].map((fact, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: 'rgba(19,37,82,0.08)', color: '#132552' }}>
                  {fact.icon}
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: '#6B7280' }}>{fact.label}</p>
                <p className="text-sm font-bold" style={{ color: '#132552' }}>{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FLYER BANNER ═══ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <img
              src="/Background.jpg"
              alt={t('flyer.imageAlt')}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* ═══ PROJECT DESCRIPTION ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>{t('about.eyebrow')}</span>
              <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552', letterSpacing: '-0.02em' }}>
                {t('about.heading')}
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  {t('about.para1')}
                </p>
                <p>
                  {t('about.para2')}
                </p>
                <p>
                  {t('about.para3')}
                </p>
                <p>
                  {t('about.para4')}
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              <img
                src="/wytec2.jpg"
                alt={t('about.imageAlt')}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIGNIFICANCE & FUNDING ═══ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>{t('significance.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              {t('significance.heading')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">{t('significance.unDecade.heading')}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {t('significance.unDecade.body')}
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="bg-white rounded-xl p-3 inline-block mb-4">
                <img src="/canadalogo.jpg" alt={t('significance.canadaLogoAlt')} className="h-10 object-contain" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{t('significance.dfo.heading')}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {t('significance.dfo.body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRAINING COMPONENTS ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>{t('curriculum.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.02em' }}>
              {t('curriculum.heading')}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              {t('curriculum.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {streams.map((stream, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border-l-4"
                style={{ backgroundColor: '#F9FAFB', borderColor: i === 2 ? '#8E3400' : '#132552' }}
              >
                <h3 className="text-base font-bold mb-4" style={{ color: '#132552' }}>{stream.title}</h3>
                <ul className="space-y-2">
                  {stream.highlights.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#4B5563' }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTNERS ═══ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>{t('partnersSection.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.02em' }}>
              {t('partnersSection.heading')}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              {t('partnersSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {partners.map((partner, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-20 h-14 flex-shrink-0 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-2">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold leading-tight" style={{ color: '#132552' }}>{partner.name}</h3>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'rgba(19,37,82,0.08)', color: '#132552' }}
                      >
                        {partner.country}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUSTAINABILITY INITIATIVE ═══ */}
      {/* ═══ PHOTO GALLERY ═══ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>{t('gallery.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              {t('gallery.heading')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['/wytec1.jpg', '/wytec2.jpg', '/wytec3.jpg'].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                <img src={src} alt={t('gallery.imageAlt', { n: i + 1 })} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>{t('sustainability.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.02em' }}>
              {t('sustainability.heading')}
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="p-8 md:p-10" style={{ backgroundColor: '#132552' }}>
              <h3 className="text-xl font-bold text-white mb-3">{t('sustainability.forumHeading')}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {t('sustainability.forumBody')}
              </p>
            </div>
            <div className="p-8 md:p-10 bg-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-base font-bold mb-3" style={{ color: '#132552' }}>{t('sustainability.ecopHeading')}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                    {t('sustainability.ecopBody')}
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-bold mb-3" style={{ color: '#132552' }}>{t('sustainability.impactHeading')}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                    {t('sustainability.impactBody')}
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA', borderLeft: '4px solid #8E3400' }}>
                <p className="text-sm italic leading-relaxed" style={{ color: '#4B5563' }}>
                  "{t('sustainability.quote')}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WYTEC;
