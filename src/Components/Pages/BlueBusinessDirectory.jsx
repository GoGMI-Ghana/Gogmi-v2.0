import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import { Container } from '../ui/Editorial';

/*
  Blue Business Directory, laid out with IBM Carbon patterns: a plain page
  header, a table toolbar (search and category filter), then a data table
  on wide screens and a structured list on small ones.
*/

const CATEGORY_IDS = ['all', 'shipping', 'port', 'security', 'engineering', 'legal', 'energy', 'consulting', 'training'];

const LISTINGS = [
  {
    id: 1,
    name: 'Ghana Ports & Harbours Authority',
    category: 'port',
    country: 'Ghana',
    city: 'Tema',
    phone: '+233 (0) 303 219120',
    email: 'headquarters@ghanaports.gov.gh',
    website: 'https://www.ghanaports.gov.gh/',
    featured: true,
  },
  {
    id: 2,
    name: 'Black Star Line Shipping Co.',
    category: 'shipping',
    country: 'Ghana',
    city: 'Accra',
    phone: '+233 302 666 501',
    email: 'ops@blackstarline.gh',
    website: 'https://www.blackstarline-inc.com/',
    featured: true,
  },
  {
    id: 3,
    name: 'Lomé Container Terminal',
    category: 'port',
    country: 'Togo',
    city: 'Lomé',
    phone: '+228 22 53 70 00',
    email: 'info@lct-togo.com',
    website: 'https://www.lct-togo.com/',
  },
  {
    id: 4,
    name: 'Oceanic Law Partners',
    category: 'legal',
    country: 'Nigeria',
    city: 'Abuja',
    phone: '(+234) 703 207 2040',
    email: 'maritime@oceaniclegal.gh',
    website: 'https://oceaniclp.com/',
  },
];

// "+233 (0) 303 219120" -> "+233303219120" for tel: links.
const telHref = (phone) => `tel:${phone.replace(/\(0\)/g, '').replace(/[^\d+]/g, '')}`;
// "https://www.example.com/" -> "www.example.com"
const displayUrl = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const FeaturedTag = ({ children }) => (
  <span className="inline-flex items-center rounded-[2px] bg-[#F6E4D6] px-2 py-0.5 text-xs font-semibold text-rust-deep">
    {children}
  </span>
);

const ContactLinks = ({ listing, className = '' }) => (
  <ul className={`space-y-1 text-[0.9375rem] ${className}`}>
    <li><a href={telHref(listing.phone)} className="focus-ring text-text hover:text-rust hover:underline">{listing.phone}</a></li>
    <li><a href={`mailto:${listing.email}`} className="focus-ring break-all text-text hover:text-rust hover:underline">{listing.email}</a></li>
    <li>
      <a href={listing.website} target="_blank" rel="noopener noreferrer" className="link-editorial focus-ring break-all">
        {displayUrl(listing.website)}
      </a>
    </li>
  </ul>
);

const BlueBusinessDirectory = () => {
  const { t } = useTranslation('blueBusinessDirectory');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const catLabel = (id) => t(`categories.${id}`);
  const countFor = (id) => (id === 'all' ? LISTINGS.length : LISTINGS.filter((l) => l.category === id).length);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LISTINGS.filter((l) => {
      const matchCat = activeCategory === 'all' || l.category === activeCategory;
      const description = t(`listings.${l.id}.description`);
      const matchSearch = !q ||
        l.name.toLowerCase().includes(q) ||
        description.toLowerCase().includes(q) ||
        t(`categories.${l.category}`).toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q);
      return matchCat && matchSearch;
    }).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [search, activeCategory, t]);

  const hasFilters = search.trim() !== '' || activeCategory !== 'all';
  const clearFilters = () => {
    setSearch('');
    setActiveCategory('all');
  };

  const listMailto = `mailto:info@gogmi.org.gh?subject=${encodeURIComponent(t('listYourBusinessSubject'))}`;

  return (
    <div className="bg-paper font-body text-text">
      {/* Page header */}
      <header className="border-b border-line bg-white">
        <Container className="pb-10 pt-[120px] md:pb-12 md:pt-[150px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-rust">{t('eyebrow')}</p>
              <h1 className="heading-display mt-2 text-[2.5rem] md:text-[3.25rem]">{t('title')}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t('subtitle')}</p>
            </div>
            <a
              href={listMailto}
              className="focus-ring inline-flex items-center gap-2 self-start whitespace-nowrap rounded-[2px] border border-ink px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:bg-ink hover:text-white md:self-auto"
            >
              {t('listCta')}
            </a>
          </div>
        </Container>
      </header>

      <Container className="py-10 md:py-14">
        <div className="border border-line bg-white">
          {/* Table toolbar */}
          <div className="flex flex-col gap-4 border-b border-line p-4 md:flex-row md:items-end md:p-5">
            <div className="flex-1">
              <label htmlFor="directory-search" className="mb-1.5 block text-sm font-semibold text-text">
                {t('searchLabel')}
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  id="directory-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full rounded-[2px] border border-line bg-white py-2.5 pl-9 pr-3 text-[0.9375rem] text-text placeholder:text-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
                />
              </div>
            </div>
            <div className="md:w-72">
              <label htmlFor="directory-category" className="mb-1.5 block text-sm font-semibold text-text">
                {t('categoryLabel')}
              </label>
              <select
                id="directory-category"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full rounded-[2px] border border-line bg-white px-3 py-2.5 text-[0.9375rem] text-text focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
              >
                {CATEGORY_IDS.map((id) => (
                  <option key={id} value={id}>
                    {catLabel(id)} ({countFor(id)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result count and clear */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/60 px-4 py-3 md:px-5">
            <p className="text-sm text-muted" role="status" aria-live="polite">
              {t('resultsCount', { count: filtered.length })}
              {activeCategory !== 'all' && <> · {catLabel(activeCategory)}</>}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-rust hover:text-rust-deep hover:underline"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                {t('clearFilters')}
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <p className="text-lg font-bold text-ink">{t('empty.title')}</p>
              <p className="mt-1 text-muted">{t('empty.subtitle')}</p>
            </div>
          ) : (
            <>
              {/* Data table (wide screens) */}
              <table className="hidden w-full text-left lg:table">
                <caption className="sr-only">{t('title')}</caption>
                <thead className="bg-[#EEF0F5] text-sm text-ink">
                  <tr>
                    <th scope="col" className="w-[42%] px-5 py-3 font-semibold">{t('table.organisation')}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{t('table.category')}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{t('table.location')}</th>
                    <th scope="col" className="px-5 py-3 font-semibold">{t('table.contact')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-t border-line align-top transition-colors hover:bg-paper/60">
                      <th scope="row" className="px-5 py-5 font-normal">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-[1.0625rem] font-bold text-ink">{l.name}</span>
                          {l.featured && <FeaturedTag>{t('featured')}</FeaturedTag>}
                        </span>
                        <span className="mt-1.5 block leading-relaxed text-muted">{t(`listings.${l.id}.description`)}</span>
                      </th>
                      <td className="px-5 py-5 text-text">{catLabel(l.category)}</td>
                      <td className="whitespace-nowrap px-5 py-5 text-text">{l.city}, {l.country}</td>
                      <td className="px-5 py-5"><ContactLinks listing={l} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Structured list (small screens) */}
              <ul className="lg:hidden">
                {filtered.map((l) => (
                  <li key={l.id} className="border-t border-line p-4 first:border-t-0 md:p-5">
                    <h2 className="flex flex-wrap items-center gap-2 font-display">
                      <span className="text-[1.0625rem] font-bold text-ink">{l.name}</span>
                      {l.featured && <FeaturedTag>{t('featured')}</FeaturedTag>}
                    </h2>
                    <p className="mt-1.5 leading-relaxed text-muted">{t(`listings.${l.id}.description`)}</p>
                    <dl className="mt-4 grid gap-x-6 gap-y-3 text-[0.9375rem] sm:grid-cols-2">
                      <div>
                        <dt className="text-sm text-muted">{t('table.category')}</dt>
                        <dd className="text-text">{catLabel(l.category)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted">{t('table.location')}</dt>
                        <dd className="text-text">{l.city}, {l.country}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm text-muted">{t('table.contact')}</dt>
                        <dd><ContactLinks listing={l} /></dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <p className="mt-8 text-muted">
          {t('footerNote')}{' '}
          <a href="mailto:info@gogmi.org.gh" className="link-editorial focus-ring">info@gogmi.org.gh</a>
        </p>
      </Container>
    </div>
  );
};

export default BlueBusinessDirectory;
