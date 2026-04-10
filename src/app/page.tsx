"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Code, GraduationCap, Trophy, Users, Mic2, Briefcase, Heart, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    if (user) setIsLoggedIn(true);
  }, []);

  const pathways = [
    { name: 'Tech', icon: <Code />, path: '/apply/tech', img: '/images/tech.webp' },
    { name: 'Education', icon: <GraduationCap />, path: '/apply/education', img: '/images/education.webp' },
    { name: 'Sports', icon: <Trophy />, path: '/apply/sports', img: '/images/sports.webp' },
    { name: 'Conference', icon: <Mic2 />, path: '/apply/conference', img: '/images/conference.webp' },
    { name: 'Family', icon: <Users />, path: '/apply/family', img: '/images/family.webp' },
    { name: 'Skills', icon: <Briefcase />, path: '/apply/skills', img: '/images/other-skills.webp' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/homepage.webp" 
          alt="FlyPath Travels" 
          fill 
          priority 
          className="object-cover brightness-[0.4]" 
        />
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 px-6 py-2 rounded-full mb-8">
            <ShieldCheck size={18} className="text-blue-400" />
            <span className="text-xs font-black uppercase tracking-widest">Certified Relocation Experts</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] italic uppercase">
            Your Global <br /><span className="text-blue-500">Gateway</span> Awaits.
          </h1>
          <p className="text-xl md:text-2xl font-medium text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional migration, education, and sports relocation services tailored for your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#pathways" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
              Start Application <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* PRO-BONO BANNER */}
      <section className="py-12 bg-[#0A192F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 border border-white/10 p-12 rounded-[4rem] shadow-xl italic text-2xl text-slate-300 text-center">
            "At <span className="text-white font-bold">FlyPath Travels</span>, we relocate incapacitated individuals globally <span className="text-blue-400 font-bold">pro-bono</span>. No fees collected."
          </div>
        </div>
      </section>

      {/* PATHWAYS SECTION */}
      <section id="pathways" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black uppercase tracking-widest mb-4">Relocation Pathways</h3>
          <div className="h-2 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pathways.map((item) => (
            <Link 
              key={item.name} 
              href={isLoggedIn ? item.path : "/auth"} 
              className="group relative h-96 rounded-[3.5rem] overflow-hidden shadow-2xl transition-transform hover:-translate-y-2"
            >
              <Image 
                src={item.img} 
                alt={item.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000 brightness-50" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="mb-6 bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-400 transition-all">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                <p className="font-black text-4xl uppercase tracking-tighter italic">{item.name}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-sm font-bold">
                  APPLY NOW <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black italic mb-6">FLYPATH</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
            Simplifying global mobility through technology and expert consultancy.
          </p>
          <div className="flex justify-center gap-8 text-sm font-bold text-[#0A192F] uppercase tracking-widest">
            <Link href="/track" className="hover:text-blue-600">Track Status</Link>
            <Link href="/auth" className="hover:text-blue-600">My Profile</Link>
            <Link href="#" className="hover:text-blue-600">Support</Link>
          </div>
          <p className="mt-12 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} FlyPath Travels & Relocations. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}