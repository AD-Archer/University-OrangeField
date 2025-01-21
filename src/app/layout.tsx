import "@/app/styles/global.css";
import { GeistSans } from 'geist/font';
import { type Metadata } from "next";
import { AuthProvider } from '@/contexts/AuthContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    template: '%s | Orange Field University',
    default: 'Orange Field University',
  },
  description: 'Orange Field University - Empowering minds, shaping futures.',
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
