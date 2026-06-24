import React, { useState, useEffect } from 'react';
import {
  ArrowRight, CheckCircle, Clock, Users, BookOpen, Award,
  FileText, Shield, AlertTriangle, Search, BarChart3, Brain,
  Microscope, Download, Globe, Calendar, X, Tag, User
} from 'lucide-react';

const PAYSTACK_PUBLIC_KEY = 'pk_live_5deb38ad873d2e40332a00250c2fbd6199b5de30';
const USD_TO_GHS = 10.88;
const API_URL = 'https://api.gogmi.org.gh/api';

const MarineCasualtyCourse = () => {
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
    if (!memberCode.trim()) { setMemberCodeError('Please enter your Membership ID'); return; }
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
      } else { setMemberCodeError(data.message || 'Invalid Membership ID'); }
    } catch { setMemberCodeError('Unable to verify. Please check your connection.'); }
    finally { setIsVerifying(false); }
  };

  const handleNonMemberChange = (e) => setNonMemberForm({ ...nonMemberForm, [e.target.name]: e.target.value });
  const handleMemberChange = (e) => setMemberForm({ ...memberForm, [e.target.name]: e.target.value });

  const processPayment = (email, amountUSD, applicantType, formPayload) => {
    if (typeof window.PaystackPop === 'undefined') { alert('Payment system loading. Please wait.'); return; }
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
        onClose: () => { setIsProcessing(false); alert('Payment cancelled.'); }
      });
      handler.openIframe();
    } catch (error) { setIsProcessing(false); alert('Payment failed: ' + error.message); }
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
        let msg = 'Registration Successful!\n\nYou are now registered for the Marine Casualty Investigation Course.\nReference: ' + paymentReference + '\n';
        if (data.data.autoMembership) {
          msg += '\nCongratulations! You are now a GoGMI member.\nMembership ID: ' + data.data.membershipId + '\nUse this ID to login at gogmi.org.gh/login\n';
        }
        msg += '\nA confirmation email has been sent to ' + formPayload.email;
        alert(msg); closeApply();
      } else { alert('Registration failed: ' + data.message + '\nReference: ' + paymentReference + '\nContact info@gogmi.org.gh'); }
    } catch { alert('Registration error. Contact info@gogmi.org.gh with reference: ' + paymentReference); }
    finally { setIsProcessing(false); }
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberForm.fullName || !memberForm.email || !memberForm.phone || !memberForm.country || !memberForm.position) { alert('Please fill all required fields'); return; }
    processPayment(memberForm.email, MEMBER_PRICE, 'member', memberForm);
  };

  const handleNonMemberSubmit = (e) => {
    e.preventDefault();
    if (!nonMemberForm.fullName || !nonMemberForm.email || !nonMemberForm.phone || !nonMemberForm.country || !nonMemberForm.position) { alert('Please fill all required fields'); return; }
    if (!nonMemberForm.membershipType) { alert('Please select a membership type'); return; }
    processPayment(nonMemberForm.email, NON_MEMBER_PRICE, 'non-member', nonMemberForm);
  };

  const handleBrochureDownload = async () => {
    try {
      const response = await fetch('/resources/pdfs/casualtybrochure.pdf');
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
      window.open('/resources/pdfs/casualtybrochure.pdf', '_blank');
    }
  };

  const inputClass = "w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent transition-all";
  const labelClass = "block text-sm font-bold mb-2";

  const modules = [
    { number: 1, title: "Marine Casualty Investigation – Concepts, Scope and Legal Framework", icon: <Shield className="w-6 h-6" />, color: "#8E3400",
      topics: ["Understanding the importance of marine casualty investigations","Understanding the nature and types of marine casualties","Legal definition and classification under national and regional provisions","IMO Casualty Investigation Code and related SOLAS requirements","Detailed study of Sections of the IMO Casualty Investigation Code","Roles of the Maritime Administration, Wreck Commissioner, and Assessors","Procedures for preliminary inquiry and formal investigation","The 'Stop Rule'","Appeals, rehearing, and disciplinary actions on certificates","Coordination between national agencies"],
      learningOutcomes: ["Explain the philosophy, importance and international background of marine casualty investigations","Identify key international instruments (IMO Casualty Investigation Code, SOLAS requirements)","Describe the roles, powers and responsibilities of Maritime Administration, Wreck Commissioner and Assessors","Outline the full procedural sequence for preliminary inquiries, formal investigations, appeals","Assess inter-agency coordination responsibilities in casualty response"] },
    { number: 2, title: "Investigation Procedures and Evidence Handling", icon: <Search className="w-6 h-6" />, color: "#132552",
      topics: ["Step-by-step process of investigation","Scene management and preservation of evidence","Witness interviewing and record-keeping","Application of the causal chain and root cause analysis models","The 5 Whys technique for drilling down to root causes","Fishbone (Ishikawa) diagram for categorizing contributing factors","Barrier analysis: identifying failed or missing controls","Drafting structured investigation reports"],
      learningOutcomes: ["Execute a systematic step-by-step investigation process","Apply scene management techniques to preserve evidence","Conduct effective witness interviews and maintain accurate records","Use causal chain and root cause analysis models","Produce structured investigation reports with clear findings"] },
    { number: 3, title: "Safety Data Management and Reporting", icon: <BarChart3 className="w-6 h-6" />, color: "#8E3400",
      topics: ["Standard formats for casualty reporting and documentation","Integration of data into national and IMO systems (GISIS)","Overview of Global Integrated Shipping Information System (GISIS)","Types and sources of maritime safety data","Data recorders: VDR, SVDR","Safety trend analysis and data visualisation techniques","Risk matrices and ALARP presentations","Developing feedback loops for policy improvement"],
      learningOutcomes: ["Prepare casualty reports using standard formats","Integrate investigation data into national and IMO reporting systems","Analyse safety trends using data visualization techniques","Develop effective feedback mechanisms to inform policy improvements"] },
    { number: 4, title: "Human Factors, Safety Culture, and Crisis Response", icon: <Brain className="w-6 h-6" />, color: "#132552",
      topics: ["Human performance, organisational culture, and accident causation","Stress and its impact on performance","Fatigue and vigilance degradation","Drug and alcohol impairment","Communication breakdowns and failure modes","Organisational and management factors","Decision-making under pressure and coordination failures","Communication and leadership during emergency response","Media management during crisis","Promoting proactive safety behaviour"],
      learningOutcomes: ["Analyse human performance factors and organizational culture elements","Evaluate decision-making processes under pressure","Apply effective communication and leadership principles during emergency response","Develop strategies to promote proactive safety behaviour"] },
    { number: 5, title: "Basic Analysis of Marine Casualties", icon: <Microscope className="w-6 h-6" />, color: "#8E3400",
      topics: ["Understanding the purpose and principles of casualty analysis","Applying critical thinking to marine accident events","Distinguishing between immediate, underlying and root causes","Identifying human, technical, organisational and environmental factors","Using basic analytical techniques to examine evidence","Human Factors Analysis and Classification System","Differentiating facts, assumptions and inferences","Producing logical summaries of analytical findings"],
      learningOutcomes: ["Apply structured critical thinking principles when examining marine casualty events","Identify and categorise immediate, underlying and root causes","Use simple analytical tools to evaluate events and contributing factors","Distinguish between facts, assumptions, inferences and opinions","Prepare clear, logical and concise analytical summaries"] },
    { number: 6, title: "Case Study - Mock Marine Accident Investigation and Report", icon: <FileText className="w-6 h-6" />, color: "#132552",
      topics: ["Comprehensive analysis of provided accident scenario","Evidence evaluation and documentation","Root cause identification and analysis","Sequence of events visualization","Development of findings and recommendations","Formal investigation report preparation","Practical application of all course learnings"],
      learningOutcomes: ["Integrate learning from across the course to a topical case study","Produce a detailed and well-structured investigation report","Apply all investigation techniques to a realistic scenario"] }
  ];

  const targetParticipants = ["Maritime Law Enforcement Agencies","Maritime Administrations","National and Regional Transport Authorities","Marine Surveyors","Maritime Lawyers, Prosecutors, and Regulatory Professionals","Vessel Operators and Owners, and Safety Managers","Representatives from Academia and Civil Society working in Maritime Safety"];

  const expectedOutcomes = ["Conduct credible and procedurally compliant marine casualty investigations","Apply the IMO Casualty Investigation Code to real-world accident cases","Draft clear, evidence-based investigation reports and safety recommendations","Strengthen institutional learning and accident prevention mechanisms","Support in building a national accident database for safety policy formulation"];

  const courseHighlights = [
    { icon: <Shield className="w-5 h-5" />, title: "IMO Compliance", description: "Aligned with IMO Casualty Investigation Code (MSC.255(84)) and SOLAS Chapter XI-1 Regulation 6" },
    { icon: <Users className="w-5 h-5" />, title: "Expert Faculty", description: "Maritime safety experts, IMO certified investigators, and regional specialists" },
    { icon: <Globe className="w-5 h-5" />, title: "Hybrid Format", description: "In-person for Ghana participants, virtual for international attendees" },
    { icon: <Award className="w-5 h-5" />, title: "Certification", description: "Certificate upon successful completion of all modules and case study" }
  ];

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* APPLY MODAL */}
      {applyStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <h3 className="text-2xl font-black" style={{ color: '#132552' }}>
                  {applyStep === 'choose' ? 'Apply for Course' : applyStep === 'verify' ? 'Verify Membership' : applyStep === 'member' ? 'Member Application' : 'Non-Member Application'}
                </h3>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Marine Casualty Investigation & Safety Management</p>
              </div>
              <button onClick={closeApply} disabled={isProcessing} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"><X className="w-6 h-6" style={{ color: '#6B7280' }} /></button>
            </div>

            {/* Choose */}
            {applyStep === 'choose' && (
              <div className="p-8">
                <p className="text-base mb-8 text-center" style={{ color: '#4B5563' }}>Are you a GoGMI member? Members enjoy an exclusive discount.</p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <button onClick={() => setApplyStep('verify')} className="group p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl hover:scale-105" style={{ borderColor: '#132552' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#132552' }}><Shield className="w-6 h-6 text-white" /></div>
                    <h4 className="text-xl font-black mb-2" style={{ color: '#132552' }}>Apply as a Member</h4>
                    <div className="flex items-center gap-2 mb-3"><span className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</span><span className="text-sm line-through" style={{ color: '#9CA3AF' }}>${NON_MEMBER_PRICE}</span></div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style={{ backgroundColor: '#16A34A' }}><Tag className="w-3 h-3" />Save ${DISCOUNT} ({DISCOUNT_PERCENT}% off)</div>
                    <p className="text-xs" style={{ color: '#6B7280' }}>Enter your Membership ID to verify and get the discount.</p>
                  </button>
                  <button onClick={() => setApplyStep('nonmember')} className="group p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl hover:scale-105" style={{ borderColor: '#8E3400' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#8E3400' }}><User className="w-6 h-6 text-white" /></div>
                    <h4 className="text-xl font-black mb-2" style={{ color: '#132552' }}>Apply as a Non-Member</h4>
                    <div className="flex items-center gap-2 mb-3"><span className="text-2xl font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</span></div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>Standard Rate</div>
                    <p className="text-xs" style={{ color: '#6B7280' }}>You will receive a free GoGMI membership with your registration.</p>
                  </button>
                </div>
                <p className="text-center text-sm" style={{ color: '#9CA3AF' }}>Not yet a member? <a href="/membership" className="font-bold hover:underline" style={{ color: '#8E3400' }}>Join GoGMI</a> to unlock member pricing.</p>
              </div>
            )}

            {/* Verify */}
            {applyStep === 'verify' && (
              <div className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div><p className="text-sm font-bold" style={{ color: '#166534' }}>Member Price</p><p className="text-xs" style={{ color: '#4B5563' }}>Save ${DISCOUNT} ({DISCOUNT_PERCENT}% off)</p></div>
                  <div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p><p className="text-xs line-through" style={{ color: '#9CA3AF' }}>${NON_MEMBER_PRICE}</p></div>
                </div>
                <div className="mb-6">
                  <label className={labelClass} style={{ color: '#132552' }}>Enter Your Membership ID <span className="text-red-500">*</span></label>
                  <input type="text" value={memberCode} onChange={(e) => { setMemberCode(e.target.value); setMemberCodeError(''); }} className={inputClass} style={{ borderColor: memberCodeError ? '#EF4444' : '#E5E7EB' }} placeholder="e.g. GoGMI-MST2026-00001" />
                  {memberCodeError && <p className="text-red-500 text-sm mt-2 font-semibold">{memberCodeError}</p>}
                  <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>Your Membership ID was sent to your email when you joined GoGMI.</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setApplyStep('choose')} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Back</button>
                  <button type="button" onClick={verifyMemberCode} disabled={isVerifying} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#132552' }}>{isVerifying ? 'Verifying...' : 'Verify & Continue'}</button>
                </div>
              </div>
            )}

            {/* Member Form */}
            {applyStep === 'member' && (
              <form onSubmit={handleMemberSubmit} className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div><p className="text-sm font-bold" style={{ color: '#166534' }}>✓ Verified — Member Price Applied</p><p className="text-xs" style={{ color: '#4B5563' }}>Save ${DISCOUNT}</p></div>
                  <div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p></div>
                </div>
                <div className="space-y-4">
                  <div><label className={labelClass} style={{ color: '#132552' }}>Full Name <span className="text-red-500">*</span></label><input type="text" name="fullName" value={memberForm.fullName} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Email Address <span className="text-red-500">*</span></label><input type="email" name="email" value={memberForm.email} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Country Code Plus WhatsApp Number <span className="text-red-500">*</span></label><input type="tel" name="phone" value={memberForm.phone} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="+233 XX XXX XXXX" /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Position/Title <span className="text-red-500">*</span></label><input type="text" name="position" value={memberForm.position} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Institution/Organisation <span className="text-slate-400 text-xs font-normal">(Optional)</span></label><input type="text" name="institution" value={memberForm.institution} onChange={handleMemberChange} className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Country <span className="text-red-500">*</span></label><input type="text" name="country" value={memberForm.country} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setApplyStep('verify')} disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all disabled:opacity-40" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Back</button>
                  <button type="submit" disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 hover:opacity-90" style={{ backgroundColor: '#132552' }}>{isProcessing ? 'Processing...' : 'Pay USD ' + MEMBER_PRICE}</button>
                </div>
              </form>
            )}

            {/* Non-Member Form */}
            {applyStep === 'nonmember' && (
              <form onSubmit={handleNonMemberSubmit} className="p-8">
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}>
                  <div><p className="text-sm font-bold" style={{ color: '#92400E' }}>Standard Rate</p><p className="text-xs" style={{ color: '#4B5563' }}>You will receive a free GoGMI membership</p></div>
                  <div className="text-right"><p className="text-2xl font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</p></div>
                </div>
                <div className="space-y-4">
                  <div><label className={labelClass} style={{ color: '#132552' }}>Full Name <span className="text-red-500">*</span></label><input type="text" name="fullName" value={nonMemberForm.fullName} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="John Doe" /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Email Address <span className="text-red-500">*</span></label><input type="email" name="email" value={nonMemberForm.email} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="john@example.com" /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Country Code Plus WhatsApp Number <span className="text-red-500">*</span></label><input type="tel" name="phone" value={nonMemberForm.phone} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="+233 XX XXX XXXX" /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Position/Title <span className="text-red-500">*</span></label><input type="text" name="position" value={nonMemberForm.position} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Institution/Organisation <span className="text-slate-400 text-xs font-normal">(Optional)</span></label><input type="text" name="institution" value={nonMemberForm.institution} onChange={handleNonMemberChange} className={inputClass} style={{ borderColor: '#E5E7EB' }} /></div>
                  <div><label className={labelClass} style={{ color: '#132552' }}>Country <span className="text-red-500">*</span></label><input type="text" name="country" value={nonMemberForm.country} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="Ghana" /></div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Select Membership Type <span className="text-red-500">*</span></label>
                    <select name="membershipType" value={nonMemberForm.membershipType} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }}>
                      <option value="">-- Select your membership type --</option>
                      <option value="student">Student Membership</option>
                      <option value="associate">Associate Membership</option>
                      <option value="professional">Professional Membership</option>
                    </select>
                    <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>You will receive a free GoGMI membership of the selected type with your course registration.</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setApplyStep('choose')} disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all disabled:opacity-40" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Back</button>
                  <button type="submit" disabled={isProcessing} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 hover:opacity-90" style={{ backgroundColor: '#16A34A' }}>{isProcessing ? 'Processing...' : 'Pay USD ' + NON_MEMBER_PRICE}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/casualtyimage.jpg" alt="Marine Casualty Investigation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/95 via-orange-800/90 to-orange-900/95"></div>
        </div>
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-sm font-bold uppercase tracking-wide">Executive Training Course</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Marine Casualty Investigation & Safety Management</h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/95">Enhancing Maritime and Inland Waterways Transport Safety Frameworks</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg"><Clock className="w-5 h-5" /><span className="font-semibold">5 Days</span></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg"><Globe className="w-5 h-5" /><span className="font-semibold">In Person</span></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg"><BookOpen className="w-5 h-5" /><span className="font-semibold">6 Modules</span></div>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"><p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-1">Member Price</p><p className="text-2xl font-black">${MEMBER_PRICE} <span className="text-sm font-normal line-through text-white/50">${NON_MEMBER_PRICE}</span></p></div>
              <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"><p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-1">Standard Rate</p><p className="text-2xl font-black">${NON_MEMBER_PRICE}</p></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={openApply} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-2xl" style={{ backgroundColor: '#132552', color: 'white' }}><span>Apply Now</span><ArrowRight className="w-5 h-5" /></button>
              <button onClick={handleBrochureDownload} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 border-2 border-white/30 hover:bg-white/10"><Download className="w-5 h-5" /><span>Download Brochure</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>Course Overview</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552' }}>Building Capacity for Maritime Safety</h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>Maritime and Inland Waterways transportation safety is central to Africa's transport systems, supporting trade, passenger mobility, fishing, and livelihoods.</p>
              <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>This executive training course builds the capacity of Maritime Administrations and related agencies to efficiently conduct investigations of marine casualties and incidents, in accordance with SOLAS regulation XI-1/6 and the IMO Casualty Investigation Code.</p>
            </div>
            <div className="relative">
              <img src="/casualty1.png" alt="Maritime Investigation" className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-2" style={{ borderColor: '#8E3400' }}>
                <div className="text-3xl font-black mb-1" style={{ color: '#8E3400' }}>IMO</div>
                <p className="text-sm font-semibold" style={{ color: '#132552' }}>Code Compliant</p>
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
                <h2 className="text-3xl font-black mb-4" style={{ color: '#132552' }}>Why This Training Is Critical</h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#4B5563' }}>Between 2020 and 2025, numerous serious incidents occurred across African waterways with hundreds of deaths.</p>
                <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>Common causes include overloading, poor vessel maintenance, incompetent operators, absence of life-saving appliances, and human factors. National Maritime Administrations need better training to enhance safety.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>Curriculum</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552' }}>6 Comprehensive Modules</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>From legal frameworks to practical case studies</p>
          </div>
          <div className="space-y-4">
            {modules.map((module, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
                <button onClick={() => setActiveModule(activeModule === idx ? null : idx)} className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: module.color + '15', color: module.color }}>{module.icon}</div>
                    <div className="flex-1">
                      <span className="text-sm font-bold px-3 py-1 rounded-full mb-2 inline-block" style={{ backgroundColor: module.color + '15', color: module.color }}>Module {module.number}</span>
                      <h3 className="text-xl font-bold" style={{ color: '#132552' }}>{module.title}</h3>
                    </div>
                  </div>
                  <svg className={`w-6 h-6 transform transition-transform ${activeModule === idx ? 'rotate-180' : ''}`} style={{ color: '#6B7280' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {activeModule === idx && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid md:grid-cols-2 gap-8 pt-6">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: '#6B7280' }}>Topics Covered</h4>
                        <ul className="space-y-3">{module.topics.map((t, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: module.color }} /><span className="text-sm" style={{ color: '#4B5563' }}>{t}</span></li>))}</ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: '#6B7280' }}>Learning Outcomes</h4>
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
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>Who Should Attend</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552' }}>Target Participants</h2>
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
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>What You'll Achieve</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552' }}>Expected Outcomes</h2>
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
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>Course Format & Methodology</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#8E3400' }}>Mode of Delivery</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}><strong>In-person:</strong> Participants from Ghana<br/><strong>Virtual:</strong> International Participants</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#8E3400' }}>Teaching Methods</h3>
                  <ul className="space-y-2">
                    {["Interactive lectures and regulatory framework analysis","Group case analysis based on real incidents","Practical use of investigation toolkits","Roleplay exercises","Report-writing and peer review sessions","Field scenario simulation","Technology integration: drones, GPS tools"].map((m, i) => (
                      <li key={i} className="flex items-start gap-2"><CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} /><span className="text-sm" style={{ color: '#4B5563' }}>{m}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>Framework Alignment</h2>
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#8E3400' }}>This programme aligns with:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)' }}><FileText className="w-4 h-4" style={{ color: '#8E3400' }} /></div><span className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>IMO Code of International Standards and Recommended Practices for a Safety Investigation (MSC.255(84))</span></li>
                  <li className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)' }}><Shield className="w-4 h-4" style={{ color: '#8E3400' }} /></div><span className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>SOLAS Chapter XI-1 Regulation 6</span></li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Expected Impact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span>•</span><span>Strengthen regional institutional capacity for maritime safety governance</span></li>
                  <li className="flex items-start gap-2"><span>•</span><span>Support safe, efficient, and sustainable inland water transport</span></li>
                  <li className="flex items-start gap-2"><span>•</span><span>Build a competent pool of regional investigators</span></li>
                  <li className="flex items-start gap-2"><span>•</span><span>Foster unified inter-agency response framework</span></li>
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
