"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Briefcase, ShieldCheck, Zap, User } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const SKILLED_WORK_DESTS = ["Canada", "Australia", "New Zealand", "United Arab Emirates", "Singapore", "United Kingdom"];

export default function SkillsApplication() {
  const [loading, setLoading] = useState(false);
  const [residence, setResidence] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    if (residence) {
      setDestinations(SKILLED_WORK_DESTS.filter(d => d !== residence).slice(0, 5));
    }
  }, [residence]);

  // FIXED HANDLESUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData.entries());
    
    // 1. Capture User Data from localStorage to identify the applicant
    const userDataStr = localStorage.getItem('flypath_user');
    const userData = userDataStr ? JSON.parse(userDataStr) : {};
    
    const payload = {
      ...formProps,
      userId: userData.id || userData._id, 
      segment: 'skills' 
    };

    try {
      // 2. Submit to the universal application endpoint
      const res = await fetch('/api/apply', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
      });

      const result = await res.json();

      if (res.ok && result.id) {
        // 3. Generate invoice and redirect to payment
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) {
            window.location.href = invoiceUrl;
        } else {
            alert("Payment gateway connection failed. Please try again.");
            setLoading(false);
        }
      } else {
        alert(result.error || "Submission failed. Please check if you are logged in.");
        setLoading(false);
      }
    } catch (err) { 
        console.error("Skills Submit Error:", err);
        alert("Server connection failed."); 
        setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-blue-600 p-10 text-white">
            <Briefcase className="mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase tracking-tighter">Skilled Workers Registration</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-4">
               <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-sm"><User size={18} className="text-blue-600" /> Applicant Identity</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <input name="fullName" placeholder="Full Legal Name" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Date of Birth</label>
                   <input name="dateOfBirth" type="date" required className="w-full p-4 bg-slate-50 border rounded-xl outline-none" />
                 </div>
                 <input name="tel" placeholder="Telephone/WhatsApp" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
                 <input name="email" type="email" placeholder="Email Address" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
                 
                 <select name="country" value={residence} onChange={(e) => setResidence(e.target.value)} required className="p-4 bg-slate-50 border rounded-xl outline-none">
                   <option value="">Country of Residence</option>
                   {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>

                 <select name="destination" disabled={!residence} required className="p-4 bg-blue-50 border-2 border-blue-100 rounded-xl outline-none font-bold text-blue-900">
                   <option value="">{residence ? "Eligible Destinations" : "Select Residence"}</option>
                   {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>
               <input name="address" placeholder="Full Residential Address" required className="w-full p-4 bg-slate-50 border rounded-xl outline-none" />
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-sm"><Zap size={18} className="text-blue-600" /> Professional Experience</h3>
              <input name="trade" placeholder="Primary Trade (e.g. Electrician, Construction)" required className="w-full p-4 border rounded-xl outline-none" />
              <input name="cert" placeholder="Professional Certification or License" required className="w-full p-4 border rounded-xl outline-none" />
              <textarea name="experience" placeholder="Describe your specialized skills and years of experience..." required className="w-full p-4 border rounded-xl h-32 outline-none" />
            </div>
              
            <button disabled={loading} className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3">
              {loading ? "Syncing..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
            <p>
              <br><font color="red" type="Times New Roman">Note, this is just one time payment, we use this fee as a route to every successful application applicable to you.</font></br>
              </p>
          </form>
        </div>
      </div>
    </div>
  );
}