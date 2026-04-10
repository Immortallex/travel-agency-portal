"use client";
import React, { useState } from 'react';
import { Users, Upload, Loader2, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function FamilyForm() {
  const [loading, setLoading] = useState(false);
  const [dependents, setDependents] = useState([{ name: '', dob: '', relation: '' }]);
  const router = useRouter();

  const addMember = () => setDependents([...dependents, { name: '', dob: '', relation: '' }]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", user.id);
      
      const details = Object.fromEntries(formData.entries());
      details.category = "Family";
      details.dependents = JSON.stringify(dependents);
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (err) { alert("Error."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-[3rem] my-12 shadow-xl">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]"><Users className="text-blue-600"/> Family Relocation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
           <div className="flex flex-col"><label className="text-[10px] font-bold ml-2">MY DOB</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
           <select name="maritalStatus" className="p-4 border rounded-2xl bg-slate-50 mt-4" required>
            <option value="">Marital Status</option><option>Married</option><option>Single Parent</option>
          </select>
          <select name="country" className="p-4 border rounded-2xl bg-slate-50 mt-4" required>
            <option value="">Desired Country</option>
            <option>Canada</option><option>UK</option><option>USA</option><option>Australia</option>
          </select>
        </div>

        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
          <p className="text-xs font-black uppercase mb-4 text-slate-400">Dependent Family Members</p>
          {dependents.map((dep, i) => (
            <div key={i} className="flex flex-wrap gap-3 mb-4 items-center">
              <input placeholder="Full Name" className="flex-1 p-3 border rounded-xl" required onChange={(e) => {
                const newDeps = [...dependents]; newDeps[i].name = e.target.value; setDependents(newDeps);
              }} />
              <input type="date" className="p-3 border rounded-xl" required onChange={(e) => {
                const newDeps = [...dependents]; newDeps[i].dob = e.target.value; setDependents(newDeps);
              }} />
              <button type="button" onClick={() => setDependents(dependents.filter((_, idx) => idx !== i))} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={20}/></button>
            </div>
          ))}
          <button type="button" onClick={addMember} className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"><Plus size={16}/> Add Family Member</button>
        </div>

        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
          <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
          <Upload className="mx-auto text-slate-300 mb-2" />
          <p className="text-sm font-bold text-slate-500">Upload Principal Applicant's Passport</p>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl flex justify-center items-center gap-2 shadow-lg">
          {loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight />
        </button>
      </form>
    </div>
  );
}