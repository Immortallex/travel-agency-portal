"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, ShieldCheck, Clock, FileText, ChevronRight, LayoutDashboard } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [unfinishedApps, setUnfinishedApps] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('flypath_user');
    if (!storedUser) {
      router.push('/auth');
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      // Fetch user's applications from API
      fetch(`/api/user/applications?userId=${userData.id}`)
        .then(res => res.json())
        .then(data => setUnfinishedApps(data.filter((a: any) => !a.isCompleted)));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('flypath_user');
    router.push('/auth');
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <div className="pt-28 pb-12 px-4 max-w-6xl mx-auto">
        {/* WELCOME HEADER */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <User size={32} />
            </div>
            <div>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">Welcome back,</p>
              <h1 className="text-3xl font-black text-[#0A192F] tracking-tight">{user.fullName || user.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck size={14} className="text-green-500"/>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Verified Client</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full md:w-auto bg-slate-50 text-slate-600 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-2 border border-slate-100"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* UNFINISHED APPLICATIONS */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <LayoutDashboard className="text-blue-600" size={24} />
                <h3 className="text-xl font-black text-[#0A192F] uppercase italic">My Pathways</h3>
              </div>
              
              {unfinishedApps.length > 0 ? (
                <div className="space-y-4">
                  {unfinishedApps.map((app: any) => (
                    <div key={app._id} className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm"><FileText size={20} className="text-blue-600"/></div>
                        <div>
                          <h4 className="font-bold text-[#0A192F] capitalize">{app.segment} Application</h4>
                          <p className="text-xs text-slate-500">Last updated: {new Date(app.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => router.push(`/apply/${app.segment}`)}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-md"
                      >
                        Continue
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                  <Clock className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No active applications found</p>
                  <button 
                    onClick={() => router.push('/#pathways')}
                    className="mt-4 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
                  >
                    Start an application now →
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* SIDEBAR INFO */}
          <div className="space-y-6">
            <div className="bg-[#0A192F] p-8 rounded-[2rem] text-white shadow-xl">
              <h4 className="text-lg font-black uppercase italic mb-4">Relocation Tip</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ensure your International Passport is valid for at least 6 months before submitting your final pathway file.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/YOUR_PHONE_NUMBER" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
      >
        <img src="/images/whatsapp-logo.webp" alt="WhatsApp" className="w-7 h-7" />
      </a>
    </main>
  );
}