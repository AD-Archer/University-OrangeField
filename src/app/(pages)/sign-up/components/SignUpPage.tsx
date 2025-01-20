'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/components/signup.module.css';
import { toast } from 'react-hot-toast';
import ActiveNavLink from '@/app/components/ActiveNavLink';


interface ApiError {
  error: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        }),
      });

      const data = await response.json() as ApiError;

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        return;
      }

      setStatus({
        type: 'success',
        message: 'Account created successfully! Redirecting to sign-in...',
      });

      setTimeout(() => {
        window.location.href = '/sign-in';
      }, 2000);

    } catch (err) {
      const error = err as Error;
      toast.error(error?.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <ActiveNavLink />
      <div className={styles.authWrapper}>
        <div className={styles.authCard}>
          <div className={styles.logoSection}>
            <Image
              src="/images/Logo.svg"
              alt="Orange Field University Logo"
              width={180}
              height={180}
              className={styles.logo}
              priority
            />
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Join our academic community</p>
          </div>

          {status.type && (
            <div className={`${styles.alert} ${styles[status.type]}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGrid}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder=" "
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <label htmlFor="firstName" className={styles.label}>First Name</label>
              </div>

              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder=" "
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <label htmlFor="lastName" className={styles.label}>Last Name</label>
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <label htmlFor="email" className={styles.label}>Email Address</label>
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder=" "
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <label htmlFor="password" className={styles.label}>Password</label>
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className={styles.footer}>
            Already have an account?{' '}
            <a href="/sign-in" className={styles.link}>Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
} 