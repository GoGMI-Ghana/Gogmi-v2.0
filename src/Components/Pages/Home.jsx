import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Container, SectionHeader, Button, TextLink, SmartLink } from '../ui/Editorial';

// The hero video is hosted with the site: a 720p file for phones and tablets, 1080p for larger screens.
const HERO_VIDEO_SMALL = '/videos/hero-720.mp4';
const HERO_VIDEO_LARGE = '/videos/hero-1080.mp4';
// The video's first frame, shown until the video is actually playing.
const HERO_POSTER = '/hero-poster.jpg';

const COUNTRIES = [
  'Senegal', 'Gambia', 'Guinea-Bissau', 'Guinea', 'Sierra Leone', 'Liberia', 'Côte d\'Ivoire',
  'Ghana', 'Togo', 'Benin', 'Nigeria', 'Cameroon', 'Equatorial Guinea', 'São Tomé and Príncipe',
  'Gabon', 'Congo', 'DR Congo', 'Angola', 'Cape Verde'
];

const NEWS_EXTRAS = [
  { image: '/admiral-gafcscs.jpeg', link: 'https://www.gogmi.org.gh/blog/gogmi-blog/gogmi-contributes-to-gafcscs-landmark-republic-day-lecture' },
  { image: '/thumbnail.jpeg', link: 'https://www.gogmiconsult.com/post/why-the-ghana-togo-maritime-boundary-delimitation-must-go-for-international-arbitration' },
  { image: '/margov-coh2.jpeg', link: '/services/CapacityBuilding' }
];

const EVENT_BANNERS = [
  { id: 1, image: '/member.gogmi.jpeg', alt: 'GoGMI membership' },
  { id: 2, image: '/margov-coh2.jpeg', alt: 'Maritime Governance Course' },
  { id: 3, image: '/partnerbanner.jpeg', alt: 'GoGMI partners' }
];

const PARTNERS = [
  { name: 'ENMAR', logo: '/Enmar.png', website: 'https://www.linkedin.com/company/enmar-enhanced-maritime-action-in-the-gulf-of-guinea/' },
  { name: 'DOTCAN', logo: '/DOTCANLOGO.png', website: 'https://dotcan.institute/' },
  { name: 'Great Minds Event Management', logo: '/GM-logo.webp', website: 'https://www.ecowas.int/' },
  { name: 'Atlantic Centre', logo: '/AtlanticCenter.webp', website: 'https://www.defesa.gov.pt/pt/pdefesa/ac/about' },
  { name: 'Ghana Navy', logo: '/ghananavy.png', website: 'https://navyonline.mil.gh/' },
  { name: 'KAIPTC', logo: '/kaiptc.jpg', website: 'https://www.kaiptc.org/' }
];

const festiveOverlays = [
  {
    enabled: true,                          // Turn on/off
    scheduledDate: '2026-09-18',            // When to show (YYYY-MM-DD)
    image: '/gulf-spectrum-flyer.jpeg',     // Image path (in /public)
    displayDuration: 30,                    // How long to show (seconds)
    name: 'Gulf Spectrum Journal Launch',   // Internal reference name
    testing: true                           // TRUE bypasses localStorage
  },
  {
    enabled: false,
    scheduledDate: '2026-04-05',
    image: '/govcourse.jpeg',
    displayDuration: 5,
    name: 'Easter 2026'
  },
  {
    enabled: false,
    scheduledDate: '2024-12-31',
    image: '/newyear-eve-2024.jpg',
    displayDuration: 4,
    name: 'New Year Eve 2024'
  }
];

const Home = () => {
  const { t } = useTranslation('home');
  const heroVideoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // React does not reliably set the muted attribute, and browsers only autoplay muted video,
  // so set it directly and start playback. If autoplay is blocked the poster simply stays.
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt && playAttempt.catch) playAttempt.catch(() => {});
  }, []);

  // ============================================================
  // FESTIVE OVERLAY
  // ============================================================
  const [showFestiveOverlay, setShowFestiveOverlay] = useState(false);
  const [activeFestiveImage, setActiveFestiveImage] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // PERMANENT DISPLAY MODE FOR TESTING/REVIEW:
    // shows the first enabled overlay on every visit.
    const permanentOverlay = festiveOverlays.find((overlay) => overlay.enabled);

    if (permanentOverlay) {
      setActiveFestiveImage(permanentOverlay.image);
      setShowFestiveOverlay(true);
      const timer = setTimeout(() => setShowFestiveOverlay(false), permanentOverlay.displayDuration * 1000);
      return () => clearTimeout(timer);
    }

    /* ORIGINAL DATE-BASED LOGIC (USE THIS FOR PRODUCTION)
    const today = new Date().toISOString().split('T')[0];
    const todaysOverlay = festiveOverlays.find((overlay) => overlay.enabled && overlay.scheduledDate === today);
    if (todaysOverlay) {
      const overlaySeenKey = `festive-overlay-seen-${todaysOverlay.scheduledDate}`;
      const hasSeenToday = localStorage.getItem(overlaySeenKey);
      if (!hasSeenToday || todaysOverlay.testing) {
        setActiveFestiveImage(todaysOverlay.image);
        setShowFestiveOverlay(true);
        const timer = setTimeout(() => {
          setShowFestiveOverlay(false);
          if (!todaysOverlay.testing) localStorage.setItem(overlaySeenKey, 'true');
        }, todaysOverlay.displayDuration * 1000);
        return () => clearTimeout(timer);
      }
    }
    */
  }, []);

  const closeFestiveOverlay = () => {
    setShowFestiveOverlay(false);
    const today = new Date().toISOString().split('T')[0];
    try {
      localStorage.setItem(`festive-overlay-seen-${today}`, 'true');
    } catch {
      // Storage can be unavailable (private mode); closing still works.
    }
  };

  // While the overlay is open: focus its close button and let Escape close it.
  useEffect(() => {
    if (!showFestiveOverlay) return;
    closeButtonRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') closeFestiveOverlay(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showFestiveOverlay]);

  const services = t('services.items', { returnObjects: true });
  const news = t('news.items', { returnObjects: true }).map((item, idx) => ({ ...item, ...NEWS_EXTRAS[idx] }));
  const [featured, ...moreNews] = news;

  return (
    <div className="w-full overflow-x-hidden font-body text-text">

      {/* FESTIVE OVERLAY */}
      {showFestiveOverlay && activeFestiveImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-deep/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t('festiveClose')}
          onClick={closeFestiveOverlay}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeFestiveOverlay}
            className="focus-ring absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/60 text-white transition-colors hover:bg-white hover:text-ink"
            aria-label={t('festiveClose')}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <img
            src={activeFestiveImage}
            alt=""
            className="max-h-[85vh] w-auto max-w-3xl rounded-[2px]"
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-on-dark">
            {t('clickToContinue')}
          </p>
        </div>
      )}

      {/* HERO: video with a left-weighted scrim so the headline always stays legible */}
      <header className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink-deep">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={HERO_POSTER}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {!reduceMotion && (
            <video
              ref={heroVideoRef}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              onPlaying={() => setVideoReady(true)}
            >
              <source src={HERO_VIDEO_SMALL} type="video/mp4" media="(max-width: 1024px)" />
              <source src={HERO_VIDEO_LARGE} type="video/mp4" />
            </video>
          )}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(12,25,56,0.88) 0%, rgba(12,25,56,0.62) 45%, rgba(12,25,56,0.15) 100%)' }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'linear-gradient(0deg, rgba(12,25,56,0.6), transparent)' }} />
        </div>

        <Container className="relative pb-20 pt-40 md:pb-28">
          <div className="max-w-3xl">
            <h1 className="heading-display !text-white text-[2.5rem] sm:text-[3.25rem] lg:text-[4.25rem]" style={{ lineHeight: 1.05 }}>
              {t('hero.titleLine1')}{' '}
              <span className="text-sand">{t('hero.titleLine2')}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/resources" variant="onDark">{t('hero.ctaPrimary')}</Button>
              <Button to="/about" variant="outlineOnDark">{t('hero.ctaSecondary')}</Button>
            </div>
          </div>
        </Container>
      </header>

      {/* WHO WE ARE: split heading and lead paragraph, then a wide image */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="home-about">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p className="text-sm font-semibold text-rust">{t('about.eyebrow')}</p>
              <h2 id="home-about" className="heading-display mt-3 text-[2.25rem] md:text-[3rem]">
                {t('about.heading')}
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-9">
              <p className="prose-lead">{t('about.body')}</p>
              <div className="mt-8">
                <TextLink to="/about">{t('about.link')}</TextLink>
              </div>
            </div>
          </div>
          <img
            src="/whoweare-1800.jpg"
            alt="Maritime professionals at work"
            loading="lazy"
            className="mt-14 aspect-[16/9] w-full rounded-[2px] object-cover md:aspect-[21/9]"
          />
        </Container>
      </section>

      {/* WHAT WE DO: a numbered index on a navy band */}
      <section className="bg-ink-deep py-20 text-white md:py-28" aria-labelledby="home-services">
        <Container>
          <SectionHeader
            id="home-services"
            tone="dark"
            title={t('services.heading')}
            intro={t('services.subtitle')}
            action={<TextLink to="/services" className="text-sand">{t('services.link')}</TextLink>}
          />
          <ol className="mt-14 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <li key={service.title} className="border-t border-white/20 pb-10 pt-6">
                <span className="font-display text-lg text-sand" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[1.5rem] font-semibold leading-snug text-white">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-on-dark">{service.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* LATEST NEWS: one featured story and two shorter ones */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="home-news">
        <Container>
          <SectionHeader
            id="home-news"
            title={t('news.heading')}
            intro={t('news.subtitle')}
            action={<TextLink to="/blog">{t('news.viewAll')}</TextLink>}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
            {featured && (
              <article className="group relative lg:col-span-7">
                <img
                  src={featured.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-[2px] object-cover"
                />
                <p className="mt-6 text-sm text-muted">
                  <span className="font-semibold text-rust">{featured.category}</span>
                  <span aria-hidden="true"> · </span>
                  {featured.date}
                </p>
                <h3 className="heading-display mt-3 text-[1.75rem] md:text-[2rem]">
                  <SmartLink to={featured.link} className="focus-ring after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {featured.title}
                  </SmartLink>
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{featured.excerpt}</p>
              </article>
            )}

            <div className="lg:col-span-5">
              {moreNews.map((item) => (
                <article key={item.title} className="group relative grid grid-cols-[1fr_7.5rem] gap-5 border-t border-line py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7">
                  <div>
                    <p className="text-sm text-muted">
                      <span className="font-semibold text-rust">{item.category}</span>
                      <span aria-hidden="true"> · </span>
                      {item.date}
                    </p>
                    <h3 className="mt-2 font-display text-[1.3125rem] font-semibold leading-snug text-ink">
                      <SmartLink to={item.link} className="focus-ring after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                        {item.title}
                      </SmartLink>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">{item.excerpt}</p>
                  </div>
                  <img src={item.image} alt="" loading="lazy" className="aspect-square w-full rounded-[2px] object-cover" />
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* THE REGION: map as a framed figure beside the text and two key figures */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="home-region">
        <Container>
          <SectionHeader id="home-region" title={t('region.heading')} />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <figure className="self-start lg:col-span-6">
              <img
                src="/gulf-of-guinea-map-1400.jpg"
                alt="Map of West and Central Africa highlighting the coastal states of the Gulf of Guinea, from Senegal to Angola"
                loading="lazy"
                className="w-full rounded-[2px] border border-line bg-white"
              />
              <figcaption className="mt-3 text-xs text-muted">Map created with mapchart.net</figcaption>
            </figure>

            <div className="lg:col-span-5 lg:col-start-8">
              <p className="prose-lead">{t('region.para1')}</p>
              <p className="mt-5 leading-relaxed text-muted">{t('region.para2')}</p>

              <dl className="mt-10 grid grid-cols-2 gap-8">
                <div className="flex flex-col border-t-2 border-ink pt-4">
                  <dt className="text-sm text-muted">{t('region.statCountries')}</dt>
                  <dd className="order-first font-display text-[2.75rem] font-semibold leading-none text-ink">19</dd>
                </div>
                <div className="flex flex-col border-t-2 border-ink pt-4">
                  <dt className="text-sm text-muted">{t('region.statPeople')}</dt>
                  <dd className="order-first font-display text-[2.75rem] font-semibold leading-none text-ink">400M+</dd>
                </div>
              </dl>

              <h3 className="mt-10 text-base font-semibold text-ink">{t('region.countriesHeading').replace(/:\s*$/, '')}</h3>
              <ul className="mt-3 columns-2 gap-8 text-[0.9375rem] leading-7 text-muted">
                {COUNTRIES.map((country) => (
                  <li key={country}>{t(`countries.${country}`, country)}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED EVENTS */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="home-events">
        <Container>
          <SectionHeader id="home-events" title={t('events.heading')} intro={t('events.subtitle')} />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_BANNERS.map((banner) => (
              <img
                key={banner.id}
                src={banner.image}
                alt={banner.alt}
                loading="lazy"
                className="aspect-square w-full rounded-[2px] border border-line object-cover"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* PARTNERS: a ruled logo grid */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="home-partners">
        <Container>
          <SectionHeader
            id="home-partners"
            title={t('partners.heading')}
            intro={t('partners.subtitle')}
            action={<TextLink to="/partners">{t('partners.viewAll')}</TextLink>}
          />
          <ul className="mt-14 grid grid-cols-2 border-l border-t border-line md:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="border-b border-r border-line bg-white">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex h-full flex-col items-center justify-center gap-4 px-5 py-8"
                >
                  <img src={partner.logo} alt="" loading="lazy" className="h-16 w-full object-contain" />
                  <span className="text-center text-xs font-semibold text-muted group-hover:text-ink group-hover:underline">
                    {partner.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
};

export default Home;
