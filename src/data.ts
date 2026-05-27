/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Project, Product, TrustCertification } from './types';

export const LEKANAR_SERVICES: Service[] = [
  {
    id: 'tendido-fibra',
    title: 'Tendido de Fibra Óptica',
    description: 'Despliegue aéreo y canalizado de fibra monomodo y multimodo con certificación de enlace.',
    fullDescription: 'Ingeniería y despliegue físico de cables de fibra óptica de gran capacidad. Cubrimos redes metropolitanas y troncales nacionales, cumpliendo la normativa internacional de tensión y flecha máxima, optimizando y garantizando la viabilidad del canal óptico a largo plazo.',
    icon: 'Cable',
    category: 'fiber',
    techSpecs: [
      'Uso de Fibra Monomodo G.652.D y G.657.A1',
      'Tendido aéreo con herrajes tipo J preformados',
      'Canalizados subterráneos con ductos HDPE',
      'Fusión por arco calibrada con Fujikura 90S'
    ],
    slaGuarantee: 'Restauración ante contingencias mecánicas en < 4 horas'
  },
  {
    id: 'planta-externa',
    title: 'Instalación de Planta Externa',
    description: 'Infraestructura robusta para redes interurbanas, enlaces troncales y distribución GPON regional.',
    fullDescription: 'Construcción integral de redes de distribución óptica (ODN). Diseñamos e implementamos tendidos interurbanos que conectan centrales a gabinetes divisores, protegiendo las líneas críticas de factores climáticos e interferencias electromagnéticas mediante blindaje dieléctrico.',
    icon: 'TowerControl',
    category: 'fiber',
    techSpecs: [
      'Empalmes en cajas de paso estancas con IP68',
      'Cálculo de vanos y catálogo de postes según viento regional',
      'Sistemas de anclaje de tensión constante',
      'Mediciones OTDR tridireccionales a 1310/1550/1625 nm'
    ],
    slaGuarantee: 'Cumplimiento estricto de atenuación máxima de 0.22 dB/km'
  },
  {
    id: 'planta-interna',
    title: 'Instalación en Planta Interna (ODF / Data Centers)',
    description: 'Organización, peinado y canalización interna en salas de telecomunicaciones corporativas.',
    fullDescription: 'Ordenamiento estructurado de bandejas de distribución de fibra (ODF), bandejas modulares de empalmes ópticos y bastidores. Optimizamos radios de curvatura dentro de gabinetes de TI para prevenir microcurvaturas catastróficas y facilitar mantenimientos expeditivos y seguros.',
    icon: 'Cpu',
    category: 'fiber',
    techSpecs: [
      'Peinado y etiquetado normado bajo ANSI/TIA-606-B',
      'Uso de latiguillos LSZH (Low Smoke Zero Halogen)',
      'Radio mínimo de curvatura de cables controlado a > 30mm',
      'Instalación de marcos distribuidores de alta densidad'
    ],
    slaGuarantee: 'Alineación de pérdida en conectores con umbral < 0.15 dB'
  },
  {
    id: 'instalacion-camaras',
    title: 'Instalación de Cámaras de Vigilancia',
    description: 'Sistemas CCTV IP e IoT empresariales y residenciales de alta fidelidad, con integración de red.',
    fullDescription: 'Diseño analítico de perímetros e implementación física de cámaras inteligentes de seguridad. Soportamos tecnologías IP PTZ, analítica de video perimetral automatizada y almacenamiento redundante centralizado que opera 24/7 sin pérdida cinematográfica de fotogramas.',
    icon: 'Cctv',
    category: 'security',
    techSpecs: [
      'Integración con plataformas unificadas VMS (Milestone/Genetec)',
      'Resolución nativa UHD 4K con compresión optimizada H.265+',
      'Alimentación centralizada redundante mediante PoE (802.3at)',
      'Visión nocturna inteligente de largo alcance adaptativa'
    ],
    slaGuarantee: 'Garantía extendida de video continuo con redundancia en borde'
  },
  {
    id: 'software-medida',
    title: 'Creación de Software a Medida',
    description: 'Sistemas empresariales de misión crítica diseñados para optimizar la logística, control y finanzas.',
    fullDescription: 'Construcción artesanal de sistemas de software estables para resolver complejidades del negocio. Desde aplicativos distribuidos de monitoreo preventivo de de enlaces ópticos hasta plataformas logísticas ERP integradas de alto volumen transaccional y nula latencia.',
    icon: 'CodeXml',
    category: 'software',
    techSpecs: [
      'Arquitectura de microservicios escalable y segura',
      'Modelado de datos relacional y motores SQL optimizados',
      'APIs RESTful con autenticación JWT de doble factor y HTTPS',
      'Panel administrativo adaptativo responsivo de alto rendimiento'
    ],
    slaGuarantee: 'Soporte y corrección prioritaria con Uptime SLA de 99.95%'
  },
  {
    id: 'venta-equipos',
    title: 'Suministro e Integración IT',
    description: 'Venta corporativa y asesoría técnica de hardware de cómputo, servidores y materiales de campo.',
    fullDescription: 'Aprovisionamiento integral de equipamiento tecnológico homologado. Abastecemos de forma ágil desde servidores rack de alta densidad y laptops ejecutivas, hasta herramientas técnicas de campo esenciales para empalmes y protección para alturas.',
    icon: 'Laptop',
    category: 'hardware',
    techSpecs: [
      'Garantía directa del fabricante como socios autorizados',
      'Homologación previa de equipos de prueba antes del despacho',
      'Suministro certificado de cinturones, arneses y herramientas de campo',
      'Servidores configurados a medida listos para producción'
    ],
    slaGuarantee: 'Reemplazo de partes en hardware de misión crítica en 24 horas'
  }
];

export const LEKANAR_PROJECTS: Project[] = [
  {
    id: 'proj-chala-tendido',
    title: 'Chala: Tendido de Fibra Óptica',
    location: 'Chala, Arequipa - Perú',
    description: 'Implementación llave en mano de troncal de fibra aérea urbana para interconexión gubernamental e institucional, operando bajo estricta tolerancia de atenuación.',
    category: 'fibra-externa',
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800',
    specs: {
      lengthKm: 47.8,
      spliceCount: 192,
      attenuationDb: '0.19 dB/km promedio',
      standard: 'ITU-T G.652.D',
      certification: 'Certificado OTDR Fluke Networks',
      executionTime: '45 días calendario'
    }
  },
  {
    id: 'proj-datacenter-interna',
    title: 'Planta Interna ODF Arequipa Centro',
    location: 'Arequipa Metropolitana - Perú',
    description: 'Organización e interconexión de Planta Interna en Nodos de Fibra Centralizada. Implementación de bandejas ópticas deslizantes y peinado minucioso de mazos de red.',
    category: 'fibra-interna',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    specs: {
      spliceCount: 576,
      attenuationDb: '0.04 dB por fusión promedio',
      standard: 'TIA-568-C.3',
      certification: 'Pérdida por Retorno Óptico (ORL) > 55 dB',
      executionTime: '15 días calendario'
    }
  },
  {
    id: 'proj-muni-cctv',
    title: 'Estudio y Diseño de Fibra & CCTV Metropolitano',
    location: 'Saman / Puno - Perú',
    description: 'Estudio topográfico digital, cálculo mecánico de vanos y diseño de trayectorias de planta externa para el anillo óptico y cámaras de videovigilancia de alta resolución.',
    category: 'telecom',
    imageUrl: 'https://images.unsplash.com/photo-1596450514735-111a2feec499?auto=format&fit=crop&q=80&w=800',
    specs: {
      lengthKm: 12.4,
      spliceCount: 48,
      attenuationDb: 'Link budget óptimo garantizado',
      standard: 'OSPS / ITU-T G.657.A2',
      certification: 'Planos de Planta Externa Georeferenciados CAD',
      executionTime: '20 días calendario'
    }
  },
  {
    id: 'proj-erp-custom-software',
    title: 'ERP Logístico y Monitoreo de Redes',
    location: 'Corporativo Multi-región',
    description: 'Desarrollo a la medida de software de control de inventario de equipos de telecomunicaciones interconectado con sensores de atenuación automática en fibra óptica activa.',
    category: 'software',
    imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800',
    specs: {
      standard: 'Security compliance ISO 27001 / OWASP Top 10',
      certification: 'Uptime garantizado del servicio de 99.98%',
      executionTime: '90 días'
    }
  }
];

export const LEKANAR_PRODUCTS: Product[] = [
  {
    id: 'prod-serv-rack',
    name: 'Servidor Enterprise Rack 2U Lenovo/HPE',
    description: 'Servidor robusto de alto rendimiento para bases de datos corporativas y entornos de virtualización crítica.',
    category: 'equipos-ti',
    priceRange: 'S/. 8,500 - S/. 24,000',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=300',
    specs: ['Procesadores Intel Xeon Silver / AMD EPYC', 'Hasta 1.5TB DDR4 RAM ECC', 'Fuentes Hot-Plug redundantes 80 Plus Platinum', 'Controladoras RAID con caché de seguridad SAS/SATA'],
    stockStatus: 'Bajo Pedido',
    brand: 'Lenovo / HPE'
  },
  {
    id: 'prod-lap-pro',
    name: 'Laptops Corporativas ThinkPad L14 / Dell Vostro',
    description: 'Equipos portátiles premium diseñados para tareas corporativas con chips de seguridad dTPM integrados.',
    category: 'equipos-ti',
    priceRange: 'S/. 2,800 - S/. 5,500',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=300',
    specs: ['Procesadores Intel Core i7 / AMD Ryzen 7', '16GB/32GB RAM configurable', 'Chasis de aleación de magnesio de calidad militar', 'Garantía Premier Lekanar de 1 año'],
    stockStatus: 'Disponibilidad Inmediata',
    brand: 'Lenovo / Dell'
  },
  {
    id: 'prod-cable-drop',
    name: 'Cable Fibra Óptica Drop Autosoportado G.657.A1 x Kilómetro',
    description: 'Cable de acometida FTTH con miembro de tracción metálico y mensajero para uso aéreo continuo.',
    category: 'fibra-componentes',
    priceRange: 'S/. 320 - S/. 480',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=300',
    specs: ['Fibra resistente a dobleces ITU-T G.657.A1', 'Cubierta LSZH retardante de llama y anti-UV', 'Alambre de acero mensajero de 1.0mm', 'Atenuación estricta < 0.35dB/km a 1310nm'],
    stockStatus: 'In Stock',
    brand: 'Huanet / FiberHome'
  },
  {
    id: 'prod-arnes-seg',
    name: 'Arnés de Elevación y Cinturón de Seguridad Liniero',
    description: 'Equipo de protección individual (EPP) completo para tendidos de fibra en postes y torres de comunicaciones.',
    category: 'seguridad-epp',
    priceRange: 'S/. 180 - S/. 340',
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=300',
    specs: ['Certificación internacional ANSI Z359.11 y CE', 'Hebillas de fricción autoajustables de cero deslizamiento', 'Faja acolchada de gran soporte lumbar transpirable', 'Anillos D laterales de acero forjado resistentes a 23kN'],
    stockStatus: 'In Stock',
    brand: 'SOSEGA / Steelpro'
  },
  {
    id: 'prod-fusion-kit',
    name: 'Kit de Conexión Rápida de Fibra: Peladora + Cortadora de Precisión',
    description: 'Maletín técnico completo con cortadora de diamante de alta fidelidad, peladora Miller de tres orificios y localizador de fallas (VFL).',
    category: 'herramientas',
    priceRange: 'S/. 450 - S/. 1,200',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=300',
    specs: ['Cortadora con cuchilla de 16 posiciones de corte', 'Peladora ajustable de calibrura de precisión Miller original', 'Localizador óptico visual potente de 30mW (30km)', 'Estuche de transporte rígido antigolpes de protección'],
    stockStatus: 'Disponibilidad Inmediata',
    brand: 'Oriente / Sumitomo'
  }
];

export const TRUST_CERTIFICATIONS: TrustCertification[] = [
  {
    title: 'ISO 9001:2015',
    description: 'Garantía total de procesos de calidad en fusión, canalizado y diseño de enlaces ópticos de planta externa.',
    badge: 'Calidad Certificada',
    norm: 'Gestión Operativa de Excelencia'
  },
  {
    title: 'Seguridad Alturas OHSAS',
    description: 'Técnicos certificados oficialmente en trabajo seguro en alturas de torres, postes y espacios confinados.',
    badge: 'Riesgo Cero',
    norm: 'SST Ley 29783'
  },
  {
    title: 'Garantía Homologada TI',
    description: 'Todos los equipos de cómputo y servidores cuentan con soporte oficial directo y repuestos legítimos e inmediatos.',
    badge: 'Seguridad Comercial',
    norm: 'Garantía Original'
  }
];

export const BRAND_PARTNERS = [
  { name: 'AXIS COMMUNICATIONS', sub: 'Solution Gold Partner', logo: '🌐' },
  { name: 'RADWIN', sub: 'Sistemas Inalámbricos', logo: '📶' },
  { name: 'CISCO', sub: 'Premier Partner', logo: '🪐' },
  { name: 'BOSCH SECTOR', sub: 'CCTV Specialist', logo: '🛠️' },
  { name: 'MobileMark', sub: 'Antenas de Precisión', logo: '🧬' },
  { name: 'milestone', sub: 'VMS Plataforma Gold', logo: '🛡️' },
  { name: 'Genetec', sub: 'Seguridad Unificada', logo: '⚡' },
  { name: 'Wabtec CORPORATION', sub: 'Equipos Operativos', logo: '⚙️' },
  { name: 'HUAWEI', sub: 'Transmisión Óptica', logo: '🏵️' },
  { name: 'DELL ENTERPRISE', sub: 'Authorized Server Dealer', logo: '💻' }
];
