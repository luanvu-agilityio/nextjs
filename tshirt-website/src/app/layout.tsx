import type { Metadata } from 'next';

// Fonts
import { Roboto, Mada, Poppins } from 'next/font/google';

// CSS
import './globals.css';

// Components
import ClientLayout from '@/components/layout/ClientLayout';

const roboto = Roboto({
  variable: '--font-tertiary',
  subsets: ['latin'],
  weight: ['700'],
});

const mada = Mada({
  variable: '--font-secondary',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const poppins = Poppins({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'T-Shirt Website - Premium Quality Apparel',
    template: '%s | T-Shirt Website',
  },
  description:
    'Discover our premium collection of high-quality t-shirts. Shop the latest designs, styles, and colors for men, women, and kids.',
  keywords: [
    't-shirts',
    'apparel',
    'clothing',
    'fashion',
    'premium',
    'quality',
  ],
  authors: [{ name: 'T-Shirt Website Team' }],
  creator: 'T-Shirt Website',
  publisher: 'T-Shirt Website',
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
  category: 'ecommerce',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${roboto.variable} ${mada.variable} ${poppins.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
