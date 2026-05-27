/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, PhoneCall, Globe, Menu, X, Shield, Clock } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  onOpenCallbackModal: () => void;
}

export default function Header({ onNavigate, activeSection, onOpenCallbackModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Update a clean time string for transparency and real-time reliability
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString('es-PE', { hour12: false, timeZone: 'America/Lima' }) + ' PET');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Consultar Ingeniero', id: 'consultar' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80; // height of sticking header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Banner indicating SLA and Trust indicators */}
      {/* <div className="bg-[#0b0f19] border-b border-blue-950 text-slate-300 text-xs py-2 px-4 flex flex-wrap justify-between items-center transition-all">
        <div className="flex items-center space-x-4 mx-auto md:mx-0">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="font-medium">Canales Certificados ISO 9001</span>
          </div>
          <span className="hidden md:inline text-blue-900">|</span>
          <span className="hidden md:inline">Soporte de Emergencia de Planta Física: <span className="text-red-400 font-bold">+51 958 123 456</span></span>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Arequipa Nodo Central: <span className="font-mono text-slate-200">{timeStr}</span></span>
          </div>
          <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase animate-pulse">
            SISTEMAS OPERATIVOS
          </span>
        </div>
      </div> */}

      {/* Main Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0f1423]/95 backdrop-blur-md shadow-lg border-b border-slate-800'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo representing Lekanar exactly */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('inicio')}
              id="lekanar-logo"
            >
              {/* High-fidelity SVG logo as drawn in pictures */}
              <div className="relative">
                <svg className="w-11 h-11" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left node circle */}
                  <circle cx="18" cy="37.5" r="4.5" stroke="#f04e3b" strokeWidth="4" />
                  {/* Middle node circle */}
                  <circle cx="28" cy="19.2" r="4.5" stroke="#f04e3b" strokeWidth="4" />
                  {/* Right node circle */}
                  <circle cx="66.5" cy="14" r="4.5" stroke="#f04e3b" strokeWidth="4" />

                  {/* Left node leg */}
                  <path d="M 37.2 46 L 28 37.5 L 18 37.5" stroke="#f04e3b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Middle node leg */}
                  <path d="M 46 37.2 L 28 19.2" stroke="#f04e3b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Right node leg */}
                  <path d="M 60 34.1 L 58 22.5 L 66.5 14" stroke="#f04e3b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Main Outer Circle */}
                  <circle cx="58" cy="58" r="24" stroke="#f04e3b" strokeWidth="4" />
                  {/* Inner Core Circle */}
                  <circle cx="58" cy="58" r="7" stroke="#f04e3b" strokeWidth="4" />
                  {/* Smile Arc */}
                  <path d="M 73.5 58 A 15.5 15.5 0 0 1 58 73.5" stroke="#f04e3b" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-bold tracking-wider font-sans leading-none ${
                    scrolled ? 'text-white' : 'text-[#1e1b4b]'
                  }`}
                >
                  LEKANAR
                </span>
                <span className="text-[9px] tracking-[0.25em] text-red-500 font-bold uppercase font-mono">
                  REDES QUE INSPIRAN
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      scrolled
                        ? isActive
                          ? 'text-red-400 bg-red-950/30'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                        : isActive
                          ? 'text-red-500 bg-red-50'
                          : 'text-slate-600 hover:text-[#1e1b4b] hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Emergency & Callback Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <a 
                href="https://wa.me/51958123456" 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border text-xs font-semibold shadow-sm transition-all ${
                  scrolled 
                    ? 'border-slate-800 text-slate-300 bg-slate-900/40 hover:bg-slate-800' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                <span>Contactar SOPORTE</span>
              </a>

              <button
                onClick={onOpenCallbackModal}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:shadow-red-500/20 active:translate-y-0.5 focus:outline-none transition-all flex items-center space-x-2"
              >
                <Shield className="w-4 h-4 text-white" />
                <span>Solicitar Inspección</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg ${
                  scrolled ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
                } focus:outline-none`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu pane */}
        {mobileMenuOpen && (
          <div className={`xl:hidden animate-in fade-in slide-in-from-top-4 duration-200 ${
            scrolled ? 'bg-[#12192d] border-b border-slate-800' : 'bg-white border-b border-slate-200'
          }`}>
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                      scrolled
                        ? isActive
                          ? 'text-red-400 bg-red-950/45'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        : isActive
                          ? 'text-red-500 bg-red-50'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 pb-2 border-t border-slate-800/20 px-4 flex flex-col space-y-3">
                <a 
                  href="https://wa.me/51958123456" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 py-2.5 rounded-lg text-sm font-semibold"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Soporte WhatsApp (+51 958 123 456)</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCallbackModal();
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold"
                >
                  <Shield className="w-4 h-4" />
                  <span>Solicitar Inspección Técnica Gratis</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
