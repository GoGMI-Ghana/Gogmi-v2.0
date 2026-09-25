import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, AlertCircle, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IMSWGsignup = () => {
  const { t } = useTranslation('imswgSignup');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    country: '',
    position: '',
    institution: '',
    bio: '',
    areasOfInterest: [],
    profilePicture: null
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = t('interests.options', { returnObjects: true });
  const AREAS_OF_INTEREST = [
    { id: 'become_mentor', label: interestOptions.become_mentor },
    { id: 'join_panel', label: interestOptions.join_panel },
    { id: 'speak_events', label: interestOptions.speak_events },
    { id: 'contribute_projects', label: interestOptions.contribute_projects },
    { id: 'support_fundraising', label: interestOptions.support_fundraising },
    { id: 'join_membership', label: interestOptions.join_membership },
    { id: 'partner_with_us', label: interestOptions.partner_with_us }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t('errors.fullNameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid');
    }
    if (!formData.country.trim()) newErrors.country = t('errors.countryRequired');
    if (!formData.position.trim()) newErrors.position = t('errors.positionRequired');
    if (!formData.bio.trim()) newErrors.bio = t('errors.bioRequired');
    if (formData.areasOfInterest.length === 0) newErrors.areasOfInterest = t('errors.areasOfInterestRequired');
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInterestToggle = (id) => {
    setFormData(prev => {
      const current = prev.areasOfInterest;
      const updated = current.includes(id) ? current.filter(i => i !== id) : [...current, id];
      return { ...prev, areasOfInterest: updated };
    });
    if (errors.areasOfInterest) {
      setErrors(prev => ({ ...prev, areasOfInterest: '' }));
    }
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, profilePicture: t('errors.invalidImageType') }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, profilePicture: t('errors.imageTooLarge') }));
      return;
    }
    setFormData(prev => ({ ...prev, profilePicture: file }));
    setErrors(prev => ({ ...prev, profilePicture: '' }));
    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeProfilePicture = () => {
    setFormData(prev => ({ ...prev, profilePicture: null }));
    setProfilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const interestLabels = formData.areasOfInterest.map(id => {
        const found = AREAS_OF_INTEREST.find(a => a.id === id);
        return found ? found.label : id;
      });

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        country: formData.country,
        position: formData.position,
        institution: formData.institution,
        bio: formData.bio,
        areaOfInterest: interestLabels.join(', '),
        areaOfExpertise: formData.position
      };

      const response = await fetch('https://api.gogmi.org.gh/api/imswg-signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || t('errors.submissionFailed'));
      }

      setSubmitted(true);
      setFormData({
        fullName: '', email: '', whatsappNumber: '', country: '',
        position: '', institution: '', bio: '', areasOfInterest: [], profilePicture: null
      });
      setProfilePreview(null);

      // ✅ FIXED: No auto-redirect. User stays on success screen until
      // they click "Back to IMSWG" themselves.

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        submit: error.message || t('errors.submitFailedFallback')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success Screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1e293b' }}>
            {t('success.heading')}
          </h2>
          <p className="text-lg mb-4" style={{ color: '#64748b' }}>
            {t('success.body1')}
          </p>
          <p className="text-base mb-8" style={{ color: '#64748b' }}>
            {t('success.body2')}
            <br /><br />
            — {t('success.signature')}
          </p>
          <button
            onClick={() => navigate('/imswg')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('success.backButton')}</span>
          </button>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6 pt-24">
          <button
            onClick={() => navigate('/imswg')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">{t('header.backButton')}</span>
          </button>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#1e293b' }}>
            {t('header.title')}
          </h1>
          <p className="text-lg" style={{ color: '#64748b' }}>
            {t('header.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="mb-10 p-6 bg-slate-50 rounded-xl border-l-4 border-slate-900">
            <p className="text-base leading-relaxed font-medium" style={{ color: '#475569' }}>
              {t('intro')}
            </p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 font-semibold">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>{t('personalInfo.heading')}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2" data-error={!!errors.fullName}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>{t('personalInfo.fullNameLabel')} <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${errors.fullName ? 'border-red-300' : 'border-slate-200'}`} placeholder={t('personalInfo.fullNamePlaceholder')} />
                  {errors.fullName && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.fullName}</p>}
                </div>

                <div className="md:col-span-2" data-error={!!errors.email}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>{t('personalInfo.emailLabel')} <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${errors.email ? 'border-red-300' : 'border-slate-200'}`} placeholder={t('personalInfo.emailPlaceholder')} />
                  {errors.email && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>{t('personalInfo.whatsappLabel')}</label>
                  <input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent" placeholder={t('personalInfo.whatsappPlaceholder')} />
                </div>

                <div className="md:col-span-2" data-error={!!errors.country}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>{t('personalInfo.countryLabel')} <span className="text-red-500">*</span></label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${errors.country ? 'border-red-300' : 'border-slate-200'}`} placeholder={t('personalInfo.countryPlaceholder')} />
                  {errors.country && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.country}</p>}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>{t('professionalInfo.heading')}</h3>
              <div className="space-y-6">
                <div data-error={!!errors.position}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>{t('professionalInfo.positionLabel')} <span className="text-red-500">*</span></label>
                  <input type="text" name="position" value={formData.position} onChange={handleChange} className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${errors.position ? 'border-red-300' : 'border-slate-200'}`} placeholder={t('professionalInfo.positionPlaceholder')} />
                  {errors.position && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.position}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>{t('professionalInfo.institutionLabel')} <span className="text-slate-400 text-xs font-normal">{t('optional')}</span></label>
                  <input type="text" name="institution" value={formData.institution} onChange={handleChange} className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent" placeholder={t('professionalInfo.institutionPlaceholder')} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>{t('aboutYou.heading')}</h3>
              <div data-error={!!errors.bio}>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>{t('aboutYou.bioLabel')} <span className="text-red-500">*</span></label>
                <p className="text-xs mb-3" style={{ color: '#94a3b8' }}>{t('aboutYou.bioHelper')}</p>
                <textarea name="bio" value={formData.bio} onChange={handleChange} maxLength={500} rows={5} className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none ${errors.bio ? 'border-red-300' : 'border-slate-200'}`} placeholder={t('aboutYou.bioPlaceholder')} />
                <div className="flex justify-between items-center mt-1">
                  {errors.bio ? <p className="text-red-600 text-sm font-semibold">{errors.bio}</p> : <span />}
                  <p className="text-xs ml-auto" style={{ color: formData.bio.length >= 480 ? '#ef4444' : '#94a3b8' }}>{formData.bio.length}/500</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>{t('interests.heading')}</h3>
              <p className="text-sm mb-6" style={{ color: '#64748b' }}>{t('interests.helper')} <span className="text-red-500">*</span></p>
              <div className={`rounded-xl border-2 p-2 ${errors.areasOfInterest ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-slate-50'}`} data-error={!!errors.areasOfInterest}>
                <div className="grid sm:grid-cols-2 gap-2">
                  {AREAS_OF_INTEREST.map(({ id, label }) => {
                    const isChecked = formData.areasOfInterest.includes(id);
                    return (
                      <button key={id} type="button" onClick={() => handleInterestToggle(id)} className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left transition-all font-semibold text-sm ${isChecked ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'}`}>
                        <span className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${isChecked ? 'border-white bg-white' : 'border-slate-300 bg-white'}`}>
                          {isChecked && (<svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>)}
                        </span>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              {errors.areasOfInterest && <p className="text-red-600 text-sm mt-2 font-semibold">{errors.areasOfInterest}</p>}
              {formData.areasOfInterest.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.areasOfInterest.map(id => {
                    const interest = AREAS_OF_INTEREST.find(a => a.id === id);
                    return (
                      <span key={id} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        {interest?.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>{t('profilePicture.heading')} <span className="text-slate-400 text-sm font-normal">{t('profilePicture.optional')}</span></h3>
              <p className="text-sm mb-6" style={{ color: '#64748b' }}>{t('profilePicture.helper')}</p>
              {!profilePreview ? (
                <div>
                  <input type="file" ref={fileInputRef} accept="image/jpeg,image/png,image/webp" onChange={handleProfilePicture} className="hidden" id="profilePictureInput" />
                  <label htmlFor="profilePictureInput" className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-slate-400 hover:bg-slate-50" style={{ borderColor: errors.profilePicture ? '#fca5a5' : '#cbd5e1' }}>
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3"><Upload className="w-7 h-7 text-slate-400" /></div>
                    <p className="text-sm font-semibold" style={{ color: '#475569' }}>{t('profilePicture.uploadPrompt')}</p>
                    <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>{t('profilePicture.uploadHint')}</p>
                  </label>
                  {errors.profilePicture && <p className="text-red-600 text-sm mt-2 font-semibold">{errors.profilePicture}</p>}
                </div>
              ) : (
                <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                    <img src={profilePreview} alt={t('profilePicture.previewAlt')} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 mb-1">{formData.profilePicture?.name}</p>
                    <p className="text-xs text-slate-500">{formData.profilePicture ? (formData.profilePicture.size / 1024).toFixed(0) + ' KB' : ''}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {t('profilePicture.imageReady')}</p>
                  </div>
                  <button type="button" onClick={removeProfilePicture} className="p-2 rounded-full hover:bg-red-100 transition-colors text-slate-400 hover:text-red-500" title={t('profilePicture.removeTitle')}><X className="w-5 h-5" /></button>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
                {isSubmitting ? t('submit.submitting') : t('submit.button')}
              </button>
              <p className="text-sm text-center mt-4 italic" style={{ color: '#64748b' }}>
                {t('submit.consent')}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IMSWGsignup;
