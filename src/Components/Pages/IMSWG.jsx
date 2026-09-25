import React from 'react';
import { Download, Users, Globe, FileText, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const IMSWG = () => {
  const { t } = useTranslation('imswg');
  const navigate = useNavigate();

  const goToReports = () => {
    navigate('/resources?subcategory=IMSWG+Reports#internal-reports');
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/imswg4.jpg"
            alt={t('hero.imageAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 via-slate-800/70 to-slate-900/75"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('hero.heading1')}<br/>{t('hero.heading2')}
          </h1>

          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8"
             style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            {t('hero.subtitle')}
          </p>

          <button
            onClick={goToReports}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 rounded-lg text-base font-semibold transition-all hover:scale-105 shadow-xl cursor-pointer"
            style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <Download className="w-5 h-5" />
            <span>{t('hero.downloadReports')}</span>
          </button>
        </div>
      </section>

      {/* About IMSWG */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-4 block"
                    style={{ color: '#8E3400', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {t('about.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6"
                  style={{ color: '#132552', fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
                {t('about.heading')}
              </h2>
<p className="text-base leading-relaxed mb-6"
                 style={{ color: '#475569', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('about.para1')}
              </p>

              <p className="text-base leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('about.para2')}
              </p>
            </div>

            <div className="relative">
              <img
                src="/imswg2.jpg"
                alt={t('about.imageAlt')}
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>

          {/* Key Information Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3"
                  style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('about.cards.expertNetwork.heading')}</h3>
              <p className="text-sm leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('about.cards.expertNetwork.desc')}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-5">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3"
                  style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('about.cards.regionalFocus.heading')}</h3>
              <p className="text-sm leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('about.cards.regionalFocus.desc')}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-5">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3"
                  style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('about.cards.policyInnovation.heading')}</h3>
              <p className="text-sm leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('about.cards.policyInnovation.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Forum Composition */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest mb-4 block"
                  style={{ color: '#8E3400', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {t('composition.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6"
                style={{ color: '#132552', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
              {t('composition.heading')}
            </h2>
</div>

          <div className="bg-white rounded-2xl p-10 md:p-12 shadow-lg mb-10">
            <p className="text-base leading-relaxed mb-8 text-center"
               style={{ color: '#475569', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              {t('composition.para1')}
            </p>

            <div className="bg-slate-50 rounded-xl p-8 border-l-4 border-slate-900">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🔒</span>
                </div>
                <div>
                  <h4 className="font-bold text-base mb-2"
                      style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('composition.chathamHouse.heading')}</h4>
                  <p className="text-sm leading-relaxed italic"
                     style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    {t('composition.chathamHouse.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forum Activities */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest mb-4 block"
                  style={{ color: '#8E3400', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {t('activities.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6"
                style={{ color: '#132552', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
              {t('activities.heading')}
            </h2>
</div>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4"
                  style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('activities.discussionTopics.heading')}</h3>
              <p className="text-base leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('activities.discussionTopics.desc')}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4"
                  style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('activities.reports.heading')}</h3>
              <p className="text-base leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('activities.reports.desc')}
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/imswg3.jpg"
              alt={t('activities.imageAlt')}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
              <div className="p-10 text-white">
                <p className="text-2xl font-semibold mb-2"
                   style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {t('activities.overlayTitle')}
                </p>
                <p className="text-slate-300"
                   style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {t('activities.overlaySubtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports & Events */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest mb-4 block"
                  style={{ color: '#8E3400', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {t('reportsEvents.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6"
                style={{ color: '#132552', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
              {t('reportsEvents.heading')}
            </h2>
</div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sign Up */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3"
                  style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('reportsEvents.signUp.heading')}</h3>
              <p className="text-sm mb-6 leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('reportsEvents.signUp.desc')}
              </p>
              <button
                onClick={() => navigate('/imswg-signup')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all hover:gap-3 bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <span>{t('reportsEvents.signUp.button')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* 2020-2026 Report */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3"
                  style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('reportsEvents.report.heading')}</h3>
              <p className="text-sm mb-6 leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('reportsEvents.report.desc')}
              </p>
              <button
                onClick={goToReports}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all hover:gap-3 border-2 border-slate-900 text-slate-900 hover:bg-slate-50 cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <span>{t('reportsEvents.report.button')}</span>
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* 2026 Event */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3"
                  style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t('reportsEvents.event.heading')}</h3>
              <p className="text-sm mb-6 leading-relaxed"
                 style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                {t('reportsEvents.event.desc')}
              </p>
              <button
                onClick={() => navigate('/imswg-events')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all hover:gap-3 border-2 border-slate-900 text-slate-900 hover:bg-slate-50 cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <span>{t('reportsEvents.event.button')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('cta.heading')}
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
             style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/imswg-forum-q3')}
              className="px-10 py-4 rounded-xl font-semibold transition-all hover:scale-105 bg-white text-slate-900 shadow-xl cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              {t('cta.register')}
            </button>
            <button
              onClick={goToReports}
              className="px-10 py-4 rounded-xl font-semibold transition-all hover:scale-105 border-2 border-white/30 text-white hover:bg-white/10 cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              {t('cta.download')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default IMSWG;
