"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

export default function ConferenceApplication() {
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
        body: JSON.stringify({ ...data, segment: 'conference' }),
      });
      
      if (res.ok) {
        const result = await res.json();
        // Calls your crypto.ts action with the $69.99 fee
        const invoiceUrl = await createCryptoInvoice(result.id || "conf-app"); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
          <h1 className="text-4xl font-black text-[#0A192F] mb-8 uppercase italic tracking-tighter">Conference & Events</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PERSONAL CONTACT SECTION */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Attendee Information</h3>
              <input name="fullName" placeholder="Full Legal Name" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
              
              <div className="grid grid-cols-2 gap-4">
                <input name="email" type="email" placeholder="Email Address" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
                <input name="tel" type="tel" placeholder="Phone Number (with Country Code)" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input name="dateOfBirth" type="date" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
                <select name="residenceCountry" required className="p-4 bg-slate-50 rounded-2xl outline-none">
                  <option value="">Country of Residence</option>
                  {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <textarea name="homeAddress" placeholder="Full Residential Address" required className="w-full p-4 bg-slate-50 rounded-2xl h-24 outline-none" />
            </div>

            {/* EVENT DETAILS SECTION */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Conference Logistics</h3>
              <input name="eventName" placeholder="Official Conference / Event Name" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
              
              <div className="grid grid-cols-2 gap-4">
                <input name="eventDate" type="date" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
                <input name="venue" placeholder="Venue City & Country" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input name="organizer" placeholder="Organizing Institution" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
                <input name="duration" placeholder="Duration (e.g. 5 Days)" className="p-4 bg-slate-50 rounded-2xl outline-none" />
              </div>

              <input name="invitationLink" type="url" placeholder="Link to Event Website / Invitation (Optional)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
              {loading ? "Finalizing Details..." : "Proceed to Payment ($69.99)"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}