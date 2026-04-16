"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { GraduationCap, ShieldCheck, BookOpen } from 'lucide-react';

const QUALIFICATIONS = ["High School Diploma", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate (PhD)", "Vocational Certificate"];
const COURSES = ["Computer Science", "Medicine & Surgery", "Nursing", "Business Administration", "Civil Engineering", "International Relations", "Public Health", "Economics", "Law", "Environmental Science", "Architecture"];
const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const DESTINATIONS = ["United States", "Canada", "United Kingdom", "Australia", "Germany"];

export default function EducationApplication() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Step 1: Submit data to the backend API to create the application record
      const res = await fetch('/api/apply', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, segment: 'education' }) 
      });
      const result = await res.json();
      
      // Step 2: Trigger payment authentication using the unique application ID
      if (res.ok && result.id) {
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) {
          window.location.href = invoiceUrl; // Redirect to NOWPayments
        } else {
          alert("Payment gateway connection failed. Please try again.");
        }
      } else {
        alert("Submission failed. Please check your network and try again.");
      }
    } catch (err) { 
      console.error("Education Application Error:", err); 
      alert("An unexpected error occurred during processing.");
    } finally { 
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
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Academic Placement</h1>
            <p className="opacity-80 text-xs font-bold uppercase tracking-widest mt-1">Global Education & Scholarship Pathway</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Legal Name" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
              <input name="tel" placeholder="Telephone" required className="p-4 bg-slate-50 border rounded-xl outline-none" />
              <select name="country" required className="p-4 bg-slate-50 border rounded-xl outline-none">
                <option value="">Country of Residence</option>
                {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="destination" required className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl outline-none font-bold text-indigo-900">
                <option value="">Study Destination</option>
                {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-6">
              <h3 className="font-bold flex items-center gap-2 uppercase text-sm text-indigo-600"><BookOpen size={18} /> Scholarship Intelligence</h3>
              <select name="qualification" required className="w-full p-4 border rounded-xl outline-none">
                <option value="">Select Current Highest Qualification</option>
                {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              <select name="intendedField" required className="w-full p-4 border rounded-xl outline-none">
                <option value="">Select Intended Field of Study</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea name="goals" placeholder="Summarize your long-term academic objectives and why you chose this field..." required className="w-full p-4 border rounded-xl h-32 outline-none" />
            </div>

            <button 
              disabled={loading} 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
            >
              {loading ? "Syncing with Gateway..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}