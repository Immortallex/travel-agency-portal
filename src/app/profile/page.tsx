"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { FileText, CheckCircle, ArrowRight, User as UserIcon, LogOut, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [accountId, setAccountId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Captures User Info from LocalStorage
        const storedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');
        
        if (!storedUser.email) {
          router.push('/auth');
          return;
        }

        // Generate or retrieve a stable Account ID for the session
        // This creates a unique numeric ID peculiar to the current user's session
        const generatedId = storedUser.id ? storedUser.id.slice(-6).toUpperCase() : Math.floor(100000 + Math.random() * 900000);
        setAccountId(`FP-ACC-${generatedId}`);

        // 2. Fetch fresh data from MongoDB to get trackingId and paymentStatus
        const res = await fetch(`/api/user/profile?email=${storedUser.email.toLowerCase()}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('flypath_user');
    window.location.href = '/';
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
      <Loader2 className="text-blue-500 animate-spin" size={48} />
    </div>
  );

  // Database Check: Logic for paid status
  const isPaid = user?.paymentStatus === 'paid';

  return (
    <div className="min-h-screen bg-[#0A192F] text-white pb-20 pt-28">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        {/* WELCOME SECTION */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Welcome, <span className="text-blue-500">{user?.fullName || "Traveler"}</span>
          </h1>
          {/* UPDATED: Displays peculiar Account ID instead of Email */}
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs mt-2">
            Account ID: {accountId}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <UserIcon size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Applicant Portal</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Manage your Relocation Applications here</p>
              
              <div className="mt-10 space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-black uppercase text-slate-400">Completed Applications</span>
                  <span className="font-black text-blue-500">{isPaid ? '1' : '0'}</span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
              <FileText className="text-blue-500" />
              Active Relocation Files
            </h3>

            {isPaid ? (
              <div className="space-y-4">
                <div className="bg-white/5 border border-blue-500/30 rounded-[2.5rem] p-10 hover:bg-white/[0.07] transition-all shadow-xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase text-green-500">
                          <CheckCircle size={14} /> Verified & Paid
                        </span>
                      </div>
                      <h4 className="text-2xl font-black uppercase tracking-tight">Case ID: {user.trackingId}</h4>
                      <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">Application Status: Official File Generated</p>
                    </div>

                    <Link 
                      href={`/track/${user.trackingId}`} 
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-600/20"
                    >
                      View Official File <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/10 rounded-[2.5rem] p-20 text-center">
                <p className="text-slate-500 font-black uppercase tracking-widest text-sm">No active relocation files found.</p>
                {/* CORRECTED: Directs to internal pathways for logged-in user */}
                <Link href="/pathways" className="text-blue-500 text-[10px] font-black uppercase mt-4 inline-block hover:underline">
                  Start an application today
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}