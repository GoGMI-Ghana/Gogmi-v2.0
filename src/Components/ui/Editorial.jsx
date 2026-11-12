import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/*
  Shared building blocks for the editorial redesign.
  Rules of the system:
  - Headings and text both use Public Sans (font-display / font-body).
  - Corners are 2px, borders are 1px hairlines (border-line); no drop shadows or hover scaling.
  - Colours come from the tokens in index.css, never hard-coded hex values.
  - Interactive elements always show a visible focus outline.
*/

const isExternal = (to) => /^(https?:)?\/\//.test(to) || to.startsWith('mailto:') || to.startsWith('tel:');

// Renders a router Link for internal paths and a plain anchor for external ones.
export const SmartLink = ({ to, children, ...props }) => {
  if (isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export const Container = ({ className = '', children, as: Tag = 'div' }) => (
  <Tag className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 ${className}`}>{children}</Tag>
);

/*
  Section header: a hairline rule, the serif title on the left and an optional
  short introduction (and link) on the right. Stacks on small screens.
*/
export const SectionHeader = ({ title, intro, action, id, tone = 'light', className = '' }) => {
  const dark = tone === 'dark';
  return (
    <div className={`grid gap-6 border-t pt-6 md:grid-cols-12 md:gap-10 ${dark ? 'border-white/25' : 'border-line'} ${className}`}>
      <h2
        id={id}
        className={`heading-display text-[2rem] md:col-span-5 md:text-[2.5rem] ${dark ? '!text-white' : ''}`}
      >
        {title}
      </h2>
      {(intro || action) && (
        <div className="md:col-span-6 md:col-start-7 md:pt-2">
          {intro && (
            <p className={`text-lg leading-relaxed ${dark ? 'text-on-dark' : 'text-muted'}`}>{intro}</p>
          )}
          {action && <div className="mt-4">{action}</div>}
        </div>
      )}
    </div>
  );
};

const BUTTON_STYLES = {
  primary: 'bg-ink text-white border-ink hover:bg-rust hover:border-rust',
  secondary: 'bg-transparent text-ink border-ink hover:bg-ink hover:text-white',
  onDark: 'bg-white text-ink border-white hover:bg-sand hover:border-sand',
  outlineOnDark: 'bg-transparent text-white border-white/70 hover:bg-white hover:text-ink hover:border-white'
};

export const Button = ({ to, variant = 'primary', children, className = '', ...props }) => (
  <SmartLink
    to={to}
    className={`focus-ring inline-flex items-center gap-2 rounded-[2px] border px-5 py-3 font-body text-[0.9375rem] font-semibold transition-colors duration-150 ${BUTTON_STYLES[variant]} ${className}`}
    {...props}
  >
    {children}
  </SmartLink>
);

// Underlined text link with a trailing arrow, for "read more" style actions.
export const TextLink = ({ to, children, className = '', ...props }) => (
  <SmartLink to={to} className={`link-editorial inline-flex items-center gap-2 ${className}`} {...props}>
    <span>{children}</span>
    <ArrowRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
  </SmartLink>
);

/*
  Photo page hero: a full-width photograph under a navy scrim, with the
  title, introduction and actions in white on the left.
*/
export const PageHero = ({ image, alt = '', position = '50% 50%', eyebrow, title, subtitle, children }) => (
  <header className="relative overflow-hidden bg-ink-deep text-white">
    <img
      src={image}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: position }}
    />
    <div className="absolute inset-0 bg-ink-deep/75 md:hidden" aria-hidden="true"></div>
    <div
      className="absolute inset-0 hidden md:block"
      style={{ background: 'linear-gradient(90deg, rgba(12,25,56,0.9) 0%, rgba(12,25,56,0.7) 50%, rgba(12,25,56,0.25) 100%)' }}
      aria-hidden="true"
    ></div>
    <Container className="relative pb-16 pt-[140px] md:pb-24 md:pt-[180px]">
      <div className="max-w-3xl">
        {eyebrow && <div className="text-sm font-semibold text-sand">{eyebrow}</div>}
        <h1 className="heading-display mt-3 !text-white text-[2.75rem] md:text-[4rem]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </Container>
  </header>
);
