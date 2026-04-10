"use client";
import React, { useState, useEffect } from 'react';
import { Trophy, Upload, Activity, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function SportsForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const countries = ["United Kingdom", "USA", "Spain", "Germany", "France", "Portugal", "UAE", "Others"];

  useEffect(() => {
    if (!localStorage.getItem('flypath_user')) router.push('/auth');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formEl = e.currentTarget;
      const fileInput = formEl.querySelector('input[name="passport"]') as HTMLInputElement;
      const savedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const finalData = new FormData();
      if (fileInput.files) finalData.append("passport", fileInput.files[0]);
      finalData.append("userId", savedUser.id);
      finalData.append("sportData", JSON.stringify(Object.fromEntries(new FormData(formEl).entries())));

      const res = await fetch('/api/apply/sports', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (error) { alert("Error."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-[3rem] shadow-2xl my-12">
      <h2 className="text-2xl font-black uppercase mb-8 border-b pb-4 flex items-center gap-3"><Trophy className="text-blue-600" /> Sports Relocation</h2>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input name="age" type="number" placeholder="Age" className="p-4 border rounded-2xl bg-slate-50" required />
          <select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Gender</option><option>Male</option><option>Female</option></select>
          <input name="nationality" type="text" placeholder="Nationality" className="p-4 border rounded-2xl bg-slate-50" required />
        </div>
        <select name="country" className="w-full p-4 border rounded-2xl" required>
          <option value="">Desired Country</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea name="address" placeholder="Full Address" className="w-full p-4 border rounded-2xl h-24" required />
        <div className="grid md:grid-cols-2 gap-4">
          <select name="sportType" className="p-4 border rounded-2xl bg-blue-50 font-bold" required><option value="">Select Sport</option><option>Football</option><option>Basketball</option></select>
          <input name="position" type="text" placeholder="Position" className="p-4 border rounded-2xl" required />
        </div>
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
          <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
          <Upload className="mx-auto text-slate-300 mb-2" size={32} />
          <p className="text-sm font-bold text-slate-500">Passport Upload</p>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-900 flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Apply & Pay ($69.99)"}
        </button>
      </form>
    </div>
  );
}