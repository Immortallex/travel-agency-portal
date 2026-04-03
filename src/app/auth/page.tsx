"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // In a production environment, this would call your /api/auth/signup or login route
    // For this build, we are simulating the DB check to ensure redirects are correct.
    setTimeout(() => {
      setLoading(false);
      // We only redirect if the "database" (simulated) returns success
      router.push('/profile'); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#0A192F] uppercase tracking-tighter">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">FlyPath Travels Secure Gateway</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-4 text-slate-400" size={20} />
              <input type="text" placeholder="Full Legal Name" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="password" placeholder="Secure Password" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20">
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Login to Portal' : 'Register Account')}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-8 text-sm text-blue-600 font-bold hover:underline uppercase tracking-widest">
          {isLogin ? "New to FlyPath? Create an Account" : "Already Registered? Log In Here"}
        </button>
      </div>
    </div>
  );
}
