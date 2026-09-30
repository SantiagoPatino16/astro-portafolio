export type ProductStatus = 'produccion' | 'beta' | 'academico'

export interface LayerDef {
  layer: string
  detail: string
}

export interface DecisionDef {
  title: string
  text: string
}

export interface ShotDef {
  base: string
  alt: string
  caption: string
}

export interface CaseStudy {
  id: string
  name: string
  codename: string
  tagline: string
  status: ProductStatus
  statusLabel: string
  period: string
  role: string
  kindLabel: string
  summary: string
  problem: string
  solution: string
  decisions: DecisionDef[]
  architecture: LayerDef[]
  stack: string[]
  highlights: string[]
  evolution: string
  result: string
  shots: ShotDef[]
  featured: boolean
}

export interface ConstellationNode {
  id: string
  kind: 'core' | 'product' | 'service' | 'system'
  name: string
  short: string
  status?: ProductStatus
  caseId?: string
  anchor?: string
  position: { x: number; y: number; z: number }
  connections: string[]
  size: number
}

export interface Service {
  id: string
  name: string
  description: string
  bullets: string[]
}

export interface MethodStep {
  index: string
  title: string
  text: string
}

export interface CapabilityGroup {
  name: string
  items: string[]
  note: string
}

export interface OtherSystem {
  name: string
  what: string
  stack: string
  status: string
}

export const statusLabel: Record<ProductStatus, string> = {
  produccion: 'En producción',
  beta: 'Beta — lanzamiento próximo',
  academico: 'Académico',
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'astrorise',
    name: 'AstroRise',
    codename: 'ERP · producción textil',
    tagline: 'Plataforma web para operar un taller de confección de punta a punta.',
    status: 'beta',
    statusLabel: statusLabel.beta,
    period: 'En desarrollo · beta próxima',
    role: 'Desarrollador principal · ciclo completo',
    kindLabel: 'ERP web',
    summary:
      'ERP web para producción textil: clientes, cartera, nómina, asistencia biométrica, fichas de programación, cortes, remisiones, gastos, dashboard y reportes.',
    problem:
      'Un taller de confección necesitaba una sola plataforma que conectara clientes, producción, nómina y asistencia. Antes eran procesos separados y hojas de cálculo. Además, requería control de acceso por rol: cada usuario debía ver solo sus módulos.',
    solution:
      'SPA en React + TypeScript + Tailwind con una API en ASP.NET Core + EF Core, bajo Clean Architecture (Domain, Application, Infrastructure, Web). Autenticación JWT con autorización por módulo, integración biométrica BioTime, UnitOfWork, Docker, CI con GitHub Actions y pruebas E2E con Playwright.',
    decisions: [
      {
        title: 'Clean Architecture por capas',
        text: 'Domain sin dependencias, Application con la lógica, Infrastructure con EF Core y Web con la API. Las dependencias van en una sola dirección.',
      },
      {
        title: 'Autorización por módulo',
        text: 'Un atributo RequireModule resuelto por policy providers decide en cada request qué endpoints puede tocar cada rol; el frontend replica el guard.',
      },
      {
        title: 'UnitOfWork como único commit',
        text: 'Los repositorios marcan cambios en el ChangeTracker y un único punto confirma la transacción, evitando commits dispersos.',
      },
      {
        title: 'Integración biométrica por polling',
        text: 'Un BackgroundService sincroniza las marcaciones de BioTime y aplica la alternancia entrada/salida.',
      },
    ],
    architecture: [
      { layer: 'Domain', detail: 'Entidades y enums, sin dependencias externas.' },
      { layer: 'Application', detail: 'DTOs y servicios con la lógica de negocio.' },
      { layer: 'Infrastructure', detail: 'EF Core, repositorios, migraciones y seeds.' },
      { layer: 'Web', detail: 'API REST, JWT, autorización por módulo y servicios en segundo plano.' },
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind',
      'shadcn/ui',
      'React Query',
      'ASP.NET Core',
      'EF Core',
      'SQL Server',
      'JWT',
      'Docker',
      'GitHub Actions',
      'Playwright',
    ],
    highlights: [
      'Integración biométrica BioTime',
      'Autorización por rol y módulo',
      'Comisiones por remisión y producción',
      'Informes de corte generados desde fichas',
      'Cartera con aviso por WhatsApp',
      'Pruebas E2E e integración continua',
    ],
    evolution:
      'Próximo a lanzar su beta como producto comercial, con la intención de evolucionar a SaaS según la demanda.',
    result:
      'Beta en preparación. Es el puente entre los sistemas de escritorio y una plataforma web que escala.',
    shots: [
      { base: 'astrorise1', alt: 'Dashboard de AstroRise', caption: 'Dashboard' },
      { base: 'astrorise2', alt: 'Módulo de AstroRise', caption: 'Módulo de operación' },
      { base: 'astrorise3', alt: 'Detalle de AstroRise', caption: 'Detalle de registro' },
    ],
    featured: true,
  },
  {
    id: 'astrocred',
    name: 'AstroCred',
    codename: 'Crédito · amortización francesa',
    tagline: 'Gestión integral de créditos, prendas, contabilidad e inversionistas.',
    status: 'produccion',
    statusLabel: statusLabel.produccion,
    period: 'En producción',
    role: 'Desarrollador principal · ciclo completo',
    kindLabel: 'Sistema financiero',
    summary:
      'Sistema de escritorio para gestión integral de créditos bajo amortización francesa: clientes, préstamos por prenda, contabilidad, inversionistas, socios y emisión de recibos e informes.',
    problem:
      'Una empresa de crédito llevaba préstamos, prendas, inversionistas y contabilidad en hojas de cálculo y papel. La amortización francesa se calculaba a mano: cada cuota reparte capital e intereses de forma distinta, y un error se traduce en dinero mal cobrado. Tampoco había trazabilidad de pagos ni recibos imprimibles.',
    solution:
      'Sistema de escritorio en C#/WinForms con arquitectura N-capas (Common, DataAccess, LogicBussiness, Presentación). Genera la tabla de amortización automáticamente al crear el crédito, registra pagos y abonos a capital, maneja préstamos por prenda, notas crédito y produce recibos y reportes listos para imprimir.',
    decisions: [
      {
        title: 'La amortización vive en la capa de negocio',
        text: 'El cálculo de cuota, capital e intereses está en LogicBussiness, no en la interfaz. La UI solo muestra; la regla es única y verificable.',
      },
      {
        title: 'Separación de responsabilidades en capas',
        text: 'Common, DataAccess, LogicBussiness y Presentación con dependencias en una sola dirección, para cambiar una pieza sin romper el resto.',
      },
      {
        title: 'Catálogo de errores centralizado',
        text: 'Un único punto define y formatea los errores de negocio, para mensajes consistentes en todo el sistema.',
      },
      {
        title: 'Impresión de recibos',
        text: 'Recibos y tabla de amortización generados para imprimir en papel, porque así trabaja el cliente.',
      },
    ],
    architecture: [
      { layer: 'Common', detail: 'Atributos, utilidades y catálogo de errores.' },
      { layer: 'DataAccess', detail: 'Entidades y acceso a SQL Server.' },
      { layer: 'LogicBussiness', detail: 'Reglas de negocio y cálculo de amortización.' },
      { layer: 'Presentación', detail: 'WinForms: menú, formularios e impresión.' },
    ],
    stack: ['C#', 'WinForms', 'SQL Server', 'ADO.NET', '.NET Framework'],
    highlights: [
      'Tabla de amortización francesa',
      'Préstamos por prenda',
      'Contabilidad general',
      'Inversionistas y liquidación de ganancias',
      'Socios y notas crédito',
      'Reportes e impresión de recibos',
    ],
    evolution:
      'Empezó como una herramienta puntual y creció a módulos de inversionistas, socios y contabilidad. Hoy se mantiene con actualizaciones constantes según lo que pide la operación.',
    result:
      'En uso productivo por una empresa. Sin métricas inventadas: el indicador es que se usa a diario para operar créditos reales.',
    shots: [
      { base: 'astrocred1', alt: 'Pantalla principal de AstroCred', caption: 'Inicio' },
      { base: 'astrocred2', alt: 'Tabla de amortización de AstroCred', caption: 'Amortización' },
      { base: 'astrocred3', alt: 'Reporte de AstroCred', caption: 'Reporte' },
    ],
    featured: true,
  },
  {
    id: 'astronova',
    name: 'AstroNova',
    codename: 'Inventario · taller textil',
    tagline: 'Control de telas, cortes, entregas y remisiones para un taller.',
    status: 'produccion',
    statusLabel: statusLabel.produccion,
    period: 'En producción',
    role: 'Desarrollador principal · ciclo completo',
    kindLabel: 'Inventario y producción',
    summary:
      'Sistema de escritorio para gestión de inventario y entregas de un taller textil: bodegas, telas, cortes, remisiones y control de existencias.',
    problem:
      'Un taller de confección controlaba telas, cortes y entregas en cuadernos. No sabían con certeza qué existencias tenían, qué cortes estaban pendientes ni qué se había entregado a cada cliente.',
    solution:
      'Sistema WinForms con MaterialSkin y reportes en PDF (PDFSharp), en N-capas. Administra bodegas, inventario de telas, cortes pendientes, entregas y genera remisiones imprimibles.',
    decisions: [
      {
        title: 'Reportes en PDF',
        text: 'PDFSharp genera remisiones e historial en PDF, para que el taller imprima o envíe documentos sin depender de plantillas externas.',
      },
      {
        title: 'Flujo de entradas y salidas',
        text: 'El inventario se mueve por entradas y salidas registradas, no por edición directa: cada movimiento queda en el historial.',
      },
      {
        title: 'Interfaz clara para el taller',
        text: 'MaterialSkin da una UI consistente y legible para operadores que no son técnicos.',
      },
    ],
    architecture: [
      { layer: 'Datos', detail: 'Acceso a SQL Server y entidades del dominio.' },
      { layer: 'Negocio', detail: 'Reglas de inventario, cortes y entregas.' },
      { layer: 'Presentación', detail: 'WinForms + MaterialSkin y reportes PDF.' },
    ],
    stack: ['C#', 'WinForms', 'MaterialSkin', 'PDFSharp', 'SQL Server'],
    highlights: [
      'Inventario de telas y bodegas',
      'Cortes y entregas',
      'Remisiones en PDF',
      'Historial de movimientos',
    ],
    evolution: 'En uso comercial activo, con actualizaciones constantes.',
    result: 'En uso comercial activo.',
    shots: [
      { base: 'astronova1', alt: 'Inventario de AstroNova', caption: 'Inventario' },
      { base: 'astronova2', alt: 'Remisión de AstroNova', caption: 'Remisión' },
      { base: 'astronova3', alt: 'Cortes de AstroNova', caption: 'Cortes' },
    ],
    featured: true,
  },
]

export const otherSystems: OtherSystem[] = [
  {
    name: 'Landing pages',
    what: 'Varias landing pages en la nube para marcas y comercios.',
    stack: 'HTML, CSS, JavaScript',
    status: 'En producción',
  },
  {
    name: 'SISC — red social de egresados',
    what: 'Plataforma universitaria con mensajería, perfiles, contenido, bolsa de empleo y eventos.',
    stack: 'ASP.NET Web Forms, EF 6, N-capas',
    status: 'Académico',
  },
  {
    name: 'Automatizaciones',
    what: 'Flujos de Power Automate y n8n para optimizar procesos internos.',
    stack: 'Power Automate, n8n',
    status: 'En uso',
  },
  {
    name: 'Visualizador de cámaras',
    what: 'Aplicativo para visualización de cámaras de videovigilancia integrado con DVR Hikvision.',
    stack: 'C#, DVR Hikvision',
    status: 'Práctica profesional',
  },
]

export const constellation: ConstellationNode[] = [
  {
    id: 'core',
    kind: 'core',
    name: 'Astro, Inc',
    short: 'Astro, Inc',
    position: { x: 0, y: 0, z: 0 },
    connections: ['astrorise', 'astrocred', 'astronova', 'desarrollo', 'automatizacion', 'infra'],
    size: 1,
  },
  {
    id: 'astrorise',
    kind: 'product',
    name: 'AstroRise',
    short: 'ERP web',
    status: 'beta',
    caseId: 'astrorise',
    position: { x: 0.85, y: 0.42, z: 0.25 },
    connections: ['core', 'astrocred', 'astronova', 'automatizacion'],
    size: 0.88,
  },
  {
    id: 'astrocred',
    kind: 'product',
    name: 'AstroCred',
    short: 'Crédito',
    status: 'produccion',
    caseId: 'astrocred',
    position: { x: -0.85, y: -0.45, z: 0.05 },
    connections: ['core', 'astrorise'],
    size: 0.82,
  },
  {
    id: 'astronova',
    kind: 'product',
    name: 'AstroNova',
    short: 'Inventario',
    status: 'produccion',
    caseId: 'astronova',
    position: { x: -0.62, y: 0.8, z: -0.2 },
    connections: ['core', 'astrorise'],
    size: 0.82,
  },
  {
    id: 'desarrollo',
    kind: 'service',
    name: 'Desarrollo a medida',
    short: 'Desarrollo',
    position: { x: 0.35, y: 0.95, z: -0.35 },
    connections: ['core', 'astrorise'],
    size: 0.55,
  },
  {
    id: 'automatizacion',
    kind: 'service',
    name: 'Automatización',
    short: 'Automatización',
    position: { x: -0.55, y: -0.95, z: -0.1 },
    connections: ['core', 'astrorise'],
    size: 0.55,
  },
  {
    id: 'infra',
    kind: 'service',
    name: 'Soporte e infraestructura',
    short: 'Infraestructura',
    position: { x: 0.85, y: -0.55, z: 0.3 },
    connections: ['core'],
    size: 0.55,
  },
]

export const services: Service[] = [
  {
    id: 'desarrollo',
    name: 'Desarrollo de software a medida',
    description:
      'Sistemas de escritorio y web construidos para resolver un problema concreto de tu negocio, no una plantilla adaptada.',
    bullets: ['Del análisis al despliegue', 'Arquitectura por capas', 'Soporte y evolución continuos'],
  },
  {
    id: 'automatizacion',
    name: 'Automatización de procesos',
    description:
      'Procesos repetitivos que corren solos: integraciones entre sistemas, flujos y notificaciones.',
    bullets: ['Power Automate y n8n', 'Integración entre herramientas', 'Menos trabajo manual'],
  },
  {
    id: 'infra',
    name: 'Soporte técnico e infraestructura',
    description:
      'El software no vive solo: redes, equipos y resolución de incidencias en caliente.',
    bullets: ['Redes y Mikrotik', 'Soporte técnico', 'Diagnóstico bajo presión'],
  },
]

export const method: MethodStep[] = [
  {
    index: '01',
    title: 'Entender el dominio',
    text: 'Antes de escribir código, entiendo cómo trabaja quien va a usar el sistema. La amortización francesa o el flujo de un taller no se adivinan: se preguntan.',
  },
  {
    index: '02',
    title: 'Arquitectar por capas',
    text: 'Separo dominio, lógica, datos e interfaz para que el sistema sea mantenible y cambie sin romperse.',
  },
  {
    index: '03',
    title: 'Construir con criterio',
    text: 'Responsabilidades claras, control de versiones y pruebas. Cada pieza hace una cosa y se puede explicar.',
  },
  {
    index: '04',
    title: 'Mantener y evolucionar',
    text: 'El software vive. Doy soporte, corrijo y evoluciono los sistemas que construyo.',
  },
]

export const capabilities: CapabilityGroup[] = [
  {
    name: 'Backend y APIs',
    items: ['C#', 'ASP.NET Core', 'ASP.NET Web Forms', 'Node.js'],
    note: 'La base de todo lo que construyo.',
  },
  {
    name: 'Frontend',
    items: ['React + TypeScript', 'Tailwind', 'Blazor', 'HTML/CSS'],
    note: 'Interfaces web que un operador entiende.',
  },
  {
    name: 'Datos',
    items: ['SQL Server', 'PostgreSQL', 'MongoDB', 'EF Core', 'EF 6'],
    note: 'Modelado y persistencia.',
  },
  {
    name: 'Automatización',
    items: ['Power Automate', 'n8n'],
    note: 'Procesos que corren solos.',
  },
  {
    name: 'Infraestructura y soporte',
    items: ['Redes', 'Mikrotik', 'Windows', 'Soporte técnico'],
    note: 'Desplegar y mantener lo que se construye.',
  },
]
