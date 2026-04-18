"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Users, ShieldCheck, Heart, Plus, Trash2, User } from 'lucide-react';

const ALL_COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
const DESTINATIONS_SET = ["United States", "Canada", "United Kingdom", "Australia", "New Zealand", "Switzerland"];

export default function FamilyApplication() {
  const [loading, setLoading] = useState(false);
  const [residence, setResidence] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [dependents, setDependents] = useState<any[]>([]);

  useEffect(() => {
    if (residence) {
      setDestinations(DESTINATIONS_SET.filter(d => d !== residence).slice(0, 5));
    }
  }, [residence]);

  const addDependent = () => setDependents([...dependents, { name: '', relationship: '', age: '' }]);
  const removeDependent = (index: number) => setDependents(dependents.filter((_, i) => i !== index));

  // FIXED HANDLESUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData.entries());
    
    // 1. Capture User ID from localStorage to fix "Missing User ID" error
    const userDataStr = localStorage.getItem('flypath_user');
    const userData = userDataStr ? JSON.parse(userDataStr) : {};
    
    const payload = {
      ...formProps,
      userId: userData.id || userData._id, 
      dependentsList: dependents,
      segment: 'family' 
    };

    try {
      const res = await fetch('/api/apply', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
      });

      const result = await res.json();

      if (res.ok && result.id) {
        // 2. Trigger the NOWPayments redirect using the returned unique ID
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) {
            window.location.href = invoiceUrl;
        } else {
            alert("Payment link generation failed. Please check your network.");
            setLoading(false);
        }
      } else {
        // Displays error if User ID is missing or database validation fails
        alert(result.error || result.details || "Please ensure you are logged in.");
        setLoading(false);
      }
    } catch (err) { 
        console.error("Family Submit Error:", err);
        alert("Server error. Please try again later."); 
        setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-orange-100 overflow-hidden">
          <div className="bg-orange-600 p-10 text-white text-center">
            <Users className="mx-auto mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase tracking-tighter">Family Relocation</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-sm"><User size={18} className="text-orange-600" /> Principal Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="fullName" placeholder="Full Legal Name" required className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl outline-none" />
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-orange-400 uppercase ml-2">Date of Birth</label>
                   <input name="dateOfBirth" type="date" required className="w-full p-4 bg-orange-50 border border-orange-100 rounded-xl outline-none" />
                </div>
                <input name="tel" placeholder="Phone Number" required className="p-4 bg-orange-50 border border-orange-100 rounded-xl outline-none" />
                <input name="email" type="email" placeholder="Email Address" required className="p-4 bg-orange-50 border border-orange-100 rounded-xl outline-none" />
                
                <select name="country" value={residence} onChange={(e) => setResidence(e.target.value)} required className="p-4 bg-orange-50 border border-orange-100 rounded-xl outline-none">
                  <option value="">Country of Residence</option>
                  {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select name="destination" disabled={!residence} required className="p-4 bg-orange-100/50 border-2 border-orange-200 rounded-xl outline-none font-bold text-orange-900 disabled:opacity-50">
                  <option value="">{residence ? "Available Destinations" : "Select Residence"}</option>
                  {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <input name="address" placeholder="Full Residential Address" required className="w-full p-4 bg-orange-50 border border-orange-100 rounded-xl outline-none" />
            </div>

            <div className="pt-8 border-t border-orange-50 space-y-6">
              <select name="maritalStatus" required className="w-full p-4 bg-slate-50 border rounded-xl outline-none">
                <option value="">Marital Status</option>
                <option value="Single">Single Parent</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
              <textarea name="purpose" placeholder="Describe your family's primary reason for relocation..." required className="w-full p-4 border rounded-xl h-24 outline-none" />
            </div>

            <div className="pt-8 border-t border-orange-50 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 text-orange-600 uppercase text-sm"><Heart size={18} /> Dependents (Optional)</h3>
                <button type="button" onClick={addDependent} className="flex items-center gap-1 text-xs font-bold uppercase text-orange-600 border border-orange-200 px-3 py-1 rounded-full hover:bg-orange-50"><Plus size={14}/> Add Member</button>
              </div>
              
              {dependents.map((dep, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-orange-50/30 rounded-2xl">
                  <input placeholder="Name" required className="p-3 border rounded-lg text-sm" value={dep.name} onChange={(e) => { const newDep = [...dependents]; newDep[index].name = e.target.value; setDependents(newDep); }} />
                  <input placeholder="Relationship" required className="p-3 border rounded-lg text-sm" value={dep.relationship} onChange={(e) => { const newDep = [...dependents]; newDep[index].relationship = e.target.value; setDependents(newDep); }} />
                  <div className="flex gap-2">
                    <input placeholder="Age" required className="p-3 border rounded-lg text-sm w-full" value={dep.age} onChange={(e) => { const newDep = [...dependents]; newDep[index].age = e.target.value; setDependents(newDep); }} />
                    <button type="button" onClick={() => removeDependent(index)} className="text-red-400 p-2"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>

            <button disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3">
              {loading ? "Initializing..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}