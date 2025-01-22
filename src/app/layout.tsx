import "@/app/styles/global.css";
import { GeistSans } from 'geist/font';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    template: '%s | Orange Field University',
    default: 'Orange Field University',
  },
  description: 'A leading institution for higher education and academic excellence',
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Orange Field University',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <AuthProvider>
          <Header />
          <Toaster position="top-center" />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
