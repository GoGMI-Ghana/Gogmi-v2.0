import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, CheckCircle, Clock, Users, BookOpen, Award,
  FileText, Shield, AlertTriangle, Search, BarChart3, Brain,
  Microscope, Download, Globe, Calendar, X, Tag, User
} from 'lucide-react';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const USD_TO_GHS = 10.88;
const API_URL = 'https://api.gogmi.org.gh/api';

const MarineCasualtyCourse = () => {
  const { t } = useTranslation('marineCasualtyCourse');
  const [activeModule, setActiveModule] = useState(null);
  const [applyStep, setApplyStep] = useState(null);
  const [memberCode, setMemberCode] = useState('');
  const [memberCodeError, setMemberCodeError] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [nonMemberForm, setNonMemberForm] = useState({
    fullName: '', email: '', phone: '', position: '', institution: '', country: '', membershipType: ''
  });
  const [memberForm, setMemberForm] = useState({
    fullName: '', email: '', phone: '', position: '', institution: '', country: ''
  });

  const MEMBER_PRICE = 400;
  const NON_MEMBER_PRICE = 500;
  const DISCOUNT = NON_MEMBER_PRICE - MEMBER_PRICE;
  const DISCOUNT_PERCENT = Math.round((DISCOUNT / NON_MEMBER_PRICE) * 100);

  useEffect(() => {
    if (!document.getElementById('paystack-script')) {
      const s = document.createElement('script');
      s.id = 'paystack-script';
      s.src = 'https://js.paystack.co/v1/inline.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const openApply = () => { setApplyStep('choose'); setMemberCode(''); setMemberCodeError(''); setMemberData(null); document.body.style.overflow = 'hidden'; };
  const closeApply = () => {
    if (isProcessing) return;
    setApplyStep(null); setMemberCode(''); setMemberCodeError(''); setMemberData(null);
    setNonMemberForm({ fullName: '', email: '', phone: '', position: '', institution: '', country: '', membershipType: '' });
    setMemberForm({ fullName: '', email: '', phone: '', position: '', institution: '', country: '' });
    document.body.style.overflow = 'unset';
  };

  const verifyMemberCode = async () => {
    if (!memberCode.trim()) { setMemberCodeError(t('alerts.enterMembershipId')); return; }
    setIsVerifying(true); setMemberCodeError('');
    try {
      const res = await fetch(API_URL + '/courses/marine-casualty.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-member', membershipId: memberCode.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setMemberData(data.data);
        setMemberForm({
          fullName: data.data.fullName || '', email: data.data.email || '',
          phone: data.data.phone || '', position: data.data.position || '',
          institution: data.data.organization || '', country: data.data.country || ''
        });
        setApplyStep('member');
      } else { setMemberCodeError(data.message || t('alerts.invalidMembershipId')); }
    } catch { setMemberCodeError(t('alerts.verifyError')); }
    finally { setIsVerifying(false); }
  };

  const handleNonMemberChange = (e) => setNonMemberForm({ ...nonMemberForm, [e.target.name]: e.target.value });
  const handleMemberChange = (e) => setMemberForm({ ...memberForm, [e.target.name]: e.target.value });

  const processPayment = (email, amountUSD, applicantType, formPayload) => {
    if (typeof window.PaystackPop === 'undefined') { alert(t('alerts.paymentLoading')); return; }
    const amountPesewas = Math.round(amountUSD * USD_TO_GHS * 100);
    const reference = 'GOGMI-MCC-' + Date.now() + '-' + Math.floor(Math.random() * 1e6);
    setIsProcessing(true);
    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY, email, amount: amountPesewas, currency: 'GHS', ref: reference,
        channels: ['card', 'mobile_money', 'bank', 'ussd', 'qr', 'bank_transfer'],
        metadata: { custom_fields: [
          { display_name: 'Course', variable_name: 'course', value: 'Marine Casualty Investigation' },
          { display_name: 'Type', variable_name: 'type', value: applicantType }
        ]},
        callback: (response) => { activateRegistration(response.reference, applicantType, formPayload); },
        onClose: () => { setIsProcessing(false); alert(t('alerts.paymentCancelled')); }
      });
      handler.openIframe();
    } catch (error) { setIsProcessing(false); alert(t('alerts.paymentFailed', { error: error.message })); }
  };

  const activateRegistration = async (paymentReference, applicantType, formPayload) => {
    try {
      const body = { action: 'register', ...formPayload, applicantType, paymentReference };
      if (applicantType === 'member') body.membershipId = memberCode.trim();
      const res = await fetch(API_URL + '/courses/marine-casualty.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        let msg = t('alerts.registrationSuccess', { reference: paymentReference });
        if (data.data.autoMembership) {
          msg += t('alerts.autoMembership', { membershipId: data.data.membershipId });
        }
        msg += t('alerts.confirmationEmail', { email: formPayload.email });
        alert(msg); closeApply();
      } else { alert(t('alerts.registrationFailed', { message: data.message, reference: paymentReference })); }
    } catch { alert(t('alerts.registrationError', { reference: paymentReference })); }
    finally { setIsProcessing(false); }
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberForm.fullName || !memberForm.email || !memberForm.phone || !memberForm.country || !memberForm.position) { alert(t('alerts.fillRequired')); return; }
    processPayment(memberForm.email, MEMBER_PRICE, 'member', memberForm);
  };

  const handleNonMemberSubmit = (e) => {
    e.preventDefault();
    if (!nonMemberForm.fullName || !nonMemberForm.email || !nonMemberForm.phone || !nonMemberForm.country || !nonMemberForm.position) { alert(t('alerts.fillRequired')); return; }
    if (!nonMemberForm.membershipType) { alert(t('alerts.selectMembershipType')); return; }
    processPayment(nonMemberForm.email, NON_MEMBER_PRICE, 'non-member', nonMemberForm);
  };

  const handleBrochureDownload = async () => {
    try {
      const response = await fetch('/resources/pdfs/casualtybronchure.pdf');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Marine-Casualty-Course-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/resources/pdfs/casualtybronchure.pdf', '_blank');
    }
  };

  const inputClass = "w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent transition-all";
  const labelClass = "block text-sm font-bold mb-2";

  const moduleIcons = [
    <Shield className="w-6 h-6" />, <Search className="w-6 h-6" />, <BarChart3 className="w-6 h-6" />,
    <Brain className="w-6 h-6" />, <Microscope className="w-6 h-6" />, <FileText className="w-6 h-6" />
  ];
  const moduleColors = ["#8E3400", "#132552", "#8E3400", "#132552", "#8E3400", "#132552"];
  const translatedModules = t('modules', { returnObjects: true });
  const modules = translatedModules.map((m, i) => ({
    number: i + 1, title: m.title, icon: moduleIcons[i], color: moduleColors[i],
    topics: m.topics, learningOutcomes: m.learningOutcomes
  }));

  const targetParticipants = t('participants.list', { returnObjects: true });

  const expectedOutcomes = t('outcomesSection.list', { returnObjects: true });

  const highlightIcons = [
    <Shield className="w-5 h-5" />, <Users className="w-5 h-5" />, <Globe className="w-5 h-5" />, <Award className="w-5 h-5" />
  ];
  const translatedHighlights = t('overview.highlights', { returnObjects: true });
  const courseHighlights = translatedHighlights.map((h, i) => ({ icon: highlightIcons[i], title: h.title, description: h.description }));

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* APPLY MODAL */}
      {applyStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <h3 className="text-2xl font-black" style={{ color: '#132552' }}>
                  {applyStep === 'choose' ? t('modal.titles.choose') : applyStep === 'verify' ? t('modal.titles.verify') : applyStep === 'member' ? t('modal.titles.member') : t('modal.titles.nonmember')}
                </h3>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>{t('modal.courseSubtitle')}</p>
              </div>
              <button onClick={closeApply} disabled={isProcessing} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"><X className="w-6 h-6" style={{ color: '#6B7280' }} /></button>
            </div>

            {/* Choose */}
            {applyStep === 'choose' && (
              <div className="p-8">
                <p className="text-base mb-8 text-center" style={{ color: '#4B5563' }}>{t('modal.choose.question')}</p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <button onClick={() => setApplyStep('verify')} className="group p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl hover:scale-105" style={{ borderColor: '#132552' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#132552' }}><Shield className="w-6 h-6 text-white" /></div>
                    <h4 className="text-xl font-black mb-2" style={{ color: '#132552' }}>{t('modal.choose.memberTitle')}</h4>
                    <div className="flex items-center gap-2 mb-3"><span className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</span><span className="text-sm line-through" style={{ color: '#9CA3AF' }}>${NON_MEMBER_PRICE}</span></div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style={{ backgroundColor: '#16A34A' }}><Tag className="w-3 h-3" />{t('modal.choose.memberSave', { discount: DISCOUNT, percent: DISCOUNT_PERCENT })}</div>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{t('modal.choose.memberDesc')}</p>
                  </button>
                  <button onClick={() => setApplyStep('nonmember')} className="group p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl hover:scale-105" style={{ borderColor: '#8E3400' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#8E3400' }}><User className="w-6 h-6 text-white" /></div>
                    <h4 className="text-xl font-black mb-2" style={{ color: '#132552' }}>{t('modal.choose.nonMemberTitle')}</h4>
                    <div className="flex items-center gap-2 mb-3"><span className="text-2xl font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</span></div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>{t('modal.choose.standardRate')}</div>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{t('modal.choose.nonMemberDesc')}</p>
                  </button>
                </div>
                <p className="text-center text-sm" style={{ color: '#9CA3AF' }}>{t('modal.choose.joinPrompt')} <a href="/membership" className="font-bold hover:underline" style={{ color: '#8E3400' }}>{t('modal.choose.joinLink')}</a> {t('modal.choose.joinSuffix')}</p>
              </div>
            )}

            {/* Verify */}
            {applyStep === 'verify' && (
              <div className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div><p className="text-sm font-bold" style={{ color: '#166534' }}>{t('modal.verify.memberPriceLabel')}</p><p className="text-xs" style={{ color: '#4B5563' }}>{t('modal.verify.save', { discount: DISCOUNT, percent: DISCOUNT_PERCENT })}</p></div>
                  <div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p><p className="text-xs line-through" style={{ color: '#9CA3AF' }}>${NON_MEMBER_PRICE}</p></div>
                </div>
                <div className="mb-6">
                  <label className={labelClass} style={{ color: '#132552' }}>{t('modal.verify.inputLabel')} <span className="text-red-500">*</span></label>
                  <input type="text" value={memberCode} onChange={(e) => { setMemberCode(e.target.value); setMemberCodeError(''); }} className={inputClass} style={{ borderColor: memberCodeError ? '#EF4444' : '#E5E7EB' }} placeholder={t('modal.verify.placeholder')} />
                  {memberCodeError && <p className="text-red-500 text-sm mt-2 font-semibold">{memberCodeError}</p>}
                  <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>{t('modal.verify.helper')}</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setApplyStep('choose')} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>{t('modal.verify.back')}</button>
                  <button type="button" onClick={verifyMemberCode} disabled={isVerifying} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#132552' }}>{isVerifying ? t('modal.verify.verifying') : t('modal.verify.verifyContinue')}</button>
                </div>
              </div>
            )}

            {/* Member Form */}
            {applyStep === 'member' && (
              <form onSubmit={handleMemberSubmit} className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div><p className="text-sm font-bold" style={{ color: '#166534' }}>{t('modal.member.verifiedBadge')}</p><p className="text-xs" style={{ color: '#4B5563' }}>{t('modal.member.saveAmount', { discount: DISCOUNT })}</p></div>
                  <div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p></div>
                </div>
                <div className="space-y-4">
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.fullNameLabel')} <span className="text-red-500">*</span></label><input type="text" name="fullName" value={memberForm.fullName} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.emailLabel')} <span className="text-red-500">*</span></label><input type="email" name="email" value={memberForm.email} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.phoneLabel')} <span className="text-red-500">*</span></label><input type="tel" name="phone" value={memberForm.phone} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder={t('modal.member.phonePlaceholder')} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.positionLabel')} <span className="text-red-500">*</span></label><input type="text" name="position" value={memberForm.position} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.institutionLabel')} <span className="text-slate-400 text-xs font-normal">{t('modal.member.optional')}</span></label><input type="text" name="institution" value={memberForm.institution} onChange={handleMemberChange} className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.countryLabel')} <span className="text-red-500">*</span></label><input type="text" name="country" value={memberForm.country} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setApplyStep('verify')} disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all disabled:opacity-40" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>{t('modal.member.back')}</button>
                  <button type="submit" disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 hover:opacity-90" style={{ backgroundColor: '#132552' }}>{isProcessing ? t('modal.member.processing') : t('modal.member.pay', { amount: MEMBER_PRICE })}</button>
                </div>
              </form>
            )}

            {/* Non-Member Form */}
            {applyStep === 'nonmember' && (
              <form onSubmit={handleNonMemberSubmit} className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}>
                  <div><p className="text-sm font-bold" style={{ color: '#92400E' }}>{t('modal.nonmember.standardRate')}</p><p className="text-xs" style={{ color: '#4B5563' }}>{t('modal.nonmember.freeMembership')}</p></div>
                  <div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</p></div>
                </div>
                <div className="space-y-4">
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.fullNameLabel')} <span className="text-red-500">*</span></label><input type="text" name="fullName" value={nonMemberForm.fullName} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder={t('modal.nonmember.fullNamePlaceholder')} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.emailLabel')} <span className="text-red-500">*</span></label><input type="email" name="email" value={nonMemberForm.email} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder={t('modal.nonmember.emailPlaceholder')} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.phoneLabel')} <span className="text-red-500">*</span></label><input type="tel" name="phone" value={nonMemberForm.phone} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder={t('modal.nonmember.phonePlaceholder')} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.positionLabel')} <span className="text-red-500">*</span></label><input type="text" name="position" value={nonMemberForm.position} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.institutionLabel')} <span className="text-slate-400 text-xs font-normal">{t('modal.nonmember.optional')}</span></label><input type="text" name="institution" value={nonMemberForm.institution} onChange={handleNonMemberChange} className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.countryLabel')} <span className="text-red-500">*</span></label><input type="text" name="country" value={nonMemberForm.country} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder={t('modal.nonmember.countryPlaceholder')} /></div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.membershipTypeLabel')} <span className="text-red-500">*</span></label>
                    <select name="membershipType" value={nonMemberForm.membershipType} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }}>
                      <option value="">{t('modal.nonmember.membershipTypePlaceholder')}</option>
                      <option value="student">{t('modal.nonmember.membershipTypeStudent')}</option>
                      <option value="associate">{t('modal.nonmember.membershipTypeAssociate')}</option>
                      <option value="professional">{t('modal.nonmember.membershipTypeProfessional')}</option>
                    </select>
                    <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>{t('modal.nonmember.membershipTypeHelper')}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setApplyStep('choose')} disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all disabled:opacity-40" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>{t('modal.nonmember.back')}</button>
                  <button type="submit" disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 hover:opacity-90" style={{ backgroundColor: '#16A34A' }}>{isProcessing ? t('modal.nonmember.processing') : t('modal.nonmember.pay', { amount: NON_MEMBER_PRICE })}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/casualtyimage.jpg" alt={t('hero.imageAlt')} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/95 via-orange-800/90 to-orange-900/95"></div>
        </div>
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-sm font-bold uppercase tracking-wide">{t('hero.badge')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>{t('hero.title')}</h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/95">{t('hero.subtitle')}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg"><Clock className="w-5 h-5" /><span className="font-semibold">{t('hero.duration')}</span></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg"><Globe className="w-5 h-5" /><span className="font-semibold">{t('hero.format')}</span></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg"><BookOpen className="w-5 h-5" /><span className="font-semibold">{t('hero.moduleCount')}</span></div>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"><p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-1">{t('hero.memberPriceLabel')}</p><p className="text-2xl font-black">${MEMBER_PRICE} <span className="text-sm font-normal line-through text-white/50">${NON_MEMBER_PRICE}</span></p></div>
              <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"><p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-1">{t('hero.standardRateLabel')}</p><p className="text-2xl font-black">${NON_MEMBER_PRICE}</p></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={openApply} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-2xl" style={{ backgroundColor: '#132552', color: 'white' }}><span>{t('hero.applyNow')}</span><ArrowRight className="w-5 h-5" /></button>
              <button onClick={handleBrochureDownload} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 border-2 border-white/30 hover:bg-white/10"><Download className="w-5 h-5" /><span>{t('hero.downloadBrochure')}</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>{t('overview.label')}</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552' }}>{t('overview.heading')}</h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>{t('overview.para1')}</p>
              <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>{t('overview.para2')}</p>
            </div>
            <div className="relative">
              <img src="/casualty1.png" alt={t('overview.imageAlt')} className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-2" style={{ borderColor: '#8E3400' }}>
                <div className="text-3xl font-black mb-1" style={{ color: '#8E3400' }}>{t('overview.imageBadgeTitle')}</div>
                <p className="text-sm font-semibold" style={{ color: '#132552' }}>{t('overview.imageBadgeSubtitle')}</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseHighlights.map((h, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)', color: '#8E3400' }}>{h.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#132552' }}>{h.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RATIONALE */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8E3400' }}><AlertTriangle className="w-6 h-6 text-white" /></div>
              <div>
                <h2 className="text-3xl font-black mb-4" style={{ color: '#132552' }}>{t('rationale.heading')}</h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#4B5563' }}>{t('rationale.para1')}</p>
                <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>{t('rationale.para2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>{t('modulesSection.label')}</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552' }}>{t('modulesSection.heading')}</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>{t('modulesSection.subtitle')}</p>
          </div>
          <div className="space-y-4">
            {modules.map((module, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
                <button onClick={() => setActiveModule(activeModule === idx ? null : idx)} className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: module.color + '15', color: module.color }}>{module.icon}</div>
                    <div className="flex-1">
                      <span className="text-sm font-bold px-3 py-1 rounded-full mb-2 inline-block" style={{ backgroundColor: module.color + '15', color: module.color }}>{t('modulesSection.moduleLabel', { number: module.number })}</span>
                      <h3 className="text-xl font-bold" style={{ color: '#132552' }}>{module.title}</h3>
                    </div>
                  </div>
                  <svg className={`w-6 h-6 transform transition-transform ${activeModule === idx ? 'rotate-180' : ''}`} style={{ color: '#6B7280' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {activeModule === idx && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid md:grid-cols-2 gap-8 pt-6">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: '#6B7280' }}>{t('modulesSection.topicsHeading')}</h4>
                        <ul className="space-y-3">{module.topics.map((topic, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: module.color }} /><span className="text-sm" style={{ color: '#4B5563' }}>{topic}</span></li>))}</ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: '#6B7280' }}>{t('modulesSection.outcomesHeading')}</h4>
                        <ul className="space-y-3">{module.learningOutcomes.map((o, i) => (<li key={i} className="flex items-start gap-2"><div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: module.color + '15', color: module.color }}><span className="text-xs font-bold">{i+1}</span></div><span className="text-sm" style={{ color: '#4B5563' }}>{o}</span></li>))}</ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTICIPANTS */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>{t('participants.label')}</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552' }}>{t('participants.heading')}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetParticipants.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)' }}><Users className="w-5 h-5" style={{ color: '#8E3400' }} /></div><p className="text-base font-semibold" style={{ color: '#132552' }}>{p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>{t('outcomesSection.label')}</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552' }}>{t('outcomesSection.heading')}</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {expectedOutcomes.map((o, idx) => (
              <div key={idx} className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-6 border-l-4" style={{ borderColor: '#8E3400' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8E3400', color: 'white' }}><span className="text-lg font-bold">{idx+1}</span></div>
                  <p className="text-lg font-semibold pt-1" style={{ color: '#132552' }}>{o}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMAT */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>{t('format.heading')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#8E3400' }}>{t('format.deliveryHeading')}</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}><strong>{t('format.deliveryInPersonLabel')}</strong> {t('format.deliveryInPersonValue')}<br/><strong>{t('format.deliveryVirtualLabel')}</strong> {t('format.deliveryVirtualValue')}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#8E3400' }}>{t('format.methodsHeading')}</h3>
                  <ul className="space-y-2">
                    {t('format.methods', { returnObjects: true }).map((m, i) => (
                      <li key={i} className="flex items-start gap-2"><CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} /><span className="text-sm" style={{ color: '#4B5563' }}>{m}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>{t('alignment.heading')}</h2>
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#8E3400' }}>{t('alignment.alignsHeading')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)' }}><FileText className="w-4 h-4" style={{ color: '#8E3400' }} /></div><span className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{t('alignment.items.0')}</span></li>
                  <li className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)' }}><Shield className="w-4 h-4" style={{ color: '#8E3400' }} /></div><span className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{t('alignment.items.1')}</span></li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">{t('alignment.impactHeading')}</h3>
                <ul className="space-y-2 text-sm">
                  {t('alignment.impactList', { returnObjects: true }).map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><span>•</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarineCasualtyCourse;
