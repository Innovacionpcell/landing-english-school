// Copy de la landing. Datos de englishschool.com.co (14 años, 9 sedes, B2 + título técnico,
// 3 laboratorios, sin libros/tareas/contrato de permanencia). No se inventan cifras ni descuentos:
// cuando el cliente defina la promoción vigente, se escribe en `promo`.
import { SITE } from './site';

const medellin = SITE.sedes.filter((s) => s.zone === 'medellin').map((s) => s.name);

export const copy = {
  htmlLang: 'es-CO',
  ogLocale: 'es_CO',
  meta: {
    title: 'Academia de Inglés en Medellín | 9 Sedes | English School',
    description:
      'Aprende inglés sin libros, sin tareas y sin estrés. Programa de 2 años hasta B2 con Título Técnico oficial. 9 sedes en Medellín, Bello y Guarne (Oriente). Matricúlate y aprovecha los beneficios vigentes.',
    ogDescription:
      'Inglés sin libros, sin tareas y sin estrés. B2 + Título Técnico en 2 años, sin contrato de permanencia. 9 sedes en Medellín, Bello y Guarne. Cupos limitados: reserva el tuyo.',
  },
  // TODO: promoción vigente definida por el cliente (ej.: "Matrícula con X % de descuento hasta el 30 de octubre").
  // Mientras esté vacío se muestra el texto genérico de beneficios.
  promo: '',
  nav: {
    programs: 'Programas',
    why: 'Beneficios',
    method: 'Metodología',
    coverage: 'Sedes',
    faq: 'Preguntas',
    cta: 'Matricúlate',
    menu: 'Menú',
  },
  hero: {
    eyebrow: `Academia de inglés · ${SITE.yearsExperience}+ años en Medellín`,
    h1a: 'Academia de inglés en Medellín',
    h1b: 'sin libros, sin tareas, sin estrés.',
    sub: 'Llega a nivel B2 en 2 años con Título Técnico oficial, aprendiendo en laboratorios de música, cine y cocina. 9 sedes en Medellín, Bello y Guarne para todo el Oriente Antioqueño.',
    cta1: 'Quiero matricularme',
    cta2: 'Escríbenos por WhatsApp',
    badges: [`+${SITE.yearsExperience} años de experiencia`, 'Sin contrato de permanencia', 'Vigilados por la Secretaría de Educación'],
    cardTitle: 'Beneficios al matricularte',
    cardItems: ['Promociones de matrícula vigentes', 'Título Técnico oficial + nivel B2', 'Sin contrato de permanencia', 'Cupos limitados por sede'],
    cardCta: 'Reservar mi cupo',
  },
  why: {
    eyebrow: 'Por qué English School',
    title: 'Aprendes haciendo, no memorizando.',
    lead: 'Retienes el 10 % de lo que lees, pero el 90 % de lo que haces. Por eso aquí no hay libros ni tareas: hay práctica real desde la primera clase.',
    points: [
      { k: 'Sin libros ni tareas', v: 'Aprendizaje 100 % práctico en clase. Nada de cargar libros ni llevar trabajo para la casa.' },
      { k: 'B2 + Título Técnico', v: 'Programa de 2 años con título técnico oficial y opción de continuar a C1.' },
      { k: 'Sin contrato de permanencia', v: 'Libertad total: te quedas porque avanzas, no porque firmaste.' },
      { k: 'Respaldo oficial', v: 'Educación para el trabajo y el desarrollo humano, vigilada por la Secretaría de Educación.' },
    ],
  },
  programs: {
    eyebrow: 'Programas',
    title: 'Un programa de inglés para cada etapa.',
    lead: 'Clases grupales, dinámicas y colaborativas, o personalizadas a tu ritmo y horario. Todas con los 3 laboratorios prácticos.',
    cta: 'Quiero este programa',
  },
  method: {
    eyebrow: 'Metodología',
    title: '3 laboratorios para aprender inglés como se aprende un idioma: usándolo.',
    labs: [
      { icon: 'music', t: 'Music Lab', d: 'Mejoras tu escucha y pronunciación cantando y analizando canciones en inglés.' },
      { icon: 'film', t: 'Cinema Lab', d: 'Películas, series y dramatizaciones de situaciones reales para ganar fluidez.' },
      { icon: 'cook', t: 'Cooking Lab', d: 'Vocabulario práctico mientras cocinas: el idioma aplicado a la vida diaria.' },
    ],
  },
  coverage: {
    eyebrow: 'Sedes',
    title: '9 sedes en Medellín, Bello y el Oriente Antioqueño.',
    lead: 'Estudia cerca de tu casa o tu trabajo. Cupos limitados por sede.',
    medellinTitle: 'Medellín',
    belloTitle: 'Bello',
    orienteTitle: 'Oriente Antioqueño',
    orienteNote: 'Sede Guarne, a minutos de:',
    mapCta: 'Cómo llegar',
  },
  about: {
    eyebrow: 'La academia',
    title: `Más de ${SITE.yearsExperience} años enseñando inglés en Medellín.`,
    p1: `English School es una academia de inglés con ${SITE.sedes.length} sedes en Medellín, Bello y Guarne. ${SITE.accreditation}`,
    p2: 'Nuestro método elimina lo que hace que la gente abandone el inglés —los libros, las tareas y el estrés— y lo reemplaza por práctica real en laboratorios de música, cine y cocina, para niños, jóvenes y adultos.',
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Resolvemos tus dudas.',
    items: [
      { q: '¿Dónde quedan las sedes de English School?', a: `Tenemos ${SITE.sedes.length} sedes: en Medellín (${medellin.join(', ')}), en Bello (Cabañas, ${SITE.address.street}, ${SITE.address.neighborhood}) y en Guarne, que atiende a todo el Oriente Antioqueño.` },
      { q: '¿Cuánto dura el programa y qué nivel alcanzo?', a: 'El programa completo dura 2 años. Terminas con nivel B2 y Título Técnico oficial, con la opción de continuar hasta C1.' },
      { q: '¿Es cierto que no hay libros ni tareas?', a: 'Sí. El aprendizaje es 100 % práctico en clase, con laboratorios de música, cine y cocina. No necesitas comprar libros ni hacer tareas en casa.' },
      { q: '¿Tengo que firmar un contrato de permanencia?', a: 'No. En English School no hay contratos de permanencia.' },
      { q: '¿Tienen inglés para niños?', a: 'Sí. Los niños aprenden cantando, viendo películas y series para su edad y cocinando, sin la presión de los libros de texto y en un ambiente seguro y supervisado.' },
      { q: '¿Qué modalidades de clase hay?', a: 'Clases grupales, dinámicas y colaborativas, o clases personalizadas a tu ritmo y en tu horario.' },
      { q: '¿Qué horario tienen?', a: `Atendemos de ${SITE.hoursDisplay.charAt(0).toLowerCase() + SITE.hoursDisplay.slice(1)}. Los horarios de cada grupo dependen de la sede; te los compartimos al contactarte.` },
      { q: '¿El título tiene validez oficial?', a: `Sí. ${SITE.accreditation}` },
      { q: '¿Cómo me matriculo y qué promociones hay?', a: 'Déjanos tus datos en el formulario o escríbenos por WhatsApp. Te contamos las promociones de matrícula vigentes, los horarios y los cupos disponibles en tu sede.' },
    ],
  },
  contact: {
    eyebrow: 'Matrículas abiertas',
    title: 'Reserva tu cupo y aprovecha los beneficios de matrícula.',
    lead: 'Déjanos tus datos y un asesor te contacta con las promociones vigentes, horarios y cupos disponibles en la sede que prefieras.',
    steps: ['Dejas tus datos', 'Te contactamos por WhatsApp o llamada', 'Eliges sede y horario y te matriculas'],
    urgency: 'Cupos limitados por sede.',
    fields: {
      name: 'Nombre completo',
      phone: 'Celular / WhatsApp',
      email: 'Correo electrónico (opcional)',
      sede: 'Sede de tu interés',
      sedePh: 'Elige una sede',
      sedeAny: 'La más cercana / aún no sé',
      program: '¿Qué programa te interesa?',
      mode: 'Tipo de clase',
      message: '¿Algo que debamos saber? (opcional)',
      consent: 'Autorizo el tratamiento de mis datos según la',
      privacy: 'política de datos',
    },
    modes: ['Grupal', 'Personalizada', 'Aún no sé'],
    submit: 'Quiero matricularme',
    sending: 'Enviando…',
    error: 'No pudimos enviar tus datos. Intenta de nuevo o escríbenos por WhatsApp.',
    or: '¿Prefieres escribirnos?',
    napTitle: 'Sede Bello (Cabañas)',
  },
  thanks: {
    metaTitle: 'Datos recibidos | English School Medellín',
    title: '¡Listo! Recibimos tus datos.',
    lead: 'Un asesor te contactará muy pronto con las promociones de matrícula vigentes y los horarios de tu sede. Si quieres adelantar, escríbenos por WhatsApp.',
    back: 'Volver al inicio',
  },
  wa: 'Escríbenos por WhatsApp',
  footer: {
    tagline: `Academia de inglés en Medellín · ${SITE.slogan}. ${SITE.sedes.length} sedes en Medellín, Bello y Guarne.`,
    explore: 'Explorar',
    contact: 'Contacto',
    follow: 'Síguenos',
    rights: 'Todos los derechos reservados.',
    privacy: 'Política de datos',
    credit: 'Sitio desarrollado por',
  },
} as const;

export type Copy = typeof copy;
