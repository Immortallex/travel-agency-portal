"use client";
import React, { useState, useEffect } from 'react';
import { Code, Upload, Loader2, Phone, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function TechForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const countries = ["United Kingdom", "Canada", "USA", "Germany", "Australia", "UAE", "Others"];

  useEffect(() => {
    if (!localStorage.getItem('flypath_user')) router.push('/auth');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formEl = e.currentTarget;
      const formDataObj = new FormData(formEl);
      const savedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      
      const finalData = new FormData();
      const passport = formDataObj.get("passport") as File;
      if (!passport || passport.size === 0) throw new Error("Passport required");

      finalData.append("passport", passport);
      finalData.append("userId", savedUser.id);
      // Clean data for the DB
      finalData.append("techData", JSON.stringify(Object.fromEntries(formDataObj.entries())));

      const res = await fetch('/api/apply/tech', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (error: any) { alert(error.message || "Submission failed"); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white border rounded-[3rem] shadow-xl my-12">
      <h2 className="text-3xl font-bold mb-8 text-[#0A192F] flex items-center gap-3"><Code className="text-blue-600" size={32} /> Tech Relocation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-1 col-span-1">
            <label className="text-[10px] font-bold uppercase ml-2 text-slate-400">Date of Birth</label>
            <input name="dob" type="date" className="w-full p-4 border rounded-2xl bg-slate-50" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase ml-2 text-slate-400">Gender</label>
            <select name="gender" className="w-full p-4 border rounded-2xl bg-slate-50" required>
              <option value="">Select</option><option>Male</option><option>Female</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase ml-2 text-slate-400">Nationality</label>
            <input name="nationality" type="text" placeholder="Country" className="w-full p-4 border rounded-2xl bg-slate-50" required />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative"><Phone className="absolute left-3 top-4 text-slate-400" size={18}/><input name="phone" type="tel" placeholder="Phone Number" className="w-full pl-10 p-4 border rounded-2xl" required /></div>
          <select name="country" className="p-4 border rounded-2xl bg-white" required>
            <option value="">Desired Country</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <textarea name="address" placeholder="Residential Address" className="w-full p-4 border rounded-2xl h-24" required />
        <input name="skill" type="text" placeholder="Primary Tech Skill" className="w-full p-4 border rounded-2xl" required />
        
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
          <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
          <Upload className="mx-auto text-slate-300 mb-2" size={32} />
          <p className="text-sm font-bold text-slate-500">Click to upload Passport</p>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-900 flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Apply & Pay ($69.99)"}
        </button>
      </form>
    </div>
  );
}