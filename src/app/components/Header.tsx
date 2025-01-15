'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link href="/" className="navbar-brand text-white">
          Orange Field University
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/courses" className="nav-link text-white">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link text-white">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link text-white">
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link href="/sign-in" className="btn btn-outline-light">
              Sign In
            </Link>
            <Link href="/sign-up" className="btn btn-light">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}