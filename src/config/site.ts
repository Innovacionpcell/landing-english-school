// Fuente única de verdad: NAP, sedes, programas, WhatsApp y cobertura.
// Schema JSON-LD, header, footer, formulario y botón flotante leen de aquí.
// Datos tomados de englishschool.com.co y de la ficha de Google (sept. 2026).
// ⚠ Los campos marcados con TODO faltan por confirmar con el cliente.

export const SITE = {
  url: 'https://englishschool.growthdigital.marketing',
  // false = <meta robots noindex> en todas las páginas. Cambiar a true cuando el cliente apruebe.
  indexable: false,

  name: 'English School Medellín',
  brand: 'English School',
  // Nombre EXACTO del Perfil de Negocio de Google de la sede con ficha (NAP)
  gbpName: 'English School - Sede Medellín',
  officialSite: 'https://www.englishschool.com.co/',
  legalName: 'English School', // TODO: razón social + NIT para la política de datos
  nit: '', // TODO
  slogan: 'Sin libros · Sin tareas · Sin estrés',
  yearsExperience: 14,
  accreditation: 'Educación para el trabajo y el desarrollo humano. Vigilados por la Secretaría de Educación.',
  email: 'info@englishschool.com.co',
  // Teléfono de la ficha de Google (sede Bello)
  phone: '+573016054350',
  phoneDisplay: '301 605 4350',
  // WhatsApp de ESTA landing (distinto al del sitio oficial → permite atribuir los leads de la landing)
  whatsappNumber: '573016054350',
  whatsappText: 'Hola, quiero información para matricularme y conocer las promociones vigentes',
  // Sede con Perfil de Negocio (NAP del schema LocalBusiness)
  address: {
    street: 'Cl. 27B #58',
    neighborhood: 'La Gran Avenida',
    city: 'Bello',
    region: 'Antioquia',
    postalCode: '', // TODO
    country: 'CO',
  },
  geo: null as { lat: number; lng: number } | null, // TODO: lat/lng exactas del pin de la ficha
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=ENGLISH+SCHOOL+-+Sede+Medellin+Bello', // TODO: enlace directo de la ficha
  // Horario del sitio oficial. TODO: la ficha de Google muestra cierre 5 p. m. → unificar con el cliente
  openingHours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '20:00' }],
  hoursDisplay: 'Lunes a viernes, 8:00 a. m. – 8:00 p. m.',
  logo: '/logo-english-school.png', // TODO: reemplazar el placeholder por el logo real (PNG cuadrado ≥ 512 px)

  // 9 sedes (sitio oficial). TODO: direcciones de cada sede para mostrarlas y enlazar a Maps.
  sedes: [
    { name: 'Pedregal', city: 'Medellín', zone: 'medellin' },
    { name: 'San Cristóbal', city: 'Medellín', zone: 'medellin' },
    { name: 'Aranjuez', city: 'Medellín', zone: 'medellin' },
    { name: 'Girardot', city: 'Medellín', zone: 'medellin' },
    { name: 'San Antonio de Prado', city: 'Medellín', zone: 'medellin' },
    { name: 'La Milagrosa', city: 'Medellín', zone: 'medellin' },
    { name: 'Robledo', city: 'Medellín', zone: 'medellin' },
    { name: 'Cabañas', city: 'Bello', zone: 'bello', address: 'Cl. 27B #58, La Gran Avenida' },
    { name: 'Guarne', city: 'Guarne', zone: 'oriente' },
  ],

  // Municipios del Oriente Antioqueño atendidos desde la sede Guarne
  oriente: ['Guarne', 'Rionegro', 'Marinilla', 'El Carmen de Viboral', 'La Ceja', 'El Retiro', 'El Santuario', 'San Vicente'],

  // Programas (sitio oficial). → sección Programas, formulario y un schema Course por cada uno.
  programs: [
    { id: 'ninos', name: 'Inglés para niños', audience: 'Niños', level: 'Básico a intermedio', icon: 'kids', duration: '', description: 'Aprenden inglés de forma natural y divertida: cantando, viendo películas y series para su edad y cocinando. Sin la presión de libros de texto y en un ambiente seguro y supervisado.' },
    { id: 'adultos', name: 'Inglés para jóvenes y adultos', audience: 'Jóvenes y adultos', level: 'Hasta B2 (opción C1)', icon: 'adult', duration: 'P2Y', description: 'Programa completo de 2 años hasta nivel B2 con Título Técnico oficial y opción de continuar a C1. 100 % práctico, sin libros ni tareas.' },
    { id: 'personalizado', name: 'Clases personalizadas', audience: 'Jóvenes y adultos', level: 'Según tu nivel', icon: 'users', duration: '', description: 'A tu ritmo y en tu horario, con los mismos laboratorios prácticos y la misma ruta hacia el B2 con título técnico.' },
  ],

  // Redes (se usan en footer y en schema sameAs). Vacío = no se muestra.
  social: [
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/englishschool4ever/' },
    { id: 'facebook', label: 'Facebook', url: '' }, // TODO
    { id: 'tiktok', label: 'TikTok', url: '' }, // TODO
  ],
} as const;

export const whatsappUrl = (text: string = SITE.whatsappText) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const socialLinks = SITE.social.filter((s) => s.url);
export const sedeLabel = (s: (typeof SITE.sedes)[number]) => (s.city === 'Medellín' || s.name === s.city ? s.name : `${s.name} (${s.city})`);
export type Program = (typeof SITE.programs)[number];
