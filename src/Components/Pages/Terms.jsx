import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const Terms = () => {
  const { t } = useTranslation('terms');
  const sections = t('sections', { returnObjects: true });
  return (
    <div className="w-full min-h-screen" style={{ fontFamily: FONT, backgroundColor: '#F9FAFB' }}>

      {/* ═══ HERO ═══ */}
      <section className="relative py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm mb-8 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'white' }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('hero.backToHome')}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(142,52,0,0.25)' }}>
              <FileText className="w-6 h-6" style={{ color: '#8E3400' }} />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#8E3400' }}>{t('hero.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            {t('hero.title')}
          </h1>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {t('hero.updated')} &nbsp;·&nbsp; {t('hero.orgName')}
          </p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ backgroundColor: '#132552', color: 'white' }}
                  >
                    {idx + 1}
                  </span>
                  <h2 className="text-xl font-bold" style={{ color: '#132552' }}>{section.title}</h2>
                </div>

                {section.content && (
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{section.content}</p>
                )}

                {section.intro && (
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>{section.intro}</p>
                )}

                {section.bullets && (
                  <ul className="space-y-4">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-base" style={{ color: '#4B5563' }}>
                        <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                        <span><strong style={{ color: '#132552' }}>{b.label}:</strong> {b.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.list && (
                  <ul className="space-y-3">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex gap-3 text-base" style={{ color: '#4B5563' }}>
                        <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Contact card */}
            <div className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: '#132552' }}>
              <h3 className="text-2xl font-bold text-white mb-3">{t('contact.heading')}</h3>
              <p className="text-base mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {t('contact.body')}
              </p>
              <a
                href="mailto:info@gogmi.org.gh"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: '#8E3400', color: 'white' }}
              >
                <Mail className="w-5 h-5" />
                info@gogmi.org.gh
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Terms;
