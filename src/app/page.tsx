"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Trophy, GraduationCap, Mic2, HeartHandshake, Briefcase, ArrowRight, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('flypath_user'));
  }, []);

  const handlePathway = (path: string) => {
    isLoggedIn ? router.push(path) : router.push('/auth');
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0A192F]">
        <img src="/images/homepage.webp" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Home" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter">FlyPath <span className="text-blue-500">Global</span></h1>
          <div className="flex justify-center gap-4 mt-10">
            <button onClick={() => router.push('/#pathways')} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl">Start Journey</button>
            <a href="https://wa.me/+234..." className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-2"><MessageCircle size={20}/> Support</a>
          </div>
        </div>
      </section>

{/* Humanitarian Pledge Section */}
<section className="bg-blue-900 text-white py-12 px-6 text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-4">Our Humanitarian Pledge</h2>
    <p className="text-lg opacity-90 leading-relaxed">
      At FlyPath Travels, we are committed to more than just logistics. 
      A portion of every application fee is dedicated to supporting 
      displaced families and educational grants for underprivileged students 
      globally. Your journey helps build a pathway for others.
    </p>
    <div className="mt-8">
      <span className="border border-white/30 px-4 py-2 rounded-full text-sm">
        Verified Impact Partner 2026
      </span>
    </div>
  </div>
</section>

      {/* STATS */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          <div className="text-center"><p className="text-4xl font-black text-blue-600">98%</p><p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Success Rate</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600">5k+</p><p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Active Users</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600">12+</p><p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Destinations</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600">24/7</p><p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Expert Help</p></div>
        </div>
      </section>

      {/* PATHWAY OPTIONS (The Landing ID is here) */}
      <section id="pathways" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Tech Relocation", path: "/apply/tech", img: "/images/tech.webp", icon: <Globe /> },
            { title: "Education", path: "/apply/education", img: "/images/education.webp", icon: <GraduationCap /> },
            { title: "Sports Relocation", path: "/apply/sports", img: "/images/sports.webp", icon: <Trophy /> },
            { title: "Family", path: "/apply/family", img: "/images/family.webp", icon: <HeartHandshake /> },
            { title: "Other Skills", path: "/apply/skills", img: "/images/other-skills.webp", icon: <Briefcase /> },
            { title: "Conference", path: "/apply/conference", img: "/images/conference.webp", icon: <Mic2 /> }
          ].map((item) => (
            <div key={item.title} onClick={() => handlePathway(item.path)} className="group relative h-80 rounded-[3rem] overflow-hidden cursor-pointer shadow-lg">
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">{item.icon}</div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}