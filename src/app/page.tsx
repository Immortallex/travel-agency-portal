"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Globe, ShieldCheck, Clock, ArrowRight, Trophy, GraduationCap, Mic2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, []);

  const handleApplyNow = (path: string) => {
    if (!isLoggedIn) {
      router.push('/auth');
    } else {
      router.push(path);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* HERO SECTION - REPAIRED PICTURE */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[#0A192F] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1500835595353-b0ad2e58b912?q=80&w=2000&auto=format&fit=crop" 
            alt="Global Travel" 
            className="w-full h-full object-cover opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
            Secure Your <br /><span className="text-blue-500 underline decoration-white/10">Global Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Premium relocation services for Tech, Education, and Sports. Start your journey with FlyPath today.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {/* THIS LEADS TO SIGN UP (AUTH) AS REQUESTED */}
            <button 
              onClick={() => router.push('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all hover:-translate-y-1"
            >
              Begin Application
            </button>
            <button 
              onClick={() => router.push('/track')}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest border border-white/10 transition-all"
            >
              Track Progress
            </button>
          </div>
        </div>
      </section>

      {/* PATHWAYS - BLOCKS ACCESS IF NOT LOGGED IN */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic text-[#0A192F] tracking-tight">Relocation Pathways</h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Tech Relocation", path: "/apply/tech", icon: <Globe className="text-blue-600"/>, desc: "Software, Data, & IT relocation" },
            { title: "Education", path: "/apply/education", icon: <GraduationCap className="text-green-600"/>, desc: "Global Study & Scholarship programs" },
            { title: "Sports Relocation", path: "/apply/sports", icon: <Trophy className="text-purple-600"/>, desc: "Professional Athlete & Scout visas" },
          ].map((item) => (
            <div 
              key={item.title} 
              onClick={() => handleApplyNow(item.path)} 
              className="group p-12 border-2 border-slate-50 rounded-[3.5rem] bg-slate-50/50 hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                {item.icon}
              </div>
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black uppercase text-[#0A192F] tracking-tighter">{item.title}</h3>
              <p className="text-slate-500 mt-3 font-medium text-sm leading-relaxed">{item.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Start Now <ArrowRight size={14}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS STATS */}
      <section className="bg-[#0A192F] py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-6">
          <div className="text-center"><p className="text-5xl font-black text-blue-500 italic mb-2">98%</p><p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Success Rate</p></div>
          <div className="text-center"><p className="text-5xl font-black text-blue-500 italic mb-2">12+</p><p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Destinations</p></div>
          <div className="text-center"><p className="text-5xl font-black text-blue-500 italic mb-2">5k+</p><p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Applications</p></div>
          <div className="text-center"><p className="text-5xl font-black text-blue-500 italic mb-2">24/7</p><p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Global Support</p></div>
        </div>
      </section>
    </main>
  );
}