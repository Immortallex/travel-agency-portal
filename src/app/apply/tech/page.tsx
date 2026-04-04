"use client";
import { Code, Globe, User, Phone, MapPin, Flag } from 'lucide-react';

export default function TechForm() {
  const countries = ["United Kingdom", "Canada", "USA", "Germany", "Australia", "UAE", "Others"];

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white border rounded-[3rem] shadow-xl my-12">
      <h2 className="text-3xl font-bold mb-8 text-[#0A192F] flex items-center gap-3">
        <Code className="text-blue-600" size={32} /> Tech Relocation Path
      </h2>
      
      <form className="space-y-6">
        {/* PERSONAL DATA */}
        <div className="grid md:grid-cols-3 gap-6">
          <input type="number" placeholder="Age" className="p-4 border rounded-2xl bg-slate-50" required />
          <select className="p-4 border rounded-2xl bg-slate-50" required>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="text" placeholder="Nationality" className="p-4 border rounded-2xl bg-slate-50" required />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative"><Phone className="absolute left-3 top-4 text-slate-400" size={18}/><input type="tel" placeholder="Phone Number" className="w-full pl-10 p-4 border rounded-2xl" required /></div>
          <div className="relative"><Flag className="absolute left-3 top-4 text-slate-400" size={18}/>
            <select className="w-full pl-10 p-4 border rounded-2xl bg-white" required>
              <option value="">Desired Country</option>
              {countries.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <textarea placeholder="Residential Address" className="w-full p-4 border rounded-2xl h-24" required />
        
        {/* TECH SPECIFIC */}
        <input type="text" placeholder="Primary Skill (e.g. Backend Dev)" className="w-full p-4 border rounded-2xl" required />
        <input type="url" placeholder="GitHub / Portfolio Link" className="w-full p-4 border rounded-2xl" />

        <button className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-900 transition shadow-lg">
          Proceed to Payment ($69.99)
        </button>
      </form>
    </div>
  );
}