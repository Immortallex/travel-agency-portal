"use client";
import React, { useState, useEffect } from 'react';
import { Trophy, Upload, Loader2, Activity } from 'lucide-react';
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
      const formData = new FormData(e.currentTarget);
      const savedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const finalData = new FormData();
      
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", savedUser.id);
      finalData.append("sportData", JSON.stringify(Object.fromEntries(formData.entries())));

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
          <div className="flex flex-col"><label className="text-[10px] font-bold">Date of Birth</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold">Gender</label><select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Male</option><option>Female</option></select></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold">Nationality</label><input name="nationality" type="text" className="p-4 border rounded-2xl bg-slate-50" required /></div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <select name="sportType" className="p-4 border rounded-2xl bg-blue-50 font-bold" required><option value="">Sport</option><option>Football</option><option>Basketball</option></select>
          <input name="position" type="text" placeholder="Position" className="p-4 border rounded-2xl" required />
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