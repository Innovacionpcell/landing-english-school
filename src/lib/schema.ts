// Datos estructurados (JSON-LD) en un solo @graph con @id estables.
// Marca (EducationalOrganization) → sede con ficha (LocalBusiness) + 9 sedes (Place) + Course por programa + WebSite/WebPage + FAQPage.
import { SITE, socialLinks } from '../config/site';
import { copy } from '../config/copy';

export const ID = {
  org: `${SITE.url}/#organization`,
  biz: `${SITE.url}/#sede-bello-gbp`,
  site: `${SITE.url}/#website`,
};

const abs = (p: string) => new URL(p, SITE.url).href;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  ...(SITE.address.postalCode ? { postalCode: SITE.address.postalCode } : {}),
  addressCountry: SITE.address.country,
};

const wiki = (name: string) => `https://es.wikipedia.org/wiki/${encodeURIComponent(name.replace(/ /g, '_'))}`;

const areaServed = [
  { '@type': 'City', name: 'Medellín', sameAs: wiki('Medellín') },
  { '@type': 'City', name: 'Bello', sameAs: wiki('Bello (Antioquia)') },
  { '@type': 'AdministrativeArea', name: 'Valle de Aburrá', sameAs: wiki('Área metropolitana del Valle de Aburrá') },
  ...SITE.oriente.map((name) => ({ '@type': 'City', name, containedInPlace: { '@type': 'AdministrativeArea', name: 'Oriente Antioqueño' } })),
  { '@type': 'AdministrativeArea', name: 'Oriente Antioqueño', sameAs: wiki('Oriente antioqueño') },
];

const sedeId = (name: string) => `${SITE.url}/#sede-${name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`;

// Sedes sin dirección publicada: Place con barrio + municipio (sin inventar calles)
const sedePlaces = SITE.sedes.map((sd) => ({
  '@type': 'Place',
  '@id': sedeId(sd.name),
  name: `${SITE.brand} – Sede ${sd.name}`,
  address: {
    '@type': 'PostalAddress',
    ...('address' in sd ? { streetAddress: SITE.address.street } : {}),
    addressLocality: sd.city,
    addressRegion: 'Antioquia',
    addressCountry: 'CO',
  },
}));

export function organizationGraph() {
  const sameAs = [SITE.officialSite, ...socialLinks.map((s) => s.url)];
  const course = (p: (typeof SITE.programs)[number]) => ({
    '@type': 'Course',
    '@id': `${SITE.url}/#curso-${p.id}`,
    name: `${p.name} en Medellín`,
    description: p.description,
    url: `${SITE.url}/#programa-${p.id}`,
    inLanguage: 'en',
    educationalLevel: p.level,
    ...(p.id === 'adultos' ? { educationalCredentialAwarded: 'Título Técnico en inglés (nivel B2)' } : {}),
    ...(p.duration ? { timeRequired: p.duration } : {}),
    audience: { '@type': 'EducationalAudience', audienceType: p.audience },
    teaches: 'Inglés como lengua extranjera',
    provider: { '@id': ID.org },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: SITE.sedes.map((sd) => ({ '@id': sedeId(sd.name) })),
    },
  });

  return [
    {
      // Marca: academia con 9 sedes
      '@type': 'EducationalOrganization',
      '@id': ID.org,
      name: SITE.brand,
      alternateName: [SITE.name, 'English School Colombia'],
      slogan: SITE.slogan,
      description: copy.meta.description,
      url: `${SITE.url}/`,
      logo: { '@type': 'ImageObject', url: abs(SITE.logo), width: 512, height: 512 },
      image: abs('/og-english-school.jpg'),
      email: SITE.email,
      telephone: SITE.phone,
      areaServed,
      knowsLanguage: ['es', 'en'],
      knowsAbout: ['Enseñanza de inglés', 'Inglés para niños', 'Inglés para adultos', 'Título técnico en inglés', 'Nivel B2'],
      location: sedePlaces.map((pl) => ({ '@id': pl['@id'] })),
      subOrganization: { '@id': ID.biz },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        email: SITE.email,
        contactType: 'admissions',
        areaServed: 'CO',
        availableLanguage: ['Spanish', 'English'],
      },
      sameAs,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Cursos de inglés',
        itemListElement: SITE.programs.map((p) => ({ '@type': 'Offer', itemOffered: { '@id': `${SITE.url}/#curso-${p.id}` } })),
      },
    },
    {
      // Sede con Perfil de Negocio de Google: NAP idéntico a la ficha
      '@type': ['EducationalOrganization', 'LocalBusiness'],
      '@id': ID.biz,
      name: SITE.gbpName,
      parentOrganization: { '@id': ID.org },
      url: `${SITE.url}/`,
      image: [abs('/og-english-school.jpg'), abs(SITE.logo)],
      logo: abs(SITE.logo),
      telephone: SITE.phone,
      email: SITE.email,
      address: postalAddress,
      ...(SITE.geo ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } } : {}),
      hasMap: SITE.mapsUrl,
      openingHoursSpecification: SITE.openingHours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
      priceRange: '$$',
      currenciesAccepted: 'COP',
      areaServed,
    },
    ...sedePlaces,
    ...SITE.programs.map(course),
    {
      '@type': 'WebSite',
      '@id': ID.site,
      url: `${SITE.url}/`,
      name: SITE.name,
      publisher: { '@id': ID.org },
      inLanguage: 'es-CO',
    },
  ];
}

export function webPage(url: string, title: string, description: string) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': ID.site },
    about: { '@id': ID.org },
    inLanguage: 'es-CO',
    primaryImageOfPage: abs('/og-english-school.jpg'),
  };
}

export function faqPage(url: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: copy.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes.flat() });
