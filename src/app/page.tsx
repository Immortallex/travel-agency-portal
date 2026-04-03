"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Code, GraduationCap, Trophy, Users, MessageCircle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0A192F]">
      {/* ELITE HERO SECTION */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#0A192F]">
        <Image 
          src="https://unsplash.com" 
          alt="FlyPath Global" 
          fill 
          className="object-cover opacity-40 select-none"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter">
            FlyPath <span className="text-blue-500">Travels</span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Premium Global Relocation & Skill-Based Migration for Professionals, Athletes, and Humanitarian Cases.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-2xl flex items-center justify-center gap-2">
              Begin Application <ArrowRight size={20} />
            </Link>
            <Link href="/track" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Track ID Status
            </Link>
          </div>
        </div>
      </section>

      {/* HUMANITARIAN MISSION (Optimized for Mobile) */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image 
              src="https://unsplash.com" 
              alt="Humanitarian Pledge" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold inline-block mb-6 uppercase tracking-widest">
              <Shield size={16} className="inline mr-2" /> Humanitarian Pledge
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Relocating the Incapacitated</h2>
            <p className="text-lg text-slate-600 italic leading-relaxed mb-8 border-l-4 border-blue-600 pl-6 text-left">
              "We provide safe relocation for incapacitated individuals worldwide <strong>pro-bono</strong>. We do not collect fees for these cases."
            </p>
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me" target="_blank" className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 animate-bounce">
        <MessageCircle size={32} />
      </a>
    </main>
  );
}