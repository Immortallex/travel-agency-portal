"use client";
import Link from 'next/link';
import { Code, Users, GraduationCap, Trophy, Mic2 } from 'lucide-react';

export default function PathwaySelection() {
  const paths = [
    { name: "Tech Relocation", icon: <Code />, href: "/apply/tech" },
    { name: "Family Relocation", icon: <Users />, href: "/apply/family" },
    { name: "Education Relocation", icon: <GraduationCap />, href: "/apply/education" },
    { name: "Sports Relocation", icon: <Trophy />, href: "/apply/sports" },
    { name: "Conference Relocation", icon: <Mic2 />, href: "/apply/conference" }
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white uppercase text-center mb-12 italic">Choose Your Pathway</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {paths.map(p => (
            <Link key={p.href} href={p.href} className="bg-white p-8 rounded-[2.5rem] flex items-center gap-6 hover:scale-105 transition-transform">
              <div className="bg-blue-600 p-4 rounded-2xl text-white">{p.icon}</div>
              <span className="text-xl font-black uppercase text-[#0A192F]">{p.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}