"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 

export default function SkillsApplication() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, segment: 'skills' }),
      });
      if (res.ok) {
        const result = await res.json();
        const invoiceUrl = await createCryptoInvoice(result.id || "skill-app"); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-28">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl">
          <h1 className="text-4xl font-black text-[#0A192F] mb-8 uppercase italic tracking-tighter">Skilled Workers</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Professional Identity</h3>
              <input name="fullName" placeholder="Full Name" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input name="trade" placeholder="Trade (e.g. Electrician)" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
                <input name="yearsExperience" type="number" placeholder="Years of Experience" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Certifications & Tools</h3>
              <input name="certificationName" placeholder="Primary Certification (e.g. NVQ, Red Seal)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
              <textarea name="tools" placeholder="List major specialized equipment or software you operate" className="w-full p-4 bg-slate-50 rounded-2xl h-32 outline-none" />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl">
              {loading ? "Processing..." : "Proceed to Payment ($69.99)"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}