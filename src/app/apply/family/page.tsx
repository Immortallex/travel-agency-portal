"use client";
import { Users, Plus, Trash2 } from 'lucide-react';

export default function FamilyForm() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white border rounded-3xl shadow-sm my-12">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6"><Users className="text-blue-600" /> Family Relocation</h2>
      <div className="space-y-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="font-bold mb-4 text-slate-700">Primary Applicant (You)</p>
          <input type="text" placeholder="Relationship: Principal" className="w-full p-3 border rounded-lg bg-white" disabled />
        </div>

        <div className="p-4 border-2 border-dashed border-slate-100 rounded-xl">
          <p className="font-bold mb-4 text-slate-700">Dependents</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
             <input type="text" placeholder="Name" className="p-3 border rounded-lg" />
             <select className="p-3 border rounded-lg"><option>Spouse</option><option>Child</option></select>
          </div>
          <button className="flex items-center gap-2 text-blue-600 text-sm font-bold"><Plus size={18}/> Add Another Dependent</button>
        </div>

        <button className="w-full bg-[#0A192F] text-white py-4 rounded-xl font-bold">Submit Family Application ($69.99)</button>
      </div>
    </div>
  );
}
