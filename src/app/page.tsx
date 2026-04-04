"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  Shield, 
  Code, 
  GraduationCap, 
  Trophy, 
  Users, 
  MessageCircle, 
  Mic2, 
  Briefcase, 
  Heart,
  ArrowRight 
} from 'lucide-react';

export default function HomePage() {
  const pathways = [
    { name: 'Tech', icon: <Code />, path: '/apply/tech', img: '/images/tech.jpeg' },
    { name: 'Education', icon: <GraduationCap />, path: '/apply/education', img: '/images/education.jpeg' },
    { name: 'Sports', icon: <Trophy />, path: '/apply/sports', img: '/images/sports.jpeg' },
    { name: 'Conference', icon: <Mic2 />, path: '/apply/conference', img: '/images/conference.jpeg' },
    { name: 'Family', icon: <Users />, path: '/apply/family', img: '/images/family.jpeg' },
    { name: 'Other Skills', icon: <Briefcase />, path: '/apply/skills', img: '/images/other-skills.jpeg' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* 3-LINE MENU NAVBAR */}
      <Navbar />

      {/* HERO SECTION: Uses local homepage.jpeg */}
      <section className="relative h-[95vh] flex items-center justify-center bg-[#0A192F]">
        <Image 
          src="/images/homepage.jpeg" 
          alt="FlyPath Background" 
          fill 
          style={{ objectFit: 'cover' }}
          className="opacity-40 mix-blend-overlay"
          unoptimized={true} 
          priority 
        />
        <div className="relative z-10 text-center text-white px-6 mt-10">
          <div className="inline-block mb-4 px-4 py-1 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">
            Global Relocation Experts
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-6 leading-none">
            FlyPath <span className="text-blue-500">Travels</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 font-light tracking-widest max-w-3xl mx-auto leading-relaxed">
            PREMIUM GLOBAL RELOCATION & PROFESSIONAL SKILL MIGRATION
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth" className="bg-blue-600 px-12 py-5 rounded-full font-black text-lg shadow-2xl hover:bg-blue-700 transition transform hover:scale-105 flex items-center justify-center gap-2 group">
              GET STARTED <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* HUMANITARIAN PLEDGE SECTION */}
      <section id="pledge" className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8 text-red-500">
            <Heart size={60} fill="currentColor" className="animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] mb-10 uppercase tracking-tighter">
            The FlyPath Humanitarian Pledge
          </h2>
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-blue-100 relative">
            <Shield className="absolute top-10 left-10 text-blue-100" size={120} />
            <p className="text-2xl md:text-3xl leading-relaxed text-slate-700 italic font-medium relative z-10">
              "At <span className="text-blue-600 font-black">FlyPath Travels</span>, we facilitate the safe relocation of incapacitated individuals 
              globally. This service is provided <span className="underline decoration-blue-500 decoration-4">entirely pro-bono</span>. We do not collect 
              a single dime from those in need. Our success is measured by the lives we touch."
            </p>
          </div>
        </div>
      </section>

      {/* RELOCATION PATHWAYS SECTION */}
      <section id="pathways" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h3 className="text-4xl font-black uppercase tracking-widest mb-4">Relocation Pathways</h3>
          <p className="text-slate-500 font-medium">Select your specialized category to begin your secure application.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pathways.map((item) => (
            <Link key={item.name} href="/auth" className="group relative h-80 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transition-all hover:shadow-blue-500/20">
              <Image 
                src={item.img} 
                alt={item.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-50"
                unoptimized={true}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <div className="mb-6 bg-white/20 backdrop-blur-xl p-5 rounded-3xl group-hover:bg-blue-600 transition-colors">
                  {item.icon}
                </div>
                <p className="font-black text-3xl uppercase tracking-tighter">{item.name}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  Apply Now <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-6 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.3)] z-50 hover:scale-110 transition-transform active:scale-95"
      >
        <MessageCircle size={36} fill="currentColor" />
      </a>
    </main>
  );
}