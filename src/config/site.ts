// Fuente única de verdad: NAP, programas, WhatsApp y cobertura.
// Schema JSON-LD, header, footer, formulario y botón flotante leen de aquí.
// ⚠ Los campos marcados con TODO son placeholders: confirmar con el cliente antes de publicar.

export const SITE = {
  url: 'https://englishschool.growthdigital.marketing',
  // false = <meta robots noindex> en todas las páginas. Cambiar a true cuando el cliente apruebe.
  indexable: false,

  // Nombre visible de la marca
  name: 'English School Medellín',
  // Nombre EXACTO del Perfil de Negocio de Google (NAP: debe coincidir con la ficha)
  gbpName: 'English School - Sede Medellín',
  legalName: 'English School Medellín', // TODO: razón social + NIT para la política de datos
  nit: '', // TODO
  // Categoría de la ficha: "Centro educativo"
  email: '', // TODO: correo de contacto (se oculta mientras esté vacío)
  phone: '+573016054350',
  phoneDisplay: '301 605 4350',
  // Número de WhatsApp en formato internacional sin "+" (botón flotante, CTAs y respaldo del formulario)
  whatsappNumber: '573016054350', // TODO: confirmar que este número tiene WhatsApp
  whatsappText: 'Hola, quiero información sobre los cursos de inglés',
  address: {
    street: 'Cl. 27B #58', // Tal cual la ficha de Google
    neighborhood: 'La Gran Avenida',
    city: 'Bello',
    region: 'Antioquia',
    postalCode: '', // TODO
    country: 'CO',
  },
  // Coordenadas del pin de la ficha. TODO: copiar lat/lng exactas desde Google Maps (se omiten del schema si son null)
  geo: null as { lat: number; lng: number } | null,
  // TODO: enlace de la ficha (Maps > Compartir) → https://maps.app.goo.gl/... o https://maps.google.com/?cid=...
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=ENGLISH+SCHOOL+-+Sede+Medellin+Bello',
  // TODO: días exactos. La ficha muestra cierre a las 5 p. m.
  openingHours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' }],
  hoursDisplay: 'Lunes a viernes, 8:00 a. m. – 5:00 p. m.', // TODO
  logo: '/logo-english-school.png', // TODO: reemplazar el placeholder por el logo real (PNG cuadrado ≥ 512 px)

  // Cobertura (SEO local). La sede física está en Bello; el resto se atiende presencial por cercanía y/o virtual.
  areaServed: {
    main: 'Medellín',
    valleDeAburra: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'La Estrella', 'Caldas', 'Copacabana', 'Girardota', 'Barbosa'],
    oriente: ['Rionegro', 'Marinilla', 'El Carmen de Viboral', 'La Ceja', 'El Retiro', 'Guarne', 'El Santuario', 'La Unión'],
  },

  // Programas → sección "Programas", opciones del formulario y un schema Course por cada uno.
  // TODO: confirmar nombres, edades, duración y modalidad con el cliente.
  programs: [
    { id: 'ninos', name: 'Inglés para niños', audience: 'Niños de 6 a 12 años', level: 'A1–A2', modes: ['onsite'], icon: 'kids', description: 'Clases dinámicas con juego, canciones y proyectos para que los niños pierdan el miedo y hablen inglés desde la primera clase.' },
    { id: 'adolescentes', name: 'Inglés para adolescentes', audience: 'Jóvenes de 13 a 17 años', level: 'A1–B2', modes: ['onsite', 'online'], icon: 'teen', description: 'Refuerzo para el colegio y preparación para la vida universitaria, con conversación real y seguimiento de avance.' },
    { id: 'adultos', name: 'Inglés para adultos', audience: 'Adultos desde cero o con bases', level: 'A1–C1', modes: ['onsite', 'online'], icon: 'adult', description: 'Horarios flexibles para quienes trabajan o estudian. Enfoque conversacional para usar el inglés en viajes, trabajo y estudios.' },
    { id: 'empresas', name: 'Inglés para empresas', audience: 'Equipos y profesionales', level: 'A2–C1', modes: ['onsite', 'online'], icon: 'work', description: 'Planes a la medida para equipos: inglés de negocios, reuniones, correos y atención a clientes internacionales.' },
    { id: 'examenes', name: 'Preparación de exámenes internacionales', audience: 'Estudiantes y profesionales', level: 'B1–C1', modes: ['onsite', 'online'], icon: 'exam', description: 'Entrenamiento por habilidades y simulacros para exámenes de certificación, becas, visas y admisiones.' },
  ],

  // Redes. TODO: agregar URLs reales (se usan en footer y en schema sameAs). Vacío = no se muestra.
  social: [
    { id: 'instagram', label: 'Instagram', url: '' },
    { id: 'facebook', label: 'Facebook', url: '' },
    { id: 'tiktok', label: 'TikTok', url: '' },
  ],
} as const;

export const whatsappUrl = (text: string = SITE.whatsappText) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const socialLinks = SITE.social.filter((s) => s.url);
export type Program = (typeof SITE.programs)[number];
