import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Calendar, Users, FileText, Target } from 'lucide-react';
import { Container, Button, SectionHeader, PageHero } from '../ui/Editorial';

// Icons for secretariat.json `services.items`, in the same order.
const SERVICE_ICONS = [Calendar, Users, FileText, Target];

// Portfolio projects; text comes from secretariat.json `portfolio.<key>`.
const PROJECTS = [
  { key: 'gmac', year: '2023', image: '/gmacpic.jpg', alt: 'Green Maritime Africa Coalition launch', link: '/gmac' },
  { key: 'shade', year: '2023', image: '/Banner.webp', alt: 'GoG-MCF SHADE forum event banner', position: '100% 50%', link: '/shade' }
];

const Secretariat = () => {
  const { t } = useTranslation('secretariat');
  const services = t('services.items', { returnObjects: true });

  return (
    <div className="w-full overflow-x-hidden font-body text-text">
      {/* PAGE HEADER: photograph hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&fit=crop"
        eyebrow={<Link to="/services" className="focus-ring hover:underline hover:underline-offset-4">{t('breadcrumb')}</Link>}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <Button to="/contact" variant="onDark">
          <span>{t('hero.cta')}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </PageHero>

      {/* SERVICES: a numbered two-by-two grid with hairlines */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="sec-services">
        <Container>
          <SectionHeader id="sec-services" title={t('services.heading')} intro={t('services.subtitle')} />

          <ol className="mt-12 grid gap-px border-y border-line bg-line md:grid-cols-2">
            {services.map((service, idx) => {
              const Icon = SERVICE_ICONS[idx] || Target;
              return (
                <li key={service.title} className="flex gap-6 bg-white py-10 md:px-10 md:odd:pl-0">
                  <span className="text-[2.5rem] font-bold leading-none tracking-[-0.03em] tabular-nums text-sand" aria-hidden="true">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <Icon className="h-6 w-6 text-rust" aria-hidden="true" />
                    <h3 className="mt-3 text-[1.375rem] font-bold leading-snug tracking-[-0.01em] text-ink">{service.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{service.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* PORTFOLIO: large photographs with an overlapping text panel */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="sec-portfolio">
        <Container>
          <SectionHeader id="sec-portfolio" title={t('portfolio.heading')} intro={t('portfolio.subtitle')} />

          <div className="mt-14 space-y-16 md:space-y-24">
            {PROJECTS.map((project, idx) => {
              const flip = idx % 2 === 1;
              const data = t(`portfolio.${project.key}`, { returnObjects: true });
              return (
                <article key={project.key} className="relative grid lg:grid-cols-12 lg:items-center">
                  <div className={`lg:col-span-8 lg:row-start-1 ${flip ? 'lg:col-start-5' : 'lg:col-start-1'}`}>
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      className="aspect-[16/10] w-full rounded-[2px] object-cover"
                      style={{ objectPosition: project.position || '50% 50%' }}
                    />
                  </div>

                  <div
                    className={`relative -mt-12 mx-4 border border-line bg-white p-7 sm:mx-8 md:p-10 lg:row-start-1 lg:mx-0 lg:mt-0 lg:col-span-6 ${
                      flip ? 'lg:col-start-1' : 'lg:col-start-7'
                    }`}
                  >
                    <p className="text-sm text-muted">
                      <span className="font-semibold text-rust">{project.year}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{data.badge}</span>
                    </p>
                    <h3 className="mt-2 text-[1.5rem] font-bold leading-tight tracking-[-0.015em] text-ink md:text-[1.75rem]">
                      <Link to={project.link} className="focus-ring hover:underline hover:decoration-2 hover:underline-offset-4">
                        {data.title}
                      </Link>
                    </h3>
                    {data.theme && <p className="mt-3 text-[0.9375rem] font-semibold leading-snug text-ink">{data.theme}</p>}
                    <p className="mt-4 line-clamp-4 leading-relaxed text-muted">{data.overview}</p>

                    {Array.isArray(data.highlights) && data.highlights.length > 0 && (
                      <>
                        <h4 className="mt-6 text-sm font-semibold text-ink">{t('portfolio.highlightsLabel')}</h4>
                        <ul className="mt-2 space-y-1.5">
                          {data.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-3 text-[0.9375rem] text-text">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <Link to={project.link} className="link-editorial focus-ring mt-7 inline-flex items-center gap-2 font-semibold" tabIndex={-1} aria-hidden="true">
                      <span>{t('portfolio.viewProject')}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

    </div>
  );
};

export default Secretariat;
