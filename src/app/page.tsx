import Image from 'next/image';
import Link from 'next/link';
import { Shield, Plane, Users, Code, GraduationCap, MessageCircle, Trophy } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0A192F]">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://unsplash.com" 
          alt="FlyPath Global Reach" 
          fill 
          className="object-cover brightness-[0.35]"
          priority
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase">FlyPath Travels</h1>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-slate-200 font-light tracking-wide">
            Elite relocation and skill-based migration for the world's most talented professionals.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-full font-bold transition-all shadow-xl">
              Apply Now
            </Link>
            <Link href="/track" className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
              Track Application
            </Link>
          </div>
        </div>
      </section>

      {/* THE HUMANITARIAN PLEDGE */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl transform -rotate-2">
            <Image 
              src="https://unsplash.com" 
              alt="Humanitarian Mission" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-xs mb-6 uppercase tracking-widest">
              <Shield size={16} /> Our Global Mission
            </div>
            <h2 className="text-4xl font-bold mb-6 text-[#0A192F]">Relocating the Incapacitated</h2>
            <p className="text-lg text-slate-600 italic leading-relaxed mb-8">
              "We believe mobility is a human right. FlyPath Travels facilitates the 
              safe relocation of incapacitated individuals worldwide entirely **pro-bono**. 
              We do not collect a single dime for these humanitarian cases. Our strength is our compassion."
            </p>
            <div className="p-6 bg-white rounded-2xl border border-blue-50 shadow-sm">
              <p className="text-sm font-bold text-blue-600 uppercase mb-2">Zero Fee Policy</p>
              <p className="text-slate-500 text-sm">We provide logistics, visa support, and medical coordination at no cost to the incapacitated applicant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILL PATHWAYS */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-16">Global Relocation Pathways</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'Tech', icon: <Code />, link: '/apply/tech' },
            { name: 'Education', icon: <GraduationCap />, link: '/apply/education' },
            { name: 'Sports', icon: <Trophy />, link: '/apply/sports' },
            { name: 'Family', icon: <Users />, link: '/apply/family' },
          ].map((path) => (
            <Link key={path.name} href={path.link} className="group p-8 border rounded-3xl hover:shadow-xl hover:border-blue-500 transition-all">
              <div className="mb-4 text-blue-600 group-hover:scale-110 transition-transform flex justify-center">
                {path.icon}
              </div>
              <p className="font-bold text-lg">{path.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <a 
        href="https://wa.me" 
        target="_blank" 
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all z-50"
      >
        <MessageCircle size={32} />
      </a>
    </main>
  );
}
