"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Trophy, ShieldCheck, PlayCircle, User } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const SPORTS_DESTINATIONS = ["United States", "United Kingdom", "Spain", "Germany", "Australia", "France", "Italy"];

export default function SportsApplication() {
  const [loading, setLoading] = useState(false);
  const [residence, setResidence] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    if (residence) {
      setDestinations(SPORTS_DESTINATIONS.filter(d => d !== residence).sort(() => 0.5 - Math.random()).slice(0, 5));
    }
  }, [residence]);

  // FIXED HANDLESUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData.entries());

    // 1. Get User Data from localStorage
    const userDataStr = localStorage.getItem('flypath_user');
    const userData = userDataStr ? JSON.parse(userDataStr) : {};

    const payload = {
      ...formProps,
      userId: userData.id || userData._id, 
      segment: 'sports' 
    };

    try {
      // 2. Send to Universal API
      const res = await fetch('/api/apply', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
      });

      const result = await res.json();

      if (res.ok && result.id) {
        // 3. Trigger NOWPayments redirect
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) {
            window.location.href = invoiceUrl;
        } else {
            alert("Payment link generation failed.");
            setLoading(false);
        }
      } else {
        alert(result.error || "Please ensure you are logged in.");
        setLoading(false);
      }
    } catch (err) { 
        console.error("Sports Submit Error:", err);
        alert("Submission error. Please try again."); 
        setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-emerald-100 overflow-hidden">
          <div className="bg-emerald-700 p-10 text-white text-center">
            <Trophy className="mx-auto mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase tracking-tighter">Athletic Application</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-4">
               <h3 className="font-bold text-emerald-700 flex items-center gap-2 uppercase text-sm"><User size={18} /> Athlete Identity</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <input name="fullName" placeholder="Full Athlete Name" required className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl outline-none" />
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-emerald-400 uppercase ml-2">Date of Birth</label>
                   <input name="dateOfBirth" type="date" required className="w-full p-4 bg-emerald-50 border border-emerald-100 rounded-xl outline-none" />
                 </div>
                 <input name="tel" placeholder="Telephone" required className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl outline-none" />
                 <input name="email" type="email" placeholder="Email Address" required className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl outline-none" />
                 
                 <select name="country" value={residence} onChange={(e) => setResidence(e.target.value)} required className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl outline-none">
                   <option value="">Country of Residence</option>
                   {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>

                 <select name="destination" disabled={!residence} required className="p-4 bg-emerald-100/50 border-2 border-emerald-200 rounded-xl outline-none font-bold text-emerald-900 disabled:opacity-50">
                   <option value="">{residence ? "Sports Destinations" : "Select Residence"}</option>
                   {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>
               <input name="address" placeholder="Residential Address" required className="w-full p-4 bg-emerald-50 border border-emerald-100 rounded-xl outline-none" />
            </div>

            <div className="pt-8 border-t border-emerald-100 space-y-6">
              <h3 className="font-bold flex items-center gap-2 uppercase text-sm text-emerald-600"><PlayCircle size={18} /> Career Profile</h3>
              
              {/* UPDATED TO DROPDOWN */}
              <select name="discipline" required className="w-full p-4 border rounded-xl outline-none bg-white">
                <option value="">Select Sports Specialization</option>
                <option value="football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Pool">Pool</option>
              </select>

              <input name="video" placeholder="Highlight Reel Link (YouTube/Vimeo)" required className="w-full p-4 border rounded-xl outline-none" />
              <textarea name="history" placeholder="Position (e.g Striker, Defender...)" required className="w-full p-4 border rounded-xl h-32 outline-none" />
            </div>

            <button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3">
              {loading ? "Authenticating..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}