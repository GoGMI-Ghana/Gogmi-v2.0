import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, Share2, BookOpen, Users, Target, Check, ChevronDown } from 'lucide-react';

const MaritimeSecurityAudit = () => {
  const { t } = useTranslation('maritimeSecurityAudit');
  const [activePhase, setActivePhase] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const phaseIcons = ['🗺️', '📈', '🎯', '⚙️'];
  const phaseColors = ['#1A5490', '#E67E22', '#5DADE2', '#7CB342'];
  const translatedPhases = t('phases', { returnObjects: true });
  const phases = translatedPhases.map((p, i) => ({ ...p, icon: phaseIcons[i], color: phaseColors[i] }));

  const explorationAreas = t('explorationAreas', { returnObjects: true });

  const outputs = t('outputs', { returnObjects: true });

  const shortTermOutcomes = t('shortTermOutcomes', { returnObjects: true });

  const longTermImpacts = t('longTermImpacts', { returnObjects: true });

  const documentarySources = t('documentarySources', { returnObjects: true });

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/How to Ensure Hassle-Free Crew Transfers at French Ports.jpg"
            alt={t('hero.imageAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#132552]/60 via-[#1A5490]/55 to-[#132552]/60"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(142, 52, 0, 0.1) 0%, transparent 50%)',
          }}></div>
        </div>

        {/* Content */}
        <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 backdrop-blur-md"
               style={{ backgroundColor: 'rgba(142, 52, 0, 0.2)', border: '1px solid rgba(142, 52, 0, 0.3)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#8E3400' }}></span>
            <span className="text-xs font-semibold tracking-widest text-white">{t('hero.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-none"
              style={{ letterSpacing: '-0.03em', fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif' }}>
            {t('hero.titleLine1')}<br/>
            <span style={{ color: '#8E3400' }}>{t('hero.titleLine2')}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed"
             style={{ fontWeight: 400, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base transition-all shadow-xl hover:scale-105"
                    style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B2700'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8E3400'}>
              <Download className="w-5 h-5" />
              <span>{t('hero.downloadReport')}</span>
            </button>
          
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* Background and Rationale */}
     

      {/* Areas of Exploration */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider mb-4 block"
                  style={{ color: '#8E3400', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.15em' }}>
              {t('exploration.label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6"
                style={{ color: '#132552', letterSpacing: '-0.02em', fontFamily: '"SF Pro Display", sans-serif' }}>
              {t('exploration.heading')}
            </h2>
<p className="text-lg max-w-3xl mx-auto" style={{ color: '#4B5563', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
              {t('exploration.intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {explorationAreas.map((area, idx) => (
              <div key={idx} 
                   className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={idx === 0 ? "/AAC starts work on maritime domain awareness constellation.jpg" : 
                         idx === 1 ? "/gggmi.jpg" : 
                         "/Dinoprajapati2003 Author Portfolio _ Freepik.jpg"}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${idx === 0 ? 'bg-gradient-to-br from-slate-700/60 to-slate-900/60' : 
                                   idx === 1 ? 'bg-gradient-to-br from-amber-700/60 to-orange-800/60' : 
                                   'bg-gradient-to-br from-teal-700/60 to-cyan-800/60'}`}></div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black mb-6 leading-tight group-hover:text-[#8E3400] transition-colors"
                      style={{ color: '#132552', fontFamily: '"SF Pro Display", sans-serif', letterSpacing: '-0.01em' }}>
                    {area.title}
                  </h3>
                  <div className="space-y-4">
                    {area.questions.map((question, qIdx) => (
                      <div key={qIdx} className="flex gap-3">
<p className="text-sm leading-relaxed" style={{ color: '#4B5563', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
                          {question}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases of the Audit */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider mb-4 block"
                  style={{ color: '#8E3400', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.15em' }}>
              {t('phasesSection.label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6"
                style={{ color: '#132552', letterSpacing: '-0.02em', fontFamily: '"SF Pro Display", sans-serif' }}>
              {t('phasesSection.heading')}
            </h2>
<p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#4B5563', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
              {t('phasesSection.intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {phases.map((phase, idx) => (
              <div key={idx}
                   className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-l-4"
                   style={{ borderColor: phase.color }}
                   onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-black transition-transform group-hover:scale-110"
                       style={{ backgroundColor: phase.color, fontFamily: '"SF Pro Display", sans-serif' }}>
                    {phase.id.replace('PHASE ', '')}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <span className="text-xs font-bold tracking-wider mb-2 block" 
                            style={{ color: phase.color, fontFamily: 'system-ui, sans-serif', textTransform: 'uppercase' }}>
                        {phase.id}
                      </span>
                      <h3 className="text-xl font-black group-hover:text-[#8E3400] transition-colors" 
                          style={{ color: '#132552', fontFamily: 'system-ui, sans-serif' }}>
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#4B5563', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phase Diagram */}
          <div className="relative p-8 rounded-3xl" style={{ backgroundColor: '#F5F7FA' }}>
            <p className="text-center text-sm font-semibold mb-8" style={{ color: '#4B5563' }}>
              {t('phasesSection.figureCaption')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {phases.map((phase, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black shadow-lg"
                       style={{ backgroundColor: phase.color }}>
                    {phase.id}
                  </div>
                  <p className="text-sm font-bold" style={{ color: '#132552' }}>
                    {phase.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Major Outputs */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#132552' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider mb-4 block"
                  style={{ color: '#8E3400', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.15em' }}>
              {t('outputsSection.label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em', fontFamily: '"SF Pro Display", sans-serif' }}>
              {t('outputsSection.heading')}
            </h2>
<p className="text-lg max-w-3xl mx-auto text-white/80 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
              {t('outputsSection.intro')}
            </p>
          </div>

          <div className="space-y-6">
            {outputs.map((output, idx) => (
              <div key={idx}
                   className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[#8E3400]/50">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-black"
                         style={{ backgroundColor: '#8E3400', fontFamily: '"SF Pro Display", sans-serif' }}>
                      {output.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-4" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.01em' }}>
                      {output.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                      {output.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes & Impacts */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider mb-4 block"
                  style={{ color: '#8E3400', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.15em' }}>
              {t('outcomesSection.label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6"
                style={{ color: '#132552', letterSpacing: '-0.02em', fontFamily: '"SF Pro Display", sans-serif' }}>
              {t('outcomesSection.heading')}
            </h2>
<p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#4B5563', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
              {t('outcomesSection.intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Short-Term Outcomes */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-10 shadow-lg border-l-4 border-indigo-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full -mr-32 -mt-32 opacity-40"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-2"
                    style={{ color: '#4338ca', fontFamily: 'system-ui, sans-serif' }}>
                  {t('outcomesSection.shortTermHeading')}
                </h3>
                <div className="w-16 h-1 rounded-full mb-8" style={{ backgroundColor: '#4338ca' }}></div>
                <div className="space-y-4">
                  {shortTermOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center"
                             style={{ backgroundColor: '#4338ca' }}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="leading-relaxed" style={{ color: '#334155', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Long-Term Impacts */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-10 shadow-lg border-l-4 border-emerald-600 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100 rounded-full -ml-32 -mb-32 opacity-40"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-2"
                    style={{ color: '#059669', fontFamily: 'system-ui, sans-serif' }}>
                  {t('outcomesSection.longTermHeading')}
                </h3>
                <div className="w-16 h-1 rounded-full mb-8" style={{ backgroundColor: '#059669' }}></div>
                <div className="space-y-4">
                  {longTermImpacts.map((impact, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center"
                             style={{ backgroundColor: '#059669' }}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="leading-relaxed" style={{ color: '#334155', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
                        {impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Impact Visualization Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/bossess.jpg"
              alt={t('outcomesSection.impactImageAlt')}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="p-10 text-white">
                <h4 className="text-3xl font-bold mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {t('outcomesSection.impactImageTitle')}
                </h4>
                <p className="text-lg opacity-90" style={{ fontFamily: 'Georgia, serif' }}>
                  {t('outcomesSection.impactImageSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-wider mb-4 block"
                  style={{ color: '#8E3400' }}>
              {t('methodology.label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6"
                style={{ color: '#132552', letterSpacing: '-0.02em' }}>
              {t('methodology.heading')}
            </h2>
<p className="text-lg max-w-3xl mx-auto" style={{ color: '#4B5563', fontWeight: 400 }}>
              {t('methodology.intro')}
            </p>
          </div>

          {/* Methodology Phases Diagram */}
          <div className="space-y-4 mb-16">
            {t('methodology.phaseLabels', { returnObjects: true }).map((phase, idx) => ({
              phase, methods: t('methodology.phaseMethods', { returnObjects: true })[idx]
            })).map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-32 py-4 px-6 rounded-xl flex items-center justify-center font-black text-white"
                     style={{ backgroundColor: idx === 0 ? '#1A5490' : idx === 1 ? '#E67E22' : idx === 2 ? '#5DADE2' : '#7CB342' }}>
                  {item.phase}
                </div>
                <div className="flex-1 flex flex-wrap gap-2 items-center">
                  {item.methods.map((method, mIdx) => (
                    <span key={mIdx} 
                          className="px-4 py-2 rounded-lg text-sm font-semibold bg-white shadow-sm"
                          style={{ color: '#132552' }}>
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Documentary Sources */}
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <h3 className="text-2xl font-black mb-6"
                style={{ color: '#132552' }}>
              {t('methodology.sourcesHeading')}
            </h3>
            <p className="text-base mb-8" style={{ color: '#4B5563', fontWeight: 400 }}>
              {t('methodology.sourcesIntro')}
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {documentarySources.map((source, idx) => (
                <div key={idx} 
                     className="p-4 rounded-xl transition-all hover:scale-105"
                     style={{ backgroundColor: '#F5F7FA' }}>
                  <p className="text-sm font-semibold" style={{ color: '#132552' }}>
                    {source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MaritimeSecurityAudit;


