import React from 'react';
import type { Metadata } from "next";
import SignInPage from "./components/SignInPage";

export const metadata: Metadata = {
  title: "Sign In | Orange Field University",
  description: "Access your Orange Field University student portal. Sign in to view your courses, grades, and campus resources.",
  keywords: "student login, university portal, academic login, Orange Field University",
  openGraph: {
    title: "Sign In | Orange Field University",
    description: "Access your Orange Field University student portal",
    type: "website",
    url: "/sign-in",
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
      <SignInPage />
    </main>
  );
} 