import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Mail, Phone, MapPin, Building2, Briefcase, CreditCard,
  CalendarClock, Award, ShieldCheck, ShieldAlert, ShieldQuestion, BookOpen, Clock,
} from 'lucide-react';

const STATUS_STYLES = {
  active: {
    label: 'Active',
    dot: 'bg-emerald-500',
    className: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
    Icon: ShieldCheck,
  },
  pending: {
    label: 'Pending',
    dot: 'bg-amber-500',
    className: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
    Icon: ShieldQuestion,
  },
  expired: {
    label: 'Expired',
    dot: 'bg-red-500',
    className: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20',
    Icon: ShieldAlert,
  },
  cancelled: {
    label: 'Cancelled',
    dot: 'bg-gray-400',
    className: 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-400/20',
    Icon: ShieldAlert,
  },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const { Icon } = s;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      {s.label} Member
    </span>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3.5 py-3.5">
    <div className="mt-0.5 w-10 h-10 rounded-xl bg-[#132552]/5 flex items-center justify-center flex-shrink-0">
      <Icon className="w-[18px] h-[18px]" style={{ color: '#132552' }} />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-[15px] font-semibold text-gray-800 truncate">{value || '—'}</p>
    </div>
  </div>
);

const formatDate = (d) => {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date)) return d;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
};

const daysRemaining = (expiry) => {
  if (!expiry) return null;
  const diff = new Date(expiry).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const MemberDashboard = () => {
  const { isAuthenticated, user, membership } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const initials = (user?.full_name || 'M')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');

  const remaining = daysRemaining(membership?.expiry_date);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header banner */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #132552 0%, #0c1a3d 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative max-w-5xl mx-auto px-6 pt-28 md:pt-36 pb-20 md:pb-24">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white flex-shrink-0 shadow-lg"
              style={{ backgroundColor: '#8E3400' }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-black text-white truncate">{user?.full_name}</h1>
              <p className="text-white/60 text-sm mt-1 mb-3">
                {membership?.plan_name || 'GoGMI Member'}
                {membership?.membership_id && (
                  <span className="text-white/40"> · {membership.membership_id}</span>
                )}
              </p>
              {membership?.status && <StatusBadge status={membership.status} />}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 md:-mt-12 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-7">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-1">Profile</h2>
            <div className="divide-y divide-gray-100">
              <InfoRow icon={Mail} label="Email" value={user?.email} />
              <InfoRow icon={Phone} label="Phone" value={user?.phone} />
              <InfoRow icon={MapPin} label="Country" value={user?.country} />
              <InfoRow icon={Building2} label="Organization" value={user?.organization} />
              <InfoRow icon={Briefcase} label="Position" value={user?.position} />
            </div>
          </div>

          {/* Membership details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-7">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-1">Membership</h2>
            <div className="divide-y divide-gray-100">
              <InfoRow icon={CreditCard} label="Membership ID" value={membership?.membership_id} />
              <InfoRow
                icon={Award}
                label="Type"
                value={membership?.membership_type ? membership.membership_type[0].toUpperCase() + membership.membership_type.slice(1) : null}
              />
              <InfoRow icon={CalendarClock} label="Expires" value={formatDate(membership?.expiry_date)} />
              {typeof remaining === 'number' && (
                <InfoRow
                  icon={Clock}
                  label="Time Remaining"
                  value={remaining > 0 ? `${remaining} day${remaining === 1 ? '' : 's'} left` : 'Expired'}
                />
              )}
            </div>
          </div>
        </div>

        {/* Certificate — not yet available */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100">
                <Award className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: '#132552' }}>Membership Certificate</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md">
                  Your official certificate is being prepared and will be available to download here once it's issued.
                </p>
              </div>
            </div>
            <button
              disabled
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-400 bg-gray-100 cursor-not-allowed whitespace-nowrap"
              title="Certificates are not yet available for download"
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Link
            to="/resources"
            className="flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl hover:border-[#8E3400]/30 transition-all group"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#132552' }}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold" style={{ color: '#132552' }}>My Resources</p>
              <p className="text-sm text-gray-500">Access member-only publications and briefs</p>
            </div>
          </Link>
          <Link
            to="/membership"
            className="flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl hover:border-[#8E3400]/30 transition-all group"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8E3400' }}>
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold" style={{ color: '#132552' }}>Manage Membership</p>
              <p className="text-sm text-gray-500">View plans, renew, or upgrade your membership</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
