import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Download, Info, AlertTriangle, Award } from 'lucide-react';
import { Container } from '../ui/Editorial';

/*
  Member dashboard, laid out with IBM Carbon patterns: a plain page header
  with a status tag, an inline notification when the membership needs
  attention, structured label/value lists, a certificate tile and
  clickable tiles for the next steps.
*/

// Carbon-style tags: tinted fill, dark text, square-ish corners.
const TAG_STYLES = {
  active: 'bg-[#E3F1E7] text-success',
  pending: 'bg-[#FBEBD3] text-[#6B4200]',
  expired: 'bg-[#F9E1DF] text-error',
  cancelled: 'bg-[#E8E8E8] text-muted',
};

const StatusTag = ({ status }) => {
  const { t } = useTranslation('memberDashboard');
  const key = TAG_STYLES[status] ? status : 'pending';
  return (
    <span className={`inline-flex items-center rounded-[2px] px-2.5 py-1 text-sm font-semibold ${TAG_STYLES[key]}`}>
      {t(`status.${key}`)}
    </span>
  );
};

const formatDate = (d, lang) => {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date)) return d;
  return date.toLocaleDateString(!lang || lang === 'en' ? 'en-GB' : lang, { day: 'numeric', month: 'long', year: 'numeric' });
};

const daysRemaining = (expiry) => {
  if (!expiry) return null;
  const diff = new Date(expiry).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Structured list: one row per field, label column on the left.
const StructuredList = ({ id, title, rows }) => (
  <section aria-labelledby={id} className="border border-line bg-white">
    <h2 id={id} className="border-b border-line px-5 py-4 text-lg font-bold text-ink">{title}</h2>
    <dl>
      {rows.map(({ label, value }) => (
        <div key={label} className="grid gap-1 border-b border-line px-5 py-3.5 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-4">
          <dt className="text-sm text-muted">{label}</dt>
          <dd className="break-words font-medium text-text">{value || '—'}</dd>
        </div>
      ))}
    </dl>
  </section>
);

// Inline notification with a coloured left border, as in Carbon.
const Notice = ({ tone, title, children }) => {
  const warn = tone === 'warning';
  const Icon = warn ? AlertTriangle : Info;
  return (
    <div
      role="status"
      className={`flex gap-3 border border-l-4 bg-white px-5 py-4 ${warn ? 'border-line border-l-error' : 'border-line border-l-ink'}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${warn ? 'text-error' : 'text-ink'}`} aria-hidden="true" />
      <div>
        <p className="font-bold text-text">{title}</p>
        <div className="mt-1 text-muted">{children}</div>
      </div>
    </div>
  );
};

const MemberDashboard = () => {
  const { t, i18n } = useTranslation('memberDashboard');
  const { isAuthenticated, user, membership } = useAuth();
  const [certUrl, setCertUrl] = useState(null);
  const [certChecked, setCertChecked] = useState(false);

  useEffect(() => {
    if (!membership?.membership_id) {
      setCertChecked(true);
      return;
    }
    const url = `/resources/certificates/${membership.membership_id}.pdf`;
    let cancelled = false;
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        // The site's SPA rewrite (vercel.json) serves index.html with a 200
        // for any unmatched path, so a missing PDF looks "ok" too — only
        // trust it if the response is actually a PDF.
        const isRealPdf = res.ok && (res.headers.get('content-type') || '').includes('pdf');
        setCertUrl(isRealPdf ? url : null);
        setCertChecked(true);
      })
      .catch(() => {
        if (!cancelled) setCertChecked(true);
      });
    return () => { cancelled = true; };
  }, [membership?.membership_id]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const lang = i18n.resolvedLanguage;
  const remaining = daysRemaining(membership?.expiry_date);
  const status = membership?.status;
  const type = membership?.membership_type
    ? membership.membership_type[0].toUpperCase() + membership.membership_type.slice(1)
    : null;

  // Which notification (if any) to show above the details.
  let notice = null;
  if (status === 'expired' || (typeof remaining === 'number' && remaining <= 0)) {
    notice = { tone: 'warning', key: 'expired' };
  } else if (status === 'pending') {
    notice = { tone: 'info', key: 'pending' };
  } else if (typeof remaining === 'number' && remaining <= 30) {
    notice = { tone: 'warning', key: 'expiring' };
  }

  const profileRows = [
    { label: t('profile.email'), value: user?.email },
    { label: t('profile.phone'), value: user?.phone },
    { label: t('profile.country'), value: user?.country },
    { label: t('profile.organization'), value: user?.organization },
    { label: t('profile.position'), value: user?.position },
  ];

  const membershipRows = [
    { label: t('membership.membershipId'), value: membership?.membership_id },
    { label: t('membership.status'), value: status ? <StatusTag status={status} /> : null },
    { label: t('membership.type'), value: type },
    { label: t('membership.expires'), value: formatDate(membership?.expiry_date, lang) },
  ];
  if (typeof remaining === 'number') {
    membershipRows.push({
      label: t('membership.timeRemaining'),
      value: remaining > 0 ? t('membership.daysLeft', { count: remaining }) : t('membership.expired'),
    });
  }

  const tiles = [
    { to: '/resources', title: t('quickLinks.resources.title'), description: t('quickLinks.resources.description') },
    { to: '/membership', title: t('quickLinks.membership.title'), description: t('quickLinks.membership.description') },
  ];

  return (
    <div className="bg-paper">
      {/* Page header */}
      <header className="border-b border-line bg-white">
        <Container className="pb-8 pt-[120px] md:pb-10 md:pt-[150px]">
          <p className="text-sm font-semibold text-rust">{t('header.eyebrow')}</p>
          <h1 className="heading-display mt-2 break-words text-[2.25rem] md:text-[3rem]">{user?.full_name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
            {status && <StatusTag status={status} />}
            <span>{membership?.plan_name || t('header.defaultPlanName')}</span>
            {membership?.membership_id && (
              <span>
                {t('membership.membershipId')}: <span className="font-semibold text-text">{membership.membership_id}</span>
              </span>
            )}
          </div>
        </Container>
      </header>

      <Container className="py-10 md:py-14">
        {notice && (
          <div className="mb-8">
            <Notice tone={notice.tone} title={t(`notice.${notice.key}.title`)}>
              <p>{t(`notice.${notice.key}.body`, { count: remaining })}</p>
              {notice.key !== 'pending' && (
                <Link to="/membership" className="link-editorial focus-ring mt-2 inline-block font-semibold">
                  {t('notice.renew')}
                </Link>
              )}
            </Notice>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <StructuredList id="membership-heading" title={t('membership.heading')} rows={membershipRows} />
          <StructuredList id="profile-heading" title={t('profile.heading')} rows={profileRows} />
        </div>

        {/* Certificate tile */}
        <section aria-labelledby="certificate-heading" className="mt-6 border border-line bg-white p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <Award className={`mt-1 h-6 w-6 flex-shrink-0 ${certUrl ? 'text-rust' : 'text-muted'}`} aria-hidden="true" />
              <div>
                <h2 id="certificate-heading" className="text-lg font-bold text-ink">{t('certificate.heading')}</h2>
                <p className="mt-1 max-w-xl text-muted">
                  {certUrl ? t('certificate.readyDescription') : t('certificate.pendingDescription')}
                </p>
              </div>
            </div>
            {certUrl ? (
              <a
                href={certUrl}
                download
                className="focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] border border-ink bg-ink px-5 py-3 font-semibold text-white transition-colors duration-150 hover:border-rust hover:bg-rust"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t('certificate.download')}
              </a>
            ) : (
              <p className="whitespace-nowrap text-sm font-semibold text-muted">
                {certChecked ? t('certificate.comingSoon') : t('certificate.checking')}
              </p>
            )}
          </div>
        </section>

        {/* Clickable tiles */}
        <nav aria-label={t('quickLinks.label')} className="mt-6">
          <ul className="grid gap-6 sm:grid-cols-2">
            {tiles.map((tile) => (
              <li key={tile.to}>
                <Link
                  to={tile.to}
                  className="focus-ring group flex h-full flex-col border border-line bg-white p-5 transition-colors duration-150 hover:border-ink hover:bg-[#EEF0F5] md:p-6"
                >
                  <span className="text-lg font-bold text-ink">{tile.title}</span>
                  <span className="mt-1 text-muted">{tile.description}</span>
                  <ArrowRight className="mt-6 h-5 w-5 self-end text-rust" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default MemberDashboard;
