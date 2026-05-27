/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Check, 
  PackageCheck, 
  Info, 
  X, 
  ArrowRight,
  Send,
  Sparkles
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { LEKANAR_PRODUCTS } from '../data';
import { Product } from '../types';

interface EquipmentStoreProps {
  onOpenSuccessMessage: (msg: string) => void;
}

export default function EquipmentStore({ onOpenSuccessMessage }: EquipmentStoreProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Quote list state
  const [cart, setCart] = useState<Product[]>([]);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  
  // Client submission form details
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [submittedClientName, setSubmittedClientName] = useState('');
  const [submittedCartSize, setSubmittedCartSize] = useState(0);

  const [state, handleSubmit] = useForm("xqejgnev");

  useEffect(() => {
    if (state.succeeded) {
      onOpenSuccessMessage(
        `Estimado ${submittedClientName || 'Cliente'}, su solicitud de cotización oficial para ${submittedCartSize} componente(s) tecnológico(s) ha sido registrada exitosamente a través de Formspree con el folio LK-${Math.floor(Math.random() * 90000 + 10000)}. Un supervisor del área de Suministro Tec. se comunicará en menos de 2 horas para enviarle la hoja técnica formal.`
      );
      // Reset fields
      setCart([]);
      setIsQuoteOpen(false);
      setClientName('');
      setClientCompany('');
      setClientPhone('');
      setClientEmail('');
      setQuoteNotes('');
    }
  }, [state.succeeded]);

  const categories = [
    { value: 'all', label: 'Todos los Equipos' },
    { value: 'equipos-ti', label: 'Laptops & Servidores' },
    { value: 'fibra-componentes', label: 'Cable Drop & Conectividad' },
    { value: 'seguridad-epp', label: 'Cinturones & Arneses (EPP)' },
    { value: 'herramientas', label: 'Herramientas de Campo' }
  ];

  const filteredProducts = LEKANAR_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleCartItem = (product: Product) => {
    if (cart.some(item => item.id === product.id)) {
      setCart(prev => prev.filter(item => item.id !== product.id));
    } else {
      setCart(prev => [...prev, product]);
    }
  };



  return (
    <section id="equipos" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sticky Trigger Counter for Suministro Basket */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-4 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce cursor-pointer group hover:scale-105 transition-all text-sm"
              id="suministro-cart-trigger"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span>Solicitud de Cotización</span>
              <span className="bg-[#1e1b4b] text-white text-xs px-2.5 py-1 rounded-full font-mono">
                {cart.length}
              </span>
            </button>
          </div>
        )}

        {/* Header content styling */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <span>Suministro Tecnológico Homologado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-900 tracking-tight">
            Compra y Venta de Equipamiento Informático Directo
          </h2>
          <p className="text-slate-600 text-base">
            Abastecemos con total garantía legal y técnica desde servidores de base de datos críticos de última generación hasta cable drop y cinturones de liniero homologados.
          </p>
        </div>

        {/* Filter controls and Search Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 mb-12 max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar celular, laptop, servidor, cinturón, fibra, herramientas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#1e1b4b] focus:ring-1 focus:ring-[#1e1b4b] pl-11 pr-4 py-2.5 rounded-xl text-sm text-slate-900 focus:outline-none placeholder-slate-400 transition-all font-sans"
              />
            </div>

            {/* Hint message */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <Info className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Agregue ítems de interés para generar una proforma detallada con SLA</span>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold focus:outline-none transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Display Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl max-w-4xl mx-auto space-y-4">
            <p className="text-slate-400 text-base font-medium">No se encontraron productos en esta sección.</p>
            <p className="text-xs text-slate-500">Intente buscando por otra categoría o palabra clave como "servidor" o "cinturón".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const inCart = cart.some(item => item.id === p.id);
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between hover:scale-101 hover:shadow-lg transition-all"
                  id={`product-card-${p.id}`}
                >
                  <div className="p-5 space-y-5">
                    
                    {/* Image and brand details */}
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white px-2 py-1 text-[9px] font-mono tracking-wider rounded uppercase">
                        {p.brand}
                      </div>

                      {/* Stock Badge */}
                      <div className={`absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        p.stockStatus === 'In Stock' ? 'bg-emerald-50 text-emerald-700 border border-emerald-500/30' :
                        p.stockStatus === 'Disponibilidad Inmediata' ? 'bg-blue-50 text-blue-700 border border-blue-500/30' :
                        'bg-amber-50 text-amber-700 border border-amber-500/30'
                      }`}>
                        {p.stockStatus}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-600 font-bold">
                          {p.category.replace('-', ' ')}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-800 bg-slate-50 p-1 px-2 rounded">
                          Ref: {p.priceRange}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Technical Specifications Specs bullets layout */}
                    <div className="pt-3 border-t border-slate-50 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Atributos De Equipo:</span>
                      <ul className="space-y-1 text-[11px] text-slate-700 font-sans">
                        {p.specs.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 shrink-0 mt-1.5" />
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Add action row footer */}
                  <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                    <button
                      onClick={() => toggleCartItem(p)}
                      className={`w-full py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all focus:outline-none flex items-center justify-center space-x-2 ${
                        inCart
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-slate-900 hover:bg-emerald-500 active:bg-emerald-600 text-white shadow-sm'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <PackageCheck className="w-4 h-4" />
                          <span>Agregado a Cotización ({cart.length})</span>
                        </>
                      ) : (
                        <>
                          <span>Añadir a Cotización</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Corporate Quote Drawer popover overlay */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsQuoteOpen(false)}
          />

          <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            
            <div className="bg-[#12192d] text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-mono font-extrabold tracking-widest uppercase">Formulario de Cotización Consolidada</span>
              </div>
              <button 
                onClick={() => setIsQuoteOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-emerald-950">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-extrabold">Cotización Lekanar Suministro:</strong> Está a punto de solicitar una proforma técnica formal para <strong>{cart.length} componente(s)</strong>. Estos artículos se despachan con ficha técnica original de fabricante, calibración y herrajes homologados para el mercado nacional.
                </div>
              </div>

              {/* Items Selected Summary scrolling board */}
              <div className="border border-slate-100 rounded-xl max-h-40 overflow-y-auto p-3 space-y-2 bg-slate-50/50">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Ítems Seleccionados:</span>
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs border-b border-white pb-2 last:border-b-0 last:pb-0">
                    <span className="font-medium text-slate-900 truncate max-w-[280px]">{item.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleCartItem(item)}
                      className="text-red-500 hover:text-red-700 text-[10px] font-bold font-mono"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>

              {/* Fields */}
              <input type="hidden" name="items_carrito" value={cart.map(item => `${item.name} (${item.brand})`).join(', ')} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-500">Nombre del Solicitante</label>
                  <input
                    type="text"
                    required
                    name="nombre_solicitante"
                    placeholder="Ej. Ing. Daniel Cáceres"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-500">Empresa / Entidad</label>
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Ej. Minera Sur Arequipa"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-500">Celular / Teléfono</label>
                  <input
                    type="tel"
                    required
                    name="telefono"
                    placeholder="Ej. +51 987 654 321"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-500">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="Ej. logistica@empresa.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-[10px] font-mono mt-1 block"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-500">Notas Adicionales de Requerimiento</label>
                  <textarea
                    rows={2}
                    required
                    name="mensaje_notas"
                    placeholder="Especifique cantidades requeridas, plazos de entrega estimados o características especiales..."
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 p-2.5 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                  <ValidationError 
                    prefix="Mensaje" 
                    field="mensaje_notas"
                    errors={state.errors}
                    className="text-red-500 text-[10px] font-mono mt-1 block"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  disabled={state.submitting}
                  onClick={() => setIsQuoteOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-3 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setSubmittedClientName(clientName);
                    setSubmittedCartSize(cart.length);
                  }}
                  disabled={state.submitting}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md active:translate-y-0.5 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{state.submitting ? 'Enviando...' : 'Solicitar Proforma'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
}
