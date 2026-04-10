"use client";
import React, { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { createCryptoInvoice } from '@/app/actions/crypto';

export default function PathwayForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);
      const savedUser = JSON.parse(localStorage.getItem('flypath_user') || '{}');

      if (!savedUser.id) {
        alert("Please login again to continue.");
        return;
      }

      // Create the payload for the backend
      const finalData = new FormData();
      finalData.append("passport", formData.get("passport") as File);
      finalData.append("userId", savedUser.id);
      
      // Collect all other fields (including 'dob') into a JSON string
      const details = Object.fromEntries(formData.entries());
      delete details.passport; // Don't include the file object in the JSON string
      finalData.append("formData", JSON.stringify(details));

      const res = await fetch('/api/apply/submit', { 
        method: 'POST', 
        body: finalData 
      });

      const result = await res.json();

      if (res.ok && result.applicationId) {
        // This triggers the NowPayments redirect
        const paymentUrl = await createCryptoInvoice(result.applicationId);
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          alert("Could not generate payment link. Check your API Key.");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Submission failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-xs font-bold uppercase text-slate-500 ml-2">Date of Birth</label>
        <input name="dob" type="date" className="p-4 border rounded-2xl bg-slate-50" required />
      </div>

      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
        <input type="file" name="passport" className="absolute inset-0 opacity-0 cursor-pointer" required />
        <Upload className="mx-auto text-slate-300 mb-2" size={32} />
        <p className="text-sm font-bold text-slate-500">Upload International Passport</p>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-xl flex justify-center items-center gap-2">
        {loading ? <Loader2 className="animate-spin" /> : "Apply & Pay ($69.99)"}
      </button>
    </form>
  );
}