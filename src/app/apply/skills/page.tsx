"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Upload, Loader2, ArrowRight, FileText } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function SkillsForm() {
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
      details.category = "Other";
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      if (!res.ok) throw new Error("Submission failed");
      const result = await res.json();
      const url = await createCryptoInvoice(result.applicationId);
      if (url) window.location.href = url;
    } catch (err) { alert("An error occurred."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <div className="bg-white p-10 border rounded-[3rem] shadow-xl">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]"><Briefcase className="text-blue-600"/> Skills Relocation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Date of Birth</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
              <input name="skillName" placeholder="Your Primary Skill (e.g., Nursing, Carpentry)" className="p-4 border rounded-2xl bg-slate-50 mt-5" required />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input name="experience" placeholder="Years of Active Practice" type="number" className="p-4 border rounded-2xl bg-slate-50" required />
              <select name="targetCountry" className="p-4 border rounded-2xl bg-slate-50" required>
                <option value="">Preferred Destination</option><option>Canada</option><option>UK</option><option>Germany</option><option>UAE</option>
              </select>
            </div>
            <input name="certifications" placeholder="Major Certifications or Licenses" className="w-full p-4 border rounded-2xl bg-slate-50" required />
            <textarea name="workHistory" placeholder="Briefly list your recent workplaces or major projects..." className="w-full p-4 border rounded-2xl h-32 bg-slate-50" required />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center relative"><input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required /><Upload className="mx-auto text-slate-300 mb-2" /><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Passport</p></div>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center relative"><input type="file" name="cv" className="absolute inset-0 opacity-0 cursor-pointer" required /><FileText className="mx-auto text-slate-300 mb-2" /><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Professional CV</p></div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-black text-xl flex justify-center items-center gap-2 shadow-lg">{loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight /></button>
          </form>
        </div>
      </div>
    </div>
  );
}