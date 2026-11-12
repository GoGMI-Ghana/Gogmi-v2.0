import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Container, Button, SectionHeader, PageHero } from '../ui/Editorial';

// Flagship courses, each with its own poster and detail page.
const FEATURED = [
  { id: 'maritime-governance', image: '/margov-coh2.jpeg', link: '/maritime-governance-course' },
  { id: 'marine-casualty', image: '/marinecasualtylatest.jpeg', link: '/marine-casualty-course' }
];

// Every programme, keyed to capacityBuilding.json `programs.items`.
const PROGRAMS = [
  { key: 'marineCasualty', status: 'Active', link: '/marine-casualty-course' },
  { key: 'maritimeGovernance', status: 'Active', link: '/maritime-governance-course' },
  { key: 'ecop', status: 'Active', link: '/ecop' },
  { key: 'wytec', status: 'Active', link: '/wytec' },
  { key: 'journalistTraining', status: 'Completed', link: '/journalist-training' },
  { key: 'massdi', status: 'Completed', link: '/massdi' },
  { key: 'blueMentorship', status: 'Completed', link: '/blue-mentorship' }
];

const IMPACT = [
  { key: 'trainingPrograms', value: '5+' },
  { key: 'professionalsTrained', value: '100+' },
  { key: 'partnerOrganizations', value: '15+' }
];

const ALUMNI = [
  { name: 'Thomas Lartey', roleKey: 'thomasLartey', linkedin: 'https://www.linkedin.com/in/thomas-lartey-739a85223' },
  { name: 'Clement Kwara', roleKey: 'clementKwara', linkedin: 'https://www.linkedin.com/in/clement-k-aa859211b' }
];

const ProgramRow = ({ program, t }) => (
  <li className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-10">
    <div className="md:col-span-8">
      <h4 className="text-[1.25rem] font-bold leading-snug tracking-[-0.01em] text-ink">
        <Link to={program.link} className="focus-ring hover:underline hover:decoration-2 hover:underline-offset-4">
          {program.title}
        </Link>
      </h4>
      <p className="mt-2 line-clamp-3 leading-relaxed text-muted">{program.description}</p>
      {program.features?.length > 0 && (
        <p className="mt-3 text-sm text-text">{program.features.join(' · ')}</p>
      )}
    </div>
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:col-span-4 md:grid-cols-1 md:border-l md:border-line md:pl-8">
      {[
        [t('featured.stats.format'), program.format],
        [t('featured.stats.duration'), program.duration],
        [t('featured.stats.level'), program.level],
        [t('featured.nextIntake'), program.nextIntake]
      ].map(([label, value]) => (
        <div key={label}>
          <dt className="text-muted">{label}</dt>
          <dd className="font-semibold text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  </li>
);

const CapacityBuilding = () => {
  const { t } = useTranslation('capacityBuilding');

  const featured = FEATURED.map((course) => ({
    ...course,
    ...t(`featured.courses.${course.id}`, { returnObjects: true })
  }));

  const programs = PROGRAMS.map((program) => ({
    ...program,
    ...t(`programs.items.${program.key}`, { returnObjects: true })
  }));
  const groups = [
    { id: 'open', label: t('programs.groups.open'), items: programs.filter((p) => p.status === 'Active') },
    { id: 'past', label: t('programs.groups.past'), items: programs.filter((p) => p.status === 'Completed') }
  ];

  return (
    <div className="w-full font-body text-text">
      {/* PAGE HEADER: photograph hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&fit=crop&q=90"
        eyebrow={<Link to="/services" className="focus-ring hover:underline hover:underline-offset-4">{t('breadcrumb')}</Link>}
        title={t('hero.heading')}
        subtitle={t('hero.subtitle')}
      >
        <Button to="https://lms.gogmi.org.gh/" variant="onDark">
          <span>{t('hero.cta')}</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Button>
      </PageHero>
      
      {/* IMPACT FIGURES */}
      <section className="border-b border-line bg-paper" aria-labelledby="cb-impact">
        <Container>
          <div className="grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10">
            <h2 id="cb-impact" className="text-[1.125rem] font-bold text-ink md:col-span-3">
              {t('impact.heading')}
              <span className="mt-1 block text-sm font-normal text-muted">{t('impact.since')}</span>
            </h2>
            <dl className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:col-span-9">
              {IMPACT.map((item) => (
                <div key={item.key} className="flex flex-col py-4 sm:px-8 sm:py-0">
                  <dt className="mt-2 text-[0.9375rem] text-muted">{t(`impact.metrics.${item.key}`)}</dt>
                  <dd className="order-first text-[2.5rem] font-bold leading-none tracking-[-0.02em] tabular-nums text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* FLAGSHIP COURSES: poster beside the course facts */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="cb-flagship">
        <Container>
          <SectionHeader id="cb-flagship" title={t('featured.heading')} intro={t('featured.subtitle')} />

          <div className="mt-6">
            {featured.map((course) => (
              <article key={course.id} className="grid gap-8 border-b border-line py-12 last:border-b-0 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <img
                    src={course.image}
                    alt=""
                    loading="lazy"
                    className="mx-auto w-full max-w-[22rem] rounded-[2px] border border-line bg-paper"
                  />
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="text-sm font-semibold text-rust">{course.tagline}</p>
                  <h3 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-[-0.015em] text-ink md:text-[2.25rem]">{course.fullTitle}</h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-text">{course.description}</p>

                  <dl className="mt-8 grid grid-cols-2 border-t border-line sm:grid-cols-4">
                    {['duration', 'format', 'modules', 'level'].map((key) => (
                      <div key={key} className="flex flex-col border-b border-line py-4 pr-4 sm:border-b-0">
                        <dt className="text-sm text-muted">{t(`featured.stats.${key}`)}</dt>
                        <dd className="order-first text-[1.0625rem] font-semibold text-ink">{course[key]}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-6 text-[0.9375rem] text-text">
                    <span className="font-semibold text-ink">{t('featured.nextIntake')}:</span> {course.nextIntake}
                  </p>

                  <div className="mt-8">
                    <Button to={course.link}>
                      <span>{t('featured.viewProgram')}<span className="sr-only">: {course.fullTitle}</span></span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ALL PROGRAMMES: current and past, as a register */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="cb-programs">
        <Container>
          <SectionHeader id="cb-programs" title={t('programs.heading')} intro={t('programs.subtitle')} />

          {groups.map((group) => (
            <div key={group.id} className="mt-14">
              <h3 className="flex items-baseline gap-3 border-b-2 border-ink pb-3 text-[1.125rem] font-bold text-ink">
                {group.label}
                <span className="text-sm font-normal tabular-nums text-muted">{group.items.length}</span>
              </h3>
              <ul>
                {group.items.map((program) => (
                  <ProgramRow key={program.key} program={program} t={t} />
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>

      {/* ALUMNI */}
      <section className="bg-ink-deep py-20 text-white md:py-28" aria-labelledby="cb-alumni">
        <Container>
          <SectionHeader
            id="cb-alumni"
            tone="dark"
            title={`${t('alumni.heading1')} ${t('alumni.heading2')}`}
            intro={t('alumni.subtitle')}
          />

          <ul className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2">
            {ALUMNI.map((person) => (
              <li key={person.name} className="bg-ink-deep py-8 sm:px-8 sm:first:pl-0">
                <p className="text-sm text-sand">{t('alumni.programTag')}</p>
                <p className="mt-3 text-[1.5rem] font-bold tracking-[-0.01em] text-white">{person.name}</p>
                <p className="mt-1 text-on-dark">{t(`alumni.roles.${person.roleKey}`)}</p>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-6 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  <span>{t('alumni.linkedinLabel')}<span className="sr-only">: {person.name}</span></span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
};

export default CapacityBuilding;
