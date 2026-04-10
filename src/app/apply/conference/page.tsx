"use client";
import React, { useState, useEffect } from 'react';
import { Mic2, Upload, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function ConferenceForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      finalData.append("confData", JSON.stringify(Object.fromEntries(formData.entries())));

      const res = await fetch('/api/apply/conference', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (error) { alert("Error."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white border rounded-[3rem] shadow-xl my-12">
      <h2 className="text-2xl font-black mb-8 text-[#0A192F] flex items-center gap-3 uppercase"><Mic2 className="text-blue-600" /> Conference Relocation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col"><label className="text-[10px] font-bold ml-2">DOB</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold ml-2">Gender</label><select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Select</option><option>Male</option><option>Female</option></select></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold ml-2">Nationality</label><input name="nationality" type="text" className="p-4 border rounded-2xl bg-slate-50" required /></div>
        </div>
        <input name="confName" type="text" placeholder="Conference Name" className="w-full p-4 border rounded-2xl" required />
        <textarea name="role" placeholder="Your Role at Conference" className="w-full p-4 border rounded-2xl h-24" required />
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