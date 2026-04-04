"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Code, GraduationCap, Trophy, Users, MessageCircle, Mic2, Briefcase, Heart } from 'lucide-react';

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
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0A192F]">
        <Image src="/images/homepage.jpeg" alt="Hero" fill className="object-cover opacity-40" priority />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-4">FlyPath Travels</h1>
          <p className="text-xl mb-8 font-light tracking-widest uppercase">Global Relocation & Professional Migration</p>
          <Link href="/auth" className="bg-blue-600 px-12 py-4 rounded-full font-bold shadow-2xl hover:bg-blue-700 transition transform hover:scale-105 inline-block">
            GET STARTED
          </Link>
        </div>
      </section>

      {/* HUMANITARIAN PLEDGE (Restored & Enhanced) */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6 text-blue-600">
            <Heart size={48} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-bold text-[#0A192F] mb-8 uppercase tracking-tighter">The FlyPath Humanitarian Pledge</h2>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-blue-100 relative overflow-hidden">
            <p className="text-xl leading-relaxed text-slate-700 italic relative z-10">
              "At **FlyPath Travels**, we facilitate the safe relocation of incapacitated individuals 
              globally. This service is provided **entirely pro-bono**. We do not collect 
              a single dime from those in need. Our mission is built on compassion and equity."
            </p>
          </div>
        </div>
      </section>

      {/* PATHWAYS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest">Relocation Pathways</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pathways.map((item) => (
            <Link key={item.name} href="/auth" className="group relative h-72 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="mb-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl">{item.icon}</div>
                <p className="font-black text-2xl uppercase tracking-widest">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me" target="_blank" className="fixed bottom-10 right-10 bg-[#25D366] p-5 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform">
        <MessageCircle className="text-white" size={32} />
      </a>
    </main>
  );
}