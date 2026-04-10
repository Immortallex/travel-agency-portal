"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Plane, Search, User, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-[#0A192F]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Plane className="text-blue-500" />
          <span className="font-black text-xl uppercase tracking-tighter">FlyPath</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/track" className="text-slate-300 hover:text-white text-sm font-bold uppercase tracking-widest transition flex items-center gap-2">
            <Search size={16} /> Track Application
          </Link>
          {!isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link href="/auth" className="text-white text-sm font-bold uppercase border-b border-transparent hover:border-blue-500 transition">Login</Link>
              <Link href="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm hover:bg-blue-700 transition">Sign Up</Link>
            </div>
          ) : (
            <Link href="/profile" className="flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm">
              <User size={16} /> Profile
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (The Three Lines) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A192F] border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link href="/track" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase flex items-center gap-3">
            <Search size={20} /> Track Application
          </Link>
          <hr className="border-white/10" />
          {!isLoggedIn ? (
            <>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase flex items-center gap-3">
                <LogIn size={20}/> Login
              </Link>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white p-4 rounded-2xl text-center font-black uppercase tracking-widest shadow-lg">
                Sign Up Now
              </Link>
            </>
          ) : (
            <Link href="/profile" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase">My Profile</Link>
          )}
        </div>
      )}
    </nav>
  );
}