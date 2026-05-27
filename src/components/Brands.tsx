/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BRAND_PARTNERS } from '../data';
import { Award, ShieldCheck, Check } from 'lucide-react';

export default function Brands() {
  return (
    <section className="bg-[#050811] py-20 border-t border-slate-900 overflow-hidden relative">
      {/* Absolute decorative glow */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title corresponding to mock-up "Nuestras marcas" styled with high-contrast text */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-sans font-bold text-red-500 tracking-tight text-center">
            Nuestras marcas
          </h2>
          <div className="w-12 h-0.5 bg-slate-800 mx-auto" />
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">
            Sistemas Homologados e Integración Autorizada
          </p>
        </div>

        {/* Brands Responsive Grid corresponding to layout mockup */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 items-center justify-items-center max-w-5xl mx-auto">
          {BRAND_PARTNERS.map((brand, idx) => {
            return (
              <div 
                key={idx}
                className="group flex flex-col items-center justify-center p-4 hover:bg-slate-900/40 rounded-xl transition-all h-28 w-full border border-slate-900/20 hover:border-slate-800/60 cursor-default text-center"
              >
                {/* Visual abstract elegant representative logo */}
                <div className="text-2xl mb-1 text-slate-400 group-hover:scale-110 transition-transform duration-300">
                  {brand.logo}
                </div>
                
                <span className="font-mono text-xs font-extrabold text-slate-300 tracking-wider group-hover:text-white transition-colors duration-300 block">
                  {brand.name}
                </span>

                <span className="text-[9px] font-sans font-medium text-slate-500 group-hover:text-red-400 transition-colors duration-300 block mt-0.5 uppercase tracking-wide">
                  {brand.sub}
                </span>
              </div>
            );
          })}
        </div>

        {/* Informative trust banner matching enterprise standard */}
        <div className="mt-16 bg-slate-950/90 border border-slate-900/80 rounded-xl p-4 max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <Award className="w-5 h-5 text-red-500 shrink-0" />
            <span className="leading-tight">
              Todos los repuestos provistos por LEKANAR cuentan con códigos de homologación de fábrica verificables ante el fabricante.
            </span>
          </div>
          <div className="flex gap-2 shrink-0">
            <span className="flex items-center space-x-1 font-mono text-[10px] bg-red-950 border border-red-500/30 text-red-400 py-0.5 px-2 rounded-full font-bold">
              <Check className="w-3 h-3 text-red-400" />
              <span>SOPORTE DIRECTO</span>
            </span>
            <span className="flex items-center space-x-1 font-mono text-[10px] bg-blue-950 border border-blue-500/30 text-blue-400 py-0.5 px-2 rounded-full font-bold">
              <Check className="w-3 h-3 text-blue-400" />
              <span>DESPACHO 24H</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
