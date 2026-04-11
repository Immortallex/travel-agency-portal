"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, Upload, FileText, ArrowRight, User } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

export default function PathwayForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  
  // Format the category name for display (e.g., "tech" -> "Tech")
  const categoryName = typeof params.category === 'string' 
    ? params.category.charAt(0).toUpperCase() + params.category.slice(1) 
    : "Relocation";

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    if (!user) router.push('/auth');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);
      const savedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');

      // Use either id or _id depending on your auth response structure
      const userId = savedUser.id || savedUser._id;

      if (!userId) {
        alert("Please login again to continue.");
        router.push('/auth');
        return;
      }

      const finalData = new FormData();
      
      // CRITICAL FIX: Append BOTH files required by Application.ts
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("cv", formData.get("cv") as File); 
      finalData.append("userId", userId);
      
      // Collect all text fields
      const details = Object.fromEntries(formData.entries());
      delete details.passport;
      delete details.cv;
      
      // Ensure the category matches the URL parameter
      details.category = categoryName;
      
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { 
        method: 'POST', 
        body: finalData 
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Server rejected submission.");
      }

      const result = await res.json();

      if (result.applicationId) {
        const paymentUrl = await createCryptoInvoice(result.applicationId);
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          alert("Payment gateway error. Please contact support.");
        }
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert(error.message || "Submission failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <div className="bg-white p-10 border rounded-[3rem] shadow-xl">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase text-[#0A192F]">
            {categoryName} Pathway
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Date of Birth</label>
                <input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Gender</label>
                <select name="gender" className="p-4 border rounded-2xl bg-slate-50" required>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            {/* Dynamic fields based on category could go here */}
            <input name="occupation" placeholder="Current Occupation" className="w-full p-4 border rounded-2xl bg-slate-50" required />
            <textarea name="experience" placeholder="Briefly describe your background or goal..." className="w-full p-4 border rounded-2xl h-32 bg-slate-50" required />

            <div className="grid md:grid-cols-2 gap-4">
              {/* Passport Upload */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center relative hover:bg-slate-50 transition">
                <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
                <Upload className="mx-auto text-slate-300 mb-2" />
                <p className="text-[10px] font-bold text-slate-500 uppercase">Passport Data Page</p>
              </div>

              {/* CV Upload - REQUIRED BY SCHEMA */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center relative hover:bg-slate-50 transition">
                <input type="file" name="cv" className="absolute inset-0 opacity-0 cursor-pointer" required />
                <FileText className="mx-auto text-slate-300 mb-2" />
                <p className="text-[10px] font-bold text-slate-500 uppercase">Professional CV / Bio</p>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-black text-xl flex justify-center items-center gap-2 shadow-lg hover:bg-blue-900 transition-all">
              {loading ? <Loader2 className="animate-spin" /> : "Apply & Pay ($69.99)"} <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}