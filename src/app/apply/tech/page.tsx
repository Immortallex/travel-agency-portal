"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Code, Upload, Loader2, ArrowRight, FileText, Globe } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function TechForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    if (!user) router.push('/auth');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const userId = user._id || user.id;
      const formData = new FormData(e.currentTarget);
      const finalData = new FormData();
      
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("cv", formData.get("cv") as File); 
      finalData.append("userId", userId);
      
      const details = Object.fromEntries(formData.entries());
      delete details.passport; delete details.cv;
      details.category = "Tech";
      
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      if (!res.ok) throw new Error("Submission failed. Check all fields.");

      const result = await res.json();
      const url = await createCryptoInvoice(result.applicationId);
      if (url) window.location.href = url;
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <div className="bg-white p-10 border rounded-[3rem] shadow-xl">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]"><Code className="text-blue-600"/> Tech Relocation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Date of Birth</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Gender</label><select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Male</option><option>Female</option></select></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input name="stack" placeholder="Tech Stack (e.g. Fullstack, DevOps)" className="p-4 border rounded-2xl bg-slate-50" required />
              <input name="experience" placeholder="Years of Experience" type="number" className="p-4 border rounded-2xl bg-slate-50" required />
            </div>
            <input name="portfolio" placeholder="Portfolio or GitHub Link" className="w-full p-4 border rounded-2xl bg-slate-50" required />
            <textarea name="projects" placeholder="Describe your key technical achievements..." className="w-full p-4 border rounded-2xl h-32 bg-slate-50" required />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center relative hover:bg-slate-50"><input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required /><Upload className="mx-auto text-slate-300 mb-2" /><p className="text-[10px] font-bold text-slate-500 uppercase">Passport</p></div>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center relative hover:bg-slate-50"><input type="file" name="cv" className="absolute inset-0 opacity-0 cursor-pointer" required /><FileText className="mx-auto text-slate-300 mb-2" /><p className="text-[10px] font-bold text-slate-500 uppercase">Professional CV</p></div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-black text-xl flex justify-center items-center gap-2 shadow-lg">
              {loading ? <Loader2 className="animate-spin" /> : "Apply & Pay ($69.99)"} <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}