"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Upload, Trophy, ShieldCheck } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

export default function SportsApplication() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('segment', 'sports');

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: formData });
      const result = await res.json();

      if (res.ok && result.id) {
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      } else {
        alert(result.error || "Submission error. Check file size.");
      }
    } catch (err) {
      console.error(err);
      alert("System Busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 pt-28 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#0A192F] p-12 rounded-[3.5rem] shadow-2xl text-white">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-blue-600 rounded-2xl"><Trophy size={32} /></div>
             <h1 className="text-5xl font-black uppercase italic tracking-tighter">Sports <span className="text-blue-500">Recruitment</span></h1>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-12">Global Academy & Professional Scouting</p>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Athlete Name" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <input name="dateOfBirth" type="date" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <input name="tel" type="tel" placeholder="Telephone" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <select name="residenceCountry" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none">
                {ALL_COUNTRIES.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
              </select>
            </div>
            <textarea name="address" placeholder="Residential Address" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl h-28 outline-none" />

            <div className="pt-10 border-t border-white/10 space-y-8">
              <h3 className="text-xl font-black uppercase italic text-blue-500 tracking-tighter">Athletic Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="discipline" placeholder="Sporting Discipline (e.g. Football, Athletics)" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
                <input name="currentClub" placeholder="Current Club / Academy Affiliation" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>
              <input name="videoLink" placeholder="Highlight Reel URL or Google Docs URL" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              <textarea name="awards" placeholder="List your professional awards, tournament records, and scouting history..." required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl h-40 outline-none" />
            </div>

            <div className="p-8 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-[2.5rem] flex flex-col items-center text-center space-y-4">
              <Upload className="text-blue-500" />
              <h4 className="font-black uppercase tracking-widest text-sm text-white">Upload Passport & Scouting Report</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Image or PDF (Max 10MB)</p>
              <input type="file" name="passport" required className="text-[10px] font-bold uppercase" />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4">
              {loading ? "Connecting to Secure Payment..." : "Proceed to Payment ($69.99)"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}