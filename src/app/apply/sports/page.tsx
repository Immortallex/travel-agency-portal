"use client";
import React from 'react';
import { Trophy, Activity, Globe, Phone, MapPin, User } from 'lucide-react';

export default function SportsForm() {
  const countries = ["United Kingdom", "USA", "Spain", "Germany", "France", "Portugal", "UAE", "Others"];

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-[3rem] shadow-2xl my-12">
      <div className="flex items-center gap-3 mb-8 border-b pb-6 text-[#0A192F]">
        <Trophy className="text-blue-600" size={32} />
        <h1 className="text-2xl font-black uppercase">Sports Relocation Path</h1>
      </div>

      <form className="grid gap-6">
        {/* PERSONAL DATA */}
        <div className="grid md:grid-cols-3 gap-4">
          <input type="number" placeholder="Age" className="p-4 border rounded-2xl bg-slate-50 outline-none" required />
          <select className="p-4 border rounded-2xl bg-slate-50 outline-none" required>
            <option value="">Gender</option>
            <option>Male</option><option>Female</option>
          </select>
          <input type="text" placeholder="Nationality" className="p-4 border rounded-2xl bg-slate-50 outline-none" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative"><Phone className="absolute left-3 top-4 text-slate-400" size={18}/><input type="tel" placeholder="Phone Number" className="w-full pl-10 p-4 border rounded-2xl" required /></div>
          <select className="p-4 border rounded-2xl bg-white outline-none" required>
            <option value="">Desired Country</option>
            {countries.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <textarea placeholder="Full Residential Address" className="w-full p-4 border rounded-2xl h-24" required />

        {/* SPORTS STATS */}
        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
          <select className="p-4 border rounded-2xl bg-blue-50 font-bold" required>
            <option value="">Select Primary Sport</option>
            <option>Football</option><option>Basketball</option>
          </select>
          <input type="text" placeholder="Playing Position (e.g. Striker / Point Guard)" className="p-4 border rounded-2xl" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative"><Activity className="absolute left-3 top-4 text-slate-400" size={18}/><input type="text" placeholder="Height (e.g. 185cm / 6'1)" className="w-full pl-10 p-4 border rounded-2xl" required /></div>
          <input type="url" placeholder="Highlight Video Link (Optional)" className="p-4 border rounded-2xl" />
        </div>

        <button className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-900 transition shadow-lg">Proceed to Crypto Payment ($69.99)</button>
      </form>
    </div>
  );
}
