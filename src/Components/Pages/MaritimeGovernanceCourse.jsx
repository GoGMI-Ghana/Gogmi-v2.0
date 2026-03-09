import React, { useState, useEffect } from 'react';
import { Download, Calendar, MapPin, Users, BookOpen, CheckCircle, X, Mail, Phone, Building } from 'lucide-react';

const MaritimeGovernanceCourse = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(''); // 'apply' or 'download'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    country: '',
    interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openForm = (type) => {
    setFormType(type);
    setShowForm(true);
    document.body.style.overflow = 'hidden';
  };

  const closeForm = () => {
    setShowForm(false);
    setFormType('');
    document.body.style.overflow = 'unset';
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      position: '',
      country: '',
      interest: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/maritime-governance-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: formType,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert(formType === 'apply' 
          ? 'Thank you! Your application has been submitted. We will contact you shortly.'
          : 'Thank you! Your download will begin shortly. Check your email for the syllabus.');
        
        // If download, trigger download here
        if (formType === 'download') {
          // window.open('/path-to-syllabus.pdf', '_blank');
        }
        
        closeForm();
      }
    } catch (error) {
      alert('There was an error submitting your request. Please try again or contact us at info@gogmi.org.gh');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'format', label: 'Program Format' },
    { id: 'attend', label: 'Who Should Attend' },
    { id: 'team', label: 'Teaching Team' },
    { id: 'modules', label: 'Course Modules' }
  ];

  // Updated modules to highlight the 8 specific modules
  const moduleList = [
    {
      number: 1,
      title: "Introduction & Maritime Strategy Theory",
      description: "Foundational concepts of maritime strategy, strategic thinking versus operational planning, and the maritime strategy development cycle."
    },
    {
      number: 2,
      title: "Assessing Maritime Domain Challenges & Opportunities",
      description: "Maritime threat landscape, security challenges, economic opportunities, and comprehensive maritime domain assessments."
    },
    {
      number: 3,
      title: "Strategy Development Process",
      description: "Step-by-step strategy development framework, vision and goal setting, strategic objective formulation, and policy alignment."
    },
    {
      number: 4,
      title: "Interagency Coordination & Stakeholder Analysis",
      description: "Mapping maritime stakeholders, coordination mechanisms, building partnerships, and multi-sectoral collaboration."
    },
    {
      number: 5,
      title: "Ends, Ways, Means & Risk",
      description: "Strategic framework alignment, resource mobilization, risk identification, mitigation strategies, and contingency planning."
    },
    {
      number: 6,
      title: "Maritime Strategy Implementation",
      description: "From strategy to action, implementation planning, monitoring and evaluation systems, and adaptive management."
    },
    {
      number: 7,
      title: "Sector Planning – In Class Exercise",
      description: "Practical sector planning exercise, applying strategy development frameworks, and team-based strategy development."
    },
    {
      number: 8,
      title: "Case Study Reports & Course Conclusion",
      description: "Analysis of regional maritime strategies, comparative analysis of successes and challenges, and final presentations."
    }
  ];

  const weeklyBreakdown = [
    {
      week: 'Week 1',
      title: 'Maritime Strategy Theory & Assessment',
      modules: [1, 2],
      sessions: [
        'Strategy Development Directives and Instruments',
        'Purpose and need to develop Maritime Strategies',
        'Overview of the Strategy Development Process',
        'Assessing Maritime Domain Challenges & Opportunities'
      ]
    },
    {
      week: 'Week 2',
      title: 'Strategy Development & Stakeholder Analysis',
      modules: [3, 4],
      sessions: [
        'Developing the Vision Statement',
        'Understanding stakeholder roles in strategy development',
        'Interagency Coordination and best practices',
        'Stakeholder analysis tools and techniques'
      ]
    },
    {
      week: 'Week 3',
      title: 'Ends, Ways, Means & Implementation',
      modules: [5, 6],
      sessions: [
        'Introduction to Ends, Ways, Means, and Risk',
        'Successes and Failures of maritime strategy implementation',
        'Maritime Sector Planning Process',
        'Course of Action Development'
      ]
    },
    {
      week: 'Week 4',
      title: 'Practical Exercise & Conclusion',
      modules: [7, 8],
      sessions: [
        'Maritime Strategy Sector Planning - In Class Exercise',
        'Group Case Study Presentations',
        'Course Conclusion and Discussion',
        'Course Evaluation'
      ]
    }
  ];

  const faculty = [
    {
      name: 'Vice Admiral Issah Adam Yakubu (Rtd.)',
      title: 'Executive Board Chairman, GoGMI',
      credentials: 'Former Chief of Naval Staff, Ghana Navy'
    },
    {
      name: 'Prof. Jeffrey Landsman',
      title: 'CAPT, USN (Ret.)',
      credentials: 'Maritime Strategy Expert'
    },
    {
      name: 'Dr. Alberta Ama Sagoe',
      title: 'Board Director, GoGMI',
      credentials: 'Maritime Expert'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
              <div>
                <h3 className="text-2xl font-black" style={{ color: '#132552' }}>
                  {formType === 'apply' ? 'Apply for Course' : ''}
                </h3>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                  Please fill in your details below
                </p>
              </div>
              <button
                onClick={closeForm}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" style={{ color: '#6B7280' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#132552' }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    style={{ borderColor: '#E5E7EB' }}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#132552' }}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    style={{ borderColor: '#E5E7EB' }}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#132552' }}>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    style={{ borderColor: '#E5E7EB' }}
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#132552' }}>
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    style={{ borderColor: '#E5E7EB' }}
                    placeholder="Ghana"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#132552' }}>
                    Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    style={{ borderColor: '#E5E7EB' }}
                    placeholder="Organization Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#132552' }}>
                    Position/Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                    style={{ borderColor: '#E5E7EB' }}
                    placeholder="Maritime Analyst"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#132552' }}>
                  Why are you interested in this course? <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400] resize-none"
                  style={{ borderColor: '#E5E7EB' }}
                  placeholder="Tell us about your interest in maritime security strategy..."
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 px-6 py-3 rounded-lg font-bold border-2 transition-all"
                  style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                  style={{ backgroundColor: '#8E3400', color: 'white' }}
                >
                  {isSubmitting ? 'Submitting...' : (formType === 'apply' ? 'Submit Application' : '')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/conf2.jpg"
            alt="Maritime Security Strategy Course"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #132552 0%, rgba(19, 37, 82, 0.95) 50%, rgba(142, 52, 0, 0.85) 100%)' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full mb-6 border-2" style={{ borderColor: '#8E3400', backgroundColor: 'rgba(142, 52, 0, 0.2)' }}>
            <span className="text-white text-sm font-bold tracking-wider">PROFESSIONAL DEVELOPMENT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Maritime Governance Course
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 font-semibold">
            A Focus on Africa
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openForm('apply')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all hover:scale-105 shadow-xl"
              style={{ backgroundColor: '#8E3400', color: 'white' }}
            >
              <span>Apply Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className={`sticky top-0 z-40 bg-white border-b transition-all ${isSticky ? 'shadow-lg' : ''}`} style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-4 transition-all ${
                  activeTab === tab.id
                    ? 'border-[#8E3400] text-[#132552]'
                    : 'border-transparent text-gray-500 hover:text-[#132552]'
                }`}
              >
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
                    <div className="px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: '#F3F4F6', color: '#374151' }}>
                      Live Sessions
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" style={{ color: '#8E3400' }} />
                    <h3 className="font-bold text-sm" style={{ color: '#132552' }}>Location</h3>
                  </div>
                  <p className="text-base" style={{ color: '#4B5563' }}>Online (Zoom Platform)</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5" style={{ color: '#8E3400' }} />
                    <h3 className="font-bold text-sm" style={{ color: '#132552' }}>Fees:500 USD</h3>
                  </div>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Contact us for pricing information</p>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <button 
                    onClick={() => openForm('apply')}
                    className="w-full py-3.5 rounded-lg font-bold transition-all hover:shadow-lg mb-3"
                    style={{ backgroundColor: '#8E3400', color: 'white' }}
                  >
                    Apply Now
                  </button>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Questions? <a href="/contact" className="font-bold hover:underline" style={{ color: '#8E3400' }}>Contact us</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>
                    Master Maritime Strategy Development for Africa
                  </h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                      For decades, the African continent has faced a wide range of maritime security threats and challenges, 
                      none of which can be fully addressed without strategic guidance. Consequently, the continent witnessed 
                      a proliferation of strategy documents, including the 2050 Africa's Integrated Maritime Strategy in 2012, 
                      the Lomé Charter in 2016, and the Africa Blue Economy Strategy in 2019. This comprehensive course equips 
                      professionals, stakeholders, and decision-makers with the knowledge, skills, and tools necessary to 
                      develop and implement effective maritime strategies within the African context.
                    </p>

                    <div className="bg-gradient-to-br from-[#132552] to-[#1A336C] rounded-xl p-8 text-white my-8">
                      <h3 className="text-2xl font-bold mb-4">Course Objectives</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                          <span>Understand how maritime strategy enhances both national and regional priorities and objectives</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                          <span>Generate understanding of how to develop maritime strategies that address Africa's unique challenges</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                          <span>Examine the primary features that enhance the sustainability of strategies and action plans</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                          <span>Explore tools and techniques that facilitate implementation of continental, regional and national maritime strategies</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                          <span>Equip participants with skill sets necessary to contribute meaningfully to maritime strategy development processes across Africa</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                          <span>Explicate the implications of strategy development processes on the success or failure of national, regional and continental strategies</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                          <span>Develop skills to collaborate with stakeholders and partners toward maritime strategy development and implementation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552' }}>Expected Outcomes</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                      <h4 className="font-bold mb-2" style={{ color: '#132552' }}>Skilled Practitioners</h4>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        Develop a team of skilled actors to enhance maritime security strategy development processes across the continent
                      </p>
                    </div>
                    <div className="p-6 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                      <h4 className="font-bold mb-2" style={{ color: '#132552' }}>Enhanced Implementation</h4>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        Enhance the implementation of existing continental, regional and national strategies in Africa
                      </p>
                    </div>
                    <div className="p-6 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                      <h4 className="font-bold mb-2" style={{ color: '#132552' }}>Better Coordination</h4>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        Foster more effective inter-agency and non-governmental organizations coordination toward strategy implementation
                      </p>
                    </div>
                    <div className="p-6 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                      <h4 className="font-bold mb-2" style={{ color: '#132552' }}>Professional Network</h4>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        Enhance networking opportunities and collaboration among participating stakeholders involved in maritime security across Africa
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Program Format Tab */}
            {activeTab === 'format' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>
                  Program Format
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center p-8 rounded-xl" style={{ backgroundColor: '#8E3400', color: 'white' }}>
                    <div className="text-5xl font-black mb-2">2</div>
                    <div className="text-lg font-semibold">weeks of intensive learning</div>
                  </div>
                  <div className="text-center p-8 rounded-xl" style={{ backgroundColor: '#132552', color: 'white' }}>
                    <div className="text-5xl font-black mb-2">8</div>
                    <div className="text-lg font-semibold">comprehensive modules</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552' }}>
                      Live/Virtual Sessions
                    </h3>
                    <p className="text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                      The Maritime Governance Course is practically designed to use an interactive learning platform to engage participants. 
                      A Zoom online platform will be mounted to provide an interactive and engaging learning experience. Sessions include:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                        <span style={{ color: '#4B5563' }}>Interactive simulations, presentations, and group discussions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                        <span style={{ color: '#4B5563' }}>Breakout rooms for group activities and forums</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                        <span style={{ color: '#4B5563' }}>Live Q&A sessions and dedicated questions and answers forums</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                        <span style={{ color: '#4B5563' }}>Recorded sessions for later review and supplementary materials</span>
                      </li>
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

                  <div>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#132552' }}>Schedule</h3>
                    <p className="text-base mb-4" style={{ color: '#4B5563' }}>
                      The course comprises: an introductory session on the outlook of the course; technical presentations and discussions 
                      on various concepts related to strategy development; practical case studies; and a final session on key takeaways 
                      and information on further learning opportunities.
                    </p>
                    <p className="text-sm" style={{ color: '#6B7280' }}>
                      <strong>Attendance:</strong> Participant attendance to each of the course sessions is mandatory. However, in case of 
                      inability to attend any of the sessions, participants are requested to submit a "request for absence" letter to 
                      info@gogmi.org.gh
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Who Should Attend Tab */}
            {activeTab === 'attend' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>
                  Who Should Attend
                </h2>

                <p className="text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                  The course is open to all interested actors within the maritime domain or with a shared interest and may include:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Government Agencies',
                      description: 'Officials involved in maritime policy, security, and governance at national and regional levels'
                    },
                    {
                      title: 'Naval & Security Forces',
                      description: 'Naval officers, coast guard personnel, and maritime security professionals'
                    },
                    {
                      title: 'Non-Governmental Organizations',
                      description: 'NGOs working on maritime issues, ocean governance, and sustainable development'
                    },
                    {
                      title: 'Private Sector',
                      description: 'Industries and institutions with maritime interests'
                    },
                    {
                      title: 'Academic Institutions',
                      description: 'Students, researchers, and professors in maritime studies, international relations, and related fields'
                    },
                    {
                      title: 'General Public',
                      description: 'Anyone interested in ocean governance, maritime safety and security, think tank development, and international relations'
                    }
                  ].map((group, idx) => (
                    <div key={idx} className="p-6 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}>
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#132552' }}>{group.title}</h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>{group.description}</p>
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-xl" style={{ backgroundColor: '#132552', color: 'white' }}>
                  <h3 className="text-2xl font-bold mb-4">Entry Requirements</h3>
                  <p className="text-base mb-6 opacity-90">
                    This course is particularly valuable for professionals who:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                      <span>Have access to reliable internet connection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                      <span>Have a computer, laptop, or tablet with audio and video capabilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#8E3400' }} />
                      <span>Are interested in maritime governance and strategy development</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Teaching Team Tab */}
            {activeTab === 'team' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552' }}>
                  Teaching Team
                </h2>

                <p className="text-lg leading-relaxed mb-8" style={{ color: '#4B5563' }}>
                  Learn from experienced practitioners and thought leaders in maritime strategy, governance, and security. 
                  Our faculty brings decades of combined experience from naval leadership, academia, and policy development.
                </p>

                <div className="space-y-6">
                  {faculty.map((member, idx) => (
                    <div key={idx} className="p-6 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}>
                      <h3 className="text-xl font-bold mb-1" style={{ color: '#132552' }}>{member.name}</h3>
                      <p className="text-base font-semibold mb-2" style={{ color: '#8E3400' }}>{member.title}</p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>{member.credentials}</p>
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#132552' }}>Course Facilitation</h3>
                  <p className="text-base" style={{ color: '#4B5563' }}>
                    The course facilitators will use various engagement techniques such as polls, breakout rooms for group activities, 
                    whiteboard sharing, and screen sharing for presentations in the delivery of the course modules. The course also features 
                    guest lecturers and subject matter experts from across the African maritime sector, providing diverse perspectives on 
                    contemporary challenges and best practices.
                  </p>
                </div>
              </div>
            )}

            {/* Course Modules Tab */}
            {activeTab === 'modules' && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#132552' }}>
                  Course Modules
                </h2>
                <p className="text-lg mb-6" style={{ color: '#4B5563' }}>
                  The course content has been categorised into eight (8) modules to be covered over two (2) weeks, with each module covering a specific topic or concept.
                </p>

                {/* 8 Modules Grid - HIGHLIGHTED */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {moduleList.map((module) => (
                    <div 
                      key={module.number} 
                      className="p-6 rounded-xl border-2 hover:shadow-lg transition-all relative overflow-hidden group"
                      style={{ borderColor: module.number % 2 === 0 ? '#132552' : '#8E3400' }}
                    >
                      {/* Module Number Badge */}
                      <div 
                        className="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 transform rotate-45"
                        style={{ backgroundColor: module.number % 2 === 0 ? '#132552' : '#8E3400' }}
                      ></div>
                      <div className="absolute top-2 right-3 text-white font-bold z-10">
                        #{module.number}
                      </div>
                      
                      <h3 className="text-lg font-bold mb-3 pr-8" style={{ color: '#132552' }}>
                        {module.title}
                      </h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        {module.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Weekly Breakdown */}
                <div className="mt-10">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#132552' }}>
                    Weekly Breakdown
                  </h3>
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
                              {week.modules.map((moduleNum) => (
                                <span 
                                  key={moduleNum}
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                  style={{ backgroundColor: moduleNum % 2 === 0 ? '#132552' : '#8E3400' }}
                                >
                                  {moduleNum}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h5 className="font-bold mb-3 text-sm" style={{ color: '#6B7280' }}>KEY SESSIONS:</h5>
                          <ul className="space-y-2">
                            {week.sessions.map((session, sidx) => (
                              <li key={sidx} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8E3400' }} />
                                <span className="text-sm" style={{ color: '#4B5563' }}>{session}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-xl border-l-4 mt-8" style={{ backgroundColor: '#F5F7FA', borderColor: '#8E3400' }}>
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#132552' }}>Learning Materials</h3>
                  <p className="text-base mb-4" style={{ color: '#4B5563' }}>
                    Each module includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8E3400' }} />
                      <span style={{ color: '#6B7280' }}>Comprehensive reading materials and case studies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8E3400' }} />
                      <span style={{ color: '#6B7280' }}>Practical exercises and group activities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8E3400' }} />
                      <span style={{ color: '#6B7280' }}>Recorded sessions for review</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8E3400' }} />
                      <span style={{ color: '#6B7280' }}>Access to supplementary resources including further readings, links to online resources, and recorded sessions</span>
                    </li>
                  </ul>
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
