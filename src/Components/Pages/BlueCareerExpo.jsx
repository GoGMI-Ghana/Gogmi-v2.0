import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { Container, PageHero, SectionHeader } from '../ui/Editorial';

/*
  Blue Career & Business Expo 2021 in the editorial style: photo hero with
  the report download, a hosts strip, the vision as a statement on dark,
  the story beside photographs, themes as a ruled two-column list, impact as
  prose with ruled points, and the speakers as a plain ruled list.
*/

const REPORT_URL = '/resources/pdfs/BCBE.pdf';

const SPEAKERS = [
  'Her Excellency Kati Csaba',
  'Rear Admiral Issah Yakubu',
  'Hon. Kathleen Quartey Ayensu',
  'Dr. Kofi Mbiah',
];

const downloadClass = 'focus-ring inline-flex items-center gap-2 rounded-[2px] border px-5 py-3 font-body text-[0.9375rem] font-semibold transition-colors duration-150';

const BlueCareerExpo = () => {
  const { t } = useTranslation('blueCareerExpo');
  const list = (key) => t(key, { returnObjects: true });

  const reportLink = (variant) => (
    <a
      href={REPORT_URL}
      download="BCBE_2021_Report.pdf"
      className={`${downloadClass} ${variant === 'onDark'
        ? 'border-white bg-white text-ink hover:border-sand hover:bg-sand'
        : 'border-ink bg-ink text-white hover:border-rust hover:bg-rust'}`}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {t('highlights.downloadReport')}{' '}
      <span className="font-normal opacity-80">({t('highlights.reportFormat')})</span>
    </a>
  );

  return (
    <div className="w-full bg-white font-body text-text">
      <PageHero
        image="/bcbe5.jpg"
        alt={t('hero.imageAlt')}
        position="50% 40%"
        eyebrow="BCBE 2021"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        {reportLink('onDark')}
      </PageHero>

      {/* Hosts */}
      <div className="border-b border-line">
        <Container>
          <dl className="flex flex-col divide-y divide-line sm:flex-row sm:divide-x sm:divide-y-0">
            {[
              ['hostedBy', '/GoGMI_PNG.png', 'Gulf of Guinea Maritime Institute (GoGMI)'],
              ['inCollaboration', '/wista ghana.jpg', 'WISTA Ghana'],
            ].map(([key, logo, name]) => (
              <div key={key} className="flex items-center gap-5 py-6 sm:px-8 sm:first:pl-0">
                <img src={logo} alt="" className="h-14 w-14 flex-shrink-0 object-contain" />
                <div>
                  <dt className="text-sm text-muted">{t(`logos.${key}`)}</dt>
                  <dd className="mt-0.5 font-display font-bold text-ink">{name}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* About */}
      <section aria-labelledby="bcbe-about" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <h2 id="bcbe-about" className="heading-display text-[2rem] md:text-[2.5rem]">{t('about.heading')}</h2>
              <p className="prose-lead mt-6">{t('about.para1')}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t('about.para2')}</p>
            </div>
            <figure className="lg:col-span-6">
              <img src="/bcbe1.jpg" alt={t('images.event')} loading="lazy" className="aspect-[3/2] w-full object-cover" />
            </figure>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section aria-labelledby="bcbe-vision" className="bg-ink-deep py-16 text-white md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 id="bcbe-vision" className="heading-display !text-white text-[2rem] md:text-[2.5rem] lg:col-span-5">{t('vision.heading')}</h2>
            <p className="text-[1.25rem] leading-relaxed text-white/90 md:text-[1.375rem] lg:col-span-7">{t('vision.body')}</p>
          </div>
        </Container>
      </section>

      {/* Photographs */}
      <section aria-labelledby="bcbe-highlights" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            <img src="/bcbe3.jpg" alt={t('images.moment1')} loading="lazy" className="aspect-[3/2] w-full object-cover md:col-span-7" />
            <img src="/bcbe2.jpg" alt={t('images.moment2')} loading="lazy" className="aspect-[3/2] w-full object-cover object-[40%_30%] md:col-span-5 md:aspect-auto md:h-full" />
          </div>

          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-center lg:gap-14">
            <img src="/bcbe4.jpg" alt={t('images.highlights')} loading="lazy" className="aspect-[4/3] w-full object-cover lg:col-span-6" />
            <div className="lg:col-span-6">
              <h2 id="bcbe-highlights" className="heading-display text-[2rem] md:text-[2.5rem]">{t('highlights.heading')}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{t('highlights.body')}</p>
              <div className="mt-8">{reportLink('light')}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Themes */}
      <section aria-labelledby="bcbe-themes" className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="bcbe-themes" title={t('themesSection.heading')} />
          <ul className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-10">
            {list('themes').map((theme) => (
              <li key={theme} className="flex gap-4 border-b border-line py-5 text-lg font-semibold text-ink">
                <span className="mt-[0.7rem] h-2 w-2 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                {theme}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Impact */}
      <section aria-labelledby="bcbe-impact" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="bcbe-impact" title={t('impact.heading')} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h3 className="font-display text-[1.375rem] font-bold text-ink">{t('impact.diverseHeading')}</h3>
              <p className="prose-lead mt-4">{t('impact.diverseBody')}</p>
              <p className="mt-5 text-lg leading-relaxed text-muted">{t('impact.midParagraph')}</p>
            </div>
            <ul className="space-y-6 lg:col-span-5">
              {list('impact.cards').map((card) => (
                <li key={card} className="border-l-2 border-rust pl-5 text-lg leading-relaxed">{card}</li>
              ))}
            </ul>
          </div>

          <ol className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
            {list('impact.numbered').map((item, i) => (
              <li key={item} className="border-t-2 border-ink pt-5">
                <span className="font-display text-[2rem] font-bold leading-none text-rust" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 text-lg leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Speakers */}
      <section aria-labelledby="bcbe-speakers" className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="bcbe-speakers" title={t('speakers.heading')} />
          <ul className="mt-10 border-t border-line">
            {SPEAKERS.map((name, i) => (
              <li key={name} className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-10">
                <span className="font-display text-[1.25rem] font-bold text-ink md:col-span-5">{name}</span>
                <span className="text-lg text-muted md:col-span-7">{t(`speakers.titles.${i + 1}`)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
};

export default BlueCareerExpo;
