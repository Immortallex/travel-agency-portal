"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { GraduationCap, ShieldCheck, BookOpen } from 'lucide-react';

const QUALIFICATIONS = ["High School Diploma", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate (PhD)", "Vocational Certificate"];
const COURSES = ["Computer Science", "Medicine & Surgery", "Nursing", "Business Administration", "Civil Engineering", "International Relations", "Public Health", "Economics", "Law", "Environmental Science", "Architecture"];
const ALL_COUNTRIES = [...]; // Rest of countries array as before
const DESTINATIONS = ["United States", "Canada", "United Kingdom", "Australia", "Germany"];

export default function EducationApplication() {
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
        body: JSON.stringify({ ...data, segment: 'education' }) 
      });
      const result = await res.json();
      if (res.ok && result.id) {
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) { alert("Gateway Error."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-indigo-100 overflow-hidden">
          <div className="bg-indigo-800 p-10 text-white">
            <GraduationCap className="mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Academic Placement</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Legal Name" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
              <input name="tel" placeholder="Telephone" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
              <select name="country" required className="p-4 bg-slate-50 border rounded-xl outline-none">
                <option value="">Country of Residence</option>
                {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="destination" required className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl outline-none font-bold">
                <option value="">Study Destination</option>
                {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-6">
              <h3 className="font-bold flex items-center gap-2 uppercase text-sm text-indigo-600"><BookOpen size={18} /> Scholarship Intelligence</h3>
              <select name="qualification" required className="w-full p-4 border rounded-xl outline-none">
                <option value="">Select Current Highest Qualification</option>
                {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              <select name="intendedField" required className="w-full p-4 border rounded-xl outline-none">
                <option value="">Select Intended Field of Study</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea name="goals" placeholder="Summarize your long-term academic objectives..." required className="w-full p-4 border rounded-xl h-32 outline-none" />
            </div>

            <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3">
              {loading ? "Syncing..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}