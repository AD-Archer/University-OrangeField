'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/components/signup.module.css';
import { toast } from 'react-hot-toast';
import ActiveNavLink from '@/app/components/ActiveNavLink';
import { useAuth } from '@/contexts/AuthContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuth();
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
      // Validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
        throw new Error('Please fill in all required fields');
      }

      // Initialize users array from localStorage
      let users = [];
      const existingUsers = localStorage.getItem('users');
      if (existingUsers) {
        try {
          users = JSON.parse(existingUsers);
          if (!Array.isArray(users)) {
            users = [];
          }
        } catch {
          users = [];
        }
      }

      // Check if email exists
      const emailExists = users.some((user: any) => user.email === formData.email);
      if (emailExists) {
        throw new Error('Email already exists');
      }

      // Create new user
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Create user session
      const userData = {
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
      };

      // Update auth context
      setUser(userData);

      setStatus({
        type: 'success',
        message: 'Account created successfully! Redirecting...'
      });

      // Redirect after delay
      setTimeout(() => {
        router.push('/');
      }, 1500);

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
              <label htmlFor="email" className={styles.label}>Email</label>
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

            <div className={styles.inputWrapper}>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder=" "
                value={formData.phoneNumber}
                onChange={handleChange}
                className={styles.input}
              />
              <label htmlFor="phoneNumber" className={styles.label}>Phone Number (Optional)</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 