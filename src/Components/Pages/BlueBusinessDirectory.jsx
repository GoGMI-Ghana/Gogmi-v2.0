import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'shipping', label: 'Shipping & Logistics' },
  { id: 'port', label: 'Port Services' },
  { id: 'security', label: 'Maritime Security' },
  { id: 'engineering', label: 'Marine Engineering' },
  { id: 'legal', label: 'Legal & Insurance' },
  { id: 'energy', label: 'Offshore Energy' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'training', label: 'Training & Education' },
];

const LISTINGS = [
  {
    id: 1,
    name: 'Ghana Ports & Harbours Authority',
    category: 'port',
    country: 'Ghana',
    city: 'Tema',
    phone: '+233 303 202 631',
    email: 'info@ghanaports.com',
    website: 'ghanaports.com',
    description: 'State authority managing container, bulk and general cargo operations across Ghana\'s major ports including Tema and Takoradi.',
    featured: true,
  },
  {
    id: 2,
    name: 'Black Star Line Shipping Co.',
    category: 'shipping',
    country: 'Ghana',
    city: 'Accra',
    phone: '+233 302 666 501',
    email: 'ops@blackstarline.gh',
    website: 'blackstarline.gh',
    description: 'Regional shipping and freight forwarding across the Gulf of Guinea with scheduled services to 14 ports.',
    featured: true,
  },
  {
    id: 3,
    name: 'Gulf Security Consultants Ltd',
    category: 'security',
    country: 'Nigeria',
    city: 'Lagos',
    phone: '+234 1 770 4400',
    email: 'contact@gulfsecconsult.ng',
    website: 'gulfsecconsult.ng',
    description: 'Maritime security risk assessment, vessel protection and anti-piracy advisory for commercial operators in the GoG.',
  },
  {
    id: 4,
    name: 'Lomé Container Terminal',
    category: 'port',
    country: 'Togo',
    city: 'Lomé',
    phone: '+228 22 27 47 00',
    email: 'ops@lct.tg',
    website: 'lct.tg',
    description: 'Deep-water container terminal and the primary transshipment hub serving landlocked West African states.',
  },
  {
    id: 5,
    name: 'Oceanic Legal Partners',
    category: 'legal',
    country: 'Ghana',
    city: 'Accra',
    phone: '+233 302 780 340',
    email: 'maritime@oceaniclegal.gh',
    website: 'oceaniclegal.gh',
    description: 'Maritime law practice specialising in ship finance, cargo claims, P&I matters and admiralty proceedings.',
  },
  {
    id: 6,
    name: 'Niger Delta Offshore Services',
    category: 'energy',
    country: 'Nigeria',
    city: 'Port Harcourt',
    phone: '+234 84 462 200',
    email: 'info@ndos.ng',
    website: 'ndos.ng',
    description: 'Offshore support vessels, ROV operations and subsea inspection for oil and gas platforms in the Niger Delta.',
  },
  {
    id: 7,
    name: 'BlueSea Advisory Group',
    category: 'consulting',
    country: 'Cameroon',
    city: 'Douala',
    phone: '+237 233 427 600',
    email: 'hello@blueseaadvisory.cm',
    website: 'blueseaadvisory.cm',
    description: 'Strategic advisory in port masterplanning, blue economy policy and maritime investor relations across Central and West Africa.',
  },
  {
    id: 8,
    name: 'GoG Maritime Academy',
    category: 'training',
    country: 'Ghana',
    city: 'Accra',
    phone: '+233 302 500 770',
    email: 'admissions@gogacademy.edu.gh',
    website: 'gogacademy.edu.gh',
    description: 'STCW-certified training for ratings, deck and engine officers, and maritime security personnel.',
  },
  {
    id: 9,
    name: 'West African Marine Engineers',
    category: 'engineering',
    country: 'Ghana',
    city: 'Takoradi',
    phone: '+233 312 023 110',
    email: 'service@wame.com.gh',
    website: 'wame.com.gh',
    description: 'Ship repair, drydocking, hull maintenance and mechanical overhaul for commercial and fishing vessels.',
  },
];

const BlueBusinessDirectory = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    return LISTINGS.filter(l => {
      const matchCat = activeCategory === 'all' || l.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const featured = filtered.filter(l => l.featured);
  const regular = filtered.filter(l => !l.featured);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F4' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .dir-serif { font-family: 'Libre Baskerville', Georgia, serif; }
        .dir-sans  { font-family: 'DM Sans', system-ui, sans-serif; }
        .listing-row:hover { background-color: #F0EEE8; }
        .cat-pill:hover { background-color: #132552; color: white; }
      `}</style>

      {/* Header */}
      <div style={{ backgroundColor: '#132552', borderBottom: '4px solid #8E3400' }} className="pt-28 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="dir-sans text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#8EC5FC' }}>
            Gulf of Guinea Maritime Institute
          </p>
          <h1 className="dir-serif text-4xl md:text-5xl font-bold text-white mb-3" style={{ letterSpacing: '-0.01em' }}>
            Blue Business Directory
          </h1>
          <p className="dir-sans text-base mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
            The Gulf of Guinea's register of maritime trade & professional services
          </p>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, service or country…"
              className="dir-sans w-full pl-11 pr-10 py-3.5 text-sm text-white focus:outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px',
                fontWeight: 300,
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 text-lg leading-none"
              >×</button>
            )}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ backgroundColor: '#EFEDE6', borderBottom: '1px solid #DDD8CC' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="dir-sans cat-pill flex-shrink-0 px-4 py-1.5 rounded-sm text-xs font-medium transition-all"
                style={{
                  backgroundColor: activeCategory === cat.id ? '#132552' : 'transparent',
                  color: activeCategory === cat.id ? 'white' : '#4A4035',
                  border: activeCategory === cat.id ? '1px solid #132552' : '1px solid #C8C0B0',
                  fontWeight: activeCategory === cat.id ? 500 : 400,
                  cursor: 'pointer',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="dir-sans text-xs" style={{ color: '#8A7F70' }}>
            {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
            {activeCategory !== 'all' && <> · {CATEGORIES.find(c => c.id === activeCategory)?.label}</>}
          </p>
          <a
            href="mailto:info@gogmi.org.gh?subject=Blue Business Directory — List My Business"
            className="dir-sans text-xs font-medium hover:underline"
            style={{ color: '#8E3400' }}
          >
            List your business →
          </a>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-10">
            <p className="dir-sans text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#8A7F70' }}>
              Featured
            </p>
            <div className="divide-y" style={{ borderTop: '1px solid #DDD8CC', borderBottom: '1px solid #DDD8CC' }}>
              {featured.map(listing => (
                <ListingRow key={listing.id} listing={listing} featured />
              ))}
            </div>
          </div>
        )}

        {/* All listings */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <p className="dir-sans text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#8A7F70' }}>
                All Listings
              </p>
            )}
            <div className="divide-y" style={{ borderTop: '1px solid #DDD8CC', borderBottom: '1px solid #DDD8CC' }}>
              {regular.map(listing => (
                <ListingRow key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24 border-t border-b" style={{ borderColor: '#DDD8CC' }}>
            <p className="dir-serif text-xl mb-2" style={{ color: '#132552' }}>No listings found</p>
            <p className="dir-sans text-sm" style={{ color: '#8A7F70', fontWeight: 300 }}>
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* Footer note */}
        <p className="dir-sans text-xs text-center mt-12" style={{ color: '#B0A898' }}>
          To add or update a listing, contact{' '}
          <a href="mailto:info@gogmi.org.gh" className="hover:underline" style={{ color: '#8E3400' }}>
            info@gogmi.org.gh
          </a>
        </p>
      </div>
    </div>
  );
};

const ListingRow = ({ listing, featured }) => {
  const catLabel = CATEGORIES.find(c => c.id === listing.category)?.label;

  return (
    <div
      className="listing-row py-6 transition-colors cursor-default"
      style={{ backgroundColor: featured ? '#FDF9F0' : 'transparent' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
            <h3 className="dir-serif text-lg font-bold" style={{ color: '#132552' }}>
              {listing.name}
            </h3>
            {featured && (
              <span className="dir-sans text-xs font-medium px-2 py-0.5" style={{ backgroundColor: '#8E3400', color: 'white', borderRadius: '2px' }}>
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-3">
            <span className="dir-sans text-xs" style={{ color: '#8A7F70' }}>
              {listing.city}, {listing.country}
            </span>
            <span className="dir-sans text-xs" style={{ color: '#8A7F70', borderLeft: '1px solid #C8C0B0', paddingLeft: '1rem' }}>
              {catLabel}
            </span>
          </div>

          <p className="dir-sans text-sm leading-relaxed mb-4" style={{ color: '#3D3328', fontWeight: 300, maxWidth: '600px' }}>
            {listing.description}
          </p>

          <div className="flex flex-wrap gap-6">
            <a
              href={`tel:${listing.phone}`}
              className="dir-sans text-xs flex items-center gap-1.5 hover:underline"
              style={{ color: '#4A4035' }}
            >
              <Phone className="w-3 h-3 flex-shrink-0" style={{ color: '#8A7F70' }} />
              {listing.phone}
            </a>
            <a
              href={`mailto:${listing.email}`}
              className="dir-sans text-xs flex items-center gap-1.5 hover:underline"
              style={{ color: '#4A4035' }}
            >
              <Mail className="w-3 h-3 flex-shrink-0" style={{ color: '#8A7F70' }} />
              {listing.email}
            </a>
            <a
              href={`https://${listing.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="dir-sans text-xs flex items-center gap-1.5 hover:underline"
              style={{ color: '#8E3400' }}
            >
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
              {listing.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueBusinessDirectory;
