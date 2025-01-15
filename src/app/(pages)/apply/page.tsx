import React from 'react';
import type { Metadata } from "next";
import ApplyPage from "./components/ApplyPage";

export const metadata: Metadata = {
  title: "Apply | Orange Field University",
  description: "Begin your academic journey at Orange Field University. Apply now for undergraduate, graduate, and professional programs.",
  keywords: "university application, college admission, academic programs, Orange Field University application, higher education",
  openGraph: {
    title: "Apply to Orange Field University",
    description: "Take the first step towards your future at Orange Field University",
    type: "website",
    url: "/apply",
    siteName: "Orange Field University",
    images: [
      {
        url: "/images/campus-life.jpg",
        width: 1200,
        height: 630,
        alt: "Orange Field University Campus"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply to Orange Field University",
    description: "Begin your journey at Orange Field University",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/apply",
  }
};

export default function Page() {
  return (
    <main>
      <ApplyPage />
    </main>
  );
} 