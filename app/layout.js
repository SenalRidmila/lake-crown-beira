import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://lakecrownbeira.com'),
  title: 'Lake Crown Beira | Luxury 2-Bedroom Lakeside Stay in Colombo, Sri Lanka',
  description:
    'Where comfort meets elegance. Experience peaceful stays by scenic Beira Lake in Colombo. Modern 2-bedroom serviced apartment with AC, fully equipped kitchen, free WiFi & Lotus Tower views.',
  keywords: [
    'Lake Crown Beira',
    'Colombo serviced apartments',
    'Beira lake accommodation',
    'Colombo holiday rental',
    'Boutique stay Sri Lanka',
    '2 bedroom apartment Colombo',
    'Gangaramaya temple hotel',
    'Lotus tower view accommodation',
    'Family apartment Colombo 02',
  ],
  authors: [{ name: 'Lake Crown Beira' }],
  creator: 'Lake Crown Beira',
  publisher: 'Lake Crown Beira',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Lake Crown Beira - Where Comfort Meets Elegance',
    description:
      'Experience serene luxury by the scenic Beira Lake in Colombo, Sri Lanka. Fully equipped 2-bedroom serviced home with Lotus Tower skyline views.',
    url: 'https://lakecrownbeira.com',
    siteName: 'Lake Crown Beira',
    images: [
      {
        url: '/images/hero-beira-lake.jpg',
        width: 1200,
        height: 675,
        alt: 'Lake Crown Beira - Lakeside Apartment overlooking Colombo Lotus Tower',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lake Crown Beira | Luxury Stay in Colombo, Sri Lanka',
    description:
      'Where comfort meets elegance. Serene 2-bedroom serviced apartment overlooking Beira Lake and Lotus Tower.',
    images: ['/images/hero-beira-lake.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://lakecrownbeira.com',
  },
};

export default function RootLayout({ children }) {
  // Schema.org structured data for LodgingBusiness / Apartment
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Lake Crown Beira',
    image: [
      'https://lakecrownbeira.com/images/hero-beira-lake.jpg',
      'https://lakecrownbeira.com/images/living-area.jpg',
      'https://lakecrownbeira.com/images/kitchen.jpg',
      'https://lakecrownbeira.com/images/bedroom1.jpg',
    ],
    description:
      'Serene and elegant 2-bedroom serviced apartment overlooking the beautiful Beira Lake in Colombo, Sri Lanka.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Beira Lake Road, Colombo 02',
      addressLocality: 'Colombo',
      addressRegion: 'Western Province',
      postalCode: '00200',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.91645,
      longitude: 79.85261,
    },
    url: 'https://lakecrownbeira.com',
    telephone: '+94766418199',
    priceRange: '$$',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4.9',
      bestRating: '5',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free High-Speed WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fully Equipped Kitchen', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Hot and Cold Water Shower', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Lake View Balcony', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Lotus Tower View', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Smart Flat Screen TV', value: true },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
