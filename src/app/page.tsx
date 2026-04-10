"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Globe, Trophy, GraduationCap, Mic2, ShieldCheck, Briefcase, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, []);

  const handlePathwayClick = (path: string) => {
    if (!isLoggedIn) {
      router.push('/auth');
    } else {
      router.push(path);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* HERO SECTION - Using homepage.webp */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[#0A192F] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/homepage.webp" 
            alt="FlyPath Global" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-[#0A192F]/20"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">
            Relocate <span className="text-blue-500">Without</span> Limits.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
            The premium portal for Tech, Education, and Sports relocation. Secure your visa and future today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => router.push('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl flex items-center gap-2"
            >
              Begin Application <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* PATHWAYS SECTION - Using your specific local webp images */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Tech Relocation", path: "/apply/tech", img: "/images/tech.webp", icon: <Globe /> },
            { title: "Education", path: "/apply/education", img: "/images/education.webp", icon: <GraduationCap /> },
            { title: "Sports", path: "/apply/sports", img: "/images/sports.webp", icon: <Trophy /> },
            { title: "Family", path: "/apply/family", img: "/images/family.webp", icon: <ShieldCheck /> },
            { title: "Other Skills", path: "/apply/skills", img: "/images/other-skills.webp", icon: <Briefcase /> },
            { title: "Conference", path: "/apply/conference", img: "/images/conference.webp", icon: <Mic2 /> }
          ].map((item) => (
            <div 
              key={item.title} 
              onClick={() => handlePathwayClick(item.path)} 
              className="group relative h-80 rounded-[3rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Background Image per pathway */}
              <img 
                src={item.img} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{item.title}</h3>
                <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-1">Start Application</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}