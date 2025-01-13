import { ReactNode } from 'react';
import './globals.css';
import { ThemeProvider } from './shared-theme';
import Header from './components/Header';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Orange Field',
  description: 'Your site description',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 