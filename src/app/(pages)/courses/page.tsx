import React from 'react';
import type { Metadata } from "next";
import CoursesPage from "./components/CoursesPage";

export const metadata: Metadata = {
  title: "Academic Programs | Orange Field University",
  description: "Explore our diverse range of undergraduate and graduate programs. Find your path at Orange Field University with programs in Computer Science, Business, Engineering, and more.",
  keywords: "university courses, academic programs, degree programs, higher education, Orange Field University programs, undergraduate degrees, graduate programs",
  openGraph: {
    title: "Academic Programs | Orange Field University",
    description: "Discover your future at Orange Field University",
    type: "website",
    url: "/courses",
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
      <CoursesPage />
    </main>
  );
}