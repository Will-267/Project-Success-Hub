"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClasses = (href: string) =>
    `px-1 py-2 text-sm font-medium transition-colors border-b-2 ${
      pathname === href
        ? 'border-amber-400 text-slate-900'
        : 'border-transparent text-slate-500 hover:text-slate-900'
    }`;
    
  const mobileNavLinkClasses = (href: string) =>
  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
    pathname === href
      ? 'bg-slate-900 text-white'
      : 'text-slate-800 hover:bg-slate-100'
  }`;

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              Project Success Hub
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className={navLinkClasses('/')}>Home</Link>
              <Link href="/about" className={navLinkClasses('/about')}>About</Link>
              <Link href="/products" className={navLinkClasses('/products')}>Products</Link>
              <Link href="/blog" className={navLinkClasses('/blog')}>Blog</Link>
              <Link href="/contact" className={navLinkClasses('/contact')}>Contact</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w.3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={mobileNavLinkClasses('/')} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/about" className={mobileNavLinkClasses('/about')} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/products" className={mobileNavLinkClasses('/products')} onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link href="/blog" className={mobileNavLinkClasses('/blog')} onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link href="/contact" className={mobileNavLinkClasses('/contact')} onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
