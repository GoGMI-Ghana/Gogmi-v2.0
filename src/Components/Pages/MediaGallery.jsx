import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Play, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Container, PageHero } from '../ui/Editorial';
import { Dialog } from '../ui/Form';

/*
  Media gallery, laid out with Material patterns: tabs with counts and a
  search field in a sticky toolbar, then a different layout per media type
  (image list for photos, 16:9 cards for videos, portrait tiles for
  infographics, a list for press) and a lightbox dialog with previous/next.
*/

const TYPES = ['photos', 'videos', 'infographics', 'press'];
const TAB_IDS = ['all', ...TYPES];

const MEDIA_META = [
  // Photos
  { id: 1, type: 'photos', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&fit=crop', date: 'November 2024', location: 'Accra, Ghana' },
  { id: 2, type: 'photos', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&fit=crop', date: 'October 2024', location: 'Accra, Ghana' },
  { id: 3, type: 'photos', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&fit=crop', date: 'September 2024', location: 'Accra, Ghana' },
  { id: 4, type: 'photos', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&fit=crop', date: 'August 2024', location: 'Lagos, Nigeria' },
  { id: 5, type: 'photos', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&fit=crop', date: 'July 2024', location: 'Dakar, Senegal' },
  { id: 6, type: 'photos', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&fit=crop', date: 'June 2024', location: 'Tema, Ghana' },

  // Videos
  { id: 7, type: 'videos', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&fit=crop', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '5:24', date: 'December 2024' },
  { id: 8, type: 'videos', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&fit=crop', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '12:45', date: 'November 2024' },
  { id: 9, type: 'videos', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&fit=crop', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '8:15', date: 'October 2024' },

  // Infographics
  { id: 10, type: 'infographics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop', date: 'November 2024' },
  { id: 11, type: 'infographics', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop', date: 'October 2024' },
  { id: 12, type: 'infographics', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&fit=crop', date: 'September 2024' },

  // Press
  { id: 13, type: 'press', source: 'Ghana News Agency', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&fit=crop', date: 'November 2024', link: '#' },
  { id: 14, type: 'press', source: 'Business & Financial Times', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&fit=crop', date: 'October 2024', link: '#' },
  { id: 15, type: 'press', source: 'Maritime Executive', image: 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?w=800&fit=crop', date: 'September 2024', link: '#' },
];

const hasLink = (item) => item.link && item.link !== '#';

// Small grey metadata line: "November 2024 · Accra, Ghana"
const Meta = ({ parts }) => (
  <p className="text-sm text-muted">
    {parts.filter(Boolean).map((p, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span aria-hidden="true"> · </span>}
        {p}
      </React.Fragment>
    ))}
  </p>
);

// A thumbnail button that opens the lightbox; the visible title sits below it.
const ThumbButton = ({ item, onOpen, aspect, label, children }) => (
  <button
    type="button"
    onClick={() => onOpen(item)}
    aria-label={label}
    className={`focus-ring group relative block w-full overflow-hidden bg-ink-deep ${aspect}`}
  >
    <img
      src={item.image}
      alt=""
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-85"
    />
    {children}
  </button>
);

const MediaGallery = () => {
  const { t } = useTranslation('mediaGallery');
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);
  const tabRefs = useRef({});

  const itemsText = t('items', { returnObjects: true });
  const items = useMemo(
    () => MEDIA_META.map((m, i) => ({
      ...m,
      title: itemsText[i]?.title || '',
      description: itemsText[i]?.description || '',
    })),
    [itemsText]
  );

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [i.title, i.description, i.location, i.source].some((v) => v && v.toLowerCase().includes(q))
    );
  }, [items, search]);

  const byType = (type) => matches.filter((i) => i.type === type);
  const countFor = (id) => (id === 'all' ? matches.length : byType(id).length);
  const visibleTypes = (tab === 'all' ? TYPES : [tab]).filter((type) => byType(type).length > 0);

  // Lightbox sequence: everything visible that opens in the lightbox (not press).
  const sequence = visibleTypes.filter((type) => type !== 'press').flatMap(byType);
  const openIndex = sequence.findIndex((i) => i.id === openId);
  const current = openIndex >= 0 ? sequence[openIndex] : null;
  const step = (dir) => {
    if (openIndex < 0) return;
    setOpenId(sequence[(openIndex + dir + sequence.length) % sequence.length].id);
  };

  useEffect(() => {
    if (!current) return undefined;
    const onKey = (e) => {
      if (e.target.closest && e.target.closest('iframe')) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const onTabKeyDown = (e) => {
    const i = TAB_IDS.indexOf(tab);
    let next = null;
    if (e.key === 'ArrowRight') next = TAB_IDS[(i + 1) % TAB_IDS.length];
    if (e.key === 'ArrowLeft') next = TAB_IDS[(i - 1 + TAB_IDS.length) % TAB_IDS.length];
    if (e.key === 'Home') next = TAB_IDS[0];
    if (e.key === 'End') next = TAB_IDS[TAB_IDS.length - 1];
    if (next) {
      e.preventDefault();
      setTab(next);
      tabRefs.current[next]?.focus();
    }
  };

  const openItem = (item) => setOpenId(item.id);
  const openLabel = (item) => `${t(item.type === 'videos' ? 'labels.play' : 'labels.view')}: ${item.title}`;

  const sectionHead = (type) => (
    <div className="mb-6 flex items-baseline justify-between gap-4 border-t border-line pt-5">
      <h2 id={`media-${type}`} className="heading-display text-[1.75rem] md:text-[2rem]">
        {t(`categories.${type}`)}{' '}
        <span className="ml-2 align-middle text-base font-semibold tracking-normal text-muted">{byType(type).length}</span>
      </h2>
      {tab === 'all' && (
        <button
          type="button"
          onClick={() => { setTab(type); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="link-editorial focus-ring whitespace-nowrap text-[0.9375rem]"
        >
          {t('labels.seeAll')}
        </button>
      )}
    </div>
  );

  const renderPhotos = () => (
    <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
      {byType('photos').map((item, i) => (
        <li key={item.id} className={i === 0 ? 'col-span-2 lg:row-span-2' : ''}>
          <ThumbButton item={item} onOpen={openItem} label={openLabel(item)} aspect={i === 0 ? 'aspect-[4/3] lg:aspect-auto lg:h-[calc(100%-4.5rem)]' : 'aspect-[4/3]'} />
          <div className="mt-3">
            <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink">{item.title}</h3>
            <Meta parts={[item.date, item.location]} />
          </div>
        </li>
      ))}
    </ul>
  );

  const renderVideos = () => (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {byType('videos').map((item) => (
        <li key={item.id}>
          <ThumbButton item={item} onOpen={openItem} label={openLabel(item)} aspect="aspect-video">
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-deep/85 text-white transition-colors group-hover:bg-rust">
                <Play className="ml-1 h-6 w-6" fill="currentColor" />
              </span>
            </span>
            <span className="absolute bottom-2 right-2 rounded-[2px] bg-ink-deep/90 px-2 py-0.5 text-xs font-semibold text-white">
              {item.duration}
            </span>
          </ThumbButton>
          <div className="mt-3">
            <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink">{item.title}</h3>
            <p className="mt-1 line-clamp-2 text-muted">{item.description}</p>
            <div className="mt-2"><Meta parts={[item.date]} /></div>
          </div>
        </li>
      ))}
    </ul>
  );

  const renderInfographics = () => (
    <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
      {byType('infographics').map((item) => (
        <li key={item.id} className="border border-line bg-white">
          <ThumbButton item={item} onOpen={openItem} label={openLabel(item)} aspect="aspect-[4/5]" />
          <div className="p-4">
            <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink">{item.title}</h3>
            <div className="mt-1"><Meta parts={[item.date]} /></div>
          </div>
        </li>
      ))}
    </ul>
  );

  const renderPress = () => (
    <ul className="border-t border-line">
      {byType('press').map((item) => (
        <li key={item.id} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[10rem_1fr] md:gap-8">
          <img src={item.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover sm:w-40" />
          <div className="min-w-0">
            <p className="text-sm">
              <span className="font-semibold text-rust">{item.source}</span>
              <span className="text-muted"> · {item.date}</span>
            </p>
            <h3 className="mt-1 font-display text-xl font-bold leading-snug text-ink">
              {hasLink(item) ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="focus-ring hover:text-rust hover:underline">
                  {item.title}
                </a>
              ) : item.title}
            </h3>
            <p className="mt-2 max-w-3xl leading-relaxed text-muted">{item.description}</p>
            {hasLink(item) && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-editorial focus-ring mt-3 inline-flex items-center gap-1.5">
                {t('labels.readArticle')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  const renderers = { photos: renderPhotos, videos: renderVideos, infographics: renderInfographics, press: renderPress };

  return (
    <div className="w-full bg-white font-body text-text">
      <PageHero
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&fit=crop&q=90"
        eyebrow={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      {/* Toolbar: tabs and search */}
      <div className="sticky top-[61px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <Container>
          <div className="flex flex-col-reverse gap-3 pt-4 lg:flex-row lg:items-end lg:justify-between lg:pt-0">
            <div
              role="tablist"
              aria-label={t('labels.tabs')}
              onKeyDown={onTabKeyDown}
              className="-mx-6 flex overflow-x-auto px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TAB_IDS.map((id) => {
                const selected = tab === id;
                return (
                  <button
                    key={id}
                    ref={(el) => { tabRefs.current[id] = el; }}
                    id={`media-tab-${id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="media-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(id)}
                    className={`focus-ring flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-4 text-[0.9375rem] font-semibold transition-colors first:pl-0 ${
                      selected ? 'border-rust text-ink' : 'border-transparent text-muted hover:text-ink'
                    }`}
                  >
                    {t(`categories.${id}`)}{' '}
                    <span className={`rounded-full px-2 py-0.5 text-xs ${selected ? 'bg-ink text-white' : 'bg-paper text-muted'}`}>
                      {countFor(id)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:mb-2.5 lg:w-80">
              <label htmlFor="media-search" className="sr-only">{t('labels.searchLabel')}</label>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                id="media-search"
                type="search"
                placeholder={t('search.placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-[2px] border border-line bg-white py-2.5 pl-9 pr-3 text-[0.9375rem] text-text placeholder:text-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Panel */}
      <section id="media-panel" role="tabpanel" aria-labelledby={`media-tab-${tab}`} className="py-12 md:py-16">
        <Container>
          <p className="sr-only" role="status" aria-live="polite">{t('labels.resultsCount', { count: countFor(tab) })}</p>
          {visibleTypes.length === 0 ? (
            <p className="border-t border-line py-16 text-center text-lg text-muted">{t('noResults')}</p>
          ) : (
            <div className="space-y-16 md:space-y-20">
              {visibleTypes.map((type) => (
                <section key={type} aria-labelledby={`media-${type}`}>
                  {sectionHead(type)}
                  {renderers[type]()}
                </section>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Closing band */}
      <section className="bg-ink py-16 text-white md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h2 className="heading-display !text-white text-[2rem] md:text-[2.75rem]">{t('cta.title')}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-dark">{t('cta.subtitle')}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href={`mailto:info@gogmi.org.gh?subject=${encodeURIComponent(t('cta.subject'))}`}
                className="focus-ring inline-flex items-center gap-2 rounded-[2px] border border-white bg-white px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:border-sand hover:bg-sand"
              >
                {t('cta.button')}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      {current && (
        <Dialog onClose={() => setOpenId(null)} labelledBy="media-dialog-title" closeLabel={t('labels.close')} className="max-w-6xl overflow-hidden">
          <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="flex items-center justify-center bg-ink-deep">
              {current.type === 'videos' ? (
                <div className="aspect-video w-full">
                  <iframe
                    key={current.id}
                    src={current.videoUrl}
                    title={current.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img src={current.image} alt={current.title} className="max-h-[70vh] w-full object-contain" />
              )}
            </div>

            <div className="flex flex-col p-6 pr-14 md:p-8 md:pr-16">
              <p className="text-sm font-semibold text-rust">{t(`categories.${current.type}`)}</p>
              <h2 id="media-dialog-title" className="heading-display mt-2 text-[1.75rem] leading-tight md:text-[2rem]">{current.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{current.description}</p>

              <dl className="mt-6 border-t border-line text-[0.9375rem]">
                {[
                  ['date', current.date],
                  ['location', current.location],
                  ['duration', current.duration],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-line py-2.5">
                    <dt className="text-muted">{t(`labels.${k}`)}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              {current.type !== 'videos' && (
                <a href={current.image} target="_blank" rel="noopener noreferrer" className="link-editorial focus-ring mt-5 inline-flex items-center gap-1.5 self-start">
                  {t('labels.viewFull')}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}

              {sequence.length > 1 && (
                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="focus-ring inline-flex items-center gap-1 rounded-[2px] border border-line px-3 py-2 text-sm font-semibold text-ink hover:border-ink"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    {t('labels.previous')}
                  </button>
                  <span className="text-sm text-muted">
                    {t('labels.counter', { current: openIndex + 1, total: sequence.length })}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="focus-ring inline-flex items-center gap-1 rounded-[2px] border border-line px-3 py-2 text-sm font-semibold text-ink hover:border-ink"
                  >
                    {t('labels.next')}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default MediaGallery;
