"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Globe, ShieldCheck, Clock, ArrowRight, CheckCircle2, Search, Trophy, GraduationCap, Mic2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[#0A192F] overflow-hidden">
        <div className="absolute inset-0">
          {/* Using a verified image URL */}
          <img 
            src="https://images.unsplash.com/photo-1544015759-440530a8233f?q=80&w=2000&auto=format&fit=crop" 
            alt="Global Gateway" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Global <span className="text-blue-500">Relocation</span> Experts.
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button 
              onClick={() => router.push('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl flex items-center gap-2 transition-all"
            >
              Begin Application <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => router.push('/track')}
              className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all"
            >
              Track Progress
            </button>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black uppercase text-center mb-16 text-[#0A192F]">Relocation Pathways</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Tech Relocation", path: "/apply/tech", icon: <Globe className="text-blue-600"/> },
            { title: "Education", path: "/apply/education", icon: <GraduationCap className="text-green-600"/> },
            { title: "Sports", path: "/apply/sports", icon: <Trophy className="text-purple-600"/> },
          ].map((item) => (
            <div 
              key={item.title} 
              onClick={() => isLoggedIn ? router.push(item.path) : router.push('/auth')} 
              className="p-10 border-2 border-slate-50 rounded-[3rem] bg-slate-50 hover:bg-white hover:shadow-2xl cursor-pointer transition-all group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-black uppercase text-[#0A192F]">{item.title}</h3>
              <p className="text-slate-500 mt-2 font-bold uppercase text-[10px] tracking-widest">Login Required to Apply</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Stats */}
      <div className="bg-slate-50 py-16 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          <div className="text-center"><p className="text-4xl font-black text-blue-600 italic">98%</p><p className="text-[10px] font-bold uppercase text-slate-400">Success Rate</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600 italic">12+</p><p className="text-[10px] font-bold uppercase text-slate-400">Countries</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600 italic">5k+</p><p className="text-[10px] font-bold uppercase text-slate-400">Active Users</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600 italic">24/7</p><p className="text-[10px] font-bold uppercase text-slate-400">Support</p></div>
        </div>
      </div>
    </main>
  );
}