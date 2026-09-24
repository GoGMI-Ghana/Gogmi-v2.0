import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Users } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const Membership = () => {
  const { t } = useTranslation('membership');
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
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
  });

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

  const openMembershipModal = (plan) => {
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
    setFormData({
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
    });
  };

  const activateMembership = async (paymentReference) => {
    try {
      const priceMatch = selectedPlan.price.match(/[\d,]+/g);
      const amount = priceMatch
        ? parseFloat(priceMatch.join('').replace(',', ''))
        : 0;

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
        paymentReference
      };

      const apiUrl = 'https://api.gogmi.org.gh/api';

      const result = await fetch(`${apiUrl}/membership/apply.php`, {
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

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.country) {
      alert(t('alerts.fillRequired'));
      return;
    }

    if (isIndividualPlan(selectedPlan.id) && !formData.dateOfBirth) {
      alert(t('alerts.enterDob'));
      return;
    }

    if (formData.membershipType === 'institutional' && (!formData.organization || !formData.organizationEmail)) {
      alert(t('alerts.fillOrg'));
      return;
    }

    if (!selectedPlan.price || selectedPlan.price === 'By Invitation Only') {
      alert(t('alerts.invitationOnly'));
      closeMembershipModal();
      return;
    }

    const priceMatch = selectedPlan.price.match(/[\d,]+/g);
    const amountUSD  = priceMatch ? parseFloat(priceMatch.join('').replace(',', '')) : 0;

    if (amountUSD === 0) {
      alert(t('alerts.invitationOnly'));
      closeMembershipModal();
      return;
    }

    if (typeof window.PaystackPop === 'undefined') {
      alert(t('alerts.paymentLoading'));
      return;
    }

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

  const handleBrochureDownload = () => {
    const brochureUrl = '/resources/pdfs/GoGMI-Membership-2026-new.pdf';
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = 'GoGMI-Membership-2026.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  return (
    <div className="w-full">
      {showModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: '#132552', fontWeight: 700 }}>
                    {selectedPlan.name}
                  </h3>
                  <p className="text-lg mt-1" style={{ color: '#8E3400', fontWeight: 600 }}>
                    {selectedPlan.price}{selectedPlan.period}
                  </p>
                </div>
                <button
                  onClick={closeMembershipModal}
                  disabled={isProcessing}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all disabled:opacity-40"
                  style={{ color: '#4B5563' }}
                  aria-label={t('modal.close')}
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handlePayment} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                    {t('modal.fullNameLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    placeholder={t('modal.fullNamePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                    {t('modal.emailLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    placeholder={t('modal.emailPlaceholder')}
                  />
                </div>

                {isIndividualPlan(selectedPlan.id) && (
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                      {t('modal.dobLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    />
                  </div>
                )}

                {isIndividualPlan(selectedPlan.id) && (
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                      {t('modal.orgOptionalLabel')} <span className="text-slate-400 text-xs font-normal">{t('modal.optional')}</span>
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                      placeholder={t('modal.orgOptionalPlaceholder')}
                    />
                  </div>
                )}

                {formData.membershipType === 'institutional' && (
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                      {t('modal.positionLabel')}
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                      placeholder={t('modal.positionPlaceholder')}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                    {t('modal.phoneLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    placeholder={t('modal.phonePlaceholder')}
                  />
                </div>

                {formData.membershipType === 'institutional' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                        {t('modal.orgNameLabel')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                        placeholder={t('modal.orgNamePlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                        {t('modal.orgEmailLabel')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="organizationEmail"
                        value={formData.organizationEmail}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                        placeholder={t('modal.orgEmailPlaceholder')}
                      />
                    </div>
                  </>
                )}

                {isIndividualPlan(selectedPlan.id) && (
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                      {t('modal.positionLabel')}
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                      placeholder={t('modal.positionPlaceholder')}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#132552' }}>
                    {t('modal.countryLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    placeholder={t('modal.countryPlaceholder')}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeMembershipModal}
                  disabled={isProcessing}
                  className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all disabled:opacity-40"
                  style={{ borderColor: '#132552', color: '#132552', fontWeight: 700 }}
                >
                  {t('modal.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-60"
                  style={{ backgroundColor: isProcessing ? '#6B2700' : '#8E3400', fontWeight: 700 }}
                  onMouseEnter={(e) => { if (!isProcessing) e.currentTarget.style.backgroundColor = '#6B2700'; }}
                  onMouseLeave={(e) => { if (!isProcessing) e.currentTarget.style.backgroundColor = '#8E3400'; }}
                >
                  {isProcessing
                    ? t('modal.processing')
                    : selectedPlan.price === 'By Invitation Only'
                      ? t('modal.submitApplication')
                      : t('modal.pay') + ' ' + selectedPlan.price}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: '#132552' }}>
        <div className="absolute inset-0">
          <img
            src="/memb2.png"
            alt="Membership"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8 font-semibold">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.scrollTo({ top: document.getElementById('plans')?.offsetTop || 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all"
                style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 700 }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B2700'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8E3400'}
              >
                <span>{t('hero.applyNow')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/our-members"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all border-2 border-white/40 text-white hover:bg-white/10"
                style={{ fontWeight: 700 }}
              >
                <Users className="w-5 h-5" />
                <span>{t('hero.seeMembers')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
                {t('whyJoin.heading')}
              </h2>
              <div className="space-y-4 text-base leading-relaxed font-semibold" style={{ color: '#4B5563' }}>
                <p>{t('whyJoin.para1')}</p>
                <p>{t('whyJoin.para2')}</p>
                <p>{t('whyJoin.para3')}</p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img src="/memb1.png" alt="Maritime Professionals" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {t('benefits.heading')}
            </h2>
</div>

          <div className="grid md:grid-cols-3 gap-8">
            {t('benefits.items', { returnObjects: true }).map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552', fontWeight: 700 }}>{item.title}</h3>
                <p className="text-base leading-relaxed font-semibold" style={{ color: '#4B5563' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>{t('individual.heading')}</h2>
</div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {individualPlans.map((plan) => (
              <div
                key={plan.id}
                className={'bg-white rounded-xl border ' + (plan.popular ? 'border-[#8E3400] shadow-xl' : 'border-gray-200 shadow-md') + ' hover:shadow-lg transition-all duration-300'}
              >
                {plan.popular && (
                  <div className="px-4 py-2 text-sm font-bold text-center rounded-t-lg text-white" style={{ backgroundColor: '#8E3400', fontWeight: 700 }}>{t('individual.mostPopular')}</div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#132552', fontWeight: 700 }}>{plan.name}</h3>
                  {plan.subtitle && (<p className="text-sm font-semibold mb-2" style={{ color: '#8E3400' }}>{plan.subtitle}</p>)}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black" style={{ color: '#132552', fontWeight: 900 }}>{plan.price}</span>
                      <span className="font-semibold" style={{ color: '#4B5563' }}>{plan.period}</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed font-semibold mb-4" style={{ color: '#4B5563' }}>{plan.description}</p>
                  {plan.id !== 'fellow' && (
                    <>
                      <div className="mb-3"><p className="text-xs font-bold mb-2" style={{ color: '#132552' }}>{t('individual.benefitsLabel')}</p></div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} />
                            <span className="text-xs leading-relaxed font-semibold" style={{ color: '#4B5563' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => openMembershipModal(plan)}
                        className="w-full py-2.5 rounded-lg font-bold transition-all text-sm"
                        style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 700 }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B2700'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8E3400'}
                      >
                        {t('applyNow')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>{t('institutional.heading')}</h2>
</div>

          <div className="grid md:grid-cols-3 gap-8">
            {institutionalPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#132552', fontWeight: 700 }}>{plan.name}</h3>
                  <div className="mb-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black" style={{ color: '#132552', fontWeight: 900 }}>{plan.price}</span>
                      <span className="font-semibold" style={{ color: '#4B5563' }}>{plan.period}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed font-semibold mb-4" style={{ color: '#4B5563' }}>{plan.description}</p>
                  {plan.id !== 'strategic' && (
                    <>
                      <div className="mb-3"><p className="text-xs font-bold mb-2" style={{ color: '#132552' }}>{t('institutional.benefitsLabel')}</p></div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} />
                            <span className="text-sm leading-relaxed font-semibold" style={{ color: '#4B5563' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => openMembershipModal(plan)}
                        className="w-full py-2.5 rounded-lg font-bold transition-all text-sm"
                        style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 700 }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B2700'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8E3400'}
                      >
                        {t('applyNow')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>{t('howToApply.heading')}</h2>
</div>

          <div className="grid md:grid-cols-4 gap-8">
            {t('howToApply.steps', { returnObjects: true }).map((process, idx) => ({ ...process, step: String(idx + 1) })).map((process, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-black mb-4 text-white" style={{ backgroundColor: '#132552', fontWeight: 900 }}>
                  {process.step}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#132552', fontWeight: 700 }}>{process.title}</h3>
                <p className="text-sm leading-relaxed font-semibold" style={{ color: '#4B5563' }}>{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img src="/memb3.png" alt="Membership Brochure" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>{t('brochure.heading')}</h2>
              <p className="text-lg mb-8 leading-relaxed font-semibold" style={{ color: '#4B5563' }}>{t('brochure.body')}</p>
              <button
                onClick={handleBrochureDownload}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all"
                style={{ backgroundColor: '#132552', color: 'white', fontWeight: 700 }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0F1C3F'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#132552'}
              >
                <span>{t('brochure.button')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
