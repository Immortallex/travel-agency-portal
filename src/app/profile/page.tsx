"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { FileText, Clock, CheckCircle, ArrowRight, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's applications from your API
    const fetchApps = async () => {
      try {
        const res = await fetch('/api/user/applications');
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (err) {
        console.error("Error loading applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A192F] text-white pb-20 pt-28">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / User Info */}
          <div className="w-full md:w-1/3">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <UserIcon size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Applicant Portal</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Manage your global relocation files</p>
              
              <div className="mt-10 space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-slate-400">Total Files</span>
                  <span className="font-black text-blue-500">{applications.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content: Active Relocation Files */}
          <div className="w-full md:w-2/3">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-4">
              <FileText className="text-blue-500" />
              Active Relocation Files
            </h3>

            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2].map(i => <div key={i} className="h-32 bg-white/5 rounded-[2.5rem]" />)}
              </div>
            ) : applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app: any) => (
                  <div key={app.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/[0.07] transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase bg-blue-600 px-3 py-1 rounded-full">
                            {app.segment} Pathway
                          </span>
                          {app.status === 'paid' ? (
                            <span className="flex items-center gap-1 text-[10px] font-black uppercase text-green-500">
                              <CheckCircle size={12} /> Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-black uppercase text-amber-500">
                              <Clock size={12} /> Pending Payment
                            </span>
                          )}
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tight">Case ID: #{app.id.slice(-6)}</h4>
                        <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
                      </div>

                      {app.status === 'pending' && (
                        <Link 
                          href={app.paymentUrl || '#'} 
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                        >
                          Resume & Pay <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/10 rounded-[2.5rem] p-20 text-center">
                <p className="text-slate-500 font-black uppercase tracking-widest text-sm">No active relocation files found.</p>
                <Link href="/apply" className="text-blue-500 text-[10px] font-black uppercase mt-4 inline-block hover:underline">Start an application today</Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}