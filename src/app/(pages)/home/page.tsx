'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-2xl font-bold">University Portal</Link>
          <ul className="flex space-x-6">
            <li><Link href="/register" className="hover:underline">Course Registration</Link></li>
            <li><Link href="/courses" className="hover:underline">Available Courses</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to the University Portal</h1>
            <p className="text-lg mb-6">A one-stop solution for students and faculty to manage course registrations and updates effortlessly.</p>
            <Link href="/register" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">What You Can Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "For Students",
                  description: "Register for courses, view schedules, and manage your academic journey with ease."
                },
                {
                  title: "For Faculty",
                  description: "Post new courses, update course materials, and manage student enrollments effectively."
                },
                {
                  title: "Streamlined Communication",
                  description: "Stay connected with updates, notifications, and streamlined communication channels."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded shadow">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} University Portal. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
              <Link key={social} href="#" className="hover:underline">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
} 