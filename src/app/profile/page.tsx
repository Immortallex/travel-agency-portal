"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, ShieldCheck, PlusCircle } from 'lucide-react';
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

  const handleLogout = () => {
    localStorage.removeItem('flypath_user');
    router.push('/auth');
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-[3.5rem] p-10 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black">
              {user.fullName?.[0] || 'U'}
            </div>
            <div>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">Welcome Back,</p>
              <h1 className="text-4xl font-black text-[#0A192F] italic tracking-tighter uppercase">{user.fullName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck size={16} className="text-green-500"/>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Verified Client Profile</span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* DASHBOARD CONTENT */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-[#0A192F] uppercase italic mb-8">Unfinished Applications</h3>
              <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No active relocation files found</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0A192F] p-8 rounded-[2.5rem] text-white">
              <h4 className="font-black uppercase italic mb-4">New Pathway</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">Ready to start a new journey? Select a pathway below.</p>
              <div className="grid grid-cols-1 gap-3">
                {['Tech', 'Education', 'Sports', 'Family'].map(item => (
                  <button 
                    key={item} 
                    onClick={() => router.push(`/apply/${item.toLowerCase()}`)}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-blue-600 transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    {item} Relocation <PlusCircle size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}