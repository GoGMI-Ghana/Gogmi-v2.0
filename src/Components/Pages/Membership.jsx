import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Button, SectionHeader, PageHero } from '../ui/Editorial';
import { Field, ErrorSummary, Dialog, inputClass, describedBy } from '../ui/Form';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const API_URL = 'https://api.gogmi.org.gh/api';
const BROCHURE_URL = '/resources/pdfs/GoGMI-Membership-2026.pdf';

// Number of benefits shown before "Show all".
const VISIBLE_BENEFITS = 5;

const getPlanAmountUSD = (plan) => {
  const priceMatch = plan?.price?.match(/[\d,]+/g);
  return priceMatch ? parseFloat(priceMatch.join('').replace(',', '')) : 0;
};

const formatUSD = (amount) => 'USD ' + amount.toLocaleString('en-US', { maximumFractionDigits: 2 });

const EMPTY_FORM = {
  fullName: '',
  email: '',
  dateOfBirth: '',
  phone: '',
  organization: '',
  organizationEmail: '',
  position: '',
  country: '',
  membershipType: '',
  plan: ''
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

// One membership tier, shown as a column in the plan table.
const PlanColumn = ({ plan, t, labelKey, inviteOnly, onApply, highlighted }) => {
  const shown = plan.features.slice(0, VISIBLE_BENEFITS);
  const more = plan.features.slice(VISIBLE_BENEFITS);
  return (
    <li className={`flex flex-col bg-white p-6 md:p-7 ${highlighted ? 'shadow-[inset_0_4px_0_var(--color-rust)]' : ''}`}>
      {highlighted && <p className="text-sm font-semibold text-rust">{t('individual.mostPopular')}</p>}
      <h3 className={`text-[1.25rem] font-bold leading-snug text-ink ${highlighted ? 'mt-1' : ''}`}>{plan.name}</h3>
      {plan.subtitle && <p className="mt-0.5 text-sm text-muted">{plan.subtitle}</p>}

      <p className="mt-5 flex items-baseline gap-1">
        <span className={`font-bold leading-none tracking-[-0.02em] text-ink ${inviteOnly ? 'text-[1.25rem]' : 'text-[1.75rem]'}`}>{plan.price}</span>
        {plan.period && <span className="text-muted">{plan.period}</span>}
      </p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-text">{plan.description}</p>

      {plan.features.length > 0 && (
        <div className="mt-6 flex-1 border-t border-line pt-4">
          <h4 className="text-sm font-semibold text-ink">{t(labelKey)}</h4>
          <ul className="mt-3 space-y-2">
            {shown.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-text">
                <span className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {more.length > 0 && (
            <details className="group mt-3">
              <summary className="focus-ring cursor-pointer text-[0.9375rem] font-semibold text-ink underline underline-offset-4 hover:text-rust">
                {t('showAllBenefits', { count: plan.features.length })}
              </summary>
              <ul className="mt-2 space-y-2">
                {more.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-text">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      <div className="mt-7">
        {inviteOnly ? (
          <Link to="/contact" className="link-editorial focus-ring inline-flex items-center gap-2 font-semibold">
            <span>{t('inviteContact')}<span className="sr-only">: {plan.name}</span></span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onApply(plan)}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-[2px] border border-ink bg-ink px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:border-rust hover:bg-rust"
          >
            {t('applyNow')}<span className="sr-only">: {plan.name}</span>
          </button>
        )}
      </div>
    </li>
  );
};

const Membership = () => {
  const { t } = useTranslation('membership');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState(null);
  const [promoStatus, setPromoStatus] = useState('idle');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!document.getElementById('paystack-script')) {
      const script = document.createElement('script');
      script.id = 'paystack-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        console.log('Paystack script loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load Paystack script');
        alert(t('alerts.failedToLoadPayment'));
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isIndividualPlan = (planId) => {
    return ['student', 'associate', 'professional'].includes(planId);
  };

  const resetPromo = () => {
    setPromoInput('');
    setPromo(null);
    setPromoStatus('idle');
  };

  // Promo codes are validated by the server, which owns the code and its expiry.
  const checkPromoCode = async (code, planId) => {
    const result = await fetch(`${API_URL}/membership/promo.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, planId })
    });
    return result.json();
  };

  const applyPromoCode = async () => {
    const code = promoInput.trim();
    if (!code) {
      setPromoStatus('empty');
      return;
    }

    setPromoStatus('checking');
    try {
      const data = await checkPromoCode(code, selectedPlan.id);
      if (data.success && data.valid) {
        setPromo({ code: data.code, discountPercent: data.discountPercent });
        setPromoStatus('applied');
      } else {
        setPromo(null);
        setPromoStatus(data.reason === 'expired' ? 'expired' : 'invalid');
      }
    } catch (error) {
      console.error('Promo code check failed:', error);
      setPromo(null);
      setPromoStatus('error');
    }
  };

  const getFinalAmountUSD = (plan) => {
    const amount = getPlanAmountUSD(plan);
    return promo ? Math.round(amount * (100 - promo.discountPercent)) / 100 : amount;
  };

  const openMembershipModal = (plan) => {
    resetPromo();
    setErrors({});
    setSelectedPlan(plan);
    setFormData({
      ...formData,
      membershipType: isIndividualPlan(plan.id) ? 'individual' : 'institutional',
      plan: plan.name
    });
    setShowModal(true);
  };

  const closeMembershipModal = () => {
    if (isProcessing) return;
    setShowModal(false);
    setSelectedPlan(null);
    resetPromo();
    setErrors({});
    setFormData(EMPTY_FORM);
  };

  const activateMembership = async (paymentReference) => {
    try {
      const amount = getFinalAmountUSD(selectedPlan);

      const applicationData = {
        fullName:          formData.fullName,
        email:             formData.email,
        dateOfBirth:       formData.dateOfBirth || null,
        phone:             formData.phone,
        country:           formData.country,
        organization:      formData.organization      || '',
        organizationEmail: formData.organizationEmail || '',
        position:          formData.position          || '',
        planId:            selectedPlan.id,
        planName:          selectedPlan.name,
        membershipType:    formData.membershipType,
        amount,
        currency:          'USD',
        promoCode:         promo ? promo.code : '',
        discountPercent:   promo ? promo.discountPercent : 0,
        originalAmount:    getPlanAmountUSD(selectedPlan),
        paymentReference
      };

      const result = await fetch(`${API_URL}/membership/apply.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });

      const data = await result.json();

      if (data.success) {
        const certId = data.data.certificateId || data.data.certificateNumber;
        alert(
          t('alerts.welcomeSuccess', {
            membershipId: data.data.membershipId,
            certId,
            email: formData.email,
            reference: paymentReference
          })
        );

        closeMembershipModal();

        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        alert(
          t('alerts.activationFailed', { reference: paymentReference, error: data.message })
        );
      }
    } catch (error) {
      console.error('Activation error:', error);
      alert(
        t('alerts.activationError', { reference: paymentReference })
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Field checks, in the order the fields appear in the form.
  const validate = () => {
    const e = {};
    const individual = isIndividualPlan(selectedPlan.id);
    const institutional = formData.membershipType === 'institutional';

    if (!formData.fullName.trim()) e.fullName = t('modal.errors.fullName');
    if (!formData.email.trim()) e.email = t('modal.errors.email');
    else if (!EMAIL_PATTERN.test(formData.email.trim())) e.email = t('modal.errors.emailInvalid');
    if (!formData.phone.trim()) e.phone = t('modal.errors.phone');
    if (!formData.country.trim()) e.country = t('modal.errors.country');
    if (individual && !formData.dateOfBirth) e.dateOfBirth = t('modal.errors.dateOfBirth');
    if (institutional) {
      if (!formData.organization.trim()) e.organization = t('modal.errors.organization');
      if (!formData.organizationEmail.trim()) e.organizationEmail = t('modal.errors.organizationEmail');
      else if (!EMAIL_PATTERN.test(formData.organizationEmail.trim())) e.organizationEmail = t('modal.errors.organizationEmailInvalid');
    }
    return e;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    if (!selectedPlan.price || selectedPlan.price === 'By Invitation Only') {
      alert(t('alerts.invitationOnly'));
      closeMembershipModal();
      return;
    }

    if (getPlanAmountUSD(selectedPlan) === 0) {
      alert(t('alerts.invitationOnly'));
      closeMembershipModal();
      return;
    }

    if (typeof window.PaystackPop === 'undefined') {
      alert(t('alerts.paymentLoading'));
      return;
    }

    // The offer may have ended since the code was applied, so confirm it before charging.
    if (promo) {
      setIsProcessing(true);
      let stillValid = false;
      try {
        const data = await checkPromoCode(promo.code, selectedPlan.id);
        stillValid = Boolean(data.success && data.valid);
      } catch (error) {
        console.error('Promo code check failed:', error);
      }
      setIsProcessing(false);

      if (!stillValid) {
        setPromo(null);
        setPromoStatus('expired');
        alert(t('alerts.promoNoLongerValid'));
        return;
      }
    }

    const amountUSD = getFinalAmountUSD(selectedPlan);

    const USD_TO_GHS   = 10.88;
    const amountGHS    = amountUSD * USD_TO_GHS;
    const amountKobo   = Math.round(amountGHS * 100);

    const reference = 'GOGMI-' + Date.now() + '-' + Math.floor(Math.random() * 1e6);

    setIsProcessing(true);

    try {
      const handler = window.PaystackPop.setup({
        key:      PAYSTACK_PUBLIC_KEY,
        email:    formData.email,
        amount:   amountKobo,
        currency: 'GHS',
        ref:      reference,
        channels: ['card', 'mobile_money', 'bank', 'ussd', 'qr', 'bank_transfer'],

        metadata: {
          custom_fields: [
            { display_name: 'Full Name',       variable_name: 'full_name',       value: formData.fullName },
            { display_name: 'Phone',           variable_name: 'phone',           value: formData.phone },
            { display_name: 'Membership Plan', variable_name: 'membership_plan', value: selectedPlan.name },
            { display_name: 'Plan ID',         variable_name: 'plan_id',         value: selectedPlan.id },
            { display_name: 'USD Amount',      variable_name: 'usd_amount',      value: '$' + amountUSD },
            { display_name: 'Promo Code',      variable_name: 'promo_code',      value: promo ? `${promo.code} (${promo.discountPercent}% off)` : 'None' },
            { display_name: 'Organization',    variable_name: 'organization',    value: formData.organization || 'N/A' },
            { display_name: 'Country',         variable_name: 'country',         value: formData.country },
            { display_name: 'Position',        variable_name: 'position',        value: formData.position || 'N/A' }
          ]
        },

        callback: (response) => {
          console.log('Paystack callback — reference:', response.reference);
          activateMembership(response.reference);
        },

        onClose: () => {
          console.log('Paystack popup closed by user');
          setIsProcessing(false);
          alert(t('alerts.paymentCancelled'));
        }
      });

      handler.openIframe();
    } catch (error) {
      console.error('Paystack setup error:', error);
      setIsProcessing(false);
      alert(
        t('alerts.paymentInitFailed') + '\n\nError: ' + error.message
      );
    }
  };

  const individualPlanMeta = {
    student: { price: 'USD 20', period: '/year' },
    associate: { price: 'USD 100', period: '/year', popular: true },
    professional: { price: 'USD 200', period: '/year' },
    fellow: { price: 'By Invitation Only', period: '' }
  };

  const individualPlans = ['student', 'associate', 'professional', 'fellow'].map((id) => ({
    id,
    ...individualPlanMeta[id],
    name: t(`individual.plans.${id}.name`),
    subtitle: t(`individual.plans.${id}.subtitle`, ''),
    description: t(`individual.plans.${id}.description`),
    features: t(`individual.plans.${id}.features`, { returnObjects: true })
  }));

  const institutionalPlanMeta = {
    institution: { price: 'USD 1,000', period: '/year' },
    corporate: { price: 'USD 3,000', period: '/year' },
    strategic: { price: 'By Invitation Only', period: '' }
  };

  const institutionalPlans = ['institution', 'corporate', 'strategic'].map((id) => ({
    id,
    ...institutionalPlanMeta[id],
    name: t(`institutional.plans.${id}.name`),
    description: t(`institutional.plans.${id}.description`),
    features: t(`institutional.plans.${id}.features`, { returnObjects: true })
  }));

  // ---- Application form (inside the dialog) ----
  const errPrefix = t('modal.errorPrefix');
  const optional = t('modal.optional').toLowerCase();
  const individual = selectedPlan && isIndividualPlan(selectedPlan.id);
  const institutional = formData.membershipType === 'institutional';
  const FIELD_ORDER = ['fullName', 'email', 'phone', 'country', 'dateOfBirth', 'organization', 'organizationEmail'];
  const summaryItems = FIELD_ORDER.filter((f) => errors[f]).map((f) => ({ id: `member-${f}`, message: errors[f] }));

  const textField = ({ name, label, type = 'text', autoComplete, hint, isOptional, width = '' }) => {
    const id = `member-${name}`;
    return (
      <Field
        id={id}
        label={label}
        hint={hint}
        optionalText={isOptional ? optional : undefined}
        error={errors[name]}
        errorPrefix={errPrefix}
      >
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={formData[name]}
          onChange={handleFormChange}
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
      {showModal && selectedPlan && (
        <Dialog
          onClose={closeMembershipModal}
          labelledBy="membership-form-title"
          closeLabel={t('modal.close')}
          locked={isProcessing}
          className="max-w-2xl"
        >
          <div className="border-b border-line px-6 pb-5 pt-6 md:px-8">
            <h2 id="membership-form-title" className="pr-10 text-[1.5rem] font-bold leading-tight text-ink">{selectedPlan.name}</h2>
            <p className="mt-1 text-[1.0625rem] text-text">
              {promo ? (
                <>
                  <del className="mr-2 text-muted">{selectedPlan.price}</del>
                  <strong className="font-bold text-ink">{formatUSD(getFinalAmountUSD(selectedPlan))}</strong>{selectedPlan.period}
                </>
              ) : (
                <><strong className="font-bold text-ink">{selectedPlan.price}</strong>{selectedPlan.period}</>
              )}
            </p>
          </div>

          <form onSubmit={handlePayment} noValidate className="px-6 pb-8 pt-6 md:px-8">
            {summaryItems.length > 0 && (
              <div className="mb-8">
                <ErrorSummary title={t('modal.errorSummary')} items={summaryItems} />
              </div>
            )}

            <h3 className="text-[1.125rem] font-bold text-ink">{t('modal.yourDetails')}</h3>
            <div className="mt-5 space-y-6">
              {textField({ name: 'fullName', label: t('modal.fullNameLabel'), autoComplete: 'name' })}
              {textField({ name: 'email', label: t('modal.emailLabel'), type: 'email', autoComplete: 'email', width: 'max-w-md' })}
              {textField({ name: 'phone', label: t('modal.phoneLabel'), type: 'tel', autoComplete: 'tel', width: 'max-w-xs' })}
              {textField({ name: 'country', label: t('modal.countryLabel'), autoComplete: 'country-name', width: 'max-w-xs' })}
              {individual && textField({ name: 'dateOfBirth', label: t('modal.dobLabel'), type: 'date', autoComplete: 'bday', hint: t('modal.dobHint'), width: 'max-w-[14rem]' })}
            </div>

            <h3 className="mt-10 text-[1.125rem] font-bold text-ink">{t('modal.orgDetails')}</h3>
            <div className="mt-5 space-y-6">
              {individual && textField({ name: 'organization', label: t('modal.orgOptionalLabel'), autoComplete: 'organization', isOptional: true })}
              {institutional && textField({ name: 'organization', label: t('modal.orgNameLabel'), autoComplete: 'organization' })}
              {institutional && textField({ name: 'organizationEmail', label: t('modal.orgEmailLabel'), type: 'email', width: 'max-w-md' })}
              {textField({ name: 'position', label: t('modal.positionLabel'), autoComplete: 'organization-title', isOptional: true })}
            </div>

            {getPlanAmountUSD(selectedPlan) > 0 && (
              <div className="mt-10 border-t border-line pt-8">
                <Field
                  id="promoCode"
                  label={t('modal.promoLabel')}
                  optionalText={optional}
                  error={['empty', 'invalid', 'expired', 'error'].includes(promoStatus) ? t(`modal.promoStatus.${promoStatus}`) : undefined}
                  errorPrefix={errPrefix}
                >
                  <div className="flex max-w-md gap-2">
                    <input
                      id="promoCode"
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        if (!promo) setPromoStatus('idle');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (!promo) applyPromoCode();
                        }
                      }}
                      disabled={Boolean(promo) || promoStatus === 'checking' || isProcessing}
                      autoComplete="off"
                      spellCheck="false"
                      aria-describedby={['empty', 'invalid', 'expired', 'error'].includes(promoStatus) ? 'promoCode-error' : promo ? 'promoCode-applied' : undefined}
                      className={inputClass(['empty', 'invalid', 'expired', 'error'].includes(promoStatus), 'min-w-0 flex-1 uppercase')}
                    />
                    {promo ? (
                      <button
                        type="button"
                        onClick={resetPromo}
                        disabled={isProcessing}
                        className="focus-ring rounded-[2px] border-2 border-ink px-5 font-semibold text-ink transition-colors hover:bg-paper disabled:opacity-40"
                      >
                        {t('modal.promoRemove')}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={applyPromoCode}
                        disabled={promoStatus === 'checking' || isProcessing}
                        className="focus-ring rounded-[2px] border-2 border-ink bg-white px-5 font-semibold text-ink transition-colors hover:bg-paper disabled:opacity-60"
                      >
                        {promoStatus === 'checking' ? t('modal.promoChecking') : t('modal.promoApply')}
                      </button>
                    )}
                  </div>
                  {promo && (
                    <p id="promoCode-applied" className="mt-2 font-semibold text-success" role="status">
                      {t('modal.promoApplied', {
                        percent: promo.discountPercent,
                        price: formatUSD(getFinalAmountUSD(selectedPlan)),
                        original: selectedPlan.price
                      })}
                    </p>
                  )}
                </Field>
              </div>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isProcessing}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-[2px] border-b-2 border-ink-deep bg-ink px-6 py-3 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-rust disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessing
                  ? t('modal.processing')
                  : selectedPlan.price === 'By Invitation Only'
                    ? t('modal.submitApplication')
                    : t('modal.pay') + ' ' + (promo ? formatUSD(getFinalAmountUSD(selectedPlan)) : selectedPlan.price)}
              </button>
              <button
                type="button"
                onClick={closeMembershipModal}
                disabled={isProcessing}
                className="focus-ring rounded-[2px] px-4 py-3 font-semibold text-ink underline underline-offset-4 hover:text-rust disabled:opacity-40"
              >
                {t('modal.cancel')}
              </button>
            </div>
          </form>
        </Dialog>
      )}

      {/* PAGE HEADER: photograph hero */}
      <PageHero image="/memb2.png" alt="" title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <Button
          to="#plans"
          variant="onDark"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>{t('hero.applyNow')}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button to="/our-members" variant="outlineOnDark">
          <Users className="h-4 w-4" aria-hidden="true" />
          <span>{t('hero.seeMembers')}</span>
        </Button>
      </PageHero>

      {/* WHY JOIN: text beside a photograph */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="memb-why">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <h2 id="memb-why" className="heading-display text-[2.25rem] md:text-[3rem]">{t('whyJoin.heading')}</h2>
              <p className="prose-lead mt-6">{t('whyJoin.para1')}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{t('whyJoin.para2')}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{t('whyJoin.para3')}</p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <img src="/memb1.png" alt="Maritime professionals at a GoGMI event" loading="lazy" className="aspect-[4/5] w-full rounded-[2px] object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* PLANS: side-by-side comparison */}
      <section id="plans" className="scroll-mt-20 bg-paper py-20 md:py-28" aria-labelledby="memb-individual">
        <Container>
          <SectionHeader id="memb-individual" title={t('individual.heading')} />
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {individualPlans.map((plan) => (
              <PlanColumn
                key={plan.id}
                plan={plan}
                t={t}
                labelKey="individual.benefitsLabel"
                inviteOnly={plan.id === 'fellow'}
                highlighted={plan.popular}
                onApply={openMembershipModal}
              />
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="memb-institutional">
        <Container>
          <SectionHeader id="memb-institutional" title={t('institutional.heading')} />
          <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {institutionalPlans.map((plan) => (
              <PlanColumn
                key={plan.id}
                plan={plan}
                t={t}
                labelKey="institutional.benefitsLabel"
                inviteOnly={plan.id === 'strategic'}
                onApply={openMembershipModal}
              />
            ))}
          </ul>
        </Container>
      </section>

      {/* HOW TO APPLY: numbered steps joined by a line */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="memb-how">
        <Container>
          <SectionHeader id="memb-how" title={t('howToApply.heading')} />
          <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
            <span className="absolute left-0 right-0 top-5 hidden h-px bg-line md:block" aria-hidden="true"></span>
            {t('howToApply.steps', { returnObjects: true }).map((step, idx) => (
              <li key={step.title} className="relative">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[1.0625rem] font-bold text-white" aria-hidden="true">
                  {idx + 1}
                </span>
                <h3 className="mt-5 text-[1.125rem] font-bold text-ink">
                  <span className="sr-only">{idx + 1}. </span>{step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* BROCHURE */}
      <section className="bg-white py-20 md:py-24" aria-labelledby="memb-brochure">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <img src="/memb3.png" alt="" loading="lazy" className="aspect-[4/3] w-full rounded-[2px] border border-line object-cover" />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <h2 id="memb-brochure" className="heading-display text-[2rem] md:text-[2.5rem]">{t('brochure.heading')}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t('brochure.body')}</p>
              <a
                href={BROCHURE_URL}
                download="GoGMI-Membership-2026.pdf"
                className="focus-ring mt-8 inline-flex items-center gap-2 rounded-[2px] border border-ink bg-ink px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:border-rust hover:bg-rust"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>{t('brochure.button')}</span>
                <span className="font-normal text-white/80">(PDF)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Membership;
