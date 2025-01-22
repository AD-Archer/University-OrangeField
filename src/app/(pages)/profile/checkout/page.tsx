import React from 'react';
import type { Metadata } from "next";
import CheckoutPage from "./components/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | Orange Field University",
  description: "Complete your course enrollment at Orange Field University.",
  keywords: "course enrollment, tuition payment, student registration, Orange Field University",
};

export default function Page() {
  return (
    <main>
      <CheckoutPage />
    </main>
  );
} 