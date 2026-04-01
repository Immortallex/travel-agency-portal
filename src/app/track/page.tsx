import React from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function TrackApplication() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-[#0A192F] mb-2">Track Application</h1>
        <p className="text-slate-500 mb-8">Enter your unique FlyPath ID to view your real-time status.</p>
        
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="FP-2026-XXXX-XXXX" 
            className="w-full p-4 pr-12 border-2 border-slate-200 rounded-2xl focus:border-blue-500 outline-none uppercase font-mono tracking-widest text-lg"
          />
          <button className="absolute right-3 top-3 bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-700 transition">
            <Search size={24} />
          </button>
        </div>

        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 hidden">
           {/* This section will show after the search */}
           <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-500 uppercase font-bold">Current Status:</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Pending Review</span>
           </div>
        </div>
      </div>
    </div>
  );
}
