import React, { useState, useEffect } from 'react';
import { Heart, ShieldCheck, BookOpen, Users, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const USD_TO_GHS = 10.88;

const Donate = () => {
  const { t } = useTranslation('donate');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    amount: '',
    message: '',
    isAnonymous: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!document.getElementById('paystack-script')) {
      const script = document.createElement('script');
      script.id = 'paystack-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
        setFormData({ fullName: '', email: '', phone: '', country: '', amount: '', message: '', isAnonymous: false });
      } else {
        setError(
          t('errors.recordFailed', { error: data.message || 'unknown error', reference: paymentReference })
        );
      }
    } catch (err) {
      setError(
        t('errors.recordUnconfirmed', { reference: paymentReference })
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.country) {
      setError(t('errors.fillRequired'));
      return;
    }

    const amountUSD = parseFloat(formData.amount);
    if (!amountUSD || amountUSD <= 0) {
      setError(t('errors.invalidAmount'));
      return;
    }

    if (typeof window.PaystackPop === 'undefined') {
      setError(t('errors.paymentLoading'));
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
      setError(t('errors.paymentInitFailed'));
    }
  };

  return (
    <div className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&fit=crop"
            alt="Gulf of Guinea coastline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#132552]/90 to-[#132552]/75" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 600 }}
          >
            <Heart className="w-4 h-4" />
            {t('hero.badge')}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEF3EC' }}>
                <BookOpen className="w-7 h-7" style={{ color: '#8E3400' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#132552' }}>{t('impact.research.title')}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('impact.research.desc')}
              </p>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEF3EC' }}>
                <Users className="w-7 h-7" style={{ color: '#8E3400' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#132552' }}>{t('impact.capacity.title')}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('impact.capacity.desc')}
              </p>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FEF3EC' }}>
                <ShieldCheck className="w-7 h-7" style={{ color: '#8E3400' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#132552' }}>{t('impact.advocacy.title')}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('impact.advocacy.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation form */}
      <section className="py-16" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            {success ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#ECFDF5' }}>
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#132552' }}>{t('success.heading')}</h2>
                <p className="text-gray-500 mb-1">
                  {t('success.body', { amount: '$' + success.amount })}
                </p>
                <p className="text-xs text-gray-400">{t('success.reference', { reference: success.reference })}</p>
                <button
                  onClick={() => setSuccess(null)}
                  className="mt-6 px-6 py-2.5 rounded-lg font-bold text-sm"
                  style={{ backgroundColor: '#8E3400', color: 'white' }}
                >
                  {t('success.another')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-bold mb-1" style={{ color: '#132552' }}>{t('form.heading')}</h2>
                <p className="text-sm text-gray-500 mb-4">{t('form.subheading')}</p>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t('form.fullNameLabel')}</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t('form.emailLabel')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('form.phoneLabel')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('form.countryLabel')}</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t('form.amountLabel')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      min="1"
                      step="0.01"
                      required
                      placeholder={t('form.amountPlaceholder')}
                      className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t('form.messageLabel')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder={t('form.messagePlaceholder')}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400] resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 focus:ring-2"
                    style={{ accentColor: '#8E3400' }}
                  />
                  <span className="text-sm text-gray-600">
                    {t('form.anonymousLabel')}
                    <span className="block text-xs text-gray-400 mt-0.5">
                      {t('form.anonymousSubtext')}
                    </span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-lg font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                  style={{ backgroundColor: '#8E3400' }}
                >
                  {isProcessing ? t('form.processing') : t('form.donateNow')}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  {t('form.securityNote')}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
