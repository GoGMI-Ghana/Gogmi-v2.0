import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, ChevronDown, ArrowRight } from 'lucide-react';
import { Container, PageHero, SectionHeader } from '../ui/Editorial';
import CourseApply from '../ui/CourseApply';

const API_URL = 'https://api.gogmi.org.gh/api';
const BROCHURE_URL = '/resources/pdfs/casualtybronchure.pdf';
const MEMBER_PRICE = 400;
const NON_MEMBER_PRICE = 500;

const BTN = 'focus-ring inline-flex items-center justify-center gap-2 rounded-[2px] border px-5 py-3 text-[0.9375rem] font-semibold transition-colors duration-150';

const Bullet = () => <span className="mt-[0.6rem] h-1.5 w-1.5 flex-shrink-0 bg-rust" aria-hidden="true"></span>;

const MarineCasualtyCourse = () => {
  const { t } = useTranslation('marineCasualtyCourse');
  const [applyOpen, setApplyOpen] = useState(false);

  const modules = t('modules', { returnObjects: true });
  const highlights = t('overview.highlights', { returnObjects: true });
  const participants = t('participants.list', { returnObjects: true });
  const outcomes = t('outcomesSection.list', { returnObjects: true });

  const openApply = () => setApplyOpen(true);

  const brochureLink = (classes) => (
    <a href={BROCHURE_URL} download="Marine-Casualty-Course-Brochure.pdf" className={`${BTN} ${classes}`}>
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>{t('hero.downloadBrochure')}</span>
      <span className="font-normal opacity-80">(PDF)</span>
    </a>
  );

  return (
    <div className="w-full font-body text-text">
      {applyOpen && (
        <CourseApply
          t={t}
          courseTitle={t('hero.title')}
          endpoint={`${API_URL}/courses/marine-casualty.php`}
          courseLabel="Marine Casualty Investigation"
          refPrefix="GOGMI-MCC-"
          memberPrice={MEMBER_PRICE}
          nonMemberPrice={NON_MEMBER_PRICE}
          askDob={false}
          onClose={() => setApplyOpen(false)}
        />
      )}

      <PageHero image="/casualtyimage.jpg" alt="" eyebrow={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <button type="button" onClick={openApply} className={`${BTN} border-white bg-white text-ink hover:border-sand hover:bg-sand`}>
          <span>{t('hero.applyNow')}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        {brochureLink('border-white/70 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink')}
      </PageHero>

      {/* KEY FACTS: one ruled row under the hero */}
      <div className="border-b border-line bg-white">
        <Container>
          <ul className="grid grid-cols-2 md:grid-cols-5">
            {[t('hero.duration'), t('hero.format'), t('hero.moduleCount')].map((value) => (
              <li key={value} className="flex items-center border-b border-line py-5 pr-4 text-[1.125rem] font-bold text-ink md:border-b-0 md:border-r md:px-6 md:first:pl-0">
                {value}
              </li>
            ))}
            <li className="border-b border-line py-5 pr-4 md:border-b-0 md:border-r md:px-6">
              <span className="block text-sm font-semibold text-muted">{t('hero.memberPriceLabel')}</span>
              <span className="block text-[1.125rem] font-bold tabular-nums text-ink">USD {MEMBER_PRICE}</span>
            </li>
            <li className="py-5 pr-4 md:px-6">
              <span className="block text-sm font-semibold text-muted">{t('hero.standardRateLabel')}</span>
              <span className="block text-[1.125rem] font-bold tabular-nums text-ink">USD {NON_MEMBER_PRICE}</span>
            </li>
          </ul>
        </Container>
      </div>

      {/* OVERVIEW: text beside a captioned photograph, then four ruled highlights */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="mcc-overview">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <h2 id="mcc-overview" className="heading-display text-[2.25rem] md:text-[3rem]">{t('overview.heading')}</h2>
              <p className="prose-lead mt-6">{t('overview.para1')}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{t('overview.para2')}</p>
            </div>
            <figure className="lg:col-span-5 lg:col-start-8">
              <img src="/casualty1.png" alt={t('overview.imageAlt')} loading="lazy" className="aspect-[4/3] w-full rounded-[2px] object-cover" />
              <figcaption className="mt-3 flex items-baseline gap-2 border-l-[3px] border-rust pl-3">
                <span className="font-bold text-ink">{t('overview.imageBadgeTitle')}</span>
                <span className="text-muted">{t('overview.imageBadgeSubtitle')}</span>
              </figcaption>
            </figure>
          </div>

          <ul className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <li key={h.title} className="border-t-2 border-ink py-6">
                <h3 className="text-[1.125rem] font-bold leading-snug text-ink">{h.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{h.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* RATIONALE: a statement on dark */}
      <section className="bg-ink-deep py-20 text-white md:py-28" aria-labelledby="mcc-why">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 id="mcc-why" className="text-sm font-semibold text-sand lg:col-span-3">{t('rationale.heading')}</h2>
            <div className="lg:col-span-8 lg:col-start-5">
              <p className="text-[1.75rem] font-bold leading-snug tracking-[-0.015em] md:text-[2.25rem]">{t('rationale.para1')}</p>
              <p className="mt-6 text-lg leading-relaxed text-on-dark">{t('rationale.para2')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* MODULES: expansion panels */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="mcc-modules">
        <Container>
          <SectionHeader id="mcc-modules" title={t('modulesSection.heading')} intro={t('modulesSection.subtitle')} />
          <div className="mt-12 border-t border-line">
            {modules.map((module, idx) => (
              <details key={module.title} className="group border-b border-line">
                <summary className="focus-ring flex cursor-pointer list-none items-start gap-5 py-6 hover:bg-paper md:px-4 [&::-webkit-details-marker]:hidden">
                  <span className="w-10 flex-shrink-0 pt-1 text-sm font-semibold tabular-nums text-rust" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="sr-only">{t('modulesSection.moduleLabel', { number: idx + 1 })}: </span>
                    <span className="block text-[1.25rem] font-bold leading-snug text-ink">{module.title}</span>
                  </span>
                  <ChevronDown className="mt-1 h-5 w-5 flex-shrink-0 text-ink transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="grid gap-8 pb-8 pl-[3.75rem] md:grid-cols-2 md:pl-[4.75rem] md:pr-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted">{t('modulesSection.topicsHeading')}</h3>
                    <ul className="mt-3 space-y-2">
                      {module.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-3 leading-relaxed"><Bullet /><span>{topic}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted">{t('modulesSection.outcomesHeading')}</h3>
                    <ol className="mt-3 space-y-2">
                      {module.learningOutcomes.map((o, i) => (
                        <li key={o} className="grid grid-cols-[1.75rem_1fr] leading-relaxed">
                          <span className="font-semibold tabular-nums text-ink">{i + 1}.</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* PARTICIPANTS */}
      <section className="bg-paper py-20 md:py-24" aria-labelledby="mcc-participants">
        <Container>
          <SectionHeader id="mcc-participants" title={t('participants.heading')} />
          <ul className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            {participants.map((p) => (
              <li key={p} className="border-b border-line py-5 text-[1.0625rem] font-semibold text-ink">{p}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* OUTCOMES: large numbered statements */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="mcc-outcomes">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="mcc-outcomes" className="heading-display text-[2.25rem] md:text-[2.75rem]">{t('outcomesSection.heading')}</h2>
            </div>
            <ol className="lg:col-span-8">
              {outcomes.map((o, idx) => (
                <li key={o} className="grid grid-cols-[3.5rem_1fr] items-baseline border-t border-line py-6 last:border-b">
                  <span className="text-[2rem] font-bold leading-none tabular-nums text-rust" aria-hidden="true">{idx + 1}</span>
                  <p className="text-[1.25rem] font-semibold leading-snug text-ink">{o}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* FORMAT AND ALIGNMENT */}
      <section className="bg-paper py-20 md:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="heading-display text-[2rem] md:text-[2.5rem]">{t('format.heading')}</h2>
              <h3 className="mt-8 text-[1.125rem] font-bold text-ink">{t('format.deliveryHeading')}</h3>
              <dl className="mt-3 border-t border-line">
                <div className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 border-b border-line py-3">
                  <dt className="font-semibold text-text">{t('format.deliveryInPersonLabel').replace(/:\s*$/, '')}</dt>
                  <dd className="text-muted">{t('format.deliveryInPersonValue')}</dd>
                </div>
                <div className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 border-b border-line py-3">
                  <dt className="font-semibold text-text">{t('format.deliveryVirtualLabel').replace(/:\s*$/, '')}</dt>
                  <dd className="text-muted">{t('format.deliveryVirtualValue')}</dd>
                </div>
              </dl>
              <h3 className="mt-10 text-[1.125rem] font-bold text-ink">{t('format.methodsHeading')}</h3>
              <ul className="mt-3 space-y-2">
                {t('format.methods', { returnObjects: true }).map((m) => (
                  <li key={m} className="flex items-start gap-3 leading-relaxed"><Bullet /><span>{m}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="heading-display text-[2rem] md:text-[2.5rem]">{t('alignment.heading')}</h2>
              <h3 className="mt-8 text-[1.125rem] font-bold text-ink">{t('alignment.alignsHeading')}</h3>
              <ul className="mt-3 border-t border-line">
                {[0, 1].map((i) => (
                  <li key={i} className="border-b border-line py-3 leading-relaxed">{t(`alignment.items.${i}`)}</li>
                ))}
              </ul>
              <div className="mt-10 border-l-[5px] border-ink bg-white p-6">
                <h3 className="text-[1.125rem] font-bold text-ink">{t('alignment.impactHeading')}</h3>
                <ul className="mt-3 space-y-2">
                  {t('alignment.impactList', { returnObjects: true }).map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-relaxed"><Bullet /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CLOSING CALL TO ACTION */}
      <section className="bg-ink py-16 text-white md:py-20" aria-labelledby="mcc-apply">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="mcc-apply" className="text-[2rem] font-bold leading-tight tracking-[-0.02em] md:text-[2.5rem]">{t('modal.titles.choose')}</h2>
              <p className="mt-3 text-lg text-on-dark">
                {t('hero.memberPriceLabel')}: <strong className="font-bold text-white">USD {MEMBER_PRICE}</strong>
                <span className="mx-3 text-white/40" aria-hidden="true">|</span>
                {t('hero.standardRateLabel')}: <strong className="font-bold text-white">USD {NON_MEMBER_PRICE}</strong>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={openApply} className={`${BTN} border-white bg-white text-ink hover:border-sand hover:bg-sand`}>
                <span>{t('hero.applyNow')}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              {brochureLink('border-white/70 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink')}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default MarineCasualtyCourse;
