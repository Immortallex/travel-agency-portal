"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, User, ShieldCheck } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is in a protected area (Profile or Apply)
  useEffect(() => {
    const protectedPaths = ['/profile', '/apply'];
    setIsLoggedIn(protectedPaths.some(path => pathname.startsWith(path)));
  }, [pathname]);

  const handleLogout = () => {
    // In production, clear cookies/session here
    router.push('/');
  };

  return (
    <nav className="fixed w-full z-50 bg-[#0A192F]/90 backdrop-blur-lg border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black italic text-2xl tracking-tighter uppercase">
          FlyPath
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/track" className="hover:text-blue-400 transition">Track ID</Link>
          
          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link href="/auth" className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A192F] p-8 space-y-6 border-b border-white/10 animate-in slide-in-from-top">
           <Link href="/" onClick={()=>setIsOpen(false)} className="block text-2xl font-bold uppercase">Home</Link>
           <Link href="/track" onClick={()=>setIsOpen(false)} className="block text-2xl font-bold uppercase">Track ID</Link>
           {isLoggedIn ? (
             <button onClick={handleLogout} className="w-full bg-red-600 py-4 rounded-2xl font-bold uppercase flex items-center justify-center gap-2">
               <LogOut size={20} /> Logout
             </button>
           ) : (
             <Link href="/auth" onClick={()=>setIsOpen(false)} className="block w-full bg-blue-600 py-4 rounded-2xl font-bold text-center uppercase">
               Login / Sign Up
             </Link>
           )}
        </div>
      )}
    </nav>
  );
}