import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [membershipId, setMembershipId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!membershipId.trim()) {
      setError('Please enter your Membership ID');
      return;
    }

    setLoading(true);

    const result = await login({ membershipId: membershipId.trim() });

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed. Please check your Membership ID and try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-black text-[#132552]">
          Member Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your Membership ID to access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="membershipId" className="block text-sm font-semibold text-gray-700">
                Membership ID
              </label>
              <div className="mt-1 relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="membershipId"
                  name="membershipId"
                  type="text"
                  required
                  value={membershipId}
                  onChange={(e) => { setMembershipId(e.target.value); setError(''); }}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8E3400] focus:border-[#8E3400]"
                  placeholder="e.g., GoGMI-MST2026-00001"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Your Membership ID was sent to your email after registration.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#8E3400] hover:bg-[#6B2700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E3400] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Not a member yet?{' '}
              <Link to="/membership" className="font-semibold text-[#8E3400] hover:text-[#6B2700]">
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
