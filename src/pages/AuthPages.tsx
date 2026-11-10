import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, UserCheck, Lock, Mail, Phone, User as UserIcon } from 'lucide-react';

export const AuthPages: React.FC = () => {
  const { login, register, setCurrentPage, showToast } = useShop();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regStreet, setRegStreet] = useState('');
  const [regCity, setRegCity] = useState('Karachi');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const res = await login(loginEmail, loginPassword);
    setLoading(false);
    if (res.success) {
      if (loginEmail.toLowerCase().trim() === '19beeskicks@gmail.com') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    } else {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    setLoading(true);
    const res = await register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      address: {
        street: regStreet,
        city: regCity,
        postalCode: '00000'
      }
    });
    setLoading(false);
    if (res.success) {
      if (regEmail.toLowerCase().trim() === '19beeskicks@gmail.com') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    } else {
      setErrorMsg(res.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Brand Heading */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A5E] font-bold">
          19BeesKicks Atelier
        </span>
        <h1 className="text-3xl font-serif-luxury font-bold text-[#111111]">
          {mode === 'login' ? 'Client Sign In' : 'Create Client Account'}
        </h1>
        <p className="text-xs text-neutral-500">
          Access your footwear collection, orders, and VIP member benefits.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex border-b border-[#EEEEEC] text-xs uppercase tracking-widest font-bold">
        <button
          onClick={() => { setMode('login'); setErrorMsg(null); }}
          className={`flex-1 pb-3 text-center transition-colors cursor-pointer ${
            mode === 'login' ? 'border-b-2 border-[#111111] text-[#111111]' : 'text-neutral-400'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => { setMode('register'); setErrorMsg(null); }}
          className={`flex-1 pb-3 text-center transition-colors cursor-pointer ${
            mode === 'register' ? 'border-b-2 border-[#111111] text-[#111111]' : 'text-neutral-400'
          }`}
        >
          New Client Register
        </button>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs">
          {errorMsg}
        </div>
      )}

      {/* LOGIN FORM */}
      {mode === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-4 bg-white p-6 sm:p-8 border border-[#EEEEEC] shadow-sm">
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="client@19beeskicks.com"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] pl-9 pr-3 py-2 text-xs text-[#111111] outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] pl-9 pr-3 py-2 text-xs text-[#111111] outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] text-white py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      )}

      {/* REGISTER FORM */}
      {mode === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-4 bg-white p-6 sm:p-8 border border-[#EEEEEC] shadow-sm">
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={regName}
              onChange={e => setRegName(e.target.value)}
              placeholder="e.g. Asad Siddiqui"
              className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs text-[#111111] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                placeholder="asad@example.com"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs text-[#111111] outline-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={regPhone}
                onChange={e => setRegPhone(e.target.value)}
                placeholder="0321 0000000"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs text-[#111111] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs text-[#111111] outline-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={regConfirmPassword}
                onChange={e => setRegConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs text-[#111111] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-1">
              Address & City
            </label>
            <input
              type="text"
              value={regStreet}
              onChange={e => setRegStreet(e.target.value)}
              placeholder="House, Street, Area"
              className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs text-[#111111] outline-none mb-2"
            />
            <input
              type="text"
              value={regCity}
              onChange={e => setRegCity(e.target.value)}
              placeholder="City (e.g. Lahore)"
              className="w-full bg-[#F8F8F6] border border-[#EEEEEC] p-2 text-xs text-[#111111] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] text-white py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>
      )}

    </div>
  );
};
