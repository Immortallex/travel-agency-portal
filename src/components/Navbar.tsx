"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage for the user session we saved in AuthPage
    const user = localStorage.getItem('flypath_user');
    setIsLoggedIn(!!user);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('flypath_user');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="fixed w-full z-50 bg-[#0A192F]/90 backdrop-blur-lg border-b border-white/10 text-white font-bold uppercase">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="italic text-2xl tracking-tighter">FlyPath</Link>
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/track" className="hover:text-blue-400 transition">Track ID</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link href="/auth" className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}