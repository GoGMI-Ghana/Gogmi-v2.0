import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Search, X, ExternalLink, Lock, Play, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Button } from '../ui/Editorial';

const BTN_BASE = 'focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors';
const BTN_PRIMARY = `${BTN_BASE} bg-ink text-white hover:bg-ink-deep`;
const BTN_SECONDARY = `${BTN_BASE} border border-ink text-ink hover:bg-paper`;

// Modal shell: dialog role, Escape and backdrop close, focus moved in and restored on close.
const Dialog = ({ onClose, labelledBy, className = '', children }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      if (previous && previous.focus) previous.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-center overflow-y-auto bg-ink-deep/70 p-4 md:p-8"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby={labelledBy}
           className={`relative my-auto w-full rounded-[2px] bg-white font-body text-text ${className}`}>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="focus-ring absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-[2px] text-muted transition-colors hover:bg-paper hover:text-ink"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
};

// Cover image; documents are portrait, videos 16:9. A plain block stands in when the image is missing.
const Cover = ({ resource, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const isVideo = resource.fileType === 'VIDEO';
  const shape = isVideo ? 'aspect-video' : 'aspect-[3/4]';

  if (failed || !resource.thumbnail) {
    return (
      <div className={`${shape} flex w-full items-center justify-center rounded-[2px] border border-line bg-paper ${className}`} aria-hidden="true">
        <FileText className="h-8 w-8 text-muted" />
      </div>
    );
  }
  return (
    <img
      src={resource.thumbnail}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${shape} w-full rounded-[2px] border border-line bg-paper object-cover ${className}`}
    />
  );
};

const FilterChip = ({ active, onClick, children }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`focus-ring rounded-[2px] border px-3 py-1.5 text-sm font-semibold transition-colors ${
      active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-text hover:border-ink'
    }`}
  >
    {children}
  </button>
);

const Resources = () => {
  const { t } = useTranslation('resources');
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState('Strategic Documents');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewResource, setPreviewResource] = useState(null);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (location.hash === '#internal-reports') {
      setSelectedType('Internal Reports');

      const params = new URLSearchParams(location.search);
      const subcategory = params.get('subcategory');
      if (subcategory) {
        setSelectedSubcategory(subcategory);
      }

      setTimeout(() => {
        const element = document.getElementById('internal-reports');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('gogmi_token');
    const membership = localStorage.getItem('gogmi_membership');
    
    setIsAuthenticated(!!token);
    setIsMember(!!membership);
    setLoading(false);
  };

  // Check if resource requires membership
  const requiresMembership = (resource) => {
    return resource.type === 'Internal Reports';
  };

  const resourcesRaw = [
    // ===== STRATEGIC DOCUMENTS =====
    {
      id: 5,
      title: "AFRICA'S INTEGRATED MARITIME STRATEGY (2050 AIM STRATEGY)",
      description: "African Union's comprehensive framework for transforming maritime sectors into drivers of sustainable growth and regional integration.",
      fullDescription: "Africa's Integrated Maritime Strategy (2050 AIM Strategy) is the African Union's comprehensive long-term framework for transforming the continent's maritime sector into a driver of sustainable economic growth and regional integration. Developed through extensive consultation with African experts, member states, and international partners, this strategy provides a coordinated roadmap for protecting and harnessing Africa's vast maritime resources while addressing security threats, enhancing regional cooperation, and building the capacity needed to unlock the blue economy's full potential across the continent.",
      type: 'Strategic Documents',
      category: 'Policy',
      size: '2.0 MB',
      pages: 49,
      date: 'August 2024',
      downloads: 780,
      thumbnail: '/unionafricaine.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/Africa-Integrated-Maritime-Strategy.pdf',
      keyTopics: [
        'Establishment of Combined Exclusive Maritime Zone of Africa (CEMZA)',
        'Maritime security and safety enhancement through regional cooperation',
        'Sustainable fisheries management and blue economy development',
        'Maritime infrastructure development and trade competitiveness',
        'Capacity building and human resource development for maritime sectors'
      ]
    },
    {
      id: 6,
      title: 'ECOWAS INTEGRATED MARITIME STRATEGY (EIMS)',
      description: "The ECOWAS Integrated Maritime Strategy (2014) is a comprehensive regional framework addressing maritime security, governance, environmental protection, and economic development across West Africa's 2,868 nautical mile coastline.",
      fullDescription: "The ECOWAS Integrated Maritime Strategy (EIMS), adopted in August 2014, is a comprehensive policy framework designed to address maritime challenges and unlock economic opportunities across West Africa's maritime domain. The strategy covers 11 coastal ECOWAS member states with a combined 2,868 nautical mile coastline on the Atlantic Ocean, plus three landlocked countries connected through inland waterways. It establishes a vision for a prosperous, safe and peaceful maritime domain for all its peoples that will allow environmentally sustainable development and wealth creation based on efficient management and good governance.",
      type: 'Strategic Documents',
      category: 'Policy',
      size: '1.1 MB',
      pages: 62,
      date: 'January 2024',
      downloads: 1580,
      thumbnail: '/ecowas-Integated-cover.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/ECOWA- Integrated-Maritime-Strategy.pdf',
      keyTopics: [
        'Maritime Governance and Regulatory Framework',
        'Maritime Security and Safety',
        'Environmental Protection and Sustainability',
        'Maritime Economic Development',
        'Capacity Building and Maritime Awareness'
      ]
    },
    {
      id: 9,
      title: 'THE YAOUNDÉ FRAMEWORK',
      description: "The Yaoundé Framework (2013) is a multinational maritime security cooperation architecture for West and Central Africa that addresses 12 types of transnational organized maritime crimes including piracy, IUU fishing, oil theft, and trafficking.",
      fullDescription: "The Yaoundé Framework, established through the 2013 Yaoundé Code of Conduct and subsequent agreements, is a comprehensive multinational maritime security cooperation architecture for West and Central Africa. It creates an operational structure with the Interregional Coordination Centre (ICC) in Yaoundé, Cameroon, overseeing regional coordination centers and five maritime zones (A, D, E, F, G) that address 12 types of transnational organized maritime crimes across 25 participating nations from Angola to Cape Verde.",
      type: 'Strategic Documents',
      category: 'Security',
      size: '6.0 MB',
      pages: 4,
      date: 'January 2024',
      downloads: 1580,
      thumbnail: '/yaounde.jpg',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/The-Yaounde-Framework-A summary.pdf',
      keyTopics: [
        'Operational Structure and Zonal Coordination',
        'Comprehensive Crime Focus Beyond Piracy',
        'Legal and Regulatory Harmonization',
        'National-Level Implementation Requirements',
        'International Partnership and Capacity Building'
      ]
    },
    {
      id: 10,
      title: 'YAOUNDÉ CODE OF CONDUCT',
      description: "The Yaoundé Code of Conduct (2013) is a multilateral agreement signed by 25 West and Central African nations establishing a comprehensive framework to combat piracy, armed robbery at sea, and 10 other types of transnational maritime crimes.",
      fullDescription: "The Yaoundé Code of Conduct, signed in 2013, is a multilateral agreement among 25 West and Central African nations establishing a comprehensive framework to combat piracy, armed robbery at sea, IUU fishing, oil theft, human trafficking, maritime terrorism, and other transnational maritime crimes. It creates coordination mechanisms through national focal points, regional information-sharing centers, and commits signatories to cooperative enforcement measures including embarked officers programs and joint operations.",
      type: 'Strategic Documents',
      category: 'Security',
      size: '11.2 MB',
      pages: 15,
      date: 'January 2024',
      downloads: 1580,
      thumbnail: '/yaoundecode.conduct.jpg',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/Yaounde-Code-of-Conduct.pdf',
      keyTopics: [
        'Comprehensive Definition of Maritime Crimes',
        'National-Level Implementation Obligations',
        'Coordination and Information Sharing Architecture',
        'Embarked Officers and Cross-Border Operations',
        'Legal Framework for Interdiction and Prosecution'
      ]
    },

    // ===== ACADEMIC PAPERS =====
    {
      id: 2,
      title: "AFRICA'S BLUE ECONOMY: A POLICY HANDBOOk",
      description: "Africa's Blue world is made of vast lakes and rivers and an extensive ocean resource base. Thirty-eight of the fifty-four African States are coastal States.",
      fullDescription: 'This comprehensive policy handbook serves as a strategic guide for African nations to harness the economic potential of their ocean and coastal resources. It provides actionable frameworks for policymakers, government officials, and stakeholders to develop sustainable blue economy initiatives that balance economic growth with environmental conservation and social inclusion across the continent.',
      type: 'Academic Papers',
      category: 'Research',
      size: '6.9 MB',
      pages: 109,
      date: 'October 2024',
      downloads: 890,
      thumbnail: '/blueEconomyimage.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/Blue-Economy-Policy-Handbook.pdf',
      keyTopics: [
        'Policy and regulatory frameworks for blue economy development',
        'Sustainable fisheries and aquaculture management',
        'Marine conservation and biodiversity protection',
        'Coastal tourism and infrastructure development',
        'Regional cooperation and capacity building strategies'
      ]
    },
    {
      id: 7,
      title: 'DEEP SEABED MINING: A NOTE ON SOME POTENTIALS AND RISKS',
      description: "Examining the environmental and economic implications of deep-sea mining in the context of sustainable ocean management.",
      fullDescription: "Deep-sea mining is increasingly promoted as a solution to rising demand for minerals used in clean energy technologies. However, the document highlights that mining the ocean floor poses serious and potentially irreversible threats to fragile marine ecosystems. It emphasizes that disturbances from extraction could last for centuries and impact species we have barely begun to understand. The note urges prioritizing ocean protection amid the climate emergency and stresses the growing global movement to place environmental safeguarding above mining interests.",
      type: 'Academic Papers',
      category: 'Research',
      size: '2.3 MB',
      pages: 16,
      date: 'May 2024',
      downloads: 540,
      thumbnail: '/seabed.jpg',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/Deep-Sea-Mining-A-note-on-potentials-and-risks.pdf',
      keyTopics: [
        'Rising Demand for Minerals in the Clean Energy Transition',
        'Environmental Risks to Deep-Sea Ecosystems',
        'Long-Lasting Ecological Disturbance',
        'Global Calls for Ocean Protection',
        'International Pushback and Policy Action'
      ]
    },

    // ===== INTERNAL REPORTS =====
    {
      id: 11,
      title: 'AN EVALUATION OF THE YAOUNDÉ ARCHITECTURE',
      description: "Comprehensive assessment of the Yaoundé Code of Conduct implementation and effectiveness in addressing maritime security challenges.",
      fullDescription: "This evaluation provides a comprehensive assessment of the Yaoundé Architecture's implementation and effectiveness in addressing maritime security challenges across West and Central Africa. It examines the operational structure, coordination mechanisms, and impact of the framework in combating transnational maritime crimes while identifying gaps and recommendations for improvement.",
      type: 'Internal Reports',
      subcategory: 'Policy Briefs',
      category: 'Assessment',
      size: '0.7 MB',
      pages: 27,
      date: 'JULY 2022',
      downloads: 1580,
      thumbnail: '/yaounde.eval.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/An Evaluation of the Yaoundé Architecture.pdf',
      keyTopics: [
        'Comprehensive Definition of Maritime Crimes',
        'National-Level Implementation Obligations',
        'Coordination and Information Sharing Architecture',
        'Embarked Officers and Cross-Border Operations',
        'Legal Framework for Interdiction and Prosecution'
      ]
    },
    {
      id: 12,
      title: 'BRIEFING ON THE STATUS OF IMPLEMENTATION OF THE YAOUNDÉ CODE OF CONDUCT ARCHITECTURE',
      description: "A briefing summarizing expert discussions on the implementation progress, challenges, and recommendations for strengthening the Yaoundé Code of Conduct Architecture.",
      fullDescription: "This briefing outlines the outcomes of expert-level Virtual Discussion Group meetings held between January and April 2021 on the status of implementing the Yaoundé Code of Conduct in the Gulf of Guinea. Organized by GoGMI and supported by the IMO, the meetings brought together regional, international, academic, and industry stakeholders to assess progress, address implementation gaps, and recommend strategies to enhance maritime safety and security.",
      type: 'Internal Reports',
      subcategory: 'Policy Briefs',
      category: 'Assessment',
      size: '0.5 MB',
      pages: 4,
      date: 'MARCH 2021',
      downloads: 1580,
      thumbnail: '/briefing.yaounde.code.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/Briefing-Yaounde-Implementation.pdf',
      keyTopics: [
        'Strengthening the YCoC Implementation Architecture',
        'Enhanced Cooperation Between States and International Partners',
        'Inclusion of Key Regional Institutions',
        'The Role of Academia and Research Institutions',
        'Defining the Maritime Industry\'s Role'
      ]
    },
    {
      id: 13,
      title: 'DEVELOPING BLUE CAREERS TO FOSTER STRATEGIC DEVELOPMENT OF GULF OF GUINEA MARITIME ECONOMIES',
      description: "A report on developing blue careers to drive sustainable economic growth in the Gulf of Guinea by strengthening human capital and maritime skills.",
      fullDescription: "This document presents insights from the GoGMI–International Maritime Security Working Group online event held on 25th February 2021, focused on developing blue careers to support the strategic growth of Gulf of Guinea maritime economies. The discussions highlighted Africa's vast blue economy potential, the urgent need for skilled human capital, and the role of innovation, education, and partnerships in unlocking economic opportunities.",
      type: 'Internal Reports',
      subcategory: 'IMSWG Reports',
      category: 'Development',
      size: '0.7 MB',
      pages: 8,
      date: 'FEBRUARY 2021',
      downloads: 1580,
      thumbnail: '/blue-careers-dev.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/Developing-Blue-Careers-to-Foster-Strategic-Development-of-Gulf-of-Guinea-Maritime-Economies..pdf',
      keyTopics: [
        'Africa\'s Blue Economy Potential',
        'Importance of Human Capital and Skills Development',
        'Regional and International Partnerships',
        'National Efforts: Case Studies from Nigeria and Ghana',
        'Recommendations for Strengthening Blue Careers in Africa'
      ]
    },
    {
      id: 14,
      title: 'G7++FoGG PLENARY, ABIDJAN',
      description: "Detailed event report on the 2022 G7++ Friends of the Gulf of Guinea Plenary highlighting key discussions on maritime security and regional cooperation.",
      fullDescription: "This report captures the major presentations, discussions, and conclusions from the G7++FoGG Plenary held in Abidjan from 1–2 December 2022. As a multilateral platform supporting the Yaoundé Code of Conduct, the plenary brought together over 150 delegates, including government officials, naval leaders, civil society groups, private sector actors, and international partners.",
      type: 'Internal Reports',
      subcategory: 'Quarterly Highlights',
      category: 'Events',
      size: '1.0 MB',
      pages: 25,
      date: 'DECEMBER 2022',
      downloads: 1580,
      thumbnail: '/G7.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/G7-FOGG-Event-Report.pdf',
      keyTopics: [
        'Strengthening the Yaoundé Architecture at Its 10-Year Milestone',
        'Expanding the Role of Civil Society in Maritime Governance',
        'Women in Maritime Security and Crime Prevention',
        'Regional & International Collaboration',
        'Addressing Piracy, Oil Theft & Transnational Crime'
      ]
    },
    {
      id: 15,
      title: 'SEMINAR REPORT: INTERVENTION IN THE GULF OF GUINEA',
      description: "Comprehensive seminar report examining maritime security interventions and governance in the Gulf of Guinea region.",
      fullDescription: "On October 21, 2022, GoGMI and the Atlantic Centre co-hosted a virtual seminar bringing together over 40 global participants to examine interventionism and maritime security governance in the Gulf of Guinea. The seminar featured expert panelists exploring the effectiveness of major maritime security initiatives including the Yaoundé Architecture, YARIS information system, GoG-MCF SHADE, and multilateral exercises.",
      type: 'Internal Reports',
      subcategory: 'Maritime Governance',
      category: 'Analysis',
      size: '1.0 MB',
      pages: 10,
      date: 'OCTOBER 2022',
      downloads: 1580,
      thumbnail: '/atlanticcentre.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/Interventionism-in-the-Gulf-of-Guinea.pdf',
      keyTopics: [
        'Evolution of Maritime Security Threats in the Gulf of Guinea',
        'Major Maritime Security Interventions and Frameworks',
        'The Critical Role of YARIS in Information Sharing',
        'Challenges in Regional Coordination and Capacity Building',
        'Navigating Complex Actor Relations and Competing Interests'
      ]
    },
    {
      id: 16,
      title: 'STRENGTHENING COUNTER-PIRACY RESPONSES: THE GULF OF GUINEA MARITIME COLLABORATION FORUM-SHADE',
      description: "In-depth analysis of the GoG-MCF/SHADE initiative, a regionally-owned platform to harmonize counter-piracy efforts across the Gulf of Guinea.",
      fullDescription: "The GoG-MCF/SHADE initiative represents a groundbreaking approach to maritime security in the Gulf of Guinea, born from a Memorandum of Understanding between the Government of Nigeria and the Inter-regional Coordination Centre representing 21 countries. Operating through structured plenary sessions and three specialized Working Groups, SHADE creates a vital platform for navies, industry partners, and maritime stakeholders to coordinate counter-piracy responses.",
      type: 'Internal Reports',
      subcategory: 'Maritime Governance',
      category: 'Security',
      size: '1.0 MB',
      pages: 7,
      date: 'DECEMBER 2022',
      downloads: 1580,
      thumbnail: '/strenght.shade.png',
      fileType: 'PDF',
      downloadUrl: '/STRENGTHENING COUNTER-PIRACY RESPONSES (1).pdf',
      keyTopics: [
        'The Gulf of Guinea Piracy Crisis and Response',
        'SHADE\'s Operational Structure and Working Groups',
        'Evolution Through Five Plenary Sessions',
        'Practical Achievements and Innovations',
        'Strategic Recommendations for Sustainability'
      ]
    },
    {
      id: 17,
      title: 'UNDERSTANDING AND ADDRESSING THE DRIVERS BEHIND THE NEXUS OF BLUE CRIME',
      description: "Analysis of the interconnected nature of maritime crimes including drug trafficking, piracy, and terrorism across the Atlantic.",
      fullDescription: "This policy brief examines the complex drivers behind the nexus of blue crime, drugs, piracy, and terror prevalent across the Atlantic. It analyzes the root causes, interconnections, and strategic approaches needed to address these transnational maritime security threats comprehensively.",
      type: 'Internal Reports',
      subcategory: 'Policy Briefs',
      category: 'Security',
      size: '0.5 MB',
      pages: 11,
      date: 'DECEMBER 2022',
      downloads: 1580,
      thumbnail: '/blue-crime-nexus.png',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/ABI-HSWG-policy-brief-Yakubu-final.pdf',
      keyTopics: [
        'Root Causes of Maritime Crime',
        'Interconnections Between Drug Trafficking and Piracy',
        'Terror Networks and Maritime Operations',
        'Regional Security Cooperation',
        'Policy Recommendations for Intervention'
      ]
    },
    {
      id: 23,
      title: 'THE IMPLICATIONS OF THE BBNJ AGREEMENT FOR THE GULF OF GUINEA',
      description: "Report of the IMSWG high-level expert meeting on what the BBNJ Agreement, in force since January 2026, means for Gulf of Guinea states.",
      fullDescription: "On 16 September 2026, GoGMI convened a high-level expert meeting of the International Maritime Security Working Group (IMSWG) to examine what the BBNJ Agreement means for the Gulf of Guinea. Held under the Chatham House Rule, the session covered the Agreement's four core elements: marine genetic resources and benefit sharing, area-based management tools including marine protected areas, environmental impact assessments, and capacity building and marine technology transfer. The report also addresses the institutional and jurisdictional questions facing the region and sets out six policy recommendations, from ratification to the designation of a Particularly Sensitive Sea Area in the Gulf of Guinea.",
      type: 'Internal Reports',
      subcategory: 'IMSWG Reports',
      category: 'IMSWG',
      size: '1.1 MB',
      pages: 11,
      date: 'September 2026',
      downloads: 0,
      thumbnail: '/IMSWG-BBNJ-newdate.jpeg',
      fileType: 'PDF',
      downloadUrl: '/resources/pdfs/IMSWG-BBNJ-Publication-2026.pdf',
      keyTopics: [
        'Understanding the BBNJ Agreement',
        'Area-Based Management Tools and a Regional Marine Protected Area',
        'Marine Genetic Resources and the Global Commons',
        'Capacity Building and Marine Technology Transfer',
        'Environmental Impact Assessment and Sectoral Implications',
        'Institutional and Jurisdictional Questions for the Region',
        'Policy Recommendations'
      ]
    },

    // ===== VIDEOS =====
    {
      id: 18,
      title: 'IMSWG 2026 Q1 EDITION',
      description: 'The 2026 Quarter one edition had a presentation from Commander Duodu speaking on Optimizing maritime security for sustainable blue economy developmen',
      fullDescription: 'This video provides a comprehensive introduction to maritime security in the Gulf of Guinea, covering key challenges, regional initiatives, and collaborative efforts to ensure safe and secure maritime operations.',
      type: 'Videos',
      category: 'Educational',
      duration: '1:02:57',
      date: 'March 2026',
      // views: 2340,
      thumbnail: '/IMSWG2026flyer.jpg',
      fileType: 'VIDEO',
      videoUrl: 'https://youtu.be/Hy8-4KvAKfE',
    },
    {
      id: 19,
      title: 'THE IMPLICATIONS OF THE BBNJ AGREEMENT FOR THE GULF OF GUINEA',
      description: 'High-Level Expert Meeting of the International Maritime Security Working Group (IMSWG), September 2026 Edition, on the BBNJ Agreement and its implications for the Gulf of Guinea.',
      fullDescription: 'The Gulf of Guinea is entering a new phase of ocean governance as the BBNJ Agreement brings new opportunities and responsibilities for States and maritime stakeholders. Moderated by Commander Ayo Olusola Pacheco (Nigerian Navy, PhD candidate, World Maritime University), with speakers Kome Adhekpukoli (Lawyer, Federal Ministry of Justice, Nigeria) and Dr. Godwin Djokoto (Senior Lecturer, University of Ghana School of Law).',
      type: 'Videos',
      category: 'Educational',
      duration: '1:58:12',
      date: 'September 2026',
      thumbnail: '/IMSWG-BBNJ-Sept2026.webp',
      fileType: 'VIDEO',
      videoUrl: 'https://www.youtube.com/watch?v=81Bue4Xnj4A',
    }

  ];

  const resources = resourcesRaw.map((r) => {
    const content = t(`resourceContent.${r.id}`, { returnObjects: true }) || {};
    return {
      ...r,
      description: content.description || r.description,
      fullDescription: content.fullDescription || r.fullDescription,
      keyTopics: r.keyTopics ? (content.keyTopics || r.keyTopics) : undefined
    };
  });

  const types = ['Strategic Documents', 'Academic Papers', 'Internal Reports', 'Videos'];
  const internalReportSubcategories = ['All', 'Policy Briefs', 'IMSWG Reports', 'Quarterly Highlights', 'Maritime Governance'];
  const imswgReportYears = ['All', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
  const typeLabels = t('filters.types', { returnObjects: true });
  const subcategoryLabels = t('filters.subcategories', { returnObjects: true });
  const categoryLabels = t('categoryLabels', { returnObjects: true });

  const filteredResources = resources.filter(resource => {
    const matchesType = resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());

    // For Internal Reports, also filter by subcategory
    const matchesSubcategory = selectedType !== 'Internal Reports' ||
                                selectedSubcategory === 'All' ||
                                resource.subcategory === selectedSubcategory;

    // For IMSWG Reports, also filter by year
    const matchesYear = selectedType !== 'Internal Reports' ||
                         selectedSubcategory !== 'IMSWG Reports' ||
                         selectedYear === 'All' ||
                         resource.date.includes(selectedYear);

    return matchesType && matchesSearch && matchesSubcategory && matchesYear;
  });

  const handleDownload = async (resource) => {
    const startDownload = () => {
      const link = document.createElement('a');
      link.href = resource.downloadUrl;
      link.download = resource.downloadUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Strategic Documents and Academic Papers are free for everyone.
    if (!requiresMembership(resource)) {
      startDownload();
      return;
    }

    // Internal Reports need a signed-in member.
    if (!isAuthenticated) {
      navigate('/membership');
      return;
    }
    if (!isMember) {
      setShowMembershipModal(true);
      return;
    }

    try {
      startDownload();
    } catch (error) {
      console.error('Download error:', error);
      alert(t('downloadFailedAlert', { error: error.message }));
    }
  };

  const handlePreview = (resource) => {
    window.open(resource.downloadUrl, '_blank', 'noopener');
  };

  const MembershipModal = ({ onClose }) => (
    <Dialog onClose={onClose} labelledBy="membership-modal-title" className="max-w-lg">
      <div className="p-8">
        <Lock className="h-6 w-6 text-rust" aria-hidden="true" />
        <h2 id="membership-modal-title" className="heading-display mt-4 text-[1.75rem]">
          {t('membershipModal.heading')}
        </h2>
        <p className="mt-3 leading-relaxed text-muted">{t('membershipModal.body')}</p>

        <h3 className="mt-8 text-sm font-semibold text-ink">{t('membershipModal.benefitsHeading')}</h3>
        <ul className="mt-3 space-y-2 border-t border-line pt-3">
          {t('membershipModal.benefits', { returnObjects: true }).map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-[0.9375rem] text-text">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-rust" aria-hidden="true"></span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
          <button type="button" onClick={() => navigate('/membership')} className={`${BTN_PRIMARY} flex-1`}>
            {t('membershipModal.becomeMember')}
          </button>
          <button type="button" onClick={onClose} className={`${BTN_SECONDARY} flex-1`}>
            {t('membershipModal.close')}
          </button>
        </div>
      </div>
    </Dialog>
  );

  const PreviewModal = ({ resource, onClose }) => {
    if (!resource) return null;
    const needsMembership = requiresMembership(resource) && !isMember;

    const facts = [
      { label: t('modal.published'), value: resource.date },
      { label: t('modal.fileSize'), value: resource.size },
      resource.pages ? { label: t('modal.pages'), value: resource.pages } : null,
      { label: t('modal.downloads'), value: resource.downloads }
    ].filter((fact) => fact && fact.value);

    return (
      <Dialog onClose={onClose} labelledBy="preview-modal-title" className="max-w-4xl">
        <div className="grid md:grid-cols-[15rem_1fr]">
          <div className="border-b border-line bg-paper p-6 md:border-b-0 md:border-r">
            <Cover resource={resource} className="mx-auto w-40 md:w-full" />
          </div>

          <div className="p-6 md:p-8">
            <p className="pr-10 text-sm text-muted">
              <span className="font-semibold text-rust">{typeLabels[resource.type] || resource.type}</span>
              {resource.subcategory && <> · {subcategoryLabels[resource.subcategory] || resource.subcategory}</>}
              {' · '}{resource.fileType}
            </p>
            <h2 id="preview-modal-title" className="heading-display mt-2 text-[1.625rem] md:text-[1.875rem]">
              {resource.title}
            </h2>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col">
                  <dt className="text-xs text-muted">{fact.label}</dt>
                  <dd className="order-first text-[0.9375rem] font-semibold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex items-start gap-2 text-sm text-muted">
              {needsMembership ? (
                <>
                  <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-rust" aria-hidden="true" />
                  <span><strong className="font-semibold text-ink">{t('modal.membershipRequired.heading')}.</strong> {t('modal.membershipRequired.body')}</span>
                </>
              ) : !requiresMembership(resource) ? (
                <>
                  <Download className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink" aria-hidden="true" />
                  <span><strong className="font-semibold text-ink">{t('modal.freeDownload.heading')}.</strong> {t('modal.freeDownload.body')}</span>
                </>
              ) : null}
            </p>

            <h3 className="mt-7 text-sm font-semibold text-ink">{t('modal.overview')}</h3>
            <p className="mt-2 leading-relaxed text-text">{resource.fullDescription}</p>

            {resource.keyTopics && (
              <>
                <h3 className="mt-7 text-sm font-semibold text-ink">{t('modal.whatsIncluded')}</h3>
                <ul className="mt-2 space-y-1.5">
                  {resource.keyTopics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-[0.9375rem] text-text">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => handleDownload(resource)} className={BTN_PRIMARY}>
                {needsMembership ? <Lock className="h-4 w-4" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
                <span>{needsMembership ? t('modal.unlockDownload') : t('modal.downloadResource')}</span>
              </button>
              <button type="button" onClick={() => handlePreview(resource)} className={BTN_SECONDARY}>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>{t('modal.openPreview')}</span>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-body text-muted">
        {t('loading')}
      </div>
    );
  }

  const isVideo = selectedType === 'Videos';

  return (
    <div className="w-full font-body text-text">
      {showMembershipModal && <MembershipModal onClose={() => setShowMembershipModal(false)} />}
      {previewResource && <PreviewModal resource={previewResource} onClose={() => setPreviewResource(null)} />}

      {/* PAGE HEADER */}
      <header className="border-b border-line bg-paper pb-12 pt-[124px] md:pb-16 md:pt-[148px]">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="text-sm font-semibold text-rust">{t('hero.badge')}</p>
              <h1 className="heading-display mt-3 text-[2.5rem] md:text-[3.5rem]">{t('hero.title')}</h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{t('hero.subtitle')}</p>
            </div>
            <ul className="space-y-3 self-end border-l-2 border-ink pl-5 text-[0.9375rem] text-text md:col-span-4 md:col-start-9">
              <li className="flex items-start gap-2">
                <Download className="mt-1 h-4 w-4 flex-shrink-0 text-ink" aria-hidden="true" />
                <span>{t('hero.noteFree')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="mt-1 h-4 w-4 flex-shrink-0 text-rust" aria-hidden="true" />
                <span>{t('hero.noteMembers')}</span>
              </li>
            </ul>
          </div>
        </Container>
      </header>

      {/* FILTERS: collection tabs, search and (for internal reports) series and year */}
      <section className="sticky top-[61px] z-30 border-b border-line bg-white/95 backdrop-blur" aria-label={t('search.placeholder')}>
        <Container>
          <div className="flex flex-col-reverse gap-4 py-4 lg:flex-row lg:items-end lg:justify-between lg:py-0">
            <div className="-mb-px flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group">
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={selectedType === type}
                  onClick={() => {
                    setSelectedType(type);
                    setSelectedSubcategory('All');
                    setSelectedYear('All');
                  }}
                  className={`focus-ring whitespace-nowrap border-b-2 py-4 text-[0.9375rem] font-semibold transition-colors ${
                    selectedType === type ? 'border-rust text-ink' : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {typeLabels[type] || type}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:mb-2.5 lg:w-80">
              <label htmlFor="resource-search" className="sr-only">{t('search.placeholder')}</label>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                id="resource-search"
                type="search"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-[2px] border border-line bg-white py-2.5 pl-9 pr-3 text-[0.9375rem] text-text placeholder:text-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
              />
            </div>
          </div>

          {selectedType === 'Internal Reports' && (
            <div className="flex flex-wrap items-center gap-2 border-t border-line py-3">
              {internalReportSubcategories.map((subcategory) => (
                <FilterChip
                  key={subcategory}
                  active={selectedSubcategory === subcategory}
                  onClick={() => {
                    setSelectedSubcategory(subcategory);
                    setSelectedYear('All');
                  }}
                >
                  {subcategoryLabels[subcategory] || subcategory}
                </FilterChip>
              ))}
            </div>
          )}

          {selectedType === 'Internal Reports' && selectedSubcategory === 'IMSWG Reports' && (
            <div className="flex flex-wrap items-center gap-2 border-t border-line py-3">
              {imswgReportYears.map((year) => (
                <FilterChip key={year} active={selectedYear === year} onClick={() => setSelectedYear(year)}>
                  {year === 'All' ? t('filters.yearAll') : year}
                </FilterChip>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* RESULTS: a catalogue list */}
      <section id="internal-reports" className="scroll-mt-40 bg-white py-12 md:py-16">
        <Container>
          <p className="text-sm text-muted" role="status" aria-live="polite">
            {t('resultsCount', { count: filteredResources.length })}
          </p>

          {filteredResources.length === 0 ? (
            <p className="mt-6 border-t border-line py-16 text-center text-lg text-muted">{t('noResults')}</p>
          ) : (
            <ul className="mt-4 border-t border-line">
              {filteredResources.map((resource) => {
                const needsMembership = requiresMembership(resource);
                const locked = needsMembership && !isMember;

                return (
                  <li key={resource.id} className="grid gap-5 border-b border-line py-8 sm:grid-cols-[8rem_1fr] md:gap-8 lg:grid-cols-[9rem_1fr_auto]">
                    {isVideo ? (
                      <a href={resource.videoUrl} target="_blank" rel="noopener noreferrer" className="focus-ring group relative block w-40 sm:w-full" tabIndex={-1} aria-hidden="true">
                        <Cover resource={resource} />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-deep/85 text-white transition-colors group-hover:bg-rust">
                            <Play className="ml-0.5 h-5 w-5" />
                          </span>
                        </span>
                      </a>
                    ) : (
                      <button type="button" onClick={() => setPreviewResource(resource)} className="focus-ring block w-28 sm:w-full" tabIndex={-1} aria-hidden="true">
                        <Cover resource={resource} />
                      </button>
                    )}

                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                        {resource.subcategory && (
                          <span className="font-semibold text-rust">{subcategoryLabels[resource.subcategory] || resource.subcategory}</span>
                        )}
                        {!resource.subcategory && resource.category && (
                          <span className="font-semibold text-rust">{categoryLabels[resource.category] || resource.category}</span>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>{resource.date}</span>
                        <span aria-hidden="true">·</span>
                        {isVideo ? (
                          <span>{resource.duration}</span>
                        ) : (
                          <span>
                            {resource.fileType} {resource.size}
                            {resource.pages ? `, ${resource.pages} ${t('card.pagesSuffix')}` : ''}
                          </span>
                        )}
                      </p>

                      <h2 className="mt-2 font-display text-[1.375rem] font-semibold leading-snug text-ink md:text-[1.5rem]">
                        {isVideo ? (
                          <a href={resource.videoUrl} target="_blank" rel="noopener noreferrer" className="focus-ring hover:underline hover:decoration-1 hover:underline-offset-4">
                            {resource.title}
                          </a>
                        ) : (
                          <button type="button" onClick={() => setPreviewResource(resource)} className="focus-ring text-left hover:underline hover:decoration-1 hover:underline-offset-4">
                            {resource.title}
                          </button>
                        )}
                      </h2>

                      <p className="mt-2 line-clamp-3 max-w-3xl leading-relaxed text-muted">{resource.description}</p>

                      <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
                        {locked ? (
                          <><Lock className="h-3.5 w-3.5 text-rust" aria-hidden="true" /><span className="text-rust">{t('badges.membersOnly')}</span></>
                        ) : !needsMembership && !isVideo ? (
                          <span className="text-ink">{t('badges.freeAccess')}</span>
                        ) : null}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 sm:col-start-2 lg:col-start-3 lg:flex-col lg:items-stretch lg:justify-start">
                      {isVideo ? (
                        <a href={resource.videoUrl} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                          <Play className="h-4 w-4" aria-hidden="true" />
                          <span>{t('card.watchVideo')}</span>
                        </a>
                      ) : (
                        <>
                          <button type="button" onClick={() => handleDownload(resource)} className={BTN_PRIMARY}>
                            {locked ? <Lock className="h-4 w-4" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
                            <span>{locked ? t('card.locked') : t('card.download')}</span>
                            <span className="sr-only">: {resource.title}</span>
                          </button>
                          <button type="button" onClick={() => setPreviewResource(resource)} className={BTN_SECONDARY}>
                            <span>{t('card.preview')}</span>
                            <span className="sr-only">: {resource.title}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-ink-deep py-16 text-white md:py-20">
        <Container>
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h2 className="heading-display !text-white text-[2rem] md:text-[2.5rem]">
                {isMember ? t('ctaSection.customResearch.heading') : t('ctaSection.unlock.heading')}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-dark">
                {isMember ? t('ctaSection.customResearch.body') : t('ctaSection.unlock.body')}
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              {isMember ? (
                <Button to="/contact" variant="onDark">{t('ctaSection.customResearch.button')}</Button>
              ) : (
                <Button to="/membership" variant="onDark">{t('ctaSection.unlock.button')}</Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Resources;
