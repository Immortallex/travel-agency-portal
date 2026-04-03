"use client";
import { Code, Terminal, Globe } from 'lucide-react';

export default function TechApplication() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-[#0A192F] mb-6 flex items-center gap-2">
          <Code className="text-blue-600" /> Tech & Engineering Path
        </h1>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Primary Stack</label>
              <input type="text" className="w-full p-3 border rounded-lg" placeholder="e.g. Next.js, Python" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">GitHub URL</label>
              <div className="relative">
                <Github className="absolute left-3 top-3 text-slate-400" size={18} />
                <input type="url" className="w-full pl-10 pr-4 py-3 border rounded-lg" placeholder="https://github.com..." required />
              </div>
            </div>
          </div>
          {/* Passport & CV Upload components here */}
          <button className="w-full bg-[#0A192F] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition">
            Proceed to Crypto Payment ($50.00)
          </button>
        </form>
      </div>
    </div>
  );
}
