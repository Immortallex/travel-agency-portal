"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // This simulates the backend call. Once your MONGODB_URI is in Vercel, 
    // we will connect this to a real API route.
    setTimeout(() => {
      setLoading(false);
      router.push('/profile'); // Redirect to profile after "success"
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 uppercase">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">Access the FlyPath Travels Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-4 text-slate-400" size={20} />
              <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-sm text-blue-600 font-bold"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}