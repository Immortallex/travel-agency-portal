"use client";
import React, { useState } from 'react';

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Germany", "Australia", "France", "Nigeria", "Kenya", "Ghana", "South Africa", "Japan", "China"]; // Add full list as needed

export default function ApplicationForm({ segment, additionalFields }: { segment: string, additionalFields: React.ReactNode }) {
  const [formData, setFormData] = useState({
    tel: '',
    currentAddress: '',
    residenceCountry: '',
    destinationCountry: '',
    dateOfBirth: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to call your API route
    const response = await fetch('/api/apply', {
      method: 'POST',
      body: JSON.stringify({ ...formData, segment }),
    });
    const result = await response.json();
    if (!response.ok) alert(result.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 className="text-2xl font-bold capitalize">{segment} Application</h2>
      
      {/* Common Fields */}
      <input type="tel" placeholder="Phone Number" required className="w-full p-2 border" 
        onChange={(e) => setFormData({...formData, tel: e.target.value})} />
      
      <input type="text" placeholder="Current Address" required className="w-full p-2 border"
        onChange={(e) => setFormData({...formData, currentAddress: e.target.value})} />
      
      <select required className="w-full p-2 border"
        onChange={(e) => setFormData({...formData, residenceCountry: e.target.value})}>
        <option value="">Country of Residence</option>
        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select required className="w-full p-2 border"
        onChange={(e) => setFormData({...formData, destinationCountry: e.target.value})}>
        <option value="">Destination Country</option>
        {["Canada", "USA", "UK", "Australia", "Poland"].map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <div className="flex flex-col">
        <label className="text-sm">Date of Birth</label>
        <input type="date" required className="w-full p-2 border"
          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} />
      </div>

      {/* Segment Specific Fields */}
      <div className="pt-4 border-t">
        {additionalFields}
      </div>

      <button type="submit" className="bg-blue-600 text-white p-3 rounded">Proceed to Payment</button>
    </form>
  );
}