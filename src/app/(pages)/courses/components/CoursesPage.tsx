'use client';

import React from 'react';
import Link from 'next/link';
import ActiveNavLink from '@/app/components/ActiveNavLink';


const programs = [
  {
    id: 'cs',
    title: 'Computer Science',
    degree: 'Bachelor of Science',
    description: 'Learn software development, artificial intelligence, and computer systems.',
    duration: '4 years',
    careers: ['Software Engineer', 'Data Scientist', 'Systems Architect']
  },
  {
    id: 'business',
    title: 'Business Administration',
    degree: 'Bachelor of Business Administration',
    description: 'Study management, finance, marketing, and entrepreneurship.',
    duration: '4 years',
    careers: ['Business Analyst', 'Marketing Manager', 'Entrepreneur']
  },
  {
    id: 'engineering',
    title: 'Engineering',
    degree: 'Bachelor of Engineering',
    description: 'Focus on mechanical, electrical, or civil engineering principles.',
    duration: '4 years',
    careers: ['Mechanical Engineer', 'Electrical Engineer', 'Project Manager']
  },
  // Add more programs as needed
];

export default function CoursesPage() {
  return (
    <div className="container py-5">
      <ActiveNavLink />
      <h1 className="display-4 text-center mb-5">Academic Programs</h1>
      
      {/* Programs Grid */}
      <div className="row g-4">
        {programs.map((program) => (
          <div key={program.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h4 card-title">{program.title}</h2>
                <h3 className="h6 text-muted mb-3">{program.degree}</h3>
                <p className="card-text">{program.description}</p>
                <div className="mb-3">
                  <strong className="text-primary">Duration:</strong> {program.duration}
                </div>
                <div className="mb-3">
                  <strong className="text-primary">Career Opportunities:</strong>
                  <ul className="list-unstyled mt-2">
                    {program.careers.map((career, index) => (
                      <li key={index}>• {career}</li>
                    ))}
                  </ul>
                </div>
                <Link 
                  href={`/courses/${program.id}`} 
                  className="btn btn-outline-primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5 pt-4">
        <h2 className="h3 mb-4">Ready to Begin Your Journey?</h2>
        <div className="d-flex justify-content-center gap-3">
          <Link href="/apply" className="btn btn-primary btn-lg">
            Apply Now
          </Link>
          <Link href="/contact" className="btn btn-outline-primary btn-lg">
            Contact Admissions
          </Link>
        </div>
      </div>
    </div>
  );
} 