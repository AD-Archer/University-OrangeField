import React from 'react';
import type { Metadata } from "next";
import SignUpPage from "./components/SignUpPage";

export const metadata: Metadata = {
  title: "Sign Up | Orange Field University",
  description: "Create your Orange Field University account. Join our academic community and start your educational journey.",
  keywords: "student registration, university account, academic signup, Orange Field University registration",
  openGraph: {
    title: "Sign Up | Orange Field University",
    description: "Join the Orange Field University community",
    type: "website",
    url: "/sign-up",
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
      <SignUpPage />
    </main>
  );
} 