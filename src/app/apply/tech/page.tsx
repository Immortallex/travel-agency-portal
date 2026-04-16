"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Globe, ShieldCheck, Cpu, User, Terminal } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const TECH_HUBS = ["United States", "Canada", "Germany", "Estonia", "Japan", "Singapore", "United Kingdom"];

export default function TechApplication() {
  const [loading, setLoading] = useState(false);
  const [residence, setResidence] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    if (residence) {
      setDestinations(TECH_HUBS.filter(h => h !== residence).sort(() => 0.5 - Math.random()).slice(0, 5));
    }
  }, [residence]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit button clicked..."); // Check browser console for this
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formProps = Object.fromEntries(formData.entries());
      
      // SAFETY CHECK: Get User Data
      const userDataStr = localStorage.getItem('flypath_user');
      if (!userDataStr) {
        setLoading(false);
        return alert("Error: User session not found. Please log out and log back in.");
      }
      
      const userData = JSON.parse(userDataStr);
      const userId = userData.id || userData._id;

      if (!userId) {
        setLoading(false);
        return alert("Error: Account ID missing. Please log in again.");
      }

      const payload = {
        ...formProps,
        userId: userId,
        segment: 'tech'
      };

      console.log("Sending payload to API:", payload);

      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("API Result:", result);

      if (res.ok && result.id) {
        // TRIGGER PAYMENT
        console.log("Generating payment for ID:", result.id);
        const invoiceUrl = await createCryptoInvoice(result.id);
        
        if (invoiceUrl) {
          window.location.href = invoiceUrl;
        } else {
          alert("Payment gateway error. Please try again.");
          setLoading(false);
        }
      } else {
        alert(result.error || "Submission failed.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Critical Frontend Error:", err);
      alert("System Error. Check console for details.");
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
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-6">
               <h3 className="font-bold text-blue-400 flex items-center gap-2 uppercase text-sm"><User size={18} /> Core Identity</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <input name="fullName" placeholder="Full Legal Name" required className="p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white" />
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-blue-400 uppercase ml-2">Date of Birth</label>
                   <input name="dateOfBirth" type="date" required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white" />
                 </div>
                 <input name="tel" placeholder="Telephone/WhatsApp" required className="p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white" />
                 <input name="email" type="email" placeholder="Email Address" required className="p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white" />
                 
                 <select name="country" value={residence} onChange={(e) => setResidence(e.target.value)} required className="p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white">
                   <option value="">Country of Residence</option>
                   {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>

                 <select name="destination" disabled={!residence} required className="p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl outline-none font-bold text-blue-100">
                   <option value="">{residence ? "Available Tech Hubs" : "Select Residence"}</option>
                   {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>
               <input name="address" placeholder="Residential Address" required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white" />
            </div>

            <div className="pt-8 border-t border-slate-800 space-y-6">
              <h3 className="font-bold text-blue-400 flex items-center gap-2 uppercase text-sm"><Terminal size={18} /> Technical Profile</h3>
              <input name="stack" placeholder="Primary Tech Stack" required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white" />
              <input name="github" placeholder="GitHub / Portfolio Link" required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white" />
              <textarea name="projects" placeholder="Summarize your projects..." required className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl h-32 outline-none text-white" />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
            >
              <Cpu size={20} className={loading ? "animate-spin" : ""} />
              {loading ? "Initializing..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}