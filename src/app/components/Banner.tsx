'use client';

import React from 'react';
import Image from 'next/image';
import '@/app/styles/global.css';
export default function Banner() {
  return (
    <div className="position-relative w-100" style={{ height: '300px' }}>
      <Image
        src="/images/Banner.jpg"
        alt="Orange Field College and University - Inspiring Growth, Transforming Lives"
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
      <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
        <h1 className="display-4 fw-bold">Orange Field College and University</h1>
        <p className="lead">Inspiring Growth, Transforming Lives</p>
      </div>
    </div>
  );
} 