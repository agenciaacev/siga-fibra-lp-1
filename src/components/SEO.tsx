import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

const DEFAULT_TITLE = 'Siga Fibra | Internet de Alta Velocidade em Fortaleza';
const DEFAULT_DESCRIPTION =
  'Siga Fibra: internet fibra óptica de alta velocidade para residências e empresas em Fortaleza. Planos com estabilidade, suporte local e instalação rápida.';
const DEFAULT_IMAGE = 'https://www.sigafibra.com.br/og-image.jpg';
const SITE_URL = 'https://www.sigafibra.com.br';

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
}: SEOProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TelecommunicationsBusiness',
    name: 'Siga Fibra',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    logo: `${SITE_URL}/logo.png`,
    telephone: ['+55-85-3198-9550', '+55-85-3198-9555'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R. Gonçalves Lêdo, 2846',
      addressLocality: 'Fortaleza',
      addressRegion: 'CE',
      postalCode: '60110-528',
      addressCountry: 'BR',
      areaServed: 'Joaquim Távora',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -3.7436,
      longitude: -38.5267,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+55-85-3198-9550',
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: 'Portuguese',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+55-85-3198-9555',
        contactType: 'sales',
        areaServed: 'BR',
        availableLanguage: 'Portuguese',
      },
    ],
    sameAs: [
      'https://www.instagram.com/sigafibraoficial',
      'https://www.facebook.com/sigafibra/',
      'https://www.linkedin.com/in/sigafibraoficial/',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  };

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Siga Fibra" />
      <meta
        name="keywords"
        content="internet fibra óptica, provedor de internet Fortaleza, Siga Fibra, internet banda larga, internet empresarial Fortaleza, wifi Fortaleza"
      />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Siga Fibra" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <meta name="geo.region" content="BR-CE" />
      <meta name="geo.placename" content="Fortaleza" />
      <meta name="geo.position" content="-3.7436;-38.5267" />
      <meta name="ICBM" content="-3.7436, -38.5267" />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}