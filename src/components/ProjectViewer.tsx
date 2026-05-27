/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ShieldAlert, Award, Calendar, Ruler, FileCheck2, Cpu } from 'lucide-react';
import { LEKANAR_PROJECTS } from '../data';
import { Project } from '../types';

export default function ProjectViewer() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  // We show up to 3 cards at a time on desktop, 2 on tablet, 1 on mobile
  const maxSlides = LEKANAR_PROJECTS.length;
  
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % maxSlides);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  // Get visible projects circularly to make it a continuous or easy scroller
  const getVisibleProjects = (): Project[] => {
    const list: Project[] = [];
    for (let i = 0; i < 3; i++) {
      list.push(LEKANAR_PROJECTS[(startIndex + i) % maxSlides]);
    }
    return list;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <section id="proyectos" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header centered */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold font-sans text-[#1e1b4b] tracking-tight">
            Nuestros proyectos
          </h2>
          <div className="w-16 h-1 bg-red-500 mx-auto" />
          <p className="text-slate-500 text-sm font-medium">
            Registros reales de obras ejecutadas con total conformidad y entrega técnica certificada por auditores.
          </p>
        </div>

        {/* Carousel grid with heavy navigation arrows exact to user requirements diagram */}
        <div className="relative flex items-center justify-between gap-2 max-w-6xl mx-auto">
          
          {/* Heavy black left arrow */}
          <button
            onClick={handlePrev}
            className="p-3 text-black hover:text-red-500 focus:outline-none transition-all hover:scale-110 active:scale-90"
            aria-label="Proyecto Anterior"
          >
            <ChevronLeft className="w-16 h-16 stroke-[3.5]" />
          </button>

          {/* Slider Container columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 transition-all duration-500">
            {visibleProjects.map((project, idx) => {
              // Hide redundant on smaller viewports explicitly
              const isHiddenOnMd = idx === 2; // third card hidden on tablet size
              const isHiddenOnSm = idx >= 1; // second & third card hidden on mobile size

              return (
                <div
                  key={`${project.id}-${idx}`}
                  className={`bg-white rounded-xl overflow-hidden p-4 border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                    isHiddenOnSm ? 'block sm:hidden md:block lg:block' : ''
                  } ${
                    isHiddenOnMd ? 'hidden lg:block' : ''
                  }`}
                >
                  <div className="space-y-4">
                    {/* Image formatting matching picsum/unsplash schema with no referrer required */}
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 relative group">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-red-500 text-white font-mono text-[9px] font-bold tracking-widest px-2 py-1 rounded">
                        CERTIFICADO
                      </div>
                    </div>

                    {/* Metadata text stack underneath card as illustrated */}
                    <div className="space-y-1.5 h-20">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono flex items-center">
                        <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 shrink-0" />
                        {project.location}
                      </p>
                    </div>
                  </div>

                  {/* Dark Blue "Ver más" button exact to specifications illustration */}
                  <div className="pt-4 border-t border-slate-50 mt-4">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="w-full bg-[#1b195c] hover:bg-[#2e2b7e] active:bg-[#121142] text-white text-xs font-semibold uppercase tracking-wider py-3 rounded-lg transition-all focus:outline-none flex items-center justify-center space-x-1 shadow-sm active:translate-y-0.5"
                    >
                      <span>Ver más</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Heavy black right arrow */}
          <button
            onClick={handleNext}
            className="p-3 text-black hover:text-red-500 focus:outline-none transition-all hover:scale-110 active:scale-90"
            aria-label="Siguiente Proyecto"
          >
            <ChevronRight className="w-16 h-16 stroke-[3.5]" />
          </button>

        </div>

        {/* Informative summary beneath slider */}
        <div className="text-center mt-12">
          <p className="text-xs text-slate-400 font-mono">
            Mostrando {startIndex + 1} a {((startIndex + 2) % maxSlides) + 1} de {maxSlides} proyectos certificados • Lekanar Redes © 2026-T2
          </p>
        </div>

      </div>

      {/* Pop-up modal displaying full structural specs verification sheets */}
      {activeProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#050811]/85 backdrop-blur-sm transition-opacity" 
            onClick={() => setActiveProject(null)}
          />

          {/* Modal Box */}
          <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            
            <div className="bg-[#12192d] text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-red-400" />
                <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">Ficha de Homologación de Obra</span>
              </div>
              <button 
                onClick={() => setActiveProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-1/3 aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm text-red-500 font-mono font-semibold">
                    Ubicación: {activeProject.location}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Sheet */}
              <div className="border border-slate-100 rounded-xl bg-slate-50/70 p-4 space-y-4">
                <div className="flex items-center space-x-2 text-slate-800 border-b border-slate-200/60 pb-2">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider">Lectura de Parámetros de Enlace</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-700">
                  {activeProject.specs.lengthKm && (
                    <div className="flex items-center space-x-2">
                      <Ruler className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Longitud Desplegada: <strong className="text-slate-900">{activeProject.specs.lengthKm} KM</strong></span>
                    </div>
                  )}
                  {activeProject.specs.spliceCount && (
                    <div className="flex items-center space-x-2 animate-pulse">
                      <FileCheck2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Empalmes Realizados: <strong className="text-slate-900">{activeProject.specs.spliceCount} Fusiones</strong></span>
                    </div>
                  )}
                  {activeProject.specs.attenuationDb && (
                    <div className="flex items-center space-x-2">
                      <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>Pérdida Medida OTDR: <strong className="text-slate-900">{activeProject.specs.attenuationDb}</strong></span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Tiempo de Instalación: <strong className="text-slate-900">{activeProject.specs.executionTime}</strong></span>
                  </div>
                  <div className="sm:col-span-2 border-t border-slate-200/40 pt-2 flex flex-col space-y-1 text-[11px]">
                    <div>Estándar Internacional: <span className="text-blue-700 font-semibold">{activeProject.specs.standard}</span></div>
                    <div>Certificación Física de Enlace: <span className="text-emerald-700 font-semibold">{activeProject.specs.certification}</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 text-red-950 p-4 rounded-xl border border-red-200/40 text-xs flex items-start space-x-2">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="leading-tight">
                  <strong>Protocolo de Verificación Lekanar:</strong> Este proyecto ha sido sometido a pruebas de tensión mecánica e inmunidad ambiental, aprobándose con un margen de seguridad óptica de +3.2 dB sobre el presupuesto diseñado de decibelios máximos.
                </p>
              </div>

            </div>

            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-end gap-2">
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-2 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-semibold focus:outline-none"
              >
                Cerrar Ficha Técnica
              </button>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
