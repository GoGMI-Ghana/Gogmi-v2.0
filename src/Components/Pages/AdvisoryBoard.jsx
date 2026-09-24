import React from 'react';
import { useTranslation } from 'react-i18next';

const advisoryBoardMembersMeta = [
  {
    name: 'Mrs. Kathleen Quartey Ayensu, ESQ',
    img: '/kathleen.jpg',
    flagImg: '/Ghana Flag.jpg',
  },
  {
    name: 'Rear Admiral Solomon Agada (RTD)',
    img: '/solomon.jpg',
    flagImg: '/Nigeria flag.jpg',
  },
  {
    name: 'Prof. Jeffrey Landsman',
    img: '/jeffrey.jpg',
    flagImg: '/usa flag.jpg',
  },
  {
    name: 'Commodore James Osei Kontoh (RTD)',
    img: '/jamesO.jpg',
    flagImg: '/Ghana Flag.jpg',
  },
];

const AdvisoryBoard = () => {
  const { t } = useTranslation('advisoryBoard');
  const imageFallback = t('grid.imageFallback');
  const advisoryBoardMembers = t('grid.members', { returnObjects: true }).map((item, idx) => ({
    ...item,
    ...advisoryBoardMembersMeta[idx],
  }));

  return (
    <div className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&fit=crop" 
            alt="Advisory Board"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#132552]/90 to-[#132552]/75"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 600 }}>
            {t('hero.badge')}
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6"
              style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Advisory Board Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4"
                style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('section.heading')}
            </h2>
</div>

          {/* Air Vice Marshal - Full Featured Profile */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-12">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4">
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="aspect-[3/4] relative">
                    <img
                      src="/frank.jpg"
                      alt={t('chair.imageAlt')}
                      className="w-full h-full object-cover object-center"
                      style={{ objectPosition: 'center 20%' }}
                    />

                    {/* Flag Image - Bottom Right */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-10">
                      <img
                        src="/Ghana Flag.jpg"
                        alt={t('chair.flagAlt')}
                        className="w-12 h-8 object-cover rounded"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent p-4 pr-20">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold leading-tight flex-1"
                              style={{ color: '#132552', fontWeight: 700 }}>
                            Air Vice Marshal Frank Hanson (Rtd.)
                          </h3>
                        </div>

                        <p className="text-xs leading-tight mb-2" style={{ fontWeight: 400, color: '#4B5563' }}>
                          {t('chair.role')}
                        </p>

                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 w-fit">
                          <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8E3400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span className="text-xs font-semibold leading-tight" style={{ color: '#4B5563', fontWeight: 600 }}>
                            {t('chair.badge')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2"
                      style={{ color: '#132552', fontWeight: 700 }}>
                    <span className="w-1 h-6 rounded-full" style={{ backgroundColor: '#8E3400' }}></span>
                    {t('chair.aboutHeading')}
                  </h4>

                  <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
                    {t('chair.bio', { returnObjects: true }).map((paragraph, idx) => (
                      <p key={idx}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Advisory Board Members - Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {advisoryBoardMembers.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-xl bg-white aspect-[3/4] shadow-lg hover:shadow-xl transition-all duration-300 mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm"><span>${imageFallback}</span></div>`;
                    }}
                  />

                  {/* Flag Image - Bottom Right */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                    <img
                      src={member.flagImg}
                      alt={member.flagAlt}
                      className="w-10 h-7 object-cover rounded"
                    />
                  </div>
                </div>

                {/* Text Content - Below Image */}
                <div>
                  <h3 className="text-sm font-bold mb-1.5 leading-tight"
                      style={{ fontWeight: 700, color: '#132552' }}>
                    {member.name}
                  </h3>
                  <p className="text-xs leading-tight" style={{ fontWeight: 400, color: '#4B5563' }}>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvisoryBoard;
