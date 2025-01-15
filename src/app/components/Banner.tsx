'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/app/styles/global.css';

export default function Banner() {
  return (
    <div className="position-relative w-100" style={{ height: '500px' }}>
      <Image
        src="/images/Banner.jpg"
        alt="Orange Field College and University - Inspiring Growth, Transforming Lives"
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
      <div 
        className="position-absolute w-100 h-100" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      />
      <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center" style={{ zIndex: 1 }}>
        <div className="container text-center">
          <h1 className="display-3 fw-bold text-white mb-4">Orange Field College and University</h1>
          <p className="lead text-white mb-4">Inspiring Growth, Transforming Lives</p>
          <div className="d-flex justify-content-center gap-3">
            <Link href="/courses" className="btn btn-primary btn-lg">
              Explore Programs
            </Link>
            <Link href="/apply" className="btn btn-outline-light btn-lg">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 