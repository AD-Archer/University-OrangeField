import React from 'react';
import type { Metadata } from "next";
import SignUpPage from "@/app/sign-up/components/sign-up";

export const metadata: Metadata = {
  title: "Sign In - Orange Field University",
  description: "Sign in to your Orange Field University account",
};

export default function Page() {
  return <SignUpPage />;
} 