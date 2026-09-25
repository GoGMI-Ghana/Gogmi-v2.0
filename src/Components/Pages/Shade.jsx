import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, Calendar, Users, Globe, Shield } from 'lucide-react';

const SHADE = () => {
  const { t } = useTranslation('shade');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plenaries = t('plenaries', { returnObjects: true });
  const guestSpeakers = t('guestSpeakers', { returnObjects: true });

  const workingGroupColors = ['#4A90E2', '#27AE60', '#E67E22'];
  const workingGroups = t('workingGroups', { returnObjects: true }).map((wg, idx) => ({
    ...wg,
    color: workingGroupColors[idx]
  }));

  const benefits = t('benefits', { returnObjects: true });

  const targetAudienceColors = ['#132552', '#E74C3C', '#3498DB', '#F39C12'];
  const targetAudience = t('targetAudience', { returnObjects: true }).map((title, idx) => ({
    title,
    color: targetAudienceColors[idx]
  }));

  const vennColors = ['#4A90E2', '#27AE60', '#3498DB', '#95A5A6'];
  const vennGroups = t('fifthPlenary.venn.groups', { returnObjects: true });

  return (
    <div className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Section - Banner Image Only */}
      <section className="relative w-full pt-20">
        <img
          src="/Banner.webp"
          alt={t('hero.imageAlt')}
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Shared Awareness Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          

          <div className="space-y-6 text-lg leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
            
            

          </div>
        </div>
      </section>

      {/* Modus Operandi Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('modusOperandi.heading')}
            </h2>
</div>

          <div className="space-y-6 text-lg leading-relaxed font-semibold mb-12" style={{ color: '#4B5563' }}>
            <p>
              {t('modusOperandi.para1')}
            </p>

            <p>
              {t('modusOperandi.para2')}
            </p>

            <p>
              {t('modusOperandi.para3')}
            </p>
          </div>

          {/* Working Groups */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {workingGroups.map((wg, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: wg.color }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4" style={{ color: '#132552', fontWeight: 900 }}>
                  {wg.title}
                </h3>
                <ul className="space-y-3">
                  {wg.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: wg.color }}></span>
                      <span className="text-base font-semibold" style={{ color: '#4B5563' }}>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quote Box */}
          <div className="text-white p-8 rounded-xl mb-8" style={{ backgroundColor: '#1E3A5F' }}>
            <p className="text-xl font-bold leading-relaxed italic mb-4">
              "{t('modusOperandi.quote.text')}"
            </p>
            <p className="text-right font-semibold">{t('modusOperandi.quote.attribution')}</p>
          </div>
        </div>
      </section>

      {/* Complementarities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('complementarities.heading')}
            </h2>
</div>

          <p className="text-lg leading-relaxed font-semibold mb-12" style={{ color: '#4B5563' }}>
            {t('complementarities.body')}
          </p>

          {/* Past Plenaries */}
          <div className="mb-16">
            <h3 className="text-3xl font-black mb-8" style={{ color: '#132552', fontWeight: 900 }}>
              {t('complementarities.pastPlenaries.heading')}
            </h3>
            <p className="text-lg leading-relaxed font-semibold mb-8" style={{ color: '#4B5563' }}>
              {t('complementarities.pastPlenaries.body')}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead style={{ backgroundColor: '#132552' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-bold">{t('complementarities.pastPlenaries.table.plenary')}</th>
                    <th className="px-6 py-4 text-left text-white font-bold">{t('complementarities.pastPlenaries.table.date')}</th>
                    <th className="px-6 py-4 text-left text-white font-bold">{t('complementarities.pastPlenaries.table.location')}</th>
                  </tr>
                </thead>
                <tbody>
                  {plenaries.map((plenary, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold" style={{ color: '#132552' }}>{plenary.number} {t('complementarities.pastPlenaries.table.plenaryRowLabel')}</td>
                      <td className="px-6 py-4 font-semibold" style={{ color: '#4B5563' }}>{plenary.date}</td>
                      <td className="px-6 py-4 font-semibold" style={{ color: '#4B5563' }}>{plenary.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Plenary Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('fifthPlenary.heading')}
            </h2>
</div>

          <div className="space-y-6 text-lg leading-relaxed font-semibold mb-12" style={{ color: '#4B5563' }}>
            <p>
              {t('fifthPlenary.para1')}
            </p>
          </div>

          {/* Venn Diagram - Stakeholder Groups */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-12">
            <h3 className="text-2xl font-black mb-8 text-center" style={{ color: '#132552', fontWeight: 900 }}>
              {t('fifthPlenary.venn.heading')}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {vennGroups.map((group, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-48 h-48 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: vennColors[idx], color: 'white' }}>
                    <div className="font-bold text-sm px-4">{group}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Recommendations */}
          <div className="space-y-6 text-lg leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
            <p className="font-bold" style={{ color: '#132552' }}>
              {t('fifthPlenary.recommendations.intro1')}
            </p>

            <p>
              {t('fifthPlenary.recommendations.intro2')}
            </p>

            <p className="font-bold" style={{ color: '#132552' }}>
              {t('fifthPlenary.recommendations.lead')}
            </p>

            <ul className="space-y-4 ml-6">
              {t('fifthPlenary.recommendations.items', { returnObjects: true }).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#8E3400' }}></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* IMO Quote Box */}
          <div className="text-white p-8 rounded-xl mt-12 mb-8" style={{ backgroundColor: '#1E3A5F' }}>
            <p className="text-xl font-bold leading-relaxed italic mb-4">
              "{t('fifthPlenary.quote.text')}"
            </p>
            <p className="font-semibold mb-4">
              {t('fifthPlenary.quote.body')}
            </p>
            <p className="text-right font-semibold">
              {t('fifthPlenary.quote.attribution')}
            </p>
          </div>
        </div>
      </section>

      {/* Towards Effective Counter-piracy Responses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('counterPiracy.heading')}
            </h2>
</div>

          <div className="space-y-6 text-lg leading-relaxed font-semibold mb-12" style={{ color: '#4B5563' }}>
            <p>
              {t('counterPiracy.intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-lg border-2" style={{ borderColor: '#132552' }}>
                <div className="text-6xl font-black mb-4" style={{ color: '#8E3400' }}>
                  {idx + 1}
                </div>
                <p className="text-base leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <p className="text-lg leading-relaxed font-semibold mb-8" style={{ color: '#4B5563' }}>
            {t('counterPiracy.closing')}
          </p>

          {/* Testimonial Boxes */}
          <div className="space-y-6">
            {t('counterPiracy.testimonials', { returnObjects: true }).map((testimonial, idx) => (
              <div key={idx} className="text-white p-8 rounded-xl" style={{ backgroundColor: '#1E3A5F' }}>
                <p className="text-xl font-bold leading-relaxed italic mb-4">
                  "{testimonial.text}"
                </p>
                <p className="text-right font-semibold">{testimonial.attribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Photos Gallery */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ color: '#132552', fontWeight: 900 }}>
            {t('gallery.heading')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div key={num} className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
                <img
                  src={`https://images.unsplash.com/photo-${1540575467063 + num}?w=600&fit=crop`}
                  alt={`${t('gallery.imageAlt')} ${num}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inaugural Meeting Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2C5282] rounded-xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-96">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&fit=crop"
                  alt={t('inaugural.eventImageAlt')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/80 to-transparent"></div>
              </div>
              <div className="p-12 text-white">
                <h3 className="text-4xl font-black mb-6" style={{ fontWeight: 900 }}>
                  {t('inaugural.title')}
                </h3>
                <p className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: '#F39C12' }}>
                  {t('inaugural.virtualEvent')}
                </p>
                <div className="mb-6">
                  <p className="text-lg font-bold mb-2">{t('inaugural.overviewLabel')}</p>
                  <p className="text-lg">{t('inaugural.date')}</p>
                  <p className="text-base opacity-90">{t('inaugural.session1')}</p>
                  <p className="text-base opacity-90">{t('inaugural.session2')}</p>
                </div>
                <p className="text-sm italic opacity-80">
                  {t('inaugural.invitationOnly')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg leading-relaxed font-semibold mb-8" style={{ color: '#4B5563' }}>
              {t('inaugural.body')}
            </p>
          </div>
        </div>
      </section>

      {/* Guest Speakers */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-12" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('guestSpeakersSection.heading')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {guestSpeakers.map((speaker, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#132552' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-semibold" style={{ color: '#4B5563' }}>
                  {speaker}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ color: '#132552', fontWeight: 900 }}>
            {t('eventFeatures.heading')}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-black mb-6" style={{ color: '#132552', fontWeight: 900 }}>
                {t('eventFeatures.session1.heading')}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-white p-6 rounded-xl shadow-md">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="font-bold text-sm" style={{ color: '#4B5563' }}>{t('eventFeatures.session1.plenarySession')}</p>
                </div>
                <div className="text-center bg-white p-6 rounded-xl shadow-md">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="font-bold text-sm" style={{ color: '#4B5563' }}>{t('eventFeatures.session1.remarks')}</p>
                </div>
                <div className="text-center bg-white p-6 rounded-xl shadow-md">
                  <div className="text-4xl mb-2">👁️</div>
                  <p className="font-bold text-sm" style={{ color: '#4B5563' }}>{t('eventFeatures.session1.vision')}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black mb-6" style={{ color: '#132552', fontWeight: 900 }}>
                {t('eventFeatures.session2.heading')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-white p-6 rounded-xl shadow-md">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="font-bold text-sm" style={{ color: '#4B5563' }}>{t('eventFeatures.session2.plan')}</p>
                </div>
                <div className="text-center bg-white p-6 rounded-xl shadow-md">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="font-bold text-sm" style={{ color: '#4B5563' }}>{t('eventFeatures.session2.presentations')}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed font-semibold text-center max-w-4xl mx-auto" style={{ color: '#4B5563' }}>
            {t('eventFeatures.body')}
          </p>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ color: '#132552', fontWeight: 900 }}>
            {t('targetAudienceSection.heading')}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {targetAudience.map((audience, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="w-56 h-56 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                  style={{ backgroundColor: audience.color }}
                >
                  <p className="text-white font-bold text-lg px-6">{audience.title}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-lg leading-relaxed font-semibold text-center max-w-4xl mx-auto mt-12" style={{ color: '#4B5563' }}>
            {t('targetAudienceSection.body')}
          </p>
        </div>
      </section>

      {/* Article Section with Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Article Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: '#6B7280', fontWeight: 700 }}>
            {t('article.title')}
          </h2>

          {/* Subtitle */}
          <p className="text-center text-lg mb-8" style={{ color: '#6B7280', fontWeight: 400 }}>
            {t('article.byline')}
          </p>

          {/* Shared Awareness Section Title */}
          <h3 className="text-3xl font-bold text-center mb-8" style={{ color: '#334E68', fontWeight: 700 }}>
            {t('article.subheading')}
          </h3>

          {/* Article Preview Text */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4B5563', fontWeight: 400 }}>
              {t('article.para1')} <a href="https://iccwbo.org/news-publications/news/gulf-of-guinea-remains-worlds-piracy-hotspot-in-2021-according-to-imbs-latest-figures/" className="hover:underline" style={{ color: '#2563EB' }}>{t('article.para1Link')}</a>
            </p>
          </div>

          {/* Download Button */}
          <div className="text-center mb-16">
            <a
              href="/STRENGTHENING COUNTER-PIRACY RESPONSES (1).pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white text-lg font-bold transition-all shadow-lg hover:scale-105"
              style={{ backgroundColor: '#2563EB', fontWeight: 700 }}
            >
              <span>{t('article.downloadButton')}</span>
              <Download className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#F59E0B', fontWeight: 700 }}>
              {t('article.contactHeading')}
            </h3>
            <p className="text-lg" style={{ color: '#6B7280', fontWeight: 400 }}>
              {t('article.contactBody')} <a href="mailto:info@shade.org" className="hover:underline" style={{ color: '#2563EB' }}>info@shade.org</a>
            </p>
          </div>

          {/* Partner Logos */}
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="text-center">
              <img src="/ICC Logo (1).png" alt={t('article.logos.iccAlt')} className="h-24 w-auto object-contain mx-auto mb-2"
                   onError={(e) => { e.target.src = '/icc-logo.png'; }} />
              <p className="text-sm font-semibold" style={{ color: '#334E68' }}>
                {t('article.logos.iccName')}<br />
                {t('article.logos.iccNameEn')}
              </p>
            </div>
            <div className="text-center">
              <img src="/nigeriamaritime.webp" alt={t('article.logos.nimasaAlt')} className="h-24 w-auto object-contain mx-auto mb-2"
                   onError={(e) => { e.target.style.display = 'none'; }} />

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SHADE;