import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Plane, 
  Users, 
  Code, 
  GraduationCap, 
  MessageCircle, 
  Trophy,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0A192F]">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://unsplash.com" 
          alt="FlyPath Global Reach" 
          fill 
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="relative z-10 text-center text-white px-6">
          <div className="inline-block mb-6 px-4 py-1 border border-white/30 rounded-full backdrop-blur-sm text-sm tracking-widest uppercase">
            Global Migration Experts
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase italic">
            FlyPath <span className="text-blue-500">Travels</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-slate-300 font-light tracking-wide leading-relaxed">
            Specialized relocation and skill-based migration for the world's most talented professionals and athletes.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 px-12 py-5 rounded-full font-bold transition-all shadow-2xl flex items-center justify-center gap-2">
              Start Application <ArrowRight size={20} />
            </Link>
            <Link href="/track" className="bg-white/10 backdrop-blur-md border border-white/20 px-12 py-5 rounded-full font-bold hover:bg-white/20 transition-all flex items-center justify-center">
              Track Status
            </Link>
          </div>
        </div>
      </section>

      {/* --- HUMANITARIAN PLEDGE SECTION --- */}
      <section className="py-28 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <Image 
              src="https://unsplash.com" 
              alt="FlyPath Humanity" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-xs mb-8 uppercase tracking-widest">
              <Shield size={18} /> Humanitarian Pledge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Relocating the Incapacitated</h2>
            <p className="text-xl text-slate-600 italic leading-relaxed mb-10 border-l-4 border-blue-600 pl-6">
              "We believe mobility is a human right. FlyPath Travels facilitates the safe relocation of incapacitated individuals globally. This service is provided <strong>entirely pro-bono</strong>. We do not collect a single dime for these humanitarian cases."
            </p>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-50">
              <h4 className="font-bold text-blue-600 uppercase text-sm mb-2">Zero-Fee Commitment</h4>
              <p className="text-slate-500">Logistics, medical coordination, and visa support are fully covered by FlyPath for verified humanitarian cases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILL PATHWAYS --- */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Choose Your Pathway</h3>
          <p className="text-slate-500">Select a specialized relocation category to begin your process.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Technology', icon: <Code size={40} />, link: '/apply/tech', color: 'bg-blue-50' },
            { name: 'Education', icon: <GraduationCap size={40} />, link: '/apply/education', color: 'bg-purple-50' },
            { name: 'Sports', icon: <Trophy size={40} />, link: '/apply/sports', color: 'bg-orange-50' },
            { name: 'Family', icon: <Users size={40} />, link: '/apply/family', color: 'bg-green-50' },
          ].map((path) => (
            <Link key={path.name} href={path.link} className="group p-10 border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:border-blue-500 transition-all text-center">
              <div className={`mb-6 p-4 rounded-2xl inline-block ${path.color} text-[#0A192F] group-hover:scale-110 transition-transform`}>
                {path.icon}
              </div>
              <p className="font-black text-xl mb-2 uppercase">{path.name}</p>
              <p className="text-slate-400 text-sm">Professional Migration Path</p>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a 
        href="https://wa.me" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 animate-bounce"
      >
        <MessageCircle size={36} />
      </a>
    </main>
  );
}
