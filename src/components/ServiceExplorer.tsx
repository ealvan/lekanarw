/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Cable, 
  Cpu, 
  Cctv, 
  CodeXml, 
  Laptop, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Settings, 
  SlidersHorizontal,
  Workflow
} from 'lucide-react';
import { LEKANAR_SERVICES } from '../data';
import { Service } from '../types';

interface ServiceExplorerProps {
  onSelectService: (service: Service) => void;
  onOpenCallbackModal: () => void;
}

export default function ServiceExplorer({ onSelectService, onOpenCallbackModal }: ServiceExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'Todos los Servicios' },
    { value: 'fiber', label: 'Infraestructura Fibra' },
    { value: 'security', label: 'CCTV & Vigilancia IP' },
    { value: 'software', label: 'Desarrollo de Software' },
    { value: 'hardware', label: 'Suministro de Equipamiento' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? LEKANAR_SERVICES 
    : LEKANAR_SERVICES.filter(s => s.category === selectedCategory);

  // Helper to render matching icon
  const renderServiceIcon = (iconName: string, colorClass: string) => {
    const defaultProps = { className: `w-7 h-7 ${colorClass} transition-transform` };
    switch (iconName) {
      case 'Cable':
        return <Cable {...defaultProps} />;
      case 'TowerControl':
        return <Workflow {...defaultProps} />;
      case 'Cpu':
        return <Cpu {...defaultProps} />;
      case 'Cctv':
        return <Cctv {...defaultProps} />;
      case 'CodeXml':
        return <CodeXml {...defaultProps} />;
      case 'Laptop':
        return <Laptop {...defaultProps} />;
      default:
        return <Settings {...defaultProps} />;
    }
  };

  return (
    <section id="servicios" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <span>Servicios Especializados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-900 tracking-tight">
            Nuestras Áreas de Ingeniería de Alta Conectividad
          </h2>
          <p className="text-slate-600 text-base">
            Diseñamos e implementamos bajo regulaciones de telecomunicación internacionales. Cada solución cuenta con protocolos rigurosos de puesta en marcha, control de pérdidas y soporte técnico continuo.
          </p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all focus:outline-none ${
                selectedCategory === cat.value
                  ? 'bg-[#12192d] text-white ring-1 ring-[#1e1b4b] scale-102 font-bold'
                  : 'bg-white text-slate-600 hover:text-[#12192d] hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const isHovered = hoveredCard === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Visual Accent Top Bar indicating the category */}
                <div className={`h-1.5 w-full bg-gradient-to-r transition-all duration-300 ${
                  service.category === 'fiber' ? 'from-orange-500 to-red-400' :
                  service.category === 'security' ? 'from-blue-500 to-indigo-400' :
                  service.category === 'software' ? 'from-purple-500 to-purple-400' :
                  'from-emerald-500 to-teal-400'
                }`} />

                {/* Primary Card Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Icon & Quick Categorization */}
                  <div className="flex justify-between items-start">
                    <div className={`p-3.5 rounded-xl ${
                      service.category === 'fiber' ? 'bg-orange-50 text-orange-600' :
                      service.category === 'security' ? 'bg-blue-50 text-blue-600' :
                      service.category === 'software' ? 'bg-purple-50 text-purple-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {renderServiceIcon(
                        service.icon, 
                        service.category === 'fiber' ? 'text-orange-600 group-hover:rotate-6' :
                        service.category === 'security' ? 'text-blue-600 group-hover:rotate-6' :
                        service.category === 'software' ? 'text-purple-600 group-hover:rotate-6' :
                        'text-emerald-600 group-hover:rotate-6'
                      )}
                    </div>
                    
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 px-2 py-1 bg-slate-100 rounded font-bold">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Core Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-sans text-slate-900 group-hover:text-red-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed h-15 overflow-hidden">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights spec sheet snippet list */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <span className="text-xs font-mono font-bold text-slate-400 block uppercase tracking-wider">Especificaciones de Norma:</span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {service.techSpecs.slice(0, 3).map((spec, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Robust Safety / SLA indicator banner inside the service */}
                  <div className="bg-slate-50/90 border border-slate-100 p-3 rounded-lg flex items-center space-x-2 mt-4 text-[11px] font-mono text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="leading-tight">
                      <strong>Compromiso SLA:</strong> {service.slaGuarantee}
                    </span>
                  </div>

                </div>

                {/* Card Action footer bar */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100/80 bg-slate-50/40">
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-bold text-[#1e1b4b] hover:text-red-500 transition-all flex items-center space-x-1"
                  >
                    <span>Ficha Completa & Normativa</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenCallbackModal}
                    className="p-1 px-3 bg-[#1e1b4b] text-white font-semibold text-[10px] rounded-lg opacity-85 hover:opacity-100 hover:bg-red-500 active:bg-red-600 transition-all font-mono"
                  >
                    Solicitación Express
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Quality commitment notification box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mt-16 max-w-5xl mx-auto border border-blue-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold font-sans">¿Su empresa requiere certificaciones de fibra adicionales?</h3>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Trabajamos con inspectores certificados por el Ministerio de Transportes y Comunicaciones (MTC) de Perú. Atendemos tendidos troncales y canalizados municipales de alta envergadura con seguridad de entrega certificada.
            </p>
          </div>
          <button
            onClick={onOpenCallbackModal}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg shrink-0 w-full md:w-auto transition-all text-center"
          >
            Consultar con Ingeniero Titulado
          </button>
        </div>

      </div>
    </section>
  );
}
