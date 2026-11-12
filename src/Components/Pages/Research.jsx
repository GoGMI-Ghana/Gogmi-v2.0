import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container, Button, SectionHeader, PageHero } from '../ui/Editorial';

// One entry per item in research.json `themes.items`, in the same order.
// A theme without a `link` has no detail page yet.
const THEMES = [
  {
    image: '/Marsof operators fastrope on A Dutch naval vessel.jpg',
    alt: 'Special forces operators fast-roping onto a naval vessel',
    link: '/research/maritime-security-audit'
  },
  {
    image: '/gulf-of-guinea-map-1400.jpg',
    alt: 'Map of the Gulf of Guinea coastal states'
  }
];

// Figures shown under the header, in the order of `dashboard.stats`.
const FIGURES = [3, 2000, 12];

const Research = () => {
  const { t, i18n } = useTranslation('research');
  const number = new Intl.NumberFormat(i18n.language);

  const figures = t('dashboard.stats', { returnObjects: true }).map((label, idx) => ({
    label,
    value: number.format(FIGURES[idx])
  }));

  const themes = t('themes.items', { returnObjects: true }).map((item, idx) => ({ ...item, ...THEMES[idx] }));

  return (
    <div className="w-full font-body text-text">
      {/* PAGE HEADER: photograph hero */}
      <PageHero
        image="/researchimage.jpg"
        eyebrow={<Link to="/services" className="focus-ring hover:underline hover:underline-offset-4">{t('breadcrumb')}</Link>}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <Button to="https://www.gulfspectrumjournal.com/" variant="onDark">{t('hero.cta')}</Button>
      </PageHero>

      {/* KEY FIGURES */}
      <section className="border-b border-line bg-paper" aria-label={t('dashboard.title')}>
        <Container>
          <dl className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {figures.map((figure) => (
              <div key={figure.label} className="flex flex-col py-8 sm:px-8 sm:first:pl-0">
                <dt className="mt-2 text-[0.9375rem] text-muted">{figure.label}</dt>
                <dd className="order-first text-[2.75rem] font-bold leading-none tracking-[-0.02em] tabular-nums text-ink">{figure.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* RESEARCH THEMES: two features side by side */}
      <section id="themes" className="scroll-mt-20 bg-white py-20 md:py-28" aria-labelledby="research-themes">
        <Container>
          <SectionHeader id="research-themes" title={t('themes.heading')} intro={t('themes.subtitle')} />

          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
            {themes.map((theme, idx) => (
              <article key={theme.question} className="flex flex-col">
                <img
                  src={theme.image}
                  alt={theme.alt}
                  loading="lazy"
                  className="aspect-[3/2] w-full rounded-[2px] border border-line bg-paper object-cover"
                />
                <p className="mt-6 text-sm font-semibold text-rust">{t('themes.themeLabel', { number: idx + 1 })}</p>
                <h3 className="mt-2 text-[1.625rem] font-bold leading-tight tracking-[-0.015em] text-ink md:text-[1.875rem]">
                  {theme.link ? (
                    <Link to={theme.link} className="focus-ring hover:underline hover:decoration-2 hover:underline-offset-4">{theme.question}</Link>
                  ) : theme.question}
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{theme.description}</p>
                {theme.link && (
                  <Link to={theme.link} className="link-editorial focus-ring mt-6 inline-flex items-center gap-2 self-start font-semibold" tabIndex={-1} aria-hidden="true">
                    <span>{t('themes.learnMore')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Research;
