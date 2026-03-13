import React, { useState, useRef } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Upload, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IMSWGsignup = () => {
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

  const AREAS_OF_INTEREST = [
    { id: 'become_mentor', label: 'Become a Mentor' },
    { id: 'join_panel', label: 'Join a Panel for Discussions' },
    { id: 'speak_events', label: 'Speak at Our Events' },
    { id: 'contribute_projects', label: 'Contribute to Our Projects' },
    { id: 'support_fundraising', label: 'Support Fundraising Projects' },
    { id: 'join_membership', label: 'Join Our Membership' },
    { id: 'partner_with_us', label: 'Partner with Us' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.country.trim()) newErrors.country = 'Country of residence is required';
    if (!formData.position.trim()) newErrors.position = 'Position/Title is required';
    if (!formData.bio.trim()) newErrors.bio = 'A brief bio is required';
    if (formData.areasOfInterest.length === 0) newErrors.areasOfInterest = 'Please select at least one area of interest';

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
      const updated = current.includes(id)
        ? current.filter(i => i !== id)
        : [...current, id];
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
      setErrors(prev => ({ ...prev, profilePicture: 'Please upload a JPG, PNG, or WEBP image' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, profilePicture: 'Image must be smaller than 5MB' }));
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
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // NOTE: Backend endpoint to be created later
      // For now we'll just simulate success
      // When backend is ready, replace with:
      // const payload = new FormData();
      // Object.entries(formData).forEach(([key, val]) => {
      //   if (key === 'areasOfInterest') payload.append(key, JSON.stringify(val));
      //   else if (val !== null) payload.append(key, val);
      // });
      // const response = await fetch('https://api.gogmi.org.gh/api/imswg-signup.php', {
      //   method: 'POST',
      //   body: payload,
      // });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      setSubmitted(true);
      setFormData({
        fullName: '', email: '', whatsappNumber: '', country: '',
        position: '', institution: '', bio: '', areasOfInterest: [], profilePicture: null
      });
      setProfilePreview(null);

      setTimeout(() => {
        navigate('/imswg');
      }, 4000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        submit: error.message || 'Failed to submit. Please try again or contact us at info@gogmi.org.gh'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success Screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1e293b' }}>
            Interest Submitted!
          </h2>
          <p className="text-lg mb-4" style={{ color: '#64748b' }}>
            Thank you for your interest in the International Maritime Security Working Group. We appreciate you sharing your background and areas of interest with us.
          </p>
          <p className="text-base mb-8" style={{ color: '#64748b' }}>
            Our team will review your submission and reach out to you with next steps. Keep an eye on your inbox!
            <br /><br />
            — GoGMI
          </p>
          <button
            onClick={() => navigate('/imswg')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to IMSWG</span>
          </button>
        </div>
      </div>
    );
  }

  // ── Main Form ──
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6 pt-24">
          <button
            onClick={() => navigate('/imswg')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to IMSWG</span>
          </button>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#1e293b' }}>
            Explore Your Interest
          </h1>
          <p className="text-lg" style={{ color: '#64748b' }}>
            International Maritime Security Working Group
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">

          {/* Introduction */}
          <div className="mb-10 p-6 bg-slate-50 rounded-xl border-l-4 border-slate-900">
            <p className="text-base leading-relaxed font-medium" style={{ color: '#475569' }}>
              Tell us about yourself and how you'd like to be involved with IMSWG. Whether you want to mentor, speak, collaborate, or simply join our network — we'd love to hear from you.
            </p>
          </div>

          {/* Global error */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 font-semibold">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* ── SECTION 1: Personal Information ── */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="md:col-span-2" data-error={!!errors.fullName}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${errors.fullName ? 'border-red-300' : 'border-slate-200'}`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div className="md:col-span-2" data-error={!!errors.email}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${errors.email ? 'border-red-300' : 'border-slate-200'}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.email}</p>}
                </div>

                {/* WhatsApp */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>
                    Country Code Plus WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>

                {/* Country */}
                <div className="md:col-span-2" data-error={!!errors.country}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>
                    Country of Residence <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${errors.country ? 'border-red-300' : 'border-slate-200'}`}
                    placeholder="e.g., Ghana"
                  />
                  {errors.country && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.country}</p>}
                </div>

              </div>
            </div>

            {/* ── SECTION 2: Professional Information ── */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>
                Professional Information
              </h3>

              <div className="space-y-6">

                {/* Position */}
                <div data-error={!!errors.position}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>
                    Current Professional Position / Title Held <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${errors.position ? 'border-red-300' : 'border-slate-200'}`}
                    placeholder="e.g., Maritime Security Analyst"
                  />
                  {errors.position && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.position}</p>}
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>
                    Institution / Organisation <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    placeholder="e.g., Maritime Authority, Security Firm, etc."
                  />
                </div>

              </div>
            </div>

            {/* ── SECTION 3: Brief Bio ── */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>
                About You
              </h3>

              <div data-error={!!errors.bio}>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#1e293b' }}>
                  Brief Bio <span className="text-red-500">*</span>
                </label>
                <p className="text-xs mb-3" style={{ color: '#94a3b8' }}>
                  Tell us a little about your background, expertise, and what you bring to the maritime security space. (Max 500 characters)
                </p>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={500}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none ${errors.bio ? 'border-red-300' : 'border-slate-200'}`}
                  placeholder="e.g., I am a maritime security professional with over 10 years of experience in coastal surveillance and policy development across West Africa..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.bio
                    ? <p className="text-red-600 text-sm font-semibold">{errors.bio}</p>
                    : <span />
                  }
                  <p className="text-xs ml-auto" style={{ color: formData.bio.length >= 480 ? '#ef4444' : '#94a3b8' }}>
                    {formData.bio.length}/500
                  </p>
                </div>
              </div>
            </div>

            {/* ── SECTION 4: Areas of Interest ── */}
            <div>
              <h3 className="text-xl font-bold mb-2 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>
                Areas of Interest
              </h3>
              <p className="text-sm mb-6" style={{ color: '#64748b' }}>
                Select all that apply — you can choose more than one. <span className="text-red-500">*</span>
              </p>

              <div
                className={`rounded-xl border-2 p-2 ${errors.areasOfInterest ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-slate-50'}`}
                data-error={!!errors.areasOfInterest}
              >
                <div className="grid sm:grid-cols-2 gap-2">
                  {AREAS_OF_INTEREST.map(({ id, label }) => {
                    const isChecked = formData.areasOfInterest.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleInterestToggle(id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left transition-all font-semibold text-sm ${
                          isChecked
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {/* Custom checkbox */}
                        <span className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                          isChecked ? 'border-white bg-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              {errors.areasOfInterest && (
                <p className="text-red-600 text-sm mt-2 font-semibold">{errors.areasOfInterest}</p>
              )}

              {/* Selected summary */}
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

            {/* ── SECTION 5: Profile Picture ── */}
            <div>
              <h3 className="text-xl font-bold mb-2 pb-2 border-b-2 border-slate-100" style={{ color: '#1e293b' }}>
                Profile Picture <span className="text-slate-400 text-sm font-normal">(Optional)</span>
              </h3>
              <p className="text-sm mb-6" style={{ color: '#64748b' }}>
                Upload a professional headshot. Accepted formats: JPG, PNG, WEBP. Max size: 5MB.
              </p>

              {!profilePreview ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleProfilePicture}
                    className="hidden"
                    id="profilePictureInput"
                  />
                  <label
                    htmlFor="profilePictureInput"
                    className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-slate-400 hover:bg-slate-50"
                    style={{ borderColor: errors.profilePicture ? '#fca5a5' : '#cbd5e1' }}
                  >
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <Upload className="w-7 h-7 text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: '#475569' }}>Click to upload your photo</p>
                    <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>JPG, PNG or WEBP up to 5MB</p>
                  </label>
                  {errors.profilePicture && (
                    <p className="text-red-600 text-sm mt-2 font-semibold">{errors.profilePicture}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                    <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 mb-1">{formData.profilePicture?.name}</p>
                    <p className="text-xs text-slate-500">
                      {formData.profilePicture ? `${(formData.profilePicture.size / 1024).toFixed(0)} KB` : ''}
                    </p>
                    <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Image ready to upload
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeProfilePicture}
                    className="p-2 rounded-full hover:bg-red-100 transition-colors text-slate-400 hover:text-red-500"
                    title="Remove photo"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* ── SUBMIT ── */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? 'Submitting...' : 'Submit My Interest'}
              </button>
              <p className="text-sm text-center mt-4 italic" style={{ color: '#64748b' }}>
                By submitting this form, you agree to be contacted regarding IMSWG activities and opportunities.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default IMSWGsignup;
