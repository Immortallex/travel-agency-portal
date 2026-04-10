"use client";
import React, { useState, useEffect } from 'react';
import { Users, Plus, Trash2, Upload, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function FamilyForm() {
  const [loading, setLoading] = useState(false);
  const [dependents, setDependents] = useState([{ name: '', relation: '', dob: '' }]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('flypath_user')) router.push('/auth');
  }, [router]);

  const addDependent = () => setDependents([...dependents, { name: '', relation: '', dob: '' }]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const savedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const finalData = new FormData();
      
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", savedUser.id);
      finalData.append("familyData", JSON.stringify({
        ...Object.fromEntries(formData.entries()),
        dependents
      }));

      const res = await fetch('/api/apply/family', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (error) { alert("Error."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-[3rem] shadow-2xl my-12">
      <h2 className="text-2xl font-black mb-8 text-[#0A192F] flex items-center gap-3 uppercase"><Users className="text-blue-600" /> Family Relocation</h2>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col"><label className="text-[10px] font-bold">DOB</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold">Gender</label><select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Male</option><option>Female</option></select></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold">Nationality</label><input name="nationality" type="text" className="p-4 border rounded-2xl bg-slate-50" required /></div>
        </div>
        <div className="mt-8 border-t pt-4">
          <p className="text-sm font-bold text-slate-500 uppercase mb-4">Family Members</p>
          {dependents.map((dep, index) => (
            <div key={index} className="flex gap-3 mb-4">
              <input placeholder="Name" className="flex-1 p-3 border rounded-xl" required onChange={(e) => {
                const n = [...dependents]; n[index].name = e.target.value; setDependents(n);
              }} />
              <input type="date" className="w-40 p-3 border rounded-xl" required onChange={(e) => {
                const n = [...dependents]; n[index].dob = e.target.value; setDependents(n);
              }} />
              <button type="button" onClick={() => setDependents(dependents.filter((_, i) => i !== index))} className="text-red-500"><Trash2 size={20}/></button>
            </div>
          ))}
          <button type="button" onClick={addDependent} className="text-blue-600 font-bold">+ Add Member</button>
        </div>
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
          <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
          <Upload className="mx-auto text-slate-300 mb-2" size={32} />
          <p className="text-sm font-bold text-slate-500">Upload Passport</p>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-900 flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Apply & Pay ($69.99)"}
        </button>
      </form>
    </div>
  );
}