/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Shield, User, Phone, Mail, FileText, CheckCircle2, Award, ClipboardCheck, Sparkles, Send } from 'lucide-react';

interface ConsultationFormProps {
  onOpenSuccessMessage: (message: string) => void;
}

export default function ConsultationForm({ onOpenSuccessMessage }: ConsultationFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('fibra-optica');
  const [message, setMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const [state, handleSubmit] = useForm("xqejgnev");

  useEffect(() => {
    if (state.succeeded) {
      onOpenSuccessMessage(
        `Estimado ${submittedName || 'Usuario'}, su solicitud ha sido recibida correctamente a través de Formspree. Un Ingeniero de Enlace Colegiado y Habilitado (CIP) de LEKANAR se pondrá en contacto con usted en menos de 30 minutos para coordinar la inspección técnica o viabilidad del proyecto.`
      );
      // Reset fields
      setName('');
      setPhone('');
      setCompany('');
      setEmail('');
      setMessage('');
    }
  }, [state.succeeded]);

  return (
    <section id="consultar" className="py-24 bg-[#080d1a] text-white relative overflow-hidden border-t border-slate-900">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-950 border border-red-500/30 px-3 py-1.5 rounded-full text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            <span>Ingeniería de Enlace Homologada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-white tracking-tight">
            Consultar con Ingeniero Colegiado y Titulado
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            No deje su conectividad crítica al azar. Hable directamente con profesionales habilitados por el Colegio de Ingenieros del Perú (CIP) para planificar sus tendidos, empalmes y redes de software.
          </p>
        </div>

        {/* Form & Trust columns block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Informational Column (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                Garantía Profesional LEKANAR
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Ingenieros con Firma Autorizada CIP
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Todas nuestras entregas de planos ópticos, memorias descriptivas de fibra y presupuestos de atenuación son auditados y firmados por un Ingeniero Electrónico o Ingeniero de Telecomunicaciones con colegiatura vigente.
              </p>
            </div>

            {/* Spec Checks */}
            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-emerald-950/80 border border-emerald-500/30 rounded-lg text-emerald-400 shrink-0 mt-0.5">
                  <ClipboardCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Diseño y Memorias de Cálculo:</strong>
                  <span className="text-slate-400 text-xs text-slate-300 block">Planos CAD georreferenciados conformes a las exigencias regulatorias peruanas.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1 bg-red-950/80 border border-red-500/30 rounded-lg text-red-500 shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Certificación de Enlaces Físicos:</strong>
                  <span className="text-slate-400 text-xs text-slate-300 block">Homologación oficial de atenuación dB reflectométrica con reporte OTDR por hilo.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-950/80 border border-blue-500/30 rounded-lg text-blue-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Evaluación de Campo Sin Costo:</strong>
                  <span className="text-slate-400 text-xs text-slate-300 block">Inspección preliminar gratuita en toda la provincia de Arequipa en menos de 24 horas.</span>
                </div>
              </div>
            </div>

            {/* Legal regulatory text block */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-[11px] text-slate-400 leading-relaxed font-mono">
              <span>* Cumplimos estrictamente las directrices dictadas por el Ministerio de Transportes y Comunicaciones (MTC) del Perú, asegurando que su infraestructura de fibra esté protegida ante multas y clausuras.</span>
            </div>
          </div>

          {/* Practical interactive Consultation Form (Right) */}
          <div className="lg:col-span-7 bg-[#0f1526] border border-blue-950/80 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest hidden sm:block">
              Canal Prioritario Real-Time
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-slate-200">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold font-sans text-white">Registre su Requerimiento Técnico</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Complete los datos solicitados para generar un ticket automático de evaluación premium.
                </p>
              </div>

              {/* Standard Core fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Su Nombre de Contacto *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      name="nombre"
                      placeholder="Ej. Ing. Carlos Valencia"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#070b14] border border-blue-950 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-red-500 text-white placeholder-slate-600 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Su Teléfono Celular *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      required
                      name="telefono"
                      placeholder="Ej. +51 987 654 321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#070b14] border border-blue-950 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-red-500 text-white placeholder-slate-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Empresa o Institución</label>
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Ej. Minera o ISP del Sur"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#070b14] border border-blue-950 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-red-500 text-white placeholder-slate-600 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Correo Corporativo</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="carlos.valencia@empresa.pe"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#070b14] border border-blue-950 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-red-500 text-white placeholder-slate-600 font-medium"
                    />
                  </div>
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-400 text-[11px] font-mono mt-1 block"
                  />
                </div>
              </div>

              {/* Inquiry Type Select */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Especialidad de Consulta</label>
                <select
                  name="especialidad"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-[#070b14] border border-blue-950 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-red-500 text-slate-200 font-sans font-medium"
                >
                  <option value="fibra-optica">Tendido y Fusiones de Fibra Óptica (Aéreo / Subterráneo)</option>
                  <option value="planta-interna">Diseño de Red, ODFs y Servidores Planta Interna</option>
                  <option value="seguridad-ip">Sistemas Integrales de CCTV Inteligente & Monitoreo</option>
                  <option value="software-iot">Desarrollo de Software Industrial & Monitoreo IoT</option>
                  <option value="hardware-ti">Suministro de Servidores de Alta Gama & Conectores</option>
                  <option value="otros">Otros servicios (Proyectos especiales / Consultas generales)</option>
                </select>
              </div>

              {/* Description message box */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Breve descripción del alcance del proyecto</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">
                    <FileText className="w-4 h-4" />
                  </span>
                  <textarea
                    rows={3}
                    name="mensaje"
                    required
                    placeholder="Escriba los detalles aquí (Ej. Requerimos tendido aéreo de G.652D de 5 km en planta minera para interconexión...)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#070b14] border border-blue-950 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-red-500 text-white placeholder-slate-600 font-medium"
                  />
                </div>
                <ValidationError 
                  prefix="Mensaje" 
                  field="mensaje"
                  errors={state.errors}
                  className="text-red-400 text-[11px] font-mono mt-1 block"
                />
              </div>

              <button
                type="submit"
                onClick={() => setSubmittedName(name)}
                disabled={state.submitting}
                className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-md active:translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{state.submitting ? 'Enviando ticket...' : 'Enviar Consulta a Ingeniería de Campo'}</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
