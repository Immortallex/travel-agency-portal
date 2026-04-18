"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Globe, Trophy, GraduationCap, Mic2, HeartHandshake, 
  Briefcase, MessageCircle, Users, Percent, MapPin, 
  Mail, Phone, ShieldCheck,
  // Using standard names that exist in Lucide
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('flypath_user'));
  }, []);

  const handlePathway = (path: string) => {
    if (isLoggedIn) {
      router.push(path); 
    } else {
      router.push('/auth');
    }
  };

  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0A192F]">
        <img src="/images/homepage.webp" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Home" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter">
            FlyPath <span className="text-blue-500">Travels</span>
          </h1>
          <div className="flex justify-center gap-4 mt-10">
            <button 
              onClick={() => router.push(isLoggedIn ? '/profile' : '/auth')} 
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Start Journey'}
            </button>
          </div>
        </div>
      </section>

      {/* PLEDGE SECTION */}
      <section className="relative py-24 overflow-hidden bg-[#0A192F]">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-20 rounded-[4rem] shadow-2xl text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-10 uppercase">
              The <span className="text-blue-500">Humanitarian</span> Pledge
            </h2>
            <p className="text-xl md:text-3xl text-slate-200 leading-relaxed font-light italic max-w-4xl mx-auto">
              At FlyPath Travels, we help the <span className="text-white font-bold underline decoration-blue-500 underline-offset-8">incapacitated individuals</span> seeking relocation and new living...
            </p>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="bg-[#0A192F] pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Registered Users", value: "14,200+", icon: <Users className="text-blue-500" /> },
            { label: "Success Rate", value: "91.4%", icon: <Percent className="text-blue-500" /> },
            { label: "Destinations Covered", value: "45 Countries", icon: <MapPin className="text-blue-500" /> }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h4 className="text-4xl font-black text-white mb-2">{stat.value}</h4>
              <p className="text-slate-400 uppercase text-xs font-bold tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PATHWAYS */}
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

      {/* FOOTER SECTION WITH UPDATED SOCIAL ICONS */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-blue-600 font-black uppercase tracking-widest text-sm flex items-center gap-2">
              <MapPin size={18} /> Physical Address
            </h4>
            <p className="text-slate-600 font-medium leading-relaxed">
              3897 Venture Place, Slave Lake<br />
              Alberta, Canada T0G 2B3
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-blue-600 font-black uppercase tracking-widest text-sm flex items-center gap-2">
              <MessageCircle size={18} /> Contact
            </h4>
            <div className="space-y-2">
              <a href="mailto:support@flypathtravels.com" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors italic">
                <Mail size={18} /> info@flypathtravels.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-blue-600 font-black uppercase tracking-widest text-sm flex items-center gap-2">
              <Globe size={18} /> Socials
            </h4>
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm text-slate-400 hover:text-blue-600 transition-all cursor-pointer">
                <InstagramIcon size={20} />
              </div>
              <div className="bg-white p-3 rounded-xl shadow-sm text-slate-400 hover:text-blue-400 transition-all cursor-pointer">
                <TwitterIcon size={20} />
              </div>
              <div className="bg-white p-3 rounded-xl shadow-sm text-slate-400 hover:text-blue-800 transition-all cursor-pointer">
                <FacebookIcon size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-100">
            <ShieldCheck className="text-blue-600" size={24} />
            <span className="text-blue-900 font-black uppercase tracking-tighter text-sm italic">
              Official FlyPath Travels Verification
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} FlyPath Travels.
          </p>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="#" className="fixed bottom-10 right-10 z-[9999] bg-[#25D366] p-5 rounded-2xl shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={30} className="text-white" />
      </a>
    </main>
  );
}