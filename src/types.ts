/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  category: 'fiber' | 'security' | 'software' | 'hardware';
  techSpecs: string[];
  slaGuarantee: string;
}

export interface ProjectIdSpecs {
  lengthKm?: number;
  spliceCount?: number;
  attenuationDb?: string;
  standard: string;
  certification: string;
  executionTime: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  category: 'fibra-externa' | 'fibra-interna' | 'seguridad' | 'software' | 'telecom';
  specs: ProjectIdSpecs;
  imageUrl: string;
  verMasLink?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'equipos-ti' | 'fibra-componentes' | 'seguridad-epp' | 'herramientas';
  priceRange: string;
  imageUrl: string;
  specs: string[];
  stockStatus: 'In Stock' | 'Bajo Pedido' | 'Disponibilidad Inmediata';
  brand: string;
}

export interface TrustCertification {
  title: string;
  description: string;
  badge: string;
  norm: string;
}
