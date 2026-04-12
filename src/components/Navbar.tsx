"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, LayoutDashboard, Search, LogOut, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check auth status on mount and sync with local storage
    const checkAuth = () => {
      const user = localStorage.getItem('flypath_user');
      setIsLoggedIn(!!user);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('flypath_user');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    router.push('/auth');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-[#0A192F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="text-white font-black italic text-2xl tracking-tighter flex items-center gap-1 group">
            FLYPATH<span className="text-blue-500 group-hover:animate-pulse">.</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/#pathways" className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-blue-400 transition-colors">
              Pathways
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* Dashboard Shortcut for Logged In Users */}
                <button 
                  onClick={() => router.push('/profile')}
                  className="bg-blue-600/10 text-blue-400 border border-blue-500/20 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                >
                  <LayoutDashboard size={14} /> My Dashboard
                </button>
                
                {/* Hamburger Trigger for Dashboard Actions */}
                <button 
                  onClick={toggleMenu}
                  className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all border border-white/10"
                >
                  <Menu size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => router.push('/auth')}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                Join Now
              </button>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={toggleMenu} className="md:hidden text-white p-2">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* SMART OVERLAY MENU (For Logged-in & Visitors) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-[#0A192F] flex flex-col items-center justify-center p-10 animate-in fade-in zoom-in duration-300">
          <button 
            onClick={toggleMenu} 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col gap-6 w-full max-w-sm">
            {isLoggedIn ? (
              <>
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] text-center mb-4">Account Menu</p>
                <button 
                  onClick={() => { router.push('/profile'); toggleMenu(); }}
                  className="w-full py-6 bg-white/5 rounded-2xl text-white font-black uppercase italic tracking-widest flex items-center justify-between px-8 group hover:bg-blue-600 transition-all"
                >
                  Dashboard <ChevronRight size={18} className="text-blue-500 group-hover:text-white" />
                </button>
                <button 
                  onClick={() => { router.push('/track'); toggleMenu(); }}
                  className="w-full py-6 bg-white/5 rounded-2xl text-white font-black uppercase italic tracking-widest flex items-center justify-between px-8 group hover:bg-blue-600 transition-all"
                >
                  Track Status <Search size={18} className="text-blue-500 group-hover:text-white" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full py-6 border border-red-500/20 rounded-2xl text-red-500 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/" onClick={toggleMenu} className="text-4xl font-black text-white uppercase italic text-center">Home</Link>
                <Link href="/#pathways" onClick={toggleMenu} className="text-4xl font-black text-white uppercase italic text-center">Pathways</Link>
                <button 
                  onClick={() => { router.push('/auth'); toggleMenu(); }}
                  className="mt-10 bg-blue-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em]"
                >
                  Join Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}