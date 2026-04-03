"use client";
import React, { useState } from 'react';
import { Code, Globe, Terminal, Upload, Link as LinkIcon } from 'lucide-react';

export default function TechApplication() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-sm border p-10">
        <div className="flex items-center gap-3 mb-8 border-b pb-6">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <Code size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0A192F]">Tech & Engineering Path</h1>
            <p className="text-sm text-slate-500">Professional Skill-Based Migration</p>
          </div>
        </div>

        <form className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-slate-700">Primary Stack</label>
              <input type="text" placeholder="e.g. Next.js, Python, AWS" className="w-full p-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-slate-700">Years of Experience</label>
              <input type="number" placeholder="e.g. 5" className="w-full p-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-slate-700">GitHub / Portfolio Link</label>
            <div className="relative">
              <Globe className="absolute left-4 top-4 text-slate-400" size={20} />
              <input type="url" placeholder="https://github.com" className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="border-2 border-dashed border-slate-200 p-8 rounded-[2rem] text-center hover:border-blue-400 transition-all">
              <Upload className="mx-auto mb-3 text-blue-600" size={32} />
              <p className="text-sm font-bold text-[#0A192F]">International Passport</p>
              <p className="text-xs text-slate-400 mt-1">Mandatory PDF/JPG</p>
            </div>
            <div className="border-2 border-dashed border-slate-200 p-8 rounded-[2rem] text-center hover:border-blue-400 transition-all">
              <Upload className="mx-auto mb-3 text-blue-600" size={32} />
              <p className="text-sm font-bold text-[#0A192F]">Professional CV</p>
              <p className="text-xs text-slate-400 mt-1">Mandatory PDF Only</p>
            </div>
          </div>

          <button className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all shadow-xl active:scale-95">
            Proceed to Secure Payment ($69.99)
          </button>
        </form>
      </div>
    </div>
  );
}
