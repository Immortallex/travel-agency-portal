// src/app/auth/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react'; //

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Default to login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget); //
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup'; //
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json(); //

      if (res.ok) {
        // KEEP USER LOGGED IN: Save session to the browser
        localStorage.setItem('flypath_user', JSON.stringify(data.user));
        router.push('/profile');
      } else {
        setError(data.error || 'Authentication failed.'); //
      }
    } catch (err) {
      setError('Connection to FlyPath Servers failed.'); //
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      {/* Your Original Rounded Card Design */}
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl">
        <h2 className="text-3xl font-black text-center uppercase mb-8">
            {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-bold italic">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input name="name" type="text" placeholder="Full Legal Name" className="w-full p-4 border rounded-2xl bg-slate-50 outline-none focus:border-blue-600" required />
          )}
          <input name="email" type="email" placeholder="Email Address" className="w-full p-4 border rounded-2xl bg-slate-50 outline-none focus:border-blue-600" required />
          <input name="password" type="password" placeholder="Password" className="w-full p-4 border rounded-2xl bg-slate-50 outline-none focus:border-blue-600" required />
          
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 transition flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-xs text-blue-600 font-black uppercase tracking-tighter">
          {isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
}