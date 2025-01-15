'use client';

import React, { useState } from 'react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    startTerm: '',
    education: '',
    statement: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    // Add your submission logic here
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="text-center mb-4">Apply to Orange Field University</h1>
              <p className="text-muted text-center mb-4">
                Take the first step towards your future by applying today
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="program" className="form-label">Desired Program</label>
                    <select
                      className="form-select"
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a program</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="business">Business Administration</option>
                      <option value="engineering">Engineering</option>
                      <option value="arts">Liberal Arts</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="startTerm" className="form-label">Start Term</label>
                    <select
                      className="form-select"
                      id="startTerm"
                      name="startTerm"
                      value={formData.startTerm}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a term</option>
                      <option value="fall-2024">Fall 2024</option>
                      <option value="spring-2025">Spring 2025</option>
                      <option value="fall-2025">Fall 2025</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="education" className="form-label">Previous Education</label>
                    <input
                      type="text"
                      className="form-control"
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="High School or Previous College"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="statement" className="form-label">Personal Statement</label>
                    <textarea
                      className="form-control"
                      id="statement"
                      name="statement"
                      value={formData.statement}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about yourself and why you want to join Orange Field University"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Submit Application
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 