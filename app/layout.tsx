import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VolunteerHub',
  description: 'Modern Volunteer Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full bg-gray-50">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
