'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/app/styles/components/checkout.module.css';
import ActiveNavLink from '@/app/components/ActiveNavLink';
import { Course } from '@/app/types/course';
import toast from 'react-hot-toast';

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [cart, setCart] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    const cartData = localStorage.getItem(`cart_${user.email}`);
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, [user, router]);

  const calculateTotal = () => {
    return cart.reduce((total, course) => total + (course.credits * 350), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate form
      if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv) {
        throw new Error('Please fill in all payment fields');
      }

      // Get user profile
      const profileData = localStorage.getItem(`userProfile_${user?.email}`);
      const userProfile = profileData ? JSON.parse(profileData) : { enrolledCourses: [] };

      // Add courses to enrolled courses
      const updatedProfile = {
        ...userProfile,
        enrolledCourses: [
          ...userProfile.enrolledCourses,
          ...cart.map(course => ({
            ...course,
            status: 'Enrolled'
          }))
        ]
      };

      // Save updated profile
      localStorage.setItem(`userProfile_${user?.email}`, JSON.stringify(updatedProfile));
      
      // Clear cart
      localStorage.removeItem(`cart_${user?.email}`);
      setCart([]);

      toast.success('Enrollment successful!');
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process enrollment');
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = (courseCode: string) => {
    const updatedCart = cart.filter(course => course.code !== courseCode);
    setCart(updatedCart);
    localStorage.setItem(`cart_${user?.email}`, JSON.stringify(updatedCart));
    toast.success('Course removed from cart');
  };

  if (cart.length === 0) {
    return (
      <div className={styles.checkoutContainer}>
        <ActiveNavLink />
        <div className={styles.emptyCart}>
          <h2>Your Cart is Empty</h2>
          <p>Add courses to your cart from the profile page.</p>
          <button 
            onClick={() => router.push('/profile')}
            className={styles.returnButton}
          >
            Return to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <ActiveNavLink />
      <div className={styles.checkoutWrapper}>
        <div className={styles.checkoutCard}>
          <h1 className={styles.title}>Checkout</h1>
          
          <div className={styles.warningBox}>
            <p className={styles.warningText}>
              ⚠️ This is a demo site. Please do not enter real credit card information.
            </p>
          </div>

          <div className={styles.cartSection}>
            <h2>Selected Courses</h2>
            {cart.map((course, index) => (
              <div key={index} className={styles.courseItem}>
                <div className={styles.courseInfo}>
                  <h3>{course.title}</h3>
                  <p>{course.code} • {course.credits} Credits</p>
                  <p className={styles.coursePrice}>${course.credits * 350}</p>
                </div>
                <button 
                  onClick={() => removeCourse(course.code)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summarySection}>
            <h2>Order Summary</h2>
            <div className={styles.summaryItem}>
              <span>Total Credits:</span>
              <span>{cart.reduce((sum, course) => sum + course.credits, 0)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Price per Credit:</span>
              <span>$350</span>
            </div>
            <div className={styles.totalAmount}>
              <span>Total Amount:</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>

          <form onSubmit={handleCheckout} className={styles.paymentForm}>
            <h2>Payment Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={paymentInfo.cardName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={3}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className={styles.checkoutButton}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Enrollment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 