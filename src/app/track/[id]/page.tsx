"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Printer, FileWarning, CheckCircle, ArrowRight } from 'lucide-react';

export default function TrackingPage({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/track/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-20 text-center font-bold">Loading Official File...</div>;

  // UI for ID NOT FOUND
  if (result?.error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl text-center">
          <FileWarning size={64} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase italic text-slate-800">No Application Found</h2>
          <p className="text-slate-500 mt-2 mb-8 font-medium">{result.error}</p>
          <button 
            onClick={() => router.push('/auth')} // Redirect to payment/signup start page
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            Start Application Today <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // OFFICIAL PDF DATA PAGE
  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-10 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none">
        
        {/* Controls */}
        <div className="p-4 bg-slate-800 flex justify-between items-center print:hidden">
          <span className="text-white text-xs font-bold uppercase tracking-widest">Official Document Viewer</span>
          <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm">
            <Printer size={16} /> Print Official Page
          </button>
        </div>

        {/* PRINTABLE AREA */}
        <div className="p-12 border-[16px] border-slate-50 min-h-[1056px] relative">
          
          {/* Header */}
          <div className="flex justify-between border-b-4 border-blue-900 pb-8 mb-10">
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter text-blue-900">FLYPATH TRAVELS</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Official Relocation Data Page</p>
            </div>
            
            {/* Passport Photo Placeholder */}
            <div className="w-32 h-40 border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-center p-2">
              <div className="w-12 h-12 bg-slate-200 rounded-full mb-2" />
              <p className="text-[8px] font-bold uppercase text-slate-400">Affix Passport Photograph Here</p>
            </div>
          </div>

          {/* User Data Sections */}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-blue-600 uppercase">Tracking Number</label>
                <p className="text-2xl font-mono font-bold text-slate-900">{result.data.trackingId}</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Full Legal Name</label>
                <p className="text-xl font-bold text-slate-800 uppercase">{result.data.fullName}</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Email Address</label>
                <p className="font-bold text-slate-700">{result.data.email}</p>
              </div>
            </div>

            <div className="space-y-8 border-l pl-12 border-slate-100">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Application Status</label>
                <div className="flex items-center gap-2 text-green-600 font-black italic">
                  <CheckCircle size={18} /> {result.data.paymentStatus?.toUpperCase()}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">File Created On</label>
                <p className="font-bold text-slate-800">{new Date(result.data.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="pt-4">
                <div className="w-24 h-24 border-4 border-blue-900/10 rounded-full flex items-center justify-center text-blue-900/20 font-black text-[10px] uppercase -rotate-12">
                  Verified<br/>Approved
                </div>
              </div>
            </div>
          </div>

          {/* Footer Information */}
          <div className="absolute bottom-12 left-12 right-12 border-t pt-6">
            <p className="text-[9px] text-slate-400 leading-relaxed">
              A mail will be sent to you in 3 weeks after your application, this is to confirm your full application status.
              This document serves as an official confirmation of relocation application initiation with FlyPath Travels. 
              The holder is required to present this printed copy during physical verification. 
              Verify authenticity at www.flypathtravels.com/track/{result.data.trackingId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}