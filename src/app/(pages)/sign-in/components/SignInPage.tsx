'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function SignInPage() {
  const router = useRouter();
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
        const result = await signIn('credentials', {
          redirect: false,
          email: values.email.trim(),
          password: values.password.trim(),
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        setStatus({
          type: 'success',
          message: 'Sign in successful! Redirecting...',
        });

        // Redirect to dashboard or home page
        router.push('/dashboard');
        router.refresh(); // Refresh the page to update header
      } catch (error) {
        setStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'Invalid credentials',
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card auth-card">
            <div className="card-body">
              <h1 className="h3 text-center mb-4">Welcome Back</h1>

              {status.type && (
                <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'} mb-4`} role="alert">
                  {status.message}
                </div>
              )}

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    autoComplete="email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    autoComplete="current-password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="text-center">
                  <Link href="/forgot-password" className="text-decoration-none small">
                    Forgot your password?
                  </Link>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <span className="text-muted small">Don't have an account? </span>
                  <Link href="/sign-up" className="text-decoration-none small">
                    Sign Up
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