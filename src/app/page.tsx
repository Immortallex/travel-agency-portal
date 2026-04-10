"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Globe, ShieldCheck, Clock, ArrowRight, CheckCircle2, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, []);

  const handleGate = (path: string) => {
    if (!isLoggedIn) {
      router.push('/auth');
    } else {
      router.push(path);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Fixed Image */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0A192F]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2070" 
            alt="Travel" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A192F]"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic">Your Global Gateway</h1>
          <div className="flex justify-center gap-4">
            <button onClick={() => handleGate('/apply/tech')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase shadow-xl hover:bg-blue-700 transition">Start Application</button>
            <button onClick={() => router.push('/track')} className="bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase border border-white/20 backdrop-blur-md">Track Progress</button>
          </div>
        </div>
      </section>

      {/* Pathways Grid with Click Protection */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Tech Relocation", path: "/apply/tech", icon: <Globe className="text-blue-500"/> },
            { title: "Education", path: "/apply/education", icon: <CheckCircle2 className="text-green-500"/> },
            { title: "Sports", path: "/apply/sports", icon: <Plane className="text-purple-500"/> },
          ].map((item) => (
            <div key={item.title} onClick={() => handleGate(item.path)} className="p-8 border rounded-[2.5rem] bg-slate-50 cursor-pointer hover:shadow-xl transition">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-black uppercase">{item.title}</h3>
              <p className="text-slate-500 text-sm mt-2">Professional migration services tailored for you.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section You Liked */}
      <section className="bg-slate-50 py-20 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          <div className="text-center"><p className="text-4xl font-black text-blue-600 italic">98%</p><p className="text-[10px] font-bold uppercase text-slate-400">Success Rate</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600 italic">12+</p><p className="text-[10px] font-bold uppercase text-slate-400">Countries</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600 italic">5k+</p><p className="text-[10px] font-bold uppercase text-slate-400">Active Users</p></div>
          <div className="text-center"><p className="text-4xl font-black text-blue-600 italic">24/7</p><p className="text-[10px] font-bold uppercase text-slate-400">Support</p></div>
        </div>
      </section>
    </main>
  );
}