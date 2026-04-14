"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Briefcase, Upload } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

export default function SkillsApplication() {
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
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2">Skilled <span className="text-blue-500">Workforce</span></h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-12">Global demand for your specific trade.</p>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Legal Name" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <input name="dateOfBirth" type="date" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <input name="tel" placeholder="Telephone Number" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <select name="residenceCountry" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none">
                {ALL_COUNTRIES.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
              </select>
            </div>
            <textarea name="address" placeholder="Residential Address" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl h-28 outline-none" />

            <div className="pt-10 border-t border-white/10 space-y-8">
              <h3 className="text-xl font-black uppercase italic text-blue-500 tracking-tighter">Trade Competence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="trade" placeholder="Primary Trade (e.g. Nurse, Welder, Electrician)" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
                <input name="years" type="number" placeholder="Years of Certified Experience" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>
              <textarea name="expertise" placeholder="Describe your most complex professional achievement in this trade..." required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl h-32 outline-none" />
              <input name="certification" placeholder="Highest Trade Certification (e.g. Red Seal, NVQ Level 3)" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
            </div>

            <div className="p-8 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-[2.5rem] flex flex-col items-center text-center space-y-4">
              <Upload className="text-blue-500" />
              <h4 className="font-black uppercase tracking-widest text-sm">Upload Passport Data Page</h4>
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