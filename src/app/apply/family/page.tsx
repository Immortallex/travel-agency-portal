"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Plus, Trash2, Upload, Users } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

export default function FamilyApplication() {
  const [loading, setLoading] = useState(false);
  const [dependents, setDependents] = useState([{ name: '', relationship: '', age: '' }]);

  const addDependent = () => setDependents([...dependents, { name: '', relationship: '', age: '' }]);
  const removeDependent = (index: number) => setDependents(dependents.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('dependents', JSON.stringify(dependents));

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
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2">Family <span className="text-blue-500">Relocation</span></h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-12">Building a future for your legacy.</p>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Principal Applicant Name</label>
                <input name="fullName" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Date of Birth</label>
                <input name="dateOfBirth" type="date" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Telephone Number</label>
                <input name="tel" type="tel" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Residence Country</label>
                <select name="residenceCountry" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none">
                  {ALL_COUNTRIES.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">Residential Address</label>
              <textarea name="address" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl h-28 outline-none" />
            </div>

            <div className="pt-10 border-t border-white/10 space-y-8">
              <h3 className="text-xl font-black uppercase italic text-blue-500 tracking-tighter">Family Structure</h3>
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-wide">Primary Reason for Family Relocation?</p>
                <input name="reason" placeholder="e.g. Better Education, Career Growth, Safety" required className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold uppercase tracking-wide">Dependents / Family Members</p>
                  <button type="button" onClick={addDependent} className="text-blue-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full">
                    <Plus size={14} /> Add Member
                  </button>
                </div>
                {dependents.map((dep, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-center bg-white/5 p-4 rounded-2xl">
                    <input className="col-span-5 bg-transparent border-b border-white/10 p-2 text-sm outline-none" placeholder="Full Name" onChange={(e) => { const n = [...dependents]; n[index].name = e.target.value; setDependents(n); }} />
                    <input className="col-span-4 bg-transparent border-b border-white/10 p-2 text-sm outline-none" placeholder="Relationship" onChange={(e) => { const n = [...dependents]; n[index].relationship = e.target.value; setDependents(n); }} />
                    <input className="col-span-2 bg-transparent border-b border-white/10 p-2 text-sm outline-none" placeholder="Age" type="number" onChange={(e) => { const n = [...dependents]; n[index].age = e.target.value; setDependents(n); }} />
                    <button type="button" onClick={() => removeDependent(index)} className="col-span-1 text-red-400"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-[2.5rem] flex flex-col items-center text-center space-y-4">
              <Upload className="text-blue-500" />
              <div>
                <h4 className="font-black uppercase tracking-widest text-sm">Upload Combined Family Passports</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Single PDF containing all member data pages</p>
              </div>
              <input type="file" name="passport" accept=".pdf" required className="text-[10px] font-bold uppercase" />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all">
              {loading ? "Processing Family File..." : "Finalize & Pay $69.99"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}