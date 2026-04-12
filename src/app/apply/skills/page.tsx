"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function SkillsForm() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    if (!user) router.push('/auth');
  }, [router]);

  // Visual Confirmation Logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const userId = user._id || user.id;
      const formData = new FormData(e.currentTarget);
      const finalData = new FormData();
      
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", userId);
      
      const details = Object.fromEntries(formData.entries());
      delete details.passport;
      details.category = "Skills";
      
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Submission failed.");

      const url = await createCryptoInvoice(result.applicationId);
      if (url) window.location.href = url;
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-24 px-6">
        <div className="p-8 border rounded-[2.5rem] shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 uppercase text-slate-800">
            <Briefcase size={24}/> Skill Acquisition
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Date of Birth</label>
                <input name="dob" type="date" className="p-4 border rounded-xl bg-slate-50 text-sm" required />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Primary Skill</label>
                <input name="skillType" placeholder="e.g. Welding, Nursing" className="p-4 border rounded-xl bg-slate-50 text-sm" required />
              </div>
            </div>

            <input name="experience" type="number" placeholder="Years of Experience" className="w-full p-4 border rounded-xl bg-slate-50 text-sm" required />
            
            <textarea 
              name="summary" 
              placeholder="Describe your vocational training and work history..." 
              className="w-full p-4 border rounded-xl bg-slate-50 text-sm h-32" 
              required 
            />
            
            {/* Visual File Confirmation UI */}
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center relative hover:border-blue-400 transition-colors">
              <input 
                type="file" 
                name="passport" 
                onChange={handleFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                required 
              />
              {fileName ? (
                <CheckCircle2 className="mx-auto text-green-500 mb-1 animate-pulse" />
              ) : (
                <Upload className="mx-auto text-slate-300 mb-1" />
              )}
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">
                {fileName ? `File Selected: ${fileName}` : "Upload Passport Data Page"}
              </p>
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-black text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 uppercase tracking-tighter"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Apply & Proceed ($69.99)"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}