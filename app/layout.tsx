import type { Metadata } from 'next';
import { kronaOne, libreBodoni, libreBodoniBoldItalic } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Explorer | Iceland Tour Booking',
  description:
    'Small-group outdoor adventures in Iceland: hiking, sightseeing and outdoor sports tours.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${kronaOne.variable} ${libreBodoni.variable} ${libreBodoniBoldItalic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
