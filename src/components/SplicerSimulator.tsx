/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Play, RotateCcw, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';

export default function SplicerSimulator() {
  const [step, setStep] = useState<number>(0); // 0: Idle, 1: Mounted, 2: Aligning, 3: Fused, 4: Certifying
  const [leftOffset, setLeftOffset] = useState(14); // pixels offset for visual
  const [rightOffset, setRightOffset] = useState(-8);
  const [splicesLoss, setSplicesLoss] = useState<number>(0);
  const [tensionResult, setTensionResult] = useState<number>(0);
  const [animating, setAnimating] = useState(false);
  const [alignmentQuality, setAlignmentQuality] = useState(0);

  // Auto-slide to alignment state or animate
  const mountFiber = () => {
    setStep(1);
    setLeftOffset(14);
    setRightOffset(-8);
  };

  const alignFiber = () => {
    setStep(2);
    setAnimating(true);
    
    // Simulate automatic high-frequency alignment motor steps
    let currentLeft = 14;
    let currentRight = -8;
    const interval = setInterval(() => {
      if (currentLeft > 0) currentLeft -= 2;
      if (currentRight < 0) currentRight += 2;
      
      setLeftOffset(currentLeft);
      setRightOffset(currentRight);

      if (currentLeft <= 0 && currentRight >= 0) {
        clearInterval(interval);
        setAnimating(false);
        setStep(3);
        const randomizedQuality = +(98 + Math.random() * 2).toFixed(2);
        setAlignmentQuality(randomizedQuality);
      }
    }, 150);
  };

  const executeArcFusion = () => {
    setStep(4);
    setAnimating(true);
    
    setTimeout(() => {
      setAnimating(false);
      setStep(5);
      // Generate highly realistic, compliant fiber metrics
      const calculatedLoss = +(0.01 + Math.random() * 0.02).toFixed(3);
      const calculatedTension = +(225 + Math.random() * 15).toFixed(1);
      setSplicesLoss(calculatedLoss);
      setTensionResult(calculatedTension);
    }, 1800); // arc time
  };

  const resetAll = () => {
    setStep(0);
    setLeftOffset(14);
    setRightOffset(-8);
    setSplicesLoss(0);
    setTensionResult(0);
  };

  return (
    <section className="bg-slate-900 text-white py-20 px-4 relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Descriptive column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-red-950/60 border border-red-500/30 px-3 py-1.5 rounded-full text-red-400 text-xs font-mono">
            <Cpu className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Laboratorio Interactivo de Precisión</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-white tracking-tight leading-tight">
            Nivel de Precisión Micrométrica en Fusiones
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            La fibra óptica es un hilo de vidrio de apenas <strong>125 micras</strong> de diámetro. Un empalme por fusión defectuoso disipa luz y corrompe los datos. 
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Use nuestro simulador interactivo para calibrar los micromotores y emitir el arco eléctrico de fusión. Observe bajo el microscopio virtual cómo logramos pérdidas prácticamente nulas (<strong>&lt; 0.02 dB</strong>) homologadas internacionalmente.
          </p>

          <div className="space-y-3 pt-2 font-mono text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Calibración de arco en vivo real (PAS/LID core matching).</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Garantía física: Resistencia tensora ≥ 220 kpsi por fibra.</span>
            </div>
          </div>
        </div>

        {/* Simulator Screen column representing Fujikura splicer interface */}
        <div className="lg:col-span-7 bg-[#070b14] border border-blue-950 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          
          {/* Header of internal screen representing splicer OS */}
          <div className="flex justify-between items-center border-b border-blue-950/80 pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase font-bold">FUSION SPLICER OS v4.11</span>
                <span className="text-xs text-slate-100 font-sans font-bold">FUJIKURA-90S CALIBRATOR</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono">
              <span className="text-slate-400">Modo: <strong className="text-blue-400">SM AUTO (G.652D)</strong></span>
            </div>
          </div>

          {/* Microscopic Display Area */}
          <div className="h-64 bg-[#0a101d] rounded-xl border border-blue-900/40 relative overflow-hidden flex items-center justify-center p-4">
            
            {/* Horizontal axis grid and alignment camera lines */}
            <div className="absolute inset-0 border-y-2 border-slate-900 opacity-20" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-500/10" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-emerald-500/15" />
            
            {/* Focus grid overlay */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 flex flex-col space-y-1">
              <span>AXIS: X/Y COMPRESSED</span>
              <span>MAGNIFY: X320 ZOOM</span>
            </div>

            {/* State indications */}
            <div className="absolute bottom-3 left-3 text-[10px] font-mono flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-emerald-400">
                {step === 0 && 'Aguardando cristales...'}
                {step === 1 && 'Fibras cargadas en ranura V-groove'}
                {step === 2 && 'Micromotores alineando núcleos...'}
                {step === 3 && 'Alineación de núcleo óptima!'}
                {step === 4 && 'GENERANDO ARCO ELÉCTRICO (FUSIÓN)'}
                {step === 5 && 'FUSIÓN COMPLETA - PASÓ CONTROL'}
              </span>
            </div>

            {/* Microscopic representations of Single-mode core glass hilos */}
            {step > 0 && (
              <div className="w-full flex items-center justify-between relative max-w-md h-12">
                
                {/* Left Optical Fiber Hilo */}
                <div 
                  className="bg-gradient-to-r from-blue-950/20 via-slate-400/90 to-slate-200 h-9 rounded-l border-y border-slate-600 relative transition-transform duration-300"
                  style={{
                    transform: `translateX(${step === 1 ? '-25px' : '0px'}) translateY(${leftOffset}px)`,
                    width: '35%'
                  }}
                >
                  {/* Internal Core (9 micron thick) representing single mode center */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                </div>

                {/* Electric Arc Spark Trigger Animation */}
                {step === 4 && animating && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-sky-400/25 animate-ping duration-100 flex items-center justify-center z-20">
                    <div className="w-16 h-16 rounded-full bg-yellow-400 animate-pulse duration-75 text-center flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white animate-bounce" />
                    </div>
                  </div>
                )}

                {/* Left/Right gap line represents open glass split (closed when fused) */}
                {step < 5 ? (
                  <div className="w-5 flex flex-col justify-between h-14 items-center z-10 font-mono text-[9px] text-slate-500">
                    <div className="border-l border-dashed border-red-500 h-5" />
                    <span>GAP</span>
                    <div className="border-l border-dashed border-red-500 h-5" />
                  </div>
                ) : (
                  // Fused transition bridge line
                  <div className="w-6 h-9 bg-slate-200 border-y border-slate-400 relative z-10 transition-all duration-300">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-sky-300 shadow-[0_0_4px_rgba(56,189,248,0.7)]" />
                  </div>
                )}

                {/* Right Optical Fiber Hilo */}
                <div 
                  className="bg-gradient-to-l from-blue-950/20 via-slate-400/90 to-slate-200 h-9 rounded-r border-y border-slate-600 relative transition-transform duration-300"
                  style={{
                    transform: `translateX(${step === 1 ? '25px' : '0px'}) translateY(${rightOffset}px)`,
                    width: '35%'
                  }}
                >
                  {/* Internal Core (9 micron) */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-gradient-to-r from-sky-300 to-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                </div>

              </div>
            )}

            {/* Blank display state */}
            {step === 0 && (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full border border-dashed border-slate-600 flex items-center justify-center mx-auto text-slate-500">
                  <span className="text-sm font-bold">SM</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">Inserte los hilos de prueba para iniciar calibración</div>
              </div>
            )}

          </div>

          {/* Splicer OS Live Monitoring Readouts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 bg-[#04060b] p-4 rounded-xl border border-blue-950 text-xs font-mono">
            <div>
              <div className="text-[10px] text-slate-500">ALINEACIÓN NÚCLEO</div>
              <div className="text-slate-200 font-bold">{step >= 3 ? `${alignmentQuality}% YES` : '0.00% WAIT'}</div>
            </div>
            <div className="border-l border-blue-950/60 pl-4">
              <div className="text-[10px] text-slate-500">MÁRGEN DE EJE X/Y</div>
              <div className="text-slate-200 font-bold">{step >= 3 ? '< 0.04μm' : 'PENDIENTE'}</div>
            </div>
            <div className="border-l border-blue-950/60 pl-4">
              <div className="text-[10px] text-slate-500">PÉRDIDA ESTIMADA</div>
              <div className="text-emerald-400 font-black">{step === 5 ? `${splicesLoss} dB` : '---'}</div>
            </div>
            <div className="border-l border-blue-950/60 pl-4">
              <div className="text-[10px] text-slate-500">PRUEBA DE TENSIÓN</div>
              <div className="text-emerald-400 font-bold">{step === 5 ? `${tensionResult} kpsi` : '---'}</div>
            </div>
          </div>

          {/* Splicer Actions Panel */}
          <div className="mt-6 flex flex-wrap gap-3">
            {step === 0 && (
              <button
                onClick={mountFiber}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <span>1. Cargar Hilos de Fibra</span>
              </button>
            )}

            {step === 1 && (
              <button
                onClick={alignFiber}
                disabled={animating}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-[#070b14] font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>2. Alinear Núcleos (PAS)</span>
              </button>
            )}

            {step === 3 && (
              <button
                onClick={executeArcFusion}
                disabled={animating}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-950/20"
              >
                <Zap className="w-4 h-4 text-white animate-bounce" />
                <span>3. Fusor Arco Eléctrico</span>
              </button>
            )}

            {step === 5 && (
              <div className="w-full flex gap-3">
                <div className="flex-1 bg-emerald-950 border border-emerald-500/40 p-3 rounded-xl flex items-center space-x-2 text-xs text-emerald-400 font-mono">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Empalme Físico Certificado bajo Límites de Norma MTC (ITU-T G.652D).</span>
                </div>
                <button
                  onClick={resetAll}
                  className="bg-slate-800 hover:bg-slate-700 p-3.5 rounded-xl text-slate-300 transition-all flex items-center justify-center"
                  aria-label="Reiniciar Calibración"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
