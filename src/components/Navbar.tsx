"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, User, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('flypath_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem('flypath_user');
    window.location.href = '/';
  };

  const navLinks = user 
    ? [
        { name: 'Dashboard', href: '/profile', icon: <User size={18}/> },
        { name: 'New Application', href: '/', icon: <Search size={18}/> },
      ]
    : [
        { name: 'Login', href: '/auth' },
        { name: 'Sign Up', href: '/auth' },
        { name: 'Track Application', href: '/track' },
      ];

  return (
    <nav className="bg-[#0A192F] text-white p-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-black italic">FLYPATH</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => <Link key={link.name} href={link.href}>{link.name}</Link>)}
          {user && <button onClick={logout} className="text-red-400">Logout</button>}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0A192F] border-t border-white/10 p-6 space-y-4 flex flex-col">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-xl flex items-center gap-3">
              {link.icon} {link.name}
            </Link>
          ))}
          {user && <button onClick={logout} className="text-xl text-red-400 flex items-center gap-3"><LogOut size={18}/> Logout</button>}
        </div>
      )}
    </nav>
  );
}