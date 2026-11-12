import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container, SectionHeader, PageHero } from '../ui/Editorial';

/*
  Contact form follows the GOV.UK form pattern:
  labels above fields, optional fields marked instead of required ones,
  an error summary that links to each problem, and inline errors on the fields.
*/

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };
const SUBJECTS = ['general', 'partnership', 'training', 'research', 'membership', 'other'];

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://gh.linkedin.com/company/gulf-of-guinea-maritime-institute', Icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com/GoGMI_Official', Icon: Twitter },
  { label: 'Facebook', href: 'https://www.facebook.com/GoGMIofficial/', Icon: Facebook },
  { label: 'YouTube', href: 'https://www.youtube.com/@GoGMI_Official', Icon: Youtube }
];

// Field order, used for the error summary.
const FIELD_ORDER = ['name', 'email', 'subject', 'message'];

const INPUT =
  'block w-full rounded-[2px] border-2 bg-white px-3 py-2.5 text-[1.0625rem] text-text ' +
  'focus:border-text focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sand';

// Labels in the locale files end with " *"; GOV.UK marks optional fields instead.
const plainLabel = (label) => label.replace(/\s*\*\s*$/, '');

const Field = ({ id, label, hint, optionalText, error, errorPrefix, children }) => (
  <div className={`${error ? 'border-l-[5px] border-error pl-4' : ''}`}>
    <label htmlFor={id} className="block text-[1.0625rem] font-bold text-text">
      {label}
      {optionalText && <span className="font-normal text-muted"> {optionalText}</span>}
    </label>
    {hint && <p id={`${id}-hint`} className="mt-1 text-[0.9375rem] text-muted">{hint}</p>}
    {error && (
      <p id={`${id}-error`} className="mt-1 text-[1.0625rem] font-bold text-error">
        <span className="sr-only">{errorPrefix} </span>{error}
      </p>
    )}
    <div className="mt-2">{children}</div>
  </div>
);

const Contact = () => {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const summaryRef = useRef(null);
  const successRef = useRef(null);

  // Move focus to the error summary or success banner when either appears.
  useEffect(() => {
    if (Object.keys(errors).length) summaryRef.current?.focus();
  }, [errors]);
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const validateForm = () => {
    const e = {};
    if (!formData.name.trim()) e.name = t('form.errors.name');
    if (!formData.email.trim()) e.email = t('form.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = t('form.errors.emailInvalid');
    if (!formData.subject) e.subject = t('form.errors.subject');
    if (!formData.message.trim()) e.message = t('form.errors.messageRequired');
    else if (formData.message.trim().length < 10) e.message = t('form.errors.messageTooShort');
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    try {
      const response = await fetch('https://gogmi.org.gh/api/contact-handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Failed to send message');

      setSubmitted(true);
      setFormData(EMPTY);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: t('form.errors.submitFallback') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusField = (event, field) => {
    event.preventDefault();
    const el = document.getElementById(`contact-${field}`);
    if (el) {
      el.scrollIntoView({ block: 'center' });
      el.focus();
    }
  };

  const describedBy = (field, hint) =>
    [hint && `contact-${field}-hint`, errors[field] && `contact-${field}-error`].filter(Boolean).join(' ') || undefined;

  const fieldClass = (field) => `${INPUT} ${errors[field] ? 'border-error' : 'border-text'}`;

  const methods = [
    { key: 'call', Icon: Phone, href: `tel:${t('cards.call.info').replace(/\s+/g, '')}` },
    { key: 'email', Icon: Mail, href: `mailto:${t('cards.email.info')}` },
    { key: 'visit', Icon: MapPin, href: '#contact-map' }
  ];

  const fieldErrors = FIELD_ORDER.filter((f) => errors[f]);

  return (
    <div className="w-full font-body text-text">
      {/* PAGE HEADER: photograph hero */}
      <PageHero image="/contactus.jpg" eyebrow={t('badge')} title={t('title')} subtitle={t('subtitle')} />

      {/* WAYS TO REACH US */}
      <section className="border-b border-line bg-white" aria-label={t('badge')}>
        <Container>
          <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {methods.map(({ key, Icon, href }) => (
              <li key={key} className="py-8 md:px-8 md:first:pl-0">
                <Icon className="h-6 w-6 text-rust" aria-hidden="true" />
                <h2 className="mt-3 text-sm font-semibold text-muted">{t(`cards.${key}.title`)}</h2>
                <a href={href} className="link-editorial focus-ring mt-1 inline-block text-[1.125rem] font-semibold">
                  {t(`cards.${key}.info`)}
                </a>
                <p className="mt-1 text-[0.9375rem] text-muted">{t(`cards.${key}.subinfo`)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FORM beside office details */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h2 className="heading-display text-[2rem] md:text-[2.5rem]">{t('form.heading')}</h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{t('form.description')}</p>

              {submitted && (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  className="mt-8 border-[5px] border-success focus:outline focus:outline-[3px] focus:outline-sand"
                >
                  <p className="bg-success px-4 py-2 font-bold text-white">{t('form.successHeading')}</p>
                  <p className="px-4 py-4 text-[1.0625rem] text-text">{t('form.successMessage')}</p>
                </div>
              )}

              {(fieldErrors.length > 0 || errors.submit) && (
                <div
                  ref={summaryRef}
                  tabIndex={-1}
                  role="alert"
                  aria-labelledby="contact-error-summary"
                  className="mt-8 border-[5px] border-error p-5 focus:outline focus:outline-[3px] focus:outline-sand"
                >
                  <h3 id="contact-error-summary" className="text-[1.25rem] font-bold text-text">{t('form.errorSummary')}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {fieldErrors.map((field) => (
                      <li key={field}>
                        <a
                          href={`#contact-${field}`}
                          onClick={(e) => focusField(e, field)}
                          className="font-bold text-error underline underline-offset-2 hover:decoration-2"
                        >
                          {errors[field]}
                        </a>
                      </li>
                    ))}
                    {errors.submit && <li className="font-bold text-error">{errors.submit}</li>}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-8">
                <Field id="contact-name" label={plainLabel(t('form.nameLabel'))} error={errors.name} errorPrefix={t('form.errorPrefix')}>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    spellCheck="false"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={describedBy('name')}
                    className={`${fieldClass('name')} max-w-xl`}
                  />
                </Field>

                <Field id="contact-email" label={plainLabel(t('form.emailLabel'))} error={errors.email} errorPrefix={t('form.errorPrefix')}>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck="false"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={describedBy('email')}
                    className={`${fieldClass('email')} max-w-md`}
                  />
                </Field>

                <Field id="contact-phone" label={plainLabel(t('form.phoneLabel'))} optionalText={t('form.optional')}>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${fieldClass('phone')} max-w-xs`}
                  />
                </Field>

                <Field id="contact-subject" label={plainLabel(t('form.subjectLabel'))} error={errors.subject} errorPrefix={t('form.errorPrefix')}>
                  <div className="relative max-w-md">
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      aria-invalid={!!errors.subject}
                      aria-describedby={describedBy('subject')}
                      className={`${fieldClass('subject')} appearance-none pr-10`}
                    >
                      <option value="">{t('form.subjectPlaceholder')}</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{t(`form.subjectOptions.${s}`)}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text" aria-hidden="true" />
                  </div>
                </Field>

                <Field
                  id="contact-message"
                  label={plainLabel(t('form.messageLabel'))}
                  hint={t('form.messageHint')}
                  error={errors.message}
                  errorPrefix={t('form.errorPrefix')}
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={describedBy('message', true)}
                    className={`${fieldClass('message')} max-w-2xl resize-y`}
                  ></textarea>
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="focus-ring inline-flex items-center gap-2 rounded-[2px] border-b-2 border-ink-deep bg-ink px-6 py-3 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-rust disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? t('form.sending') : t('form.send')}
                </button>
              </form>
            </div>

            {/* Office details */}
            <aside className="space-y-12 lg:col-span-4 lg:col-start-9">
              <div>
                <h2 className="border-b-2 border-ink pb-3 text-[1.25rem] font-bold text-ink">{t('officeHours.heading')}</h2>
                <dl>
                  {t('officeHours.schedule', { returnObjects: true }).map((row) => (
                    <div key={row.days} className="flex justify-between gap-4 border-b border-line py-3">
                      <dt className="font-semibold text-text">{row.days}</dt>
                      <dd className="text-right text-muted">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div id="contact-map" className="scroll-mt-24">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8267995654284!2d-0.1969654!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1234567890"
                  className="h-72 w-full rounded-[2px] border border-line"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('form.mapTitle')}
                ></iframe>
                <p className="mt-3 text-[0.9375rem] text-muted">
                  {t('cards.visit.info')}, {t('cards.visit.subinfo')}
                </p>
              </div>

              <div>
                <h2 className="border-b-2 border-ink pb-3 text-[1.25rem] font-bold text-ink">{t('social.heading')}</h2>
                <p className="mt-3 text-muted">{t('social.subtitle')}</p>
                <ul className="mt-4 space-y-2">
                  {SOCIAL.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="link-editorial focus-ring inline-flex items-center gap-3 font-semibold">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <span>{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* FAQ: GOV.UK-style expandable answers */}
      <section className="bg-paper py-16 md:py-24" aria-labelledby="contact-faq">
        <Container>
          <SectionHeader id="contact-faq" title={t('faq.heading')} intro={t('faq.subtitle')} />
          <div className="mt-10 max-w-3xl border-t border-line">
            {t('faq.items', { returnObjects: true }).map((faq) => (
              <details key={faq.q} className="group border-b border-line">
                <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.125rem] font-bold text-ink hover:text-rust [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <ChevronDown className="mt-1 h-5 w-5 flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-2xl pb-6 text-[1.0625rem] leading-relaxed text-text">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
