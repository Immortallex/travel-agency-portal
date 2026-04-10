"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Upload, Loader2, ArrowRight } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function EducationForm() {
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

      if (!userId) {
        alert("Session expired. Please sign in again.");
        return router.push('/auth');
      }

      const formData = new FormData(e.currentTarget);
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", userId);
      
      const details = Object.fromEntries(formData.entries());
      details.category = "Education";
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
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]"><GraduationCap className="text-blue-600"/> Education Relocation</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col"><label className="text-[10px] font-bold ml-2 uppercase text-slate-400">Date of Birth</label><input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required /></div>
              <select name="level" className="p-4 border rounded-2xl bg-slate-50 mt-5" required>
                <option value="">Intended Level of Study</option><option>Undergraduate</option><option>Postgraduate (MSc/MA)</option><option>Doctorate (PhD)</option><option>Diploma/Vocational</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input name="course" placeholder="Desired Course of Study" className="p-4 border rounded-2xl bg-slate-50" required />
              <select name="country" className="p-4 border rounded-2xl bg-slate-50" required>
                <option value="">Desired Country</option>
                <option>Canada</option><option>UK</option><option>Finland</option><option>Germany</option><option>USA</option><option>Australia</option>
              </select>
            </div>
            <input name="lastSchool" placeholder="Last Educational Institution Attended" className="w-full p-4 border rounded-2xl bg-slate-50" required />
            <input name="grade" placeholder="Current Grade/CGPA (e.g., 4.2/5.0)" className="w-full p-4 border rounded-2xl bg-slate-50" required />
            <textarea name="statement" placeholder="Brief Statement of Purpose (Why do you want to study this course?)" className="w-full p-4 border rounded-2xl h-32 bg-slate-50" required />
            
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative hover:bg-slate-50 transition">
              <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
              <Upload className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-500 uppercase">Upload International Passport</p>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl flex justify-center items-center gap-2 shadow-lg">
              {loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}