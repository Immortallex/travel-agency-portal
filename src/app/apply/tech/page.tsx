"use client";
import React, { useState, useEffect } from 'react';
import { Code, Upload, Info, Loader2, Phone, Flag } from 'lucide-react';
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
      const data = Object.fromEntries(formDataObj.entries());
      const fileInput = formEl.querySelector('input[name="passport"]') as HTMLInputElement;
      
      const savedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const finalData = new FormData();
      if (fileInput.files) finalData.append("passport", fileInput.files[0]);
      finalData.append("userId", savedUser.id);
      finalData.append("techData", JSON.stringify(data));

      const res = await fetch('/api/apply/tech', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (error) { alert("Submission failed."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white border rounded-[3rem] shadow-xl my-12">
      <h2 className="text-3xl font-bold mb-8 text-[#0A192F] flex items-center gap-3"><Code className="text-blue-600" size={32} /> Tech Relocation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <input name="age" type="number" placeholder="Age" className="p-4 border rounded-2xl bg-slate-50" required />
          <select name="gender" className="p-4 border rounded-2xl bg-slate-50" required>
            <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
          </select>
          <input name="nationality" type="text" placeholder="Nationality" className="p-4 border rounded-2xl bg-slate-50" required />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative"><Phone className="absolute left-3 top-4 text-slate-400" size={18}/><input name="phone" type="tel" placeholder="Phone Number" className="w-full pl-10 p-4 border rounded-2xl" required /></div>
          <select name="country" className="p-4 border rounded-2xl bg-white" required>
            <option value="">Desired Country</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <textarea name="address" placeholder="Residential Address" className="w-full p-4 border rounded-2xl h-24" required />
        <input name="skill" type="text" placeholder="Primary Skill (e.g. Backend Dev)" className="w-full p-4 border rounded-2xl" required />
        <input name="portfolio" type="url" placeholder="GitHub / Portfolio Link" className="w-full p-4 border rounded-2xl" />
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-slate-400">Passport Data Page</label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
            <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
            <Upload className="mx-auto text-slate-300 mb-2" size={32} />
            <p className="text-sm font-bold text-slate-500">Click to upload Passport</p>
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-900 flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Apply & Pay ($69.99)"}
        </button>
      </form>
    </div>
  );
}