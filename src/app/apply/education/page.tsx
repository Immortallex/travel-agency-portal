"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { GraduationCap, ShieldCheck, BookOpen, User, MapPin, Globe } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const GLOBAL_DESTINATIONS = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Singapore", "Ireland"];

export default function EducationApplication() {
  const [loading, setLoading] = useState(false);
  const [residence, setResidence] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    if (residence) {
      const filtered = GLOBAL_DESTINATIONS.filter(d => d !== residence).sort(() => 0.5 - Math.random());
      setDestinations(filtered.slice(0, 6));
    }
  }, [residence]);

  // UPDATED HANDLESUBMIT FOR FORCE FIX
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData.entries());
    
    // Attempt to get user data from local storage to prevent "Missing User ID" error
    const userDataStr = localStorage.getItem('flypath_user');
    const userData = userDataStr ? JSON.parse(userDataStr) : {};
    
    const payload = {
      ...formProps,
      userId: userData.id || userData._id, 
      segment: 'education'
    };

    try {
      const res = await fetch('/api/apply', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
      });

      const result = await res.json();

      if (res.ok && result.id) {
        // Triggers the NOWPayments redirect using the unique ID returned by API
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) {
            window.location.href = invoiceUrl;
        } else {
            throw new Error("Payment link generation failed");
        }
      } else {
        alert(result.error || result.details || "Submission error. Ensure you are logged in.");
        setLoading(false); // Stops the "Authenticating..." hang
      }
    } catch (err) { 
        console.error("Education Submit Error:", err);
        alert("Server error. Please try again."); 
        setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-indigo-100 overflow-hidden">
          <div className="bg-indigo-800 p-10 text-white">
            <GraduationCap className="mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase tracking-tighter">Academic Registration</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            {/* FULL PERSONAL INFORMATION */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-sm"><User size={18} className="text-indigo-600" /> Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="fullName" placeholder="Full Legal Name" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 text-indigo-600">Date of Birth</label>
                   <input name="dateOfBirth" type="date" required className="w-full p-4 bg-slate-50 border rounded-xl outline-none" />
                </div>
                <input name="tel" placeholder="Telephone / WhatsApp" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
                <input name="email" type="email" placeholder="Email Address" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
                
                <select 
                  name="country" 
                  value={residence} 
                  onChange={(e) => setResidence(e.target.value)} 
                  required 
                  className="p-4 bg-slate-50 border rounded-xl outline-none"
                >
                  <option value="">Country of Residence</option>
                  {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select 
                  name="destination" 
                  disabled={!residence}
                  required 
                  className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl outline-none font-bold text-indigo-900 disabled:opacity-50"
                >
                  <option value="">{residence ? `Available for ${residence}` : "Select Residence First"}</option>
                  {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {/* This field name must match what the API looks for */}
              <input name="address" placeholder="Full Residential Address" required className="w-full p-4 bg-slate-50 border rounded-xl outline-none" />
            </div>

            {/* EDUCATION SPECIFIC QUESTIONS */}
            <div className="pt-8 border-t border-slate-100 space-y-6">
              <h3 className="font-bold flex items-center gap-2 uppercase text-sm text-indigo-600"><BookOpen size={18} /> Scholarship Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select name="qualification" required className="p-4 border rounded-xl outline-none bg-slate-50">
                  <option value="">Highest Qualification</option>
                  {["High School", "Associate", "Bachelor's", "Master's", "PhD"].map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                <select name="intendedProgramme" required className="p-4 border rounded-xl outline-none bg-indigo-50/50">
                  <option value="">Intended Study Programme</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD Programme</option>
                </select>
              </div>
              <input name="fieldOfStudy" placeholder="Field of Study (e.g. Computer Science)" required className="w-full p-4 border rounded-xl outline-none" />
              <textarea name="goals" placeholder="Briefly describe your academic and career goals..." required className="w-full p-4 border rounded-xl h-32 outline-none" />
            </div>

            <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98]">
              {loading ? "Authenticating..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
            <p className="mt-4 text-center text-xs text-red-600 font-medium leading-relaxed">
              * Note: This is a one-time payment. We use this fee as a route to facilitate every successful 
              application applicable to you, ensuring the completion of your entire application 
              process and relocation requirements.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}