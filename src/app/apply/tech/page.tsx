"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Cpu, ShieldCheck, Globe, Code } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const DESTINATIONS = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "Japan", "Singapore", "Netherlands"];

export default function TechApplication() {
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
        body: JSON.stringify({ ...data, segment: 'tech' }) 
      });
      const result = await res.json();
      if (res.ok && result.id) {
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) { alert("Gateway sync error. Please try again."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-[#1e293b] rounded-[2.5rem] shadow-2xl border border-blue-500/20 overflow-hidden text-white">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-10">
            <Cpu className="mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Tech Talent Visa</h1>
            <p className="opacity-80 text-xs font-bold uppercase tracking-widest mt-1">Infrastructure & Engineering Excellence</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Legal Name" required className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:border-blue-400" />
              <input name="dateOfBirth" type="date" required className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none" />
              <input name="tel" placeholder="Telephone Number" required className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none" />
              <select name="country" required className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none text-slate-400">
                <option value="">Country of Residence</option>
                {ALL_COUNTRIES.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="address" placeholder="Residential Address" required className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none" />
              <select name="destination" required className="p-4 bg-blue-600 border border-blue-400 rounded-xl outline-none font-bold text-white">
                <option value="">Select Tech Hub Destination</option>
                {DESTINATIONS.map(d => <option key={d} value={d} className="text-black">{d}</option>)}
              </select>
            </div>

            <div className="pt-8 border-t border-slate-700 space-y-6">
              <h3 className="font-bold flex items-center gap-2 uppercase text-sm text-blue-400"><Code size={18} /> Stack Intelligence</h3>
              <input name="techStack" placeholder="Primary Tech Stack & Years of Professional Use" required className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none" />
              <input name="links" placeholder="GitHub / Portfolio / LinkedIn Validation Link" required className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none" />
              <textarea name="architecture" placeholder="Describe the most complex system architecture you have designed or maintained..." required className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl h-32 outline-none" />
            </div>

            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3">
              {loading ? "Redirecting to Gateway..." : "Proceed to Payment ($69.99)"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}