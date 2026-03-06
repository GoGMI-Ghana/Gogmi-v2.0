import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  BookOpen, 
  Award,
  FileText,
  Shield,
  AlertTriangle,
  Search,
  BarChart3,
  Brain,
  Globe,
  Calendar,
  Download,
  Target,
  Zap,
  Network,
  Layers,
  Map,
  Briefcase
} from 'lucide-react';

const MaritimeGovernanceCourse = () => {
  const [activeModule, setActiveModule] = useState(null);

  // Course Modules with detailed content from provided data
  const modules = [
    {
      number: 1,
      title: "Introduction & Maritime Strategy Theory",
      icon: <BookOpen className="w-6 h-6" />,
      color: "#8E3400",
      topics: [
        "Understanding the importance of maritime strategy",
        "Theoretical foundations of maritime strategy development",
        "Historical context of maritime strategies in Africa",
        "Key concepts: maritime domain, maritime power, sea power",
        "Relationship between national interests and maritime strategy",
        "Strategic thinking versus operational planning",
        "The maritime strategy development cycle"
      ],
      learningOutcomes: [
        "Explain the theoretical foundations of maritime strategy",
        "Understand how maritime strategy enhances both national and regional priorities and objectives",
        "Differentiate between strategic, operational, and tactical levels of maritime planning",
        "Analyze the relationship between national interests and maritime strategy formulation"
      ]
    },
    {
      number: 2,
      title: "Assessing Maritime Domain Challenges & Opportunities",
      icon: <Search className="w-6 h-6" />,
      color: "#132552",
      topics: [
        "Maritime threat landscape in Africa",
        "Maritime security challenges: piracy, armed robbery, illegal fishing, trafficking",
        "Environmental threats and climate change impacts",
        "Economic opportunities in the Blue Economy",
        "Maritime domain awareness and surveillance",
        "Stakeholder mapping and analysis",
        "Resource assessment and capability gaps",
        "SWOT analysis for maritime sectors"
      ],
      learningOutcomes: [
        "Generate an understanding of how to develop maritime strategies that address Africa's unique challenges",
        "Identify key maritime security threats and economic opportunities",
        "Conduct comprehensive maritime domain assessments",
        "Analyze capability gaps and resource requirements for maritime development"
      ]
    },
    {
      number: 3,
      title: "Strategy Development Process",
      icon: <Layers className="w-6 h-6" />,
      color: "#8E3400",
      topics: [
        "Step-by-step strategy development framework",
        "Vision, mission, and goal setting",
        "Strategic objective formulation",
        "Policy alignment and coherence",
        "Stakeholder engagement and consultation processes",
        "Drafting strategy documents",
        "Review and validation mechanisms",
        "Political will and leadership engagement"
      ],
      learningOutcomes: [
        "Master the step-by-step process of maritime strategy development",
        "Examine the primary features that enhance the sustainability of strategies and action plans",
        "Formulate clear strategic objectives aligned with national priorities",
        "Design effective stakeholder engagement processes"
      ]
    },
    {
      number: 4,
      title: "Interagency Coordination & Stakeholder Analysis",
      icon: <Network className="w-6 h-6" />,
      color: "#132552",
      topics: [
        "Importance of interagency coordination",
        "Mapping maritime stakeholders and their interests",
        "Government agencies and their mandates",
        "Private sector engagement",
        "Civil society and academic institutions",
        "International partners and regional bodies",
        "Coordination mechanisms and frameworks",
        "Overcoming coordination challenges",
        "Building trust and shared understanding"
      ],
      learningOutcomes: [
        "Develop skills to collaborate with stakeholders and partners toward maritime strategy development",
        "Map and analyze stakeholder interests and influences",
        "Design effective interagency coordination mechanisms",
        "Foster multi-sectoral partnerships for maritime governance"
      ]
    },
    {
      number: 5,
      title: "Ends, Ways, Means & Risk",
      icon: <Target className="w-6 h-6" />,
      color: "#8E3400",
      topics: [
        "Strategic framework: Ends (objectives), Ways (methods), Means (resources)",
        "Aligning ends with available means",
        "Resource mobilization and allocation",
        "Risk identification and assessment",
        "Risk mitigation strategies",
        "Contingency planning",
        "Cost-benefit analysis",
        "Measuring strategic effectiveness",
        "Adaptive management and course correction"
      ],
      learningOutcomes: [
        "Apply the Ends-Ways-Means framework to maritime strategy",
        "Identify and assess strategic risks in maritime governance",
        "Develop resource mobilization strategies",
        "Design risk mitigation and contingency plans"
      ]
    },
    {
      number: 6,
      title: "Maritime Strategy Implementation",
      icon: <Zap className="w-6 h-6" />,
      color: "#132552",
      topics: [
        "From strategy to action: implementation planning",
        "Action plan development",
        "Institutional frameworks for implementation",
        "Monitoring and evaluation systems",
        "Performance indicators and benchmarks",
        "Reporting mechanisms",
        "Adaptive implementation: learning and adjusting",
        "Sustaining political will and momentum",
        "Communication strategies for implementation"
      ],
      learningOutcomes: [
        "Explore tools and techniques that can facilitate the planning and implementation of maritime strategy documents",
        "Design comprehensive implementation action plans",
        "Establish monitoring and evaluation frameworks",
        "Develop communication strategies to sustain momentum"
      ]
    },
    {
      number: 7,
      title: "Sector Planning – In Class Exercise",
      icon: <Briefcase className="w-6 h-6" />,
      color: "#8E3400",
      topics: [
        "Practical sector planning exercise",
        "Selecting a maritime sector for planning",
        "Applying strategy development framework",
        "Stakeholder consultation simulation",
        "Resource mapping and gap analysis",
        "Drafting sector action plans",
        "Peer review and feedback",
        "Presentation of sector plans"
      ],
      learningOutcomes: [
        "Equip participants with the skill sets necessary to contribute meaningfully to maritime strategy development processes",
        "Apply theoretical knowledge to practical sector planning",
        "Collaborate effectively in team-based strategy development",
        "Present and defend strategic plans to peers"
      ]
    },
    {
      number: 8,
      title: "Case Study Reports & Course Conclusion",
      icon: <FileText className="w-6 h-6" />,
      color: "#132552",
      topics: [
        "Analysis of regional maritime strategies",
        "Case study: 2050 Africa's Integrated Maritime Strategy",
        "Case study: Yaoundé Architecture for Maritime Security",
        "Case study: National maritime strategies",
        "Comparative analysis of successes and challenges",
        "Lessons learned and best practices",
        "Final participant presentations",
        "Course synthesis and key takeaways",
        "Next steps and post-course engagement"
      ],
      learningOutcomes: [
        "Explicate the implications of strategy development processes on the success or failure of national, regional and continental strategies",
        "Analyze real-world case studies of maritime strategies",
        "Synthesize key lessons and best practices",
        "Articulate personal and organizational commitments to maritime governance"
      ]
    }
  ];

  // Rationale from provided content
  const rationalePoints = [
    "For decades, the African continent has faced a wide range of maritime security threats and challenges, none of which can be fully addressed without strategic guidance.",
    "Consequently, the continent witnessed a proliferation of strategy documents, including the 2050 Africa's Integrated Maritime Strategy in 2012, the Lomé Charter in 2016, and the Africa Blue Economy Strategy in 2019.",
    "At the regional level, we have the Yaoundé Architecture for Maritime Security (YAMS), the ECOWAS Integrated Maritime Strategy, among others.",
    "At the national level, some African states also began processes toward developing comprehensive maritime strategies.",
    "Whether or not these strategies are on course to achieve their intended objectives remains debatable.",
    "With a growing recognition amongst African states of the importance of the continent's vast maritime domain comes a responsibility to ensure its protection and development at all levels.",
    "Effective maritime sector strategies could provide a unique framework for attaining this.",
    "What remains crucial is to ground relevant maritime practitioners and policymakers in the theoretical and practical underpinnings necessary to develop purposeful, targeted maritime strategies or to successfully implement existing ones in national and regional contexts.",
    "This course is intended to provide such grounding by exposing participants to key principles and best practices for developing and implementing maritime strategies.",
    "The programme will expand the expertise necessary to ensure that African states have the skills they truly need to address their peculiar mix of maritime threats and challenges."
  ];

  // Target participants from provided content
  const targetParticipants = [
    "Government Agencies",
    "Non-Governmental Organisations",
    "Private Sector",
    "Industries",
    "Institutions",
    "Students",
    "General Public"
  ];

  // Technical requirements from provided content
  const technicalRequirements = [
    "Reliable internet connection with a minimum recommended bandwidth of 100 Mbps",
    "A computer, laptop, or tablet with audio and video capabilities",
    "Compatible web browser(s) and any additional software required for the online platform"
  ];

  // Expected outcomes from provided content
  const expectedOutcomes = [
    "Develop a team of skilled actors to enhance maritime strategy development processes across the continent",
    "Enhance the implementation of existing continental, regional and national strategies in Africa as related to specific maritime sectors",
    "Foster more effective inter-agency and non-governmental organisations coordination toward the implementation of maritime security strategies",
    "Enhance networking opportunities and collaboration among participating stakeholders involved in maritime security across Africa"
  ];

  // Course highlights
  const courseHighlights = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Africa-Focused",
      description: "Tailored to address Africa's unique maritime challenges and opportunities"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Expert Faculty",
      description: "Maritime strategy experts, policy practitioners, and regional specialists"
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "8 Comprehensive Modules",
      description: "From theory to practical implementation and case studies"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Certification",
      description: "Certificate upon successful completion of all modules"
    }
  ];

  // Delivery methods from provided content
  const deliveryMethods = [
    "Live/Virtual (Zoom) Sessions: Interactive learning platform with simulations, presentations, group discussions, forums and assignments",
    "Interactive engagement techniques: polls, breakout rooms for group activities, whiteboard sharing, and screen sharing",
    "Dedicated support: Communication with instructors via emails, live chat sessions, and Q&A forums",
    "Session recordings: Each session recorded to allow participants to review content later"
  ];

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      
      {/* HERO SECTION */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1600&fit=crop&q=90"
            alt="Maritime Governance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-900/95"></div>
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-sm font-bold uppercase tracking-wide">Executive Training Course</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
                style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              Maritime Governance Course
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/95">
              Equipping professionals with the knowledge and tools to develop and implement effective maritime strategies in Africa
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">2 Weeks</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">Virtual (Zoom)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">8 Modules</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-2xl"
                      style={{ backgroundColor: '#8E3400', color: 'white' }}>
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 border-2 border-white/30 hover:bg-white/10">
                <Download className="w-5 h-5" />
                <span>Download Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RATIONALE SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ backgroundColor: '#132552' }}>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-sm uppercase tracking-wider font-bold mb-2 block" style={{ color: '#8E3400' }}>
                  Why This Course
                </span>
                <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>
                  Rationale
                </h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {rationalePoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                       style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)' }}>
                    <span className="text-xs font-bold" style={{ color: '#8E3400' }}>{idx + 1}</span>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COURSE HIGHLIGHTS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>
              At a Glance
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Course Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseHighlights.map((highlight, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                     style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)', color: '#8E3400' }}>
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#132552' }}>
                  {highlight.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOALS/OBJECTIVES */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>
              What You'll Learn
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Course Goals & Objectives
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              The goal of the Maritime Governance Course is to equip professionals, stakeholders, and decision-makers with the knowledge, skills, and tools necessary to understand the maritime strategy development and implementation processes within the African context.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Understand how maritime strategy enhances both national and regional priorities and objectives",
              "Generate an understanding of how to develop maritime strategies that address Africa's unique challenges",
              "Examine the primary features that enhance the sustainability of strategies and action plans",
              "Explore tools and techniques that can facilitate the planning and implementation of maritime strategy documents",
              "Equip participants with the skill sets necessary to contribute meaningfully to maritime strategy development processes",
              "Explicate the implications of strategy development processes on the success or failure of strategies",
              "Develop the skills of participants to collaborate with stakeholders and partners toward maritime strategy development"
            ].map((objective, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)' }}>
                    <Target className="w-4 h-4" style={{ color: '#8E3400' }} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                    {objective}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE MODULES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>
              Curriculum
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              8 Comprehensive Modules
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              The course content has been categorised into eight (8) modules to be covered over two (2) weeks
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((module, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
                <button
                  onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: `${module.color}15`, color: module.color }}>
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold px-3 py-1 rounded-full" 
                              style={{ backgroundColor: `${module.color}15`, color: module.color }}>
                          Module {module.number}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: '#132552' }}>
                        {module.title}
                      </h3>
                    </div>
                  </div>
                  <div className={`transform transition-transform ${activeModule === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6" style={{ color: '#6B7280' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {activeModule === idx && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid md:grid-cols-2 gap-8 pt-6">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: '#6B7280' }}>
                          Topics Covered
                        </h4>
                        <ul className="space-y-3">
                          {module.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: module.color }} />
                              <span className="text-sm" style={{ color: '#4B5563' }}>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: '#6B7280' }}>
                          Learning Outcomes
                        </h4>
                        <ul className="space-y-3">
                          {module.learningOutcomes.map((outcome, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                   style={{ backgroundColor: `${module.color}15`, color: module.color }}>
                                <span className="text-xs font-bold">{i + 1}</span>
                              </div>
                              <span className="text-sm" style={{ color: '#4B5563' }}>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET PARTICIPANTS & REQUIREMENTS */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Target Participants */}
            <div>
              <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>
                Who Should Attend
              </span>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>
                Target Participants
              </h2>
              <p className="text-base mb-6" style={{ color: '#4B5563' }}>
                The course is open to all interested actors serving within the maritime domain or with a shared interest:
              </p>

              <div className="space-y-3">
                {targetParticipants.map((participant, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)' }}>
                      <Users className="w-4 h-4" style={{ color: '#8E3400' }} />
                    </div>
                    <span className="text-base font-medium" style={{ color: '#132552' }}>{participant}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Requirements */}
            <div>
              <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>
                Required Equipment
              </span>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>
                Technical Requirements
              </h2>
              <p className="text-base mb-6" style={{ color: '#4B5563' }}>
                The course will be administered virtually. Interested participants must have access to:
              </p>

              <div className="space-y-4">
                {technicalRequirements.map((req, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                           style={{ backgroundColor: 'rgba(19, 37, 82, 0.1)' }}>
                        <span className="text-sm font-bold" style={{ color: '#132552' }}>{idx + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{req}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT AND METHODOLOGY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Format & Methodology
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Live/Virtual Sessions */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#8E3400' }}>
                Live/Virtual (Zoom) Sessions
              </h3>
              <ul className="space-y-4">
                {deliveryMethods.map((method, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#132552' }} />
                    <span className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{method}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modular Sessions */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#132552' }}>
                Modular Sessions
              </h3>
              <p className="text-sm mb-4" style={{ color: '#4B5563' }}>
                The course content has been categorised into eight (8) modules to be covered over two (2) weeks, with each module covering a specific topic or concept.
              </p>
              <div className="grid grid-cols-4 gap-2 mt-6">
                {[1,2,3,4,5,6,7,8].map((num) => (
                  <div key={num} className="aspect-square rounded-lg flex items-center justify-center font-bold"
                       style={{ backgroundColor: num % 2 === 0 ? '#132552' : '#8E3400', color: 'white' }}>
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTED OUTCOMES */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#8E3400' }}>
              What You'll Gain
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Expected Outcomes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {expectedOutcomes.map((outcome, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border-l-4" 
                   style={{ borderColor: idx % 2 === 0 ? '#8E3400' : '#132552' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: idx % 2 === 0 ? 'rgba(142, 52, 0, 0.1)' : 'rgba(19, 37, 82, 0.1)' }}>
                    <Award className="w-5 h-5" style={{ color: idx % 2 === 0 ? '#8E3400' : '#132552' }} />
                  </div>
                  <p className="text-base font-medium leading-relaxed" style={{ color: '#132552' }}>
                    {outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <div className="mb-8">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-white" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Advance Your Maritime Governance Expertise
            </h2>
            <p className="text-xl text-white/90 mb-2">
              Next Intake: TBA 2026
            </p>
            <p className="text-lg text-white/80">
              Virtual training over 2 weeks | Limited spaces available
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-2xl"
                    style={{ backgroundColor: '#8E3400', color: 'white' }}>
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 border-2 border-white/30 text-white hover:bg-white/10">
              <Download className="w-5 h-5" />
              <span>Download Brochure</span>
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">For inquiries:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white">
              <span>📧 info@gogmi.org.gh</span>
              <span className="hidden sm:block">|</span>
              <span>📱 WhatsApp: +233504953400</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MaritimeGovernanceCourse;
