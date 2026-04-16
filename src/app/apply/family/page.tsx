"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { createCryptoInvoice } from "@/app/actions/crypto"; 
import { Users, ShieldCheck, Heart, Plus, Trash2 } from 'lucide-react';

export default function FamilyApplication() {
  const [loading, setLoading] = useState(false);
  const [dependents, setDependents] = useState([{ name: '', relationship: '', age: '' }]);

  const addDependent = () => setDependents([...dependents, { name: '', relationship: '', age: '' }]);
  const removeDependent = (index: number) => setDependents(dependents.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // Attach dependents to data
    const finalData = { ...data, dependentsList: dependents, segment: 'family' };

    try {
      const res = await fetch('/api/apply', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData) 
      });
      const result = await res.json();
      if (res.ok && result.id) {
        const invoiceUrl = await createCryptoInvoice(result.id); 
        if (invoiceUrl) window.location.href = invoiceUrl;
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-orange-100 overflow-hidden">
          <div className="bg-orange-600 p-10 text-white text-center">
            <Users className="mx-auto mb-4" size={40} />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Family Relocation</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Principal Applicant Name" required className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl outline-none" />
              <input name="tel" placeholder="Primary Contact Phone" required className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl outline-none" />
            </div>

            <div className="pt-8 border-t border-orange-50 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 text-orange-600 uppercase text-sm"><Heart size={18} /> Dependents Information</h3>
                <button type="button" onClick={addDependent} className="flex items-center gap-1 text-xs font-bold uppercase text-orange-600 border border-orange-200 px-3 py-1 rounded-full hover:bg-orange-50"><Plus size={14}/> Add Member</button>
              </div>
              
              {dependents.map((dep, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-orange-50/30 rounded-2xl relative">
                  <input placeholder="Name" className="p-3 border rounded-lg text-sm" value={dep.name} onChange={(e) => { const newDep = [...dependents]; newDep[index].name = e.target.value; setDependents(newDep); }} />
                  <input placeholder="Relationship" className="p-3 border rounded-lg text-sm" value={dep.relationship} onChange={(e) => { const newDep = [...dependents]; newDep[index].relationship = e.target.value; setDependents(newDep); }} />
                  <div className="flex gap-2">
                    <input placeholder="Age" className="p-3 border rounded-lg text-sm w-full" value={dep.age} onChange={(e) => { const newDep = [...dependents]; newDep[index].age = e.target.value; setDependents(newDep); }} />
                    {index > 0 && <button type="button" onClick={() => removeDependent(index)} className="text-red-400 p-2"><Trash2 size={18}/></button>}
                  </div>
                </div>
              ))}
            </div>

            <button disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3">
              {loading ? "Redirecting..." : "Finalize & Pay $69.99"}
              <ShieldCheck size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}