"use client";
import { Briefcase, Award, Clock } from 'lucide-react';

export default function OtherSkillsForm() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border rounded-3xl shadow-sm my-12">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-[#0A192F]"><Briefcase className="text-blue-600" /> Professional Skill Migration</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Primary Profession/Skill" className="w-full p-4 border rounded-xl" required />
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Years of Experience" className="w-full p-4 border rounded-xl" required />
          <select className="w-full p-4 border rounded-xl bg-slate-50"><option>Beginner</option><option>Intermediate</option><option>Advanced/Expert</option></select>
        </div>
        <input type="text" placeholder="List Major Certifications" className="w-full p-4 border rounded-xl" />
        <button className="w-full bg-[#0A192F] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg">Proceed to Crypto Payment ($69.99)</button>
      </form>
    </div>
  );
}