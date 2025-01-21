'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import styles from '@/app/styles/components/signin.module.css';
import ActiveNavLink from '@/app/components/ActiveNavLink';
import { useAuth } from '@/contexts/AuthContext';
import Cookies from 'js-cookie';

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setStatus({ type: null, message: '' });

      try {
        // Get users from localStorage
        const usersJson = localStorage.getItem('users');
        const users = usersJson ? JSON.parse(usersJson) : [];

        // Find user
        const user = users.find((u: any) => 
          u.email === values.email && u.password === values.password
        );

        if (!user) {
          setStatus({
            type: 'error',
            message: 'Invalid email or password',
          });
          return;
        }

        // Create user data
        const userData = {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          isLoggedIn: true
        };

        // Set auth cookie
        Cookies.set('auth', 'true', { expires: 7 });
        
        // Store in localStorage and context
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);

        setStatus({
          type: 'success',
          message: 'Sign in successful! Redirecting...',
        });

        // Redirect after a short delay
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1500);

      } catch (error) {
        setStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'An error occurred',
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={styles.authContainer}>
      <ActiveNavLink />
      <div className={styles.authWrapper}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>Welcome Back</h1>

          {status.type && (
            <div className={`${styles.alert} ${styles[status.type]}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                className={styles.input}
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                autoComplete="email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                className={styles.input}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                autoComplete="current-password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
            </div>

            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                className={styles.checkbox}
                id="rememberMe"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              <label htmlFor="rememberMe" className={styles.label}>
                Remember me
              </label>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className={styles.textCenter}>
              <Link href="/forgot-password" className={styles.link}>
                Forgot your password?
              </Link>
            </div>

            <hr className={styles.divider} />

            <div className={styles.textCenter}>
              <span className={styles.textMuted}>Don't have an account? </span>
              <Link href="/sign-up" className={styles.link}>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 