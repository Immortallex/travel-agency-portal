"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Users, ShieldCheck, Heart, MapPin } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const DESTINATIONS = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "United Arab Emirates", "Singapore", "New Zealand"];

export default function FamilyApplication() {
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
        body: JSON.stringify({ ...data, segment: 'family' }) 
      });
      const result = await res.json();
      if (res.ok && result.id) {
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-orange-100 overflow-hidden">
          <div className="bg-orange-600 p-10 text-white text-center">
            <Users className="mx-auto mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Family Relocation</h1>
            <p className="opacity-80 text-xs font-bold uppercase tracking-widest mt-1">Dependent Hierarchy Documentation</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Principal Applicant Name" required className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl outline-none" />
              <input name="dateOfBirth" type="date" required className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl outline-none" />
              <input name="tel" placeholder="Primary Contact Phone" required className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl outline-none" />
              <select name="country" required className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl outline-none">
                <option value="">Country of Residence</option>
                {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="address" placeholder="Residential Address" required className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl outline-none" />
              <select name="destination" required className="p-4 border-2 border-orange-200 bg-orange-50 rounded-xl outline-none font-bold text-orange-900">
                <option value="">Relocation Destination</option>
                {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="pt-8 border-t border-orange-50 space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-orange-600 uppercase text-sm"><Heart size={18} /> Household Intelligence</h3>
              <input name="memberCount" type="number" placeholder="Number of Dependents Relocating" className="w-full p-4 border rounded-xl outline-none" />
              <textarea name="dependentDetails" placeholder="Full Names, Ages, and Relationships of all dependents..." className="w-full p-4 border rounded-xl h-32 outline-none" />
              <input name="motivation" placeholder="Primary motivation for relocation? (Safety, Career, Quality of Life)" className="w-full p-4 border rounded-xl outline-none" />
            </div>

            <button disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3">
              {loading ? "Redirecting..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}