import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Lock, Mail, ShieldCheck, ArrowRight, KeyRound, Coffee, CheckCircle } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onReturnToSite: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onReturnToSite }) => {
  const { login, updatePassword } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      onSuccess();
    } else {
      setErrorMessage(res.error || 'Invalid credentials');
    }
  };

  const handleFillDemo = () => {
    setEmail('owner@thedailybrew.com');
    setPassword('brewmaster2026');
    setErrorMessage('');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowResetModal(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FFF8F0] flex flex-col justify-center items-center p-4 relative overflow-hidden font-body selection:bg-[#D9B382]/30 selection:text-[#FFF8F0]">
      {/* Warm Ambient Radial Glows */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#6F4E37]/30 blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D9B382]/15 blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-md w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/15 p-2 shadow-xl mb-4 backdrop-blur-md">
            <img
              src={CAFE_DETAILS.logo}
              alt="The Daily Brew Logo"
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The Daily Brew CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#D9B382] mt-1">
            Owner & Administration Control Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 text-[#1E1E1E] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D9B382]/40 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6F4E37]">
              <ShieldCheck className="w-4 h-4 text-[#6F4E37]" aria-hidden="true" />
              <span>Owner Access</span>
            </div>
            <button
              onClick={onReturnToSite}
              className="text-xs text-gray-500 hover:text-[#6F4E37] font-medium transition-colors"
            >
              ← Back to Site
            </button>
          </div>

          {errorMessage && (
            <div
              className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-gray-700 mb-1">
                Owner Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" aria-hidden="true" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@thedailybrew.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-[#1E1E1E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="admin-password" className="block text-xs font-semibold text-gray-700">
                  Password *
                </label>
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-[11px] font-medium text-[#6F4E37] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" aria-hidden="true" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-[#1E1E1E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6F4E37] hover:bg-[#5A3F2C] text-[#FFF8F0] font-semibold text-sm shadow-md transition-all active:scale-98 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          {/* Quick Fill Demo Helper */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2 px-3 rounded-lg border border-[#D9B382]/40 bg-[#FFF8F0] hover:bg-[#D9B382]/20 text-[#6F4E37] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Fill Owner Credentials</span>
            </button>
            <p className="text-[11px] text-gray-500 mt-2">
              Pre-sets demo owner email & password for instant testing.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 The Daily Brew · Protected Owner Portal
        </p>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#1E1E1E] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold font-heading mb-2">Reset Password</h3>
            <p className="text-xs text-gray-600 mb-4">
              Enter your owner email to receive a password reset magic link.
            </p>

            {resetSent ? (
              <div className="py-4 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-gray-800">Reset Link Sent!</p>
                <p className="text-[11px] text-gray-500">Check your inbox for further instructions.</p>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="owner@thedailybrew.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm"
                />
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="px-3 py-1.5 text-xs text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-[#6F4E37] text-white rounded-lg"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
