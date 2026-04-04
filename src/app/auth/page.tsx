"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/profile');
      } else {
        alert("Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      alert("System error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      <form onSubmit={handleAuth} className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl space-y-4">
        <h2 className="text-3xl font-black text-center uppercase mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {!isLogin && <input name="name" type="text" placeholder="Full Legal Name" className="w-full p-4 border rounded-xl bg-slate-50 outline-none" required />}
        <input name="email" type="email" placeholder="Email" className="w-full p-4 border rounded-xl bg-slate-50 outline-none" required />
        <input name="password" type="password" placeholder="Password" className="w-full p-4 border rounded-xl bg-slate-50 outline-none" required />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Login' : 'Create Account')}
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="w-full text-blue-600 text-sm font-bold mt-4 uppercase">
          {isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
        </button>
	
<div className="flex justify-between items-center mt-2 px-2">
  <button type="button" onClick={() => alert("Password reset link sent to your email (Simulated)")} className="text-xs text-slate-400 hover:text-blue-600 font-bold">
    FORGOT PASSWORD?
  </button>
</div>

      </form>
    </div>
  );
}