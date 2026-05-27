/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sliders, HelpCircle, FileText, Send, ShieldCheck, RefreshCw, Cpu, Activity } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

interface ProjectConfiguratorProps {
  onOpenSuccessMessage: (msg: string) => void;
}

export default function ProjectConfigurator({ onOpenSuccessMessage }: ProjectConfiguratorProps) {
  // Inputs
  const [fiberLength, setFiberLength] = useState<number>(10); // in Kilometers
  const [placementType, setPlacementType] = useState<'aereo' | 'canalizado'>('aereo');
  const [splitRatio, setSplitRatio] = useState<'none' | '1:16' | '1:32' | '1:64'>('none');
  const [needsSoftware, setNeedsSoftware] = useState<boolean>(false);
  const [needsCameras, setNeedsCameras] = useState<boolean>(false);

  // Computed Outputs
  const [attenuationLoss, setAttenuationLoss] = useState<number>(0);
  const [splitterLoss, setSplitterLoss] = useState<number>(0);
  const [totalLoss, setTotalLoss] = useState<number>(0);
  const [estimatedSplices, setEstimatedSplices] = useState<number>(0);
  const [budgetStatus, setBudgetStatus] = useState<'excelente' | 'aceptable' | 'critico'>('excelente');

  // Client info for callback
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedLoss, setSubmittedLoss] = useState(0);

  const [state, handleSubmit] = useForm("xqejgnev");

  useEffect(() => {
    if (state.succeeded) {
      onOpenSuccessMessage(
        `Estimado ${submittedName || 'Usuario'}, el reporte técnico preliminar con pérdidas proyectadas de ${submittedLoss} dB ha sido registrado de forma segura a través de Formspree. Un Ingeniero de Enlace Colegiado de LEKANAR se comunicará con usted en menos de 2 horas para entregarle el mapa georreferenciado CAD preliminar de viabilidad.`
      );
      
      // Reset contact fields
      setName('');
      setPhone('');
      setCompany('');
      setEmail('');
    }
  }, [state.succeeded]);

  // Recalculate physical link budget dynamically based on G.652D single mode standards
  useEffect(() => {
    // 0.22 dB/km loss at 1550nm for high-spec G.652D
    const fiberLoss = fiberLength * 0.22;
    
    // Fiber reels usually come in 4 kilometer drums, so we assume a splice every 4km
    const splices = Math.ceil(fiberLength / 4);
    setEstimatedSplices(splices);
    
    // Each splice averages 0.035 dB attenuation loss
    const spliceLoss = splices * 0.035;

    // Connector loss index (assuming 2 connector ends at 0.15 dB each)
    const connectorLoss = 0.30;

    const basePhysicalLoss = fiberLoss + spliceLoss + connectorLoss;

    // Splitter passive loss standards
    let sLoss = 0;
    if (splitRatio === '1:16') sLoss = 13.8;
    else if (splitRatio === '1:32') sLoss = 16.8;
    else if (splitRatio === '1:64') sLoss = 20.2;

    setSplitterLoss(sLoss);
    
    const grandTotal = +(basePhysicalLoss + sLoss).toFixed(3);
    setAttenuationLoss(+(basePhysicalLoss).toFixed(3));
    setTotalLoss(grandTotal);

    // GPON laser receivers usually tolerate up to 28-30 dB max loss before packet drop
    if (grandTotal < 22) {
      setBudgetStatus('excelente');
    } else if (grandTotal <= 28) {
      setBudgetStatus('aceptable');
    } else {
      setBudgetStatus('critico');
    }

  }, [fiberLength, placementType, splitRatio]);



  return (
    <section id="cotizador" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <span>Herramienta de Pre-Diseño de Enlaces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-900 tracking-tight">
            Configurador de Presupuesto Óptico y Software
          </h2>
          <p className="text-slate-600 text-base">
            Simule en tiempo real los decibelios de atenuación de su enlace de planta externa y configure servicios complementarios de software o CCTV.
          </p>
        </div>

        {/* Dashboard Form Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              <div className="flex items-center space-x-2 text-[#1e1b4b] border-b border-slate-200 pb-3">
                <Sliders className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold font-sans">Parámetros del Tendido Físico</h3>
              </div>

              {/* Slider distance input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-500 uppercase font-bold">Longitud Proyectada del Enlace</span>
                  <span className="text-red-500 font-extrabold text-sm">{fiberLength} Kilómetros</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={fiberLength}
                  onChange={(e) => setFiberLength(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 KM (Urbano)</span>
                  <span>50 KM (Red Troncal)</span>
                  <span>100 KM (Interurbano)</span>
                </div>
              </div>

              {/* Toggle Placement Radios */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Tipo de Montaje e Infraestructura</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPlacementType('aereo')}
                    className={`p-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all ${
                      placementType === 'aereo'
                        ? 'bg-[#1e1b4b] text-white border-[#1e1b4b]'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Tendido Aéreo (Postes)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlacementType('canalizado')}
                    className={`p-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all ${
                      placementType === 'canalizado'
                        ? 'bg-[#1e1b4b] text-white border-[#1e1b4b]'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Tendido Canalizado (Subterráneo)
                  </button>
                </div>
              </div>

              {/* Split ratios GPON Selector */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Nivel de Splitteo Óptico (GPON Divisores)</span>
                <div className="grid grid-cols-4 gap-2">
                  {(['none', '1:16', '1:32', '1:64'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setSplitRatio(ratio)}
                      className={`py-2 px-1 rounded-lg border text-xs font-mono font-bold focus:outline-none transition-all ${
                        splitRatio === ratio
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {ratio === 'none' ? 'Enlace Directo' : ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complementary software or security add-on ticks */}
              <div className="space-y-2 pt-2 border-t border-slate-200/40">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Servicios Adicionales Requeridos</span>
                
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center space-x-3 text-xs text-slate-700 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needsSoftware}
                      onChange={(e) => setNeedsSoftware(e.target.checked)}
                      className="w-4 h-4 accent-red-500 rounded text-red-500"
                    />
                    <span>Desarrollo de Software a Medida (ERP, Logística, Monitoreo IoT)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-xs text-slate-700 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needsCameras}
                      onChange={(e) => setNeedsCameras(e.target.checked)}
                      className="w-4 h-4 accent-red-500 rounded text-red-500"
                    />
                    <span>Anillo Perimetral de CCTV & Videovigilancia Analítica</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Trust disclaimer card */}
            <div className="bg-red-50/80 border border-red-200/40 p-4 rounded-xl text-[11px] leading-relaxed text-red-950 flex items-start space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>
                <strong>Cálculo Normado:</strong> Este simulador utiliza valores de pérdida estandarizados según la recomendación <strong>ITU-T G.652D</strong> para fibras monomodo operando en la ventana óptica de <strong>1550 nanómetros</strong>. La pérdida real puede ser menor bajo fusiones de alta pureza Lekanar.
              </span>
            </div>

          </div>

          {/* Results Sheet & Consultation Form (Right) */}
          <div className="lg:col-span-5 bg-[#0e1425] text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 shadow-xl border border-blue-950">
            
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-blue-950 pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Presupuesto de Enlace Proyectado</span>
                </div>
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              </div>

              {/* Technical indicators board */}
              <div className="space-y-4 font-mono text-xs">
                
                <div className="flex justify-between border-b border-blue-950/60 pb-2">
                  <span className="text-slate-400">Pérdida Cruda en Fibra:</span>
                  <span className="text-slate-200">~{attenuationLoss} dB</span>
                </div>

                {splitRatio !== 'none' && (
                  <div className="flex justify-between border-b border-blue-950/60 pb-2">
                    <span className="text-slate-400">Atenuación Splitter ({splitRatio}):</span>
                    <span className="text-slate-200">+{splitterLoss} dB</span>
                  </div>
                )}

                <div className="flex justify-between border-b border-blue-950/60 pb-2">
                  <span className="text-slate-400">Fusiones Estimadas (Drums 4km):</span>
                  <span className="text-slate-200">{estimatedSplices} puntos</span>
                </div>

                <div className="flex justify-between border-b border-blue-950 pb-2">
                  <span className="text-slate-400">Margen de Seguridad Óptica:</span>
                  <span className="text-slate-200">+3.0 dB</span>
                </div>

                {/* Loss total block */}
                <div className="flex justify-between items-center bg-[#070b14] p-3 rounded-lg border border-blue-950">
                  <span className="text-slate-300 font-sans font-bold text-sm">Pérdida Máxima Estimada:</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-red-400 block">{totalLoss} dB</span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500">Atenuación total</span>
                  </div>
                </div>

                {/* Laser Status Check Indicator */}
                <div className="flex items-center space-x-2 pt-1 text-[11px]">
                  <span>Estado de Viabilidad Técnica:</span>
                  {budgetStatus === 'excelente' && (
                    <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded font-extrabold text-[10px]">
                      ÓPTIMO - SEÑAL ALTA
                    </span>
                  )}
                  {budgetStatus === 'aceptable' && (
                    <span className="bg-blue-950 border border-blue-500/40 text-blue-400 px-2 py-0.5 rounded font-extrabold text-[10px]">
                      VIABLE - SEÑAL ESTABLE
                    </span>
                  )}
                  {budgetStatus === 'critico' && (
                    <span className="bg-amber-950 border border-amber-500/40 text-amber-400 px-2 py-0.5 rounded font-extrabold text-[10px] animate-pulse">
                      CRÍTICO - REQUIERE EDFA/ED
                    </span>
                  )}
                </div>

              </div>

              {/* Secure verification callback Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-blue-950 text-slate-200">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Solicitar Informe Oficial de Factibilidad</span>
                
                {/* Hidden configuration details sent to Formspree */}
                <input type="hidden" name="largo_fibra_km" value={fiberLength} />
                <input type="hidden" name="tipo_tendido" value={placementType} />
                <input type="hidden" name="ratio_splitter" value={splitRatio} />
                <input type="hidden" name="perdida_calculada_db" value={totalLoss} />
                <input type="hidden" name="estado_presupuesto_optico" value={budgetStatus} />
                <input type="hidden" name="requiere_software" value={needsSoftware ? "Sí" : "No"} />
                <input type="hidden" name="requiere_camaras" value={needsCameras ? "Sí" : "No"} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 group">
                  <input
                    type="text"
                    required
                    name="nombre"
                    placeholder="Su nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#070b14] border border-blue-950 text-xs p-2.5 rounded-lg focus:outline-none focus:border-red-500 text-white w-full placeholder-slate-500"
                  />
                  <input
                    type="tel"
                    required
                    name="telefono"
                    placeholder="Su teléfono celular"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#070b14] border border-blue-950 text-xs p-2.5 rounded-lg focus:outline-none focus:border-red-500 text-white w-full placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                     type="text"
                     name="empresa"
                     placeholder="Empresa (Opcional)"
                     value={company}
                     onChange={(e) => setCompany(e.target.value)}
                     className="bg-[#070b14] border border-blue-950 text-xs p-2.5 rounded-lg focus:outline-none focus:border-red-500 text-white w-full placeholder-slate-500"
                  />
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="Su correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#070b14] border border-blue-950 text-xs p-2.5 rounded-lg focus:outline-none focus:border-red-500 text-white w-full placeholder-slate-500"
                  />
                </div>
                
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-red-400 text-[10px] font-mono block mt-1"
                />

                <button
                  type="submit"
                  onClick={() => {
                    setSubmittedName(name);
                    setSubmittedLoss(totalLoss);
                  }}
                  disabled={state.submitting}
                  className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all shadow-md active:translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{state.submitting ? 'Registrando...' : 'Enviar a Ingeniería Corredactora'}</span>
                </button>
              </form>

            </div>

            <div className="text-center">
              <span className="text-[10px] text-slate-500 font-mono block">Enviando requerimiento a Nodo Arequipa Central</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
