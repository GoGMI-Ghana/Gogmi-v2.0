import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container } from './ui/Editorial';

const API_URL = 'https://api.gogmi.org.gh/api';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gulf-of-guinea-maritime-institute/', Icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com/GoGMI_Official', Icon: Twitter },
  { label: 'Facebook', href: 'https://www.facebook.com/GoGMI.Official', Icon: Facebook },
  { label: 'YouTube', href: 'https://www.youtube.com/@GoGMI_Official', Icon: Youtube },
  { label: 'WhatsApp', href: 'https://www.youtube.com/@gulfofguineamaritimeinstitute', Icon: MessageCircle }
];

const FooterLinks = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-white">{title}</h3>
    <ul className="mt-4 space-y-3">
      {links.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className="focus-ring text-[0.9375rem] text-on-dark underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const { t } = useTranslation('common');
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [subMsg, setSubMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subEmail) return;
    setSubStatus('loading');
    try {
      const res = await fetch(`${API_URL}/courses/hubspot-subscribe.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setSubStatus('success');
        setSubMsg(t('footer.subscribeSuccess'));
        setSubEmail('');
      } else {
        setSubStatus('error');
        setSubMsg(data.message || t('footer.subscribeError'));
      }
    } catch {
      setSubStatus('error');
      setSubMsg(t('footer.subscribeErrorGeneric'));
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep font-body text-white">
      <Container className="py-16 md:py-20">
        {/* Brand and newsletter */}
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <Link to="/" className="focus-ring inline-flex items-center gap-4">
              <img src="/GoGMI_PNG.png" alt="" className="h-14 w-14 object-contain" />
              <span>
                <span className="block font-display text-[1.625rem] font-semibold leading-tight">{t('brand.name')}</span>
                <span className="block text-sm text-on-dark">{t('footer.tagline')}</span>
              </span>
            </Link>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <h3 className="font-display text-xl font-semibold">{t('footer.subscribeNewsletter')}</h3>
            {subStatus === 'success' ? (
              <p className="mt-4 text-sm font-semibold text-sand" role="status">{subMsg}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <label htmlFor="footer-newsletter-email" className="mb-2 block text-sm text-on-dark">
                  {t('footer.emailPlaceholder')}
                </label>
                <div className="flex gap-2">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    autoComplete="email"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    required
                    disabled={subStatus === 'loading'}
                    aria-describedby={subStatus === 'error' ? 'footer-newsletter-error' : undefined}
                    className="min-w-0 flex-1 rounded-[2px] border border-white/40 bg-transparent px-4 py-3 text-[0.9375rem] text-white placeholder:text-on-dark focus:border-white focus:outline-none focus:ring-2 focus:ring-sand"
                  />
                  <button
                    type="submit"
                    disabled={subStatus === 'loading'}
                    className="focus-ring whitespace-nowrap rounded-[2px] border border-white bg-white px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-sand hover:bg-sand disabled:opacity-60"
                  >
                    {subStatus === 'loading' ? t('footer.subscribing') : t('footer.subscribe')}
                  </button>
                </div>
                {subStatus === 'error' && (
                  <p id="footer-newsletter-error" className="mt-2 text-sm text-[#FCA5A5]" role="alert">{subMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-12">
          <div className="md:col-span-3">
            <FooterLinks
              title={t('footer.quickLinks')}
              links={[
                { name: t('footer.home'), path: '/' },
                { name: t('footer.aboutUs'), path: '/about' },
                { name: t('footer.membership'), path: '/Membership' },
                { name: t('footer.blueBusinessDirectory'), path: '/blue-business-directory' }
              ]}
            />
          </div>
          <div className="md:col-span-3">
            <FooterLinks
              title={t('footer.resources')}
              links={[
                { name: t('footer.library'), path: '/Resources' },
                { name: t('footer.newsBlogs'), path: '/blog' },
                { name: t('footer.contact'), path: '/contact' },
                { name: t('footer.careers'), path: '/CareersOpportunities' },
                { name: t('footer.partners'), path: '/partners' }
              ]}
            />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <h3 className="text-sm font-semibold text-white">{t('footer.connectWithUs')}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="focus-ring flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/25 text-on-dark transition-colors hover:border-white hover:text-white"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-white/15 pt-8 text-sm text-on-dark md:flex-row md:items-center md:justify-between">
          <p>{t('footer.copyright').replace(/\b20\d\d\b/, String(year))}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to="/privacy" className="focus-ring hover:text-white hover:underline">{t('footer.privacyPolicy')}</Link></li>
            <li><Link to="/terms" className="focus-ring hover:text-white hover:underline">{t('footer.termsOfService')}</Link></li>
            <li><Link to="/sitemap" className="focus-ring hover:text-white hover:underline">{t('footer.sitemap')}</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
