import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'AI Studio', id: 'tools' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNav = (id: string) => {
    setView(id);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`rounded-full px-6 transition-all duration-300 ${
            scrolled 
              ? 'bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-lg h-16' 
              : 'bg-transparent h-20'
          } flex justify-between items-center`}
        >
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl mr-3 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <Zap className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Nexus</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentView === link.id
                    ? 'bg-white/10 text-white shadow-inner border border-white/5'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex">
             <button 
                onClick={() => handleNav('contact')}
                className="bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-50 transition-colors"
             >
               Book Demo
             </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full px-4 mt-2">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};