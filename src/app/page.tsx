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

  // Updated logic: Leads to Auth (Sign Up) if not logged in
  const handleMainCTA = () => {
    if (!isLoggedIn) {
      router.push('/auth');
    } else {
      router.push('/apply/tech'); // Default pathway if already logged in
    }
  };

  const handlePathwayGate = (path: string) => {
    if (!isLoggedIn) {
      router.push('/auth');
    } else {
      router.push(path);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* HERO SECTION - Verified Image Path */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[#0A192F] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1527672829621-f3f35c9f4317?q=80&w=2070&auto=format&fit=crop" 
            alt="Global Travel" 
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A192F]/40 to-[#0A192F]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">
            Seamless <span className="text-blue-500">Global</span> Relocation.
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
            Professional migration, education, and athlete relocation services. Secure your future with the most trusted travel agency.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleMainCTA}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl flex items-center gap-2"
            >
              Begin Application <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => router.push('/track')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all border border-white/20 flex items-center gap-2"
            >
              <Search size={20} /> Track Progress
            </button>
          </div>
        </div>
      </section>

      {/* PATHWAYS GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase italic text-[#0A192F]">Choose Your Pathway</h2>
          <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-sm">Only registered users can access applications</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Tech Relocation", path: "/apply/tech", icon: <Globe className="text-blue-600"/>, desc: "For Software Engineers & IT Professionals" },
            { title: "Education", path: "/apply/education", icon: <GraduationCap className="text-green-600"/>, desc: "Study abroad at top-tier universities" },
            { title: "Sports", path: "/apply/sports", icon: <Trophy className="text-purple-600"/>, desc: "For professional athletes and scouting" },
            { title: "Family", path: "/apply/family", icon: <ShieldCheck className="text-red-600"/>, desc: "Relocation for spouses and dependents" },
            { title: "Professional", path: "/apply/skills", icon: <Clock className="text-orange-600"/>, desc: "Nursing, Construction, and Skilled Trades" },
            { title: "Conference", path: "/apply/conference", icon: <Mic2 className="text-blue-400"/>, desc: "Event invitations and short-term visas" }
          ].map((item) => (
            <div 
              key={item.title} 
              onClick={() => handlePathwayGate(item.path)} 
              className="group p-8 border rounded-[2.5rem] bg-slate-50 cursor-pointer hover:bg-white hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-4 bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-black uppercase text-[#0A192F]">{item.title}</h3>
              <p className="text-slate-500 text-sm mt-2 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER STATS */}
      <section className="bg-slate-50 py-20 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          <div className="text-center border-r md:border-r border-slate-200 last:border-0">
            <p className="text-4xl font-black text-blue-600 italic">98%</p>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mt-1">Success Rate</p>
          </div>
          <div className="text-center border-r md:border-r border-slate-200 last:border-0">
            <p className="text-4xl font-black text-blue-600 italic">12+</p>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mt-1">Countries</p>
          </div>
          <div className="text-center border-r md:border-r border-slate-200 last:border-0">
            <p className="text-4xl font-black text-blue-600 italic">5k+</p>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mt-1">Active Users</p>
          </div>
          <div className="text-center last:border-0">
            <p className="text-4xl font-black text-blue-600 italic">24/7</p>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mt-1">Expert Support</p>
          </div>
        </div>
      </section>
    </main>
  );
}