import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { Container } from '../ui/Editorial';
import { Field, ErrorSummary, inputClass, describedBy } from '../ui/Form';

/*
  IMSWG expression-of-interest form, using GOV.UK patterns: back link,
  one-column form, error summary, character count on the bio, checkboxes
  for areas of interest and a confirmation panel.
*/

const ENDPOINT = 'https://api.gogmi.org.gh/api/imswg-signup.php';
const BIO_MAX = 500;
const INTEREST_IDS = [
  'become_mentor', 'join_panel', 'speak_events', 'contribute_projects',
  'support_fundraising', 'join_membership', 'partner_with_us',
];
const FIELD_ORDER = ['fullName', 'email', 'country', 'position', 'bio', 'areasOfInterest'];
const EMPTY = { fullName: '', email: '', whatsappNumber: '', country: '', position: '', institution: '', bio: '', areasOfInterest: [] };

const IMSWGsignup = () => {
  const { t } = useTranslation('imswgSignup');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (submitted) panelRef.current?.focus();
  }, [submitted]);

  const options = t('interests.options', { returnObjects: true });
  const id = (name) => `signup-${name}`;
  const errPrefix = t('errorPrefix');

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = t('errors.fullNameRequired');
    if (!form.email.trim()) e.email = t('errors.emailRequired');
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = t('errors.emailInvalid');
    if (!form.country.trim()) e.country = t('errors.countryRequired');
    if (!form.position.trim()) e.position = t('errors.positionRequired');
    if (!form.bio.trim()) e.bio = t('errors.bioRequired');
    if (form.areasOfInterest.length === 0) e.areasOfInterest = t('errors.areasOfInterestRequired');
    return e;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(interest)
        ? prev.areasOfInterest.filter((i) => i !== interest)
        : [...prev.areasOfInterest, interest],
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    setSubmitError('');
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      // Keep the order of the checkbox list, and send the labels as before.
      const labels = INTEREST_IDS.filter((i) => form.areasOfInterest.includes(i)).map((i) => options[i]);
      const payload = {
        fullName: form.fullName,
        email: form.email,
        whatsappNumber: form.whatsappNumber,
        country: form.country,
        position: form.position,
        institution: form.institution,
        bio: form.bio,
        areaOfInterest: labels.join(', '),
        areaOfExpertise: form.position,
      };
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || t('errors.submissionFailed'));
      setSubmitted(true);
      setForm(EMPTY);
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError(t('errors.submitFailedFallback'));
    } finally {
      setSubmitting(false);
    }
  };

  // The checkbox group's error links to the first checkbox.
  const summaryItems = [
    ...FIELD_ORDER.filter((f) => errors[f]).map((f) => ({
      id: f === 'areasOfInterest' ? id(`interest-${INTEREST_IDS[0]}`) : id(f),
      message: errors[f],
    })),
    ...(submitError ? [{ id: id('submit'), message: submitError }] : []),
  ];

  const remaining = BIO_MAX - form.bio.length;
  const textField = (name, { label, hint, optional, type = 'text', autoComplete, narrow }) => (
    <Field id={id(name)} label={label} hint={hint} optionalText={optional ? t('optional') : undefined} error={errors[name]} errorPrefix={errPrefix}>
      <input
        id={id(name)} name={name} type={type} autoComplete={autoComplete}
        spellCheck={type === 'email' || name === 'fullName' ? false : undefined}
        value={form[name]} onChange={onChange}
        aria-describedby={describedBy(id(name), { hint, error: errors[name] })}
        aria-invalid={!!errors[name] || undefined}
        className={inputClass(!!errors[name], narrow ? 'max-w-sm' : '')}
      />
    </Field>
  );

  const legend = 'font-display text-[1.5rem] font-bold text-ink';

  let body;
  if (submitted) {
    body = (
      <div ref={panelRef} tabIndex={-1} className="focus:outline focus:outline-[3px] focus:outline-sand">
        <div className="bg-success px-6 py-8 text-center text-white">
          <h1 className="font-display text-[2rem] font-bold leading-tight md:text-[2.5rem]">{t('success.heading')}</h1>
          <p className="mt-3 text-[1.1875rem]">{t('header.subtitle')}</p>
        </div>
        <h2 className="mt-8 font-display text-[1.5rem] font-bold text-ink">{t('whatNext')}</h2>
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
            <ErrorSummary title={t('errorSummary')} items={summaryItems} />
          </div>
        )}

        <p className="text-[1.1875rem] text-muted">{t('header.subtitle')}</p>
        <h1 className="heading-display mt-2 text-[2.25rem] md:text-[2.75rem]">{t('header.title')}</h1>
        <p className="mt-4 text-[1.1875rem] leading-relaxed">{t('intro')}</p>

        <form onSubmit={onSubmit} noValidate className="mt-10">
          <fieldset>
            <legend className={legend}>{t('personalInfo.heading')}</legend>
            <div className="mt-6 space-y-7">
              {textField('fullName', { label: t('personalInfo.fullNameLabel'), autoComplete: 'name' })}
              {textField('email', { label: t('personalInfo.emailLabel'), hint: t('personalInfo.emailHint'), type: 'email', autoComplete: 'email' })}
              {textField('whatsappNumber', { label: t('personalInfo.whatsappLabel'), hint: t('personalInfo.whatsappHint'), optional: true, type: 'tel', autoComplete: 'tel', narrow: true })}
              {textField('country', { label: t('personalInfo.countryLabel'), autoComplete: 'country-name', narrow: true })}
            </div>
          </fieldset>

          <fieldset className="mt-12">
            <legend className={legend}>{t('professionalInfo.heading')}</legend>
            <div className="mt-6 space-y-7">
              {textField('position', { label: t('professionalInfo.positionLabel'), hint: t('professionalInfo.positionHint'), autoComplete: 'organization-title' })}
              {textField('institution', { label: t('professionalInfo.institutionLabel'), optional: true, autoComplete: 'organization' })}
            </div>
          </fieldset>

          <div className="mt-12">
            <h2 className={legend}>{t('aboutYou.heading')}</h2>
            <div className="mt-6">
              <Field id={id('bio')} label={t('aboutYou.bioLabel')} hint={t('aboutYou.bioHint')} error={errors.bio} errorPrefix={errPrefix}>
                <textarea
                  id={id('bio')} name="bio" rows={6} maxLength={BIO_MAX}
                  value={form.bio} onChange={onChange}
                  aria-describedby={`${describedBy(id('bio'), { hint: true, error: errors.bio })} ${id('bio-count')}`}
                  aria-invalid={!!errors.bio || undefined}
                  className={inputClass(!!errors.bio, 'resize-y')}
                />
                <p id={id('bio-count')} aria-live="polite" className={`mt-1.5 text-[0.9375rem] ${remaining <= 20 ? 'font-bold text-error' : 'text-muted'}`}>
                  {t('aboutYou.charsRemaining', { count: remaining })}
                </p>
              </Field>
            </div>
          </div>

          <fieldset
            className={`mt-12 ${errors.areasOfInterest ? 'border-l-[5px] border-error pl-4' : ''}`}
            aria-describedby={`${id('interests-hint')}${errors.areasOfInterest ? ` ${id('interests-error')}` : ''}`}
          >
            <legend className={legend}>{t('interests.heading')}</legend>
            <p id={id('interests-hint')} className="mt-2 text-[0.9375rem] text-muted">{t('interests.helper')}</p>
            {errors.areasOfInterest && (
              <p id={id('interests-error')} className="mt-1 text-[1.0625rem] font-bold text-error">
                <span className="sr-only">{errPrefix} </span>{errors.areasOfInterest}
              </p>
            )}
            <div className="mt-4 space-y-3">
              {INTEREST_IDS.map((interest) => (
                <div key={interest} className="flex items-center gap-3">
                  <input
                    id={id(`interest-${interest}`)}
                    type="checkbox"
                    checked={form.areasOfInterest.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                    className="h-7 w-7 flex-shrink-0 cursor-pointer accent-ink focus:outline focus:outline-[3px] focus:outline-offset-2 focus:outline-sand"
                  />
                  <label htmlFor={id(`interest-${interest}`)} className="cursor-pointer text-[1.0625rem]">
                    {options[interest]}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

          <p className="mt-12 text-[1.0625rem] text-muted">{t('submit.consent')}</p>

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
            {submitting ? t('submit.submitting') : t('submit.button')}
          </button>
        </form>
      </>
    );
  }

  return (
    <div className="w-full bg-paper font-body text-text">
      <Container className="pb-20 pt-[120px] md:pb-28 md:pt-[150px]">
        <div className="max-w-2xl">
          <Link
            to="/imswg"
            className="focus-ring inline-flex items-center gap-1 text-[0.9375rem] text-text underline underline-offset-2 hover:decoration-2"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            {t('header.backButton')}
          </Link>
          <div className="mt-6 border border-line bg-white px-6 py-8 md:px-10 md:py-10">{body}</div>
        </div>
      </Container>
    </div>
  );
};

export default IMSWGsignup;
