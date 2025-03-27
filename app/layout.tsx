import './styles/globals.css';
import './styles/prism-custom.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'aranyaadheu',
  description: "madlad in solitude",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon/apple-icon-180x180.png',
  },
  openGraph: {
    title: 'aranyaadheu',
    description: 'madlad in solitude.',
    url: 'https://aranyaadheu.github.io',
  },
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'theme-color': '#ffffff',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-[#212737] text-zinc-900 dark:text-zinc-100 font-sans antialiased">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
