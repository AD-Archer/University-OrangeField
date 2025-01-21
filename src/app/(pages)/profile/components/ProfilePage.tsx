'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/components/profile.module.css';
import ActiveNavLink from '@/app/components/ActiveNavLink';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  // Get user's full data from localStorage
  const getUserData = () => {
    const usersJson = localStorage.getItem('users');
    if (!usersJson) return null;
    
    const users = JSON.parse(usersJson);
    return users.find((u: any) => u.email === user?.email);
  };

  const userData = getUserData();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div className={styles.profileContainer}>
      <ActiveNavLink />
      <div className={styles.profileWrapper}>
        <div className={styles.profileCard}>
          <h1 className={styles.title}>My Profile</h1>
          
          <div className={styles.section}>
            <h2>Personal Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Name:</label>
                <p>{userData?.firstName} {userData?.lastName}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Email:</label>
                <p>{userData?.email}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Phone:</label>
                <p>{userData?.phoneNumber || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>My Courses</h2>
            <div className={styles.coursesList}>
              {/* Reference to courses from CS and Business pages */}
              <div className={styles.courseCard}>
                <h3>Web Development</h3>
                <p>CS301 • 3 Credits</p>
                <p className={styles.courseStatus}>In Progress</p>
              </div>
              <div className={styles.courseCard}>
                <h3>Cybersecurity Fundamentals</h3>
                <p>CS302 • 3 Credits</p>
                <p className={styles.courseStatus}>Enrolled</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Academic Progress</h2>
            <div className={styles.progressGrid}>
              <div className={styles.progressItem}>
                <label>Credits Completed:</label>
                <p>24/120</p>
              </div>
              <div className={styles.progressItem}>
                <label>Current GPA:</label>
                <p>3.8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 