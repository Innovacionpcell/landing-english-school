// Datos estructurados (JSON-LD) en un solo @graph con @id estables.
// EducationalOrganization + LocalBusiness (sede) + Course por programa + WebSite/WebPage + FAQPage.
import { SITE, socialLinks } from '../config/site';
import { copy } from '../config/copy';

export const ID = {
  org: `${SITE.url}/#organization`,
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
  ...SITE.areaServed.valleDeAburra.filter((m) => m !== 'Medellín').map((name) => ({ '@type': 'City', name, containedInPlace: { '@type': 'AdministrativeArea', name: 'Valle de Aburrá' } })),
  { '@type': 'AdministrativeArea', name: 'Valle de Aburrá', sameAs: wiki('Área metropolitana del Valle de Aburrá') },
  ...SITE.areaServed.oriente.map((name) => ({ '@type': 'City', name, containedInPlace: { '@type': 'AdministrativeArea', name: 'Oriente Antioqueño' } })),
  { '@type': 'AdministrativeArea', name: 'Oriente Antioqueño', sameAs: wiki('Oriente antioqueño') },
];

export function organizationGraph() {
  const sameAs = socialLinks.map((s) => s.url);
  const course = (p: (typeof SITE.programs)[number]) => ({
    '@type': 'Course',
    '@id': `${SITE.url}/#curso-${p.id}`,
    name: `${p.name} en Medellín`,
    description: p.description,
    url: `${SITE.url}/#programas`,
    inLanguage: 'en',
    educationalLevel: p.level,
    audience: { '@type': 'EducationalAudience', audienceType: p.audience },
    teaches: 'Inglés como lengua extranjera',
    provider: { '@id': ID.org },
    hasCourseInstance: p.modes.map((m) => ({
      '@type': 'CourseInstance',
      courseMode: m,
      ...(m === 'onsite'
        ? { location: { '@type': 'Place', name: SITE.gbpName, address: postalAddress } }
        : { location: { '@type': 'VirtualLocation', url: `${SITE.url}/` } }),
    })),
  });

  return [
    {
      // Una sola entidad: la academia ES el negocio local de la ficha (mismo NAP)
      '@type': ['EducationalOrganization', 'LocalBusiness'],
      '@id': ID.org,
      name: SITE.gbpName,
      alternateName: [SITE.name, 'English School'],
      description: copy.meta.description,
      url: `${SITE.url}/`,
      logo: { '@type': 'ImageObject', url: abs(SITE.logo), width: 512, height: 512 },
      image: [abs('/og-english-school.jpg'), abs(SITE.logo)],
      telephone: SITE.phone,
      ...(SITE.email ? { email: SITE.email } : {}),
      address: postalAddress,
      ...(SITE.geo ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } } : {}),
      hasMap: SITE.mapsUrl,
      openingHoursSpecification: SITE.openingHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      priceRange: '$$',
      currenciesAccepted: 'COP',
      areaServed,
      knowsLanguage: ['es', 'en'],
      knowsAbout: ['Enseñanza de inglés', 'Inglés para niños', 'Inglés para adultos', 'Inglés de negocios', 'Preparación de exámenes internacionales de inglés', 'MCER'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        contactType: 'admissions',
        areaServed: 'CO',
        availableLanguage: ['Spanish', 'English'],
      },
      ...(sameAs.length ? { sameAs } : {}),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Cursos de inglés',
        itemListElement: SITE.programs.map((p) => ({ '@type': 'Offer', itemOffered: { '@id': `${SITE.url}/#curso-${p.id}` } })),
      },
    },
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
