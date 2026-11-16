import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Field, ErrorSummary, Dialog, inputClass, describedBy } from './Form';

/*
  Course application dialog shared by the course pages, in GOV.UK form style.
  Steps: choose (member or not) -> verify (members) -> details form -> done.

  `t` is the course page's translator: it supplies the course-specific text
  under `modal.*` and `alerts.*`. Shared form text comes from courseApply.json.
*/

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const USD_TO_GHS = 10.88;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const EMPTY_NON_MEMBER = { fullName: '', email: '', phone: '', position: '', institution: '', country: '', membershipType: '', dateOfBirth: '' };
const EMPTY_MEMBER = { fullName: '', email: '', phone: '', position: '', institution: '', country: '' };

const PRIMARY =
  'focus-ring inline-flex items-center justify-center rounded-[2px] border-b-2 border-ink-deep bg-ink px-6 py-3 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-rust disabled:cursor-not-allowed disabled:opacity-60';
const LINK_BUTTON =
  'focus-ring rounded-[2px] px-2 py-3 text-[1.0625rem] font-semibold text-ink underline underline-offset-4 hover:text-rust disabled:opacity-40';

// A GOV.UK-style radio option with an optional hint.
const Radio = ({ name, value, checked, onChange, label, hint, disabled }) => {
  const id = `${name}-${value}`;
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="focus-ring mt-0.5 h-6 w-6 flex-shrink-0 cursor-pointer accent-ink"
      />
      <div>
        <label htmlFor={id} className="cursor-pointer text-[1.0625rem] font-semibold text-text">{label}</label>
        {hint && <p id={`${id}-hint`} className="mt-0.5 text-[0.9375rem] text-muted">{hint}</p>}
      </div>
    </div>
  );
};

const CourseApply = ({ t, courseTitle, endpoint, courseLabel, refPrefix, memberPrice, nonMemberPrice, askDob = true, onClose }) => {
  const { t: c } = useTranslation('courseApply');
  const [step, setStep] = useState('choose'); // choose | verify | member | nonmember | done
  const [choice, setChoice] = useState('');
  const [memberCode, setMemberCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nonMemberForm, setNonMemberForm] = useState(EMPTY_NON_MEMBER);
  const [memberForm, setMemberForm] = useState(EMPTY_MEMBER);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [result, setResult] = useState(null);

  const discount = nonMemberPrice - memberPrice;
  const discountPercent = Math.round((discount / nonMemberPrice) * 100);

  useEffect(() => {
    if (!document.getElementById('paystack-script')) {
      const s = document.createElement('script');
      s.id = 'paystack-script';
      s.src = 'https://js.paystack.co/v1/inline.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const goTo = (next) => {
    setErrors({});
    setNotice('');
    setStep(next);
  };

  const verifyMemberCode = async (e) => {
    e?.preventDefault();
    if (!memberCode.trim()) { setErrors({ membershipId: c('errors.membershipId') }); return; }
    setIsVerifying(true);
    setErrors({});
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'verify-member', membershipId: memberCode.trim() }) });
      const data = await res.json();
      if (data.success) {
        setMemberForm({ fullName: data.data.fullName || '', email: data.data.email || '', phone: data.data.phone || '', position: data.data.position || '', institution: data.data.organization || '', country: data.data.country || '' });
        goTo('member');
      } else {
        setErrors({ membershipId: data.message || t('alerts.invalidMembershipId') });
      }
    } catch {
      setErrors({ membershipId: t('alerts.verifyError') });
    } finally {
      setIsVerifying(false);
    }
  };

  const activateRegistration = async (paymentReference, applicantType, formPayload) => {
    try {
      const body = { action: 'register', ...formPayload, applicantType, paymentReference };
      if (applicantType === 'member') body.membershipId = memberCode.trim();
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) {
        setResult({
          reference: paymentReference,
          email: formPayload.email,
          membershipId: data.data.autoMembership ? data.data.membershipId : null
        });
        goTo('done');
      } else {
        setNotice(t('alerts.registrationFailed', { message: data.message, reference: paymentReference }));
      }
    } catch {
      setNotice(t('alerts.registrationError', { reference: paymentReference }));
    } finally {
      setIsProcessing(false);
    }
  };

  const processPayment = (email, amountUSD, applicantType, formPayload) => {
    if (typeof window.PaystackPop === 'undefined') { setNotice(t('alerts.paymentLoading')); return; }
    const amountPesewas = Math.round(amountUSD * USD_TO_GHS * 100);
    const reference = refPrefix + Date.now() + '-' + Math.floor(Math.random() * 1e6);
    setIsProcessing(true);
    setNotice('');
    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY, email, amount: amountPesewas, currency: 'GHS', ref: reference,
        channels: ['card', 'mobile_money', 'bank', 'ussd', 'qr', 'bank_transfer'],
        metadata: { custom_fields: [{ display_name: 'Course', variable_name: 'course', value: courseLabel }, { display_name: 'Type', variable_name: 'type', value: applicantType }] },
        callback: (response) => { activateRegistration(response.reference, applicantType, formPayload); },
        onClose: () => { setIsProcessing(false); setNotice(t('alerts.paymentCancelled')); }
      });
      handler.openIframe();
    } catch (error) {
      setIsProcessing(false);
      setNotice(t('alerts.paymentFailed', { error: error.message }));
    }
  };

  const validateDetails = (form, isMember) => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = c('errors.fullName');
    if (!form.email.trim()) e.email = c('errors.email');
    else if (!EMAIL_PATTERN.test(form.email.trim())) e.email = c('errors.emailInvalid');
    if (!isMember && askDob && !form.dateOfBirth) e.dateOfBirth = c('errors.dateOfBirth');
    if (!form.phone.trim()) e.phone = c('errors.phone');
    if (!form.position.trim()) e.position = c('errors.position');
    if (!form.country.trim()) e.country = c('errors.country');
    if (!isMember && !form.membershipType) e.membershipType = c('errors.membershipType');
    return e;
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validateDetails(memberForm, true);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) return;
    processPayment(memberForm.email, memberPrice, 'member', memberForm);
  };

  const handleNonMemberSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validateDetails(nonMemberForm, false);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) return;
    processPayment(nonMemberForm.email, nonMemberPrice, 'non-member', nonMemberForm);
  };

  const handleChoose = (e) => {
    e.preventDefault();
    if (!choice) { setErrors({ choose: c('errors.choose') }); return; }
    goTo(choice === 'member' ? 'verify' : 'nonmember');
  };

  // ---- Rendering helpers ----
  const errPrefix = c('errorPrefix');
  const FIELD_ORDER = ['choose', 'membershipId', 'fullName', 'email', 'dateOfBirth', 'phone', 'country', 'position', 'membershipType'];
  const fieldTarget = { choose: 'apply-choose-member', membershipType: 'apply-membershipType-student' };
  const summaryItems = FIELD_ORDER.filter((f) => errors[f]).map((f) => ({ id: fieldTarget[f] || `apply-${f}`, message: errors[f] }));

  const textField = (form, setForm, { name, label, type = 'text', autoComplete, hint, isOptional, width = '' }) => {
    const id = `apply-${name}`;
    return (
      <Field id={id} label={label} hint={hint} optionalText={isOptional ? c('optional') : undefined} error={errors[name]} errorPrefix={errPrefix}>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          disabled={isProcessing}
          aria-invalid={!!errors[name]}
          aria-describedby={describedBy(id, { hint, error: errors[name] })}
          className={inputClass(!!errors[name], width)}
        />
      </Field>
    );
  };

  const detailFields = (form, setForm, isMember) => {
    const L = (key) => t(`modal.nonmember.${key}`);
    return (
      <>
        <h3 className="text-[1.125rem] font-bold text-ink">{c('sections.you')}</h3>
        <div className="mt-5 space-y-6">
          {textField(form, setForm, { name: 'fullName', label: L('fullNameLabel'), autoComplete: 'name' })}
          {textField(form, setForm, { name: 'email', label: L('emailLabel'), type: 'email', autoComplete: 'email', width: 'max-w-md' })}
          {!isMember && askDob && textField(form, setForm, { name: 'dateOfBirth', label: L('dobLabel'), type: 'date', autoComplete: 'bday', hint: c('dobHint'), width: 'max-w-[14rem]' })}
          {textField(form, setForm, { name: 'phone', label: L('phoneLabel'), type: 'tel', autoComplete: 'tel', hint: c('phoneHint'), width: 'max-w-xs' })}
          {textField(form, setForm, { name: 'country', label: L('countryLabel'), autoComplete: 'country-name', width: 'max-w-xs' })}
        </div>

        <h3 className="mt-10 text-[1.125rem] font-bold text-ink">{c('sections.work')}</h3>
        <div className="mt-5 space-y-6">
          {textField(form, setForm, { name: 'position', label: L('positionLabel'), autoComplete: 'organization-title' })}
          {textField(form, setForm, { name: 'institution', label: L('institutionLabel'), autoComplete: 'organization', isOptional: true })}
        </div>

        {!isMember && (
          <fieldset className="mt-10" aria-describedby={`apply-membershipType-hint${errors.membershipType ? ' apply-membershipType-error' : ''}`}>
            <legend className="text-[1.125rem] font-bold text-ink">{c('sections.membership')}</legend>
            <div className={`mt-3 ${errors.membershipType ? 'border-l-[5px] border-error pl-4' : ''}`}>
              <p className="text-[1.0625rem] font-bold text-text">{L('membershipTypeLabel')}</p>
              <p id="apply-membershipType-hint" className="mt-1 text-[0.9375rem] text-muted">{L('membershipTypeHelper')}</p>
              {errors.membershipType && (
                <p id="apply-membershipType-error" className="mt-1 text-[1.0625rem] font-bold text-error">
                  <span className="sr-only">{errPrefix} </span>{errors.membershipType}
                </p>
              )}
              <div className="mt-4 space-y-3">
                {['student', 'associate', 'professional'].map((type) => (
                  <Radio
                    key={type}
                    name="apply-membershipType"
                    value={type}
                    checked={form.membershipType === type}
                    onChange={() => setForm({ ...form, membershipType: type })}
                    disabled={isProcessing}
                    label={L(`membershipType${type[0].toUpperCase()}${type.slice(1)}`)}
                  />
                ))}
              </div>
            </div>
          </fieldset>
        )}
      </>
    );
  };

  const priceStrip = (amount, note) => (
    <div className="flex items-baseline justify-between gap-4 border-y border-line py-4">
      <div>
        <p className="text-sm font-semibold text-muted">{c('courseFee')}</p>
        {note && <p className="mt-0.5 text-[0.9375rem] text-text">{note}</p>}
      </div>
      <p className="text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-ink">USD {amount}</p>
    </div>
  );

  const title =
    step === 'done' ? c('success.title')
      : step === 'choose' ? t('modal.titles.choose')
        : step === 'verify' ? t('modal.titles.verify')
          : step === 'member' ? t('modal.titles.member')
            : t('modal.titles.nonmember');

  return (
    <Dialog onClose={onClose} labelledBy="apply-title" closeLabel={c('close')} locked={isProcessing} className="max-w-2xl">
      <div className="border-b border-line px-6 pb-5 pt-6 md:px-8">
        <h2 id="apply-title" className="pr-10 text-[1.5rem] font-bold leading-tight text-ink">{title}</h2>
        <p className="mt-1 text-[0.9375rem] text-muted">{t('modal.courseSubtitle')}</p>
      </div>

      <div className="px-6 pb-8 pt-6 md:px-8">
        {summaryItems.length > 0 && (
          <div className="mb-8"><ErrorSummary title={c('errorSummary')} items={summaryItems} /></div>
        )}
        {notice && (
          <div role="alert" className="mb-8 border-[5px] border-error p-5">
            <h3 className="text-[1.25rem] font-bold text-text">{c('noticeTitle')}</h3>
            <p className="mt-2 whitespace-pre-line text-[1.0625rem] text-text">{notice}</p>
          </div>
        )}

        {step === 'choose' && (
          <form onSubmit={handleChoose} noValidate>
            <fieldset aria-describedby={errors.choose ? 'apply-choose-error' : undefined}>
              <legend className="text-[1.25rem] font-bold text-ink">{c('choose.legend')}</legend>
              <div className={`mt-4 ${errors.choose ? 'border-l-[5px] border-error pl-4' : ''}`}>
                {errors.choose && (
                  <p id="apply-choose-error" className="mb-3 text-[1.0625rem] font-bold text-error">
                    <span className="sr-only">{errPrefix} </span>{errors.choose}
                  </p>
                )}
                <div className="space-y-4">
                  <Radio
                    name="apply-choose"
                    value="member"
                    checked={choice === 'member'}
                    onChange={() => { setChoice('member'); setErrors({}); }}
                    label={c('choose.yes')}
                    hint={c('choose.yesHint', { price: memberPrice, discount })}
                  />
                  <Radio
                    name="apply-choose"
                    value="nonmember"
                    checked={choice === 'nonmember'}
                    onChange={() => { setChoice('nonmember'); setErrors({}); }}
                    label={c('choose.no')}
                    hint={c('choose.noHint', { price: nonMemberPrice })}
                  />
                </div>
              </div>
            </fieldset>
            <button type="submit" className={`${PRIMARY} mt-8`}>{c('continue')}</button>
            <p className="mt-8 border-t border-line pt-6 text-[0.9375rem] text-muted">
              {t('modal.choose.joinPrompt')}{' '}
              <Link to="/membership" onClick={onClose} className="link-editorial font-semibold">{t('modal.choose.joinLink')}</Link>{' '}
              {t('modal.choose.joinSuffix')}
            </p>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={verifyMemberCode} noValidate>
            {priceStrip(memberPrice, t('modal.verify.save', { discount, percent: discountPercent }))}
            <div className="mt-8">
              <Field id="apply-membershipId" label={t('modal.verify.inputLabel')} hint={t('modal.verify.helper')} error={errors.membershipId} errorPrefix={errPrefix}>
                <input
                  id="apply-membershipId"
                  type="text"
                  value={memberCode}
                  onChange={(e) => setMemberCode(e.target.value)}
                  placeholder={t('modal.verify.placeholder')}
                  autoCapitalize="characters"
                  spellCheck="false"
                  disabled={isVerifying}
                  aria-invalid={!!errors.membershipId}
                  aria-describedby={describedBy('apply-membershipId', { hint: true, error: errors.membershipId })}
                  className={inputClass(!!errors.membershipId, 'max-w-sm font-mono tracking-wide placeholder:font-body placeholder:tracking-normal placeholder:text-muted/70')}
                />
              </Field>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={isVerifying} className={PRIMARY}>
                {isVerifying ? t('modal.verify.verifying') : t('modal.verify.verifyContinue')}
              </button>
              <button type="button" onClick={() => goTo('choose')} className={LINK_BUTTON}>{c('back')}</button>
            </div>
          </form>
        )}

        {step === 'member' && (
          <form onSubmit={handleMemberSubmit} noValidate>
            <p className="mb-6 border-l-[5px] border-success pl-4 text-[1.0625rem] font-semibold text-success">{t('modal.member.verifiedBadge')}</p>
            {priceStrip(memberPrice, t('modal.member.saveAmount', { discount }))}
            <div className="mt-8">{detailFields(memberForm, setMemberForm, true)}</div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={isProcessing} className={PRIMARY}>
                {isProcessing ? t('modal.member.processing') : t('modal.member.pay', { amount: memberPrice })}
              </button>
              <button type="button" onClick={() => goTo('verify')} disabled={isProcessing} className={LINK_BUTTON}>{c('back')}</button>
            </div>
          </form>
        )}

        {step === 'nonmember' && (
          <form onSubmit={handleNonMemberSubmit} noValidate>
            {priceStrip(nonMemberPrice, t('modal.nonmember.freeMembership'))}
            <div className="mt-8">{detailFields(nonMemberForm, setNonMemberForm, false)}</div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={isProcessing} className={PRIMARY}>
                {isProcessing ? t('modal.nonmember.processing') : t('modal.nonmember.pay', { amount: nonMemberPrice })}
              </button>
              <button type="button" onClick={() => goTo('choose')} disabled={isProcessing} className={LINK_BUTTON}>{c('back')}</button>
            </div>
          </form>
        )}

        {step === 'done' && result && (
          <div>
            <div className="bg-success px-6 py-8 text-center text-white">
              <p className="text-[1.1875rem]">{c('success.body', { course: courseTitle })}</p>
              <p className="mt-4 text-[1.0625rem]">{c('success.reference')}</p>
              <p className="break-all text-[1.25rem] font-bold">{result.reference}</p>
            </div>
            {result.membershipId && (
              <div className="mt-6 border-l-[5px] border-ink pl-4">
                <p className="font-bold text-text">{c('success.membershipId')}</p>
                <p className="mt-1 font-mono text-[1.25rem] font-bold text-ink">{result.membershipId}</p>
                <p className="mt-1 text-muted">
                  {c('success.membershipHint')}{' '}
                  <Link to="/login" onClick={onClose} className="link-editorial font-semibold">{c('success.signIn')}</Link>
                </p>
              </div>
            )}
            <p className="mt-6 text-[1.0625rem] text-text">{c('success.email', { email: result.email })}</p>
            <button type="button" onClick={onClose} className={`${PRIMARY} mt-8`}>{c('success.done')}</button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default CourseApply;
