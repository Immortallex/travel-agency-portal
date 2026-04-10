"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Plane, Search, LogIn, UserPlus, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="fixed w-full z-[100] bg-[#0A192F]/95 backdrop-blur-md border-b border-white/10 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white group">
          <Plane className="text-blue-500 group-hover:rotate-12 transition-transform" />
          <span className="font-black text-2xl uppercase tracking-tighter">FlyPath</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/track" className="text-slate-300 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition">Track Application</Link>
          {!isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link href="/auth" className="text-white text-xs font-black uppercase hover:text-blue-400 transition">Login</Link>
              <Link href="/auth" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">Sign Up</Link>
            </div>
          ) : (
            <Link href="/profile" className="flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-xl font-black uppercase text-xs border border-white/10">
              <User size={14} /> Profile
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white hover:text-blue-500 transition">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0A192F] border-b border-white/10 p-8 flex flex-col gap-6 md:hidden animate-in slide-in-from-top duration-300 z-50 shadow-2xl">
          <Link href="/track" onClick={() => setIsOpen(false)} className="text-white text-lg font-black uppercase flex items-center gap-4 border-b border-white/5 pb-4">
            <Search size={20} className="text-blue-500"/> Track Application
          </Link>
          {!isLoggedIn ? (
            <>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="text-white text-lg font-black uppercase flex items-center gap-4 border-b border-white/5 pb-4">
                <LogIn size={20} className="text-blue-500"/> Login
              </Link>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white p-5 rounded-2xl text-center font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl">
                <UserPlus size={20}/> Sign Up Now
              </Link>
            </>
          ) : (
            <Link href="/profile" onClick={() => setIsOpen(false)} className="text-white text-lg font-black uppercase flex items-center gap-4">
              <User size={20} className="text-blue-500"/> My Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}