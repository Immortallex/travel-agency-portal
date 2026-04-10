"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Plane, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    if (user) setIsLoggedIn(true);
  }, []);

  const navLinks = [
    { name: 'Track Application', path: '/track', icon: <Search size={18} /> },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0A192F]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <Plane className="text-blue-500" />
          <span className="font-black text-xl uppercase tracking-tighter">FlyPath</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className="text-slate-300 hover:text-white text-sm font-bold uppercase tracking-widest transition">
              {link.name}
            </Link>
          ))}
          {!isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/auth" className="text-white text-sm font-bold uppercase">Login</Link>
              <Link href="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </div>
          ) : (
            <Link href="/profile" className="bg-white/10 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm">Profile</Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON (The Three Lines) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE OVERLAY MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#0A192F] border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link href="/track" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase flex items-center gap-3">
            <Search size={20} /> Track Application
          </Link>
          <hr className="border-white/5" />
          {!isLoggedIn ? (
            <>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="text-slate-400 text-lg font-bold uppercase">Login</Link>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white p-4 rounded-2xl text-center font-black uppercase tracking-widest">
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