"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, LogOut, ShieldCheck, PlusCircle, Menu, X, 
  Search, Globe, GraduationCap, Trophy, HeartHandshake, Briefcase, Mic2 
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const pathways = [
    { name: 'Tech', icon: <Globe size={14}/>, path: 'tech' },
    { name: 'Education', icon: <GraduationCap size={14}/>, path: 'education' },
    { name: 'Sports', icon: <Trophy size={14}/>, path: 'sports' },
    { name: 'Family', icon: <HeartHandshake size={14}/>, path: 'family' },
    { name: 'Skills', icon: <Briefcase size={14}/>, path: 'skills' },
    { name: 'Conference', icon: <Mic2 size={14}/>, path: 'conference' }
  ];

  return (
    <main className="min-h-screen bg-slate-50 relative">
      <Navbar />

      {/* DASHBOARD HAMBURGER MENU */}
      <div className="fixed top-24 right-6 z-[60] md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-[#0A192F] text-white rounded-xl shadow-xl"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A192F] flex flex-col items-center justify-center gap-8 text-white p-10">
          <button onClick={() => {setIsMenuOpen(false); router.push('/profile')}} className="text-xl font-black uppercase italic tracking-widest">Dashboard</button>
          <button onClick={() => {setIsMenuOpen(false); router.push('/track')}} className="text-xl font-black uppercase italic tracking-widest">Track Status</button>
          <button onClick={handleLogout} className="text-xl font-black uppercase italic tracking-widest text-red-500">Logout</button>
          <button onClick={() => setIsMenuOpen(false)} className="mt-10 p-4 rounded-full border border-white/20"><X /></button>
        </div>
      )}

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* WELCOME HEADER */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/30">
              {user.fullName?.[0] || 'U'}
            </div>
            <div>
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-1">Authenticated Portal</p>
              <h1 className="text-3xl md:text-5xl font-black text-[#0A192F] italic tracking-tighter uppercase">{user.fullName}</h1>
              <div className="flex items-center gap-2 mt-2">
                <ShieldCheck size={16} className="text-green-500"/>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Verified Client Profile</span>
              </div>
            </div>
          </div>
          
          {/* DESKTOP MENU OPTIONS */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => router.push('/track')} className="bg-slate-50 text-slate-600 px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 flex items-center gap-2">
              <Search size={14}/> Track Status
            </button>
            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all">
              <LogOut size={14} /> Logout Session
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 md:p-12 rounded-[4rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-[#0A192F] uppercase italic mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-600 rounded-full" />
                Active Relocation Files
              </h3>
              <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No ongoing applications found</p>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-[#0A192F] p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
              <h4 className="text-lg font-black uppercase italic mb-6 tracking-tighter">Start New Pathway</h4>
              <div className="grid grid-cols-1 gap-4">
                {pathways.map(item => (
                  <button 
                    key={item.name} 
                    onClick={() => router.push(`/apply/${item.path}`)}
                    className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-blue-600 hover:translate-x-2 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-blue-500 group-hover:text-white">{item.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name} Relocation</span>
                    </div>
                    <PlusCircle size={16} className="opacity-40 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}