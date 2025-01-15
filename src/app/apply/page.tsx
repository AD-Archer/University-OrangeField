import React from 'react';
import type { Metadata } from "next";
import ApplyPage from "./components/ApplyPage";

export const metadata: Metadata = {
  title: "Apply - Orange Field University",
  description: "Apply to Orange Field University and start your journey",
};

export default function Page() {
  return <ApplyPage />;
} 