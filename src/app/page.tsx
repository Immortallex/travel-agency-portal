import Image from 'next/image';
import { Shield, Plane, Users, Code, GraduationCap } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0A192F]">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://unsplash.com" 
          alt="FlyPath Global Reach" 
          fill 
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl font-extrabold tracking-tight mb-4 uppercase">FlyPath Travels</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-slate-200 font-light">
            Global relocation and skill-based migration for the world's most talented individuals.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105">
            Begin Your Journey
          </button>
        </div>
      </section>

      {/* HUMANITARIAN DISPLAY */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://unsplash.com" 
              alt="Assisting Incapacitated" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-4">
              <Shield size={24} /> <span>THE FLYPATH PLEDGE</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Relocating the Incapacitated</h2>
            <p className="text-lg text-slate-600 italic leading-relaxed">
              "We believe mobility is a human right. FlyPath Travels facilitates the 
              safe relocation of incapacitated individuals worldwide entirely **pro-bono**. 
              We do not collect a single dime for these humanitarian cases."
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
