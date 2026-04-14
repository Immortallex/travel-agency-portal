"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
// IMPORT THE CRYPTO ACTION
import { createCryptoInvoice } from "@/app/actions/crypto"; 

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

const DESTINATIONS = ["Canada", "United States", "United Kingdom", "Germany", "Australia", "Poland", "Finland"];

export default function TechApplication() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // 1. Save to Database
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, segment: 'tech' }),
      });

      if (res.ok) {
        const result = await res.json();
        
        // 2. Call NOWPayments Action instead of redirecting to /checkout
        // This uses the logic from app/actions/crypto.ts
        const invoiceUrl = await createCryptoInvoice(result.id || "tech-app"); 

        if (invoiceUrl) {
          // 3. Redirect to the external NOWPayments checkout page
          window.location.href = invoiceUrl;
        } else {
          alert("Could not generate NOWPayments invoice URL.");
        }
      } else {
        alert("Database save failed. Ensure Application.ts is updated.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 uppercase italic tracking-tighter">Tech Pathway Application</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium mb-1 uppercase tracking-widest text-slate-500">Full Name</label>
              <input name="fullName" type="text" required className="w-full p-2 border rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 uppercase tracking-widest text-slate-500">Telephone</label>
                <input name="tel" type="tel" required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 uppercase tracking-widest text-slate-500">Date of Birth</label>
                <input name="dateOfBirth" type="date" required className="w-full p-2 border rounded" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 uppercase tracking-widest text-slate-500">Current Address</label>
              <input name="currentAddress" type="text" required className="w-full p-2 border rounded" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 uppercase tracking-widest text-slate-500">Country of Residence</label>
                <select name="residenceCountry" required className="w-full p-2 border rounded">
                  <option value="">Select Country</option>
                  {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 uppercase tracking-widest text-slate-500">Destination Country</label>
                <select name="destinationCountry" required className="w-full p-2 border rounded">
                  <option value="">Select Destination</option>
                  {DESTINATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Tech Specific Fields */}
            <div className="pt-4 border-t mt-4">
              <h3 className="font-black uppercase italic mb-3 text-blue-900">Tech Professional Details</h3>
              <input name="githubProfile" type="url" placeholder="GitHub Profile URL" className="w-full p-2 border rounded mb-3" />
              <input name="techStack" type="text" placeholder="Primary Tech Stack (e.g. Next.js, Python)" className="w-full p-2 border rounded mb-3" />
              <input name="yearsExperience" type="number" placeholder="Years of Experience" className="w-full p-2 border rounded" />
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
            >
              {loading ? "Processing Invoice..." : "Proceed to Payment ($69.99)"}
            </button>
          </form>
        </div>
      </div>
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/YOUR_NUMBER" 
        target="_blank" 
        className="fixed bottom-10 right-10 bg-[#25D366] p-5 rounded-2xl shadow-2xl hover:scale-110 transition-transform z-50 group"
      >
        <img src="/images/whatsapp-logo.webp" alt="WhatsApp" className="w-8 h-8 invert" />
      </a>
    </div>
  );
}