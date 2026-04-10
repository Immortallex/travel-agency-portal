"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  ClipboardList, 
  Settings, 
  Plus, 
  LogOut, 
  ShieldCheck, 
  ChevronRight,
  Clock
} from 'lucide-react';

export default function UserDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  
  // Real check: If no applications are found in MongoDB, show the empty state
  const applications = []; 

  useEffect(() => {
    // Retrieve the persistent session from localStorage
    const savedUser = localStorage.getItem('flypath_user');
    if (!savedUser) {
      router.push('/auth');
    } else {
      setUserData(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('flypath_user'); //
    router.push('/auth');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR (Professional) */}
      <aside className="w-72 bg-[#0A192F] hidden lg:flex flex-col p-8 text-white sticky top-0 h-screen">
        <div className="mb-12">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">FLYPATH</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 bg-blue-600 p-4 rounded-2xl font-bold transition">
            <User size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-2xl font-medium text-slate-400 hover:bg-white/5 hover:text-white transition">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 rounded-2xl font-medium text-red-400 hover:bg-red-500/10 transition mt-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-black text-[#0A192F] uppercase tracking-tight">Welcome, {userData.name}</h2>
            <p className="text-slate-500 font-medium">Manage your global relocation pathways and track progress.</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-xs">
            <ShieldCheck size={16} /> VERIFIED ACCOUNT
          </div>
        </header>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-[#0A192F]">
              <ClipboardList className="text-blue-600" /> Recent Applications
            </h3>
            {/* Link pointed to relocation selection */}
            <Link 
              href="/apply" 
              className="bg-[#0A192F] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-900 transition shadow-lg shadow-blue-900/20"
            >
              <Plus size={18} /> New Application
            </Link>
          </div>

          {applications.length > 0 ? (
            <div className="grid gap-4">
              {/* This is where paid apps will appear after database integration */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0A192F]">Tech Relocation Pathway</p>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">ID: FP-82910-TK</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-bold text-[10px] uppercase">Processing</span>
                  <ChevronRight className="text-slate-300" size={20} />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] py-24 text-center">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Plus size={40} />
              </div>
              <p className="text-slate-400 font-medium mb-8">You haven't started any relocation applications yet.</p>
              <Link 
                href="/apply" 
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
              >
                Choose a pathway to begin <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}