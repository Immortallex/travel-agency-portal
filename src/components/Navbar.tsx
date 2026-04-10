"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Plane, Search, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-[#0A192F]/95 backdrop-blur-md border-b border-white/10 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Plane className="text-blue-500 fill-blue-500" />
          <span className="font-black text-2xl uppercase tracking-tighter">FlyPath</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/track" className="text-slate-300 hover:text-white text-sm font-bold uppercase tracking-widest">Track</Link>
          {!isLoggedIn ? (
            <div className="flex gap-6">
              <Link href="/auth" className="text-white text-sm font-bold uppercase border-b-2 border-transparent hover:border-blue-500 pb-1">Login</Link>
              <Link href="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm">Sign Up</Link>
            </div>
          ) : (
            <Link href="/profile" className="bg-white/10 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm">Profile</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0A192F] border-b border-white/10 p-8 flex flex-col gap-8 md:hidden shadow-2xl z-50">
          <Link href="/track" onClick={() => setIsOpen(false)} className="text-white text-xl font-black uppercase flex items-center gap-3"><Search /> Track Application</Link>
          <hr className="border-white/10" />
          {!isLoggedIn ? (
            <>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="text-white text-xl font-black uppercase flex items-center gap-3"><LogIn /> Login</Link>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white p-5 rounded-2xl text-center font-black uppercase flex items-center justify-center gap-3"><UserPlus /> Sign Up Now</Link>
            </>
          ) : (
            <Link href="/profile" onClick={() => setIsOpen(false)} className="text-white text-xl font-black uppercase">My Profile</Link>
          )}
        </div>
      )}
    </nav>
  );
}