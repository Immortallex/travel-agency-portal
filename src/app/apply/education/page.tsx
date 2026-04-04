"use client";
import React from 'react';
import { GraduationCap, BookOpen, Flag, Phone } from 'lucide-react';

export default function EducationForm() {
  const countries = ["UK", "Canada", "Finland", "USA", "Australia", "Others"];

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-[3rem] shadow-2xl my-12">
      <h2 className="text-2xl font-black mb-8 text-[#0A192F] flex items-center gap-3 uppercase"><GraduationCap className="text-blue-600" /> Education Relocation</h2>
      <form className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input type="number" placeholder="Age" className="p-4 border rounded-2xl bg-slate-50" required />
          <select className="p-4 border rounded-2xl bg-slate-50"><option>Gender</option><option>Male</option><option>Female</option></select>
          <input type="text" placeholder="Nationality" className="p-4 border rounded-2xl bg-slate-50" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="tel" placeholder="Phone Number" className="p-4 border rounded-2xl" required />
          <select className="p-4 border rounded-2xl bg-white"><option>Desired Country</option>{countries.map(c => <option key={c}>{c}</option>)}</select>
        </div>

        <div className="pt-4 border-t">
          <input type="text" placeholder="Highest Degree Attained" className="w-full p-4 border rounded-2xl mb-4" required />
          <input type="text" placeholder="Institution Name" className="w-full p-4 border rounded-2xl" required />
        </div>

        <button className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl shadow-lg">Submit Application ($69.99)</button>
      </form>
    </div>
  );
}