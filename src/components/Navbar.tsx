"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Plane, Search, LogIn, UserPlus, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('flypath_user');
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push('/auth');
  };

  return (
    <nav className="fixed w-full z-[100] bg-[#0A192F]/95 backdrop-blur-md border-b border-white/10 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Plane className="text-blue-500" />
          <span className="font-black text-2xl uppercase tracking-tighter">FlyPath</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {!isLoggedIn ? (
            <div className="flex gap-6">
              <Link href="/auth" className="text-white text-sm font-bold uppercase">Login</Link>
              <Link href="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm">Sign Up</Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link href="/profile" className="text-white text-sm font-bold uppercase flex items-center gap-2"><User size={16}/> Profile</Link>
              <button onClick={handleLogout} className="text-red-400 text-sm font-bold uppercase flex items-center gap-2"><LogOut size={16}/> Logout</button>
            </div>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0A192F] p-8 flex flex-col gap-6 md:hidden shadow-2xl border-b border-white/10">
          {!isLoggedIn ? (
            <>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase flex items-center gap-3"><LogIn size={20}/> Login</Link>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white p-4 rounded-2xl text-center font-bold uppercase">Sign Up</Link>
            </>
          ) : (
            <>
              <Link href="/profile" onClick={() => setIsOpen(false)} className="text-white text-lg font-bold uppercase flex items-center gap-3"><User size={20}/> My Profile</Link>
              <button onClick={handleLogout} className="text-red-400 text-lg font-bold uppercase flex items-center gap-3 w-full text-left border-t border-white/10 pt-6"><LogOut size={20}/> Logout Session</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}