"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, ShieldCheck, Clock, Mail, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('flypath_user');
    // SECURITY GUARD: If no session exists, force login
    if (!storedUser) {
      router.push('/auth');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('flypath_user');
    router.push('/auth');
  };

  if (!user) return null; // Avoid flicker while redirecting

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-[3.5rem] p-10 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-200">
              <User size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-[#0A192F] uppercase italic tracking-tighter">{user.name}</h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 mt-1">
                <ShieldCheck size={14} className="text-green-500"/> Verified Client Profile
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center gap-3 shadow-sm"
          >
            <LogOut size={18} /> Logout Session
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-[#0A192F] p-8 rounded-[2.5rem] text-white">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Contact Details</h3>
              <div className="flex items-center gap-4 mb-4">
                <Mail className="text-blue-500" size={18} />
                <span className="text-sm font-bold opacity-80">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-[#0A192F] uppercase italic mb-8">Recent Activity</h3>
              
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-xl"><Clock className="text-blue-600" size={20}/></div>
                  <div>
                    <p className="font-black text-[#0A192F] uppercase text-sm">Account Created</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Session</p>
                  </div>
                </div>
                <ChevronRight className="text-slate-300" />
              </div>

              <div className="mt-10 text-center py-10">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-4">You have no active relocation files</p>
                <button 
                  onClick={() => router.push('/')}
                  className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline"
                >
                  Apply for a Pathway →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}