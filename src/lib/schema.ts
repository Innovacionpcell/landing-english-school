// Datos estructurados (JSON-LD) conectados en un solo @graph con @id estables.
import { SITE } from '../config/site';
import type { Lang } from '../i18n/copy';
import { t } from '../i18n/copy';

const ID = {
  org: `${SITE.url}/#organization`,
  biz: `${SITE.url}/#localbusiness`,
  person: `${SITE.url}/#andres-vergara`,
  site: `${SITE.url}/#website`,
};

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

export function person() {
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: SITE.founder.name,
    alternateName: SITE.founder.shortName,
    jobTitle: SITE.founder.jobTitle,
    url: `${SITE.url}/#sobre-mi`,
    image: `${SITE.url}/og-growth-digital.jpg`,
    worksFor: { '@id': ID.org },
    knowsAbout: ['SEO local', 'SEO internacional', 'Google Ads', 'Meta Ads', 'Automatización con IA', 'n8n', 'Desarrollo web', 'CRM'],
    hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Professional Certificate', name: SITE.founder.certificate.name, url: SITE.founder.certificate.url, recognizedBy: { '@type': 'Organization', name: SITE.founder.certificate.issuer } },
    address: { '@type': 'PostalAddress', addressLocality: 'Medellín', addressCountry: 'CO' },
    sameAs: [SITE.founder.linkedin],
  };
}

export function organizationGraph(lang: Lang) {
  const c = t(lang);
  const sameAs = SITE.social.filter((s) => s.id !== 'whatsapp').map((s) => s.url);
  return [
    {
      '@type': 'Organization',
      '@id': ID.org,
      name: SITE.name,
      legalName: SITE.legalName,
      url: `${SITE.url}/`,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo-growth-digital.png`, width: 600, height: 634 },
      image: `${SITE.url}/og-growth-digital.jpg`,
      email: SITE.email,
      telephone: SITE.phone,
      address: postalAddress,
      founder: { '@id': ID.person },
      sameAs,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        email: SITE.email,
        contactType: 'sales',
        areaServed: ['CO', 'US', 'ES', 'CH', 'MX'],
        availableLanguage: ['Spanish', 'English'],
      },
    },
    {
      // Tipo más específico disponible en schema.org para agencias de marketing
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': ID.biz,
      name: SITE.gbpName,
      alternateName: SITE.name,
      description: c.meta.description,
      url: `${SITE.url}/`,
      parentOrganization: { '@id': ID.org },
      founder: { '@id': ID.person },
      image: [`${SITE.url}/og-growth-digital.jpg`, `${SITE.url}/logo-growth-digital.png`],
      logo: `${SITE.url}/logo-growth-digital.png`,
      telephone: SITE.phone,
      email: SITE.email,
      priceRange: '$$',
      currenciesAccepted: 'COP, USD',
      paymentAccepted: 'Transferencia bancaria, Tarjeta de crédito',
      address: postalAddress,
      geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
      hasMap: SITE.mapsUrl,
      openingHoursSpecification: SITE.openingHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      areaServed: [
        { '@type': 'City', name: 'Medellín', sameAs: 'https://es.wikipedia.org/wiki/Medell%C3%ADn' },
        { '@type': 'AdministrativeArea', name: 'Antioquia' },
        { '@type': 'Country', name: 'Colombia' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Spain' },
        { '@type': 'Country', name: 'Switzerland' },
      ],
      knowsLanguage: ['es', 'en'],
      sameAs,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: lang === 'es' ? 'Soluciones de marketing digital' : 'Digital marketing solutions',
        itemListElement: c.solutions.items.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.t, description: s.d, provider: { '@id': ID.biz }, areaServed: ['Medellín', 'Colombia', 'United States', 'Spain', 'Switzerland'] },
        })),
      },
    },
    person(),
    {
      '@type': 'WebSite',
      '@id': ID.site,
      url: `${SITE.url}/`,
      name: SITE.name,
      publisher: { '@id': ID.org },
      inLanguage: ['es-CO', 'en-US'],
    },
  ];
}

export function webPage(url: string, title: string, description: string, lang: Lang) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': ID.site },
    about: { '@id': ID.biz },
    inLanguage: t(lang).htmlLang,
    primaryImageOfPage: `${SITE.url}/og-growth-digital.jpg`,
  };
}

export function faqPage(lang: Lang, url: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: t(lang).faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function blogPosting(p: { url: string; title: string; description: string; image: string; pub: Date; upd?: Date; lang: Lang; tags: string[] }) {
  return {
    '@type': 'BlogPosting',
    '@id': `${p.url}#article`,
    mainEntityOfPage: p.url,
    headline: p.title,
    description: p.description,
    image: p.image,
    datePublished: p.pub.toISOString(),
    dateModified: (p.upd ?? p.pub).toISOString(),
    inLanguage: t(p.lang).htmlLang,
    keywords: p.tags.join(', '),
    author: { '@id': ID.person },
    publisher: { '@id': ID.org },
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes.flat() });
