"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, ArrowLeft, Mail, ShieldCheck } from 'lucide-react'; 

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    const formData = new FormData(e.currentTarget); 
    const payload = Object.fromEntries(formData);

    try {
      // Determine endpoint based on mode
      let endpoint = '/api/auth/login';
      if (authMode === 'signup') endpoint = '/api/auth/signup';
      if (authMode === 'forgot') endpoint = '/api/auth/forgot-password';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json(); 

      if (res.ok) {
        if (authMode === 'forgot') {
          setSuccessMsg(data.message || 'Reset link sent to your email.');
        } else {
          localStorage.setItem('flypath_user', JSON.stringify(data.user));
          router.push('/profile');
        }
      } else {
        // Specifically catch login failures to show your requested message
        if (authMode === 'login' && res.status === 401) {
          setError('Incorrect User Credentials');
        } else {
          setError(data.error || 'Authentication failed.'); 
        }
      }
    } catch (err) { 
      setError('Server connection failed.'); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          {authMode === 'forgot' && <ShieldCheck className="mx-auto text-blue-600 mb-2" size={40} />}
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            {authMode === 'login' && 'Login'}
            {authMode === 'signup' && 'Sign Up'}
            {authMode === 'forgot' && 'Reset Access'}
          </h2>
          {authMode === 'forgot' && <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Enter your email to receive a reset link</p>}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            // CORRECTION: name="fullName" now matches your User.ts schema
            <input name="fullName" placeholder="Full Name" className="w-full p-4 border rounded-2xl bg-slate-50 focus:outline-blue-600" required />
          )}
          
          <input name="email" type="email" placeholder="Email Address" className="w-full p-4 border rounded-2xl bg-slate-50 focus:outline-blue-600" required />
          
          {authMode !== 'forgot' && (
            <div className="space-y-2">
              <input name="password" type="password" placeholder="Password" className="w-full p-4 border rounded-2xl bg-slate-50 focus:outline-blue-600" required />
              {authMode === 'login' && (
                <div className="flex justify-end px-2">
                  <button 
                    onClick={() => setAuthMode('forgot')}
                    type="button" 
                    className="text-[10px] text-blue-600 font-black uppercase tracking-tighter hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Feedback Messages */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <Mail size={14} /> {successMsg}
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-blue-700 transition flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : (
              authMode === 'login' ? 'Login' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-6 text-center">
          {authMode === 'forgot' ? (
            <button onClick={() => setAuthMode('login')} className="text-xs text-slate-500 font-black uppercase flex items-center justify-center gap-2 mx-auto hover:text-blue-600 transition">
              <ArrowLeft size={14} /> Back to Login
            </button>
          ) : (
            <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-xs text-blue-600 font-black uppercase hover:underline">
              {authMode === 'login' ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}