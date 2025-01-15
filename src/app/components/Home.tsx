'use client';

import React from 'react';
import Banner from './Banner';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Banner />
      
      <main className="flex-grow-1">
        {/* Featured Programs Section */}
        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">Featured Programs</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title h5">Computer Science</h3>
                    <p className="card-text">Explore cutting-edge technology and software development.</p>
                    <Link href="/courses/computer-science" className="btn btn-outline-primary">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title h5">Business Administration</h3>
                    <p className="card-text">Develop leadership skills and business acumen.</p>
                    <Link href="/courses/business" className="btn btn-outline-primary">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title h5">Engineering</h3>
                    <p className="card-text">Build the future with innovative engineering solutions.</p>
                    <Link href="/courses/engineering" className="btn btn-outline-primary">Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-light py-5">
          <div className="container">
            <div className="row text-center g-4">
              <div className="col-md-3">
                <h2 className="display-4 fw-bold text-primary">5k+</h2>
                <p className="text-muted">Students Enrolled</p>
              </div>
              <div className="col-md-3">
                <h2 className="display-4 fw-bold text-primary">200+</h2>
                <p className="text-muted">Expert Faculty</p>
              </div>
              <div className="col-md-3">
                <h2 className="display-4 fw-bold text-primary">50+</h2>
                <p className="text-muted">Programs</p>
              </div>
              <div className="col-md-3">
                <h2 className="display-4 fw-bold text-primary">95%</h2>
                <p className="text-muted">Employment Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Why Choose Orange Field University</h2>
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="mb-3">
                    <i className="bi bi-trophy fs-1 text-primary"></i>
                  </div>
                  <h3 className="h5">Excellence in Education</h3>
                  <p className="text-muted">World-class faculty and innovative teaching methods.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="mb-3">
                    <i className="bi bi-graph-up fs-1 text-primary"></i>
                  </div>
                  <h3 className="h5">Career Support</h3>
                  <p className="text-muted">Comprehensive career guidance and placement services.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="mb-3">
                    <i className="bi bi-building fs-1 text-primary"></i>
                  </div>
                  <h3 className="h5">Modern Facilities</h3>
                  <p className="text-muted">State-of-the-art infrastructure and learning resources.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="mb-3">
                    <i className="bi bi-globe fs-1 text-primary"></i>
                  </div>
                  <h3 className="h5">Global Network</h3>
                  <p className="text-muted">International partnerships and exchange programs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-5">
          <div className="container text-center">
            <h2 className="mb-4">Ready to Start Your Journey?</h2>
            <p className="lead mb-4">Join our community of learners and innovators.</p>
            <div className="d-flex justify-content-center gap-3">
              <Link href="/courses" className="btn btn-light btn-lg">
                Explore Programs
              </Link>
              <Link href="/apply" className="btn btn-outline-light btn-lg">
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 