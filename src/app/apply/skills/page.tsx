"use client";
import React, { useState, useEffect } from 'react';
import { Briefcase, Phone, Globe, Upload, Loader2, Award, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function SkillsForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const countries = ["United Kingdom", "Canada", "Australia", "USA", "Germany", "Norway", "UAE", "Others"];

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
      finalData.append("passport", fileInput.files![0]);
      finalData.append("userId", savedUser.id);
      finalData.append("skillsData", JSON.stringify(Object.fromEntries(new FormData(formEl).entries())));

      const res = await fetch('/api/apply/skills', { method: 'POST', body: finalData });
      const result = await res.json();

      if (res.ok) {
        const url = await createCryptoInvoice(result.applicationId);
        if (url) window.location.href = url;
      }
    } catch (error) { alert("Error."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border rounded-[3rem] shadow-2xl my-12">
      <h2 className="text-2xl font-black mb-8 text-[#0A192F] flex items-center gap-3 uppercase">
        <Briefcase className="text-blue-600" /> Professional Skills Path
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input name="age" type="number" placeholder="Age" className="p-4 border rounded-2xl bg-slate-50" required />
          <select name="gender" className="p-4 border rounded-2xl bg-slate-50" required><option>Male</option><option>Female</option></select>
          <input name="nationality" type="text" placeholder="Nationality" className="p-4 border rounded-2xl bg-slate-50" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input name="phone" type="tel" placeholder="Phone Number" className="p-4 border rounded-2xl" required />
          <select name="country" className="p-4 border rounded-2xl bg-white" required>
            <option value="">Desired Country</option>
            {countries.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <input name="skill" type="text" placeholder="Primary Skill (e.g. Electrician, Chef)" className="w-full p-4 border rounded-2xl" required />
        <div className="relative">
          <Award className="absolute left-4 top-4 text-slate-400" size={18} />
          <input name="certs" type="text" placeholder="Professional Certifications" className="w-full pl-12 p-4 border rounded-2xl" />
        </div>

        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
          <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
          <Upload className="mx-auto text-slate-300 mb-2" size={32} />
          <p className="text-sm font-bold text-slate-500">Upload International Passport</p>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-900 transition flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Apply & Pay ($69.99)"}
          {!loading && <ArrowRight size={20} />}
        </button>
      </form>
    </div>
  );
}