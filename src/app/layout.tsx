import "@/app/styles/global.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { AuthProvider } from '@/contexts/AuthContext';
import Header from "./components/Header";
import Script from 'next/script';
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from './components/BootstrapClient';

export const metadata: Metadata = {
  title: "Orange Field University",
  description: "A leading institution for higher education",
  icons: {
    icon: '/images/Logo.svg',
    apple: '/images/Logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://orangefielduniversity.edu',
    siteName: 'Orange Field University',
    title: 'Orange Field University',
    description: 'Orange Field University - Excellence in Education',
    images: [
      {
        url: '/images/Logo.svg',
        width: 1200,
        height: 630,
        alt: 'Orange Field University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orange Field University',
    description: 'Orange Field University - Excellence in Education',
    images: ['/images/Logo.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/Logo.svg" />
        <link rel="apple-touch-icon" href="/images/Logo.svg" />
      </head>
      <body className={GeistSans.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />
        <BootstrapClient />
      </body>
    </html>
  );
}
