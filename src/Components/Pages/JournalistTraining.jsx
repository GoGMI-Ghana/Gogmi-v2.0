import React, { useState } from 'react';
import { Download, Calendar, MapPin, Users, CheckCircle, AlertCircle, FileText, Globe, BookOpen, Award, ChevronDown, ChevronUp, X } from 'lucide-react';

const JournalistTraining = () => {
  const [showPDFModal, setShowPDFModal] = useState(false);

  const keyDates = [
    { label: 'Applications Open', date: 'August 2025' },
    { label: 'Applications Close & Selected Applicants Notified', date: 'September 2025' },
    { label: 'Application Deadline', date: '2 September 2025' },
  ];

  const whoShouldApply = [
    'Early to mid-career journalists and senior media professionals with an interest in maritime security and blue economy development.',
    'Applicants from government agencies and media institutions.',
    'Students in media or communication fields with an interest in maritime journalism.',
    'Individuals interested in advancing their careers in maritime media reporting.',
  ];

  const programHighlights = [
    'Hands-on training in open-source intelligence, data journalism, and multimedia storytelling.',
    'Presentations, small group discussions, and networking opportunities with maritime security experts.',
    'Application of the Chatham House Rule to promote open and collaborative dialogue.',
  ];

  const applicationMaterials = [
    'Cover Letter: Highlight your interest in maritime reporting and how participation aligns with your career goals.',
    'Resume: Outline relevant experience.',
    'Letter of Recommendation: Preferably from a supervisor, editor, or academic mentor.',
  ];

  return (
    <div className="w-full bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: '480px' }}>
        <div className="absolute inset-0">
          <img
            src="/bluecareer.webp"
            alt="Training for Journalists"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.96) 0%, rgba(142,52,0,0.88) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border-2"
               style={{ borderColor: '#8E3400', backgroundColor: 'rgba(142,52,0,0.25)' }}>
            <span className="text-white text-xs font-bold tracking-widest uppercase">Training Course — Completed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.02em', maxWidth: '820px' }}>
            Training for Journalists & Media Practitioners on Maritime Security, Safety and Blue Economy in the Gulf of Guinea
          </h1>

          <p className="text-lg text-white/85 font-semibold mb-8">
            Accra, Ghana · 7–9 October 2025
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Accra, Ghana</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">7–9 October 2025</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Free of Charge</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER BADGE ── */}
      <div className="bg-white border-b border-slate-100 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>Supported by</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#132552' }}>EU-funded EnMAR Project</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#8E3400' }}>Expertise France</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#F5F7FA', color: '#132552' }}>Gulf of Guinea Maritime Institute (GoGMI)</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ── LEFT: Main Content ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* About the Programme */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>About the Programme</h2>
              </div>

              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  Applications are open for the 2025 Training for Journalists and Media Practitioners on Maritime Security, Safety, and Blue Economy in the Gulf of Guinea.
                </p>
                <p>
                  The EU-funded <strong style={{ color: '#132552' }}>"Enhanced Maritime Action in the Gulf of Guinea" (EnMAR)</strong> project is implemented by Expertise France. It is aimed at improving the visibility and understanding of the European Union's involvement in favour of maritime security and safety in the Gulf of Guinea, as well as increasing cooperation, and information and knowledge sharing.
                </p>
                <p>
                  To better raise awareness on maritime security issues and challenges in the region, the EnMAR project and the Gulf of Guinea Maritime Institute (GoGMI) are launching a call for participation for a training course on: <em>"Training for Journalists and Media Practitioners on Maritime Security, Safety and Blue Economy in the Gulf of Guinea"</em>, scheduled to take place in Accra, Ghana, from 7–9 October 2025.
                </p>
                <p>
                  Facilitated by experienced maritime security practitioners, media professionals, and experts, this training offers journalists, media practitioners, and communication specialists the opportunity to explore key concepts and practical tools to enhance effective reporting on maritime activities in the Gulf of Guinea region. The training programme will cover topics including regional and global maritime security strategies, sustainable blue economy development, legal and regulatory frameworks for ocean governance, open-source intelligence techniques, and investigative and data-driven journalism.
                </p>
                <p>
                  This training programme aims at empowering participants to address challenges such as misinformation and underreporting while equipping them to contribute to public awareness, transparency, and maritime governance.
                </p>
              </div>
            </section>

            {/* Who Should Apply */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>Who Should Apply?</h2>
              </div>

              <ul className="space-y-4">
                {whoShouldApply.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} />
                    <span className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-5 rounded-xl border-l-4" style={{ backgroundColor: '#FFF7ED', borderColor: '#8E3400' }}>
                <p className="text-sm font-bold mb-1" style={{ color: '#92400E' }}>Special Consideration</p>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                  The program will prioritise diversity and inclusivity, and female applicants are highly encouraged to apply to support gender representation in maritime journalism and communication.
                </p>
              </div>
            </section>

            {/* Programme Highlights */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>Programme Highlights</h2>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {programHighlights.map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl border-2 hover:shadow-lg transition-all" style={{ borderColor: '#E5E7EB' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(142,52,0,0.1)' }}>
                      {i === 0 ? <BookOpen className="w-5 h-5" style={{ color: '#8E3400' }} /> :
                       i === 1 ? <Users className="w-5 h-5" style={{ color: '#8E3400' }} /> :
                                 <Award className="w-5 h-5" style={{ color: '#8E3400' }} />}
                    </div>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: '#374151' }}>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Materials */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>Application Materials</h2>
              </div>

              <ul className="space-y-4">
                {applicationMaterials.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs font-bold"
                         style={{ backgroundColor: '#132552' }}>
                      {i + 1}
                    </div>
                    <span className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                <p className="text-sm" style={{ color: '#4B5563' }}>
                  <strong style={{ color: '#132552' }}>Language Requirement:</strong> Applicants should have a working knowledge of English, as the program will be conducted in English.
                </p>
              </div>
            </section>

            {/* Logistical Arrangements */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#8E3400' }} />
                <h2 className="text-2xl font-black" style={{ color: '#132552' }}>Logistical Arrangements</h2>
              </div>

              <div className="p-6 rounded-2xl border-2" style={{ borderColor: '#E5E7EB' }}>
                <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                  <p>
                    <strong style={{ color: '#132552' }}>Cost:</strong> The training is free of charge.
                  </p>
                  <p>
                    <strong style={{ color: '#132552' }}>Venue:</strong> It will take place in Accra, Ghana.
                  </p>
                  <p>
                    <strong style={{ color: '#132552' }}>International Attendees:</strong> For attendees not residing in Accra who are selected and choose to travel to Accra by their own means, it will be possible to attend online.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              {/* Status Banner */}
              <div className="rounded-2xl p-5 text-white text-center" style={{ backgroundColor: '#132552' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-xs font-bold" style={{ backgroundColor: '#6B7280' }}>
                  <span>● COMPLETED</span>
                </div>
                <p className="text-sm font-semibold text-white/80">This training has concluded.</p>
                <p className="text-xs text-white/60 mt-1">Stay tuned for future editions.</p>
              </div>

              {/* Key Dates */}
              <div className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: '#E5E7EB' }}>
                <h3 className="text-base font-black mb-4 flex items-center gap-2" style={{ color: '#132552' }}>
                  <Calendar className="w-4 h-4" style={{ color: '#8E3400' }} />
                  Key Dates
                </h3>
                <ul className="space-y-4">
                  {keyDates.map((item, i) => (
                    <li key={i} className="border-b pb-3 last:border-0 last:pb-0" style={{ borderColor: '#F3F4F6' }}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#8E3400' }}>{item.label}</p>
                      <p className="text-sm font-semibold" style={{ color: '#132552' }}>{item.date}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: '#E5E7EB' }}>
                <h3 className="text-base font-black mb-4 flex items-center gap-2" style={{ color: '#132552' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#8E3400' }} />
                  Location
                </h3>
                <p className="text-sm font-semibold" style={{ color: '#132552' }}>Coconut Grove Regency Hotel</p>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Virtual attendance available for international participants</p>
              </div>

              {/* Event Flyer */}
              <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: '#E5E7EB' }}>
                <div className="px-4 pt-4 pb-2">
                  <h3 className="text-base font-black" style={{ color: '#132552' }}>Event Flyer</h3>
                  <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Official training course poster</p>
                </div>
                {/* Flyer image — replace src with actual flyer path */}
                <div className="relative group">
                  <img
                    src="/resources/images/journalist-training-flyer.jpg"
                    alt="Journalist Training 2025 Flyer"
                    className="w-full object-cover"
                    style={{ maxHeight: '420px', objectPosition: 'top' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder if image not yet uploaded */}
                  <div
                    className="w-full items-center justify-center flex-col gap-2 py-16 bg-slate-50"
                    style={{ display: 'none' }}
                  >
                    <FileText className="w-10 h-10" style={{ color: '#CBD5E1' }} />
                    <p className="text-xs font-semibold" style={{ color: '#94A3B8' }}>Flyer image not yet uploaded</p>
                    <p className="text-xs" style={{ color: '#CBD5E1' }}>Place file at:<br/>/resources/images/journalist-training-flyer.jpg</p>
                  </div>
                  {/* Hover overlay with download prompt */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(19,37,82,0.6)' }}>
                    <a
                      href="/resources/images/journalist-training-flyer.jpg"
                      download="Journalist-Training-2025-Flyer.jpg"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-white"
                      style={{ backgroundColor: '#8E3400' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-4 h-4" />
                      Download Flyer
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <a
                    href="/resources/images/journalist-training-flyer.jpg"
                    download="Journalist-Training-2025-Flyer.jpg"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#8E3400' }}
                  >
                    <Download className="w-4 h-4" />
                    Download Flyer
                  </a>
                </div>
              </div>

              {/* Download PDF */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFF7ED', border: '2px solid #FED7AA' }}>
                <h3 className="text-base font-black mb-3" style={{ color: '#92400E' }}>Programme Document</h3>
                <p className="text-xs mb-4" style={{ color: '#78350F' }}>Download the full call for participation PDF for detailed information.</p>
                <a
                  href="/resources/pdfs/Journalist-Training-2025.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#8E3400' }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF Version
                </a>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: '#E5E7EB' }}>
                <h3 className="text-base font-black mb-3" style={{ color: '#132552' }}>Questions?</h3>
                <p className="text-xs mb-3" style={{ color: '#6B7280' }}>For enquiries about this training programme, please contact us.</p>
                <a
                  href="mailto:info@gogmi.org.gh"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#132552' }}
                >
                  info@gogmi.org.gh
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16" style={{ backgroundColor: '#132552' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Interested in Future Editions?</h2>
          <p className="text-white/80 mb-8 text-lg">
            This training has concluded, but GoGMI regularly organises capacity building programmes for maritime professionals. Stay connected for upcoming opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/capacity-building"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 text-white border-2 border-white/30 hover:bg-white/10"
            >
              View All Programmes
            </a>
            <a
              href="mailto:info@gogmi.org.gh"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105"
              style={{ backgroundColor: '#8E3400', color: 'white' }}
            >
              Contact GoGMI
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default JournalistTraining;
