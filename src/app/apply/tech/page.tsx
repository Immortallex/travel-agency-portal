"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Code2, Upload, Loader2, CheckCircle2, Globe } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function TechForm() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('flypath_user')) router.push('/auth');
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const formData = new FormData(e.currentTarget);
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", user._id || user.id);
      const details = Object.fromEntries(formData.entries());
      delete details.passport;
      details.category = "Tech";
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Save rejected");

      const url = await createCryptoInvoice(result.applicationId);
      if (url) window.location.href = url;
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-24 px-6">
        <div className="p-8 border rounded-[2.5rem] shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 uppercase text-slate-800"><Code2 size={24}/> Tech Pathway</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input name="dob" type="date" className="p-4 border rounded-xl bg-slate-50 text-sm" required />
              <input name="stack" placeholder="Primary Tech Stack" className="p-4 border rounded-xl bg-slate-50 text-sm" required />
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-xl bg-slate-50 text-sm">
              <Globe size={16} className="text-slate-400" />
              <input name="portfolio" placeholder="Portfolio/GitHub Link" className="bg-transparent outline-none w-full" required />
            </div>
            <textarea name="experience" placeholder="Briefly describe your professional tech journey..." className="w-full p-4 border rounded-xl bg-slate-50 text-sm h-32" required />
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center relative hover:border-blue-400 transition-colors">
              <input type="file" name="passport" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
              {fileName ? <CheckCircle2 className="mx-auto text-green-500 mb-1" /> : <Upload className="mx-auto text-slate-300 mb-1" />}
              <p className="text-xs font-bold text-slate-500 uppercase">{fileName || "Upload Passport Data Page"}</p>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 uppercase tracking-tight">
              {loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}