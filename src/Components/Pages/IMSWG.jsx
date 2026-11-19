import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { Container, PageHero, SectionHeader, Button, TextLink } from '../ui/Editorial';

/*
  IMSWG overview in the editorial style: photo hero, an about section with
  three ruled key points, the forum composition as a statement on dark with
  the Chatham House Rule set apart, numbered activities above a captioned
  photograph, three "get involved" tiles and a closing band.
*/

const REPORTS_URL = '/resources?subcategory=IMSWG+Reports#internal-reports';

const IMSWG = () => {
  const { t } = useTranslation('imswg');

  const keyPoints = ['expertNetwork', 'regionalFocus', 'policyInnovation'];
  const activities = ['discussionTopics', 'reports'];
  const involve = [
    { key: 'signUp', to: '/imswg-signup' },
    { key: 'report', to: REPORTS_URL },
    { key: 'event', to: '/imswg-events' },
  ];

  return (
    <div className="w-full bg-white font-body text-text">
      <PageHero
        image="/imswg4.jpg"
        alt={t('hero.imageAlt')}
        position="62% 35%"
        eyebrow="IMSWG"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <Button to={REPORTS_URL} variant="onDark">
          <Download className="h-4 w-4" aria-hidden="true" />
          {t('hero.downloadReports')}
        </Button>
        <Button to="/imswg-signup" variant="outlineOnDark">
          {t('reportsEvents.signUp.button')}
        </Button>
      </PageHero>

      {/* About */}
      <section aria-labelledby="imswg-about" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="text-sm font-semibold text-rust">{t('about.eyebrow')}</p>
              <h2 id="imswg-about" className="heading-display mt-2 text-[2rem] md:text-[2.5rem]">{t('about.heading')}</h2>
              <p className="prose-lead mt-6">{t('about.para1')}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t('about.para2')}</p>
            </div>
            <figure className="lg:col-span-6">
              {/* Cropped from the top so the phone-camera watermark at the bottom left stays out of view. */}
              <img src="/imswg2.jpg" alt={t('about.imageAlt')} loading="lazy" className="aspect-[3/2] w-full object-cover object-top" />
            </figure>
          </div>

          <ul className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
            {keyPoints.map((key) => (
              <li key={key} className="border-t-2 border-ink pt-5">
                <h3 className="font-display text-[1.25rem] font-bold text-ink">{t(`about.cards.${key}.heading`)}</h3>
                <p className="mt-2 leading-relaxed text-muted">{t(`about.cards.${key}.desc`)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Composition */}
      <section aria-labelledby="imswg-composition" className="bg-ink-deep py-16 text-white md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold text-sand">{t('composition.eyebrow')}</p>
              <h2 id="imswg-composition" className="heading-display mt-2 !text-white text-[2rem] md:text-[2.5rem]">{t('composition.heading')}</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[1.25rem] leading-relaxed text-white/90 md:text-[1.375rem]">{t('composition.para1')}</p>
              <aside className="mt-10 border-l-4 border-sand pl-6">
                <h3 className="font-display text-[1.25rem] font-bold text-white">{t('composition.chathamHouse.heading')}</h3>
                <p className="mt-2 leading-relaxed text-on-dark">{t('composition.chathamHouse.desc')}</p>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      {/* Activities */}
      <section aria-labelledby="imswg-activities" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="imswg-activities" title={t('activities.heading')} />
          <ol className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
            {activities.map((key, i) => (
              <li key={key} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-display text-[2.5rem] font-bold leading-none text-rust" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-[1.375rem] font-bold text-ink">{t(`activities.${key}.heading`)}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-muted">{t(`activities.${key}.desc`)}</p>
                </div>
              </li>
            ))}
          </ol>

          <figure className="mt-14 md:mt-20">
            <img src="/imswg3.jpg" alt={t('activities.imageAlt')} loading="lazy" className="aspect-[16/9] w-full object-cover md:aspect-[21/9]" />
            <figcaption className="mt-4 grid gap-1 border-l-2 border-rust pl-4 md:max-w-3xl">
              <span className="font-semibold text-ink">{t('activities.overlayTitle')}</span>
              <span className="text-muted">{t('activities.overlaySubtitle')}</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Get involved */}
      <section aria-labelledby="imswg-involved" className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="imswg-involved" title={t('reportsEvents.heading')} />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {involve.map(({ key, to }) => (
              <li key={key} className="flex flex-col border border-line bg-white p-6 md:p-7">
                <h3 className="font-display text-[1.375rem] font-bold text-ink">{t(`reportsEvents.${key}.heading`)}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{t(`reportsEvents.${key}.desc`)}</p>
                <TextLink to={to} className="mt-6">{t(`reportsEvents.${key}.button`)}</TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Closing band */}
      <section className="bg-ink py-16 text-white md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h2 className="heading-display !text-white text-[2rem] md:text-[2.75rem]">{t('cta.heading')}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-dark">{t('cta.subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
              <Button to="/imswg-forum-q3" variant="onDark">{t('cta.register')}</Button>
              <Button to={REPORTS_URL} variant="outlineOnDark">{t('cta.download')}</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default IMSWG;
