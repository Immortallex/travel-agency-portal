"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Code, Upload } from 'lucide-react';

export default function TechApplication() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/apply', { method: 'POST', body: formData });
      if (res.ok) {
        const result = await res.json();
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white pb-20 pt-28">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#0A192F] p-12 rounded-[3.5rem] shadow-2xl text-white">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2">Tech <span className="text-blue-500">Talent</span></h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-12">Relocation for the world's best builders.</p>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Name" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <input name="tel" placeholder="Phone Number" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <input name="dateOfBirth" type="date" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <input name="address" placeholder="Residential Address" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
            </div>

            <div className="pt-10 border-t border-white/10 space-y-8">
              <h3 className="text-xl font-black uppercase italic text-blue-500 tracking-tighter">Stack & Experience</h3>
              <input name="techStack" placeholder="Primary Tech Stack (e.g. Next.js, Rust, AWS)" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="github" placeholder="GitHub/Portfolio Link" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
                <input name="years" type="number" placeholder="Years of Experience" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>
              <textarea name="architecture" placeholder="Describe the most relevant project you have built/partnered to build..." required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl h-32 outline-none" />
            </div>

            <div className="p-8 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-[2.5rem] flex flex-col items-center text-center space-y-4">
              <Upload className="text-blue-500" />
              <h4 className="font-black uppercase tracking-widest text-sm">Upload Passport & Resume</h4>
              <input type="file" name="passport" required className="text-[10px] font-bold uppercase" />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl">
              {loading ? "Processing..." : "Finalize & Pay $69.99"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}