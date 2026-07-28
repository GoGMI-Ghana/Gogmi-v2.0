import React, { useState } from 'react';
import { ExternalLink, Building2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const DESCRIPTION_TRUNCATE_LENGTH = 140;

const PartnerCard = ({ partner }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = partner.description && partner.description.length > DESCRIPTION_TRUNCATE_LENGTH;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 relative flex flex-col">
      {/* Category Badge */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs"
              style={{ backgroundColor: partner.category === 'Sponsorship' ? '#132552' : '#8E3400', color: 'white', fontWeight: 600 }}>
          {partner.category}
        </span>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center h-24 mb-5">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-lg"
               style={{ backgroundColor: '#F5F7FA' }}>
            <Building2 className="w-8 h-8" style={{ color: '#132552', opacity: 0.4 }} />
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-center text-base font-bold mb-2"
          style={{ color: '#132552', fontWeight: 700 }}>
        {partner.name}
      </h3>

      {/* Project */}
      {partner.project && (
        <p className="text-center text-sm mb-4"
           style={{ color: '#8E3400', fontWeight: 600 }}>
          {partner.project}
        </p>
      )}

      {/* Details */}
      <div className="pt-4 border-t border-gray-200 mt-auto">
        {partner.description && (
          <>
            <p
              className={`text-sm leading-relaxed ${expanded ? 'mb-2' : 'mb-1 line-clamp-3'}`}
              style={{ color: '#4B5563', fontWeight: 400 }}
            >
              {partner.description}
            </p>
            {isLong && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1 text-xs mb-3 hover:underline"
                style={{ color: '#8E3400', fontWeight: 600 }}
              >
                {expanded ? 'Read less' : 'Read more'}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </>
        )}

        <div className="flex items-center justify-between text-sm">
          <span style={{ color: '#4B5563', fontWeight: 400 }}>
            {partner.since || ''}
          </span>
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#8E3400] transition-colors ml-auto"
              style={{ color: '#132552', fontWeight: 600 }}
            >
              <span>Visit</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Partners = () => {
  const [selectedCategory, setSelectedCategory] = useState('Partnership');

  const partners = [
    {
      id: 1,
      name: 'NIMASA',
      logo: '/nimasa.jpg',
      category: 'Partnership',
      project: 'GOG-MCF/SHADE',
      description: 'GOG-MCF/SHADE (Gulf of Guinea Maritime Collaboration Forum and Shared Awareness and De-confliction) is a collaborative platform launched in July 2021. Co-chaired by Nigeria and the Inter-Regional Coordination Centre (ICC) Yaoundé, it unites regional navies, international governments, and shipping industries to combat piracy and armed robbery at sea.',
      since: '2021-2021',
      website: 'https://nimasa.gov.ng/',
    },
    {
      id: 2,
      name: 'THE HEYL GROUP',
      logo: null,
      category: 'Partnership',
      project: 'Air Maritime Working Group',
      description: 'The Gulf of Guinea Regional Integrated Air Strategy provides a regional framework for developing and integrating airpower capabilities across West and Central Africa to strengthen collective security. It outlines a shared vision, strategic objectives, and guiding principles for enhancing intelligence, surveillance, rapid response, humanitarian assistance, and maritime security through coordinated air operations among member states.',
      since: '',
      website: '',
    },
    {
      id: 3,
      name: 'ATLANTIC CENTRE',
      logo: '/AtlanticCenter.webp',
      category: 'Partnership',
      project: 'Research Initiatives',
      description: "The Gulf of Guinea Maritime Institute (GoGMI) collaborates with the Atlantic Centre on research initiatives that advance maritime security, defence cooperation, and governance across the Atlantic basin. This partnership brings together military and civilian expertise to produce policy-relevant research, strategic analyses, and knowledge products that strengthen regional security, promote interoperability, and support sustainable Blue Economy development. Through joint research programmes, GoGMI contributes its expertise in maritime governance and the Gulf of Guinea while supporting the Atlantic Centre's mission of enhancing defence capacity-building and multilateral cooperation among Atlantic partner states.",
      since: '',
      website: 'https://www.defesa.gov.pt/pt/pdefesa/ac/about',
    },
    {
      id: 4,
      name: 'WISTA GHANA',
      logo: '/wista ghana.jpg',
      category: 'Partnership',
      project: 'BCBE 2021',
      description: 'The Blue Careers and Business Expo 2021 was the maiden conference held on November 09 and 10 2021 at the KAIPTC at Teshie, hosted by Gulf of Guinea Maritime Institute (GoGMI) in collaboration with WISTA Ghana. The theme for this conference was "building a robust blue economy, leaving no one behind". Over 200 people participated in the Conference, including high profile personalities; Her Excellency Katai Csaba, High Commissioner of Canada to Ghana, Vice Admiral Issah Yakubu, Past Chief of Naval Staff, Ghana Navy, Hon. Kathleen Quartey Ayensu, AU Commission, Special Rapporteur for Piracy and Maritime Security, and Mr. Tukur Mohammed, Programme Officer, Maritime Security and Safety, Economic Community of West Africa States, ECOWAS, who joined the meeting virtually.',
      since: '',
      website: 'https://wistainternational.com/association/wista-ghana/',
    },
    {
      id: 5,
      name: 'EYE ON PORT',
      logo: '/eyeonport.jpg',
      category: 'Partnership',
      project: '',
      description: '',
      since: '',
      website: 'https://www.youtube.com/c/EyeOnPort',
    },
    {
      id: 6,
      name: 'MARITIME DIGEST',
      logo: '/maritimedigest.webp',
      category: 'Partnership',
      project: '',
      description: '',
      since: '',
      website: 'https://maritimedigestgh.com/',
    },
    {
      id: 7,
      name: 'CANADIAN EMBASSY',
      logo: '/canadalogo.jpg',
      category: 'Partnership',
      project: '',
      description: '',
      since: '',
      website: 'https://www.international.gc.ca/country-pays/ghana/accra.aspx?lang=eng',
    },
    {
      id: 8,
      name: 'CONSHIP',
      logo: '/Conship.jpg',
      category: 'Partnership',
      project: '',
      description: '',
      since: '',
      website: 'https://conship.com.gh/',
    },
    {
      id: 9,
      name: 'ECOP',
      logo: '/ecop1.jpg',
      category: 'Sponsorship',
      project: 'ECOP Training 1 & 2',
      description: 'Following the success of the Blue Career and Business Expo — organized to expose Ghanaian youth and early career ocean professionals to the blue economy, its challenges, and opportunities for sustainable development in 2021 — a training program on the blue economy was developed for Early Career Ocean Professionals (ECOP), with funding support from UNESCO, to sustain the interest generated among participants of the event.',
      since: 'Mar-22',
      website: 'https://www.ecopdecade.org/ghana/',
    },
    {
      id: 10,
      name: 'NORAD',
      logo: '/norad.jpg',
      category: 'Sponsorship',
      project: '',
      description: '',
      since: 'Mar-22',
      website: 'https://www.norad.no/en/',
    },
    {
      id: 11,
      name: 'UNESCO',
      logo: '/UNESCO_logo_hor_blue_transparent.png',
      category: 'Sponsorship',
      project: 'ECOP Training 2',
      description: 'Following the success of the Blue Career and Business Expo — organized to expose Ghanaian youth and early career ocean professionals to the blue economy, its challenges, and opportunities for sustainable development in 2021 — a training program on the blue economy was developed for Early Career Ocean Professionals (ECOP), with funding support from UNESCO, to sustain the interest generated among participants of the event.',
      since: '',
      website: 'https://www.unesco.org/en',
    },
    {
      id: 12,
      name: 'EXPERTISE FRANCE',
      logo: '/expertise-france.jpg',
      category: 'Partnership',
      project: 'ENMAR',
      description: 'Enhanced Maritime Action in the Gulf of Guinea (ENMAR) is a European Union-funded initiative implemented by Expertise France to strengthen maritime security, safety, and governance in the Gulf of Guinea through enhanced regional cooperation and capacity development. As a research and implementation partner, the Gulf of Guinea Maritime Institute (GoGMI) collaborated with Expertise France to produce comprehensive maritime country briefs for Gulf of Guinea states, providing strategic analyses of national maritime governance, security challenges, institutional frameworks, and emerging Blue Economy opportunities. In addition, GoGMI designed and delivered specialised training for media practitioners, equipping journalists with the knowledge and skills needed to report accurately on maritime security, governance, and Blue Economy issues, thereby promoting informed public discourse and greater awareness of the maritime domain across the region.',
      since: '2025 - 2026',
      website: 'https://www.expertisefrance.fr/en',
    },
    {
      id: 13,
      name: 'GREAT MINDS EVENT MANAGEMENT',
      logo: '/GM-logo.webp',
      category: 'Partnership',
      project: 'IDEC & IMDEC',
      description: '',
      since: '',
      website: 'https://www.gmevents.ae/',
    },
    {
      id: 14,
      name: 'DOTCAN',
      logo: '/DOTCANLOGO.png',
      category: 'Partnership',
      project: 'World Oceans Day, Ocean Career Fair, WYTEC Blue I & II',
      description: '',
      since: '',
      website: 'https://dotcan.institute/',
    },
    {
      id: 15,
      name: 'MARITIMAFRICA',
      logo: '/Maritimafrica.jpg',
      category: 'Partnership',
      project: 'Blue Mentorship',
      description: '',
      since: '',
      website: 'https://maritimafrica.com/en/',
    },
    {
      id: 16,
      name: 'KAIPTC',
      logo: '/kaiptc.jpg',
      category: 'Partnership',
      project: 'IMSWG',
      description: '',
      since: '',
      website: 'https://www.kaiptc.org/',
    },
  ];

  const categories = ['Partnership', 'Sponsorship'];

  const filteredPartners = partners.filter(partner => partner.category === selectedCategory);

  return (
    <div className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&fit=crop" 
            alt="Partners"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#132552]/85 to-[#132552]/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 600 }}>
            Our Network
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" 
              style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            Our Partners
          </h1>
          <div className="w-20 h-1.5 rounded-full mx-auto mb-6" style={{ backgroundColor: '#8E3400' }}></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
            Working together with leading organizations to advance maritime excellence across the Gulf Of Guinea
          </p>
        </div>
      </section>

      {/* About Partnerships Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-center"
                style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Strategic Partnerships for Maritime Excellence
            </h2>
            <div className="w-20 h-1 rounded-full mx-auto mb-8" style={{ backgroundColor: '#8E3400' }}></div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
            <p>
              GoGMI's partnerships represent a diverse network of international organizations, regional bodies, government agencies, academic institutions, and private sector entities committed to advancing maritime security and sustainable blue economy development in the Gulf of Guinea.
            </p>

            <p>
              Through strategic collaborations, we leverage collective expertise, resources, and networks to address complex maritime challenges, build regional capacity, and promote evidence-based policymaking.
            </p>

            <p>
              Each partnership is built on shared values of transparency, mutual respect, and commitment to advancing the blue economy.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Statistics */}
      <section className="py-16" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
              {[
                { number: '15+', label: 'Global Partners' },
                { number: '10+', label: 'Countries' },
                // { number: '100+', label: 'Joint Projects' },
                { number: '10 Years', label: 'Collaboration' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-100">
                  <div className="text-4xl mb-2" style={{ color: '#132552', fontWeight: 900 }}>
                    {stat.number}
                  </div>
                  <p className="text-sm" style={{ color: '#4B5563', fontWeight: 600 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#132552', fontWeight: 700 }}>
              Filter by Category
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  selectedCategory === category
                    ? 'shadow-lg'
                    : 'border-2 hover:border-[#8E3400]'
                }`}
                style={{ 
                  backgroundColor: selectedCategory === category ? '#8E3400' : 'white',
                  color: selectedCategory === category ? 'white' : '#132552',
                  borderColor: selectedCategory === category ? '#8E3400' : '#E5E7EB',
                  fontWeight: 600 
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid - All Content Visible */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Count Display */}
          <div className="text-center mb-10">
            <p className="text-lg" style={{ color: '#4B5563', fontWeight: 400 }}>
              Showing <span style={{ color: '#8E3400', fontWeight: 700 }}>{filteredPartners.length}</span> partners in <span style={{ color: '#8E3400', fontWeight: 700 }}>{selectedCategory}</span>
            </p>
          </div>

          {/* Grid - 3 columns for better content display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      
     {/* Become a Partner CTA */}
<section className="py-20 bg-white">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 600 }}>
      Join Our Network
    </span>
    <h2 className="text-4xl font-black mb-6"
        style={{ color: '#132552', fontWeight: 900, letterSpacing: '-0.02em' }}>
      Become a Partner
    </h2>
    <p className="text-xl mb-10 leading-relaxed" style={{ color: '#4B5563', fontWeight: 400 }}>
      Join our network of leading organizations driving maritime excellence in the Gulf of Guinea.
    </p>
    <Link
      to="/contact"
      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl transition-all shadow-lg hover:scale-105"
      style={{ backgroundColor: '#8E3400', color: 'white', fontWeight: 700 }}
    >
      <span>Partner With Us</span>
      <ExternalLink className="w-5 h-5" />
    </Link>
  </div>
</section>    </div>
  );
};

export default Partners;
