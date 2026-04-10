"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Upload, Loader2, ArrowRight } from 'lucide-react';
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
      const userId = user._id || user.id;

      if (!userId) { router.push('/auth'); return; }

      const formData = new FormData(e.currentTarget);
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", userId);
      
      const details = Object.fromEntries(formData.entries());
      details.category = "Sports";
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
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]"><Trophy className="text-blue-600"/> Athlete Relocation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 uppercase text-slate-400">DOB</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 uppercase text-slate-400">Gender</label><select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Male</option><option>Female</option></select></div>
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 uppercase text-slate-400">Primary Sport</label><select name="sport" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Football</option><option>Basketball</option><option>Athletics</option><option>Combat Sports</option></select></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input name="position" placeholder="Specific Role/Position (e.g., Striker)" className="p-4 border rounded-2xl bg-slate-50" required />
              <select name="country" className="p-4 border rounded-2xl bg-slate-50" required>
                <option value="">Target Country</option>
                <option>Spain</option><option>UK</option><option>Portugal</option><option>France</option><option>USA</option>
              </select>
            </div>
            <input name="highlights" placeholder="Link to Highlight Reel (YouTube/Vimeo)" className="w-full p-4 border rounded-2xl bg-slate-50" required />
            <textarea name="achievements" placeholder="List major awards, previous clubs, or significant career milestones..." className="w-full p-4 border rounded-2xl h-32 bg-slate-50" required />
            
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
              <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
              <Upload className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-500 uppercase">Upload International Passport</p>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}