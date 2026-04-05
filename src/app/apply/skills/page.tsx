"use client";
import React from 'react';
import Image from 'next/image';
import { Briefcase, Phone, Globe, MapPin, Award, CheckCircle, ArrowRight } from 'lucide-react';

export default function OtherSkillsForm() {
  const countries = [
    "United Kingdom", "Canada", "Australia", "United States", 
    "Germany", "Norway", "United Arab Emirates", "Others"
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* --- PROFESSIONAL HEADER IMAGE --- */}
        <div className="relative h-64 w-full">
          <Image 
            src="/images/other-skills.jpg" 
            alt="Other Skills Relocation" 
            fill 
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl mb-4">
              <Briefcase size={40} />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">Professional Skills Migration</h1>
            <p className="text-slate-200 text-sm mt-2 tracking-widest uppercase font-light">Global Labor & Expertise Program</p>
          </div>
        </div>

        {/* --- FORM CONTENT --- */}
        <div className="p-10 md:p-16">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-8">
            <CheckCircle size={16} /> Verified Professional Path
          </div>

          <form className="space-y-8">
            {/* PERSONAL DATA BLOCK */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Current Age</label>
                <input type="number" placeholder="e.g. 28" className="w-full p-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Gender Identity</label>
                <select className="w-full p-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" required>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-Binary</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Nationality</label>
                <input type="text" placeholder="As per Passport" className="w-full p-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
              </div>
            </div>

            {/* CONTACT & DESTINATION BLOCK */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                  <input type="tel" placeholder="+234..." className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Desired Country</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-4 text-slate-400" size={18} />
                  <select className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none" required>
                    <option value="">Select Destination</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ADDRESS BLOCK */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Current Residential Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                <textarea placeholder="House Number, Street, City, State" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24" required />
              </div>
            </div>

            {/* SKILL SPECIFIC DATA */}
            <div className="pt-8 border-t border-slate-100 grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Primary Skill / Trade</label>
                <input type="text" placeholder="e.g. Electrician, Chef, Logistics Manager" className="w-full p-4 border rounded-2xl bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Professional Certifications</label>
                <div className="relative">
                  <Award className="absolute left-4 top-4 text-slate-400" size={18} />
                  <input type="text" placeholder="List your key certificates" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>
            </div>

            {/* CTA BUTTON */}
            <button className="w-full bg-[#0A192F] text-white py-5 rounded-[2rem] font-bold text-xl hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group">
              Proceed to Crypto Checkout ($69.99)
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>

            <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest">
              Secure Submission Portal — FlyPath Travels 2026
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}