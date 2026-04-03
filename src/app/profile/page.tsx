"use client";
import React from 'react';
import Link from 'next/link';
import { User, ClipboardList, Settings, Plus, LogOut, ShieldCheck } from 'lucide-react';

export default function UserDashboard() {
  // Real check: If no applications are found in MongoDB, show the empty state
  const applications = []; 

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR (Professional) */}
      <aside className="w-72 bg-[#0A192F] hidden lg:flex flex-col p-8 text-white">
        <div className="mb-12">
          <h1 className="text-2xl font-black italic tracking-tighter">FLYPATH</h1>
        </div>
        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 bg-blue-600 p-4 rounded-2xl font-bold">
            <User size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-2xl font-medium text-slate-400 hover:bg-white/5 hover:text-white transition">
            <Settings size={20} /> Settings
          </button>
        </nav>
        <button className="flex items-center gap-3 p-4 rounded-2xl font-medium text-red-400 hover:bg-red-500/10 transition mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#0A192F]">Portal Dashboard</h2>
            <p className="text-slate-500">Welcome to your FlyPath Travels command center.</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-xs">
            <ShieldCheck size={16} /> VERIFIED ACCOUNT
          </div>
        </header>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><ClipboardList className="text-blue-600" /> Recent Applications</h3>
            <Link href="/" className="bg-[#0A192F] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
              <Plus size={18} /> New Application
            </Link>
          </div>

          {applications.length > 0 ? (
            <div className="grid gap-4">
              {/* This is where paid apps will eventually appear */}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] py-24 text-center">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Plus size={40} />
              </div>
              <p className="text-slate-400 font-medium mb-8">You haven't started any relocation applications yet.</p>
              <Link href="/" className="text-blue-600 font-bold hover:underline">View Relocation Pathways</Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}