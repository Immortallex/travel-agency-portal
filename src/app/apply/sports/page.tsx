"use client";
import React, { useState } from 'react';
import { Upload, Trophy, Activity, Link as LinkIcon } from 'lucide-react';

export default function SportsApplication() {
  const [sport, setSport] = useState('Football');

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <Trophy className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-[#0A192F]">Sports Category Application</h1>
        </div>

        <form className="space-y-6">
          {/* Sport Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Select Sport</label>
              <select 
                value={sport} 
                onChange={(e) => setSport(e.target.value)}
                className="w-full p-3 border rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Position</label>
              <input type="text" placeholder="e.g. Point Guard / Striker" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>

          {/* Physical Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Height (cm/ft)</label>
              <div className="relative">
                <Activity className="absolute left-3 top-3 text-slate-400" size={18} />
                <input type="text" placeholder="e.g. 185cm" className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Highlight Video (Optional)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                <input type="url" placeholder="YouTube/Vimeo Link" className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          {/* Mandatory File Uploads */}
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="border-2 border-dashed border-slate-200 p-6 rounded-xl text-center">
              <Upload className="mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-bold">International Passport</p>
              <p className="text-xs text-slate-400 mb-4">PDF or JPG (Max 5MB)</p>
              <input type="file" className="text-xs" required />
            </div>
            <div className="border-2 border-dashed border-slate-200 p-6 rounded-xl text-center">
              <Upload className="mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-bold">CV / Resume</p>
              <p className="text-xs text-slate-400 mb-4">PDF Only (Max 2MB)</p>
              <input type="file" className="text-xs" required />
            </div>
          </div>

          <button className="w-full bg-[#0A192F] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-900 transition shadow-lg">
            Proceed to Secure Payment
          </button>
        </form>
      </div>
    </div>
  );
}
