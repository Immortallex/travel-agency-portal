"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Trophy, GraduationCap, Mic2, HeartHandshake, Briefcase, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('flypath_user'));
  }, []);

  // ANTI-LOOP LOGIC
  const handlePathway = (path: string) => {
    if (isLoggedIn) {
      // If logged in, go to profile to see unfinished apps or start new
      router.push('/profile');
    } else {
      // If visitor, force sign-up
      router.push('/auth');
    }
  };

  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />
      
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0A192F]">
        <img src="/images/homepage.webp" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Home" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter">
            FlyPath <span className="text-blue-500">Global</span>
          </h1>
          <div className="flex justify-center gap-4 mt-10">
            {/* HERO BUTTON LOGIC */}
            <button 
              onClick={() => router.push(isLoggedIn ? '/profile' : '/auth')} 
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Start Journey'}
            </button>
          </div>
        </div>
      </section>

      {/* HUMANITARIAN PLEDGE */}
      <section className="relative py-24 overflow-hidden bg-[#0A192F]">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-20 rounded-[4rem] shadow-2xl text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-10 uppercase">
              The <span className="text-blue-500">Humanitarian</span> Pledge
            </h2>
            <p className="text-xl md:text-3xl text-slate-200 leading-relaxed font-light italic max-w-4xl mx-auto">
              At FlyPath Travels, we help the <span className="text-white font-bold underline decoration-blue-500 underline-offset-8">incapacitated individuals</span> seeking relocation and new living; we believe in a world without barriers...
            </p>
          </div>
        </div>
      </section>

      {/* PATHWAY GRID */}
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
            <div 
              key={item.title} 
              onClick={() => handlePathway(item.path)} 
              className="group relative h-80 rounded-[3rem] overflow-hidden cursor-pointer shadow-lg"
            >
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

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/..." className="fixed bottom-10 right-10 z-[9999] bg-[#25D366] p-5 rounded-2xl shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={30} className="text-white" />
      </a>
    </main>
  );
}