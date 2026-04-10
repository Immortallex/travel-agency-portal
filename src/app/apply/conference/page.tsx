"use client";
import React, { useState, useEffect } from 'react';
import { Mic2, Upload, Loader2, ArrowRight, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function ConferenceForm() {
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
      const formData = new FormData(e.currentTarget);
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", user.id || user._id);
      
      const details = Object.fromEntries(formData.entries());
      details.category = "Conference";
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (err) { alert("Submission failed."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white border rounded-[3rem] my-12 shadow-xl">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]"><Mic2 className="text-blue-600"/> Conference Relocation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col"><label className="text-xs font-bold mb-1 ml-2 text-slate-400">DATE OF BIRTH</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
          <div className="flex flex-col"><label className="text-xs font-bold mb-1 ml-2 text-slate-400">GENDER</label><select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Male</option><option>Female</option></select></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <input name="conferenceName" placeholder="Name of Conference" className="p-4 border rounded-2xl bg-slate-50" required />
          <select name="country" className="p-4 border rounded-2xl bg-slate-50" required>
            <option value="">Conference Location</option>
            <option>USA</option><option>United Kingdom</option><option>Canada</option><option>Germany</option><option>UAE</option><option>Others</option>
          </select>
        </div>
        <input name="invitationLink" placeholder="Link to Conference Website or Invitation" className="w-full p-4 border rounded-2xl bg-slate-50" required />
        <textarea name="roleDescription" placeholder="Describe your role or reason for attending" className="w-full p-4 border rounded-2xl h-24 bg-slate-50" required />
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
          <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
          <Upload className="mx-auto text-slate-300 mb-2" />
          <p className="text-sm font-bold text-slate-500">Upload International Passport</p>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight />
        </button>
      </form>
    </div>
  );
}