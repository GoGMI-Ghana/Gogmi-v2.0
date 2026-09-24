import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ExecutiveChairman = () => {
  const { t } = useTranslation('executiveChairman');
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const LINKEDIN_URL = "https://www.linkedin.com/in/issahyakubu?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BvUTupFDHT0%2BfLwgmexuyaA%3D%3D";
  const ADMIRALS_BLOG_URL = "https://www.gogmiconsult.com/"; 

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F5F7FA' }}>
      
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-100 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#132552]/3 to-[#8E3400]/3"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <p className="text-sm" style={{ color: '#4B5563', fontWeight: 400 }}>
              <span className="hover:text-[#8E3400] transition-colors cursor-pointer" onClick={() => navigate('/')}>{t('breadcrumb.home')}</span>
              <span className="mx-2">/</span>
              <span style={{ color: '#8E3400', fontWeight: 600 }}>{t('breadcrumb.leadership')}</span>
            </p>
          </div>

          {/* Page Title */}
          <div className={`text-center transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
                style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('hero.title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4"
                style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('section.heading')}
            </h2>
          </div>

          {/* Executive Chairman - Featured */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-12">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Image - 4 columns */}
              <div className="lg:col-span-4">
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="aspect-[3/4]">
                    <img 
                      src="/admiral.profille.jpg"
                      alt={t('chairman.imageAlt')}
                      className="w-full h-full object-contain"
                      style={{ objectPosition: 'center center' }}
                    />
                  </div>
                </div>

                {/* Name and Title Container */}
                <div className="mt-4 bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold leading-tight flex-1" 
                        style={{ color: '#132552', fontWeight: 700 }}>
                      Vice Admiral Issah Adam Yakubu (Rtd.)
                    </h3>
                    <img 
                      src="/Flag.png"
                      alt={t('chairman.flagAlt')}
                      className="w-7 h-14 object-contain flex-shrink-0"
                    />
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5F7FA] border border-gray-200">
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#8E3400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-xs font-semibold leading-tight" style={{ color: '#4B5563', fontWeight: 600 }}>
                      {t('chairman.credentials')}
                    </span>
                  </div>
                </div>

                {/* Connect Links */}
                <div className="mt-4 space-y-2">
                  <a 
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#F5F7FA] rounded-lg hover:bg-[#8E3400]/10 border border-gray-100 hover:border-[#8E3400] transition-all text-sm"
                  >
                    <div className="w-8 h-8 bg-[#0077B5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span className="font-semibold" style={{ color: '#132552', fontWeight: 600 }}>LinkedIn</span>
                  </a>

                  <a 
                    href={ADMIRALS_BLOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#F5F7FA] rounded-lg hover:bg-[#8E3400]/10 border border-gray-100 hover:border-[#8E3400] transition-all text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: '#8E3400' }}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-semibold" style={{ color: '#132552', fontWeight: 600 }}>{t('chairman.blog')}</span>
                  </a>
                </div>
              </div>

              {/* Content - 8 columns */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Quote */}
                <div className="bg-[#F5F7FA] rounded-xl p-6 border-l-4" style={{ borderColor: '#8E3400' }}>
                  <p className="text-lg italic leading-relaxed mb-4"
                     style={{ color: '#132552', fontWeight: 400 }}>
                    "{t('chairman.quote')}"
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#8E3400', fontWeight: 600 }}>
                    {t('chairman.quoteAttribution')}
                  </p>
                </div>

                {/* Biography */}
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2"
                      style={{ color: '#132552', fontWeight: 700 }}>
                    <span className="w-1 h-6 rounded-full" style={{ backgroundColor: '#8E3400' }}></span>
                    {t('chairman.aboutHeading')}
                  </h4>

                  <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
                    {t('chairman.bio', { returnObjects: true }).map((paragraph, idx) => (
                      <p key={idx}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Board Members - Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            
            {/* Board Member 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="relative bg-white rounded-1g overflow-hidden shadow-md border border-gray-100 mb-4">
                <div className="aspect-[5/4]">
                  <img
                    src="/lt.amponsah.jpg"
                    alt={t('members.imageAlt')}
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </div>
              </div>

              {/* Name and Title Container */}
              <div className="bg-[#F5F7FA] rounded-lg p-4 border border-gray-200">
                <h3 className="text-base font-bold leading-tight mb-2" 
                    style={{ color: '#132552', fontWeight: 700 }}>
                  Commander Kofi Amponsah Duodu
                </h3>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8E3400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: '#4B5563', fontWeight: 600 }}>
                    {t('members.boardDirector')}
                  </span>
                </div>
              </div>
            </div>

            {/* Board Member 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="relative bg-white rounded-1g overflow-hidden shadow-md border border-gray-100 mb-4">
                <div className="aspect-[5/4]">
                  <img
                    src="/Alberta.jpg"
                    alt={t('members.imageAlt')}
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 10%' }}
                  />
                </div>
              </div>

              {/* Name and Title Container */}
              <div className="bg-[#F5F7FA] rounded-lg p-4 border border-gray-200">
                <h3 className="text-base font-bold leading-tight mb-2" 
                    style={{ color: '#132552', fontWeight: 700 }}>
                  Dr. Alberta Ama Sagoe
                </h3>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8E3400' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: '#4B5563', fontWeight: 600 }}>
                    {t('members.boardDirector')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveChairman;
