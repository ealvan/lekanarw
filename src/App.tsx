/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceExplorer from './components/ServiceExplorer';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import { Service } from './types';
import { useForm, ValidationError } from '@formspree/react';
import { 
  X, 
  BadgeCheck, 
  CheckCircle,
  Shield, 
  PhoneCall
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  
  // Custom interactive Modal States to avoid frame-blocked window.alerts
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  
  // Service Ficha Técnica Modal Details
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Global General urgent technical callback modal
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [inspName, setInspName] = useState('');
  const [inspPhone, setInspPhone] = useState('');
  const [inspOption, setInspOption] = useState('fibra-externa');
  const [inspMessage, setInspMessage] = useState('');
  const [submittedInspName, setSubmittedInspName] = useState('');

  const [state, handleSubmit] = useForm("xqejgnev");

  useEffect(() => {
    if (state.succeeded) {
      setIsInspectionModalOpen(false);
      handleOpenSuccessMessage(
        `Estimado ${submittedInspName || 'Usuario'}, su solicitud de Inspección Técnica de Campo sobre "${inspOption}" ha sido procesada con éxito a través de Formspree. Un Ingeniero de Campo se comunicará con usted en el transcurso de los siguientes 30 minutos para acordar el horario de visita física.`
      );

      // Reset fields
      setInspName('');
      setInspPhone('');
      setInspOption('fibra-externa');
      setInspMessage('');
    }
  }, [state.succeeded]);

  const handleOpenSuccessMessage = (message: string) => {
    setSuccessInfo(message);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };



  const handleCloseSuccess = () => {
    setSuccessInfo(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      
      {/* 24/7 Support floating notification drawer snippet */}
      <div className="bg-[#12192d] p-3 text-center border-b border-rose-950 text-[11px] font-mono text-slate-300 relative z-30">
        <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping mr-2" />
        <span>Garantía de Servicio Ininterrumpido: Atendiendo solicitudes de cotización técnica en tiempo real en Arequipa y Sur del Perú</span>
      </div>

      {/* Corporate Header Section */}
      <Header 
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenCallbackModal={() => setIsInspectionModalOpen(true)}
      />

      {/* Main Core View Modules wrapped */}
      <main>
        
        {/* State Interactive Hero section with multi-column split visuals */}
        <Hero 
          onNavigate={handleNavigate}
          onOpenCallbackModal={() => setIsInspectionModalOpen(true)}
        />

        {/* Dynamic Service Portfolio Grid with detailed categorizations */}
        <ServiceExplorer 
          onSelectService={(service) => setSelectedService(service)}
          onOpenCallbackModal={() => setIsInspectionModalOpen(true)}
        />

        {/* Dedicated interactive CIP Ingeniero Titulado Consultation form */}
        <ConsultationForm 
          onOpenSuccessMessage={handleOpenSuccessMessage}
        />

      </main>

      {/* Unified Corporate Footer with active anchors and coordinates */}
      <Footer onNavigate={handleNavigate} />

      {/* --- POP-UP MODALS FOR SEAMLESS HIGH-TRUST CONTEXT AND IFRAME COMPATIBILITY --- */}

      {/* Global Success Notification Toast Alert Board (Avoids default frame blockages) */}
      {successInfo && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-slate-900 border-2 border-emerald-500/30 text-white rounded-2xl p-5 shadow-2xl flex flex-col relative">
            <button 
              onClick={handleCloseSuccess}
              className="absolute top-2 right-2 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start space-x-3 mb-2">
              <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-extrabold font-sans text-emerald-400 uppercase tracking-wider">Solicitud Registrada con Éxito</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {successInfo}
                </p>
              </div>
            </div>
            <div className="bg-[#050811] p-2 rounded text-[10px] font-mono text-slate-500 flex justify-between items-center mt-2 border border-slate-900">
              <span>ESTADO: PROCESANDO</span>
              <span className="text-emerald-400 font-bold">FOLIO LK-{Math.floor(Math.random() * 900 + 100)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Primary General Inspection Modal Drawer */}
      {isInspectionModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsInspectionModalOpen(false)}
          />

          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in zoom-in-95 duration-200">
            
            <div className="bg-[#12192d] text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">Coordinación de Inspección Técnica</span>
              </div>
              <button 
                onClick={() => setIsInspectionModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="bg-red-50 text-red-950 p-4 rounded-xl border border-red-200 text-xs flex items-start space-x-2.5 leading-relaxed">
                <PhoneCall className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <strong className="font-extrabold text-red-900">Servicio de Campo Inmediato:</strong> Ofrecemos visitas técnicas gratuitas de evaluación sin costo en toda la provincia de Arequipa para dimensionar tendidos de fibra o anillos de seguridad de gran envergadura.
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Nombre Completo de Contacto</label>
                  <input
                    type="text"
                    required
                    name="nombre"
                    placeholder="Ej. Ing. Carlos Valencia"
                    value={inspName}
                    onChange={(e) => setInspName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Número Celular de Contacto</label>
                  <input
                    type="tel"
                    required
                    name="telefono"
                    placeholder="Ej. +51 912 345 678"
                    value={inspPhone}
                    onChange={(e) => setInspPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Tipo de Requerimiento de Campo</label>
                  <select
                    name="tipo_requerimiento"
                    value={inspOption}
                    onChange={(e) => setInspOption(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none font-sans font-medium"
                  >
                    <option value="Tendido de fibra optica">Fusión / Tendido de Fibra Óptica</option>
                    <option value="Instalacion de camaras">Sistemas CCTV & Cámaras de Vigilancia</option>
                    <option value="Software a medida">Desarrollo de Software a Medida</option>
                    <option value="Equipamiento informatico">Suministro de Servidores & Equipos TI</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Notas de ubicación / Alcance</label>
                  <textarea
                    rows={2}
                    required
                    name="mensaje"
                    placeholder="Indique dirección del predio o detalles del nodo a revisar..."
                    value={inspMessage}
                    onChange={(e) => setInspMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                  <ValidationError 
                    prefix="Mensaje" 
                    field="mensaje"
                    errors={state.errors}
                    className="text-red-500 text-[10px] font-mono mt-1 block"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  disabled={state.submitting}
                  onClick={() => setIsInspectionModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={() => setSubmittedInspName(inspName)}
                  disabled={state.submitting}
                  className="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-md active:translate-y-0.5 disabled:opacity-50 cursor-pointer"
                >
                  {state.submitting ? 'Enviando...' : 'Agendar Visita'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Detailed Service Specifications Modal Drawer sheet */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-[#050811]/90 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedService(null)}
          />

          <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in zoom-in-95 duration-200">
            
            <div className="bg-[#12192d] text-white px-6 py-5 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <BadgeCheck className="w-5 h-5 text-red-500" />
                <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">Ficha Técnica de Homologación de Servicio</span>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 bg-red-50 text-red-600 font-mono text-[10px] font-extrabold uppercase rounded tracking-wider">
                  Divisora: {selectedService.category.replace('-', ' ')}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                  {selectedService.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedService.fullDescription}
                </p>
              </div>

              {/* Technical indicators board inside detail sheet */}
              <div className="border border-slate-100 rounded-2xl bg-slate-50/80 p-5 space-y-3 font-mono">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">Parámetros Técnicos de Entrega:</span>
                
                <div className="space-y-2 text-xs text-slate-700">
                  {selectedService.techSpecs.map((spec, i) => (
                    <div key={i} className="flex items-start space-x-2 pb-1.5 border-b border-slate-100 last:border-0 last:pb-0">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                      <span className="text-slate-800 leading-tight">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SLA Guarantee row */}
              <div className="bg-emerald-50 text-emerald-950 p-4 rounded-xl border border-emerald-200/40 text-xs flex items-center space-x-3 font-mono text-emerald-800">
                <BadgeCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <strong>GARANTÍA SLA VIGENTE:</strong> {selectedService.slaGuarantee}
                </div>
              </div>

            </div>

            <div className="bg-slate-50 border-t border-slate-100/80 px-6 py-4 flex gap-2 justify-end">
              <button
                onClick={() => {
                  setSelectedService(null);
                  setIsInspectionModalOpen(true);
                }}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center space-x-1"
              >
                <span>Solicitar este servicio</span>
                <PhoneCall className="w-4 h-4 ml-1" />
              </button>
              
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 hover:bg-slate-200 rounded-xl text-slate-600 text-xs font-semibold focus:outline-none"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
