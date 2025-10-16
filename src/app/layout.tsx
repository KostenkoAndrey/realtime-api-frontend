import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/app/providers';
import { LayoutProps } from '@/types/layout';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
