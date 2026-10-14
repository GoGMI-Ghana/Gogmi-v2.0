import React from 'react';
import { Target, Eye, Users, BookOpen, Share2, Globe, ArrowRight } from 'lucide-react';

// Official UN colours for the goals the Institute's work supports, in the order listed in about.json.
const SDG_META = [
  { number: '14', color: '#0A97D9' },
  { number: '8', color: '#A21942' },
  { number: '4', color: '#C5192D' },
  { number: '13', color: '#3F7E44' },
  { number: '16', color: '#00689D' },
  { number: '17', color: '#19486A' }
];

const CYCLE_ICONS = [Users, BookOpen, Share2, Globe];
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation('about');
  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/aboutus.enoch.jpg"
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

      {/* Vision & Mission */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mb-14">
            <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-4"
                  style={{ color: '#8E3400', fontWeight: 600, letterSpacing: '0.1em' }}>
              {t('purpose.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              {t('purpose.heading')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Vision */}
            <article className="lg:col-span-2 rounded-2xl p-10 md:p-12 flex flex-col relative overflow-hidden"
                     style={{ backgroundColor: '#132552' }}>
              <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full opacity-10"
                   style={{ backgroundColor: '#8E3400' }} aria-hidden="true"></div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-8"
                   style={{ backgroundColor: 'rgba(142, 52, 0, 0.9)' }}>
                <Eye className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-sm uppercase tracking-wider mb-5 text-white/70" style={{ fontWeight: 700, letterSpacing: '0.1em' }}>
                {t('vision.heading')}
              </h3>
              <p className="relative text-2xl md:text-3xl leading-snug text-white" style={{ fontWeight: 600 }}>
                {t('vision.body')}
              </p>
            </article>

            {/* Mission */}
            <article className="lg:col-span-3 rounded-2xl p-10 md:p-12 flex flex-col"
                     style={{ backgroundColor: '#F5F7FA', borderTop: '4px solid #8E3400' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-8"
                   style={{ backgroundColor: '#132552' }}>
                <Target className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-sm uppercase tracking-wider mb-5" style={{ color: '#8E3400', fontWeight: 700, letterSpacing: '0.1em' }}>
                {t('mission.heading')}
              </h3>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#374151', fontWeight: 400 }}>
                {t('mission.body')}
              </p>
              <div className="mt-auto pt-6 border-t border-gray-200">
                <p className="text-xs uppercase tracking-wider mb-3" style={{ color: '#6B7280', fontWeight: 700, letterSpacing: '0.1em' }}>
                  {t('mission.valuesLabel')}
                </p>
                <ul className="flex flex-wrap gap-3">
                  {t('mission.values', { returnObjects: true }).map((value) => (
                    <li key={value} className="px-4 py-2 rounded-full text-sm bg-white"
                        style={{ color: '#132552', fontWeight: 600, border: '1px solid #D1D5DB' }}>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            <div className="lg:col-span-5">
              <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-4"
                    style={{ color: '#8E3400', fontWeight: 600, letterSpacing: '0.1em' }}>
                {t('businessModel.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight"
                  style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
                {t('businessModel.heading')}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
                {t('businessModel.body')}
              </p>
            </div>
          </div>

          <h3 className="text-sm uppercase tracking-wider mb-6" style={{ color: '#132552', fontWeight: 700, letterSpacing: '0.1em' }}>
            {t('businessModel.cycleHeading')}
          </h3>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t('businessModel.steps', { returnObjects: true }).map((step, idx, steps) => {
              const Icon = CYCLE_ICONS[idx];
              return (
                <li key={step.title} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#132552' }}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-3xl font-black" style={{ color: '#E5E7EB', fontWeight: 900 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: '#132552', fontWeight: 700 }}>{step.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>{step.desc}</p>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-5 w-8 h-8 -translate-y-1/2 rounded-full items-center justify-center z-10"
                         style={{ backgroundColor: '#8E3400' }} aria-hidden="true">
                      <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-4"
                    style={{ color: '#8E3400', fontWeight: 600, letterSpacing: '0.1em' }}>
                {t('sdg.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight"
                  style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
                {t('sdg.headingLine1')} {t('sdg.headingLine2')}
              </h2>
            </div>
            <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
              {t('sdg.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-gray-200"
               style={{ backgroundColor: '#E5E7EB' }}>
            {t('sdg.items', { returnObjects: true }).map((sdg, idx) => {
              const meta = SDG_META[idx];
              return (
                <div key={meta.number} className="bg-white p-8 flex gap-5 transition-colors duration-200 hover:bg-gray-50">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white"
                       style={{ backgroundColor: meta.color }}>
                    <span className="text-[10px] uppercase tracking-wider leading-none" style={{ fontWeight: 700 }}>SDG</span>
                    <span className="text-2xl leading-none mt-1" style={{ fontWeight: 900 }}>{meta.number}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ fontWeight: 700, lineHeight: '1.3', color: '#132552' }}>
                      {sdg.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ fontWeight: 400, color: '#4B5563' }}>
                      {sdg.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;