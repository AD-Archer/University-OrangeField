import React from 'react';
import type { Metadata } from "next";
import ProfilePage from "./components/ProfilePage";

export const metadata: Metadata = {
  title: "My Profile | Orange Field University",
  description: "View your academic profile, enrolled courses, and progress at Orange Field University.",
  keywords: "student profile, academic progress, course enrollment, Orange Field University",
};

export default function Page() {
  return (
    <main>
      <ProfilePage />
    </main>
  );
} 