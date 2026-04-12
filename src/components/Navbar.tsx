"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Sync login state with local storage
    const checkAuth = () => {
      const user = localStorage.getItem('flypath_user');
      setIsLoggedIn(!!user);
    };

    checkAuth();
    // Listen for storage changes in case of logout in other tabs
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-[#0A192F]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-black italic text-2xl tracking-tighter">
          FLYPATH<span className="text-blue-500">.</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/#pathways" className="text-slate-300 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
            Pathways
          </Link>
          
          {/* ANTI-LOOP BUTTON LOGIC */}
          <button 
            onClick={() => router.push(isLoggedIn ? '/profile' : '/auth')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            {isLoggedIn ? 'My Dashboard' : 'Join Now'}
          </button>
        </div>
      </div>
    </nav>
  );
}