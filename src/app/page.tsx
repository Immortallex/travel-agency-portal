"use client";
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Code, 
  GraduationCap, 
  Trophy, 
  Users, 
  MessageCircle, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0A192F] selection:bg-blue-100">
      
      {/* --- HERO SECTION: Global Aviation & Professionalism --- */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#0A192F]">
        <Image 
          src="https://unsplash.com" 
          alt="Elite Global Aviation" 
          fill 
          className="object-cover opacity-40 select-none scale-105"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-block mb-6 px-4 py-1 border border-white/20 rounded-full backdrop-blur-md text-[10px] md:text-xs text-blue-400 font-bold tracking-[0.3em] uppercase">
            Licensed Global Relocation Partner
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
            FlyPath <span className="text-blue-500">Travels</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
            Premium relocation and skill-based migration for the world's most talented professionals and athletes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-2 group">
              Begin Application <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/track" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Track Status
            </Link>
          </div>
        </div>
      </section>

      {/* --- HUMANITARIAN PLEDGE SECTION --- */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 relative h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <Image 
              src="https://unsplash.com" 
              alt="Compassionate Care" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold inline-block mb-6 uppercase tracking-widest">
              <Shield size={16} className="inline mr-2" /> Humanitarian Pledge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0A192F]">Relocating the Incapacitated</h2>
            <p className="text-xl text-slate-600 italic leading-relaxed mb-8 border-l-4 border-blue-600 pl-6 bg-white p-6 rounded-r-3xl shadow-sm">
              "We facilitate the safe relocation of incapacitated individuals worldwide <strong>pro-bono</strong>. We do not collect a single dime for these humanitarian cases."
            </p>
            <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Zero Fees</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Global Support</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Medical Logistics</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- RELOCATION PATHWAYS SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase tracking-tighter">Relocation Pathways</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Tech', icon: <Code size={32} />, link: '/apply/tech', img: 'https://unsplash.com' },
            { name: 'Education', icon: <GraduationCap size={32} />, link: '/apply/education', img: 'https://unsplash.com' },
            { name: 'Sports', icon: <Trophy size={32} />, link: '/apply/sports', img: 'https://unsplash.com' },
            { name: 'Family', icon: <Users size={32} />, link: '/apply/family', img: 'https://unsplash.com' },
          ].map((item) => (
            <Link key={item.name} href={item.link} className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-500">
              <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.6]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-6">
                <div className="mb-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl">{item.icon}</div>
                <p className="font-black text-2xl uppercase tracking-widest">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- WHATSAPP FLOATING BUTTON --- */}
      <a 
        href="https://wa.me" 
        target="_blank" 
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 animate-bounce"
      >
        <MessageCircle size={36} />
      </a>
    </main>
  );
}