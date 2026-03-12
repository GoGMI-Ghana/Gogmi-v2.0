import React, { useState, useEffect } from 'react';
import { Download, Calendar, MapPin, Users, BookOpen, CheckCircle, X, Mail, Phone, Building, Tag, Eye, EyeOff, Shield, User } from 'lucide-react';

const MaritimeGovernanceCourse = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);

  // Step 1: null = closed, 'choose' = pick member/non-member, 'member' = member form, 'nonmember' = non-member form
  const [applyStep, setApplyStep] = useState(null);

  const [memberCode, setMemberCode] = useState('');
  const [memberCodeError, setMemberCodeError] = useState('');
  const [memberCodeValid, setMemberCodeValid] = useState(false);

 
  const [nonMemberForm, setNonMemberForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    institution: '',
    country: '',
   
  });

  const [memberForm, setMemberForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    institution: '',
    country: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const MEMBER_PRICE = 350;
  const NON_MEMBER_PRICE = 450;
  const DISCOUNT = NON_MEMBER_PRICE - MEMBER_PRICE;
  const DISCOUNT_PERCENT = Math.round((DISCOUNT / NON_MEMBER_PRICE) * 100);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openApply = () => {
    setApplyStep('choose');
    setMemberCode('');
    setMemberCodeError('');
    setMemberCodeValid(false);
    document.body.style.overflow = 'hidden';
  };

  const closeApply = () => {
    setApplyStep(null);
    setMemberCode('');
    setMemberCodeError('');
    setMemberCodeValid(false);
    setNonMemberForm({ fullName: '', email: '', phone: '', position: '', institution: '', country: '',  '',  '' });
    setMemberForm({ fullName: '', email: '', phone: '', position: '', institution: '', country: '' });
    document.body.style.overflow = 'unset';
  };

  const validateMemberCode = () => {
    // Placeholder validation — real validation against membership DB will be done later
    if (memberCode.trim().length < 6) {
      setMemberCodeError('Please enter a valid membership code (minimum 6 characters)');
      setMemberCodeValid(false);
      return;
    }
    setMemberCodeError('');
    setMemberCodeValid(true);
    setApplyStep('member');
  };

  const handleNonMemberChange = (e) => {
    setNonMemberForm({ ...nonMemberForm, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (e) => {
    setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
  };

 

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/maritime-governance-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...memberForm, membershipCode: memberCode, type: 'member', price: MEMBER_PRICE })
      });
      if (response.ok) {
        alert('Application submitted successfully! Your member discount has been applied. We will contact you shortly.');
        closeApply();
      } else {
        alert('There was an error. Please try again or contact info@gogmi.org.gh');
      }
    } catch {
      alert('There was an error. Please try again or contact info@gogmi.org.gh');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBrochureDownload = () => {
    const link = document.createElement('a');
    link.href = '/resources/pdfs/Maritime-Governance-Course-Brochure.pdf';
    link.download = 'Maritime-Governance-Course-Brochure.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'format', label: 'Program Format' },
    { id: 'attend', label: 'Who Should Attend' },
    { id: 'team', label: 'Teaching Team' },
    { id: 'modules', label: 'Course Modules' }
  ];

  const moduleList = [
    { number: 1, title: "Introduction & Maritime Strategy Theory", description: "Foundational concepts of maritime strategy, strategic thinking versus operational planning, and the maritime strategy development cycle." },
    { number: 2, title: "Assessing Maritime Domain Challenges & Opportunities", description: "Maritime threat landscape, security challenges, economic opportunities, and comprehensive maritime domain assessments." },
    { number: 3, title: "Strategy Development Process", description: "Step-by-step strategy development framework, vision and goal setting, strategic objective formulation, and policy alignment." },
    { number: 4, title: "Interagency Coordination & Stakeholder Analysis", description: "Mapping maritime stakeholders, coordination mechanisms, building partnerships, and multi-sectoral collaboration." },
    { number: 5, title: "Ends, Ways, Means & Risk", description: "Strategic framework alignment, resource mobilization, risk identification, mitigation strategies, and contingency planning." },
    { number: 6, title: "Maritime Strategy Implementation", description: "From strategy to action, implementation planning, monitoring and evaluation systems, and adaptive management." },
    { number: 7, title: "Sector Planning – In Class Exercise", description: "Practical sector planning exercise, applying strategy development frameworks, and team-based strategy development." },
    { number: 8, title: "Case Study Reports & Course Conclusion", description: "Analysis of regional maritime strategies, comparative analysis of successes and challenges, and final presentations." }
  ];

  const weeklyBreakdown = [
    { week: 'Week 1', title: 'Maritime Strategy Theory & Assessment', modules: [1, 2], sessions: ['Strategy Development Directives and Instruments', 'Purpose and need to develop Maritime Strategies', 'Overview of the Strategy Development Process', 'Assessing Maritime Domain Challenges & Opportunities'] },
    { week: 'Week 2', title: 'Strategy Development & Stakeholder Analysis', modules: [3, 4], sessions: ['Developing the Vision Statement', 'Understanding stakeholder roles in strategy development', 'Interagency Coordination and best practices', 'Stakeholder analysis tools and techniques'] },
    { week: 'Week 3', title: 'Ends, Ways, Means & Implementation', modules: [5, 6], sessions: ['Introduction to Ends, Ways, Means, and Risk', 'Successes and Failures of maritime strategy implementation', 'Maritime Sector Planning Process', 'Course of Action Development'] },
    { week: 'Week 4', title: 'Practical Exercise & Conclusion', modules: [7, 8], sessions: ['Maritime Strategy Sector Planning - In Class Exercise', 'Group Case Study Presentations', 'Course Conclusion and Discussion', 'Course Evaluation'] }
  ];

  const faculty = [
    { name: 'Vice Admiral Issah Adam Yakubu (Rtd.)', title: 'Executive Board Chairman, GoGMI', credentials: 'Former Chief of Naval Staff, Ghana Navy' },
    { name: 'Prof. Jeffrey Landsman', title: 'CAPT, USN (Ret.)', credentials: 'Maritime Strategy Expert' },
    { name: 'Dr. Alberta Ama Sagoe', title: 'Board Director, GoGMI', credentials: 'Maritime Expert' }
  ];

  const inputClass = "w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-transparent transition-all";
  const labelClass = "block text-sm font-bold mb-2";

  return (
    <div className="min-h-screen bg-white">

      {/* ── APPLY MODAL ── */}
      {applyStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <h3 className="text-2xl font-black" style={{ color: '#132552' }}>
                  {applyStep === 'choose' && 'Apply for Course'}
                  {applyStep === 'member' && 'Member Application'}
                  {applyStep === 'nonmember' && 'Non-Member Application'}
                </h3>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Maritime Governance Course — A Focus on Africa</p>
              </div>
              <button onClick={closeApply} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-6 h-6" style={{ color: '#6B7280' }} />
              </button>
            </div>

            {/* ── STEP 1: Choose member/non-member ── */}
            {applyStep === 'choose' && (
              <div className="p-8">
                <p className="text-base mb-8 text-center" style={{ color: '#4B5563' }}>
                  Are you a GoGMI member? Members enjoy an exclusive discount on this course.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Member Card */}
                  <button
                    onClick={() => setApplyStep('verify')}
                    className="group p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl hover:scale-105"
                    style={{ borderColor: '#132552' }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#132552' }}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-black mb-2" style={{ color: '#132552' }}>Apply as a Member</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</span>
                      <span className="text-sm line-through" style={{ color: '#9CA3AF' }}>${NON_MEMBER_PRICE}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style={{ backgroundColor: '#16A34A' }}>
                      <Tag className="w-3 h-3" />
                      Save ${DISCOUNT} ({DISCOUNT_PERCENT}% off)
                    </div>
                    <p className="text-xs" style={{ color: '#6B7280' }}>You'll need your GoGMI membership code to verify your membership.</p>
                  </button>

                  {/* Non-Member Card */}
                  <button
                    onClick={() => setApplyStep('nonmember')}
                    className="group p-6 rounded-2xl border-2 text-left transition-all hover:shadow-xl hover:scale-105"
                    style={{ borderColor: '#8E3400' }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#8E3400' }}>
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-black mb-2" style={{ color: '#132552' }}>Apply as a Non-Member</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                      Standard Rate
                    </div>
                    <p className="text-xs" style={{ color: '#6B7280' }}>Create an account and apply. You can become a member later to enjoy future discounts.</p>
                  </button>
                </div>

                <p className="text-center text-sm" style={{ color: '#9CA3AF' }}>
                  Not yet a member?{' '}
                  <a href="/membership" className="font-bold hover:underline" style={{ color: '#8E3400' }}>
                    Join GoGMI
                  </a>
                  {' '}to unlock member pricing.
                </p>
              </div>
            )}

            {/* ── STEP 1b: Member Code Verification ── */}
            {applyStep === 'verify' && (
              <div className="p-8">
                {/* Price reminder */}
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#166534' }}>Member Price Applied</p>
                    <p className="text-xs" style={{ color: '#4B5563' }}>You save ${DISCOUNT} ({DISCOUNT_PERCENT}% off standard rate)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p>
                    <p className="text-xs line-through" style={{ color: '#9CA3AF' }}>${NON_MEMBER_PRICE}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClass} style={{ color: '#132552' }}>
                    Enter Your GoGMI Membership Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={memberCode}
                    onChange={(e) => { setMemberCode(e.target.value); setMemberCodeError(''); }}
                    className={inputClass}
                    style={{ borderColor: memberCodeError ? '#EF4444' : '#E5E7EB' }}
                    placeholder="e.g. GOGMI-XXXXX"
                  />
                  {memberCodeError && (
                    <p className="text-red-500 text-sm mt-2 font-semibold">{memberCodeError}</p>
                  )}
                  <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
                    Your membership code was sent to your email when you joined GoGMI.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyStep('choose')}
                    className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all"
                    style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={validateMemberCode}
                    className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#132552' }}
                  >
                    Verify & Continue
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2A: Member Application Form ── */}
            {applyStep === 'member' && (
              <form onSubmit={handleMemberSubmit} className="p-8">
                {/* Price reminder */}
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#166534' }}>✓ Membership Verified — Member Price Applied</p>
                    <p className="text-xs" style={{ color: '#4B5563' }}>You save ${DISCOUNT} ({DISCOUNT_PERCENT}% off standard rate)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p>
                    <p className="text-xs line-through" style={{ color: '#9CA3AF' }}>${NON_MEMBER_PRICE}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fullName" value={memberForm.fullName} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={memberForm.email} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Country Code Plus WhatsApp Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={memberForm.phone} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="+233 XX XXX XXXX" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Position/Title <span className="text-red-500">*</span></label>
                    <input type="text" name="position" value={memberForm.position} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="Maritime Analyst" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Institution/Organisation Name <span className="text-red-500">*</span></label>
                    <input type="text" name="institution" value={memberForm.institution} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="e.g. Maritime Authority of Ghana" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Country <span className="text-red-500">*</span></label>
                    <input type="text" name="country" value={memberForm.country} onChange={handleMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="Ghana" />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setApplyStep('verify')} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Back</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 hover:opacity-90" style={{ backgroundColor: '#132552' }}>
                    {isSubmitting ? 'Submitting...' : `Submit — $${MEMBER_PRICE}`}
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 2B: Non-Member Application Form ── */}
            {applyStep === 'nonmember' && (
              <form onSubmit={handleNonMemberSubmit} className="p-8">
                {/* Price reminder */}
                <div className="p-4 rounded-xl mb-8 flex items-center justify-between" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#92400E' }}>Standard Rate</p>
                    <p className="text-xs" style={{ color: '#4B5563' }}>
                      Join GoGMI to save ${DISCOUNT} ({DISCOUNT_PERCENT}% off) on this course
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fullName" value={nonMemberForm.fullName} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={nonMemberForm.email} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Country Code Plus WhatsApp Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={nonMemberForm.phone} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="+233 XX XXX XXXX" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Position/Title <span className="text-red-500">*</span></label>
                    <input type="text" name="position" value={nonMemberForm.position} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="Maritime Analyst" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Institution/Organisation Name <span className="text-red-500">*</span></label>
                    <input type="text" name="institution" value={nonMemberForm.institution} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="e.g. Maritime Authority of Ghana" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#132552' }}>Country <span className="text-red-500">*</span></label>
                    <input type="text" name="country" value={nonMemberForm.country} onChange={handleNonMemberChange} required className={inputClass} style={{ borderColor: '#E5E7EB' }} placeholder="Ghana" />
                  </div>

                  {/* Password Section */}
                 
            

                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setApplyStep('choose')} className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>Back</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 hover:opacity-90" style={{ backgroundColor: '#8E3400' }}>
                    {isSubmitting ? 'Submitting...' : `Submit — $${NON_MEMBER_PRICE}`}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/conf2.jpg" alt="Maritime Security Strategy Course" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #132552 0%, rgba(19, 37, 82, 0.95) 50%, rgba(142, 52, 0, 0.85) 100%)' }}></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full mb-6 border-2" style={{ borderColor: '#8E3400', backgroundColor: 'rgba(142, 52, 0, 0.2)' }}>
            <span className="text-white text-sm font-bold tracking-wider">PROFESSIONAL DEVELOPMENT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">Maritime Governance Course</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 font-semibold">A Focus on Africa</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openApply} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all hover:scale-105 shadow-xl" style={{ backgroundColor: '#8E3400', color: 'white' }}>
              <span>Apply Now</span>
            </button>
            <button onClick={handleBrochureDownload} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all hover:scale-105 shadow-xl border-2 border-white/30 hover:bg-white/10" style={{ color: 'white' }}>
              <Download className="w-5 h-5" />
              <span>Download Brochure</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className={`sticky top-0 z-40 bg-white border-b transition-all ${isSticky ? 'shadow-lg' : ''}`} style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-4 transition-all ${activeTab === tab.id ? 'border-[#8E3400] text-[#132552]' : 'border-transparent text-gray-500 hover:text-[#132552]'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className={`${isSticky ? 'lg:sticky lg:top-24' : ''}`}>
              <div className="bg-white rounded-xl border-2 p-8 space-y-6" style={{ borderColor: '#E5E7EB' }}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5" style={{ color: '#8E3400' }} />
                    <h3 className="font-bold text-sm" style={{ color: '#132552' }}>Dates</h3>
                  </div>
                  <p className="text-base" style={{ color: '#4B5563' }}>May 5 – 15, 2026</p>
                  <p className="text-sm mt-1" style={{ color: '#6B7280' }}>2 weeks, 8 modules</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5" style={{ color: '#8E3400' }} />
                    <h3 className="font-bold text-sm" style={{ color: '#132552' }}>Status</h3>
                  </div>
                  <p className="text-base font-semibold" style={{ color: '#16A34A' }}>Accepting Applications</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5" style={{ color: '#8E3400' }} />
                    <h3 className="font-bold text-sm" style={{ color: '#132552' }}>Format</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base" style={{ color: '#4B5563' }}>Virtual/Online</span>
                    <div className="px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: '#F3F4F6', color: '#374151' }}>Live Sessions</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" style={{ color: '#8E3400' }} />
                    <h3 className="font-bold text-sm" style={{ color: '#132552' }}>Location</h3>
                  </div>
                  <p className="text-base" style={{ color: '#4B5563' }}>Online (Zoom Platform)</p>
                </div>

                {/* Pricing */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5" style={{ color: '#8E3400' }} />
                    <h3 className="font-bold text-sm" style={{ color: '#132552' }}>Course Fees</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F0FDF4' }}>
                      <div>
                        <p className="text-xs font-bold" style={{ color: '#166534' }}>GoGMI Members</p>
                        <p className="text-xs" style={{ color: '#4B5563' }}>Save {DISCOUNT_PERCENT}%</p>
                      </div>
                      <p className="text-lg font-black" style={{ color: '#132552' }}>${MEMBER_PRICE}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                      <p className="text-xs font-bold" style={{ color: '#6B7280' }}>Non-Members</p>
                      <p className="text-lg font-black" style={{ color: '#132552' }}>${NON_MEMBER_PRICE}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <button onClick={openApply} className="w-full py-3.5 rounded-lg font-bold transition-all hover:shadow-lg mb-3" style={{ backgroundColor: '#8E3400', color: 'white' }}>Apply Now</button>
                  <button onClick={handleBrochureDownload} className="w-full py-3.5 rounded-lg font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2 border-2" style={{ borderColor: '#132552', color: '#132552' }}>
                    <Download className="w-5 h-5" />
                    <span>Download Brochure</span>
                  </button>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Questions? <a href="/contact" className="font-bold hover:underline" style={{ color: '#8E3400' }}>Contact us</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">

            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>Master Maritime Strategy Development for Africa</h2>
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                      For decades, the African continent has faced a wide range of maritime security threats and challenges, none of which can be fully addressed without strategic guidance. Consequently, the continent witnessed a proliferation of strategy documents, including the 2050 Africa's Integrated Maritime Strategy in 2012, the Lomé Charter in 2016, and the Africa Blue Economy Strategy in 2019. This comprehensive course equips professionals, stakeholders, and decision-makers with the knowledge, skills, and tools necessary to develop and implement effective maritime strategies within the African context.
                    </p>
                    <div className="bg-gradient-to-br from-[#132552] to-[#1A336C] rounded-xl p-8 text-white my-8">
                      <h3 className="text-2xl font-bold mb-4">Course Objectives</h3>
                      <ul className="space-y-3">
                        {['Understand how maritime strategy enhances both national and regional priorities and objectives','Generate understanding of how to develop maritime strategies that address Africa\'s unique challenges','Examine the primary features that enhance the sustainability of strategies and action plans','Explore tools and techniques that facilitate implementation of continental, regional and national maritime strategies','Equip participants with skill sets necessary to contribute meaningfully to maritime strategy development processes across Africa','Explicate the implications of strategy development processes on the success or failure of national, regional and continental strategies','Develop skills to collaborate with stakeholders and partners toward maritime strategy development and implementation'].map((obj, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552' }}>Expected Outcomes</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[{ title: 'Skilled Practitioners', desc: 'Develop a team of skilled actors to enhance maritime security strategy development processes across the continent' },{ title: 'Enhanced Implementation', desc: 'Enhance the implementation of existing continental, regional and national strategies in Africa' },{ title: 'Better Coordination', desc: 'Foster more effective inter-agency and non-governmental organizations coordination toward strategy implementation' },{ title: 'Professional Network', desc: 'Enhance networking opportunities and collaboration among participating stakeholders involved in maritime security across Africa' }].map((o, i) => (
                      <div key={i} className="p-6 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                        <h4 className="font-bold mb-2" style={{ color: '#132552' }}>{o.title}</h4>
                        <p className="text-sm" style={{ color: '#6B7280' }}>{o.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'format' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>Program Format</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center p-8 rounded-xl" style={{ backgroundColor: '#8E3400', color: 'white' }}><div className="text-5xl font-black mb-2">2</div><div className="text-lg font-semibold">weeks of intensive learning</div></div>
                  <div className="text-center p-8 rounded-xl" style={{ backgroundColor: '#132552', color: 'white' }}><div className="text-5xl font-black mb-2">8</div><div className="text-lg font-semibold">comprehensive modules</div></div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552' }}>Live/Virtual Sessions</h3>
                    <p className="text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>The Maritime Governance Course is practically designed to use an interactive learning platform to engage participants. A Zoom online platform will be mounted to provide an interactive and engaging learning experience. Sessions include:</p>
                    <ul className="space-y-2">
                      {['Interactive simulations, presentations, and group discussions','Breakout rooms for group activities and forums','Live Q&A sessions and dedicated questions and answers forums','Recorded sessions for later review and supplementary materials'].map((s, i) => (
                        <li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} /><span style={{ color: '#4B5563' }}>{s}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 rounded-xl border-l-4" style={{ backgroundColor: '#F5F7FA', borderColor: '#8E3400' }}>
                    <h4 className="font-bold mb-2" style={{ color: '#132552' }}>Technical Requirements</h4>
                    <ul className="space-y-2 text-sm" style={{ color: '#6B7280' }}>
                      <li>• Reliable internet connection with a minimum recommended bandwidth of 100 Mbps</li>
                      <li>• A computer, laptop, or tablet with audio and video capabilities</li>
                      <li>• Compatible web browser(s) and any additional software required for the online platform</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attend' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>Who Should Attend</h2>
                <p className="text-lg leading-relaxed" style={{ color: '#4B5563' }}>The course is open to all interested actors within the maritime domain or with a shared interest and may include:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[{ title: 'Government Agencies', description: 'Officials involved in maritime policy, security, and governance at national and regional levels' },{ title: 'Naval & Security Forces', description: 'Naval officers, coast guard personnel, and maritime security professionals' },{ title: 'Non-Governmental Organizations', description: 'NGOs working on maritime issues, ocean governance, and sustainable development' },{ title: 'Private Sector', description: 'Industries and institutions with maritime interests' },{ title: 'Academic Institutions', description: 'Students, researchers, and professors in maritime studies, international relations, and related fields' },{ title: 'General Public', description: 'Anyone interested in ocean governance, maritime safety and security, think tank development, and international relations' }].map((g, i) => (
                    <div key={i} className="p-6 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}>
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#132552' }}>{g.title}</h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>{g.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>Teaching Team</h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: '#4B5563' }}>Learn from experienced practitioners and thought leaders in maritime strategy, governance, and security.</p>
                <div className="space-y-6">
                  {faculty.map((m, i) => (
                    <div key={i} className="p-6 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}>
                      <h3 className="text-xl font-bold mb-1" style={{ color: '#132552' }}>{m.name}</h3>
                      <p className="text-base font-semibold mb-2" style={{ color: '#8E3400' }}>{m.title}</p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>{m.credentials}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'modules' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#132552' }}>Course Modules</h2>
                <p className="text-lg mb-6" style={{ color: '#4B5563' }}>The course content has been categorised into eight (8) modules to be covered over two (2) weeks.</p>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {moduleList.map((module) => (
                    <div key={module.number} className="p-6 rounded-xl border-2 hover:shadow-lg transition-all relative overflow-hidden" style={{ borderColor: module.number % 2 === 0 ? '#132552' : '#8E3400' }}>
                      <div className="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 transform rotate-45" style={{ backgroundColor: module.number % 2 === 0 ? '#132552' : '#8E3400' }}></div>
                      <div className="absolute top-2 right-3 text-white font-bold z-10">#{module.number}</div>
                      <h3 className="text-lg font-bold mb-3 pr-8" style={{ color: '#132552' }}>{module.title}</h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>{module.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#132552' }}>Weekly Breakdown</h3>
                  <div className="space-y-6">
                    {weeklyBreakdown.map((week, idx) => (
                      <div key={idx} className="rounded-xl border-2 overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
                        <div className="p-6" style={{ backgroundColor: '#132552' }}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-bold mb-1" style={{ color: '#8E3400' }}>{week.week}</div>
                              <h4 className="text-xl font-bold text-white">{week.title}</h4>
                            </div>
                            <div className="flex gap-1">
                              {week.modules.map((n) => (
                                <span key={n} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: n % 2 === 0 ? '#132552' : '#8E3400' }}>{n}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h5 className="font-bold mb-3 text-sm" style={{ color: '#6B7280' }}>KEY SESSIONS:</h5>
                          <ul className="space-y-2">
                            {week.sessions.map((s, si) => (
                              <li key={si} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8E3400' }} />
                                <span className="text-sm" style={{ color: '#4B5563' }}>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MaritimeGovernanceCourse;
