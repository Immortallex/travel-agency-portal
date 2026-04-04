"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Clear session logic here
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Apply', href: '/auth' },
    { name: 'Track', href: '/track' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-[#0A192F]/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black italic text-2xl tracking-tighter">
          <Plane className="text-blue-500" /> FLYPATH
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className="hover:text-blue-400 transition">{link.name}</Link>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Mobile Toggle (3 Lines) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden bg-[#0A192F] border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block text-xl font-bold uppercase">{link.name}</Link>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 py-4 rounded-2xl font-bold uppercase">
            <LogOut size={20} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}