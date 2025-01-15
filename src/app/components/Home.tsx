'use client';

import React from 'react';
import Banner from './Banner';

export default function HomePage() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Banner />
      <main className="flex-grow-1">
        <section className="bg-light py-5">
          <div className="container text-center">
            <h1 className="display-4 mb-4">Welcome to Orange Field University</h1>
            <p className="lead mb-4">Empowering minds, shaping futures</p>
            <a href="/courses" className="btn btn-primary btn-lg">
              Explore Courses
            </a>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">Why Choose Us</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title h5">Excellence in Education</h3>
                    <p className="card-text">World-class faculty and innovative teaching methods.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title h5">Career Support</h3>
                    <p className="card-text">Comprehensive career guidance and placement services.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title h5">Modern Facilities</h3>
                    <p className="card-text">State-of-the-art infrastructure and learning resources.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 