import React, { useEffect } from 'react';
import { ArrowRight, MapPin, Clock, Users, Globe } from 'lucide-react';

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const partners = [
  {
    name: 'DOTCAN Institute',
    description:
      'DOTCAN is a grassroots initiative stimulated by the Sustainable Blue Economy Conference held in Nairobi, Kenya in November 2018. The initiative builds on commitments made by Canada at that conference and will be a concrete implementation of Canada\'s Ocean Strategy, based on principles of sustainable development, integrated management and the precautionary approach.',
    country: 'Canada',
    logo: '/DOTCANLOGO.png',
  },
  {
    name: 'Gulf of Guinea Maritime Institute (GoGMI)',
    description:
      'Established in Ghana, GoGMI is a local non-profit research organization constituting a think-tank for maritime strategic thinkers, practitioners and allies to interact, share ideas and research into strategic maritime affairs affecting the Gulf of Guinea Region.',
    country: 'Ghana',
    logo: '/GoGMI_PNG.png',
  },
  {
    name: 'Biosfera 1',
    description:
      'Based in Mindelo, São Vicente Island, Biosfera 1 is a local non-governmental organization whose mission is to promote the conservation of species of fauna and flora, the rehabilitation of marine and coastal ecosystems, as well as environmental awareness and education.',
    country: 'Cabo Verde',
    logo: '/biosfera.jpg',
  },
  {
    name: 'Sustainable Ocean Applied Research (SOAR)',
    description:
      'In Nova Scotia, Canada, SOAR is a local not-for-profit organization providing services and infrastructure to assist researchers and technology developers with access to the coastal ocean, advancing research needed for sustainable industry development.',
    country: 'Canada',
    logo: '/soar.jpg',
  },
  {
    name: 'Initiative For Africa (IFA)',
    description:
      'IFA engages change agents, entrepreneurs, decision-makers and citizens to create bridges of opportunity on the African continent. Through coaching, inspiration, networking and pre-incubation programs, IFA has already impacted more than 2,500 young Africans.',
    country: 'Pan-Africa',
    logo: '/ifa.jpg',
  },
  {
    name: "Canada's Ocean Supercluster",
    description:
      "Canada's Ocean Supercluster (OSP) inspires, initiates and invests to make Canada the best place in the world to start and grow an ocean tech business. As a co-funded, pan-Atlantic collaboration, the OSP complements existing industry accelerators and incubators across Canada's world-class innovation ecosystem.",
    country: 'Canada',
    logo: '/osp.jpg',
  },
];

const streams = [
  {
    title: 'Stream 1: Ocean Technology (OT)',
    highlights: [
      'Introduction to Ocean Technology',
      'Ocean Sensors',
      'Sustainable Aquaculture Farming',
      'Biological Data Collection for Monitoring and Conservation',
      'Coding and Data Management',
    ],
  },
  {
    title: 'Stream 2: Maritime Safety & Risk Management (MSRM)',
    highlights: [
      'Maritime Safety and Security',
      'Maritime Domain Awareness',
      'Maritime Operations and Management',
      'Safety and Risk Management',
    ],
  },
  {
    title: 'Shared Leadership & Entrepreneurship (L&E)',
    highlights: [
      'Introduction to Business & Entrepreneurship in the Blue Economy',
      'Market Analysis and Opportunity Identification',
      'Innovation and Product Development',
      'Commercialization and Marketing',
      'Funding and Investment Strategies',
    ],
  },
];

const WYTEC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: FONT }}>

      {/* ═══ HERO ═══ */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden" style={{ backgroundColor: '#132552' }}>
        <div className="absolute inset-0">
          <img
            src="/wytec1.jpg"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,37,82,0.95) 0%, rgba(26,51,108,0.9) 100%)' }} />
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{ backgroundColor: 'rgba(142,52,0,0.2)', borderColor: 'rgba(142,52,0,0.4)' }}
            >
              <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#8E3400' }}>
                Capacity Building · WYTEC Blue
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
              WYTEC Blue Training
            </h1>
            <p className="text-xl font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
              First Edition — Completed April 2024
            </p>
            <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Women & Youth Technical Capacity for the Blue Economy: Growing Technical Capacity amongst Women and Youth in Canada & West Africa for a Safe, Secure and Sustainable Blue Economy.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ QUICK FACTS ═══ */}
      <section className="relative -mt-12 z-20 px-6 pb-12">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ border: '1px solid #E5E7EB' }}>
            {[
              { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: '9 Weeks' },
              { icon: <MapPin className="w-5 h-5" />, label: 'Locations', value: 'Canada · Ghana · Cabo Verde' },
              { icon: <Globe className="w-5 h-5" />, label: 'Format', value: 'Hybrid (Online + In-person hubs)' },
              { icon: <Users className="w-5 h-5" />, label: 'Delivery', value: 'Jan – March 2024' },
            ].map((fact, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: 'rgba(19,37,82,0.08)', color: '#132552' }}>
                  {fact.icon}
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: '#6B7280' }}>{fact.label}</p>
                <p className="text-sm font-bold" style={{ color: '#132552' }}>{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FLYER BANNER ═══ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <img
              src="/Background.jpg"
              alt="WYTEC Blue 2024 Flyer"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* ═══ PROJECT DESCRIPTION ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>About the Project</span>
              <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#132552', letterSpacing: '-0.02em' }}>
                Project Description
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                <p>
                  This project is directly relevant to the commitments made by the Government of Canada at the Nairobi Sustainable Blue Economy Conference (SBEC) co-sponsored on November 26th–28th, 2018. Canada's contribution to the United Nations Decade of Ocean Science for Sustainable Development (2021–2030) was announced in conjunction with those commitments.
                </p>
                <p>
                  The WYTEC Blue project developed two virtually delivered, survey-level courses taught by Canadian and West African subject matter experts from academic, business and non-governmental sectors — one on Ocean Technology, the other on Maritime Safety and Risk Management — with shared modules on business development, entrepreneurship, and the skills needed to thrive across public, private and NGO sectors.
                </p>
                <p>
                  Courses were taught at selected teaching hubs in Nova Scotia (Canada), São Vicente (Cabo Verde) and Accra (Ghana). This 3-year project supported course design, development, and an initial offering informed by a gap analysis, establishing instructional teams and partnering with institutions in West Africa and Nova Scotia.
                </p>
                <p>
                  The courses are envisioned as forming the foundation for a subsequent, larger-scale training program, including Masters-level program(s) taught at West African Universities.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              <img
                src="/wytec2.jpg"
                alt="WYTEC Blue Training"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIGNIFICANCE & FUNDING ═══ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>Recognition</span>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              Significance & Funding
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">UN Decade Endorsement</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                WYTEC Blue (UN2021-002) received formal endorsement by the Executive Secretary of the Intergovernmental Oceanographic Commission of UNESCO (IOC) as a project forming part of the UN Decade of Ocean Science for Sustainable Development 2021–2030. This recognition confirms the project's role in catalyzing transformative ocean science solutions for sustainable development.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="bg-white rounded-xl p-3 inline-block mb-4">
                <img src="/canadalogo.jpg" alt="Fisheries and Oceans Canada" className="h-10 object-contain" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">DFO Funding Support</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                WYTEC Blue will strengthen and connect the emerging capacity of a small island developing state (Cabo Verde) and partner institutions in West African nations with Canadian multi-sectoral expertise in ocean technology, maritime security and business development. This project is partially supported by a financial contribution from Fisheries and Oceans Canada (DFO).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRAINING COMPONENTS ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>Curriculum</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.02em' }}>
              2024 Training Components
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Delivered January to March 2024 across three hub locations simultaneously via online platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {streams.map((stream, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border-l-4"
                style={{ backgroundColor: '#F9FAFB', borderColor: i === 2 ? '#8E3400' : '#132552' }}
              >
                <h3 className="text-base font-bold mb-4" style={{ color: '#132552' }}>{stream.title}</h3>
                <ul className="space-y-2">
                  {stream.highlights.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#4B5563' }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTNERS ═══ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>Collaboration</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.02em' }}>
              Project Partners
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              WYTEC Blue is powered by a multilateral, multisectoral coalition of organisations across Canada and West Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {partners.map((partner, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-20 h-14 flex-shrink-0 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-2">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold leading-tight" style={{ color: '#132552' }}>{partner.name}</h3>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'rgba(19,37,82,0.08)', color: '#132552' }}
                      >
                        {partner.country}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUSTAINABILITY INITIATIVE ═══ */}
      {/* ═══ PHOTO GALLERY ═══ */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>In Pictures</span>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              Programme Highlights
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['/wytec1.jpg', '/wytec2.jpg', '/wytec3.jpg'].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                <img src={src} alt={`WYTEC Blue 2024 highlight ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: '#8E3400' }}>Inaugural Edition</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#132552', letterSpacing: '-0.02em' }}>
              Sustainability Initiative
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="p-8 md:p-10" style={{ backgroundColor: '#132552' }}>
              <h3 className="text-xl font-bold text-white mb-3">All-Atlantic Ocean Research & Innovation Alliance (AAORIA) Forum 2024</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Fisheries and Oceans Canada (DFO), the European Commission, and the OKEANO CSA hosted the 2024 annual AAORIA Forum from October 8–10, 2024, at the Canadian Museum of Nature in Ottawa, Canada. With financial contributions from DFO and MEOPAR, DOTCAN sponsored four Inspiring Learners of the inaugural WYTEC Blue training from Ghana, Cabo Verde and Nova Scotia to attend this major international event.
              </p>
            </div>
            <div className="p-8 md:p-10 bg-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-base font-bold mb-3" style={{ color: '#132552' }}>Early Career Ocean Professionals (ECOPs)</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                    The WYTEC Blue ECOPs traveled to Canada and participated in the Intergenerational Dialogue — a central component of the Forum aimed at facilitating exchange between ECOPs and senior ocean professionals and policymakers. Over 30 ECOPs from across the Atlantic worked in groups to brainstorm and co-design ideas for collaborative action towards All-Atlantic priority areas.
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-bold mb-3" style={{ color: '#132552' }}>Impact & Connections</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                    Attendance was the first opportunity to visit Canada for the three West African trainees, and the first opportunity for international travel for one of them. These personal connections across national boundaries are essential for professional and global perspective development, collaboration, innovation and networking — building lasting trans-Atlantic connections.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA', borderLeft: '4px solid #8E3400' }}>
                <p className="text-sm italic leading-relaxed" style={{ color: '#4B5563' }}>
                  "These proposals were formalized in six policy briefs delivered to the attention of the AAORIA High Level Board. The 2024 Forum highlighted opportunities for collaborative science including coordinating efforts on ocean observation and increasing our understanding of the relationship between ocean and climate to support coastal resilience."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WYTEC;
