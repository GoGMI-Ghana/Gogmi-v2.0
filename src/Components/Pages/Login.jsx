import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, AlertCircle, Mail, ArrowLeft, RefreshCw } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendOTP, login } = useAuth();

  const [step, setStep] = useState('id'); // 'id' | 'otp'
  const [membershipId, setMembershipId] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpRefs = useRef([]);
  const from = location.state?.from?.pathname || '/dashboard';

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSendOTP = async (e) => {
    e?.preventDefault();
    setError('');
    if (!membershipId.trim()) { setError('Please enter your Membership ID'); return; }
    setLoading(true);
    const result = await sendOTP({ membershipId: membershipId.trim() });
    setLoading(false);
    if (result.success) {
      setMaskedEmail(result.maskedEmail);
      setStep('otp');
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } else {
      setError(result.error);
    }
  };

  const handleOtpChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError('');
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e?.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the full 6-digit code'); return; }
    setLoading(true);
    setError('');
    const result = await login({ membershipId: membershipId.trim(), otp: code });
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
         style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/GoGMI_PNG.png" alt="GoGMI" className="h-14 object-contain" />
        </div>
        <h2 className="text-center text-3xl font-black" style={{ color: '#132552' }}>
          Member Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {step === 'id' ? 'Enter your Membership ID to continue' : `Enter the 6-digit code sent to ${maskedEmail}`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* ── STEP 1: Membership ID ── */}
          {step === 'id' && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Membership ID
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={membershipId}
                    onChange={e => { setMembershipId(e.target.value); setError(''); }}
                    placeholder="e.g. GoGMI-MASO2026-00001"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400] text-sm"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Your Membership ID was sent to your email after registration.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: '#8E3400' }}
              >
                {loading ? 'Sending code…' : 'Send Login Code'}
              </button>
            </form>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3"
                     style={{ backgroundColor: '#FEF3EC' }}>
                  <Mail className="w-7 h-7" style={{ color: '#8E3400' }} />
                </div>
                <p className="text-sm text-gray-500">
                  A 6-digit code was sent to <span className="font-semibold text-gray-700">{maskedEmail}</span>
                </p>
              </div>

              {/* OTP boxes */}
              <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => otpRefs.current[idx] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all"
                    style={{
                      borderColor: digit ? '#8E3400' : '#D1D5DB',
                      color: '#132552',
                      fontSize: '1.5rem',
                    }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || otp.join('').length < 6}
                className="w-full py-3 px-4 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: '#132552' }}
              >
                {loading ? 'Verifying…' : 'Verify & Sign In'}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => { setStep('id'); setOtp(['','','','','','']); setError(''); }}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="w-4 h-4" /> Change ID
                </button>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={resendCooldown > 0 || loading}
                  className="flex items-center gap-1 font-semibold disabled:opacity-40"
                  style={{ color: '#8E3400' }}
                >
                  <RefreshCw className="w-4 h-4" />
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Not a member yet?{' '}
              <Link to="/membership" className="font-semibold hover:underline" style={{ color: '#8E3400' }}>
                Join GoGMI
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
