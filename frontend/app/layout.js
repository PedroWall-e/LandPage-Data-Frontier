import './globals.css';

export const metadata = {
  title: 'Data Frontier | Tecnologia única como você',
  description:
    'Projetos tecnológicos completos de ponta a ponta. Especialistas em IoT Satelital, Resinas e Filamentos 3D, STL Prime, Usinagem, Caldeiraria, Robótica e Educação (Academy).',
  metadataBase: new URL('https://www.datafrontier.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Data Frontier | Tecnologia única como você',
    description:
      'Conheça as nossas soluções: IoT Satelital, Impressão 3D, Usinagem, Robótica e muito mais.',
    url: 'https://www.datafrontier.com.br',
    siteName: 'Data Frontier',
    images: [
      {
        url: '/imagem-de-capa.jpg',
        width: 1200,
        height: 630,
        alt: 'Data Frontier — Tecnologia única como você',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Frontier | Tecnologia única como você',
    description: 'IoT Satelital, Impressão 3D, Usinagem, Robótica e Educação.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Dados estruturados JSON-LD para Google Rich Results
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Data Frontier',
  url: 'https://www.datafrontier.com.br',
  logo: 'https://www.datafrontier.com.br/favicon.png',
  description:
    'Projetos tecnológicos completos de ponta a ponta. Especialistas em IoT Satelital, Resinas e Filamentos 3D, STL Prime, Usinagem, Caldeiraria, Robótica e Educação.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua da Bahia, 504 - Sala 301',
    addressLocality: 'Belo Horizonte',
    addressRegion: 'MG',
    postalCode: '30160-015',
    addressCountry: 'BR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-31-97528-0637',
    contactType: 'customer service',
    areaServed: 'BR',
    availableLanguage: 'Portuguese',
  },
  sameAs: [
    'https://www.instagram.com/datafrontier_',
    'https://www.linkedin.com/company/data-frontier-br',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Soluções Tecnológicas Data Frontier',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data Frontier Academy', url: 'https://frontierclass.com.br' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IoT Satelital', url: 'https://iotdata.com.br' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'STL Prime — Modelos 3D', url: 'https://stlprime.com.br' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Resinas e Filamentos 3D', url: 'https://datafrontier3d.com.br' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Usinagem e Caldeiraria', url: 'https://datafr.com.br' } },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HHTGEKFEDL"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HHTGEKFEDL');
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
