"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Code, GraduationCap, Trophy, Users, MessageCircle, ArrowRight, Mic2, Briefcase } from 'lucide-react';

export default function HomePage() {
  const pathways = [
    { name: 'Tech', icon: <Code />, path: '/apply/tech', img: '/images/tech.jpeg' },
    { name: 'Education', icon: <GraduationCap />, path: '/apply/education', img: '/images/education.jpeg' },
    { name: 'Sports', icon: <Trophy />, path: '/apply/sports', img: '/images/sports.jpeg' },
    { name: 'Conference', icon: <Mic2 />, path: '/apply/conference', img: '/images/conference.jpeg' },
    { name: 'Family', icon: <Users />, path: '/apply/family', img: '/images/family.jpeg' },
    { name: 'Skills', icon: <Briefcase />, path: '/apply/skills', img: '/images/other-skills.jpeg' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0A192F]">
        <Image src="/images/homepage.jpeg" alt="Hero" fill className="object-cover opacity-30" priority />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-4">FlyPath Travels</h1>
          <p className="text-xl mb-8 font-light tracking-widest">GLOBAL RELOCATION & SKILL MIGRATION</p>
          <Link href="/auth" className="bg-blue-600 px-10 py-4 rounded-full font-bold shadow-2xl hover:bg-blue-700 transition">
            GET STARTED
          </Link>
        </div>
      </section>

      {/* PATHWAYS SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-tighter">Relocation Pathways</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pathways.map((item) => (
            <Link key={item.name} href="/auth" className="group relative h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500 brightness-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="mb-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl">{item.icon}</div>
                <p className="font-black text-2xl uppercase">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHATSAPP */}
      <a href="https://wa.me" className="fixed bottom-8 right-8 bg-[#25D366] p-5 rounded-full shadow-2xl z-50">
        <MessageCircle className="text-white" size={32} />
      </a>
    </main>
  );
}