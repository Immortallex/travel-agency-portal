"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Trophy, ShieldCheck, PlayCircle } from 'lucide-react';

const SPORTS_OPTIONS = ["Football", "Basketball", "Table Tennis", "Snooker Tournament"];

export default function SportsApplication() {
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
        body: JSON.stringify({ ...data, segment: 'sports' }) 
      });
      const result = await res.json();
      if (res.ok && result.id) {
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) { alert("Gateway Error."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-emerald-100 overflow-hidden">
          <div className="bg-emerald-700 p-10 text-white">
            <Trophy className="mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Athletic Recruitment</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Athlete Name" required className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl outline-none" />
              <input name="tel" placeholder="Telephone" required className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl outline-none" />
              <select name="discipline" required className="w-full p-4 border rounded-xl outline-none font-bold text-emerald-900">
                <option value="">Select Sports Discipline</option>
                {SPORTS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="pt-8 border-t border-emerald-100 space-y-6">
              <h3 className="font-bold flex items-center gap-2 uppercase text-sm text-emerald-600"><PlayCircle size={18} /> Athletic Intelligence</h3>
              <input name="video" placeholder="Highlight Reel Link (YouTube/Vimeo)" required className="w-full p-4 border rounded-xl outline-none" />
              <textarea name="history" placeholder="List major trophies and club affiliations..." required className="w-full p-4 border rounded-xl h-32 outline-none" />
            </div>

            <button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3">
              {loading ? "Connecting Scout Gateway..." : "Proceed to Payment ($69.99)"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}