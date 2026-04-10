"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Upload, Loader2, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function FamilyForm() {
  const [loading, setLoading] = useState(false);
  const [dependents, setDependents] = useState([{ name: '', dob: '', relation: '' }]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('flypath_user')) router.push('/auth');
  }, [router]);

  const addMember = () => setDependents([...dependents, { name: '', dob: '', relation: '' }]);
  const removeMember = (index: number) => setDependents(dependents.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const userId = user._id || user.id;

      if (!userId) {
        alert("Session expired.");
        router.push('/auth');
        return;
      }

      const formData = new FormData(e.currentTarget);
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", userId);
      
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
    } catch (err) { alert("Submission error."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <div className="bg-white p-10 border rounded-[3rem] shadow-xl">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]"><Users className="text-blue-600"/> Family Relocation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 uppercase text-slate-400">Principal Applicant DOB</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
              <select name="country" className="p-4 border rounded-2xl bg-slate-50 mt-5" required>
                <option value="">Destination Country</option><option>Canada</option><option>UK</option><option>Australia</option><option>USA</option>
              </select>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <p className="text-[10px] font-black uppercase mb-4 text-slate-400 tracking-widest">Dependent Family Members</p>
              {dependents.map((dep, i) => (
                <div key={i} className="grid md:grid-cols-3 gap-3 mb-4 items-center">
                  <input placeholder="Full Name" className="p-3 border rounded-xl" required onChange={(e) => {
                    const newDeps = [...dependents]; newDeps[i].name = e.target.value; setDependents(newDeps);
                  }} />
                  <input type="date" className="p-3 border rounded-xl" required onChange={(e) => {
                    const newDeps = [...dependents]; newDeps[i].dob = e.target.value; setDependents(newDeps);
                  }} />
                  <div className="flex items-center gap-2">
                    <input placeholder="Relation" className="flex-1 p-3 border rounded-xl" required onChange={(e) => {
                      const newDeps = [...dependents]; newDeps[i].relation = e.target.value; setDependents(newDeps);
                    }} />
                    {i > 0 && <button type="button" onClick={() => removeMember(i)} className="text-red-500 p-2"><Trash2 size={20}/></button>}
                  </div>
                </div>
              ))}
              <button type="button" onClick={addMember} className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest"><Plus size={16}/> Add Member</button>
            </div>

            <input name="certificates" placeholder="Link to Marriage/Birth Certificates (Drive/Dropbox)" className="w-full p-4 border rounded-2xl bg-slate-50" required />

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
              <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
              <Upload className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-500 uppercase">Upload Principal Applicant's Passport</p>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl flex justify-center items-center gap-2 shadow-lg">
              {loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}