import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          <div className="text-sm text-slate-400">
            <p className="font-bold text-white text-lg mb-2">Project Success Hub</p>
            <p>&copy; {currentYear} Project Success Hub Nigeria. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="text-slate-400 hover:text-amber-400 transition-colors">About</Link>
            <Link href="/contact" className="text-slate-400 hover:text-amber-400 transition-colors">Contact</Link>
            <a href="https://selar.co/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
              Our Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
