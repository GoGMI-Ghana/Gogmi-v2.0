import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Globe, Users, CheckCircle, BookOpen } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const modules = [
  {
    number: '01',
    title: 'Maritime Security Strategy Theory',
    description: 'Foundational frameworks and theoretical underpinnings of maritime security strategy in the Gulf of Guinea, drawing on international conventions, regional treaties, and best practice from global maritime security operations.',
  },
  {
    number: '02',
    title: 'Assessing Maritime Security Challenges & Opportunities I',
    description: 'In-depth analysis of the primary maritime security threats facing the Gulf of Guinea — including piracy, armed robbery at sea, illegal fishing, and narcotics trafficking — and the institutional responses deployed to address them.',
  },
  {
    number: '03',
    title: 'Assessing Maritime Security Challenges & Opportunities II',
    description: 'Advanced exploration of emerging and evolving maritime security challenges, assessing gaps in current frameworks and identifying strategic opportunities for improved regional cooperation and intervention.',
  },
  {
    number: '04',
    title: 'Interagency Coordination and Stakeholder Analysis I',
    description: 'Theory and practice of interagency coordination in maritime security contexts — examining how navies, coast guards, port authorities, customs agencies, and civilian stakeholders collaborate to achieve shared security objectives.',
  },
  {
    number: '05',
    title: 'Interagency Coordination and Stakeholder Analysis II',
    description: 'Applied stakeholder mapping and coordination planning exercises. Participants develop practical frameworks for managing complex multi-agency relationships and designing effective coordination mechanisms.',
  },
];

const participants = [
  {
    name: 'Lt Cdr Emilio Okyere-Dadzie',
    title: 'Deputy Director Naval Research & Development, Ghana Navy',
    bio: 'Lieutenant Commander Emilio Okyere-Dadzie was commissioned into the Executive Branch of the Ghana Navy in 2008. He holds a BSc in Nautical Science from Regional Maritime University, an MBA in Port and Shipping Management, an MBA in Oil and Gas Management (both from the National Institute of Business Management, India), and an MSc in Defence and International Politics from GIMPA. He is a Navigation Specialist, a Class 3 Deck Officer, and a Dynamic Positioning Operator. He currently serves as Deputy Director Naval Research & Development and Command Operations Officer for the Riverine Command. He is an Associate Fellow of the Nautical Institute and the Royal Institute of Navigation, United Kingdom.',
    image: '/massdi-participant1.jpg',
  },
  {
    name: 'Lt Cdr Kwame Yelbuor',
    title: 'Commanding Officer, Ghana Navy Ship EHWOR',
    bio: 'Lieutenant Commander Kwame Yelbuor of the Ghana Navy holds a Bachelor of Arts Degree in Geography and Resource Development from the University of Ghana, Legon. Commissioned into the Executive Branch of the Ghana Navy on 30 August 2013, he has undergone Initial Naval Officer Training in Dartmouth, United Kingdom (2015). He has served in various capacities onboard Ghana Navy Ships as Executive Officer, Watch Keeping Officer, and Acting Navigation Officer. Ashore, he served as Acting Assistant Director Naval Intelligence (2019–2020) and Acting Operations Officer for the ECOWAS Multinational Maritime Coordination Centre at Osu Castle (2020–2022). He is currently the Commanding Officer for Ghana Navy Ship EHWOR.',
    image: '/massdi-participant2.jpg',
  },
  {
    name: 'Maximus Ashitey',
    title: 'General Manager, Soko Aerial Robotics Limited',
    bio: 'Maximus Ashitey is the General Manager of Soko Aerial Robotics Limited, Deputy Director of the Unmanned Aerial Systems Research Lab (UASRL), and Deputy Director for the Soko Aerial and Signal Training School Centre for Unmanned Aerial Vehicle Research, Development and Education. He holds a BA in Political Science from the University of Ghana, Legon. Combining his passion for drone technology with a solid foundation in political science, he brings a unique perspective to the world of aerial operations — proficient in capturing high-quality aerial imagery and conducting precise surveys through advanced drone technology.',
    image: '/massdi-participant3.jpg',
  },
  {
    name: 'Participant Name',
    title: 'Title / Organisation',
    bio: 'Bio coming soon.',
    image: '/massdi-participant4.jpg',
  },
];

const quickFacts = [
  { icon: Clock, label: 'Duration', value: '2 Months' },
  { icon: Globe, label: 'Format', value: 'Virtual / Online' },
  { icon: Users, label: 'Level', value: 'All Levels' },
  { icon: Calendar, label: 'Intake', value: '6 Oct – 30 Nov 2025' },
  { icon: BookOpen, label: 'Modules', value: '5 Core Modules' },
  { icon: CheckCircle, label: 'Status', value: 'Completed' },
];

const MASSDI = () => {
  return (
    <div className="w-full min-h-screen" style={{ fontFamily: FONT, backgroundColor: '#F9FAFB' }}>

      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/maritmegovvvv.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.97) 0%, rgba(19,37,82,0.85) 100%)' }} />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <Link
            to="/services/capacitybuilding"
            className="inline-flex items-center gap-2 text-sm mb-10 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'white' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Capacity Building
          </Link>

          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
            style={{ backgroundColor: 'rgba(142,52,0,0.2)', borderColor: 'rgba(142,52,0,0.4)' }}
          >
            <BookOpen className="w-4 h-4" style={{ color: '#8E3400' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
              Capacity Building · Training Course
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            MaSSDI Training Course
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}>
            Maritime Security Strategy Development Initiative
          </p>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl" style={{ color: 'rgba(255,255,255,0.85)' }}>
            A specialised training programme equipping maritime security professionals, naval officers,
            and policymakers with the strategic tools, analytical frameworks, and interagency coordination
            skills needed to address complex security challenges in the Gulf of Guinea.
          </p>
        </div>
      </section>

      {/* ═══ QUICK FACTS ═══ */}
      <section className="py-0">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 -mt-8 relative z-10">
            {quickFacts.map((fact, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center">
                <fact.icon className="w-5 h-5 mx-auto mb-2" style={{ color: '#8E3400' }} />
                <div className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#9CA3AF' }}>{fact.label}</div>
                <div className="text-sm font-bold" style={{ color: '#132552' }}>{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-20 md:py-28 bg-white mt-8">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-4" style={{ color: '#8E3400' }}>
                About the Programme
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: '#132552', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Building Strategic Maritime Security Capacity
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  The Maritime Security Strategy Development Initiative (MaSSDI) Training Course is a GoGMI-led
                  programme designed to develop the strategic thinking and operational capacity of maritime
                  security practitioners across the Gulf of Guinea region.
                </p>
                <p>
                  The course brings together naval officers, coast guard personnel, maritime policymakers,
                  and security analysts for an intensive two-month online training covering the theoretical
                  foundations and practical tools required for effective maritime security strategy development.
                </p>
                <p>
                  Participants engage with expert instructors from Ghana's naval and security sectors, gaining
                  hands-on experience in threat assessment, stakeholder mapping, and interagency coordination
                  planning — skills critical for addressing the complex and evolving security landscape of
                  West Africa's maritime domain.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl p-8" style={{ backgroundColor: '#132552' }}>
                <h3 className="text-xl font-bold text-white mb-6">What You Will Learn</h3>
                <ul className="space-y-4">
                  {[
                    'Theoretical frameworks underpinning maritime security strategy',
                    'Analysis of security threats and opportunities in the Gulf of Guinea',
                    'Regional and international maritime governance instruments',
                    'Practical interagency coordination and stakeholder management',
                    'Strategy development and operational planning skills',
                    'Emerging technology applications in maritime security',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8E3400' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-8 border-2 border-gray-100">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#132552' }}>Who Should Attend</h3>
                <ul className="space-y-3">
                  {[
                    'Naval and coast guard officers',
                    'Maritime security policy professionals',
                    'Port and harbour security managers',
                    'Security researchers and analysts',
                    'Government officials in maritime-related ministries',
                    'Private sector maritime security practitioners',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-base" style={{ color: '#4B5563' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MODULES ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Curriculum
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Course Modules
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Five core modules delivered over eight weeks through a structured online learning environment.
            </p>
          </div>

          <div className="space-y-5">
            {modules.map((mod) => (
              <div key={mod.number} className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 flex gap-8 items-start">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ backgroundColor: '#132552', color: 'white' }}
                >
                  {mod.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#132552' }}>{mod.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{mod.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTICIPANTS ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>
              Course Participants
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.01em' }}>
              Meet the Participants
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Naval officers, maritime security professionals, and practitioners who completed the MaSSDI programme.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {participants.map((participant, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className="h-64 relative" style={{ backgroundColor: '#F1F5F9' }}>
                  {participant.image ? (
                    <img
                      src={participant.image}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 items-center justify-center"
                    style={{ display: participant.image ? 'none' : 'flex' }}
                  >
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black"
                      style={{ backgroundColor: '#132552', color: 'white' }}
                    >
                      {participant.name.split(' ').pop()[0]}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: '#8E3400' }} />
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#132552' }}>{participant.name}</h3>
                  <p className="text-xs font-semibold mb-4 uppercase tracking-wide" style={{ color: '#8E3400' }}>{participant.title}</p>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#4B5563' }}>{participant.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Interested in the<br />Next MaSSDI Cohort?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Get in touch with GoGMI to express your interest in upcoming MaSSDI intakes or to request
            more information about the programme.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-xl"
            style={{ backgroundColor: '#8E3400', color: 'white' }}
          >
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default MASSDI;
