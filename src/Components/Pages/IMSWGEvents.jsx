import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { Container, PageHero, SectionHeader, Button } from '../ui/Editorial';

/*
  IMSWG quarterly forum page in the editorial style: photo hero, a ruled
  key-facts row, summary beside the flyer, background as long-form text,
  large numbered objectives, topics as expandable panels, the agenda as a
  timetable beside the participant list, outcomes, the conclusion as a
  statement on dark and a closing band with contact details.
*/

const REPORTS_URL = '/resources?subcategory=IMSWG+Reports#internal-reports';
const PHONE = '+233504953400';
const EMAIL = 'info@gogmi.org.gh';

const IMSWGEvents = () => {
  const { t } = useTranslation('imswgEvents');
  const list = (key) => t(key, { returnObjects: true });

  const facts = [
    ['date', t('hero.date')],
    ['time', t('hero.time')],
    ['format', t('hero.format')],
    ['status', t('facts.concluded')],
  ];

  return (
    <div className="w-full bg-white font-body text-text">
      <PageHero
        image="/imswg4.jpg"
        alt={t('hero.imageAlt')}
        position="62% 35%"
        eyebrow={t('hero.quarterBadge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <Button to={REPORTS_URL} variant="onDark">{t('facts.readReports')}</Button>
        <Button to="/imswg" variant="outlineOnDark">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {t('hero.backButton')}
        </Button>
      </PageHero>

      {/* Key facts */}
      <div className="border-b border-line">
        <Container>
          {/* Two columns on phones, four in a row from md; hairline dividers between cells. */}
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {facts.map(([key, value]) => (
              <div
                key={key}
                className="border-line px-5 py-5 max-md:odd:pl-0 max-md:even:border-l max-md:[&:nth-child(n+3)]:border-t md:border-l md:px-6 md:py-6 md:first:border-l-0 md:first:pl-0"
              >
                <dt className="text-sm text-muted">{t(`facts.${key}`)}</dt>
                <dd className={`mt-1 font-display text-[1.125rem] font-bold ${key === 'status' ? 'text-rust' : 'text-ink'}`}>{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* Summary */}
      <section aria-labelledby="ev-summary" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-rust">{t('executiveSummary.eyebrow')}</p>
              <h2 id="ev-summary" className="heading-display mt-2 text-[2rem] md:text-[2.5rem]">{t('executiveSummary.heading')}</h2>
              <p className="prose-lead mt-6">{t('executiveSummary.para1')}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t('executiveSummary.para2')}</p>
            </div>
            <figure className="lg:col-span-5">
              <img src="/IMSWG-BBNJ-newdate.jpeg" alt={t('executiveSummary.flyerAlt')} loading="lazy" className="aspect-square w-full border border-line object-cover" />
            </figure>
          </div>

          <ul className="mt-14 grid gap-8 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
            {list('executiveSummary.highlights').map((h) => (
              <li key={h.title} className="border-t-2 border-ink pt-5">
                <h3 className="font-display text-[1.125rem] font-bold text-ink">{h.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{h.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Background */}
      <section aria-labelledby="ev-background" className="bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 id="ev-background" className="heading-display text-[2rem] md:text-[2.5rem] lg:col-span-4">{t('background.heading')}</h2>
            <div className="max-w-3xl space-y-5 lg:col-span-8">
              <p className="prose-lead">{t('background.para1')}</p>
              <p className="text-lg leading-relaxed text-muted">{t('background.para2')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Objectives */}
      <section aria-labelledby="ev-objectives" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="ev-objectives" title={t('objectives.heading')} intro={t('objectives.subtitle')} />
          <ol className="mt-10 border-t border-line">
            {list('objectives.items').map((item, i) => (
              <li key={i} className="flex gap-4 border-b border-line py-7">
                <span className="mt-[0.6rem] h-2 w-2 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                <p className="max-w-3xl text-lg leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Topics */}
      <section aria-labelledby="ev-topics" className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="ev-topics" title={t('topics.heading')} intro={t('topics.subtitle')} />
          <div className="mt-10 border-t border-line">
            {list('topics.items').map((topic) => (
              <details key={topic.title} className="group border-b border-line">
                <summary className="focus-ring flex cursor-pointer list-none items-start gap-4 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.25rem] font-bold text-ink md:text-[1.375rem]">{topic.title}</span>
                  </span>
                  <ChevronDown className="mt-1.5 h-5 w-5 flex-shrink-0 text-ink transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-3xl pb-7 text-lg leading-relaxed text-muted">{topic.description}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Agenda and participants */}
      <section aria-labelledby="ev-agenda" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-rust">{t('format.eyebrow')}</p>
              <h2 id="ev-agenda" className="heading-display mt-2 text-[2rem] md:text-[2.5rem]">{t('format.heading')}</h2>
              <table className="mt-8 w-full text-left">
                <caption className="sr-only">{t('format.heading')}</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">{t('facts.time')}</th>
                    <th scope="col">{t('facts.session')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list('format.agenda').map((slot) => (
                    <tr key={slot.time} className="border-t border-line last:border-b">
                      <th scope="row" className="w-32 whitespace-nowrap py-4 pr-6 align-top font-display font-bold tabular-nums text-ink md:w-36">
                        {slot.time}
                      </th>
                      <td className="py-4 align-top leading-relaxed">{slot.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-5">
              <h2 className="heading-display text-[1.75rem] md:text-[2rem]">{t('stakeholders.heading')}</h2>
              <p className="mt-2 text-muted">{t('stakeholders.cardHeading')}</p>
              <ul className="mt-6 border-t border-line">
                {list('stakeholders.items').map((item) => (
                  <li key={item} className="border-b border-line py-3 leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Outcomes */}
      <section aria-labelledby="ev-outcomes" className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="ev-outcomes" title={t('outcomes.heading')} />
          <ul className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {list('outcomes.items').map((item) => (
              <li key={item} className="border-l-2 border-rust pl-5 text-lg leading-relaxed">{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Conclusion */}
      <section aria-labelledby="ev-conclusion" className="bg-ink-deep py-16 text-white md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 id="ev-conclusion" className="heading-display !text-white text-[2rem] md:text-[2.5rem] lg:col-span-4">{t('conclusion.heading')}</h2>
            <div className="space-y-5 lg:col-span-8">
              <p className="text-[1.25rem] leading-relaxed text-white/90 md:text-[1.375rem]">{t('conclusion.para1')}</p>
              <p className="text-lg leading-relaxed text-on-dark">{t('conclusion.para2')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing band */}
      <section className="bg-ink py-16 text-white md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h2 className="heading-display !text-white text-[2rem] md:text-[2.75rem]">{t('ctaSection.heading')}</h2>
              <p className="mt-4 text-lg text-on-dark">{t('ctaSection.dateLine')}</p>
              <p className="mt-1 text-lg font-semibold text-sand">{t('ctaSection.formatLine')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to={REPORTS_URL} variant="onDark">{t('facts.readReports')}</Button>
                <Button to="/imswg-signup" variant="outlineOnDark">{t('facts.expressInterest')}</Button>
              </div>
            </div>
            <div className="md:col-span-5 md:border-l md:border-white/25 md:pl-10">
              <p className="text-on-dark">{t('ctaSection.sponsorship')}</p>
              <ul className="mt-3 space-y-1.5 text-lg">
                <li><a href={`mailto:${EMAIL}`} className="focus-ring font-semibold text-white underline underline-offset-4 hover:text-sand">{EMAIL}</a></li>
                <li><a href={`tel:${PHONE}`} className="focus-ring font-semibold text-white underline underline-offset-4 hover:text-sand">+233 50 495 3400</a></li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default IMSWGEvents;
