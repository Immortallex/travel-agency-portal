"use client";
import React, { useState } from 'react';
import { Search, Loader2, ShieldCheck, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function TrackPage() {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    // Prevent empty searches that trigger the 400 error
    if (!searchId.trim()) {
      setError('Tracking ID is required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Direct call to the updated API route
      const res = await fetch(`/api/track/${searchId.trim().toUpperCase()}`);
      const data = await res.json();

      if (res.ok) {
        // If found, we redirect to the dynamic official data page
        router.push(`/track/${searchId.trim().toUpperCase()}`);
      } else {
        // If the API returns 404 (Not Found), display your required message
        setError(data.error || 'No active Application were found.');
        setResult(null);
      }
    } catch (err) {
      setError('System error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-32 flex flex-col items-center px-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-black text-[#0A192F] uppercase mb-2">Track Application</h1>
          <p className="text-slate-500 mb-8">Enter your FP-2026 code to view your relocation status.</p>
          
          <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="FP-2026-XXXX-XXXX"
              value={searchId}
              onChange={(e) => {
                setSearchId(e.target.value.toUpperCase());
                if (error) setError(''); // Clear error while typing
              }}
              className="w-full p-5 border-2 border-slate-200 rounded-3xl outline-none focus:border-blue-600 font-mono text-lg tracking-widest uppercase"
            />
            <button 
              onClick={handleSearch} 
              disabled={loading} 
              className="absolute right-3 top-3 bg-blue-600 p-3 rounded-2xl text-white hover:bg-blue-700 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={24} />}
            </button>
          </div>

          {/* Error display for "No active Application were found" */}
          {error && (
            <div className="bg-red-50 p-4 rounded-2xl mb-6 border border-red-100 animate-in fade-in slide-in-from-top-1">
              <p className="text-red-500 font-bold text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-blue-50 text-left animate-in zoom-in duration-300">
               <div className="flex justify-between items-center mb-6">
                 <span className="text-xs font-black uppercase text-slate-400">Current Status</span>
                 <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${result.data?.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                   {result.data?.paymentStatus || 'Pending'}
                 </span>
               </div>
               <h3 className="text-xl font-bold text-[#0A192F] mb-1">Relocation File</h3>
               <p className="text-sm text-slate-500 mb-6">Unique ID: {searchId}</p>
               <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                 <Clock className="text-blue-600" size={20} />
                 <p className="text-xs text-slate-600">Your documents are currently under verification by our legal team.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}