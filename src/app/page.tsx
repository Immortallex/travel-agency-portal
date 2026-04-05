"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Shield, Code, GraduationCap, Trophy, Users, MessageCircle, Mic2, Briefcase, Heart, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state (Simulated for this build)
  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    if (user) setIsLoggedIn(true);
  }, []);

  const pathways = [
    { name: 'Tech', icon: <Code />, path: '/apply/tech', img: '/images/tech.jpg' },
    { name: 'Education', icon: <GraduationCap />, path: '/apply/education', img: '/images/education.jpg' },
    { name: 'Sports', icon: <Trophy />, path: '/apply/sports', img: '/images/sports.jpg' },
    { name: 'Conference', icon: <Mic2 />, path: '/apply/conference', img: '/images/conference.jpg' },
    { name: 'Family', icon: <Users />, path: '/apply/family', img: '/images/family.jpg' },
    { name: 'Skills', icon: <Briefcase />, path: '/apply/skills', img: '/images/other-skills.jpg' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center bg-[#0A192F]">
        <Image src="/images/homepage.jpg" alt="FlyPath" fill className="object-cover opacity-40" priority />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-4">FlyPath <span className="text-blue-500">Travels</span></h1>
          <p className="text-lg md:text-2xl mb-10 font-light tracking-widest uppercase">Global Relocation & Migration</p>
          <Link href={isLoggedIn ? "/profile" : "/auth"} className="bg-blue-600 px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-blue-700 transition transform hover:scale-105 inline-block">
            {isLoggedIn ? "MY DASHBOARD" : "BEGIN JOURNEY"}
          </Link>
        </div>
      </section>

      {/* HUMANITARIAN PLEDGE */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <Heart size={48} className="mx-auto text-red-500 mb-6" fill="currentColor" />
          <h2 className="text-4xl font-bold text-[#0A192F] mb-8 uppercase tracking-tighter">Humanitarian Pledge</h2>
          <div className="bg-white p-12 rounded-[4rem] shadow-xl italic text-2xl text-slate-700">
            "At **FlyPath Travels**, we relocate incapacitated individuals globally **pro-bono**. No fees collected."
          </div>
        </div>
      </section>

      {/* PATHWAYS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h3 className="text-center text-3xl font-black mb-16 uppercase tracking-widest">Relocation Pathways</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pathways.map((item) => (
            <Link key={item.name} href={isLoggedIn ? item.path : "/auth"} className="group relative h-80 rounded-[3rem] overflow-hidden shadow-2xl">
              <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="mb-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl">{item.icon}</div>
                <p className="font-black text-3xl uppercase">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHATSAPP */}
      <a href="https://wa.me" target="_blank" className="fixed bottom-10 right-10 bg-[#25D366] p-5 rounded-full shadow-2xl z-50 animate-bounce">
        <MessageCircle className="text-white" size={32} />
      </a>
    </main>
  );
}