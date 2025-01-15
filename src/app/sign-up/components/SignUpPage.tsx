'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentType: '',
    agreeToTerms: false
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.agreeToTerms) {
        throw new Error('Please agree to the terms and conditions');
      }

      // Add your registration logic here
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

      setStatus({
        type: 'success',
        message: 'Account created successfully! Redirecting to login...'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred during registration'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card auth-card">
            <div className="card-body">
              <h1 className="h3 text-center mb-4">Create Your Account</h1>
              
              {status.type && (
                <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'} mb-4`} role="alert">
                  {status.message}
                </div>
              )}

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

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="studentType" className="form-label">I am a</label>
                    <select
                      className="form-select"
                      id="studentType"
                      name="studentType"
                      value={formData.studentType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select student type</option>
                      <option value="freshman">New Freshman</option>
                      <option value="transfer">Transfer Student</option>
                      <option value="graduate">Graduate Student</option>
                      <option value="international">International Student</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeToTerms">
                        I agree to the <Link href="/terms" className="text-decoration-none">Terms and Conditions</Link>
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 mb-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <span className="text-muted small">Already have an account? </span>
                  <Link href="/sign-in" className="text-decoration-none small">
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 