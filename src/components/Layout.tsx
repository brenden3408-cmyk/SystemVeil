import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#sv-grad)" fillOpacity="0.1"/>
              <path d="M21 6.5H14C12.3431 6.5 11 7.84315 11 9.5C11 11.1569 12.3431 12.5 14 12.5H18C19.6569 12.5 21 13.8431 21 15.5C21 17.1569 19.6569 18.5 18 18.5H11L16 25.5L21 18.5" stroke="url(#sv-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="sv-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B5CF6"/>
                  <stop offset="1" stopColor="#D946EF"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="font-semibold text-lg tracking-tight">SystemVeil</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-surface border-b border-white/5 p-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium p-2 rounded-md ${
                  location.pathname === link.path ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 bg-white text-black px-4 py-3 rounded-lg text-sm font-medium mt-2"
            >
              Start a Project
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-surface/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#sv-grad-footer)" fillOpacity="0.1"/>
                <path d="M21 6.5H14C12.3431 6.5 11 7.84315 11 9.5C11 11.1569 12.3431 12.5 14 12.5H18C19.6569 12.5 21 13.8431 21 15.5C21 17.1569 19.6569 18.5 18 18.5H11L16 25.5L21 18.5" stroke="url(#sv-grad-footer)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="sv-grad-footer" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6"/>
                    <stop offset="1" stopColor="#D946EF"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-semibold tracking-tight">SystemVeil</span>
            </Link>
            <p className="text-white/50 text-sm max-w-sm mb-6">
              Engineering digital experiences that perform. We build modern, scalable, and secure web applications for forward-thinking businesses.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/70 font-mono">
              <a href="mailto:Brenden@systemveil.com" className="hover:text-white transition-colors">Brenden@systemveil.com</a>
              <a href="tel:647-563-4664" className="hover:text-white transition-colors">647-563-4664</a>
              <span>Mississauga, Ontario</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              <li>Web Design</li>
              <li>Frontend Development</li>
              <li>Full-Stack Applications</li>
              <li>E-Commerce Solutions</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} SystemVeil. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
