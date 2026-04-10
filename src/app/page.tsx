"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plane, 
  Globe, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  Search
} from 'lucide-react';
import Navbar from '@/components/Navbar'; // Ensure this matches your component path

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    if (user) setIsLoggedIn(true);
  }, []);

  const handleStartApplication = (path: string) => {
    if (!isLoggedIn) {
      router.push('/auth');
    } else {
      router.push(path);
    }
  };

  const pathways = [
    { title: "Tech Relocation", desc: "For developers and IT pros", path: "/apply/tech", icon: <Globe className="text-blue-500" /> },
    { title: "Education", desc: "Study abroad programs", path: "/apply/education", icon: <CheckCircle2 className="text-green-500" /> },
    { title: "Sports", desc: "For professional athletes", path: "/apply/sports", icon: <Plane className="text-purple-500" /> },
    { title: "Family", desc: "Relocate with loved ones", path: "/apply/family", icon: <ShieldCheck className="text-red-500" /> },
    { title: "Professional Skills", desc: "Nursing, Trades, & more", path: "/apply/skills", icon: <Clock className="text-orange-500" /> },
    { title: "Conferences", desc: "Short-term event visas", path: "/apply/conference", icon: <ArrowRight className="text-blue-400" /> }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A192F]">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/60 to-[#0A192F]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic">
            Your Global <br /><span className="text-blue-500">Gateway</span> Awaits.
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
            Professional migration, education, and sports relocation services tailored for your future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleStartApplication('/apply/tech')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
            >
              Start Application <ArrowRight size={20} />
            </button>
            <Link 
              href="/track"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all border border-white/20 flex items-center gap-2"
            >
              <Search size={20} /> Track Progress
            </Link>
          </div>
        </div>
      </section>

      {/* PATHWAYS GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase italic text-[#0A192F]">Choose Your Pathway</h2>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-sm">Select a category to begin your journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pathways.map((item, index) => (
            <div 
              key={index} 
              className="group p-8 border border-slate-100 rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all duration-500 cursor-pointer"
              onClick={() => handleStartApplication(item.path)}
            >
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black uppercase mb-3 text-[#0A192F] tracking-tighter">{item.title}</h3>
              <p className="text-slate-500 font-medium mb-6">{item.desc}</p>
              <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                Apply Now <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          {[
            { label: "Success Rate", val: "98%" },
            { label: "Countries", val: "12+" },
            { label: "Active Users", val: "5k+" },
            { label: "Support", val: "24/7" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-blue-600 italic mb-1">{stat.val}</div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A192F] py-16 px-6 text-center border-t border-white/5">
        <div className="flex justify-center items-center gap-2 mb-8">
          <Plane className="text-blue-500" />
          <span className="text-white font-black text-2xl uppercase tracking-tighter">FlyPath Travels</span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-8 max-w-md mx-auto">
          Licensed relocation agency specializing in seamless global transitions for professionals and families.
        </p>
        <div className="flex justify-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest mb-12">
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/contact" className="hover:text-white">Support</Link>
        </div>
        <p className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em]">
          &copy; 2026 FlyPath Travels. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}