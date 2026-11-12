import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../ui/Editorial';

// One entry per item in services.json `items`, in the same order.
const AREAS = [
  {
    id: 'advocacy',
    path: '/services/advocacy',
    image: '/area-advocacy-1200.jpg',
    alt: 'A speaker addressing a GoGMI roundtable',
    position: '60% 40%'
  },
  {
    id: 'research',
    path: '/services/research',
    image: '/area-research-1200.jpg',
    alt: 'A presentation at a GoGMI maritime security conference',
    position: '55% 50%'
  },
  {
    id: 'capacity',
    path: '/services/capacitybuilding',
    image: '/area-capacity-1200.jpg',
    alt: 'Maritime cadets at a GoGMI blue careers event',
    position: '50% 35%'
  },
  {
    id: 'secretariat',
    path: '/secretariat',
    image: '/area-secretariat-1200.jpg',
    alt: 'Delegates at an International Maritime Security Working Group forum',
    position: '50% 50%'
  }
];

const Services = () => {
  const { t } = useTranslation('services');
  const areas = t('items', { returnObjects: true }).map((item, idx) => ({ ...AREAS[idx], ...item }));

  return (
    <div className="w-full font-body text-text">
      {/* PAGE HEADER with an index of the four areas */}
      <header className="bg-white pt-[124px] md:pt-[148px]">
        <Container>
          <div className="max-w-3xl pb-12 md:pb-16">
            <h1 className="heading-display text-[2.5rem] md:text-[3.5rem]">{t('hero.title')}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">{t('hero.subtitle')}</p>
          </div>

          <nav aria-label={t('onThisPage')}>
            <ol className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area, idx) => (
                <li key={area.id} className="bg-white">
                  <a href={`#area-${area.id}`} className="focus-ring group flex h-full items-baseline gap-3 px-1 py-5 transition-colors hover:bg-paper sm:px-5">
                    <span className="text-sm font-semibold tabular-nums text-rust">{String(idx + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block text-[1.0625rem] font-semibold text-ink group-hover:underline group-hover:underline-offset-4">{area.title}</span>
                      <span className="mt-1 block text-sm leading-snug text-muted">{area.shortDesc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </header>

      {/* THE FOUR AREAS: photograph and text, alternating sides */}
      {areas.map((area, idx) => {
        const flip = idx % 2 === 1;
        return (
          <section
            key={area.id}
            id={`area-${area.id}`}
            aria-labelledby={`area-${area.id}-title`}
            className={`scroll-mt-20 py-16 md:py-24 ${flip ? 'bg-paper' : 'bg-white'}`}
          >
            <Container>
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <div className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
                  <img
                    src={area.image}
                    alt={area.alt}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="aspect-[3/2] w-full rounded-[2px] object-cover"
                    style={{ objectPosition: area.position }}
                  />
                </div>

                <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                  <p className="text-sm font-semibold tabular-nums text-rust">{String(idx + 1).padStart(2, '0')}</p>
                  <h2 id={`area-${area.id}-title`} className="heading-display mt-2 text-[2rem] md:text-[2.5rem]">{area.title}</h2>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-text">{area.fullDesc}</p>

                  <ul className="mt-7 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                    {area.features.map((feature) => (
                      <li key={feature} className="border-b border-line py-3 text-[0.9375rem] font-semibold text-ink">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to={area.path} className="link-editorial focus-ring mt-7 inline-flex items-center gap-2 font-semibold">
                    <span>{t('learnMore')}<span className="sr-only">: {area.title}</span></span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* CALL TO ACTION */}
      <section className="bg-ink-deep py-16 text-white md:py-20">
        <Container>
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <h2 className="heading-display !text-white text-[2rem] md:text-[2.5rem]">{t('cta.heading')}</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-dark">{t('cta.subtitle')}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button to="/contact" variant="onDark">{t('cta.consultation')}</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Services;
