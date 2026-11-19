import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Editorial';

/*
  Gulf Spectrum Podcast, laid out with Material patterns: a header with the
  show's logo, then a player with a selectable episode list beside it
  (the YouTube player only loads once someone presses play), the "about"
  section and a closing subscribe band.
*/

const CHANNEL_URL = 'https://www.youtube.com/@gulfofguineamaritimeinstitute';

const EPISODES_META = [
  { guest: 'Vice Admiral Issah Adam Yakubu', image: '/pod1.jpg', youtubeLink: 'https://www.youtube.com/watch?v=5KMyV26r8nc' },
  { guest: 'Vice Admiral Issah Adam Yakubu', image: '/pod2.jpg', youtubeLink: 'https://www.youtube.com/watch?v=2BEzgqw-M1U' },
  { guest: 'Dr. Ian Ralby', image: '/pod3.jpg', youtubeLink: 'https://www.youtube.com/watch?v=fpwxCQGAAdM' },
];

const videoId = (url) => new URL(url).searchParams.get('v');

const GulfSpectrumPodcast = () => {
  const { t } = useTranslation('gulfSpectrumPodcast');
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  const items = t('episodes.items', { returnObjects: true });
  const episodes = EPISODES_META.map((meta, i) => ({ ...meta, ...(items[i] || {}), number: i + 1 }));
  const episode = episodes[current];

  const select = (i) => {
    setCurrent(i);
    setPlaying(true);
    document.getElementById('podcast-player')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-white font-body text-text">
      {/* Header */}
      <header className="bg-ink-deep text-white">
        <Container className="pb-14 pt-[120px] md:pb-20 md:pt-[150px]">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-sm font-semibold text-sand">{t('hero.badge')}</p>
              <h1 className="heading-display mt-3 !text-white text-[2.75rem] md:text-[4rem]">Gulf Spectrum Podcast</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{t('hero.subtitle')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#podcast-player"
                  className="focus-ring inline-flex items-center gap-2 rounded-[2px] border border-white bg-white px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:border-sand hover:bg-sand"
                >
                  <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                  {t('episodes.listen')}
                </a>
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-[2px] border border-white/70 px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors duration-150 hover:border-white hover:bg-white hover:text-ink"
                >
                  {t('episodes.watchOnYoutube')}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="mx-auto w-48 bg-white p-5 md:ml-auto md:mr-0 md:w-60">
                <img src="/gsp.png" alt="Gulf Spectrum Podcast logo" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Player and episode list */}
      <section id="podcast-player" aria-labelledby="episodes-heading" className="scroll-mt-20 bg-paper py-14 md:py-20">
        <Container>
          <h2 id="episodes-heading" className="heading-display text-[2rem] md:text-[2.5rem]">{t('episodes.heading')}</h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
            {/* Player */}
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-ink-deep">
                {playing ? (
                  <iframe
                    key={episode.youtubeLink}
                    src={`https://www.youtube-nocookie.com/embed/${videoId(episode.youtubeLink)}?autoplay=1&rel=0`}
                    title={episode.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="focus-ring group absolute inset-0 h-full w-full"
                    aria-label={`${t('episodes.play')}: ${episode.title}`}
                  >
                    <img src={episode.image} alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rust text-white transition-colors group-hover:bg-rust-deep md:h-20 md:w-20">
                        <Play className="ml-1 h-7 w-7 md:h-8 md:w-8" fill="currentColor" />
                      </span>
                    </span>
                  </button>
                )}
              </div>

              <div className="mt-6" aria-live="polite">
                <p className="text-sm font-semibold text-rust">
                  {t('episodes.episode', { number: episode.number })}
                </p>
                <h3 className="mt-1 font-display text-[1.5rem] font-bold leading-tight text-ink md:text-[1.75rem]">{episode.title}</h3>
                <p className="mt-1 font-medium text-text">{t('episodes.with')} {episode.guest}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{episode.description}</p>
                <a
                  href={episode.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial focus-ring mt-4 inline-flex items-center gap-1.5"
                >
                  {t('episodes.watchOnYoutube')}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Episode list */}
            <div>
              <h3 className="font-display text-lg font-bold text-ink">{t('episodes.allEpisodes')}</h3>
              <ol className="mt-3 border-t border-line">
                {episodes.map((ep, i) => {
                  const active = i === current;
                  return (
                    <li key={ep.youtubeLink} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => select(i)}
                        aria-current={active ? 'true' : undefined}
                        className={`focus-ring grid w-full grid-cols-[7.5rem_1fr] items-start gap-4 border-l-4 py-4 pl-3 pr-2 text-left transition-colors ${
                          active ? 'border-l-rust bg-white' : 'border-l-transparent hover:bg-white'
                        }`}
                      >
                        <img src={ep.image} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold text-muted">
                            {active && playing ? t('episodes.nowPlaying') : t('episodes.episode', { number: ep.number })}
                          </span>
                          <span className={`mt-0.5 block font-display font-bold leading-snug ${active ? 'text-rust' : 'text-ink'}`}>
                            {ep.title}
                          </span>
                          <span className="mt-0.5 block text-sm text-muted">{ep.guest}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <section aria-labelledby="about-heading" className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-7">
              <p className="text-sm font-semibold text-rust">{t('about.eyebrow')}</p>
              <h2 id="about-heading" className="heading-display mt-2 text-[2rem] md:text-[2.5rem]">{t('about.heading')}</h2>
              <div className="prose-lead mt-6 space-y-4">
                <p>{t('about.para1')}</p>
                <p>{t('about.para2')}</p>
              </div>
            </div>
            <div className="md:col-span-5">
              <img src="/podcastimage.png" alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* Subscribe */}
      <section className="bg-ink py-16 text-white md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h2 className="heading-display !text-white text-[2rem] md:text-[2.75rem]">{t('subscribe.heading')}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-dark">{t('subscribe.subtitle')}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href={`${CHANNEL_URL}?sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-[2px] border border-white bg-white px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:border-sand hover:bg-sand"
              >
                {t('subscribe.cta')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default GulfSpectrumPodcast;
