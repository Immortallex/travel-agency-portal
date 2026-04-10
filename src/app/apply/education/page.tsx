"use client";
import React, { useState, useEffect } from 'react';
import { GraduationCap, Upload, Loader2, Phone, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function EducationForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const countries = ["UK", "Canada", "Finland", "USA", "Australia", "Germany", "Others"];

  useEffect(() => {
    if (!localStorage.getItem('flypath_user')) router.push('/auth');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formEl = e.currentTarget;
      const fileInput = formEl.querySelector('input[name="passport"]') as HTMLInputElement;
      const savedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const finalData = new FormData();
      if (fileInput.files) finalData.append("passport", fileInput.files[0]);
      finalData.append("userId", savedUser.id);
      finalData.append("eduData", JSON.stringify(Object.fromEntries(new FormData(formEl).entries())));

      const res = await fetch('/api/apply/education', { method: 'POST', body: finalData });
      const result = await res.json();
      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (error) { alert("Error."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-[3rem] shadow-2xl my-12">
      <h2 className="text-2xl font-black mb-8 text-[#0A192F] flex items-center gap-3 uppercase"><GraduationCap className="text-blue-600" /> Education Relocation</h2>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input name="age" type="number" placeholder="Age" className="p-4 border rounded-2xl bg-slate-50" required />
          <select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option value="">Gender</option><option>Male</option><option>Female</option></select>
          <input name="nationality" type="text" placeholder="Nationality" className="p-4 border rounded-2xl bg-slate-50" required />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="phone" type="tel" placeholder="Phone Number" className="p-4 border rounded-2xl" required />
          <select name="country" className="p-4 border rounded-2xl bg-white" required>
            <option value="">Desired Country</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <textarea name="address" placeholder="Residential Address" className="w-full p-4 border rounded-2xl h-24" required />
        <div className="pt-4 border-t space-y-4">
          <input name="degree" type="text" placeholder="Highest Degree" className="w-full p-4 border rounded-2xl" required />
          <input name="institution" type="text" placeholder="Institution Name" className="w-full p-4 border rounded-2xl" required />
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