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
    if (!storedUser) {
      router.push('/auth');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  // Logout only exists here now
  const handleLogout = () => {
    localStorage.removeItem('flypath_user');
    router.push('/auth');
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
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
          
          {/* PROFESSIONAL LOGOUT - ONLY ACCESSIBLE IN PROFILE */}
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center gap-3"
          >
            <LogOut size={18} /> Logout Session
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-[#0A192F] uppercase italic mb-8">Recent Activity</h3>
              
              <div className="mt-10 text-center py-10">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-4">You have no active relocation files</p>
                <button 
                  onClick={() => router.push('/#pathways')} // LEADS TO THE PATHWAY GRID
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all"
                >
                  Apply for a Pathway Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}