"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Upload, Loader2, ArrowRight, FileText } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function SportsForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('flypath_user')) router.push('/auth');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const formData = new FormData(e.currentTarget);
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("cv", formData.get("cv") as File);
      finalData.append("userId", user._id || user.id);
      
      const details = Object.fromEntries(formData.entries());
      delete details.passport; delete details.cv;
      details.category = "Sports";
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      if (!res.ok) throw new Error("Submission failed");
      const result = await res.json();
      const url = await createCryptoInvoice(result.applicationId);
      if (url) window.location.href = url;
    } catch (err) { alert("Error occurred."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <div className="bg-white p-10 border rounded-[3rem] shadow-xl">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]"><Trophy className="text-blue-600"/> Sports Relocation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Date of Birth</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
              <select name="sportType" className="p-4 border rounded-2xl bg-slate-50 mt-5" required><option value="">Sport Category</option><option>Football</option><option>Basketball</option></select>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <input name="height" placeholder="Height (cm)" className="p-4 border rounded-2xl bg-slate-50" required />
              <input name="weight" placeholder="Weight (kg)" className="p-4 border rounded-2xl bg-slate-50" required />
              <input name="position" placeholder="Playing Position" className="p-4 border rounded-2xl bg-slate-50" required />
            </div>
            <input name="club" placeholder="Current or Previous Club" className="w-full p-4 border rounded-2xl bg-slate-50" required />
            <input name="videoUrl" placeholder="Highlight Video Link (YouTube/Vimeo)" className="w-full p-4 border rounded-2xl bg-slate-50" required />
            <textarea name="achievements" placeholder="List your major sports achievements..." className="w-full p-4 border rounded-2xl h-32 bg-slate-50" required />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center relative"><input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required /><Upload className="mx-auto text-slate-300 mb-2" /><p className="text-[10px] font-bold text-slate-500 uppercase">Passport</p></div>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center relative"><input type="file" name="cv" className="absolute inset-0 opacity-0 cursor-pointer" required /><FileText className="mx-auto text-slate-300 mb-2" /><p className="text-[10px] font-bold text-slate-500 uppercase">Sports CV / Profile</p></div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-black text-xl flex justify-center items-center gap-2 shadow-lg">{loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight /></button>
          </form>
        </div>
      </div>
    </div>
  );
}