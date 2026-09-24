import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation('about');
  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="public\aboutus.enoch.jpg"
            alt="Maritime vessel in the Gulf of Guinea"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#132552]/90 to-[#132552]/70"></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
              style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
             style={{ fontWeight: 400 }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 md:py-40" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-[1400px] px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="space-y-8 lg:col-span-6">
              <div>
                <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-6" 
                      style={{ color: '#8E3400', fontWeight: 600 }}>
                  {t('story.eyebrow')}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8"
                    style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
                  {t('story.heading')}
                </h2>
</div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
                 {t('story.para1')}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
                {t('story.para2')}
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[550px] lg:col-span-6">
              <img 
                src="/fav11.jpg" 
                alt="Maritime operations in the Gulf of Guinea"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Business Model */}
      <section className="py-24 bg-white">
     <div className="space-y-16">
  {/* VISION */}
  <div className="text-center">
    <div className="flex items-center justify-center gap-6 mb-6">
      <h3 className="text-3xl font-bold" style={{ color: '#132552', fontWeight: 700 }}>
        {t('vision.heading')}
      </h3>
      <div style={{ color: '#8E3400' }}>
        <Eye className="w-16 h-16" />
      </div>
    </div>
    <p className="text-lg leading-relaxed max-w-4xl mx-auto" style={{ color: '#4B5563', fontWeight: 400 }}>
      {t('vision.body')}
    </p>
  </div>

  {/* MISSION */}
  <div className="text-center">
    <div className="flex items-center justify-center gap-6 mb-6">
      <h3 className="text-3xl font-bold" style={{ color: '#132552', fontWeight: 700 }}>
        {t('mission.heading')}
      </h3>
      <div style={{ color: '#8E3400' }}>
        <Target className="w-16 h-16" />
      </div>
    </div>
    <p className="text-lg leading-relaxed max-w-4xl mx-auto" style={{ color: '#4B5563', fontWeight: 400 }}>
      {t('mission.body')}
    </p>
  </div>

  {/* BUSINESS MODEL */}
  <div className="text-center">
    <div className="flex items-center justify-center gap-6 mb-6">
      <h3 className="text-3xl font-bold" style={{ color: '#132552', fontWeight: 700 }}>
        {t('businessModel.heading')}
      </h3>
      <div style={{ color: '#8E3400' }}>
        <Heart className="w-16 h-16" />
      </div>
    </div>
    <p className="text-lg leading-relaxed max-w-4xl mx-auto" style={{ color: '#4B5563', fontWeight: 400 }}>
      {t('businessModel.body')}
    </p>
  </div>
</div>
      </section>

      {/* SDG Section */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-4" 
                  style={{ color: '#8E3400', fontWeight: 600, letterSpacing: '0.1em' }}>
              {t('sdg.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mt-4 mb-6"
                style={{ fontWeight: 900, letterSpacing: '-0.02em', lineHeight: '1.1', color: '#132552' }}>
              {t('sdg.headingLine1')}<br />{t('sdg.headingLine2')}
            </h2>
<p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
               style={{ color: '#4B5563', fontWeight: 400 }}>
              {t('sdg.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t('sdg.items', { returnObjects: true }).map((sdg, idx) => {
              const meta = [
                { number: '14', bgColor: '#1F8DD6' },
                { number: '8', bgColor: '#A21942' },
                { number: '4', bgColor: '#C5192D' },
                { number: '13', bgColor: '#3F7E44' },
                { number: '16', bgColor: '#00689D' },
                { number: '17', bgColor: '#19486A' }
              ];
              return { ...sdg, ...meta[idx] };
            }).map((sdg, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                <div className="h-2" style={{ backgroundColor: sdg.bgColor }}></div>
                <div className="p-8">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl text-white font-black text-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: sdg.bgColor, fontWeight: 900 }}>
                      {sdg.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontWeight: 700, lineHeight: '1.3', color: '#132552' }}>
                    {sdg.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ fontWeight: 400, color: '#4B5563' }}>
                    {sdg.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
                 style={{ backgroundColor: '#fef3e2', border: '2px solid #8E3400' }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8E3400' }}></span>
              <span className="font-semibold text-base" style={{ color: '#8E3400', fontWeight: 600 }}>
                {t('sdg.footer')}
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;