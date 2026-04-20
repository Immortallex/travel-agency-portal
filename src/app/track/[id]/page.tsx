"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Printer, FileSearch, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function TrackingStatusPage({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetches the tracking ID status from our updated API
    fetch(`/api/track/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
      <Loader2 className="text-blue-500 animate-spin" size={48} />
    </div>
  );

  // UI FOR ID NOT FOUND: Returns the specific message and action required
  if (result?.notFound || result?.error) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-6 text-white">
        <Navbar />
        <div className="max-w-md w-full bg-white/5 p-10 rounded-[2.5rem] shadow-xl text-center border-2 border-dashed border-white/10">
          <FileSearch size={64} className="text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">No Application Found</h2>
          <p className="text-slate-400 mt-2 mb-8 font-medium">
            {result?.error || "No active Application were found."}
          </p>
          {/* Include a button that redirects to the payment/application start page */}
          <button 
            onClick={() => router.push('/auth')} 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            Start New Application <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // OFFICIAL PDF DATA PAGE: Rendered if ID is found and Paid
  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-10 print:p-0 print:bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none border-[12px] border-slate-50 relative mt-20">
        
        {/* Print Controls */}
        <div className="absolute top-8 right-8 print:hidden">
          <button 
            onClick={() => window.print()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
          >
            <Printer size={16} /> Print Official Page
          </button>
        </div>

        {/* PRINTABLE DATA CONTENT */}
        <div className="p-12 min-h-[1056px]">
          {/* Header Section */}
          <div className="flex justify-between border-b-4 border-blue-900 pb-8 mb-10">
            <div>
              <h1 className="text-4xl font-black italic text-blue-900 tracking-tighter">FLYPATH TRAVELS</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Verified Relocation Record</p>
            </div>
            
            {/* Passport Photo Slot */}
            <div className="w-32 h-40 border-2 border-slate-200 bg-slate-50 flex items-center justify-center text-center p-4">
              <p className="text-[8px] font-bold text-slate-400 uppercase">Affix Passport Photograph Here</p>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-blue-600 uppercase">Tracking ID</label>
                <p className="text-2xl font-mono font-bold text-slate-900">{result.data.trackingId}</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Full Name</label>
                <p className="text-xl font-bold text-slate-800 uppercase">{result.data.fullName}</p>
              </div>
            </div>

            <div className="space-y-8 border-l pl-12 border-slate-100">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Verification Status</label>
                <div className="flex items-center gap-2 text-green-600 font-black italic">
                  <ShieldCheck size={18} /> {result.data.status?.toUpperCase()}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Issue Date</label>
                <p className="font-bold text-slate-800">{new Date(result.data.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Verification Footer */}
          <div className="mt-20 p-8 bg-slate-50 border-t border-slate-200 rounded-xl relative overflow-hidden">
            <h4 className="text-xs font-black uppercase mb-2 text-slate-800">Official Notice:</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed max-w-md">
             A mail will be sent to you in 3 weeks after your application, this is to confirm your full application status.
              This document serves as an official confirmation of relocation application initiation with FlyPath Travels. 
              The holder is required to present this printed copy during physical verification. 
              Verify authenticity at www.flypathtravels.com/track/
            </p>
            {/* Decorative Security Seal */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-24 border-4 border-blue-900/10 rounded-full flex items-center justify-center text-blue-900/10 font-black text-[10px] uppercase -rotate-12 select-none">
              Verified<br/>Approved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}