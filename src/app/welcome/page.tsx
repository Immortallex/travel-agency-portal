"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
      <Navbar />
      <div className="max-w-lg w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-slate-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Registration Successful!</h1>
        <p className="text-slate-500 mt-6 font-medium leading-relaxed">
          Your account has been initialized. We have sent a **Confirmation Email** to your inbox. 
        </p>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4 text-left">
          <Mail className="text-blue-600 shrink-0" />
          <p className="text-xs text-blue-900 font-bold uppercase tracking-tight">
            Please check your email to verify your identity before proceeding with applications.
          </p>
        </div>

        <Link href="/apply" className="mt-10 w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all">
          Browse Pathways <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}