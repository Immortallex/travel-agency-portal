"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Globe, ShieldCheck, Cpu, User, Terminal } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const DESTINATIONS = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "Japan", "Estonia"];

export default function TechApplication() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Step 1: Submit data to backend to create the application record
      const res = await fetch('/api/apply', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, segment: 'tech' }) 
      });
      const result = await res.json();
      
      // Step 2: Trigger payment authentication using the returned application ID
      if (res.ok && result.id) {
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) {
          window.location.href = invoiceUrl; // Redirect to NOWPayments
        } else {
          alert("Payment authentication failed. Please try again.");
        }
      } else {
        alert("Submission failed. Check your data and try again.");
      }
    } catch (err) { 
      console.error("Tech Application Error:", err); 
      alert("An unexpected error occurred.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pb-20 pt-28 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl border border-blue-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-10">
            <Globe className="mb-4 text-white" size={40} />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Tech Talent Visa</h1>
            <p className="opacity-70 text-xs font-bold uppercase tracking-widest mt-1">High-Skill Technology Migration Pathway</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-6">
               <h3 className="font-bold text-blue-400 flex items-center gap-2 uppercase text-sm"><User size={18} /> Identity Core</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <input name="fullName" placeholder="Full Legal Name" required className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-500" />
                 <input name="email" type="email" placeholder="Email Address" required className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-500" />
                 <select name="country" required className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:border-blue-500 text-slate-300">
                   <option value="">Current Residence</option>
                   {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
                 <select name="destination" required className="p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl outline-none text-blue-100 font-bold">
                   <option value="">Relocation Hub</option>
                   {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>
            </div>

            <div className="pt-8 border-t border-slate-800 space-y-6">
              <h3 className="font-bold text-blue-400 flex items-center gap-2 uppercase text-sm"><Terminal size={18} /> Technical Profile</h3>
              <input name="stack" placeholder="Primary Tech Stack (e.g. Fullstack, AI, DevOps)" required className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-500" />
              <input name="github" placeholder="GitHub / Portfolio / LinkedIn Link" required className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:border-blue-500 text-white placeholder:text-slate-500" />
              <textarea name="projects" placeholder="Summarize your most significant technical contributions and innovations..." required className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl h-32 outline-none focus:border-blue-500 text-white placeholder:text-slate-500" />
            </div>

            <button 
              disabled={loading} 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Cpu size={20} className={loading ? "animate-spin" : ""} />
              {loading ? "Initializing Secure Protocol..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}