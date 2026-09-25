import React, { useState, useEffect } from 'react';
import { Download, Calendar, MapPin, BookOpen, CheckCircle, X, Tag, Shield, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const USD_TO_GHS = 10.88;
const API_URL = 'https://api.gogmi.org.gh/api';

const MaritimeGovernanceCourse = () => {
  const { t } = useTranslation('maritimeGovernanceCourse');
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);
  const [applyStep, setApplyStep] = useState(null);
  const [memberCode, setMemberCode] = useState('');
  const [memberCodeError, setMemberCodeError] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nonMemberForm, setNonMemberForm] = useState({ fullName: '', email: '', phone: '', position: '', institution: '', country: '', membershipType: '', dateOfBirth: '' });
  const [memberForm, setMemberForm] = useState({ fullName: '', email: '', phone: '', position: '', institution: '', country: '' });

  const MEMBER_PRICE = 350;
  const NON_MEMBER_PRICE = 450;
  const DISCOUNT = NON_MEMBER_PRICE - MEMBER_PRICE;
  const DISCOUNT_PERCENT = Math.round((DISCOUNT / NON_MEMBER_PRICE) * 100);

  useEffect(() => { const h = () => setIsSticky(window.scrollY > 200); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { if (!document.getElementById('paystack-script')) { const s = document.createElement('script'); s.id = 'paystack-script'; s.src = 'https://js.paystack.co/v1/inline.js'; s.async = true; document.body.appendChild(s); } }, []);

  const openApply = () => { setApplyStep('choose'); setMemberCode(''); setMemberCodeError(''); setMemberData(null); document.body.style.overflow = 'hidden'; };
  const closeApply = () => { if (isProcessing) return; setApplyStep(null); setMemberCode(''); setMemberCodeError(''); setMemberData(null); setNonMemberForm({ fullName: '', email: '', phone: '', position: '', institution: '', country: '', membershipType: '' }); setMemberForm({ fullName: '', email: '', phone: '', position: '', institution: '', country: '' }); document.body.style.overflow = 'unset'; };

  const verifyMemberCode = async () => {
    if (!memberCode.trim()) { setMemberCodeError(t('alerts.enterMembershipId')); return; }
    setIsVerifying(true); setMemberCodeError('');
    try {
      const res = await fetch(API_URL + '/courses/maritime-governance.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'verify-member', membershipId: memberCode.trim() }) });
      const data = await res.json();
      if (data.success) { setMemberData(data.data); setMemberForm({ fullName: data.data.fullName || '', email: data.data.email || '', phone: data.data.phone || '', position: data.data.position || '', institution: data.data.organization || '', country: data.data.country || '' }); setApplyStep('member'); }
      else { setMemberCodeError(data.message || t('alerts.invalidMembershipId')); }
    } catch { setMemberCodeError(t('alerts.verifyError')); }
    finally { setIsVerifying(false); }
  };

  const handleNonMemberChange = (e) => setNonMemberForm({ ...nonMemberForm, [e.target.name]: e.target.value });
  const handleMemberChange = (e) => setMemberForm({ ...memberForm, [e.target.name]: e.target.value });

  const processPayment = (email, amountUSD, applicantType, formPayload) => {
    if (typeof window.PaystackPop === 'undefined') { alert(t('alerts.paymentLoading')); return; }
    const amountPesewas = Math.round(amountUSD * USD_TO_GHS * 100);
    const reference = 'GOGMI-MGC-' + Date.now() + '-' + Math.floor(Math.random() * 1e6);
    setIsProcessing(true);
    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY, email, amount: amountPesewas, currency: 'GHS', ref: reference,
        channels: ['card', 'mobile_money', 'bank', 'ussd', 'qr', 'bank_transfer'],
        metadata: { custom_fields: [{ display_name: 'Course', variable_name: 'course', value: 'Maritime Governance' }, { display_name: 'Type', variable_name: 'type', value: applicantType }] },
        callback: (response) => { activateRegistration(response.reference, applicantType, formPayload); },
        onClose: () => { setIsProcessing(false); alert(t('alerts.paymentCancelled')); }
      });
      handler.openIframe();
    } catch (error) { setIsProcessing(false); alert(t('alerts.paymentFailed', { error: error.message })); }
  };

  const activateRegistration = async (paymentReference, applicantType, formPayload) => {
    try {
      const body = {
        action: 'register',
        ...formPayload,
        applicantType,
        paymentReference,
      };
      if (applicantType === 'member') {
        body.membershipId = memberCode.trim();
      }
      const res = await fetch(API_URL + '/courses/maritime-governance.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) {
        let msg = t('alerts.registrationSuccess', { reference: paymentReference });
        if (data.data.autoMembership) { msg += t('alerts.autoMembership', { membershipId: data.data.membershipId }); }
        msg += t('alerts.confirmationEmail', { email: formPayload.email });
        alert(msg); closeApply();
      } else { alert(t('alerts.registrationFailed', { message: data.message, reference: paymentReference })); }
    } catch { alert(t('alerts.registrationError', { reference: paymentReference })); }
    finally { setIsProcessing(false); }
  };

  const handleMemberSubmit = (e) => { e.preventDefault(); if (!memberForm.fullName || !memberForm.email || !memberForm.phone || !memberForm.country || !memberForm.position) { alert(t('alerts.fillRequired')); return; } processPayment(memberForm.email, MEMBER_PRICE, 'member', memberForm); };
  const handleNonMemberSubmit = (e) => {
    e.preventDefault();
    if (!nonMemberForm.fullName || !nonMemberForm.email || !nonMemberForm.phone || !nonMemberForm.country || !nonMemberForm.position) { alert(t('alerts.fillRequired')); return; }
    if (!nonMemberForm.membershipType) { alert(t('alerts.selectMembershipType')); return; }
    if (!nonMemberForm.dateOfBirth) { alert(t('alerts.enterDob')); return; }
    processPayment(nonMemberForm.email, NON_MEMBER_PRICE, 'non-member', nonMemberForm);
  };

  const handleBrochureDownload = () => { const l = document.createElement('a'); l.href = '/resources/pdfs/Maritime-Governance-Course-Brochure.pdf'; l.download = 'Maritime-Governance-Course-Brochure.pdf'; l.target = '_blank'; document.body.appendChild(l); l.click(); document.body.removeChild(l); };

  const tabs = [{ id: 'overview', label: t('tabs.overview') }, { id: 'format', label: t('tabs.format') }, { id: 'attend', label: t('tabs.attend') }, { id: 'team', label: t('tabs.team') }, { id: 'modules', label: t('tabs.modules') }];
  const moduleNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const moduleList = t('modules.moduleList', { returnObjects: true }).map((m, i) => ({ ...m, number: moduleNumbers[i] }));
  const weeklyModuleNumbers = [[1, 2], [3, 4], [5, 6], [7, 8]];
  const weeklyBreakdown = t('modules.weeklyBreakdown', { returnObjects: true }).map((w, i) => ({ ...w, modules: weeklyModuleNumbers[i] }));
  const facultyNames = ['Vice Admiral Issah Adam Yakubu (Rtd.)', 'Prof. Jeffrey Landsman', 'Dr. Alberta Ama Sagoe'];
  const faculty = t('team.faculty', { returnObjects: true }).map((f, i) => ({ ...f, name: facultyNames[i] }));

  const inputClass = "w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent transition-all";
  const labelClass = "block text-sm font-bold mb-2";

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      {applyStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <h3 className="text-2xl font-black" style={{ color: '#132552' }}>{applyStep === 'choose' ? t('modal.titles.choose') : applyStep === 'verify' ? t('modal.titles.verify') : applyStep === 'member' ? t('modal.titles.member') : t('modal.titles.nonmember')}</h3>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>{t('modal.courseSubtitle')}</p>
              </div>
              <button onClick={closeApply} disabled={isProcessing} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"><X className="w-6 h-6" style={{ color: '#6B7280' }} /></button>
            </div>

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

            {applyStep === 'verify' && (
              <div className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}><div><p className="text-sm font-bold" style={{ color: '#166534' }}>{t('modal.verify.memberPriceLabel')}</p><p className="text-xs" style={{ color: '#4B5563' }}>{t('modal.verify.save', { discount: DISCOUNT, percent: DISCOUNT_PERCENT })}</p></div><div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p><p className="text-xs line-through" style={{ color: '#9CA3AF' }}>${NON_MEMBER_PRICE}</p></div></div>
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

            {applyStep === 'member' && (
              <form onSubmit={handleMemberSubmit} className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}><div><p className="text-sm font-bold" style={{ color: '#166534' }}>{t('modal.member.verifiedBadge')}</p><p className="text-xs" style={{ color: '#4B5563' }}>{t('modal.member.saveAmount', { discount: DISCOUNT })}</p></div><div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p></div></div>
                <div className="space-y-4">
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.fullNameLabel')} <span className="text-red-500">*</span></label><input type="text" name="fullName" value={memberForm.fullName} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.emailLabel')} <span className="text-red-500">*</span></label><input type="email" name="email" value={memberForm.email} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.phoneLabel')} <span className="text-red-500">*</span></label><input type="tel" name="phone" value={memberForm.phone} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder={t('modal.member.phonePlaceholder')} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.positionLabel')} <span className="text-red-500">*</span></label><input type="text" name="position" value={memberForm.position} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.institutionLabel')} <span className="text-red-500">*</span></label><input type="text" name="institution" value={memberForm.institution} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.member.countryLabel')} <span className="text-red-500">*</span></label><input type="text" name="country" value={memberForm.country} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setApplyStep('verify')} disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all disabled:opacity-40" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>{t('modal.member.back')}</button>
                  <button type="submit" disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 hover:opacity-90" style={{ backgroundColor: '#132552' }}>{isProcessing ? t('modal.member.processing') : t('modal.member.pay', { amount: MEMBER_PRICE })}</button>
                </div>
              </form>
            )}

            {applyStep === 'nonmember' && (
              <form onSubmit={handleNonMemberSubmit} className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}><div><p className="text-sm font-bold" style={{ color: '#92400E' }}>{t('modal.nonmember.standardRate')}</p><p className="text-xs" style={{ color: '#4B5563' }}>{t('modal.nonmember.freeMembership')}</p></div><div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</p></div></div>
                <div className="space-y-4">
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.fullNameLabel')} <span className="text-red-500">*</span></label><input type="text" name="fullName" value={nonMemberForm.fullName} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder={t('modal.nonmember.fullNamePlaceholder')} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.emailLabel')} <span className="text-red-500">*</span></label><input type="email" name="email" value={nonMemberForm.email} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder={t('modal.nonmember.emailPlaceholder')} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>{t('modal.nonmember.dobLabel')} <span className="text-red-500">*</span></label><input type="date" name="dateOfBirth" value={nonMemberForm.dateOfBirth} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
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

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0"><img src="/conf2.jpg" alt="Maritime Security Strategy Course" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #132552 0%, rgba(19, 37, 82, 0.95) 50%, rgba(142, 52, 0, 0.85) 100%)' }}></div></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full mb-6 border-2" style={{ borderColor: '#8E3400', backgroundColor: 'rgba(142, 52, 0, 0.2)' }}><span className="text-white text-sm font-bold tracking-wider">{t('hero.badge')}</span></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">{t('hero.title')}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 font-semibold">{t('hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openApply} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all hover:scale-105 shadow-xl" style={{ backgroundColor: '#8E3400', color: 'white' }}>{t('hero.applyNow')}</button>
            <button onClick={handleBrochureDownload} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all hover:scale-105 shadow-xl border-2 border-white/30 hover:bg-white/10" style={{ color: 'white' }}><Download className="w-5 h-5" /><span>{t('hero.downloadBrochure')}</span></button>
          </div>
        </div>
      </section>

      <div className={`sticky top-0 z-40 bg-white border-b transition-all ${isSticky ? 'shadow-lg' : ''}`} style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-6"><div className="flex overflow-x-auto no-scrollbar">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-4 transition-all ${activeTab === tab.id ? 'border-[#8E3400] text-[#132552]' : 'border-transparent text-gray-500 hover:text-[#132552]'}`}>{tab.label}</button>))}</div></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className={isSticky ? 'lg:sticky lg:top-24' : ''}>
              <div className="bg-white rounded-xl border-2 p-8 space-y-6" style={{ borderColor: '#E5E7EB' }}>
                <div><div className="flex items-center gap-2 mb-2"><Calendar className="w-5 h-5" style={{ color: '#8E3400' }} /><h3 className="font-bold text-sm" style={{ color: '#132552' }}>{t('sidebar.datesHeading')}</h3></div><p className="text-base" style={{ color: '#4B5563' }}>{t('sidebar.datesValue')}</p><p className="text-sm mt-1" style={{ color: '#6B7280' }}>{t('sidebar.datesSubtext')}</p></div>
                <div><div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5" style={{ color: '#8E3400' }} /><h3 className="font-bold text-sm" style={{ color: '#132552' }}>{t('sidebar.statusHeading')}</h3></div><p className="text-base font-semibold" style={{ color: '#16A34A' }}>{t('sidebar.statusValue')}</p></div>
                <div><div className="flex items-center gap-2 mb-2"><BookOpen className="w-5 h-5" style={{ color: '#8E3400' }} /><h3 className="font-bold text-sm" style={{ color: '#132552' }}>{t('sidebar.formatHeading')}</h3></div><p className="text-base" style={{ color: '#4B5563' }}>{t('sidebar.formatValue')}</p></div>
                <div><div className="flex items-center gap-2 mb-2"><MapPin className="w-5 h-5" style={{ color: '#8E3400' }} /><h3 className="font-bold text-sm" style={{ color: '#132552' }}>{t('sidebar.locationHeading')}</h3></div><p className="text-base" style={{ color: '#4B5563' }}>{t('sidebar.locationValue')} </p></div>
                <div>
                  <div className="flex items-center gap-2 mb-3"><Tag className="w-5 h-5" style={{ color: '#8E3400' }} /><h3 className="font-bold text-sm" style={{ color: '#132552' }}>{t('sidebar.feesHeading')}</h3></div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F0FDF4' }}><div><p className="text-xs font-bold" style={{ color: '#166534' }}>{t('sidebar.membersLabel')}</p><p className="text-xs" style={{ color: '#4B5563' }}>{t('sidebar.saveLabel', { percent: DISCOUNT_PERCENT })}</p></div><p className="text-lg font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p></div>
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}><p className="text-xs font-bold" style={{ color: '#6B7280' }}>{t('sidebar.nonMembersLabel')}</p><p className="text-lg font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</p></div>
                  </div>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <button onClick={openApply} className="w-full py-3.5 rounded-lg font-bold transition-all hover:shadow-lg mb-3" style={{ backgroundColor: '#8E3400', color: 'white' }}>{t('sidebar.applyNow')}</button>
                  <button onClick={handleBrochureDownload} className="w-full py-3.5 rounded-lg font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2 border-2" style={{ borderColor: '#132552', color: '#132552' }}><Download className="w-5 h-5" /><span>{t('sidebar.downloadBrochure')}</span></button>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}><p className="text-sm" style={{ color: '#6B7280' }}>{t('sidebar.questionsPrompt')} <a href="/contact" className="font-bold hover:underline" style={{ color: '#8E3400' }}>{t('sidebar.contactUs')}</a></p></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>{t('overview.heading')}</h2>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>{t('overview.intro')}</p>
                  <div className="bg-gradient-to-br from-[#132552] to-[#1A336C] rounded-xl p-8 text-white my-8">
                    <h3 className="text-2xl font-bold mb-4">{t('overview.objectivesHeading')}</h3>
                    <ul className="space-y-3">{t('overview.objectives', { returnObjects: true }).map((obj, i) => (<li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} /><span>{obj}</span></li>))}</ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552' }}>{t('overview.outcomesHeading')}</h3>
                  <div className="grid md:grid-cols-2 gap-6">{t('overview.outcomes', { returnObjects: true }).map((o, i) => (<div key={i} className="p-6 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}><h4 className="font-bold mb-2" style={{ color: '#132552' }}>{o.title}</h4><p className="text-sm" style={{ color: '#6B7280' }}>{o.desc}</p></div>))}</div>
                </div>
              </div>
            )}
            {activeTab === 'format' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>{t('format.heading')}</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center p-8 rounded-xl" style={{ backgroundColor: '#8E3400', color: 'white' }}><div className="text-5xl font-black mb-2">2</div><div className="text-lg font-semibold">{t('format.weeksLabel')}</div></div>
                  <div className="text-center p-8 rounded-xl" style={{ backgroundColor: '#132552', color: 'white' }}><div className="text-5xl font-black mb-2">8</div><div className="text-lg font-semibold">{t('format.modulesLabel')}</div></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552' }}>{t('format.liveSessionsHeading')}</h3>
                  <ul className="space-y-2">{t('format.liveSessionsList', { returnObjects: true }).map((s, i) => (<li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} /><span style={{ color: '#4B5563' }}>{s}</span></li>))}</ul>
                </div>
              </div>
            )}
            {activeTab === 'attend' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>{t('attend.heading')}</h2>
                <div className="grid md:grid-cols-2 gap-6">{t('attend.groups', { returnObjects: true }).map((g, i) => (<div key={i} className="p-6 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}><h3 className="text-lg font-bold mb-2" style={{ color: '#132552' }}>{g.title}</h3><p className="text-sm" style={{ color: '#6B7280' }}>{g.description}</p></div>))}</div>
              </div>
            )}
            {activeTab === 'team' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>{t('team.heading')}</h2>
                <div className="space-y-6">{faculty.map((m, i) => (<div key={i} className="p-6 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}><h3 className="text-xl font-bold mb-1" style={{ color: '#132552' }}>{m.name}</h3><p className="text-base font-semibold mb-2" style={{ color: '#8E3400' }}>{m.title}</p><p className="text-sm" style={{ color: '#6B7280' }}>{m.credentials}</p></div>))}</div>
              </div>
            )}
            {activeTab === 'modules' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#132552' }}>{t('modules.heading')}</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">{moduleList.map((module) => (<div key={module.number} className="p-6 rounded-xl border-2 hover:shadow-lg transition-all relative overflow-hidden" style={{ borderColor: module.number % 2 === 0 ? '#132552' : '#8E3400' }}><div className="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 transform rotate-45" style={{ backgroundColor: module.number % 2 === 0 ? '#132552' : '#8E3400' }}></div><div className="absolute top-2 right-3 text-white font-bold z-10">#{module.number}</div><h3 className="text-lg font-bold mb-3 pr-8" style={{ color: '#132552' }}>{module.title}</h3><p className="text-sm" style={{ color: '#6B7280' }}>{module.description}</p></div>))}</div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#132552' }}>{t('modules.weeklyBreakdownHeading')}</h3>
                <div className="space-y-6">{weeklyBreakdown.map((week, idx) => (<div key={idx} className="rounded-xl border-2 overflow-hidden" style={{ borderColor: '#E5E7EB' }}><div className="p-6" style={{ backgroundColor: '#132552' }}><div className="flex items-center justify-between"><div><div className="text-sm font-bold mb-1" style={{ color: '#8E3400' }}>{week.week}</div><h4 className="text-xl font-bold text-white">{week.title}</h4></div><div className="flex gap-1">{week.modules.map((n) => (<span key={n} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: n % 2 === 0 ? '#132552' : '#8E3400' }}>{n}</span>))}</div></div></div><div className="p-6"><h5 className="font-bold mb-3 text-sm" style={{ color: '#6B7280' }}>{t('modules.keySessionsLabel')}</h5><ul className="space-y-2">{week.sessions.map((s, si) => (<li key={si} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8E3400' }} /><span className="text-sm" style={{ color: '#4B5563' }}>{s}</span></li>))}</ul></div></div>))}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaritimeGovernanceCourse;
