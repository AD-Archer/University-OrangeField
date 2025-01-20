"use client"

import React, { useState } from 'react';
import ActiveNavLink from '@/app/components/ActiveNavLink';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    department: '',
    message: '',
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    try {
      // Add your form submission logic here
      console.log('Form submitted:', formData);
      setStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        department: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again.'
      });
    }
  };

  return (
    <div className="container py-5">
      <ActiveNavLink />
      <div className="row">
        {/* Contact Information */}
        <div className="col-lg-4 mb-4 mb-lg-0">
          <h2 className="h3 mb-4">Get in Touch</h2>
          
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="h5 text-primary">Main Campus</h3>
              <p className="mb-0">123 University Avenue</p>
              <p className="mb-0">Orange Field, CA 92868</p>
              <p className="mb-3">United States</p>
              
              <h4 className="h6 text-primary">Phone</h4>
              <p className="mb-3">(555) 123-4567</p>
              
              <h4 className="h6 text-primary">Email</h4>
              <p className="mb-0">info@orangefield.edu</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="h5 mb-3">Department Contacts</h3>
              <div className="mb-2">
                <strong className="text-primary">Admissions:</strong>
                <br />admissions@orangefield.edu
              </div>
              <div className="mb-2">
                <strong className="text-primary">Student Services:</strong>
                <br />student.services@orangefield.edu
              </div>
              <div>
                <strong className="text-primary">Financial Aid:</strong>
                <br />financial.aid@orangefield.edu
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h2 className="h3 mb-4">Send Us a Message</h2>

              {status.type && (
                <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'} mb-4`} role="alert">
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
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
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="department" className="form-label">Department</label>
                    <select
                      className="form-select"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a department</option>
                      <option value="admissions">Admissions</option>
                      <option value="academic">Academic Affairs</option>
                      <option value="financial">Financial Aid</option>
                      <option value="student">Student Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Send Message
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
