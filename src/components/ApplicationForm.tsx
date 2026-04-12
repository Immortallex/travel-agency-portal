{/* 1. MANDATORY DATE OF BIRTH (Visible for all) */}
<div>
  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Date of Birth</label>
  <input name="dateOfBirth" type="date" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" />
</div>

{/* 2. CONSISTENT COUNTRY DROPDOWNS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Current Residence</label>
    <select name="residenceCountry" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none">
      <option value="">Select Country</option>
      {/* Include your full country list here */}
    </select>
  </div>
  <div>
    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Target Destination</label>
    <select name="destinationCountry" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none">
      <option value="">Select Destination</option>
      {["Canada", "United Kingdom", "United States", "Australia", "Germany"].map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  </div>
</div>

{/* 3. TECH-SPECIFIC UPLOAD (Only for /apply/tech) */}
{segment === 'tech' && (
  <div className="mt-8 pt-8 border-t border-slate-100">
    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Professional CV / Portfolio (PDF)</label>
    <div className="relative group">
      <input type="file" name="portfolioFile" accept=".pdf" className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all">
        <div className="p-4 bg-blue-100 rounded-2xl text-blue-600 mb-3 group-hover:scale-110 transition-transform">
          <PlusCircle size={24} />
        </div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Click to upload document</p>
      </label>
    </div>
  </div>
)}