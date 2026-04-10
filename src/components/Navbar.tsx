"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Plane, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('flypath_user'));
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-[#0A192F]/90 backdrop-blur-md border-b border-white/10 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Plane className="text-blue-500" />
          <span className="font-black text-2xl uppercase tracking-tighter">FlyPath</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/track" className="text-slate-300 hover:text-white text-sm font-bold uppercase tracking-widest">Track</Link>
          {!isLoggedIn ? (
            <Link href="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm">Join Now</Link>
          ) : (
            <Link href="/profile" className="flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm border border-white/10">
              <User size={16}/> Profile
            </Link>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0A192F] p-8 flex flex-col gap-6 md:hidden">
          <Link href="/track" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase">Track Progress</Link>
          {!isLoggedIn ? (
            <Link href="/auth" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white p-4 rounded-xl text-center font-bold uppercase">Sign In</Link>
          ) : (
            <Link href="/profile" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase">My Profile</Link>
          )}
        </div>
      )}
    </nav>
  );
}