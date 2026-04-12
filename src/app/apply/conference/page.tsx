"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic2, Upload, Loader2, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';
import Navbar from '@/components/Navbar';

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
      const user = JSON.parse(localStorage.getItem('flypath_user') || '{}');
      const userId = user._id || user.id;

      if (!userId) {
        throw new Error("Session expired. Please login again.");
      }

      const formData = new FormData(e.currentTarget);
      const finalData = new FormData();
      
      // Send Passport (Required)
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", userId);
      
      // Clean up text data
      const details = Object.fromEntries(formData.entries());
      delete details.passport;
      details.category = "Conference";
      
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { 
        method: 'POST', 
        body: finalData 
      });
      
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        throw new Error("Server Error: Check your Application.ts and API Route updates.");
      }

      const result = await res.json();
      
      // Proceed to Payment Redirect
      const url = await createCryptoInvoice(result.applicationId);
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Payment link generation failed.");
      }

    } catch (err: any) {
      alert(err.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <div className="bg-white p-10 border rounded-[3rem] shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-black flex items-center gap-3 uppercase text-[#0A192F]">
              <Mic2 className="text-blue-600"/> Conference Relocation
            </h2>
            <p className="text-slate-400 font-medium mt-1 uppercase text-xs tracking-widest">Event & Professional Speaking Pathway</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Date of Birth</label>
                <input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold ml-2 mb-1 uppercase text-slate-400">Gender</label>
                <select name="gender" className="p-4 border rounded-2xl bg-slate-50" required>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <input name="conferenceName" placeholder="Conference Name" className="w-full p-4 border rounded-2xl bg-slate-50" required />
              </div>
              <div className="relative">
                <select name="role" className="w-full p-4 border rounded-2xl bg-slate-50" required>
                  <option value="">Your Role</option>
                  <option>Speaker / Keynote</option>
                  <option>Delegate / Attendee</option>
                  <option>Exhibitor</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2 p-4 border rounded-2xl bg-slate-50">
                <MapPin size={18} className="text-slate-400" />
                <input name="location" placeholder="Host Country" className="bg-transparent outline-none w-full" required />
              </div>
              <div className="flex items-center gap-2 p-4 border rounded-2xl bg-slate-50">
                <Calendar size={18} className="text-slate-400" />
                <input name="eventDate" type="date" className="bg-transparent outline-none w-full text-slate-500" required />
              </div>
            </div>

            <textarea 
              name="objective" 
              placeholder="Briefly describe the purpose of your attendance and how it benefits your professional goals..." 
              className="w-full p-4 border rounded-2xl h-32 bg-slate-50" 
              required 
            />
            
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative hover:bg-slate-50 transition">
              <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
              <Upload className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-500 uppercase">Upload Passport Data Page</p>
              <p className="text-[10px] text-slate-400 mt-1">Required for visa processing</p>
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-black text-xl flex justify-center items-center gap-2 shadow-lg hover:bg-blue-900 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Proceed to Payment ($69.99)"} <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}