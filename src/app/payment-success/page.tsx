"use client";
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="bg-white max-w-md w-full rounded-[3rem] p-10 shadow-2xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          
          <h1 className="text-3xl font-black text-[#0A192F] uppercase italic tracking-tighter mb-2">Payment Received</h1>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Application Reference: #FLY-{Math.floor(Math.random() * 10000)}</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-400">Amount Paid:</span>
              <span className="text-[#0A192F]">$69.99 USD</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-400">Status:</span>
              <span className="text-green-600">Confirmed</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button onClick={() => window.print()} className="w-full bg-[#0A192F] text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
              <Download size={14} /> Download Receipt
            </button>
            <Link href="/profile" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              Go to Dashboard <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}