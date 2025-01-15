import React from 'react';
import type { Metadata } from "next";
import AboutPage from "./components/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Orange Field University",
  description: "Learn about Orange Field University's rich history, mission, values, and commitment to academic excellence. Discover our campus culture and community.",
  keywords: "university history, campus life, academic excellence, university mission, Orange Field University values, higher education institution",
  openGraph: {
    title: "About Orange Field University",
    description: "Discover our legacy of academic excellence and innovation",
    type: "website",
    url: "/about",
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
      <AboutPage />
    </main>
  );
}