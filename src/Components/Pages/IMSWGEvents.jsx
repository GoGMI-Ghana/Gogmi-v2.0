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
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IMSWGEvents = () => {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState(null);

  const topicsForDiscussion = [
    {
      number: 1,
      title: "BBNJ Relevance to a Predominantly Coastal Region",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "#0891b2",
      description: "Transboundary impacts of area-based management tools and environmental impact assessments on national waters, and eligibility for marine genetic resources benefit sharing.",
      points: []
    },
    {
      number: 2,
      title: "Maritime Security & Enforcement Implications",
      icon: <Shield className="w-6 h-6" />,
      color: "#132552",
      description: "Monitoring and surveillance requirements at the exclusive economic zone and areas-beyond-national-jurisdiction boundary, and linkages to illegal, unreported, and unregulated fishing.",
      points: []
    },
    {
      number: 3,
      title: "Capacity Building & Technology Transfer",
      icon: <Target className="w-6 h-6" />,
      color: "#0891b2",
      description: "Needs for resource-constrained navies, coast guards, and marine agencies in the region, drawing on Ghana's experience with the Enabling Activities for the Biodiversity Beyond National Jurisdiction project.",
      points: []
    },
    {
      number: 4,
      title: "Pathways to the First Conference of the Parties",
      icon: <Globe className="w-6 h-6" />,
      color: "#132552",
      description: "How Gulf of Guinea states can engage in the preparatory process toward the first Conference of the Parties, scheduled for 11–22 January 2027.",
      points: []
    }
  ];

  const objectives = [
    "Establish a shared understanding of what the BBNJ Agreement means for the Gulf of Guinea, given that it governs the high seas rather than national waters, and how its effects still reach the region indirectly, through spillover from protected areas and environmental assessments, and through benefit sharing from marine genetic resources.",
    "Assess the maritime security and enforcement implications of the Agreement's area-based management tools and monitoring obligations, including the monitoring, surveillance, and enforcement capacity required of regional navies and coast guards at the exclusive economic zone and areas-beyond-national-jurisdiction boundary, and linkages to illegal, unreported, and unregulated fishing.",
    "Identify capacity building and technology transfer needs for regional implementation, drawing on Ghana's experience with the Enabling Activities for the Biodiversity Beyond National Jurisdiction project.",
    "Approve a publication plan, an IMSWG report attributed to the presenting expert, and identify priority follow-on research or advocacy activity."
  ];

  const agenda = [
    { time: "1300 – 1305", activity: "Welcome, objectives, operating principles" },
    { time: "1305 – 1320", activity: "Opening address" },
    { time: "1320 – 1345", activity: "Segment 1: The BBNJ Agreement — provisions and implications for ocean governance in the Gulf of Guinea" },
    { time: "1345 – 1410", activity: "Segment 2: Capacity building, technology transfer, and regional positioning ahead of the first Conference of the Parties" },
    { time: "1410 – 1445", activity: "Interactive session" },
    { time: "1445 – 1500", activity: "Closing summary and confirmation of report process" }
  ];

  const stakeholders = [
    "Members of the GoGMI-hosted IMSWG",
    "Senior representatives of navies and coast guards",
    "Fisheries and marine environment agencies",
    "Maritime administrations and regulators",
    "Ministry of Environment, Science and Technology and UNDP team implementing the Enabling Activities for the BBNJ project",
    "Officials engaged in ocean governance from relevant ministries",
    "Academia and research institutions",
    "Regional and international organisations",
    "Development partners",
    "Think tanks and non-governmental organisations"
  ];

  const expectedOutcomes = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      text: "Shared understanding of the implications of the BBNJ Agreement for Gulf of Guinea maritime governance"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      text: "An assessment of capacity building and technology transfer needs relevant to regional implementation"
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Identification of linkages between BBNJ provisions and existing regional maritime security and environmental governance frameworks"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      text: "Priority areas for follow-on research, capacity building, or advocacy activity"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      text: "A meeting record and a published IMSWG report"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "A validated publication plan, with a named presenting expert and delivery timeline"
    }
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
              <span className="text-sm font-bold uppercase tracking-wide text-cyan-400">Quarter 3 Forum — 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
                style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              The Implications of the BBNJ Agreement for the Gulf of Guinea
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              High-Level Expert Meeting of the International Maritime Security Working Group (IMSWG), 2026
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">26th August, 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">1:00 PM – 3:00 PM GMT</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">Virtual</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/imswg-forum-q3')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-2xl bg-cyan-400 text-slate-900"
              >
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
                About This Forum
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
                Executive Summary
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                IMSWG will convene a session to align practitioners, policy leaders, and researchers on the implications of the entry into force of the BBNJ Agreement for the Gulf of Guinea. The dialogue will bridge science, policy, and ocean governance in line with UNCLOS and the BBNJ Agreement's provisions on marine genetic resources, area-based management tools, environmental impact assessments, and capacity building and technology transfer.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                Immediate outputs will include a meeting record and a published IMSWG report.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>
              <img
                src="/IMSWG-BBNJ-newdate.jpeg"
                alt="IMSWG 2026 Quarter 3 Forum Flyer"
                className="relative rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-2" style={{ borderColor: '#0891b2' }}>
                <div className="text-2xl font-black mb-1" style={{ color: '#0891b2' }}>IMSWG</div>
                <p className="text-sm font-semibold" style={{ color: '#132552' }}>Q3 2026 Forum</p>
              </div>
            </div>
          </div>

          {/* Forum Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-5 h-5" />, title: "Policy Dialogue", description: "Expert reflection and critical discussion on ocean governance and the BBNJ Agreement" },
              { icon: <Users className="w-5 h-5" />, title: "Multi-Stakeholder", description: "Practitioners, policymakers, researchers, and regional stakeholders" },
              { icon: <Globe className="w-5 h-5" />, title: "Regional Focus", description: "Gulf of Guinea maritime governance and BBNJ implementation" },
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

      {/* BACKGROUND */}
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
                  Background
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                  The Agreement under the United Nations Convention on the Law of the Sea on the Conservation and Sustainable Use of Marine Biological Diversity of Areas Beyond National Jurisdiction (BBNJ Agreement) was adopted on 19 June 2023. The sixtieth instrument of ratification was deposited on 19 September 2025, triggering entry into force 120 days later, on 17 January 2026. At the point of entry into force, the Agreement had 83 parties and 145 signatories, establishing a legally binding framework covering marine genetic resources and benefit sharing, area-based management tools including marine protected areas, environmental impact assessments, and capacity building and technology transfer.
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                  Ghana deposited its instrument of ratification on 14 January 2026, and the Agreement entered into force for Ghana on 13 February 2026. In July 2026, the Ministry of Environment, Science and Technology, in partnership with the United Nations Development Programme and with funding support from the Global Environment Facility, launched the Enabling Activities for the Biodiversity Beyond National Jurisdiction project at an inception meeting in Accra. The third and final session of the Preparatory Commission took place from 23 March to 2 April 2026 at UN Headquarters in New York, concluding with a report of recommendations to be forwarded to the first Conference of the Parties, scheduled to convene from 11 to 22 January 2027.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
              What We Aim To Achieve
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Objectives
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              To convene a high-level session of IMSWG that aligns policy makers, practitioners, and researchers on the provisions, opportunities, and governance requirements of the BBNJ Agreement for the Gulf of Guinea, and to map practical pathways for regional engagement ahead of the first Conference of the Parties.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {objectives.map((objective, idx) => (
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

      {/* TOPICS FOR DISCUSSION */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
              Discussion Themes
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Topics for Discussion
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Discussions will centre around the following thematic areas
            </p>
          </div>

          <div className="space-y-4">
            {topicsForDiscussion.map((issue, idx) => (
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
                          Topic {issue.number}
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
                      <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>
                        {issue.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMAT / AGENDA + STAKEHOLDERS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
                2-Hour Meeting
              </span>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>
                Format & Agenda
              </h2>

              <div className="space-y-3">
                {agenda.map((slot, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                    <div className="flex-shrink-0 text-sm font-bold px-3 py-1.5 rounded-lg whitespace-nowrap"
                         style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)', color: '#0891b2' }}>
                      {slot.time}
                    </div>
                    <p className="text-sm pt-1" style={{ color: '#4B5563' }}>
                      {slot.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>
                Stakeholders & Participants
              </h2>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Who Should Participate</h3>
                <ul className="space-y-2 text-sm">
                  {stakeholders.map((item, i) => (
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

      {/* EXPECTED OUTCOMES */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider font-bold mb-4 block" style={{ color: '#0891b2' }}>
              What This Meeting Will Produce
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Expected Outcomes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {expectedOutcomes.map((outcome, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border-l-4" style={{ borderColor: '#0891b2' }}>
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
        </div>
      </section>

      {/* CONCLUSION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-black mb-6" style={{ color: '#132552' }}>
            Conclusion
          </h2>
          <p className="text-lg leading-relaxed mb-4" style={{ color: '#4B5563' }}>
            The entry into force of the BBNJ Agreement marks a new phase in ocean governance with direct relevance to Gulf of Guinea maritime security and blue economy agendas. Effective regional engagement will require a clear understanding of the Agreement's provisions, identification of capacity gaps, and coordinated preparation ahead of the first Conference of the Parties.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
            By examining these implications at this stage, IMSWG and its partners can support informed regional positioning, strengthen ocean governance capacity, and contribute to sustainable blue economy outcomes for the Gulf of Guinea.
          </p>
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
              26th August, 2026 — 1:00 PM – 3:00 PM GMT
            </p>
            <p className="text-lg text-white/80">
              Virtual Meeting — Registration required
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/imswg-forum-q3')}
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
