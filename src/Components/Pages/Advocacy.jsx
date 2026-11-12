import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Container, Button, SectionHeader, PageHero } from '../ui/Editorial';

// One entry per item in advocacy.json `campaigns`, in the same order.
const CAMPAIGNS = [
  { status: 'active', logo: '/IMSWG LOGO WHITE BG.jpg', link: '/imswg' },
  { status: 'active', logo: '/GoGMI_PNG.png', link: '/blue-world-initiative' },
  { status: 'completed', logo: '/bluecareer.webp', link: '/bluecareerexpo' }
];

const Advocacy = () => {
  const { t } = useTranslation('advocacy');

  const campaigns = t('campaigns', { returnObjects: true }).map((campaign, idx) => ({
    ...campaign,
    ...CAMPAIGNS[idx],
    statusLabel: t(`campaignStatus.${CAMPAIGNS[idx].status}`)
  }));

  return (
    <div className="w-full font-body text-text">
      {/* PAGE HEADER: photograph hero */}
      <PageHero
        image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&fit=crop&q=90"
        eyebrow={<Link to="/services" className="focus-ring hover:underline hover:underline-offset-4">{t('breadcrumb')}</Link>}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <Button to="/contact" variant="onDark">{t('hero.cta')}</Button>
      </PageHero>

      {/* CAMPAIGNS: three ruled columns */}
      <section id="campaigns" className="scroll-mt-20 bg-white py-20 md:py-28" aria-labelledby="advocacy-campaigns">
        <Container>
          <SectionHeader id="advocacy-campaigns" title={t('campaignsSection.heading')} />

          <ul className="mt-12 grid border-t border-line md:grid-cols-3">
            {campaigns.map((campaign, idx) => (
              <li
                key={campaign.title}
                className={`flex flex-col border-b border-line py-10 md:border-b-0 md:px-8 ${idx === 0 ? 'md:pl-0' : 'md:border-l'} ${idx === campaigns.length - 1 ? 'md:pr-0' : ''}`}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-[2px] border border-line bg-white p-2">
                  <img src={campaign.logo} alt="" className="max-h-full max-w-full object-contain" />
                </div>

                <p className="mt-6 text-sm text-muted">
                  <span className="font-semibold text-rust">{campaign.category}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{campaign.statusLabel}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{campaign.deadline}</span>
                </p>

                <h3 className="mt-2 text-[1.375rem] font-bold leading-snug tracking-[-0.01em] text-ink">{campaign.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{campaign.description}</p>

                <Link to={campaign.link} className="link-editorial focus-ring mt-6 inline-flex items-center gap-2 self-start font-semibold">
                  <span>{t('campaignsSection.readMore')}<span className="sr-only">: {campaign.title}</span></span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-ink-deep py-16 text-white md:py-20">
        <Container>
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <h2 className="heading-display !text-white text-[2rem] md:text-[2.5rem]">{t('ctaBand.heading')}</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-dark">{t('ctaBand.body')}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button to="/contact" variant="onDark">{t('ctaBand.button')}</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Advocacy;
