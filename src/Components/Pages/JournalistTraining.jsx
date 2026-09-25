import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Calendar, MapPin, Users, CheckCircle, AlertCircle, FileText, Globe, BookOpen, Award, ChevronDown, ChevronUp, X } from 'lucide-react';

const JournalistTraining = () => {
  const { t } = useTranslation('journalistTraining');
  const [showPDFModal, setShowPDFModal] = useState(false);

  const keyDates = t('keyDates', { returnObjects: true });
  const whoShouldApply = t('whoShouldApply', { returnObjects: true });
  const programHighlights = t('programHighlights', { returnObjects: true });
  const applicationMaterials = t('applicationMaterials', { returnObjects: true });

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: '480px' }}>
        <div className="absolute inset-0">
          <img
            src="/journalist.training.webp"
            alt={t('hero.imageAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.96) 0%, rgba(142,52,0,0.88) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border-2"
               style={{ borderColor: '#8E3400', backgroundColor: 'rgba(142,52,0,0.25)' }}>
            <span className="text-white text-xs font-bold tracking-widest uppercase">{t('hero.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.02em', maxWidth: '820px' }}>
            {t('hero.title')}
          </h1>

          <p className="text-lg text-white/85 font-semibold mb-8">
            {t('hero.dateLocation')}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">{t('hero.location')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">{t('hero.dates')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">{t('hero.free')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER BADGE ── */}
      <div className="bg-white border-b border-slate-100 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>{t('partners.supportedBy')}</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#132552' }}>EU-funded EnMAR Project</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#8E3400' }}>Expertise France</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#F5F7FA', color: '#132552' }}>Gulf of Guinea Maritime Institute (GoGMI)</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ── LEFT: Main Content ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* About the Programme */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>{t('about.heading')}</h2>
              </div>

              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  {t('about.para1')}
                </p>
                <p>
                  {t('about.para2Prefix')} <strong style={{ color: '#132552' }}>{t('about.para2Strong')}</strong> {t('about.para2Suffix')}
                </p>
                <p>
                  {t('about.para3Prefix')} <em>{t('about.para3Em')}</em>{t('about.para3Suffix')}
                </p>
                <p>
                  {t('about.para4')}
                </p>
                <p>
                  {t('about.para5')}
                </p>
              </div>
            </section>

            {/* Who Should Apply */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>{t('whoShouldApplySection.heading')}</h2>
              </div>

              <ul className="space-y-4">
                {whoShouldApply.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} />
                    <span className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-5 rounded-xl border-l-4" style={{ backgroundColor: '#FFF7ED', borderColor: '#8E3400' }}>
                <p className="text-sm font-bold mb-1" style={{ color: '#92400E' }}>{t('whoShouldApplySection.specialConsiderationLabel')}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                  {t('whoShouldApplySection.specialConsiderationBody')}
                </p>
              </div>
            </section>

            {/* Programme Highlights */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>{t('highlightsSection.heading')}</h2>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {programHighlights.map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(142,52,0,0.1)' }}>
                      {i === 0 ? <BookOpen className="w-5 h-5" style={{ color: '#8E3400' }} /> :
                       i === 1 ? <Users className="w-5 h-5" style={{ color: '#8E3400' }} /> :
                                 <Award className="w-5 h-5" style={{ color: '#8E3400' }} />}
                    </div>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: '#374151' }}>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Materials */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>{t('materialsSection.heading')}</h2>
              </div>

              <ul className="space-y-4">
                {applicationMaterials.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs font-bold"
                         style={{ backgroundColor: '#132552' }}>
                      {i + 1}
                    </div>
                    <span className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                <p className="text-sm" style={{ color: '#4B5563' }}>
                  <strong style={{ color: '#132552' }}>{t('materialsSection.languageRequirementLabel')}</strong> {t('materialsSection.languageRequirementBody')}
                </p>
              </div>
            </section>

            {/* Logistical Arrangements */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>{t('logistics.heading')}</h2>
              </div>

              <div className="p-6 rounded-2xl border-2" style={{ borderColor: '#E5E7EB' }}>
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                  <p>
                    <strong style={{ color: '#132552' }}>{t('logistics.costLabel')}</strong> {t('logistics.costBody')}
                  </p>
                  <p>
                    <strong style={{ color: '#132552' }}>{t('logistics.venueLabel')}</strong> {t('logistics.venueBody')}
                  </p>
                  <p>
                    <strong style={{ color: '#132552' }}>{t('logistics.internationalLabel')}</strong> {t('logistics.internationalBody')}
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              {/* Status Banner */}
              <div className="rounded-2xl p-5 text-white text-center" style={{ backgroundColor: '#132552' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-xs font-bold" style={{ backgroundColor: '#6B7280' }}>
                  <span>{t('sidebar.statusBadge')}</span>
                </div>
                <p className="text-sm font-semibold text-white/80">{t('sidebar.statusMessage')}</p>
                <p className="text-xs text-white/60 mt-1">{t('sidebar.statusSubtext')}</p>
              </div>

              {/* Key Dates */}
              <div className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: '#E5E7EB' }}>
                <h3 className="text-base font-black mb-4 flex items-center gap-2" style={{ color: '#132552' }}>
                  <Calendar className="w-4 h-4" style={{ color: '#8E3400' }} />
                  {t('sidebar.keyDatesHeading')}
                </h3>
                <ul className="space-y-4">
                  {keyDates.map((item, i) => (
                    <li key={i} className="border-b pb-3 last:border-0 last:pb-0" style={{ borderColor: '#F3F4F6' }}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#8E3400' }}>{item.label}</p>
                      <p className="text-sm font-semibold" style={{ color: '#132552' }}>{item.date}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: '#E5E7EB' }}>
                <h3 className="text-base font-black mb-4 flex items-center gap-2" style={{ color: '#132552' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#8E3400' }} />
                  {t('sidebar.locationHeading')}
                </h3>
                <p className="text-sm font-semibold" style={{ color: '#132552' }}>{t('sidebar.locationValue')}</p>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{t('sidebar.locationSubtext')}</p>
              </div>

              {/* Event Flyer */}
              <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: '#E5E7EB' }}>
                <div className="px-4 pt-4 pb-2">
                  <h3 className="text-base font-black" style={{ color: '#132552' }}>{t('sidebar.flyerHeading')}</h3>
                  <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{t('sidebar.flyerSubtext')}</p>
                </div>
                {/* Flyer image — replace src with actual flyer path */}
                <div className="relative group">
                  <img
                    src="/journalist.training.webp"
                    alt={t('sidebar.flyerAlt')}
                    className="w-full object-cover"
                    style={{ maxHeight: '420px', objectPosition: 'top' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder if image not yet uploaded */}
                  <div
                    className="w-full items-center justify-center flex-col gap-2 py-16 bg-slate-50"
                    style={{ display: 'none' }}
                  >
                    <FileText className="w-10 h-10" style={{ color: '#CBD5E1' }} />
                    <p className="text-xs font-semibold" style={{ color: '#94A3B8' }}>{t('sidebar.flyerNotUploadedTitle')}</p>
                    <p className="text-xs" style={{ color: '#CBD5E1' }}>{t('sidebar.flyerNotUploadedPath')}<br/>/resources/images/journalist-training-flyer.jpg</p>
                  </div>
                  {/* Hover overlay with download prompt */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(19,37,82,0.6)' }}>
                    <a
                      href="/journalist.training.webp"
                      download="Journalist-Training-Flyer.webp"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-white"
                      style={{ backgroundColor: '#8E3400' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-4 h-4" />
                      {t('sidebar.downloadFlyer')}
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <a
                    href="/journalist.training.webp"
                    download="Journalist-Training-Flyer.webp"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#8E3400' }}
                  >
                    <Download className="w-4 h-4" />
                    {t('sidebar.downloadFlyer')}
                  </a>
                </div>
              </div>

              {/* Download PDF */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFF7ED', border: '2px solid #FED7AA' }}>
                <h3 className="text-base font-black mb-3" style={{ color: '#92400E' }}>{t('sidebar.documentHeading')}</h3>
                <p className="text-xs mb-4" style={{ color: '#78350F' }}>{t('sidebar.documentBody')}</p>
                <a
                  href="/resources/pdfs/journalistdocument.pdf"
                  download="Journalist-Training-Programme.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#8E3400' }}
                >
                  <Download className="w-4 h-4" />
                  {t('sidebar.downloadPdf')}
                </a>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: '#E5E7EB' }}>
                <h3 className="text-base font-black mb-3" style={{ color: '#132552' }}>{t('sidebar.questionsHeading')}</h3>
                <p className="text-xs mb-3" style={{ color: '#6B7280' }}>{t('sidebar.questionsBody')}</p>
                <a
                  href="mailto:info@gogmi.org.gh"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#132552' }}
                >
                  info@gogmi.org.gh
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16" style={{ backgroundColor: '#132552' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">{t('cta.heading')}</h2>
          <p className="text-white/80 mb-8 text-lg">
            {t('cta.body')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/capacity-building"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 text-white border-2 border-white/30 hover:bg-white/10"
            >
              {t('cta.viewAll')}
            </a>
            <a
              href="mailto:info@gogmi.org.gh"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105"
              style={{ backgroundColor: '#8E3400', color: 'white' }}
            >
              {t('cta.contact')}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default JournalistTraining;
