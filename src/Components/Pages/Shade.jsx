import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { Container, SectionHeader } from '../ui/Editorial';

/*
  GoG-MCF/SHADE in the editorial style: a plain header with the forum logo,
  how the forum works with its three working groups, the plenary record as a
  table, a closer look at the fifth plenary, the case for the forum with
  quotes, the inaugural meeting beside its flyer, and the article download
  with the co-chairs' logos.
*/

const ARTICLE_URL = '/STRENGTHENING COUNTER-PIRACY RESPONSES (1).pdf';
const IMB_URL = 'https://iccwbo.org/news-publications/news/gulf-of-guinea-remains-worlds-piracy-hotspot-in-2021-according-to-imbs-latest-figures/';
const CONTACT_EMAIL = 'info@shade.org';

const Marker = ({ light }) => (
  <span className={`mt-[0.6rem] h-2 w-2 flex-shrink-0 ${light ? 'bg-sand' : 'bg-rust'}`} aria-hidden="true"></span>
);

const Quote = ({ text, body, attribution, tone = 'light' }) => {
  const dark = tone === 'dark';
  return (
    <figure className={`border-l-4 pl-6 ${dark ? 'border-sand' : 'border-rust'}`}>
      <blockquote>
        <p className={`text-[1.25rem] leading-relaxed md:text-[1.375rem] ${dark ? 'text-white' : 'text-ink'}`}>{text}</p>
        {body && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-on-dark' : 'text-muted'}`}>{body}</p>}
      </blockquote>
      <figcaption className={`mt-4 text-[0.9375rem] font-semibold ${dark ? 'text-sand' : 'text-muted'}`}>
        {attribution.replace(/^—\s*/, '')}
      </figcaption>
    </figure>
  );
};

const SHADE = () => {
  const { t } = useTranslation('shade');
  const list = (key) => t(key, { returnObjects: true });

  const downloadLink = (
    <a
      href={ARTICLE_URL}
      download="Strengthening-Counter-Piracy-Responses.pdf"
      className="focus-ring inline-flex items-center gap-2 rounded-[2px] border border-ink bg-ink px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:border-rust hover:bg-rust"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {t('hero.download')}{' '}
      <span className="font-normal opacity-80">(PDF)</span>
    </a>
  );

  const facts = ['date', 'first', 'second', 'format'];

  return (
    <div className="w-full bg-white font-body text-text">
      {/* Header */}
      <header className="border-b border-line bg-paper">
        <Container className="pb-14 pt-[120px] md:pb-20 md:pt-[150px]">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-sm font-semibold text-rust">{t('hero.eyebrow')}</p>
              <h1 className="heading-display mt-3 text-[2.5rem] md:text-[3.5rem]">{t('hero.title')}</h1>
              <p className="prose-lead mt-5 max-w-2xl">{t('hero.subtitle')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {downloadLink}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="focus-ring inline-flex items-center rounded-[2px] border border-ink px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  {t('article.contactHeading')}
                </a>
              </div>
            </div>
            <div className="hidden md:col-span-4 md:flex md:justify-end">
              <img src="/shade.png" alt={t('hero.logoAlt')} className="w-full max-w-[16rem]" />
            </div>
          </div>
        </Container>
      </header>

      {/* Modus operandi */}
      <section aria-labelledby="shade-modus" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="shade-modus" title={t('modusOperandi.heading')} />
          <div className="mt-10 max-w-3xl space-y-5">
            <p className="prose-lead">{t('modusOperandi.para1')}</p>
            <p className="text-lg leading-relaxed text-muted">{t('modusOperandi.para2')}</p>
            <p className="text-lg leading-relaxed text-muted">{t('modusOperandi.para3')}</p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {list('workingGroups').map((wg) => (
              <div key={wg.title} className="border-t-2 border-ink pt-5">
                <h3 className="font-display text-[1.375rem] font-bold text-ink">{wg.title}</h3>
                <ul className="mt-4 space-y-3">
                  {wg.objectives.map((obj) => (
                    <li key={obj} className="flex gap-3 leading-relaxed"><Marker />{obj}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-4xl md:mt-20">
            <Quote text={t('modusOperandi.quote.text')} attribution={t('modusOperandi.quote.attribution')} />
          </div>
        </Container>
      </section>

      {/* Complementarities and past plenaries */}
      <section aria-labelledby="shade-complement" className="bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 id="shade-complement" className="heading-display text-[2rem] md:text-[2.5rem]">{t('complementarities.heading')}</h2>
              <p className="mt-5 text-lg leading-relaxed">{t('complementarities.body')}</p>
              <h3 className="mt-10 font-display text-[1.375rem] font-bold text-ink">{t('complementarities.pastPlenaries.heading')}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted">{t('complementarities.pastPlenaries.body')}</p>
            </div>
            <div className="lg:col-span-7">
              <table className="w-full border-collapse bg-white text-left">
                <caption className="sr-only">{t('complementarities.pastPlenaries.heading')}</caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="px-4 py-3 text-sm font-semibold text-muted">{t('complementarities.pastPlenaries.table.plenary')}</th>
                    <th scope="col" className="px-4 py-3 text-sm font-semibold text-muted">{t('complementarities.pastPlenaries.table.date')}</th>
                    <th scope="col" className="px-4 py-3 text-sm font-semibold text-muted">{t('complementarities.pastPlenaries.table.location')}</th>
                  </tr>
                </thead>
                <tbody>
                  {list('plenaries').map((p) => (
                    <tr key={p.date} className="border-b border-line">
                      <th scope="row" className="px-4 py-4 font-semibold text-ink">{p.number} {t('complementarities.pastPlenaries.table.plenaryRowLabel')}</th>
                      <td className="px-4 py-4">{p.date}</td>
                      <td className="px-4 py-4">{p.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* Fifth plenary */}
      <section aria-labelledby="shade-fifth" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="shade-fifth" title={t('fifthPlenary.heading')} />
          <p className="prose-lead mt-10 max-w-3xl">{t('fifthPlenary.para1')}</p>

          <h3 className="mt-14 font-display text-[1.25rem] font-bold text-ink">{t('fifthPlenary.venn.heading')}</h3>
          <ul className="mt-4 grid border-t border-line md:grid-cols-2 md:gap-x-10">
            {list('fifthPlenary.venn.groups').map((g) => (
              <li key={g} className="flex gap-3 border-b border-line py-4 text-lg"><Marker />{g}</li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-5 lg:col-span-5">
              <p className="text-lg leading-relaxed">{t('fifthPlenary.recommendations.intro1')}</p>
              <p className="text-lg leading-relaxed text-muted">{t('fifthPlenary.recommendations.intro2')}</p>
            </div>
            <div className="lg:col-span-7">
              <h3 className="font-display text-[1.25rem] font-bold text-ink">{t('fifthPlenary.recommendations.lead')}</h3>
              <ul className="mt-4 border-t border-line">
                {list('fifthPlenary.recommendations.items').map((item) => (
                  <li key={item} className="flex gap-3 border-b border-line py-5 text-lg leading-relaxed"><Marker />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* IMO statement */}
      <section className="bg-ink-deep py-16 text-white md:py-20">
        <Container>
          <div className="max-w-4xl">
            <Quote
              tone="dark"
              text={t('fifthPlenary.quote.text')}
              body={t('fifthPlenary.quote.body')}
              attribution={t('fifthPlenary.quote.attribution')}
            />
          </div>
        </Container>
      </section>

      {/* Counter-piracy responses */}
      <section aria-labelledby="shade-counter" className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeader id="shade-counter" title={t('counterPiracy.heading')} />
          <p className="mt-10 max-w-3xl text-lg leading-relaxed">{t('counterPiracy.intro')}</p>
          <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {list('benefits').map((b) => (
              <li key={b} className="border-t-2 border-ink pt-5 text-lg leading-relaxed">{b}</li>
            ))}
          </ul>
          <p className="mt-12 max-w-3xl text-lg leading-relaxed text-muted">{t('counterPiracy.closing')}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
            {list('counterPiracy.testimonials').map((q) => (
              <Quote key={q.attribution} text={q.text} attribution={q.attribution} />
            ))}
          </div>
        </Container>
      </section>

      {/* Inaugural meeting */}
      <section aria-labelledby="shade-inaugural" className="py-16 md:py-24">
        <Container>
          <SectionHeader id="shade-inaugural" title={t('inaugural.heading')} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="text-lg leading-relaxed">{t('inaugural.body')}</p>
              <dl className="mt-8 border-t border-line">
                {facts.map((f) => (
                  <div key={f} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-3">
                    <dt className="text-muted">{t(`inaugural.${f}Label`)}</dt>
                    <dd className="font-semibold text-ink">{t(`inaugural.${f}`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="lg:col-span-6">
              <img src="/Banner.webp" alt={t('hero.imageAlt')} loading="lazy" className="w-full border border-line" />
            </figure>
          </div>

          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <h3 className="font-display text-[1.375rem] font-bold text-ink">{t('guestSpeakersSection.heading')}</h3>
              <ul className="mt-4 border-t border-line">
                {list('guestSpeakers').map((s) => (
                  <li key={s} className="border-b border-line py-3 text-lg">{s}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <h3 className="font-display text-[1.375rem] font-bold text-ink">{t('eventFeatures.heading')}</h3>
              <div className="mt-4 grid gap-6 border-t border-line pt-4 sm:grid-cols-2">
                {[
                  ['session1', ['plenarySession', 'remarks', 'vision']],
                  ['session2', ['plan', 'presentations']],
                ].map(([session, items]) => (
                  <div key={session}>
                    <h4 className="font-semibold text-rust">{t(`eventFeatures.${session}.heading`)}</h4>
                    <ul className="mt-2 space-y-1.5 text-lg">
                      {items.map((k) => <li key={k}>{t(`eventFeatures.${session}.${k}`)}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-6 leading-relaxed text-muted">{t('eventFeatures.body')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Target audience */}
      <section aria-labelledby="shade-audience" className="bg-ink py-16 text-white md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 id="shade-audience" className="heading-display !text-white text-[2rem] md:text-[2.5rem]">{t('targetAudienceSection.heading')}</h2>
              <p className="mt-5 text-lg leading-relaxed text-on-dark">{t('targetAudienceSection.body')}</p>
            </div>
            <ul className="border-t border-white/25 lg:col-span-7">
              {list('targetAudience').map((a) => (
                <li key={a} className="flex gap-3 border-b border-white/25 py-4 text-lg font-semibold"><Marker light />{a}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Article */}
      <section aria-labelledby="shade-article" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-14">
            <img src="/strenght.shade.png" alt={t('article.coverAlt')} loading="lazy" className="w-full max-w-xs border border-line md:col-span-4 md:max-w-none" />
            <div className="md:col-span-8">
              <p className="text-sm font-semibold text-rust">{t('article.byline')}</p>
              <h2 id="shade-article" className="heading-display mt-2 text-[1.75rem] md:text-[2.25rem]">{t('article.title')}</h2>
              <h3 className="mt-8 font-display text-[1.25rem] font-bold text-ink">{t('article.subheading')}</h3>
              <p className="mt-3 text-lg leading-relaxed">
                {t('article.para1')}{' '}
                <a href={IMB_URL} target="_blank" rel="noopener noreferrer" className="link-editorial focus-ring">{t('article.para1Link')}</a>
              </p>
              <div className="mt-8">{downloadLink}</div>

              <div id="shade-contact" className="mt-12 border-t border-line pt-8">
                <h3 className="font-display text-[1.25rem] font-bold text-ink">{t('article.contactHeading')}</h3>
                <p className="mt-2 text-lg">
                  {t('article.contactBody')}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="link-editorial focus-ring">{CONTACT_EMAIL}</a>
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-10">
                  <div className="flex items-center gap-4">
                    <img src="/ICC Logo (1).png" alt={t('article.logos.iccAlt')} loading="lazy" className="h-16 w-auto object-contain" />
                    <p className="text-sm font-semibold leading-snug text-ink">
                      {t('article.logos.iccName')}<br />{t('article.logos.iccNameEn')}
                    </p>
                  </div>
                  <img src="/nigeriamaritime.webp" alt={t('article.logos.nimasaAlt')} loading="lazy" className="h-12 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default SHADE;
