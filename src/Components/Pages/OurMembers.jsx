import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Building2, MapPin, ArrowRight, AlertCircle } from 'lucide-react';

const API_URL = 'https://api.gogmi.org.gh/api/members/public-list.php';

const MemberCard = ({ member }) => {
  const initials = (member.full_name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-[#8E3400]/20 transition-all">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
          style={{ backgroundColor: '#132552' }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-base truncate" style={{ color: '#132552' }}>{member.full_name}</h3>
          {member.position && <p className="text-sm text-gray-500 truncate">{member.position}</p>}
        </div>
      </div>
      <div className="mt-4 space-y-1.5">
        {member.organization && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <span className="truncate">{member.organization}</span>
          </div>
        )}
        {member.country && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <span className="truncate">{member.country}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-3 bg-gray-100 rounded w-2/3" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
    </div>
  </div>
);

const OurMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (cancelled) return;
        if (data.success) {
          setMembers(data.data || []);
        } else {
          setError(data.message || 'Could not load members.');
        }
      } catch {
        if (!cancelled) setError('Unable to connect to the server. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) =>
      [m.full_name, m.organization, m.position, m.country]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [members, query]);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #132552 0%, #0c1a3d 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-28 md:pt-36 pb-14 md:pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            Our Community
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl" style={{ letterSpacing: '-0.02em' }}>
            Meet the professionals shaping Gulf of Guinea maritime governance
          </h1>
          <p className="text-white/60 mt-4 max-w-xl text-base sm:text-lg">
            GoGMI members span government, navies, academia, and industry across the region and beyond.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 pb-20">
        {/* Search + CTA row */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, organization, or country"
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400]"
            />
          </div>
          <Link
            to="/membership"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:scale-105 whitespace-nowrap"
            style={{ backgroundColor: '#8E3400' }}
          >
            Join Them <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Results */}
        <div className="mt-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-semibold">
                {members.length === 0 ? 'No members to show yet.' : 'No members match your search.'}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 font-semibold mb-4">
                {filtered.length} member{filtered.length === 1 ? '' : 's'}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((m, idx) => (
                  <MemberCard key={idx} member={m} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurMembers;
