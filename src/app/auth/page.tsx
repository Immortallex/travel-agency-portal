import React from 'react';
import { Lock, Mail, User } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0A192F]">Welcome to FlyPath</h2>
          <p className="text-slate-500 mt-2">Please create an account with your real information to access application forms.</p>
        </div>

        <form className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Full Name (As on Passport)" 
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              required 
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              required 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="Create Secure Password" 
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              required 
            />
          </div>
          
          <button className="w-full bg-[#0A192F] text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition mt-4">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account? <span className="text-blue-600 font-semibold cursor-pointer">Log In</span>
        </p>
      </div>
    </div>
  );
}
