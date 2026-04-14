"use client";
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Plus, Trash2 } from 'lucide-react';

export default function FamilyApplication() {
  const [loading, setLoading] = useState(false);
  const [dependents, setDependents] = useState([{ name: '', relationship: '', age: '' }]);

  const addDependent = () => setDependents([...dependents, { name: '', relationship: '', age: '' }]);
  const removeDependent = (index: number) => setDependents(dependents.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(formData.entries()),
      dependents,
      segment: 'family'
    };

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        const invoiceUrl = await createCryptoInvoice(result.id || "fam-app"); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
          <h1 className="text-4xl font-black text-[#0A192F] mb-8 uppercase italic tracking-tighter">Family Relocation</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Principal Applicant</h3>
              <input name="fullName" placeholder="Full Name" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-4">
                <input name="dateOfBirth" type="date" required className="p-4 bg-slate-50 rounded-2xl outline-none" />
                <select name="maritalStatus" className="p-4 bg-slate-50 rounded-2xl outline-none">
                  <option>Married</option>
                  <option>Single Parent</option>
                  <option>Widowed</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Dependents / Family Members</h3>
                <button type="button" onClick={addDependent} className="text-blue-600 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full">
                  <Plus size={14} /> Add Member
                </button>
              </div>

              {dependents.map((dep, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-center bg-slate-50 p-4 rounded-2xl animate-in fade-in duration-300">
                  <div className="col-span-5">
                    <input 
                      placeholder="Full Name" 
                      value={dep.name}
                      onChange={(e) => {
                        const newDeps = [...dependents];
                        newDeps[index].name = e.target.value;
                        setDependents(newDeps);
                      }}
                      className="w-full p-2 bg-transparent border-b border-slate-200 text-sm outline-none" 
                    />
                  </div>
                  <div className="col-span-4">
                    <input 
                      placeholder="Relationship" 
                      value={dep.relationship}
                      onChange={(e) => {
                        const newDeps = [...dependents];
                        newDeps[index].relationship = e.target.value;
                        setDependents(newDeps);
                      }}
                      className="w-full p-2 bg-transparent border-b border-slate-200 text-sm outline-none" 
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      placeholder="Age" 
                      type="number"
                      value={dep.age}
                      onChange={(e) => {
                        const newDeps = [...dependents];
                        newDeps[index].age = e.target.value;
                        setDependents(newDeps);
                      }}
                      className="w-full p-2 bg-transparent border-b border-slate-200 text-sm outline-none" 
                    />
                  </div>
                  <div className="col-span-1 text-right">
                    <button type="button" onClick={() => removeDependent(index)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
              {loading ? "Generating Secure Invoice..." : "Proceed to Payment ($69.99)"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}