import React from 'react';
import type { Metadata } from "next";
import SignInPage from "@/app/sign-in/components/sign-in";

export const metadata: Metadata = {
  title: "Sign In - Orange Field University",
  description: "Sign in to your Orange Field University account",
};

export default function Page() {
  return <SignInPage />;
} 