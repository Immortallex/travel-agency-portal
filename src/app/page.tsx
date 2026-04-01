import React from 'react';
import { Shield, Plane, Users, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0A192F] py-20 px-6 text-center text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            FlyPath <span className="text-blue-400">Travels</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Your global partner for professional relocation, skill-based migration, and compassionate travel solutions.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition">
              Get Started
            </button>
            <button className="border border-slate-500 hover:bg-slate-800 px-8 py-3 rounded-lg font-semibold transition">
              Our Services
            </button>
          </div>
        </div>
      </section>

      {/* --- THE MISSION DISPLAY (Incapacitated Relocation) --- */}
      <section className="bg-slate-50 py-16 px-6 border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4 text-blue-600">
            <Shield size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-bold text-[#0A192F] mb-6">The FlyPath Humanitarian Pledge</h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
            <p className="text-lg leading-relaxed text-slate-700 italic">
              "At **FlyPath Travels**, we are dedicated to helping people who are 
              incapacitated to relocate safely and with dignity. We provide our 
              expertise and logistical support for these cases **without collecting 
              a single dime** from the applicants. Our mission is to ensure no one 
              is left behind due to physical limitations."
            </p>
          </div>
        </div>
      </section>

      {/* --- SKILL CATEGORIES PREVIEW --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-12">Specialized Relocation Paths</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Tech & Engineering', icon: <Award /> },
            { title: 'Education & Research', icon: <Users /> },
            { title: 'Sports (Football/Basketball)', icon: <Plane /> },
          ].map((item, index) => (
            <div key={index} className="p-6 border rounded-xl hover:shadow-md transition cursor-pointer">
              <div className="mb-4 flex justify-center text-blue-600">{item.icon}</div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-slate-500">Secure your future with our expert visa and relocation assistance.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
