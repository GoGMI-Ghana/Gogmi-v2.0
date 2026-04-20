import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

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
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#132552', borderBottom: '4px solid #8E3400' }} className="pt-28 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#93C5FD', textTransform: 'uppercase', marginBottom: '10px' }}>
            Gulf of Guinea Maritime Institute
          </p>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '10px' }}>
            Blue Business Directory
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.65)', marginBottom: '32px' }}>
            The Gulf of Guinea's register of maritime trade &amp; professional services
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '520px' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'rgba(255,255,255,0.35)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, service or country…"
              style={{
                width: '100%',
                paddingLeft: '42px',
                paddingRight: search ? '36px' : '16px',
                paddingTop: '13px',
                paddingBottom: '13px',
                backgroundColor: 'rgba(255,255,255,0.09)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '6px',
                color: 'white',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                outline: 'none',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '20px', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer' }}
              >×</button>
            )}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ backgroundColor: '#EBEDF0', borderBottom: '1px solid #D1D5DB' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '12px 0', scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    flexShrink: 0,
                    padding: '6px 16px',
                    borderRadius: '4px',
                    border: isActive ? '1px solid #132552' : '1px solid #C4C9D4',
                    backgroundColor: isActive ? '#132552' : 'white',
                    color: isActive ? 'white' : '#374151',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Meta row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: '#6B7280' }}>
            <strong style={{ color: '#111827', fontWeight: 600 }}>{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'listing' : 'listings'}
            {activeCategory !== 'all' && (
              <> · {CATEGORIES.find(c => c.id === activeCategory)?.label}</>
            )}
          </p>
          <a
            href="mailto:info@gogmi.org.gh?subject=Blue Business Directory — List My Business"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#8E3400', textDecoration: 'none' }}
          >
            List your business →
          </a>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '12px' }}>
              Featured
            </p>
            <div style={{ border: '1px solid #D1D5DB', borderRadius: '8px', overflow: 'hidden' }}>
              {featured.map((listing, i) => (
                <ListingRow key={listing.id} listing={listing} featured isLast={i === featured.length - 1} />
              ))}
            </div>
          </div>
        )}

        {/* All listings */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '12px' }}>
                All Listings
              </p>
            )}
            <div style={{ border: '1px solid #D1D5DB', borderRadius: '8px', overflow: 'hidden' }}>
              {regular.map((listing, i) => (
                <ListingRow key={listing.id} listing={listing} isLast={i === regular.length - 1} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', border: '1px solid #D1D5DB', borderRadius: '8px' }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', fontWeight: 700, color: '#132552', marginBottom: '8px' }}>
              No listings found
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7280' }}>
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '48px' }}>
          To add or update a listing, contact{' '}
          <a href="mailto:info@gogmi.org.gh" style={{ color: '#8E3400' }}>info@gogmi.org.gh</a>
        </p>
      </div>
    </div>
  );
};

const ListingRow = ({ listing, featured, isLast }) => {
  const catLabel = CATEGORIES.find(c => c.id === listing.category)?.label;

  return (
    <div style={{
      padding: '24px 28px',
      backgroundColor: featured ? '#FFFBEB' : 'white',
      borderBottom: isLast ? 'none' : '1px solid #E5E7EB',
      transition: 'background-color 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = featured ? '#FEF3C7' : '#F9FAFB'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = featured ? '#FFFBEB' : 'white'}
    >
      {/* Top row: name + badge */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '17px', fontWeight: 700, color: '#111827', margin: 0 }}>
          {listing.name}
        </h3>
        {featured && (
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            backgroundColor: '#8E3400',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '3px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Featured
          </span>
        )}
      </div>

      {/* Location + category */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#4B5563', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin style={{ width: '12px', height: '12px', color: '#9CA3AF' }} />
          {listing.city}, {listing.country}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#4B5563', paddingLeft: '16px', borderLeft: '1px solid #D1D5DB' }}>
          {catLabel}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: '#374151', lineHeight: 1.65, marginBottom: '16px', maxWidth: '620px' }}>
        {listing.description}
      </p>

      {/* Contact row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <a href={`tel:${listing.phone}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
          <Phone style={{ width: '13px', height: '13px', color: '#6B7280' }} />
          {listing.phone}
        </a>
        <a href={`mailto:${listing.email}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
          <Mail style={{ width: '13px', height: '13px', color: '#6B7280' }} />
          {listing.email}
        </a>
        <a href={`https://${listing.website}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#8E3400', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
          <ExternalLink style={{ width: '13px', height: '13px' }} />
          {listing.website}
        </a>
      </div>
    </div>
  );
};

export default BlueBusinessDirectory;
