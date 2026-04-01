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
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase italic">FlyPath Travels</h1>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-slate-200 font-light tracking-widest">
            ELITE RELOCATION & SKILL-BASED MIGRATION
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-full font-bold transition-all shadow-2xl">
              BEGIN APPLICATION
            </Link>
            <Link href="/track" className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
              TRACK ID
            </Link>
          </div>
        </div>
      </section>

      {/* THE PLEDGE SECTION */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src="https://unsplash.com" 
              alt="FlyPath Humanity" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-xs mb-6 uppercase tracking-widest">
              <Shield size={16} /> Humanitarian Pledge
            </div>
            <h2 className="text-4xl font-bold mb-6">Incapacitated Relocation</h2>
            <p className="text-lg text-slate-600 italic leading-relaxed mb-8">
              "At **FlyPath Travels**, we facilitate the safe relocation of incapacitated individuals 
              globally. This service is provided **entirely pro-bono**. We do not collect a 
              single dime for these humanitarian cases."
            </p>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <a 
        href="https://wa.me" 
        target="_blank" 
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all z-50 animate-bounce"
      >
        <MessageCircle size={32} />
      </a>
    </main>
  );
}
