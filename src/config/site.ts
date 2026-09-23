// Fuente única de verdad: NAP, redes y datos del negocio.
// Todo el schema, el footer y los botones leen de aquí.

export const SITE = {
  url: 'https://growthdigital.marketing',
  name: 'Growth Digital',
  legalName: 'Growth Digital – Agencia de Marketing Digital',
  gbpName: 'Agencia Marketing digital en Medellín | Growth Digital',
  founder: {
    name: 'Carlos Andrés Vergara Márquez',
    shortName: 'Andrés Vergara',
    jobTitle: 'Fundador y Consultor SEO',
    linkedin: 'https://www.linkedin.com/in/carlos-andres-vergara/',
    // Certificado profesional verificable (Coursera)
    certificate: {
      name: 'Certificado Profesional en Marketing Digital',
      nameEn: 'Professional Certificate in Digital Marketing',
      issuer: 'Coursera',
      url: 'https://www.coursera.org/account/accomplishments/professional-cert/7CHA8QB7ZY7C',
    },
  },
  // Portal de clientes (dashboard propio)
  portalUrl: 'https://portal.growthdigital.marketing/',
  // Blog generado por Soro IA (embed). Solo se carga en /blog/ para no afectar el rendimiento del home.
  soroEmbed: 'https://app.trysoro.com/api/embed/5e3ab6a0-2258-43e7-9d9b-68f697e78515',
  email: 'info@growthdigital.marketing',
  phone: '+573207328366',
  phoneDisplay: '320 732 8366',
  whatsapp: 'https://wa.me/573207328366?text=Hola%20Andr%C3%A9s%2C%20quiero%20un%20diagn%C3%B3stico%20para%20mi%20negocio',
  address: {
    street: 'Cra. 56A #61-24, Urbanización Turín',
    neighborhood: 'La Candelaria',
    city: 'Medellín',
    region: 'Antioquia',
    postalCode: '050012',
    country: 'CO',
  },
  // Coordenadas del pin de la ficha de Google
  geo: { lat: 6.2608031, lng: -75.5711375 },
  // Ficha de Google (CID estable) y enlace directo para dejar reseña
  mapsUrl: 'https://maps.google.com/?cid=13805772976608676732',
  mapsKgId: '/g/11m9zwzbqd',
  reviewUrl: 'https://g.page/r/CXyLckhg9Ze_EAE/review',
  // TODO: confirma el horario exacto de tu ficha
  openingHours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' }],
  areaServed: ['Medellín', 'Antioquia', 'Colombia', 'Estados Unidos', 'España', 'Suiza', 'Latinoamérica'],
  instagramHandle: 'growthdigital24',
  social: [
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/growthdigital24/' },
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/growthdigitalmarketingseo/' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/carlos-andres-vergara/' },
    { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@growthdigitalmarketing' },
    { id: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/573207328366' },
  ],
} as const;

export type SocialId = (typeof SITE.social)[number]['id'];
