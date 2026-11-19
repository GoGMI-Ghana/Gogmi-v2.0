import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { Container, PageHero, SectionHeader, Button } from '../ui/Editorial';

/*
  Blue World Initiative in the editorial style: photo hero, the programme
  beside a classroom photo, the DOTCAN partnership, the 2023 career fair with
  its partners, a photo grid, ocean concepts as a glossary, career pathways
  in ruled columns, the MAN comic beside its cover and a closing band with
  the handbook download.
*/

const HANDBOOK_URL = '/resources/pdfs/bluecareerfair.handbook.pdf';

const PARTNERS = [
  'Eden International School',
  'Galaxy',
  'CMTD-YW',
  'Fisheries Commission',
  'Ghana Navy',
  'Canadian High Commission',
];

const CAREER_GROUPS = ['scienceResearch', 'maritimeOperations', 'blueEconomy', 'educationPolicy'];

const Marker = () => <span className="mt-[0.6rem] h-2 w-2 flex-shrink-0 bg-rust" aria-hidden="true"></span>;

const BlueWorldInitiative = () => {
  const { t } = useTranslation('blueWorldInitiative');
  const list = (key) => t(key, { returnObjects: true });

  const handbookLink = (onDark) => (
    <a
      href={HANDBOOK_URL}
      download="Blue-Career-Fair-Handbook.pdf"
      className={`focus-ring inline-flex items-center gap-2 rounded-[2px] border px-5 py-3 font-body text-[0.9375rem] font-semibold transition-colors duration-150 ${onDark
        ? 'border-white bg-white text-ink hover:border-sand hover:bg-sand'
        : 'border-ink bg-ink text-white hover:border-rust hover:bg-rust'}`}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {t('resourcesSection.handbook.download')}{' '}
      <span className="font-normal opacity-80">({t('resourcesSection.handbook.format')})</span>
    </a>
  );

  return (
    <div className="w-full bg-white font-body text-text">
      <PageHero
        image="/bwi3.jpg"
        alt={t('hero.imageAlt')}
        position="50% 30%"
        eyebrow={t('about.badge')}
        title={t('about.heading')}
        subtitle={t('hero.subtitle')}
      >
        {handbookLink(true)}
        <Button to="/contact" variant="outlineOnDark">{t('resourcesSection.getInvolved.button')}</Button>
      </PageHero>

      {/* About */}
      <section aria-labelledby="bwi-about" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-7">
              <h2 id="bwi-about" className="sr-only">{t('about.heading')}</h2>
              <p className="prose-lead">{t('about.para1')}</p>
              <p className="mt-5 text-lg leading-relaxed text-muted">{t('about.para2')}</p>
            </div>
            <img src="/bwi2.jpg" alt={t('about.imageAlt')} loading="lazy" className="aspect-[4/5] w-full object-cover lg:col-span-5" />
          </div>
        </Container>
      </section>

      {/* DOTCAN */}
      <section aria-labelledby="bwi-dotcan" className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="bwi-dotcan" title={t('dotcan.heading')} intro={t('dotcan.subheading')} />
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-14">
            <div className="flex items-start md:col-span-4">
              <img src="/DOTCANLOGO.png" alt={t('dotcan.logoAlt')} loading="lazy" className="w-full max-w-[16rem] border border-line bg-white p-6" />
            </div>
            <div className="space-y-5 md:col-span-8">
              <p className="prose-lead">{t('dotcan.para1')}</p>
              <p className="text-lg leading-relaxed text-muted">{t('dotcan.para2')}</p>
              <p className="text-lg leading-relaxed text-muted">{t('dotcan.para3')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Ocean Career Fair 2023 */}
      <section aria-labelledby="bwi-fair" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-rust">{t('careerFair.eventHeading')}</p>
              <h2 id="bwi-fair" className="heading-display mt-2 text-[2rem] md:text-[2.5rem]">{t('careerFair.heading')}</h2>
              <p className="prose-lead mt-6">{t('careerFair.para1')}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t('careerFair.para2')}</p>
              <ul className="mt-8 grid gap-x-8 border-t border-line sm:grid-cols-2">
                {list('careerFair.bullets').map((b) => (
                  <li key={b} className="flex gap-3 border-b border-line py-4 font-semibold text-ink"><Marker />{b}</li>
                ))}
              </ul>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <h3 className="font-display text-[1.25rem] font-bold text-ink">{t('careerFair.partnersHeading')}</h3>
              <ul className="mt-4 border-t border-line">
                {PARTNERS.map((p) => (
                  <li key={p} className="border-b border-line py-3 text-lg">{p}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      {/* Photographs */}
      <section aria-labelledby="bwi-gallery" className="pb-16 md:pb-24">
        <Container>
          <SectionHeader id="bwi-gallery" title={t('gallery.heading')} />
          <div className="mt-10 grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-6">
            <img src="/bwist2.jpg" alt={t('careerFair.images.img2')} loading="lazy" className="aspect-[4/5] w-full object-cover object-top md:col-span-4 md:row-span-2 md:aspect-auto md:h-full" />
            <img src="/bwist4.jpg" alt={t('careerFair.images.img3')} loading="lazy" className="aspect-[3/2] w-full object-cover md:col-span-8 md:aspect-[16/7]" />
            <img src="/bwist1.jpg" alt={t('careerFair.images.img1')} loading="lazy" className="aspect-[3/2] w-full object-cover md:col-span-4 md:aspect-auto md:h-full" />
            <img src="/bwi1.jpg" alt={t('gallery.img2Alt')} loading="lazy" className="aspect-[3/2] w-full object-cover md:col-span-4 md:aspect-auto md:h-full" />
          </div>
        </Container>
      </section>

      {/* Ocean concepts */}
      <section aria-labelledby="bwi-concepts" className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="bwi-concepts" title={t('concepts.heading')} intro={t('concepts.subtitle')} />
          <dl className="mt-10 border-t border-line">
            {list('concepts.items').map((c) => (
              <div key={c.title} className="grid gap-2 border-b border-line py-5 md:grid-cols-12 md:gap-10">
                <dt className="font-display text-[1.25rem] font-bold text-ink md:col-span-4">{c.title}</dt>
                <dd className="text-lg leading-relaxed text-muted md:col-span-8">{c.description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Career pathways */}
      <section aria-labelledby="bwi-careers" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="bwi-careers" title={t('careers.heading')} intro={t('careers.subtitle')} />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {CAREER_GROUPS.map((group) => (
              <div key={group} className="border-t-2 border-ink pt-5">
                <h3 className="font-display text-[1.25rem] font-bold text-ink">{t(`careers.categories.${group}.heading`)}</h3>
                <ul className="mt-3 space-y-2 text-lg">
                  {list(`careers.categories.${group}.items`).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-center lg:gap-14">
            <img src="/bwi4.jpg" alt={t('careers.imageAlt')} loading="lazy" className="aspect-[3/2] w-full object-cover lg:col-span-6" />
            <aside className="border-l-4 border-rust pl-6 lg:col-span-6">
              <h3 className="font-display text-[1.375rem] font-bold text-ink">{t('careers.funFact.heading')}</h3>
              <p className="prose-lead mt-3">{t('careers.funFact.para1')}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t('careers.funFact.para2')}</p>
            </aside>
          </div>
        </Container>
      </section>

      {/* MAN comic */}
      <section aria-labelledby="bwi-comic" className="bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
            <img src="/adventuresbwi.jpg" alt={t('comic.imageAlt')} loading="lazy" className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none" />
            <div className="md:col-span-7">
              <p className="text-sm font-semibold text-rust">{t('comic.badge')}</p>
              <h2 id="bwi-comic" className="heading-display mt-2 text-[2rem] md:text-[2.5rem]">{t('comic.heading')}</h2>
              <p className="prose-lead mt-6">{t('comic.para1')}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t('comic.para2')}</p>
              <ul className="mt-8 border-t border-line">
                {list('comic.bullets').map((b) => (
                  <li key={b} className="flex gap-3 border-b border-line py-4 font-semibold text-ink"><Marker />{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing band */}
      <section aria-labelledby="bwi-resources" className="bg-ink py-16 text-white md:py-20">
        <Container>
          <h2 id="bwi-resources" className="heading-display !text-white text-[2rem] md:text-[2.75rem]">{t('resourcesSection.heading')}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-dark">{t('resourcesSection.subtitle')}</p>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-0">
            <div className="md:pr-10">
              <h3 className="font-display text-[1.375rem] font-bold text-white">{t('resourcesSection.handbook.heading')}</h3>
              <p className="mt-2 text-on-dark">{t('resourcesSection.handbook.desc')}</p>
              <div className="mt-6">{handbookLink(true)}</div>
            </div>
            <div className="border-t border-white/25 pt-10 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <h3 className="font-display text-[1.375rem] font-bold text-white">{t('resourcesSection.getInvolved.heading')}</h3>
              <p className="mt-2 text-on-dark">{t('resourcesSection.getInvolved.desc')}</p>
              <div className="mt-6">
                <Button to="/contact" variant="outlineOnDark">{t('resourcesSection.getInvolved.button')}</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default BlueWorldInitiative;
