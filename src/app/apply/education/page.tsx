"use client";
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Upload, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function EducationForm() {
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
      details.category = "Education";
      finalData.append("formData", JSON.stringify(details));
      const res = await fetch('/api/apply/submit', { method: 'POST', body: finalData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      const url = await createCryptoInvoice(result.applicationId);
      if (url) window.location.href = url;
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <div className="bg-white p-10 border rounded-[3rem] shadow-xl">
          <h2 className="text-3xl font-black flex items-center gap-3 uppercase text-[#0A192F] mb-8">
            <GraduationCap className="text-blue-600"/> Academic Relocation
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Name" className="p-4 border rounded-2xl bg-slate-50" required />
              <input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input name="highestQualification" placeholder="Highest Qualification (e.g. BSc, MSc)" className="p-4 border rounded-2xl bg-slate-50" required />
              <input name="intendedCourse" placeholder="Intended Course of Study" className="p-4 border rounded-2xl bg-slate-50" required />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input name="currentGPA" placeholder="Current GPA / Class of Degree" className="p-4 border rounded-2xl bg-slate-50" required />
              <input name="destinationCountry" placeholder="Target Destination (e.g. USA, Canada, UK)" className="p-4 border rounded-2xl bg-slate-50" required />
            </div>
            <textarea name="academicGoals" placeholder="Describe your academic goals and how this relocation helps your future career..." className="w-full p-4 border rounded-2xl h-32 bg-slate-50" required />
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative hover:bg-slate-50">
              <input type="file" name="passport" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
              {fileName ? <CheckCircle2 className="mx-auto text-green-500 mb-2" /> : <Upload className="mx-auto text-slate-300 mb-2" />}
              <p className="text-sm font-bold text-slate-500 uppercase">{fileName || "Upload Student Passport"}</p>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-black text-xl flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}