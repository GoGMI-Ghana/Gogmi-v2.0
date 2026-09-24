import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Globe,
  BookOpen,
  Image as ImageIcon,
  Video,
  Play,
  X
} from 'lucide-react';

const Home = () => {
  const { t } = useTranslation('home');
  // YouTube Video ID
  const youtubeVideoId = 'XgzCbENPQn0';
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Give YouTube enough time to load and start playing before fading in
    const t = setTimeout(() => setVideoReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const eventBanners = [
    {
      id: 1,
      image: '/member.gogmi.jpeg', 
      alt: 'Maritime Membership'
    },

    {
      id: 2,
      image: '/margov-coh2.jpeg',
      alt: 'Maritime gov Course'
    },
    {
      id: 4,
      image: '/partnerbanner.jpeg',
      alt: 'Partner Banner'
    },
  ];

  
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isPaused) return;

    const scrollStep = 1; // Pixels per frame
    const scrollInterval = 20; // Milliseconds per frame

    const autoScroll = setInterval(() => {
      if (scrollContainer && !isPaused) {
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += scrollStep;
        }
      }
    }, scrollInterval);

    return () => clearInterval(autoScroll);
  }, [isPaused]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const festiveOverlays = [
    {
      enabled: true,                          // Turn on/off
      scheduledDate: '2026-09-18',            // When to show (YYYY-MM-DD) - UPDATED TO TODAY
      image: '/gulf-spectrum-flyer.jpeg',        // Image path (upload to /public folder)
      displayDuration: 30,                     // How long to show (seconds)
      name: 'Gulf Spectrum Journal Launch',                  // Internal reference name
      testing: true                           // SET TO TRUE FOR TESTING (bypasses localStorage)
    },
    {
      enabled: false,
      scheduledDate: '2026-04-05',
      image: '/govcourse.jpeg',
      displayDuration: 5,
      name: 'Easter 2026'
    },
    {
      enabled: false,                         // Example: disabled overlay
      scheduledDate: '2024-12-31',
      image: '/newyear-eve-2024.jpg',
      displayDuration: 4,
      name: 'New Year Eve 2024'
    }
    // Add more festive overlays as needed
  ];

  // State for overlay visibility
  const [showFestiveOverlay, setShowFestiveOverlay] = React.useState(false);
  const [activeFestiveImage, setActiveFestiveImage] = React.useState(null);
  const [overlayDuration, setOverlayDuration] = React.useState(5);

  // Check if there's a scheduled overlay for today
  React.useEffect(() => {
    // ============================================================
    // PERMANENT DISPLAY MODE FOR TESTING/REVIEW
    // ============================================================
    // Find the first enabled overlay for permanent display
    const permanentOverlay = festiveOverlays.find(overlay => overlay.enabled);

    if (permanentOverlay) {
      setActiveFestiveImage(permanentOverlay.image);
      setOverlayDuration(permanentOverlay.displayDuration);
      setShowFestiveOverlay(true);

      // Auto-hide after specified duration
      const timer = setTimeout(() => {
        setShowFestiveOverlay(false);
      }, permanentOverlay.displayDuration * 1000);

      return () => clearTimeout(timer);
    }

    /* ============================================================
    // ORIGINAL DATE-BASED LOGIC (USE THIS FOR PRODUCTION)
    // ============================================================
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    // Find if any overlay is scheduled for today
    const todaysOverlay = festiveOverlays.find(
      overlay => overlay.enabled && overlay.scheduledDate === today
    );

    if (todaysOverlay) {
      // Check localStorage to see if user has already seen it today
      const overlaySeenKey = `festive-overlay-seen-${todaysOverlay.scheduledDate}`;
      const hasSeenToday = localStorage.getItem(overlaySeenKey);

      // If testing mode is on, always show the overlay (bypass localStorage)
      if (!hasSeenToday || todaysOverlay.testing) {
        setActiveFestiveImage(todaysOverlay.image);
        setOverlayDuration(todaysOverlay.displayDuration);
        setShowFestiveOverlay(true);

        // Auto-hide after specified duration
        const timer = setTimeout(() => {
          setShowFestiveOverlay(false);
          // Only mark as seen if NOT in testing mode
          if (!todaysOverlay.testing) {
            localStorage.setItem(overlaySeenKey, 'true');
          }
        }, todaysOverlay.displayDuration * 1000);

        return () => clearTimeout(timer);
      }
    }
    */ // END ORIGINAL LOGIC
  }, []);

  // Manual close function (X button)
  const closeFestiveOverlay = () => {
    setShowFestiveOverlay(false);
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`festive-overlay-seen-${today}`, 'true');
  };

  // ============================================================
  // END FESTIVE OVERLAY CONFIGURATION
  // ============================================================

  // Add animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slide-up {
        from { 
          opacity: 0; 
          transform: translateY(20px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      @keyframes float {
        0%, 100% { 
          transform: translateY(0px) translateX(0px); 
        }
        25% { 
          transform: translateY(-20px) translateX(10px); 
        }
        50% { 
          transform: translateY(-10px) translateX(-10px); 
        }
        75% { 
          transform: translateY(-15px) translateX(5px); 
        }
      }
      @keyframes festive-zoom {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      .animate-fade-in {
        animation: fade-in 1s ease-out;
      }
      .animate-slide-up {
        animation: slide-up 1s ease-out;
      }
      .animate-festive-zoom {
        animation: festive-zoom 0.4s ease-out;
      }
      /* Hide YouTube loading spinner and branding */
      iframe[src*="youtube"] {
        opacity: 1;
        transition: opacity 0.3s ease-in;
      }
      .ytp-spinner,
      .ytp-large-play-button,
      .ytp-title,
      .ytp-watermark,
      .ytp-chrome-top,
      .ytp-show-cards-title,
      .ytp-pause-overlay {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
      /* Hide scrollbar for slideshow */
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="w-full overflow-x-hidden scroll-smooth" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* FESTIVE OVERLAY - CENTERED WITH SEMI-TRANSPARENT BACKGROUND */}
      {showFestiveOverlay && activeFestiveImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 animate-fade-in"
          style={{ width: '100vw', height: '100vh' }}
        >
          {/* Close Button */}
          <button
            onClick={closeFestiveOverlay}
            className="absolute top-8 right-8 z-[10000] p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all hover:scale-110 group shadow-2xl"
            aria-label={t('festiveClose')}
          >
            <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform" strokeWidth={2.5} />
          </button>

          {/* Festive Image/Flyer - SMALLER CENTERED (max-w-3xl = 768px) */}
          <div 
            className="relative max-w-3xl w-full mx-4 animate-festive-zoom cursor-pointer"
            onClick={closeFestiveOverlay}
          >
            <img
              src={activeFestiveImage}
              alt="Festive Season Greeting"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* Auto-close timer indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold bg-black/60 px-6 py-3 rounded-full backdrop-blur-md shadow-xl border border-white/20">
            {t('clickToContinue')}
          </div>
        </div>
      )}

      {/* HERO */}
      <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0">
          {/* Fallback Background Image */}
          <div className="absolute inset-0 bg-cover bg-center" 
               style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&fit=crop&q=90)' }}>
          </div>
          
          {/* YouTube Video Overlay */}
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1&fs=0&iv_load_policy=3&start=0&vq=hd720`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',
              minHeight: '100vh',
              minWidth: '177.77vh',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 1,
              border: 'none',
              overflow: 'hidden',
              opacity: videoReady ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
            }}
            allow="autoplay; fullscreen"
            frameBorder="0"
            title="Hero Background Video"
          />
          
          {/* Opacity Overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(19, 37, 82, 0.05), rgba(26, 51, 108, 0.05))', zIndex: 2 }}></div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(19, 37, 82, 0.1), transparent)', zIndex: 2 }}></div>
        </div>

        <div className="relative container mx-auto max-w-6xl px-6 py-20 flex flex-col items-center text-center text-white" style={{ zIndex: 10 }}>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border mb-6 animate-fade-in"
               style={{ backgroundColor: 'rgba(142, 52, 0, 0.2)', borderColor: 'rgba(142, 52, 0, 0.3)', backdropFilter: 'blur(8px)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#8E3400' }}></span>
            <span className="font-semibold text-sm" style={{ color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide-up"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 900 }}>
            {t('hero.titleLine1')}
            <span className="block mt-3 drop-shadow-lg" style={{ color: '#8E3400' }}>
              {t('hero.titleLine2')}
            </span>
          </h1>

          <p className="mt-2 text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed drop-shadow-md" style={{ color: 'rgba(255, 255, 255, 0.95)', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </header>

      {/* ABOUT / WELCOME  */}
      <section className="py-32 md:py-40" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-[1400px] px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Content - 5 columns */}
            <div className="space-y-8 lg:col-span-5">
              <div>
                <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-6" 
                      style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {t('about.eyebrow')}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
                  {t('about.heading')}
                </h2>
</div>

              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {t('about.body')}
                </p>

              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-3 font-bold hover:gap-5 transition-all text-lg mt-8 group"
                style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                <span>{t('about.link')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

      
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[450px] lg:col-span-7 lg:-mt-60">
              <img 
                src="/whoweare.ad.jpg" 
                alt="Maritime professionals at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

     
          
        </div>
      </section>

     {/* SERVICES / WHAT WE DO */}
<section className="py-20 md:py-28 bg-white">
  <div className="container mx-auto max-w-7xl px-6">
    <div className="text-center mb-16">
      <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{t('services.eyebrow')}</span>
      <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
        {t('services.heading')}
      </h2>
      <p className="text-lg max-w-3xl mx-auto" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
        {t('services.subtitle')}
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {t('services.items', { returnObjects: true }).map((service, idx) => {
        const colors = ['#132552', '#8E3400', '#1A336C', '#6B2700', '#132552', '#8E3400'];
        const color = colors[idx % colors.length];
        return { ...service, color };
      }).map((service, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
          style={{ border: '1px solid rgba(19, 37, 82, 0.1)' }}
        >
          {/* Accent bar on top */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ backgroundColor: service.color }}
          ></div>
          
          <h3 className="text-2xl font-bold mb-4" 
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: '#132552' }}>
            {service.title}
          </h3>
          <p className="leading-relaxed text-base" style={{ color: '#374151', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{service.desc}</p>
        </div>
      ))}
    </div>

   
  </div>
</section>

      
      {/* ABOUT THE GULF OF GUINEA - PROFESSIONAL LAYOUT */}
      <section className="py-32 md:py-40 bg-white">
        <div className="container mx-auto max-w-[1400px] px-8">
          <div className="text-center mb-20">
            <span className="font-semibold text-sm uppercase tracking-wider inline-block mb-6" 
                  style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {t('region.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              {t('region.heading')}
            </h2>
</div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Professional Image - 7 columns, on the left */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[800px] order-2 lg:order-1 lg:col-span-7">
              <img 
                src="/MapChart_Map (4).png" 
                alt="Gulf of Guinea maritime view"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content - 5 columns, on the right */}
            <div className="space-y-8 order-1 lg:order-2 lg:col-span-5">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {t('region.para1')}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {t('region.para2')}
                </p>
              </div>

              {/* Countries List */}
              <div className="pt-4">
                <h3 className="text-lg font-bold mb-6" style={{ color: '#132552', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  {t('region.countriesHeading')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Senegal', 'Guinea-Bissau', 'Guinea', 'Sierra Leone', 'Liberia',
                    'Côte d\'Ivoire', 'Ghana', 'Togo', 'Benin', 'Nigeria',
                    'Cameroon', 'Equatorial Guinea', 'Gabon', 'Congo','Gambia',
                    'DR Congo', 'Angola','Cape Verde','São Tomé and Príncipe'
                  ].map((country, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8E3400' }}></span>
                      <span style={{ color: '#4B5563' }}>{t(`countries.${country}`, country)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                     style={{ background: 'linear-gradient(135deg, #F5F7FA 0%, #ffffff 100%)' }}>
                  <div className="text-3xl font-black mb-2"
                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: '#132552' }}>19</div>
                  <p className="font-semibold text-sm" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{t('region.statCountries')}</p>
                </div>
                <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                     style={{ background: 'linear-gradient(135deg, #F5F7FA 0%, #ffffff 100%)' }}>
                  <div className="text-3xl font-black mb-2"
                       style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: '#132552' }}>400M+</div>
                  <p className="font-semibold text-sm" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{t('region.statPeople')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      {/* PARTNERS SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{t('partners.eyebrow')}</span>
            <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              {t('partners.heading')}
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              {t('partners.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
  {[
    { name: 'ENMAR', logo: '/Enmar.png', website: 'https://www.linkedin.com/company/enmar-enhanced-maritime-action-in-the-gulf-of-guinea/' },
    { name: 'DOTCAN', logo: '/DOTCANLOGO.png', website: 'https://dotcan.institute/' },


    { name: 'GREAT MINDS EVENT MANAGEMENT', logo: '/GM-logo.webp', website: 'https://www.ecowas.int/' },
    { name: 'ATLANTIC CENTRE', logo: '/AtlanticCenter.webp', website: 'https://www.defesa.gov.pt/pt/pdefesa/ac/about' },
    { name: 'GHANA NAVY', logo: '/ghananavy.png', website: 'https://navyonline.mil.gh/' },
    { name: 'KAIPTC', logo: '/kaiptc.jpg', website: 'https://www.kaiptc.org/' },
    
   
  ].map((partner, idx) => (
    <a 
      key={idx} 
      href={partner.website} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center p-6 rounded-2xl transition-all duration-500 hover:shadow-xl group cursor-pointer bg-white border border-gray-100"
      style={{ minHeight: '140px' }}
    >
      <div className="text-center w-full">
        {/* Logo Image Container */}
        <div className="flex items-center justify-center h-20 mb-3 px-4">
          <img 
            src={partner.logo} 
            alt={`${partner.name} logo`}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback if image doesn't load
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          {/* Fallback text - hidden by default */}
          <div className="hidden w-full h-20 rounded-xl items-center justify-center text-white font-bold text-sm"
               style={{ background: 'linear-gradient(135deg, #132552 0%, #1A336C 100%)', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {partner.name}
          </div>
        </div>
        <p className="text-xs font-semibold" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{partner.name}</p>
      </div>
    </a>
  ))}
</div>


          <div className="text-center mt-12">
            <Link
              to="/partners"
              className="font-semibold transition-colors inline-flex items-center gap-2"
              style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#6B2700'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8E3400'}
            >
              <span>{t('partners.viewAll')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST NEWS SECTION */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F7FA' }}>
  <div className="container mx-auto max-w-7xl px-6">
    <div className="text-center mb-16">
      <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{t('news.eyebrow')}</span>
      <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
        {t('news.heading')}
      </h2>
      <p className="text-lg max-w-3xl mx-auto" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
        {t('news.subtitle')}
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {t('news.items', { returnObjects: true }).map((newsItem, idx) => {
        const extras = [
          { image: '/admiral-gafcscs.jpeg', link: 'https://www.gogmi.org.gh/blog/gogmi-blog/gogmi-contributes-to-gafcscs-landmark-republic-day-lecture' },
          { image: '/thumbnail.jpeg', link: 'https://www.gogmiconsult.com/post/why-the-ghana-togo-maritime-boundary-delimitation-must-go-for-international-arbitration' },
          { image: '/margov-coh2.jpeg', link: '/services/CapacityBuilding' }
        ];
        return { ...newsItem, ...extras[idx] };
      }).map((news, idx) => (
        <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <div className="relative h-56 overflow-hidden">
            <img 
              src={news.image} 
              alt={news.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{ backgroundColor: '#132552' }}>
                {news.category}
              </span>
            </div>
          </div>
          <div className="p-8">
            <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8E3400' }}></span>
              {news.date}
            </p>
            <h3 className="text-xl font-bold mb-3 transition-colors leading-tight"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: '#132552' }}>
              {news.title}
            </h3>
            <p className="mb-6 text-base leading-relaxed" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>{news.excerpt}</p>
            
            {/*  CONDITIONAL LINK - If news has link property, use it, otherwise go to blog */}
            {news.link ? (
              <Link to={news.link} className="font-semibold flex items-center group-hover:gap-3 transition-all"
                    style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                <span>{t('news.readMore')}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link to="/blog" className="font-semibold flex items-center group-hover:gap-3 transition-all"
                    style={{ color: '#8E3400', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                <span>{t('news.readMore')}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      {/* Optional: View All News button */}
    </div>
  </div>
</section>

     {/* EVENTS BANNER SLIDESHOW */}
<section className="py-20 md:py-28 relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #F5F7FA 0%, #ffffff 50%, #F5F7FA 100%)' }}>
  {/* Subtle decorative elements */}
<div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10"
       style={{ backgroundColor: '#132552' }}></div>
       
  {/* FIXED: Added the missing container div */}
  <div className="container mx-auto max-w-7xl px-6 text-center relative z-10">
    <h2 className="text-5xl md:text-6xl font-black mb-6"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
      {t('events.heading')}
    </h2>
    <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
      {t('events.subtitle')}
    </p>
    
    {/* Horizontal Continuous Autoscroll Slideshow - 2 images at a time */}
    <div 
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2"
        style={{ 
          scrollBehavior: 'auto',
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* banners array*/}
        {[...eventBanners, ...eventBanners].map((banner, index) => (
          <Link
            key={`${banner.id}-${index}`}
            to={banner.link || '#'}
            className="flex-shrink-0 w-[calc(50%-12px)] md:w-[calc(50%-12px)] group"
            onClick={() => setIsPaused(false)} 
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gray-50">
              <img 
                src={banner.image} 
                alt={banner.alt}
                className="w-full h-auto object-contain aspect-auto"
                style={{ maxHeight: '400px' }} // Adjust this value as needed
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x450?text=Event+Banner';
                }}
              />
              {/* Overlay with gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Gradient fade on edges for visual effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F5F7FA] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F5F7FA] to-transparent pointer-events-none"></div>
    </div>
    
    {/* Play/Pause */}
    <div className="mt-6 text-sm font-medium" style={{ color: '#6B7280' }}>
      {isPaused ? '' : ''}
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
