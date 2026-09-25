import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowLeft, Mail, Phone, ChevronRight } from 'lucide-react';

const Privacy = () => {
  const { t } = useTranslation('privacy');
  const sections = t('sections', { returnObjects: true });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Hero */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #132552 0%, #1A336C 100%)' }}></div>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #8E3400 0%, transparent 50%), radial-gradient(circle at 80% 20%, #17A2B8 0%, transparent 50%)' }}>
        </div>

        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('hero.backToHome')}</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(142, 52, 0, 0.25)' }}>
              <Shield className="w-8 h-8" style={{ color: '#FF8C5A' }} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#FF8C5A' }}>
                {t('hero.badge')}
              </p>
              <h1 className="text-4xl md:text-5xl" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                {t('hero.title')}
              </h1>
            </div>
          </div>

          <p className="text-lg text-white/80 max-w-2xl">
            {t('hero.orgLine')}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
               style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
            {t('hero.updated')}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="flex gap-12">

            {/* Sidebar TOC - hidden on mobile */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-8">
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#6B7280' }}>
                  {t('toc.heading')}
                </p>
                <nav className="space-y-1">
                  {sections.map((s, i) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:text-white group"
                      style={{ color: '#4B5563' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#132552'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span className="text-xs font-bold w-5 flex-shrink-0" style={{ color: '#8E3400' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{s.title}</span>
                    </a>
                  ))}
                  <a
                    href="#contact"
                    className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors hover:text-white"
                    style={{ color: '#4B5563' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#132552'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span className="text-xs font-bold w-5 flex-shrink-0" style={{ color: '#8E3400' }}>13</span>
                    <span>{t('toc.contact')}</span>
                  </a>
                </nav>
              </div>
            </aside>

            {/* Policy sections */}
            <div className="flex-1 min-w-0">
              <div className="space-y-10">
                {sections.map((section, i) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-8 p-7 rounded-2xl border"
                    style={{ borderColor: '#E5E7EB', backgroundColor: '#FAFAFA' }}
                  >
                    {/* Section header */}
                    <div className="flex items-start gap-4 mb-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
                            style={{ backgroundColor: '#8E3400' }}>
                        {i + 1}
                      </span>
                      <h2 className="text-xl pt-0.5" style={{ fontWeight: 800, color: '#132552' }}>
                        {section.title}
                      </h2>
                    </div>

                    {/* Plain paragraph */}
                    {section.content && (
                      <p className="text-base leading-relaxed pl-12" style={{ color: '#374151' }}>
                        {section.content}
                      </p>
                    )}

                    {/* Intro + labelled bullets */}
                    {section.intro && (
                      <p className="text-base leading-relaxed pl-12 mb-4" style={{ color: '#374151' }}>
                        {section.intro}
                      </p>
                    )}

                    {section.bullets && (
                      <ul className="space-y-2 pl-12">
                        {section.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#8E3400' }} />
                            <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                              <span className="font-bold" style={{ color: '#132552' }}>{b.label}: </span>
                              {b.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.list && (
                      <ul className="space-y-2 pl-12">
                        {section.list.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#8E3400' }} />
                            <p className="text-base leading-relaxed" style={{ color: '#374151' }}>{item}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Contact section */}
                <div
                  id="contact"
                  className="scroll-mt-8 rounded-2xl overflow-hidden"
                  style={{ border: '2px solid #132552' }}
                >
                  <div className="px-7 py-5" style={{ backgroundColor: '#132552' }}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                            style={{ backgroundColor: '#8E3400', color: 'white' }}>
                        13
                      </span>
                      <h2 className="text-xl font-black text-white">{t('contact.heading')}</h2>
                    </div>
                  </div>
                  <div className="p-7" style={{ backgroundColor: '#F0F4FF' }}>
                    <p className="text-base mb-5" style={{ color: '#374151' }}>
                      {t('contact.intro')}
                    </p>
                    <p className="font-black text-lg mb-4" style={{ color: '#132552' }}>
                      {t('contact.orgName')}
                    </p>
                    <div className="space-y-3">
                      <a
                        href="mailto:info@gogmi.org.gh"
                        className="inline-flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-sm"
                        style={{ backgroundColor: '#8E3400', color: 'white' }}
                      >
                        <Mail className="w-5 h-5" />
                        info@gogmi.org.gh
                      </a>
                      <div className="flex items-center gap-3 text-base" style={{ color: '#374151' }}>
                        <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#8E3400' }} />
                        <span className="font-semibold">+233 50 4953400</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="py-8 border-t" style={{ borderColor: '#E5E7EB', backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-4xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            {t('footer.copyright')}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ backgroundColor: '#132552', color: 'white' }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('footer.backToHome')}
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Privacy;
