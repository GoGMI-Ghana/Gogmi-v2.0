import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container } from './Editorial';
import { Field, ErrorSummary, inputClass, describedBy } from './Form';

/*
  Registration form for an IMSWG quarterly forum, using GOV.UK patterns:
  back link, one-column form with labels above fields, error summary,
  confirmation panel, and a plain "registration closed" page.

  Each forum page passes its own translation namespace (same key layout),
  the API endpoint and whether registration is closed.
*/

const EMPTY = { fullName: '', email: '', whatsappNumber: '', country: '', position: '', institution: '' };
const FIELD_ORDER = ['fullName', 'email', 'country', 'position'];

const BackLink = ({ children }) => (
  <Link
    to="/imswg"
    className="focus-ring inline-flex items-center gap-1 text-[0.9375rem] text-text underline underline-offset-2 hover:decoration-2"
  >
    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
    {children}
  </Link>
);

const ForumRegistration = ({ ns, endpoint, closed = false }) => {
  const { t } = useTranslation(ns);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (submitted) panelRef.current?.focus();
  }, [submitted]);

  const id = (name) => `forum-${name}`;
  const errPrefix = t('form.errorPrefix');

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = t('errors.fullNameRequired');
    if (!form.email.trim()) e.email = t('errors.emailRequired');
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = t('errors.emailInvalid');
    if (!form.country.trim()) e.country = t('errors.countryRequired');
    if (!form.position.trim()) e.position = t('errors.positionRequired');
    return e;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    setSubmitError('');
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || t('errors.submitFailed'));
      setSubmitted(true);
      setForm(EMPTY);
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError(t('errors.submitFailedFallback'));
    } finally {
      setSubmitting(false);
    }
  };

  const summaryItems = [
    ...FIELD_ORDER.filter((f) => errors[f]).map((f) => ({ id: id(f), message: errors[f] })),
    ...(submitError ? [{ id: id('submit'), message: submitError }] : []),
  ];

  const enquiry = (
    <p className="mt-4 text-[1.1875rem] leading-relaxed">
      {t('closed.enquiryPrefix')}{' '}
      <a href="mailto:info@gogmi.org.gh" className="link-editorial focus-ring">info@gogmi.org.gh</a>
    </p>
  );

  let body;
  if (closed) {
    body = (
      <>
        <p className="text-[1.1875rem] text-muted">{t('form.title')}</p>
        <h1 className="heading-display mt-2 text-[2.25rem] md:text-[2.75rem]">{t('closed.heading')}</h1>
        <p className="mt-6 text-[1.1875rem] leading-relaxed">{t('closed.body')}</p>
        {enquiry}
        <Link
          to="/imswg"
          className="focus-ring mt-8 inline-flex items-center justify-center rounded-[2px] border-b-2 border-ink-deep bg-ink px-6 py-3 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-rust"
        >
          {t('closed.backButton')}
        </Link>
      </>
    );
  } else if (submitted) {
    body = (
      <div ref={panelRef} tabIndex={-1} className="focus:outline focus:outline-[3px] focus:outline-sand">
        <div className="bg-success px-6 py-8 text-center text-white">
          <h1 className="text-[2rem] font-bold leading-tight md:text-[2.5rem]">{t('success.heading')}</h1>
          <p className="mt-3 text-[1.1875rem]">{t('form.title')}</p>
        </div>
        <h2 className="mt-8 font-display text-[1.5rem] font-bold text-ink">{t('form.whatNext')}</h2>
        <p className="mt-3 text-[1.1875rem] leading-relaxed">{t('success.body2')}</p>
        <p className="mt-3 text-[1.1875rem] leading-relaxed">{t('success.body1')}</p>
        <p className="mt-6">
          <Link to="/imswg" className="link-editorial focus-ring">{t('success.backButton')}</Link>
        </p>
      </div>
    );
  } else {
    body = (
      <>
        {summaryItems.length > 0 && (
          <div className="mb-8">
            <ErrorSummary title={t('form.errorSummary')} items={summaryItems} />
          </div>
        )}

        <p className="text-[1.1875rem] text-muted">{t('form.subtitle')}</p>
        <h1 className="heading-display mt-2 text-[2.25rem] md:text-[2.75rem]">{t('form.title')}</h1>
        <p className="mt-4 text-[1.1875rem] leading-relaxed">{t('form.intro')}</p>

        <form onSubmit={onSubmit} noValidate className="mt-10">
          <fieldset>
            <legend className="font-display text-[1.5rem] font-bold text-ink">{t('form.personalInfo.heading')}</legend>
            <div className="mt-6 space-y-7">
              <Field id={id('fullName')} label={t('form.personalInfo.fullNameLabel')} error={errors.fullName} errorPrefix={errPrefix}>
                <input
                  id={id('fullName')} name="fullName" type="text" autoComplete="name" spellCheck={false}
                  value={form.fullName} onChange={onChange}
                  aria-describedby={describedBy(id('fullName'), { error: errors.fullName })}
                  aria-invalid={!!errors.fullName || undefined}
                  className={inputClass(!!errors.fullName)}
                />
              </Field>

              <Field id={id('email')} label={t('form.personalInfo.emailLabel')} hint={t('form.personalInfo.emailHint')} error={errors.email} errorPrefix={errPrefix}>
                <input
                  id={id('email')} name="email" type="email" autoComplete="email" spellCheck={false}
                  value={form.email} onChange={onChange}
                  aria-describedby={describedBy(id('email'), { hint: true, error: errors.email })}
                  aria-invalid={!!errors.email || undefined}
                  className={inputClass(!!errors.email)}
                />
              </Field>

              <Field id={id('whatsappNumber')} label={t('form.personalInfo.whatsappLabel')} hint={t('form.personalInfo.whatsappHint')} optionalText={t('form.optional')}>
                <input
                  id={id('whatsappNumber')} name="whatsappNumber" type="tel" autoComplete="tel"
                  value={form.whatsappNumber} onChange={onChange}
                  aria-describedby={describedBy(id('whatsappNumber'), { hint: true })}
                  className={inputClass(false, 'max-w-sm')}
                />
              </Field>

              <Field id={id('country')} label={t('form.personalInfo.countryLabel')} error={errors.country} errorPrefix={errPrefix}>
                <input
                  id={id('country')} name="country" type="text" autoComplete="country-name"
                  value={form.country} onChange={onChange}
                  aria-describedby={describedBy(id('country'), { error: errors.country })}
                  aria-invalid={!!errors.country || undefined}
                  className={inputClass(!!errors.country, 'max-w-sm')}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="mt-12">
            <legend className="font-display text-[1.5rem] font-bold text-ink">{t('form.professionalInfo.heading')}</legend>
            <div className="mt-6 space-y-7">
              <Field id={id('position')} label={t('form.professionalInfo.positionLabel')} hint={t('form.professionalInfo.positionHint')} error={errors.position} errorPrefix={errPrefix}>
                <input
                  id={id('position')} name="position" type="text" autoComplete="organization-title"
                  value={form.position} onChange={onChange}
                  aria-describedby={describedBy(id('position'), { hint: true, error: errors.position })}
                  aria-invalid={!!errors.position || undefined}
                  className={inputClass(!!errors.position)}
                />
              </Field>

              <Field id={id('institution')} label={t('form.professionalInfo.institutionLabel')} optionalText={t('form.optional')}>
                <input
                  id={id('institution')} name="institution" type="text" autoComplete="organization"
                  value={form.institution} onChange={onChange}
                  className={inputClass(false)}
                />
              </Field>
            </div>
          </fieldset>

          <p className="mt-10 text-[1.0625rem] text-muted">{t('form.consent')}</p>

          {submitError && (
            <p id={id('submit')} tabIndex={-1} className="mt-6 border-l-[5px] border-error pl-4 font-bold text-error">
              <span className="sr-only">{errPrefix} </span>{submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="focus-ring mt-6 inline-flex items-center justify-center rounded-[2px] border-b-2 border-ink-deep bg-ink px-6 py-3 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-rust disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t('form.submitting') : t('form.submitButton')}
          </button>
        </form>
      </>
    );
  }

  return (
    <div className="w-full bg-paper font-body text-text">
      <Container className="pb-20 pt-[120px] md:pb-28 md:pt-[150px]">
        <div className="max-w-2xl">
          <BackLink>{t('form.backButton')}</BackLink>
          <div className="mt-6 border border-line bg-white px-6 py-8 md:px-10 md:py-10">{body}</div>
        </div>
      </Container>
    </div>
  );
};

export default ForumRegistration;
