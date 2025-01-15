"use client"
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Basic validation
    if (!name || !email || !message) {
      setErrorMessage('All fields are required.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('Thank you for contacting us! We will get back to you shortly.');

    // Further processing like sending the form data to an API can be done here
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="row">
        <div className="col-md-6">
          <h3>Contact Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>University Contact Information</h3>
          <ul className="list-unstyled">
            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            <li><strong>Email:</strong> contact@orangefield.edu</li>
            <li><strong>Address:</strong> 123 Orangefield Blvd, Orangefield, NY 10001</li>
            <li><strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
