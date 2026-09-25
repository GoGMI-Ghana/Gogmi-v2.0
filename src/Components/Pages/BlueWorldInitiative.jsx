import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';

const BlueWorldInitiative = () => {
  const { t } = useTranslation('blueWorldInitiative');
  const oceanConcepts = t('concepts.items', { returnObjects: true });

  const partners = [
    'Eden International School',
    'Galaxy',
    'CMTD-YW',
    'Fisheries Commission',
    'Ghana Navy',
    'Canadian High Commission'
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <img 
          src="/BLUE WORLD INITIATIVE.jpg"
          alt={t('hero.imageAlt')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#132552]/90"></div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#8E3400', color: 'white' }}>
                <span className="font-bold text-sm">{t('about.badge')}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
                {t('about.heading')}
              </h2>

              <p className="text-lg leading-relaxed mb-6 font-semibold" style={{ color: '#4B5563' }}>
                {t('about.para1')}
              </p>

              <p className="text-base leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
                {t('about.para2')}
              </p>
            </div>

            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/bwi2.jpg"
                alt={t('about.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DOTCAN Partnership Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('dotcan.heading')}
            </h2>
</div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/DOTCANLOGO.png"
                alt={t('dotcan.logoAlt')}
                className="max-w-md w-full"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#132552', fontWeight: 700 }}>
                {t('dotcan.subheading')}
              </h3>

              <p className="text-base leading-relaxed mb-4 font-semibold" style={{ color: '#4B5563' }}>
                {t('dotcan.para1')}
              </p>

              <p className="text-base leading-relaxed mb-4 font-semibold" style={{ color: '#4B5563' }}>
                {t('dotcan.para2')}
              </p>

              <p className="text-base leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
                {t('dotcan.para3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ocean Career Fair 2023 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('careerFair.heading')}
            </h2>
</div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="bg-white p-8 rounded-xl border-2 border-gray-100 h-full">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552', fontWeight: 700 }}>
                  {t('careerFair.eventHeading')}
                </h3>
                <p className="text-base leading-relaxed mb-4 font-semibold" style={{ color: '#4B5563' }}>
                  {t('careerFair.para1')}
                </p>
                <p className="text-base leading-relaxed mb-6 font-semibold" style={{ color: '#4B5563' }}>
                  {t('careerFair.para2')}
                </p>

                <div className="space-y-3">
                  {t('careerFair.bullets', { returnObjects: true }).map((bullet, idx) => (
                    <p key={idx} className="font-bold" style={{ color: '#132552' }}>• {bullet}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-gray-100">
              <h4 className="text-xl font-bold mb-4" style={{ color: '#132552', fontWeight: 700 }}>
                {t('careerFair.partnersHeading')}
              </h4>
              <div className="space-y-3">
                {partners.map((partner, idx) => (
                  <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: '#F5F7FA' }}>
                    <span className="font-semibold text-sm" style={{ color: '#4B5563' }}>{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/bwi3.jpg"
                alt={t('careerFair.images.img1')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/bwist1.jpg"
                alt={t('careerFair.images.img2')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/bwist2.jpg"
                alt={t('careerFair.images.img3')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ocean Concepts */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('concepts.heading')}
            </h2>
<p className="text-lg max-w-3xl mx-auto font-semibold" style={{ color: '#4B5563' }}>
              {t('concepts.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oceanConcepts.map((concept, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#8E3400] transition-all duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#132552', fontWeight: 700 }}>
                  {concept.title}
                </h3>
                <p className="text-sm leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue Careers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('careers.heading')}
            </h2>
<p className="text-lg max-w-3xl mx-auto font-semibold" style={{ color: '#4B5563' }}>
              {t('careers.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/bwi4.jpg"
                alt={t('careers.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {['scienceResearch', 'maritimeOperations', 'blueEconomy', 'educationPolicy'].map((cat) => (
                <div key={cat} className="bg-white p-6 rounded-xl border-2 border-gray-100">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#132552', fontWeight: 700 }}>
                    {t(`careers.categories.${cat}.heading`)}
                  </h3>
                  <ul className="space-y-2">
                    {t(`careers.categories.${cat}.items`, { returnObjects: true }).map((item, idx) => (
                      <li key={idx} className="text-sm font-semibold" style={{ color: '#4B5563' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border-l-4" style={{ borderColor: '#8E3400' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552', fontWeight: 700 }}>
              {t('careers.funFact.heading')}
            </h3>
            <p className="text-lg leading-relaxed font-semibold mb-4" style={{ color: '#4B5563' }}>
              {t('careers.funFact.para1')}
            </p>
            <p className="text-base leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
              {t('careers.funFact.para2')}
            </p>
          </div>
        </div>
      </section>

      {/* MAN Comic Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/adventuresbwi.jpg"
                alt={t('comic.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#8E3400', color: 'white' }}>
                <span className="font-bold text-sm">{t('comic.badge')}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
                {t('comic.heading')}
              </h2>

              <p className="text-lg leading-relaxed mb-6 font-semibold" style={{ color: '#4B5563' }}>
                {t('comic.para1')}
              </p>

              <p className="text-base leading-relaxed mb-8 font-semibold" style={{ color: '#4B5563' }}>
                {t('comic.para2')}
              </p>

              <div className="space-y-3">
                {t('comic.bullets', { returnObjects: true }).map((bullet, idx) => (
                  <p key={idx} className="font-bold" style={{ color: '#132552' }}>• {bullet}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('gallery.heading')}
            </h2>
</div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/bwist4.jpg"
                alt={t('gallery.img1Alt')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/bwi1.jpg"
                alt={t('gallery.img2Alt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20" style={{ backgroundColor: '#132552' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('resourcesSection.heading')}
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-semibold">
            {t('resourcesSection.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#8E3400' }}>
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#132552', fontWeight: 700 }}>
                {t('resourcesSection.handbook.heading')}
              </h3>
              <p className="text-sm mb-6 font-semibold" style={{ color: '#4B5563' }}>
                {t('resourcesSection.handbook.desc')}
              </p>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/bluecareerfair.handbook.pdf';
                  link.download = 'Blue-Career-Fair-Handbook.pdf';
                  link.click();
                }}
                className="px-8 py-3 rounded-lg font-bold text-white transition-all"
                style={{ backgroundColor: '#8E3400', fontWeight: 700 }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B2700'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8E3400'}
              >
                {t('resourcesSection.handbook.download')}
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#132552' }}>
                <span className="text-white text-2xl font-bold">?</span>
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#132552', fontWeight: 700 }}>
                {t('resourcesSection.getInvolved.heading')}
              </h3>
              <p className="text-sm mb-6 font-semibold" style={{ color: '#4B5563' }}>
                {t('resourcesSection.getInvolved.desc')}
              </p>
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-3 rounded-lg font-bold transition-all border-2"
                style={{ borderColor: '#132552', color: '#132552', fontWeight: 700 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#132552';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#132552';
                }}
              >
                {t('resourcesSection.getInvolved.button')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlueWorldInitiative;
