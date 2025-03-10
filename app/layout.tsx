import './styles/globals.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'aranyaadheu | Developer & Chess Enthusiast',
  description: 'Personal blog and portfolio of Aranya A Dheu, a madlad from Sylhet, Bangladesh who thrives for knowledge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-[#212737] text-zinc-900 dark:text-zinc-100 font-sans antialiased">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {children}
        </div>
      </body>
    </html>
  );
} 