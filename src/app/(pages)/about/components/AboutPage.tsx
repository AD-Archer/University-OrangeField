'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ActiveNavLink from '@/app/components/ActiveNavLink';

export default function AboutPage() {
  return (
    <div className="container py-5">
      <ActiveNavLink />
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-4 mb-4">About Orange Field University</h1>
        <p className="lead mb-4">Inspiring Growth, Transforming Lives Since 1965</p>
      </section>

      {/* Mission & Vision */}
      <section className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title h3 text-primary mb-3">Our Mission</h2>
              <p className="card-text">
                To provide exceptional education that empowers students to become innovative leaders
                and responsible global citizens through academic excellence, research, and community engagement.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title h3 text-primary mb-3">Our Vision</h2>
              <p className="card-text">
                To be a leading institution of higher education, recognized globally for academic
                excellence, innovative research, and positive impact on society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-5 bg-light rounded mb-5">
        <div className="row text-center g-4">
          <div className="col-md-3">
            <h3 className="display-4 fw-bold text-primary">5k+</h3>
            <p className="text-muted">Students</p>
          </div>
          <div className="col-md-3">
            <h3 className="display-4 fw-bold text-primary">200+</h3>
            <p className="text-muted">Faculty Members</p>
          </div>
          <div className="col-md-3">
            <h3 className="display-4 fw-bold text-primary">50+</h3>
            <p className="text-muted">Programs</p>
          </div>
          <div className="col-md-3">
            <h3 className="display-4 fw-bold text-primary">95%</h3>
            <p className="text-muted">Employment Rate</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-5">
        <h2 className="h2 text-center mb-4">Our Core Values</h2>
        <div className="row g-4">
          {[
            {
              title: "Excellence",
              description: "Striving for the highest standards in education and research"
            },
            {
              title: "Innovation",
              description: "Fostering creativity and forward-thinking solutions"
            },
            {
              title: "Integrity",
              description: "Maintaining ethical standards and accountability"
            },
            {
              title: "Diversity",
              description: "Embracing and celebrating different perspectives"
            }
          ].map((value, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h3 className="h5 card-title text-primary mb-3">{value.title}</h3>
                  <p className="card-text">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-5">
        <h2 className="h2 text-center mb-4">University Leadership</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="h5">Dr. Sarah Johnson</h3>
                <p className="text-muted">President</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="h5">Dr. Michael Chen</h3>
                <p className="text-muted">Vice President of Academic Affairs</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="h5">Dr. Emily Rodriguez</h3>
                <p className="text-muted">Dean of Students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-5">
        <h2 className="h3 mb-4">Join Our Community</h2>
        <div className="d-flex justify-content-center gap-3">
          <Link href="/apply" className="btn btn-primary btn-lg">
            Apply Now
          </Link>
          <Link href="/contact" className="btn btn-outline-primary btn-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
