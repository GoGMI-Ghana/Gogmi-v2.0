import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Twitter, Facebook, CheckCircle, Youtube, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation('contact');
  // Initialize formData state - THIS MUST BE AT THE TOP
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = t('form.errors.name');
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = t('form.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('form.errors.emailInvalid');
    }

    if (!formData.subject) {
      newErrors.subject = t('form.errors.subject');
    }

    if (!formData.message || !formData.message.trim()) {
      newErrors.message = t('form.errors.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('form.errors.messageTooShort');
    }
    
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors
    
    try {
      // ✅ FIXED: Using the correct Hostinger domain
      // Change this to 'https://gogmi.org.gh/api/contact-handler.php' once DNS is configured
      const response = await fetch('https://gogmi.org.gh/api/contact-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to send message');
      }

      // Success! Clear form and show success message
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        submit: error.message || t('form.errors.submitFallback')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/contactus.jpg" 
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#132552]/20 via-[#1A336C]/15 to-[#132552]/20"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-[#8E3400] rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-[#8E3400] rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#8E3400]/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#8E3400]/30 mb-6">
            <Mail className="w-5 h-5 text-[#8E3400]" />
            <span className="text-[#F5F7FA] text-sm" style={{ fontWeight: 600 }}>{t('badge')}</span>
          </div>

          <h1 className="text-5xl md:text-6xl text-[#F5F7FA] mb-6" style={{ fontWeight: 900 }}>
            {t('title')}
          </h1>
          <p className="text-xl text-[#F5F7FA]/90 max-w-3xl mx-auto" style={{ fontWeight: 400 }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-16 z-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Phone className="w-8 h-8" />,
                title: t('cards.call.title'),
                info: t('cards.call.info'),
                subinfo: t('cards.call.subinfo'),
                color: 'from-[#132552] to-[#1A336C]'
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: t('cards.email.title'),
                info: t('cards.email.info'),
                subinfo: t('cards.email.subinfo'),
                color: 'from-[#8E3400] to-[#6B2700]'
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: t('cards.visit.title'),
                info: t('cards.visit.info'),
                subinfo: t('cards.visit.subinfo'),
                color: 'from-[#1A336C] to-[#132552]'
              }
            ].map((item, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 text-[#F5F7FA] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2`}>
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl mb-2" style={{ fontWeight: 900 }}>{item.title}</h3>
                <p className="text-lg mb-1" style={{ fontWeight: 600 }}>{item.info}</p>
                <p className="text-sm text-[#F5F7FA]/80" style={{ fontWeight: 400 }}>{item.subinfo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-[#8E3400] rounded-full"></div>
                <span className="text-[#8E3400] tracking-wider text-sm uppercase" style={{ fontWeight: 600 }}>{t('form.eyebrow')}</span>
              </div>
              <h2 className="text-4xl text-[#132552] mb-4" style={{ fontWeight: 900 }}>{t('form.heading')}</h2>
              <p className="text-lg text-[#132552]/70 mb-8" style={{ fontWeight: 400 }}>
                {t('form.description')}
              </p>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <p className="text-green-800" style={{ fontWeight: 600 }}>
                    {t('form.successMessage')}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errors.submit && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-800" style={{ fontWeight: 600 }}>{errors.submit}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm text-[#132552] mb-2" style={{ fontWeight: 600 }}>
                      {t('form.nameLabel')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent text-[#132552] ${
                        errors.name ? 'border-red-300' : 'border-[#8E3400]/30'
                      }`}
                      placeholder={t('form.namePlaceholder')}
                      style={{ fontWeight: 400 }}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1" style={{ fontWeight: 600 }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm text-[#132552] mb-2" style={{ fontWeight: 600 }}>
                      {t('form.emailLabel')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent text-[#132552] ${
                        errors.email ? 'border-red-300' : 'border-[#8E3400]/30'
                      }`}
                      placeholder={t('form.emailPlaceholder')}
                      style={{ fontWeight: 400 }}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1" style={{ fontWeight: 600 }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm text-[#132552] mb-2" style={{ fontWeight: 600 }}>
                      {t('form.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-[#8E3400]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent text-[#132552]"
                      placeholder={t('form.phonePlaceholder')}
                      style={{ fontWeight: 400 }}
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm text-[#132552] mb-2" style={{ fontWeight: 600 }}>
                      {t('form.subjectLabel')}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent text-[#132552] ${
                        errors.subject ? 'border-red-300' : 'border-[#8E3400]/30'
                      }`}
                      style={{ fontWeight: 400 }}
                    >
                      <option value="">{t('form.subjectPlaceholder')}</option>
                      <option value="general">{t('form.subjectOptions.general')}</option>
                      <option value="partnership">{t('form.subjectOptions.partnership')}</option>
                      <option value="training">{t('form.subjectOptions.training')}</option>
                      <option value="research">{t('form.subjectOptions.research')}</option>
                      <option value="membership">{t('form.subjectOptions.membership')}</option>
                      <option value="other">{t('form.subjectOptions.other')}</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-600 text-sm mt-1" style={{ fontWeight: 600 }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm text-[#132552] mb-2" style={{ fontWeight: 600 }}>
                    {t('form.messageLabel')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent resize-none text-[#132552] ${
                      errors.message ? 'border-red-300' : 'border-[#8E3400]/30'
                    }`}
                    placeholder={t('form.messagePlaceholder')}
                    style={{ fontWeight: 400 }}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1" style={{ fontWeight: 600 }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8E3400] text-white py-4 rounded-xl text-lg hover:bg-[#6B2700] transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontWeight: 700 }}
                >
                  <span>{isSubmitting ? t('form.sending') : t('form.send')}</span>
                  {!isSubmitting && <Send className="w-5 h-5" />}
                </button>
              </form>
            </div>

            {/* Office Info & Map */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#8E3400]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-[#8E3400] rounded-full"></div>
                  <h3 className="text-2xl text-[#132552]" style={{ fontWeight: 900 }}>{t('officeHours.heading')}</h3>
                </div>
                <div className="space-y-4">
                  {t('officeHours.schedule', { returnObjects: true }).map((schedule, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-[#8E3400]/20 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-[#8E3400]" />
                        <span className="text-[#132552]" style={{ fontWeight: 600 }}>{schedule.days}</span>
                      </div>
                      <span className="text-[#132552]/70" style={{ fontWeight: 400 }}>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-80 shadow-lg border-2 border-[#8E3400]/20">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8267995654284!2d-0.1969654!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GOGMI Location"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-[#132552] to-[#1A336C] rounded-2xl p-8 text-[#F5F7FA] shadow-lg">
                <h3 className="text-2xl mb-4" style={{ fontWeight: 900 }}>{t('social.heading')}</h3>
                <p className="text-[#F5F7FA]/80 mb-6" style={{ fontWeight: 400 }}>
                  {t('social.subtitle')}
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: <Linkedin className="w-5 h-5" />, link: 'https://gh.linkedin.com/company/gulf-of-guinea-maritime-institute', name: 'LinkedIn' },
                    { icon: <Twitter className="w-5 h-5" />, link: '#', name: 'Twitter' },
                    { icon: <Facebook className="w-5 h-5" />, link: 'https://www.facebook.com/GoGMIofficial/', name: 'Facebook' },
                    { icon: <Youtube className="w-5 h-5" />, link: '#', name: 'YouTube' },
                    { icon: <MessageCircle className="w-5 h-5" />, link: '#', name: 'WhatsApp' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#F5F7FA]/10 rounded-xl flex items-center justify-center hover:bg-[#8E3400] transition-all hover:scale-110 group relative"
                      title={social.name}
                    >
                      {social.icon}
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#132552] text-[#F5F7FA] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ fontWeight: 600 }}>
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-[#8E3400] rounded-full"></div>
                <span className="text-[#8E3400] tracking-wider text-sm uppercase" style={{ fontWeight: 600 }}>{t('faq.eyebrow')}</span>
                <div className="w-12 h-1 bg-[#8E3400] rounded-full"></div>
              </div>
            </div>
            <h2 className="text-4xl text-[#132552] mb-4" style={{ fontWeight: 900 }}>
              {t('faq.heading')}
            </h2>
            <p className="text-lg text-[#132552]/70" style={{ fontWeight: 400 }}>
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {t('faq.items', { returnObjects: true }).map((faq, idx) => (
              <div key={idx} className="bg-[#F5F7FA] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-[#8E3400]/20 hover:border-[#8E3400]/40">
                <h4 className="text-lg text-[#132552] mb-2" style={{ fontWeight: 900 }}>
                  {faq.q}
                </h4>
                <p className="text-[#132552]/70" style={{ fontWeight: 400 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default Contact;
