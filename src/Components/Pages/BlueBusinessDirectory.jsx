import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Mail, Globe, ChevronRight, Ship, Anchor, Shield, BookOpen, Wrench, Scale, Fuel, Fish, Building2, GraduationCap, Package, LifeBuoy } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: null },
  { id: 'shipping', label: 'Shipping & Logistics', icon: Ship },
  { id: 'port', label: 'Port Services', icon: Anchor },
  { id: 'security', label: 'Maritime Security', icon: Shield },
  { id: 'engineering', label: 'Marine Engineering', icon: Wrench },
  { id: 'legal', label: 'Legal & Insurance', icon: Scale },
  { id: 'energy', label: 'Offshore Energy', icon: Fuel },
  { id: 'fishing', label: 'Fishing & Aquaculture', icon: Fish },
  { id: 'consulting', label: 'Consulting & Advisory', icon: Building2 },
  { id: 'training', label: 'Training & Education', icon: GraduationCap },
  { id: 'supply', label: 'Marine Supply', icon: Package },
  { id: 'salvage', label: 'Salvage & Rescue', icon: LifeBuoy },
  { id: 'research', label: 'Research & Surveying', icon: BookOpen },
];

const LISTINGS = [
  { id: 1, name: 'Tema Port Authority', category: 'port', country: 'Ghana', city: 'Tema', phone: '+233 303 202 631', email: 'info@ghanaports.com', website: 'ghanaports.com', description: 'Ghana\'s premier port authority managing container, bulk and general cargo operations at the Port of Tema.', featured: true },
  { id: 2, name: 'Black Star Line Shipping Co.', category: 'shipping', country: 'Ghana', city: 'Accra', phone: '+233 302 666 501', email: 'ops@blackstarline.gh', website: 'blackstarline.gh', description: 'Regional shipping and freight forwarding services across the Gulf of Guinea with a fleet of 12 vessels.', featured: true },
  { id: 3, name: 'Gulf Security Consultants Ltd', category: 'security', country: 'Nigeria', city: 'Lagos', phone: '+234 1 770 4400', email: 'contact@gulfsecconsult.ng', website: 'gulfsecconsult.ng', description: 'Specialist maritime security risk assessments, vessel escort, and anti-piracy training for the GoG region.' },
  { id: 4, name: 'West African Marine Engineers', category: 'engineering', country: 'Ghana', city: 'Takoradi', phone: '+233 312 023 110', email: 'service@wame.com.gh', website: 'wame.com.gh', description: 'Full-service marine engineering, drydocking, hull repair and mechanical overhaul for commercial vessels.' },
  { id: 5, name: 'Abidjan Stevedoring Company', category: 'port', country: "Côte d'Ivoire", city: 'Abidjan', phone: '+225 27 21 24 00 50', email: 'ops@abidjansteve.ci', website: 'abidjansteve.ci', description: 'Cargo handling, stevedoring and warehousing at Port Autonome d\'Abidjan with 24/7 operations.' },
  { id: 6, name: 'Oceanic Legal Partners', category: 'legal', country: 'Ghana', city: 'Accra', phone: '+233 302 780 340', email: 'maritime@oceaniclegal.gh', website: 'oceaniclegal.gh', description: 'Maritime law firm specialising in ship finance, cargo claims, P&I matters and admiralty litigation.' },
  { id: 7, name: 'Niger Delta Offshore Services', category: 'energy', country: 'Nigeria', city: 'Port Harcourt', phone: '+234 84 462 200', email: 'info@ndos.ng', website: 'ndos.ng', description: 'Offshore support vessels, ROV services and subsea inspection for oil & gas operations in the Niger Delta.' },
  { id: 8, name: 'Atlantic Fisheries Ghana', category: 'fishing', country: 'Ghana', city: 'Elmina', phone: '+233 332 194 200', email: 'harvest@atlanticfishgh.com', website: 'atlanticfishgh.com', description: 'Industrial fishing, cold storage and fish processing with a fleet serving the entire Gulf of Guinea coastline.' },
  { id: 9, name: 'BlueSea Advisory Group', category: 'consulting', country: 'Cameroon', city: 'Douala', phone: '+237 233 427 600', email: 'hello@blueseaadvisory.cm', website: 'blueseaadvisory.cm', description: 'Strategic maritime consulting covering port masterplanning, blue economy policy and investor relations.' },
  { id: 10, name: 'GoG Maritime Academy', category: 'training', country: 'Ghana', city: 'Accra', phone: '+233 302 500 770', email: 'admissions@gogacademy.edu.gh', website: 'gogacademy.edu.gh', description: 'STCW-certified professional training programmes for ratings, officers and maritime security personnel.' },
  { id: 11, name: 'Dakar Marine Supplies SARL', category: 'supply', country: 'Senegal', city: 'Dakar', phone: '+221 33 823 4400', email: 'orders@dakarmarine.sn', website: 'dakarmarine.sn', description: 'Ship chandlering, provisions, deck and engine stores for vessels calling at all Senegalese ports.' },
  { id: 12, name: 'GoG Salvage & Towing Ltd', category: 'salvage', country: 'Ghana', city: 'Tema', phone: '+233 303 208 800', email: 'emergency@gogsalvage.com', website: 'gogsalvage.com', description: 'Emergency salvage, ocean towing and wreck removal operations across the West and Central African coast.' },
  { id: 13, name: 'Marine Survey Associates', category: 'research', country: 'Nigeria', city: 'Apapa', phone: '+234 1 588 0100', email: 'surveys@msa.ng', website: 'msa.ng', description: 'P&I surveys, cargo condition reports, hull & machinery surveys and expert witness services.' },
  { id: 14, name: 'Lomé Container Terminal', category: 'port', country: 'Togo', city: 'Lomé', phone: '+228 22 27 47 00', email: 'ops@lct.tg', website: 'lct.tg', description: 'Deep-water container terminal serving as the primary transshipment hub for landlocked West African states.' },
  { id: 15, name: 'Équatorial Shipping Lines', category: 'shipping', country: 'Gabon', city: 'Libreville', phone: '+241 01 72 18 00', email: 'booking@equatorialship.ga', website: 'equatorialship.ga', description: 'Regional ro-ro and general cargo services linking Gabon, Cameroon and Equatorial Guinea.' },
  { id: 16, name: 'Seawatch Security Services', category: 'security', country: 'Benin', city: 'Cotonou', phone: '+229 21 31 50 60', email: 'ops@seawatch.bj', website: 'seawatch.bj', description: 'Port facility security, vessel protection officers and maritime domain awareness for Benin and Togo.' },
  { id: 17, name: 'Coastal Hydrographic Services', category: 'research', country: 'Ghana', city: 'Accra', phone: '+233 302 776 600', email: 'surveys@coastalhydro.gh', website: 'coastalhydro.gh', description: 'Hydrographic surveying, chart production, bathymetric mapping and environmental impact assessments.' },
  { id: 18, name: 'Freetown Ship Repair Yard', category: 'engineering', country: 'Sierra Leone', city: 'Freetown', phone: '+232 22 228 700', email: 'yard@freetownrepair.sl', website: 'freetownrepair.sl', description: 'Slipway and floating dock facilities, steel fabrication and engine overhaul for vessels up to 5,000 DWT.' },
  { id: 19, name: 'Gulf Blue Insurance Brokers', category: 'legal', country: 'Ghana', city: 'Accra', phone: '+233 302 240 900', email: 'marine@gulfblue.gh', website: 'gulfblue.gh', description: 'Marine cargo, hull, P&I and offshore energy insurance brokerage across the Gulf of Guinea region.' },
  { id: 20, name: 'Deep Blue Energy Services', category: 'energy', country: 'Nigeria', city: 'Lagos', phone: '+234 1 462 5700', email: 'info@deepblue.ng', website: 'deepblue.ng', description: 'Offshore logistics, OSV fleet management and integrated supply base operations for FPSO and platform projects.' },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const CategoryIcon = ({ categoryId, className }) => {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  if (!cat || !cat.icon) return null;
  const Icon = cat.icon;
  return <Icon className={className} />;
};

const BlueBusinessDirectory = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLetter, setActiveLetter] = useState('All');

  const filtered = useMemo(() => {
    return LISTINGS.filter(l => {
      const matchCat = activeCategory === 'all' || l.category === activeCategory;
      const matchLetter = activeLetter === 'All' || l.name.toUpperCase().startsWith(activeLetter);
      const q = search.toLowerCase();
      const matchSearch = !q || l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.country.toLowerCase().includes(q) || l.city.toLowerCase().includes(q);
      return matchCat && matchLetter && matchSearch;
    });
  }, [search, activeCategory, activeLetter]);

  const featured = filtered.filter(l => l.featured);
  const regular = filtered.filter(l => !l.featured);

  const activeCatLetters = new Set(
    LISTINGS.filter(l => activeCategory === 'all' || l.category === activeCategory)
      .map(l => l.name[0].toUpperCase())
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F3E8', fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#132552' }} className="pt-28 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1B6CA8' }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.2em] uppercase mb-1" style={{ color: '#8EC5FC', fontFamily: "'Arial', sans-serif" }}>GoGMI</p>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-none mb-2" style={{ letterSpacing: '-0.02em' }}>
                Blue Business<br />Directory
              </h1>
              <p className="text-base" style={{ color: '#8EC5FC', fontFamily: "'Arial', sans-serif", fontWeight: 400 }}>
                The Gulf of Guinea's maritime trade & services register
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#8EC5FC' }} />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveLetter('All'); }}
              placeholder="Search by business name, service or country..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-base focus:outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(142,197,252,0.3)',
                fontFamily: "'Arial', sans-serif",
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xl">×</button>
            )}
          </div>
        </div>
      </div>

      {/* Yellow Pages stripe */}
      <div style={{ backgroundColor: '#E8B84B', height: '6px' }} />
      <div style={{ backgroundColor: '#D4A030', height: '3px' }} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Categories */}
            <div className="rounded-xl overflow-hidden shadow-md mb-6" style={{ border: '2px solid #D4A030' }}>
              <div className="px-4 py-3 text-sm font-black tracking-widest uppercase" style={{ backgroundColor: '#E8B84B', color: '#132552', fontFamily: "'Arial', sans-serif" }}>
                Categories
              </div>
              <div style={{ backgroundColor: '#FEFCE8' }}>
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const count = cat.id === 'all' ? LISTINGS.length : LISTINGS.filter(l => l.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setActiveLetter('All'); }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-left transition-all hover:bg-yellow-100 border-b"
                      style={{
                        borderColor: '#E8E0C8',
                        backgroundColor: activeCategory === cat.id ? '#132552' : 'transparent',
                        color: activeCategory === cat.id ? 'white' : '#1a1a1a',
                        fontFamily: "'Arial', sans-serif",
                        fontSize: '13px',
                        fontWeight: activeCategory === cat.id ? 700 : 400,
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
                        {cat.label}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: activeCategory === cat.id ? 'rgba(255,255,255,0.2)' : '#E8B84B', color: activeCategory === cat.id ? 'white' : '#132552', fontWeight: 700 }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List Your Business CTA */}
            <div className="rounded-xl p-5 text-center" style={{ backgroundColor: '#132552', border: '2px solid #E8B84B' }}>
              <div className="text-2xl mb-2">📋</div>
              <p className="text-white font-black text-sm mb-1" style={{ fontFamily: "'Arial', sans-serif" }}>List Your Business</p>
              <p className="text-xs mb-3" style={{ color: '#8EC5FC', fontFamily: "'Arial', sans-serif" }}>Reach maritime professionals across the Gulf of Guinea</p>
              <a
                href="mailto:info@gogmi.org.gh?subject=Blue Business Directory Listing"
                className="block w-full py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                style={{ backgroundColor: '#E8B84B', color: '#132552', fontFamily: "'Arial', sans-serif" }}
              >
                Contact Us to List
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">

            {/* A–Z Filter */}
            <div className="flex flex-wrap gap-1 mb-6 p-3 rounded-xl" style={{ backgroundColor: '#FEFCE8', border: '1px solid #D4A030' }}>
              {['All', ...ALPHABET].map(letter => {
                const available = letter === 'All' || activeCatLetters.has(letter);
                const isActive = activeLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => available && setActiveLetter(letter)}
                    disabled={!available}
                    className="w-8 h-8 rounded text-xs font-bold transition-all"
                    style={{
                      fontFamily: "'Arial', sans-serif",
                      backgroundColor: isActive ? '#132552' : available ? '#E8B84B' : '#E8E0C8',
                      color: isActive ? 'white' : available ? '#132552' : '#A09070',
                      cursor: available ? 'pointer' : 'default',
                      border: isActive ? '2px solid #E8B84B' : '2px solid transparent',
                    }}
                  >
                    {letter === 'All' ? '∗' : letter}
                  </button>
                );
              })}
            </div>

            {/* Results count */}
            <p className="text-sm mb-4" style={{ color: '#6B5B35', fontFamily: "'Arial', sans-serif" }}>
              Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'listing' : 'listings'}
              {activeCategory !== 'all' && <> in <strong>{CATEGORIES.find(c => c.id === activeCategory)?.label}</strong></>}
              {activeLetter !== 'All' && <> starting with <strong>"{activeLetter}"</strong></>}
              {search && <> matching <strong>"{search}"</strong></>}
            </p>

            {/* Featured listings */}
            {featured.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1" style={{ backgroundColor: '#D4A030' }} />
                  <span className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: '#E8B84B', color: '#132552', fontFamily: "'Arial', sans-serif" }}>Featured Listings</span>
                  <div className="h-px flex-1" style={{ backgroundColor: '#D4A030' }} />
                </div>
                <div className="space-y-4">
                  {featured.map(listing => (
                    <ListingCard key={listing.id} listing={listing} featured />
                  ))}
                </div>
              </div>
            )}

            {/* Regular listings */}
            {regular.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px flex-1" style={{ backgroundColor: '#D4A030' }} />
                    <span className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: '#F5F3E8', color: '#6B5B35', border: '1px solid #D4A030', fontFamily: "'Arial', sans-serif" }}>All Listings</span>
                    <div className="h-px flex-1" style={{ backgroundColor: '#D4A030' }} />
                  </div>
                )}
                <div className="space-y-3">
                  {regular.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-xl font-black mb-2" style={{ color: '#132552', fontFamily: "'Arial', sans-serif" }}>No listings found</p>
                <p className="text-sm" style={{ color: '#6B5B35', fontFamily: "'Arial', sans-serif" }}>
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ backgroundColor: '#D4A030', height: '3px' }} />
      <div style={{ backgroundColor: '#E8B84B', height: '6px' }} />
      <div className="py-6 text-center" style={{ backgroundColor: '#132552' }}>
        <p className="text-sm" style={{ color: '#8EC5FC', fontFamily: "'Arial', sans-serif" }}>
          GoGMI Blue Business Directory · Gulf of Guinea Maritime Institute ·{' '}
          <a href="mailto:info@gogmi.org.gh" className="underline hover:text-white">info@gogmi.org.gh</a>
        </p>
      </div>
    </div>
  );
};

const ListingCard = ({ listing, featured }) => {
  const catLabel = CATEGORIES.find(c => c.id === listing.category)?.label || listing.category;

  return (
    <div
      className="rounded-xl p-5 transition-all hover:shadow-md"
      style={{
        backgroundColor: featured ? '#FFFBEB' : 'white',
        border: featured ? '2px solid #D4A030' : '1px solid #DDD8C8',
        boxShadow: featured ? '0 2px 8px rgba(212,160,48,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Icon block */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: featured ? '#E8B84B' : '#EEF2F8' }}>
          <CategoryIcon categoryId={listing.category} className="w-6 h-6" style={{ color: featured ? '#132552' : '#1B6CA8' }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-black" style={{ color: '#132552', fontFamily: "'Arial', sans-serif" }}>
              {listing.name}
            </h3>
            {featured && (
              <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ backgroundColor: '#E8B84B', color: '#132552', fontFamily: "'Arial', sans-serif" }}>
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-xs mb-2" style={{ color: '#6B5B35', fontFamily: "'Arial', sans-serif" }}>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {listing.city}, {listing.country}
            </span>
            <span className="px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: '#EEF2F8', color: '#132552' }}>
              {catLabel}
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-3" style={{ color: '#3D3020', fontFamily: "'Georgia', serif" }}>
            {listing.description}
          </p>

          <div className="flex flex-wrap gap-4 text-xs" style={{ fontFamily: "'Arial', sans-serif" }}>
            <a href={`tel:${listing.phone}`} className="flex items-center gap-1 hover:underline" style={{ color: '#132552' }}>
              <Phone className="w-3 h-3" />
              {listing.phone}
            </a>
            <a href={`mailto:${listing.email}`} className="flex items-center gap-1 hover:underline" style={{ color: '#132552' }}>
              <Mail className="w-3 h-3" />
              {listing.email}
            </a>
            <a href={`https://${listing.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: '#8E3400' }}>
              <Globe className="w-3 h-3" />
              {listing.website}
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueBusinessDirectory;
