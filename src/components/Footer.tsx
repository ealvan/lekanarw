/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Youtube, 
  Instagram, 
  Linkedin, 
  ShieldCheck, 
  ArrowUpCircle
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const servicesLinks = [
    { title: 'Tendido de fibra optica', hash: 'servicios' },
    { title: 'Planta interna', hash: 'servicios' },
    { title: 'Planta externa', hash: 'servicios' },
    { title: 'Estudio y diseño de red', hash: 'servicios' },
    { title: 'Creación de software a medida', hash: 'servicios' },
    { title: 'Consultas Técnicas de Campo', hash: 'consultar' }
  ];

  return (
    <footer className="bg-[#050811] text-slate-300 pt-16 pb-8 border-t border-slate-900 font-sans relative">
      
      {/* Scroll Top Button Trigger */}
      <div className="absolute top-0 right-10 -translate-y-1/2">
        <button
          onClick={handleScrollTop}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
          aria-label="Volver arriba"
        >
          <ArrowUpCircle className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid of Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-900/80">
          
          {/* Logo & Corporate profile block */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleScrollTop}>
              <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white">LEKANAR</span>
                <span className="text-[10px] tracking-[0.2em] text-red-500 font-bold uppercase font-mono">REDES QUE INSPIRAN</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Socio integrador de infraestructura crítica para telecomunicaciones, tendido aéreo y canalizado de redes ópticas metropolitanas e industriales de gran escala en el Perú.
            </p>

            <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Conformidad Técnica Garantizada</span>
            </div>
          </div>

          {/* Services Quick links block */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-bold font-mono text-red-400 uppercase tracking-widest">
              Servicios
            </h3>
            
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      onNavigate(link.hash);
                      const el = document.getElementById(link.hash);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors hover:translate-x-1 duration-200 block text-left font-mono"
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact coordinates section */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-bold font-mono text-red-400 uppercase tracking-widest">
              Contacto
            </h3>
            
            <ul className="space-y-3.5 text-xs sm:text-sm font-mono text-slate-400">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="mailto:administracion@lekanar.com" 
                    className="text-slate-300 hover:text-white transition-colors underline"
                  >
                    administracion@lekanar.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-slate-300">+51 940-409-556</span>
              </li>

              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-tight">
                  Cayma - Arequipa - Arequipa - Perú
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Co-copyright row & Dynamic social buttons exact to mockup layout (Facebook, Youtube, Instagram, Linkedin) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-slate-500 font-mono">
              LEKANAR - @Copyright {new Date().getFullYear()} - Todos los derechos reservados
            </p>
          </div>

          {/* Social Links exactly shaped as circular elements in provided mockup image 5 */}
          <div className="flex items-center space-x-3">
            <a 
              href="https://www.facebook.com/WIN.internet.lkn/" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 sm:p-2.5 bg-slate-900 hover:bg-red-500 hover:text-white text-slate-400 rounded-full transition-all hover:scale-105 active:scale-95"
              aria-label="Facebook Lekanar"
            >
              <Facebook className="w-4 h-4" />
            </a>
            
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 sm:p-2.5 bg-slate-900 hover:bg-red-500 hover:text-white text-slate-400 rounded-full transition-all hover:scale-105 active:scale-95"
              aria-label="YouTube Lekanar"
            >
              <Youtube className="w-4 h-4" />
            </a>

            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 sm:p-2.5 bg-slate-900 hover:bg-red-500 hover:text-white text-slate-400 rounded-full transition-all hover:scale-105 active:scale-95"
              aria-label="Instagram Lekanar"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 sm:p-2.5 bg-slate-900 hover:bg-red-500 hover:text-white text-slate-400 rounded-full transition-all hover:scale-105 active:scale-95"
              aria-label="LinkedIn Lekanar"
            >
              <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
