import React from 'react';
import { useTranslation } from 'react-i18next';

// First stop for keyboard users: jumps past the navigation to the page content.
// Hidden until it receives focus. Focus is moved by script rather than a #hash link,
// because a hash change would trigger the scroll-to-top-on-navigate behaviour.
const SkipLink = () => {
  const { t } = useTranslation('common');

  const skip = (e) => {
    e.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.focus({ preventScroll: true });
      main.scrollIntoView();
    }
  };

  return (
    <a
      href="#main-content"
      onClick={skip}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#8E3400]/40"
      style={{ backgroundColor: '#132552', color: '#FFFFFF', fontWeight: 700 }}
    >
      {t('nav.skipToContent')}
    </a>
  );
};

export default SkipLink;
