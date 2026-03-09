import React, { useState } from 'react';
import { 
  ArrowLeft,
  ArrowRight, 
  Calendar,
  Clock,
  Users,
  Globe,
  Shield,
  Anchor,
  Target,
  MessageSquare,
  FileText,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  BarChart3,
  Waves
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IMSWGEvents = () => {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState(null);

  const keyIssues = [
    {
      number: 1,
      title: "Evolving Maritime Threats in the Gulf of Guinea",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "#0891b2",
      description: "Examining the changing spectrum of maritime security threats including piracy, armed robbery at sea, IUU fishing, trafficking, and marine pollution that continue to undermine sustainable development.",
      points: [

      ]
    },
    {
      number: 2,
      title: "Impact of Maritime Insecurity on Investment & Livelihoods",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "#132552",
      description: "Analysing how maritime insecurity affects economic investment, governance structures, and coastal community livelihoods across the Gulf of Guinea region.",
      points: [
       
      ]
    },
    {
      number: 3,
      title: "Institutional Coordination Challenges",
      icon: <Shield className="w-6 h-6" />,
      color: "#0891b2",
      description: "Assessing the effectiveness of existing regional governance mechanisms, including the Yaoundé Architecture and the Gulf of Guinea Commission.",
      points: [
       
      ]
    },
    {
      number: 4,
      title: "Regional Organisations & Maritime Governance",
      icon: <Globe className="w-6 h-6" />,
      color: "#132552",
      description: "Exploring the role of regional organisations in strengthening integrated maritime governance and fostering cooperation between states.",
      points: [
       
      ]
    },
    {
      number: 5,
      title: "Aligning Security Operations with Blue Economy Development",
      icon: <Waves className="w-6 h-6" />,
      color: "#0891b2",
      description: "Identifying policy and operational pathways for strengthening coordination between maritime security initiatives and sustainable blue economy development strategies.",
      points: [
       
      ]
    }
  ];

  const expectedOutcomes = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      text: "Foster informed dialogue among regional maritime stakeholders"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      text: "Generate policy insights and recommendations for strengthening maritime governance in the Gulf of Guinea"
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Promote greater awareness of the security–development nexus in ocean governance"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      text: "Contribute to ongoing research, policy engagement, and regional cooperation on maritime security and the blue economy"
    }
  ];

  const meetingObjectives = [
    "Present and discuss the key findings and analytical framework proposed in the research paper",
    "Examine the linkages between maritime security challenges and the development of blue economy sectors in the Gulf of Guinea",
    "Assess the effectiveness of existing regional governance mechanisms, including the Yaoundé Architecture and the Gulf of Guinea Commission",
    "Identify policy and operational pathways for strengthening coordination between maritime security initiatives and blue economy development strategies",
    "Facilitate expert feedback that can contribute to further policy discussions and regional research on maritime security and ocean governance"
  ];

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      
      {/* HERO SECTION */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/imswg4.jpg"
            alt="IMSWG Forum"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-cyan-900/95"></div>
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <button
              onClick={() => navigate('/imswg')}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to IMSWG</span>
            </button>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-cyan-400/20 backdrop-blur-md border border-cyan-400/30">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold uppercase tracking-wide text-cyan-400">Quarter 1 Forum — 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
                style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              Optimizing Maritime Security for Sustainable Blue Economy Development
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              A Strategic Framework for the Gulf of Guinea
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">17th March, 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">2:00 PM GMT</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">Virtual (Zoom)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/imswg-forum')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-2xl bg-cyan-400 text-slate-900"
              >
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FLYER + RESEARCH OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
                About This Forum
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
                Background & Context
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                The Gulf of Guinea remains one of the most strategically significant maritime regions in the world. Its waters support critical shipping lanes, offshore energy infrastructure, fisheries, and emerging blue economy sectors vital to the economic growth of West and Central African states.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                Despite the region's immense potential, persistent maritime security challenges — including piracy, armed robbery at sea, IUU fishing, trafficking, marine pollution, and weak maritime governance — continue to undermine sustainable ocean-based development.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                This forum will discuss the research paper authored by Commander Kofi Amponsah Duodu, developed under the United Nations – Nippon Foundation Fellowship Programme at the International Maritime Law Institute (IMLI), Malta.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>
              <img 
                src="/imswgq1.jpeg"
                alt="IMSWG 2026 Forum Flyer"
                className="relative rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-2" style={{ borderColor: '#0891b2' }}>
                <div className="text-2xl font-black mb-1" style={{ color: '#0891b2' }}>IMSWG</div>
                <p className="text-sm font-semibold" style={{ color: '#132552' }}>Q1 2026 Forum</p>
              </div>
            </div>
          </div>

          {/* Forum Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-5 h-5" />, title: "Policy Dialogue", description: "Expert reflection and critical discussion on maritime governance findings" },
              { icon: <Users className="w-5 h-5" />, title: "Multi-Stakeholder", description: "Practitioners, policymakers, researchers, and regional stakeholders" },
              { icon: <Globe className="w-5 h-5" />, title: "Regional Focus", description: "Gulf of Guinea maritime security and blue economy integration" },
              { icon: <Anchor className="w-5 h-5" />, title: "Chatham House Rule", description: "Open discussion under Chatham House confidentiality principles" }
            ].map((highlight, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                     style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)', color: '#0891b2' }}>
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

      {/* RATIONALE / WHY THIS MATTERS */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ backgroundColor: '#0891b2' }}>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black mb-4" style={{ color: '#132552' }}>
                  Why This Discussion Matters
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                  In recent years, regional and international efforts such as the Yaoundé Architecture for Maritime Security, the 2050 Africa Integrated Maritime Strategy, and the African Union Blue Economy Strategy have sought to strengthen cooperation and institutional responses.
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                  However, important gaps remain in aligning maritime security frameworks with broader blue economy development strategies. These threats not only affect maritime trade and economic investment but also impact coastal livelihoods, regional stability, and environmental sustainability.
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                  The research paper proposes a strategic governance framework that addresses structural coordination challenges within existing regional mechanisms and highlights the potential role of institutions such as the Gulf of Guinea Commission (GGC) in strengthening integrated maritime governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEETING OBJECTIVES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
              What We Aim To Achieve
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Meeting Objectives
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              This high-level expert meeting brings together stakeholders to examine critical maritime governance issues
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {meetingObjectives.map((objective, idx) => (
              <div key={idx} className="bg-gradient-to-r from-cyan-50 to-white rounded-2xl p-6 border-l-4"
                   style={{ borderColor: '#0891b2' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: '#0891b2', color: 'white' }}>
                    <span className="text-lg font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-lg font-semibold pt-1" style={{ color: '#132552' }}>
                    {objective}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY ISSUES FOR DISCUSSION */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
              Discussion Themes
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Key Issues for Discussion
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Participants will explore several important themes emerging from the research
            </p>
          </div>

          <div className="space-y-4">
            {keyIssues.map((issue, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
                <button
                  onClick={() => setActiveTheme(activeTheme === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: `${issue.color}15`, color: issue.color }}>
                      {issue.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold px-3 py-1 rounded-full" 
                              style={{ backgroundColor: `${issue.color}15`, color: issue.color }}>
                          Theme {issue.number}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: '#132552' }}>
                        {issue.title}
                      </h3>
                    </div>
                  </div>
                  <div className={`transform transition-transform ${activeTheme === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6" style={{ color: '#6B7280' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {activeTheme === idx && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-6">
                      <p className="text-base leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                        {issue.description}
                      </p>
                      <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: '#6B7280' }}>
                        Key Discussion Points
                      </h4>
                      <ul className="space-y-3">
                        {issue.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: issue.color }} />
                            <span className="text-sm" style={{ color: '#4B5563' }}>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCHER PROFILE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
                Featured Research
              </span>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>
                About the Research Paper
              </h2>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold mb-2" style={{ color: '#132552' }}>
                  Optimizing Maritime Security for Sustainable Blue Economy Development
                </h3>
                <p className="text-base italic mb-4" style={{ color: '#6B7280' }}>
                  A Strategic Framework for the Gulf of Guinea
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)' }}>
                      <Users className="w-4 h-4" style={{ color: '#0891b2' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#132552' }}>Author</p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>Commander Kofi Amponsah Duodu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)' }}>
                      <BookOpen className="w-4 h-4" style={{ color: '#0891b2' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#132552' }}>Programme</p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>United Nations – The Nippon Foundation Fellowship Programme (2025)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)' }}>
                      <Globe className="w-4 h-4" style={{ color: '#0891b2' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#132552' }}>Institution</p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>International Maritime Law Institute (IMLI), Malta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>
                Expected Outcomes
              </h2>
              
              <div className="space-y-4">
                {expectedOutcomes.map((outcome, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-cyan-50 to-white rounded-xl p-5 border-l-4" style={{ borderColor: '#0891b2' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                           style={{ backgroundColor: '#0891b2', color: 'white' }}>
                        {outcome.icon}
                      </div>
                      <p className="text-base font-semibold pt-1" style={{ color: '#132552' }}>
                        {outcome.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Who Should Participate</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Maritime security practitioners and analysts",
                    "Government policymakers and regulatory officials",
                    "Academic researchers in ocean governance",
                    "Regional and international organisation representatives",
                    "Blue economy development stakeholders",
                    "Diplomatic community members"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <div className="mb-8">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Join the Discussion
            </h2>
            <p className="text-xl text-white/90 mb-2">
              17th March, 2026 — 2:00 PM GMT
            </p>
            <p className="text-lg text-white/80">
              Virtual Meeting via Zoom — Registration required
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/imswg-forum')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-2xl bg-cyan-400 text-slate-900"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">For sponsorship & inquiries:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white">
              <span>📧 info@gogmi.org.gh</span>
              <span className="hidden sm:block">|</span>
              <span>📱 +233504953400</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default IMSWGEvents;
