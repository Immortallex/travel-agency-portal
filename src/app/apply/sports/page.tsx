"use client";
import React, { useState } from 'react';
import { Trophy, Upload, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function SportsForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", user.id);
      
      const details = Object.fromEntries(formData.entries());
      details.category = "Sports";
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (err) { alert("Error submitting"); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white border rounded-[3rem] my-12 shadow-xl">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase"><Trophy className="text-blue-600"/> Athlete Relocation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col"><label className="text-[10px] font-bold ml-2">DOB</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold ml-2">GENDER</label><select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Male</option><option>Female</option></select></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold ml-2">SPORT</label><select name="sportType" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Football</option><option>Basketball</option><option>Athletics</option></select></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <input name="position" placeholder="Playing Position/Specialty" className="p-4 border rounded-2xl" required />
          <select name="country" className="p-4 border rounded-2xl" required>
            <option value="">Desired Country</option>
            <option>Spain</option><option>UK</option><option>Portugal</option><option>USA</option><option>France</option>
          </select>
        </div>
        <input name="club" placeholder="Current or Previous Club" className="w-full p-4 border rounded-2xl" required />
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