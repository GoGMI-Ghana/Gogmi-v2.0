import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Clock, Globe, Users, CheckCircle, BookOpen } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const modulesMeta = [
  { number: '01' },
  { number: '02' },
  { number: '03' },
  { number: '04' },
  { number: '05' },
];

const participantsMeta = [
  { name: 'Lt Cdr Emilio Okyere-Dadzie', image: '/emilio.jpg' },
  { name: 'Lt Cdr Kwame Yelbuor', image: '/yelbour.jpg' },
  { name: 'Maximus Ashitey', image: '/maximus.jpg' },
  { name: 'Lt Cdr Edem Komla Akati', image: '/Akati.jpg' },
];

const quickFactsMeta = [
  { icon: Clock },
  { icon: Globe },
  { icon: Users },
  { icon: Calendar },
  { icon: BookOpen },
  { icon: CheckCircle },
];

const MASSDI = () => {
  const { t } = useTranslation('massdi');

  const modules = t('modulesSection.items', { returnObjects: true }).map((mod, idx) => ({
    ...mod,
    ...modulesMeta[idx],
  }));

  const participants = t('participantsSection.items', { returnObjects: true }).map((participant, idx) => ({
    ...participant,
    ...participantsMeta[idx],
  }));

  const quickFacts = t('quickFacts', { returnObjects: true }).map((fact, idx) => ({
    ...fact,
    ...quickFactsMeta[idx],
  }));

  const learnItems = t('about.learnItems', { returnObjects: true });
  const attendItems = t('about.attendItems', { returnObjects: true });

  return (
    <div className="w-full min-h-screen" style={{ fontFamily: FONT, backgroundColor: '#F9FAFB' }}>

      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/maritmegovvvv.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.97) 0%, rgba(19,37,82,0.85) 100%)' }} />

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
            <BookOpen className="w-4 h-4" style={{ color: '#8E3400' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}>
            {t('hero.subtitle')}
          </p>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* ═══ QUICK FACTS ═══ */}
      <section className="py-0">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 -mt-8 relative z-10">
            {quickFacts.map((fact, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center">
                <fact.icon className="w-5 h-5 mx-auto mb-2" style={{ color: '#8E3400' }} />
                <div className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#9CA3AF' }}>{fact.label}</div>
                <div className="text-sm font-bold" style={{ color: '#132552' }}>{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-20 md:py-28 bg-white mt-8">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: '#8E3400' }}>
                {t('about.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {t('about.heading')}
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

            <div className="space-y-5">
              <div className="rounded-2xl p-8" style={{ backgroundColor: '#132552' }}>
                <h3 className="text-xl font-bold text-white mb-6">{t('about.learnHeading')}</h3>
                <ul className="space-y-4">
                  {learnItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-8 border-2 border-gray-100">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#132552' }}>{t('about.attendHeading')}</h3>
                <ul className="space-y-3">
                  {attendItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-base" style={{ color: '#4B5563' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MODULES ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              {t('modulesSection.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              {t('modulesSection.heading')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              {t('modulesSection.subtitle')}
            </p>
          </div>

          <div className="space-y-5">
            {modules.map((mod) => (
              <div key={mod.number} className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 flex gap-8 items-start">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ backgroundColor: '#132552', color: 'white' }}
                >
                  {mod.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#132552' }}>{mod.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{mod.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTICIPANTS ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              {t('participantsSection.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              {t('participantsSection.heading')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              {t('participantsSection.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {participants.map((participant, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className="h-64 relative" style={{ backgroundColor: '#F1F5F9' }}>
                  {participant.image ? (
                    <img
                      src={participant.image}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 items-center justify-center"
                    style={{ display: participant.image ? 'none' : 'flex' }}
                  >
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black"
                      style={{ backgroundColor: '#132552', color: 'white' }}
                    >
                      {participant.name.split(' ').pop()[0]}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: '#8E3400' }} />
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#132552' }}>{participant.name}</h3>
                  <p className="text-xs font-semibold mb-4 uppercase tracking-wide" style={{ color: '#8E3400' }}>{participant.title}</p>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#4B5563' }}>{participant.bio}</p>
                </div>
              </div>
            ))}
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

export default MASSDI;
