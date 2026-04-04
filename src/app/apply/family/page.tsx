"use client";
import React, { useState } from 'react';
import { Users, Plus, Trash2, Globe, Phone, MapPin } from 'lucide-react';

export default function FamilyForm() {
  const [dependents, setDependents] = useState([{ name: '', relation: '', age: '' }]);
  const countries = ["Canada", "Australia", "United Kingdom", "USA", "Ireland", "Others"];

  const addDependent = () => setDependents([...dependents, { name: '', relation: '', age: '' }]);
  const removeDependent = (index: number) => setDependents(dependents.filter((_, i) => i !== index));

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-[3rem] shadow-2xl my-12">
      <h2 className="text-2xl font-black mb-8 text-[#0A192F] flex items-center gap-3 uppercase"><Users className="text-blue-600" /> Family Relocation</h2>
      
      <form className="grid gap-6">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest border-b pb-2">Primary Applicant Details</p>
        <div className="grid md:grid-cols-3 gap-4">
          <input type="number" placeholder="Age" className="p-4 border rounded-2xl bg-slate-50" required />
          <select className="p-4 border rounded-2xl bg-slate-50"><option>Gender</option><option>Male</option><option>Female</option></select>
          <input type="text" placeholder="Nationality" className="p-4 border rounded-2xl bg-slate-50" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="tel" placeholder="Phone Number" className="p-4 border rounded-2xl" required />
          <select className="p-4 border rounded-2xl bg-white"><option>Desired Country</option>{countries.map(c => <option key={c}>{c}</option>)}</select>
        </div>

        {/* DEPENDENTS SECTION */}
        <div className="mt-8">
          <p className="text-sm font-bold text-slate-500 uppercase mb-4">Accompanying Family Members</p>
          {dependents.map((dep, index) => (
            <div key={index} className="flex gap-3 mb-4 animate-in slide-in-from-left-2 duration-300">
              <input type="text" placeholder="Name" className="flex-1 p-3 border rounded-xl" required />
              <select className="p-3 border rounded-xl bg-slate-50"><option>Relation</option><option>Spouse</option><option>Child</option></select>
              <input type="number" placeholder="Age" className="w-20 p-3 border rounded-xl" required />
              <button type="button" onClick={() => removeDependent(index)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={20}/></button>
            </div>
          ))}
          <button type="button" onClick={addDependent} className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 p-3 rounded-xl transition">
            <Plus size={20}/> Add Family Member
          </button>
        </div>

        <button className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl mt-6 shadow-xl">Complete Family Application ($69.99)</button>
      </form>
    </div>
  );
}