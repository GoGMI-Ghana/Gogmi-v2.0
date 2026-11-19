import React, { useState, useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container, PageHero, TextLink } from '../ui/Editorial';
import { Field, ErrorSummary, inputClass, describedBy } from '../ui/Form';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const USD_TO_GHS = 10.88;

// Suggested amounts in USD; the donor can still type any amount.
const QUICK_AMOUNTS = [25, 50, 100, 250];
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const FIELD_ORDER = ['fullName', 'email', 'country', 'amount'];
const EMPTY_FORM = { fullName: '', email: '', phone: '', country: '', amount: '', message: '', isAnonymous: false };

// Labels in the locale files end with " *"; GOV.UK marks optional fields instead.
const plainLabel = (label) => label.replace(/\s*\*\s*$/, '');

const IMPACT = ['research', 'capacity', 'advocacy'];

const Donate = () => {
  const { t } = useTranslation('donate');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  // Problems after the form is valid (payment set-up or recording), shown in the error summary.
  const [notice, setNotice] = useState('');
  const [success, setSuccess] = useState(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById('paystack-script')) {
      const script = document.createElement('script');
      script.id = 'paystack-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const recordDonation = async (paymentReference, amountUSD) => {
    try {
      const result = await fetch('https://api.gogmi.org.gh/api/donations/donate.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.message || '',
          amount: amountUSD,
          currency: 'USD',
          paymentReference,
          isAnonymous: formData.isAnonymous,
        }),
      });
      const data = await result.json();
      if (data.success) {
        setSuccess({ amount: amountUSD, reference: paymentReference });
        setFormData(EMPTY_FORM);
      } else {
        setNotice(
          t('errors.recordFailed', { error: data.message || 'unknown error', reference: paymentReference })
        );
      }
    } catch (err) {
      setNotice(
        t('errors.recordUnconfirmed', { reference: paymentReference })
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = t('errors.fullName');
    if (!formData.email.trim()) e.email = t('errors.email');
    else if (!EMAIL_PATTERN.test(formData.email.trim())) e.email = t('errors.emailInvalid');
    if (!formData.country.trim()) e.country = t('errors.country');
    const amount = parseFloat(formData.amount);
    if (!amount || amount <= 0) e.amount = t('errors.amount');
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice('');

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    const amountUSD = parseFloat(formData.amount);

    if (typeof window.PaystackPop === 'undefined') {
      setNotice(t('errors.paymentLoading'));
      return;
    }

    const amountGHS = amountUSD * USD_TO_GHS;
    const amountKobo = Math.round(amountGHS * 100);
    const reference = 'GOGMI-DONATE-' + Date.now() + '-' + Math.floor(Math.random() * 1e6);

    setIsProcessing(true);

    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: amountKobo,
        currency: 'GHS',
        ref: reference,
        channels: ['card', 'mobile_money', 'bank', 'ussd', 'qr', 'bank_transfer'],
        metadata: {
          custom_fields: [
            { display_name: 'Full Name', variable_name: 'full_name', value: formData.fullName },
            { display_name: 'Phone', variable_name: 'phone', value: formData.phone || 'N/A' },
            { display_name: 'Country', variable_name: 'country', value: formData.country },
            { display_name: 'USD Amount', variable_name: 'usd_amount', value: '$' + amountUSD },
            { display_name: 'Donation Type', variable_name: 'donation_type', value: 'General Donation' },
            { display_name: 'Anonymous', variable_name: 'anonymous', value: formData.isAnonymous ? 'Yes' : 'No' },
          ],
        },
        callback: (response) => {
          recordDonation(response.reference, amountUSD);
        },
        onClose: () => {
          setIsProcessing(false);
        },
      });
      handler.openIframe();
    } catch (err) {
      setIsProcessing(false);
      setNotice(t('errors.paymentInitFailed'));
    }
  };

  const errPrefix = t('form.errorPrefix');
  const optional = t('form.optional');
  const summaryItems = FIELD_ORDER.filter((f) => errors[f]).map((f) => ({ id: `donate-${f}`, message: errors[f] }));

  const textField = ({ name, label, type = 'text', autoComplete, hint, isOptional, width = '' }) => {
    const id = `donate-${name}`;
    return (
      <Field id={id} label={label} hint={hint} optionalText={isOptional ? optional : undefined} error={errors[name]} errorPrefix={errPrefix}>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={formData[name]}
          onChange={handleChange}
          disabled={isProcessing}
          aria-invalid={!!errors[name]}
          aria-describedby={describedBy(id, { hint, error: errors[name] })}
          className={inputClass(!!errors[name], width)}
        />
      </Field>
    );
  };

  return (
    <div className="w-full font-body text-text">
      <PageHero
        image="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&fit=crop"
        alt=""
        eyebrow={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Where the money goes */}
            <div className="order-2 lg:order-none lg:col-span-4">
              <h2 id="donate-impact" className="heading-display text-[1.75rem] md:text-[2rem]">{t('impact.heading')}</h2>
              <ol className="mt-8 border-t border-line" aria-labelledby="donate-impact">
                {IMPACT.map((key) => (
                  <li key={key} className="grid grid-cols-[2.25rem_1fr] border-b border-line py-6">
                    <span className="mt-[0.6rem] h-2 w-2 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                    <div>
                      <h3 className="text-[1.125rem] font-bold leading-snug text-ink">{t(`impact.${key}.title`)}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{t(`impact.${key}.desc`)}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted">
                <Lock className="mt-1 h-4 w-4 flex-shrink-0 text-ink" aria-hidden="true" />
                <span>{t('form.securityNote')}</span>
              </p>
              <p className="mt-6 text-[0.9375rem] text-muted">
                {t('form.questions')}{' '}
                <TextLink to="/contact" className="font-semibold">{t('form.contactUs')}</TextLink>
              </p>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border border-line bg-white px-6 py-8 md:px-10 md:py-10">
                {success ? (
                  <div ref={successRef} tabIndex={-1} className="focus:outline focus:outline-[3px] focus:outline-sand">
                    <div className="bg-success px-6 py-8 text-center text-white">
                      <h2 className="text-[2rem] font-bold leading-tight">{t('success.heading')}</h2>
                      <p className="mt-3 text-[1.1875rem]">{t('success.body', { amount: '$' + success.amount })}</p>
                      <p className="mt-4 text-[1.0625rem]">
                        {t('success.reference', { reference: '' })}
                        <strong className="block break-all font-bold">{success.reference}</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSuccess(null)}
                      className="focus-ring mt-8 rounded-[2px] border-b-2 border-ink-deep bg-ink px-6 py-3 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-rust"
                    >
                      {t('success.another')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-[1.75rem] font-bold leading-tight text-ink">{t('form.heading')}</h2>
                    <p className="mt-2 text-[1.0625rem] text-muted">{t('form.subheading')}</p>

                    {(summaryItems.length > 0 || notice) && (
                      <div className="mt-8">
                        {summaryItems.length > 0 ? (
                          <ErrorSummary title={t('form.errorSummary')} items={summaryItems} />
                        ) : (
                          <div role="alert" className="border-[5px] border-error p-5">
                            <h3 className="text-[1.25rem] font-bold text-text">{t('errors.submit')}</h3>
                            <p className="mt-2 text-[1.0625rem] text-text">{notice}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Amount first: it is what the donor came to decide */}
                    <div className="mt-8">
                      <Field
                        id="donate-amount"
                        label={plainLabel(t('form.amountLabel'))}
                        hint={t('form.amountHint')}
                        error={errors.amount}
                        errorPrefix={errPrefix}
                      >
                        <div role="group" aria-label={t('form.quickAmounts')} className="mb-3 flex flex-wrap gap-2">
                          {QUICK_AMOUNTS.map((amount) => {
                            const selected = parseFloat(formData.amount) === amount;
                            return (
                              <button
                                key={amount}
                                type="button"
                                aria-pressed={selected}
                                disabled={isProcessing}
                                onClick={() => setFormData({ ...formData, amount: String(amount) })}
                                className={`focus-ring min-w-[5rem] rounded-[2px] border-2 px-4 py-2.5 text-[1.0625rem] font-semibold tabular-nums transition-colors ${
                                  selected ? 'border-ink bg-ink text-white' : 'border-text bg-white text-ink hover:bg-paper'
                                }`}
                              >
                                ${amount}
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex max-w-[14rem] items-stretch">
                          <span className="flex items-center rounded-l-[2px] border-2 border-r-0 border-text bg-paper px-3 text-[1.0625rem] font-semibold text-text" aria-hidden="true">$</span>
                          <input
                            id="donate-amount"
                            name="amount"
                            type="text"
                            inputMode="decimal"
                            value={formData.amount}
                            onChange={handleChange}
                            disabled={isProcessing}
                            placeholder={t('form.amountPlaceholder')}
                            aria-invalid={!!errors.amount}
                            aria-describedby={describedBy('donate-amount', { hint: true, error: errors.amount })}
                            className={inputClass(!!errors.amount, 'rounded-l-none tabular-nums')}
                          />
                        </div>
                      </Field>
                    </div>

                    <div className="mt-10 space-y-6 border-t border-line pt-8">
                      {textField({ name: 'fullName', label: plainLabel(t('form.fullNameLabel')), autoComplete: 'name' })}
                      {textField({ name: 'email', label: plainLabel(t('form.emailLabel')), type: 'email', autoComplete: 'email', width: 'max-w-md' })}
                      {textField({ name: 'phone', label: t('form.phoneLabel'), type: 'tel', autoComplete: 'tel', hint: t('form.phoneHint'), isOptional: true, width: 'max-w-xs' })}
                      {textField({ name: 'country', label: plainLabel(t('form.countryLabel')), autoComplete: 'country-name', width: 'max-w-xs' })}

                      <Field id="donate-message" label={t('form.messageLabel')}>
                        <textarea
                          id="donate-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isProcessing}
                          rows={3}
                          className={inputClass(false, 'resize-y')}
                        />
                      </Field>

                      <div className="flex items-start gap-3">
                        <input
                          id="donate-anonymous"
                          type="checkbox"
                          name="isAnonymous"
                          checked={formData.isAnonymous}
                          onChange={handleChange}
                          disabled={isProcessing}
                          aria-describedby="donate-anonymous-hint"
                          className="focus-ring mt-0.5 h-6 w-6 flex-shrink-0 cursor-pointer accent-ink"
                        />
                        <div>
                          <label htmlFor="donate-anonymous" className="cursor-pointer text-[1.0625rem] text-text">{t('form.anonymousLabel')}</label>
                          <p id="donate-anonymous-hint" className="mt-1 text-[0.9375rem] text-muted">{t('form.anonymousSubtext')}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="focus-ring mt-10 inline-flex items-center justify-center gap-2 rounded-[2px] border-b-2 border-rust-deep bg-rust px-6 py-3 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-rust-deep disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isProcessing
                        ? t('form.processing')
                        : parseFloat(formData.amount) > 0
                          ? `${t('form.donateNow')} ($${parseFloat(formData.amount).toLocaleString('en-US', { maximumFractionDigits: 2 })})`
                          : t('form.donateNow')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Donate;
