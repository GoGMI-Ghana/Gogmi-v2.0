import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download } from 'lucide-react';

const BlueCareerExpo = () => {
  const { t } = useTranslation('blueCareerExpo');
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const eventStats = [
    { number: '10', label: t('stats.labels.workshops') },
    { number: '5', label: t('stats.labels.days') },
    { number: '16', label: t('stats.labels.sessions') },
    { number: '200+', label: t('stats.labels.participants') },
    { number: '6', label: t('stats.labels.hostCountries') }
  ];

  const keyThemes = t('themes', { returnObjects: true });

  const vvips = [
    { name: 'Her Excellency Kati Csaba ', title: t('speakers.titles.1') },
    { name: 'Rear Admiral Issah Yakubu ', title: t('speakers.titles.2') },
    { name: 'Hon. Kathleen Quartey Ayensu ', title: t('speakers.titles.3') },
    { name: 'Dr. Kofi Mbiah', title: t('speakers.titles.4') },

  ];

  const handleDownloadReport = async () => {
    try {
      const response = await fetch('/resources/pdfs/BCBE.pdf');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'BCBE_Report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/resources/pdfs/BCBE.pdf', '_blank');
    }
  };

  return (
    <div className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#132552' }}>
        <div className="absolute inset-0">
          <img 
            src="/bcbe5.jpg"
            alt={t('hero.imageAlt')}
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('hero.title')}
            </h1>
            <p className="text-2xl text-white/90 mb-8 font-semibold max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Program Logo Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center">
              <p className="text-sm font-semibold mb-4" style={{ color: '#4B5563' }}>{t('logos.hostedBy')}</p>
              <div className="w-32 h-32 bg-gray-50 rounded-xl shadow-md border border-gray-200 flex items-center justify-center">
                <img src="/GoGMI_PNG.png" alt="BCBE Logo" className="w-full h-full object-contain p-4" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold mb-4" style={{ color: '#4B5563' }}>{t('logos.inCollaboration')}</p>
              <div className="w-32 h-32 bg-gray-50 rounded-xl shadow-md border border-gray-200 flex items-center justify-center">
                <img src="/wista ghana.jpg" alt="WISTA Ghana" className="w-full h-full object-contain p-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-12" style={{ color: '#132552', fontWeight: 900 }}>
            {t('stats.heading')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {eventStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5F7FA', border: '2px solid #132552' }}>
                  <span className="text-4xl font-black" style={{ color: '#132552', fontWeight: 900 }}>
                    {stat.number}
                  </span>
                </div>
                <p className="text-sm font-bold uppercase tracking-wide" style={{ color: '#4B5563' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20" style={{ backgroundColor: '#132552' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('vision.heading')}
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            {t('vision.body')}
          </p>
        </div>
      </section>

      {/* About the Event with Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
                {t('about.heading')}
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  {t('about.para1')}
                </p>
                <p>
                  {t('about.para2')}
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl border border-gray-200">
              <img src="/bcbe1.jpg" alt={t('images.event')} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Additional Event Images Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl border border-gray-200">
              <img src="/bcbe3.jpg" alt={t('images.moment1')} className="w-full h-full object-cover" />
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl border border-gray-200">
              <img src="/bcbe2.jpg" alt={t('images.moment2')} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl border border-gray-200">
              <img src="/bcbe4.jpg" alt={t('images.highlights')} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-3xl font-black mb-4" style={{ color: '#132552', fontWeight: 900 }}>
                {t('highlights.heading')}
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                {t('highlights.body')}
              </p>
              <button
                onClick={handleDownloadReport}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-md"
                style={{ backgroundColor: '#132552', color: 'white', fontWeight: 700 }}
              >
                <Download className="w-5 h-5" />
                <span>{t('highlights.downloadReport')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Themes */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('themesSection.heading')}
            </h2>
</div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {keyThemes.map((theme, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-xl shadow-md bg-white border-l-4 hover:shadow-lg transition-all"
                style={{ borderColor: '#8E3400' }}
              >
                <p className="text-base font-semibold leading-relaxed" style={{ color: '#132552' }}>
                  {theme}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Impact - Professional Version */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('impact.heading')}
            </h2>
</div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552' }}>
                {t('impact.diverseHeading')}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>
                {t('impact.diverseBody')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {t('impact.cards', { returnObjects: true }).map((card, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-[#8E3400] transition-all">
                  <p className="text-base leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
                    {card}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>
                {t('impact.midParagraph')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {t('impact.numbered', { returnObjects: true }).map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border-2 border-gray-200">
                  <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: '#132552' }}>
                    <span className="text-2xl text-white font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Distinguished Speakers */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('speakers.heading')}
            </h2>
</div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {vvips.map((vip, idx) => (
              <div key={idx} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-5xl font-black" style={{ color: '#132552' }}>
                    {vip.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#132552' }}>
                  {vip.name}
                </h3>
                <p className="text-sm" style={{ color: '#4B5563' }}>
                  {vip.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlueCareerExpo;
