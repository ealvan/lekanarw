/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Activity, Award, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenCallbackModal: () => void;
}

export default function Hero({ onNavigate, onOpenCallbackModal }: HeroProps) {
  const [activePane, setActivePane] = useState<number | null>(0);

  const heroPanes = [
    {
      id: 0,
      title: 'Tendido de Redes de Fibra',
      subtitle: 'Planta Externa e Interconexión',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800',
      tag: 'Tendido de fibra óptica',
      statLabel: 'Vano Máximo Desplegado',
      statValue: '120 metros',
      colorLine: 'border-orange-500',
      accentColor: 'text-orange-400',
      description: 'Implementación física robusta de cable drop y auto-soportado con altos márgenes de tracción mecánica bajo vientos intensos.',
      telemetry: 'Alineación: Triple bucle de goteo | Flecha controlada: 1.5%'
    },
    {
      id: 1,
      title: 'Planta Interna (ODFs)',
      subtitle: 'Servidores & Cableado Estructurado',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      tag: 'Planta interna',
      statLabel: 'Alineación de Conectores',
      statValue: '< 0.12 dB',
      colorLine: 'border-blue-500',
      accentColor: 'text-blue-400',
      description: 'Peinado normado de bandejas de distribución ODF de alta densidad, latiguillos de bajas pérdidas LSZH y canalización de fibra.',
      telemetry: 'Certificación ANSI/TIA-568.3 | Radios de curva de protección: TIA-606-B'
    },
    {
      id: 2,
      title: 'Planta Externa y Torres',
      subtitle: 'Distribución y Anillos Ópticos',
      image: 'https://images.unsplash.com/photo-1596450514735-111a2feec499?auto=format&fit=crop&q=80&w=800',
      tag: 'Planta externa',
      statLabel: 'Atenuación Promedio certificada',
      statValue: '0.19 dB/km',
      colorLine: 'border-red-500',
      accentColor: 'text-red-400',
      description: 'Montaje de cajas estancas de empalme IP68, herrajes de paso e infraestructura aérea para soporte GPON de alta disponibilidad.',
      telemetry: 'Homologación de empalmes con fusión por arco calibrada OTDR'
    },
    {
      id: 3,
      title: 'Estudio y Diseño de Enlaces',
      subtitle: 'Cumplimiento Normativo MTC Perú',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
      tag: 'Estudio y diseño de fibra óptica',
      statLabel: 'Aprobación Gubernamental',
      statValue: '100% Viable',
      colorLine: 'border-purple-500',
      accentColor: 'text-purple-400',
      description: 'Diseño analítico de trayectos, cálculo de presupuestos ópticos óptimos mundiales y normativas catastrales para ministerios.',
      telemetry: 'Modelado en AutoCAD civil / Inspección por reflectometría de precisión'
    }
  ];

  return (
    <section id="inicio" className="relative bg-[#0b0f19] pt-6 overflow-hidden">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Header and Value Proposition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-950/40 border border-red-500/20 px-3 py-1.5 rounded-full text-red-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 animate-pulse text-red-500" />
              <span>Socio Tecnológico Homologado en el Perú</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-white tracking-tight leading-none">
              Infraestructura Crítica de <span className="bg-gradient-to-r from-red-500 via-orange-400 to-blue-400 bg-clip-text text-transparent">Fibra Óptica</span> y Software para Empresas
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              En <strong className="text-white font-semibold">LEKANAR</strong> garantizamos enlaces ópticos estables de ultra-baja atenuación, circuito cerrado inteligente y software industrial a medida. Ejecutamos bajo normativas internacionales para sostener la continuidad de su operación empresarial.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('cotizador');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
              >
                <span>Calcular Presupuesto Óptico</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOpenCallbackModal}
                className="bg-[#12192d] hover:bg-[#182343] active:bg-[#151f3b] text-slate-200 border border-slate-800 font-semibold px-6 py-3.5 rounded-xl transition-all flex items-center space-x-2"
              >
                <span>Agendar Inspección Gratis</span>
              </button>
            </div>

            {/* Quick corporate trust KPIs bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-900/60 font-mono">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.999%</div>
                <div className="text-slate-400 text-[10px] sm:text-xs">Uptime de Enlace Óptico</div>
              </div>
              <div className="border-l border-slate-900/60 pl-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">+480 KM</div>
                <div className="text-slate-400 text-[10px] sm:text-xs">Tendido Certificado</div>
              </div>
              <div className="border-l border-slate-900/60 pl-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">0.02 dB</div>
                <div className="text-slate-400 text-[10px] sm:text-xs">Pérdida por Fusión Promedio</div>
              </div>
            </div>

          </div>

          {/* Quick FAQ summary bubble building trust */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-[#101626] border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 bg-red-950 text-red-400 rounded-lg">
                  <Award className="w-5 h-5" />
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Compromiso Lekanar</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Todo proyecto de red ejecutado incluye certificación reflectométrica tridireccional con OTDR y registro de atenuaciones individuales entregado al cliente en formato nativo.
              </p>
              <div className="space-y-2 pt-2 text-[11px] text-slate-400 font-mono">
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span>Soporte SLA Activo:</span>
                  <span className="text-emerald-400 font-bold">24H / 7D Monitoreado</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span>Técnicos calificados:</span>
                  <span className="text-white font-bold">Certificación CCNA/Planta Ext.</span>
                </div>
                <div className="flex justify-between">
                  <span>Área de Cobertura Principal:</span>
                  <span className="text-white font-extrabold">Arequipa - Sur del Perú</span>
                </div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-slate-300 text-[11px] flex items-center space-x-2">
                <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>Equipo de Fusión Listos: Calibrando arco en vivo</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic, High-Ifficiency Interactive Column Split Grid */}
      <div className="relative border-t border-slate-900/60">
        <div className="flex flex-col md:flex-row h-[550px] w-full bg-[#050811]">
          {heroPanes.map((pane, idx) => {
            const isSelected = activePane === idx;
            return (
              <div
                key={pane.id}
                onClick={() => setActivePane(idx)}
                onMouseEnter={() => setActivePane(idx)}
                className={`relative cursor-pointer transition-all duration-500 ease-out overflow-hidden border-b md:border-b-0 md:border-r border-slate-900 flex-1 flex flex-col justify-end p-6 group ${
                  isSelected ? 'md:flex-[3.5] bg-[#0c1324] ring-1 ring-slate-800' : 'md:flex-1 hover:bg-[#070b16]'
                }`}
              >
                {/* Background image component formatted with no-referrer as required */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={pane.image}
                    alt={pane.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isSelected ? 'scale-105 opacity-30 saturate-100' : 'scale-100 opacity-20 hover:opacity-25 saturate-50'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Visual gradient covering bottom text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/70 to-transparent" />
                </div>

                {/* Left indicator accent color bar */}
                <div className={`absolute top-0 left-0 w-1 md:w-full md:h-1.5 transition-all duration-300 ${pane.colorLine} ${
                  isSelected ? 'opacity-100' : 'opacity-20'
                }`} />

                {/* Content Block */}
                <div className="relative z-10 space-y-3">
                  {/* Specific identifier tags directly matching image overlay text in requirement */}
                  <span className="inline-block bg-[#12182c]/90 border border-slate-800 text-slate-300 font-mono text-[10px] uppercase font-bold px-2 py-1 rounded">
                    {pane.tag}
                  </span>

                  <div>
                    <h3 className="text-xl font-bold font-sans text-white group-hover:text-red-400 transition-colors">
                      {pane.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {pane.subtitle}
                    </p>
                  </div>

                  {/* Expandable details when active */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    isSelected ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {pane.description}
                    </p>

                    <div className="bg-slate-950/90 border border-blue-950 p-3 rounded text-[11px] font-mono mb-2 flex flex-col space-y-1">
                      <span className="text-blue-400 font-semibold uppercase tracking-wider">Telemetría de Enlace:</span>
                      <span className="text-slate-200">{pane.telemetry}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 font-mono">
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase">{pane.statLabel}</div>
                        <div className={`text-sm font-bold ${pane.accentColor}`}>{pane.statValue}</div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.getElementById('servicios');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-2 bg-slate-900 hover:bg-red-500 rounded-lg text-white group transition-all"
                      >
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* Compact state representing closed panel indicator */}
                  {!isSelected && (
                    <div className="hidden md:block pt-2 animate-pulse text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                      Click para ver telemetría
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
