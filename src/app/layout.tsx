import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "./shared-theme/ThemeContext";
import Script from 'next/script';
import 'src/app/styles/global.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
export const metadata: Metadata = {
  title: "Orange Field University",
  description: "A leading institution for higher education",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Header />
        <ThemeProvider>{children}</ThemeProvider>
        <Footer />
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
