"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // CRITICAL: Pointing to the new non-conflicting API path
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Success: Redirect to the internal dashboard
        router.push('/admin/dashboard');
      } else {
        setError('Invalid Administrator Credentials');
        setPassword('');
      }
    } catch (err) {
      setError('System connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-white/10">
        <div className="text-center mb-10">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="text-red-600" size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Admin Access</h1>
          <p className="text-sm text-slate-400 mt-2">FlyPath Travels Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-pulse">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-300" size={20} />
            <input 
              type="text" 
              placeholder="Admin Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-300" size={20} />
            <input 
              type="password" 
              placeholder="Access Token" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Authenticate & Access"}
          </button>
        </form>
      </div>
    </div>
  );
}
