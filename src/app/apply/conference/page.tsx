"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Upload, ShieldCheck } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

export default function ConferenceApplication() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    // Logic to save to 'Active Relocation Files' would trigger here via API
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData, // Sending as FormData to handle Passport PDF
      });
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
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2">Conference <span className="text-blue-500">Placement</span></h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-12">We find the event. You get the visa.</p>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* PRIMARY DATA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Full Legal Name</label>
                <input name="fullName" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Date of Birth</label>
                <input name="dateOfBirth" type="date" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Telephone Number</label>
                <input name="tel" type="tel" placeholder="+ (Country Code)" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Country of Residence</label>
                <select name="residenceCountry" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none">
                  {ALL_COUNTRIES.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Residential Address</label>
              <textarea name="address" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl h-28 outline-none" />
            </div>

            {/* LOADED QUESTIONS */}
            <div className="pt-10 border-t border-white/10 space-y-8">
              <h3 className="text-xl font-black uppercase italic italic text-blue-500 tracking-tighter">Placement Intelligence</h3>
              
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-wide">1. What is your current field of professional expertise or academic study?</p>
                <input name="field" placeholder="e.g. Artificial Intelligence, Global Health" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-wide">2. Which regions are you most interested in visiting for a conference?</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Europe', 'North America', 'Asia', 'Anywhere'].map(r => (
                    <label key={r} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10">
                      <input type="radio" name="targetRegion" value={r} className="accent-blue-500" />
                      <span className="text-[10px] font-black uppercase">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-wide">3. Have you ever been denied a visa to any country? (Please provide details if yes)</p>
                <textarea name="visaHistory" placeholder="Provide full disclosure for better placement success..." className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl h-28 outline-none" />
              </div>
            </div>

            {/* PASSPORT UPLOAD */}
            <div className="p-8 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-[2.5rem] flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-blue-500 rounded-full"><Upload className="text-white" /></div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-sm">Upload International Passport</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">PDF or High-Resolution Image (Max 10MB)</p>
              </div>
              <input type="file" name="passport" accept=".pdf,image/*" required className="text-[10px] font-bold uppercase" />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-4">
              {loading ? "Securing Data..." : "Finalize & Pay Application Fee ($69.99)"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}