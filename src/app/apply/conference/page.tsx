"use client";
import { Mic2, Calendar, MapPin } from 'lucide-react';

export default function ConferenceForm() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border rounded-3xl shadow-sm my-12">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-[#0A192F]"><Mic2 className="text-blue-600" /> Conference Relocation</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Official Conference Name" className="w-full p-4 border rounded-xl" required />
        <div className="grid grid-cols-2 gap-4">
          <div className="relative"><Calendar className="absolute left-3 top-4 text-slate-400" size={18}/><input type="date" className="w-full pl-10 p-4 border rounded-xl" required /></div>
          <div className="relative"><MapPin className="absolute left-3 top-4 text-slate-400" size={18}/><input type="text" placeholder="Host City/Country" className="w-full pl-10 p-4 border rounded-xl" required /></div>
        </div>
        <textarea placeholder="Briefly describe your role at the conference (e.g. Speaker, Attendee)" className="w-full p-4 border rounded-xl h-32" required />
        <button className="w-full bg-[#0A192F] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg">Proceed to Crypto Payment ($69.99)</button>
      </form>
    </div>
  );
}