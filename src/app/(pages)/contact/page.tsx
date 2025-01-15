import React from 'react';
import type { Metadata } from "next";
import ContactPage from "./components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Orange Field University",
  description: "Get in touch with Orange Field University. Contact our admissions, academic departments, or general inquiries team.",
  keywords: "university contact, admissions contact, campus information, student support, Orange Field University contact",
  openGraph: {
    title: "Contact Orange Field University",
    description: "Connect with our university community",
    type: "website",
    url: "/contact",
    siteName: "Orange Field University",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <main>
      <ContactPage />
    </main>
  );
}