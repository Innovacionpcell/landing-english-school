// Copy de la landing (solo ES). Sin cifras ni certificaciones inventadas:
// cuando el cliente entregue datos reales (años, estudiantes, avales), se agregan aquí.
import { SITE } from './site';

const zonas = SITE.areaServed;

export const copy = {
  htmlLang: 'es-CO',
  ogLocale: 'es_CO',
  meta: {
    title: 'Academia de Inglés en Medellín y Bello | English School',
    description:
      'Cursos de inglés para niños, adolescentes, adultos y empresas en Medellín y Bello. Clases presenciales y virtuales para el Valle de Aburrá y el Oriente Antioqueño. Agenda tu prueba de nivel gratis.',
    ogDescription:
      'Aprende a hablar inglés con clases presenciales en Bello o virtuales desde cualquier municipio del Valle de Aburrá y el Oriente. Prueba de nivel gratis.',
  },
  nav: {
    programs: 'Programas',
    why: 'Por qué nosotros',
    method: 'Metodología',
    coverage: 'Sede y cobertura',
    faq: 'Preguntas',
    cta: 'Prueba de nivel gratis',
    menu: 'Menú',
  },
  hero: {
    eyebrow: 'Academia de inglés · Medellín y Bello',
    h1a: 'Academia de inglés en Medellín',
    h1b: 'para hablar con confianza.',
    sub: 'Cursos para niños, adolescentes, adultos y empresas, en grupos reducidos. Clases presenciales en nuestra sede de Bello y virtuales para todo el Valle de Aburrá y el Oriente Antioqueño.',
    cta1: 'Agenda tu prueba de nivel',
    cta2: 'Escríbenos por WhatsApp',
    badges: ['Presencial y virtual', 'Grupos reducidos', 'Niveles A1 a C1 (MCER)'],
    cardTitle: 'Empieza en 3 pasos',
    cardSteps: ['Prueba de nivel gratis', 'Eliges programa y horario', 'Primera clase en tu nivel'],
  },
  why: {
    eyebrow: 'Por qué English School',
    title: 'Aprendes inglés para usarlo, no solo para aprobar.',
    lead: 'Cada estudiante empieza en su nivel real y avanza con un plan claro. Menos teoría suelta, más práctica guiada en situaciones de la vida real.',
    points: [
      { k: 'Enfoque conversacional', v: 'Hablas desde la primera clase: pronunciación, escucha y fluidez con práctica constante.' },
      { k: 'Grupos reducidos', v: 'Más tiempo para participar y un profesor que conoce tu avance y tus dificultades.' },
      { k: 'Niveles del MCER', v: 'Ruta de A1 a C1 alineada al Marco Común Europeo para que sepas siempre dónde estás.' },
      { k: 'Presencial o virtual', v: 'Estudia en la sede de Bello o desde casa, en Medellín, el Valle de Aburrá o el Oriente.' },
    ],
  },
  programs: {
    eyebrow: 'Programas',
    title: 'Un curso de inglés para cada etapa.',
    lead: 'Todos los programas empiezan con una prueba de nivel gratuita para ubicarte en el grupo correcto.',
    modes: { onsite: 'Presencial', online: 'Virtual' },
    cta: 'Quiero este programa',
  },
  method: {
    eyebrow: 'Metodología',
    title: 'Así avanzas nivel a nivel.',
    steps: [
      { t: 'Prueba de nivel', d: 'Evaluamos gramática, escucha y conversación para ubicarte en tu nivel real.' },
      { t: 'Plan y horario', d: 'Eliges programa, modalidad y horario según tu objetivo y disponibilidad.' },
      { t: 'Clases y práctica', d: 'Clases activas con conversación, material propio y práctica entre sesiones.' },
      { t: 'Evaluación y avance', d: 'Seguimiento por nivel y evaluación al cierre de cada etapa para subir de nivel.' },
    ],
  },
  about: {
    eyebrow: 'La academia',
    title: 'English School Medellín',
    p1: 'Somos una academia de inglés con sede en Bello, en el norte del Valle de Aburrá, a pocos minutos de Medellín. Acompañamos a niños, jóvenes, adultos y empresas a comunicarse en inglés con seguridad.',
    p2: 'Combinamos clases presenciales y virtuales para que la distancia no sea un obstáculo: estudiantes de Medellín, el Valle de Aburrá y el Oriente Antioqueño aprenden con el mismo método y el mismo seguimiento.',
  },
  coverage: {
    eyebrow: 'Sede y cobertura',
    title: 'Clases de inglés en Bello, Medellín y el Oriente Antioqueño.',
    lead: 'Sede presencial en Bello y clases virtuales en vivo para estudiantes de todo Antioquia.',
    sedeTitle: 'Sede Bello',
    valleTitle: 'Valle de Aburrá',
    orienteTitle: 'Oriente Antioqueño',
    valleNote: 'Presencial en la sede de Bello o virtual.',
    orienteNote: 'Clases virtuales en vivo con el mismo método.',
    mapCta: 'Cómo llegar en Google Maps',
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Resolvemos tus dudas.',
    items: [
      { q: '¿Dónde queda English School Medellín?', a: `Nuestra sede está en ${SITE.address.street}, ${SITE.address.neighborhood}, ${SITE.address.city}, Antioquia. Atendemos estudiantes de Medellín y todo el Valle de Aburrá, y del Oriente Antioqueño en modalidad virtual.` },
      { q: '¿La prueba de nivel tiene costo?', a: 'No. La prueba de nivel es gratuita y sin compromiso. Nos permite ubicarte en el grupo y el programa correctos desde el primer día.' },
      { q: '¿Tienen clases de inglés virtuales?', a: `Sí. Los programas para adolescentes, adultos, empresas y preparación de exámenes también se dictan en vivo de forma virtual, ideal si vives en ${zonas.oriente.slice(0, 3).join(', ')} u otro municipio del Oriente Antioqueño.` },
      { q: '¿Desde qué edad pueden estudiar los niños?', a: 'Recibimos niños desde los 6 años en grupos por edad y nivel, con metodología lúdica y seguimiento a los padres.' },
      { q: '¿Qué niveles de inglés manejan?', a: 'Trabajamos con los niveles del Marco Común Europeo de Referencia (MCER), desde A1 (principiante) hasta C1 (avanzado).' },
      { q: '¿Cuánto tiempo toma aprender inglés?', a: 'Depende de tu nivel inicial, la intensidad del programa y la práctica fuera de clase. En la prueba de nivel te damos un estimado según tu objetivo.' },
      { q: '¿Qué horarios tienen?', a: `Nuestra sede atiende ${SITE.hoursDisplay.charAt(0).toLowerCase() + SITE.hoursDisplay.slice(1)}. Los horarios de cada grupo se confirman al agendar tu prueba de nivel.` },
      { q: '¿Ofrecen cursos de inglés para empresas?', a: 'Sí. Diseñamos planes para equipos, presenciales o virtuales, enfocados en inglés de negocios, reuniones y atención a clientes internacionales.' },
    ],
  },
  contact: {
    eyebrow: 'Prueba de nivel gratis',
    title: 'Agenda tu prueba de nivel.',
    lead: 'Déjanos tus datos y te contactamos para agendar la prueba y contarte horarios y valores del programa que te interesa.',
    steps: ['Envías el formulario', 'Te contactamos por WhatsApp o llamada', 'Presentas tu prueba de nivel gratis'],
    napTitle: 'Sede Bello',
    fields: {
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Celular / WhatsApp',
      location: 'Municipio donde vives',
      locationPh: 'Ej.: Medellín, Bello, Rionegro',
      program: '¿Qué programa te interesa?',
      mode: 'Modalidad preferida',
      message: '¿Algo que debamos saber? (opcional)',
      consent: 'Autorizo el tratamiento de mis datos según la',
      privacy: 'política de datos',
    },
    modes: ['Presencial', 'Virtual', 'No estoy seguro'],
    generalOption: 'Aún no sé / otra consulta',
    submit: 'Quiero mi prueba de nivel',
    sending: 'Enviando…',
    error: 'No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.',
    or: '¿Prefieres escribirnos?',
  },
  thanks: {
    metaTitle: 'Solicitud recibida | English School Medellín',
    title: '¡Recibimos tu solicitud!',
    lead: 'Te contactaremos muy pronto para agendar tu prueba de nivel. Si quieres adelantar, escríbenos por WhatsApp.',
    back: 'Volver al inicio',
  },
  wa: 'Escríbenos por WhatsApp',
  footer: {
    tagline: 'Academia de inglés en Medellín y Bello. Clases presenciales y virtuales para el Valle de Aburrá y el Oriente Antioqueño.',
    explore: 'Explorar',
    contact: 'Contacto',
    follow: 'Síguenos',
    rights: 'Todos los derechos reservados.',
    privacy: 'Política de datos',
    credit: 'Sitio desarrollado por',
  },
} as const;

export type Copy = typeof copy;
