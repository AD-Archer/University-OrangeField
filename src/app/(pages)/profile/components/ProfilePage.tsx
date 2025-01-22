'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/components/profile.module.css';
import ActiveNavLink from '@/app/components/ActiveNavLink';
import { Course, EnrolledCourse, UserProfile } from '@/app/types/course';
import toast from 'react-hot-toast';
import { calculateRandomAcademics, shouldUpdateAcademics } from '@/utils/academicUtils';

// Combined courses data
const allCoursesData: Course[] = [
  // CS Courses
  {
    title: "Web Development",
    code: "CS301",
    credits: 3,
    description: "Learn modern web development using React, Next.js, and other cutting-edge technologies.",
    prerequisites: "CS201",
    skills: ["React", "JavaScript", "Web Development"]
  },
  {
    title: "Cybersecurity Fundamentals",
    code: "CS302",
    credits: 3,
    description: "Learn to protect systems and networks from cyber threats.",
    prerequisites: "CS201",
    skills: ["Network Security", "Cryptography", "Ethical Hacking"]
  },
  // Business Courses
  {
    title: "Marketing Management",
    code: "BUS301",
    credits: 3,
    description: "Study marketing strategies and consumer behavior.",
    prerequisites: "BUS201",
    skills: ["Marketing Strategy", "Market Analysis", "Digital Marketing"]
  },
  {
    title: "Financial Management",
    code: "BUS302",
    credits: 3,
    description: "Learn financial planning and investment strategies.",
    prerequisites: "BUS201",
    skills: ["Financial Analysis", "Investment", "Risk Management"]
  },
  // Engineering Courses
  {
    title: "Mechanical Systems",
    code: "ENG301",
    credits: 3,
    description: "Study mechanical engineering principles and system design.",
    prerequisites: "ENG201",
    skills: ["CAD", "Thermodynamics", "Mechanics"]
  },
  {
    title: "Civil Engineering Design",
    code: "ENG302",
    credits: 3,
    description: "Learn structural design and construction principles.",
    prerequisites: "ENG201",
    skills: ["Structural Analysis", "AutoCAD", "Construction Management"]
  }
];

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [availableCourses, setAvailableCourses] = useState<Course[]>(allCoursesData);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    enrolledCourses: [],
    totalCredits: 120,
    completedCredits: 0,
    gpa: 0.0
  });
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    const loadUserProfile = () => {
      const storedProfile = localStorage.getItem(`userProfile_${user.email}`);
      if (storedProfile) {
        const profile = JSON.parse(storedProfile) as UserProfile;
        
        // Update academics if 12 hours have passed
        if (shouldUpdateAcademics()) {
          const { gpa, completedCredits } = calculateRandomAcademics();
          profile.gpa = gpa;
          profile.completedCredits = completedCredits;
          localStorage.setItem('lastAcademicUpdate', Date.now().toString());
          localStorage.setItem(`userProfile_${user.email}`, JSON.stringify(profile));
        }
        
        setUserProfile(profile);
        
        // Update available courses by removing enrolled ones
        const enrolledCodes = new Set(profile.enrolledCourses.map((c: EnrolledCourse) => c.code));
        setAvailableCourses(allCoursesData.filter(course => !enrolledCodes.has(course.code)));
      } else {
        // Initialize with random academics for new users
        const { gpa, completedCredits } = calculateRandomAcademics();
        const initialProfile = {
          enrolledCourses: [],
          totalCredits: 120,
          completedCredits,
          gpa
        };
        localStorage.setItem(`userProfile_${user.email}`, JSON.stringify(initialProfile));
        localStorage.setItem('lastAcademicUpdate', Date.now().toString());
        setUserProfile(initialProfile);
      }
    };

    loadUserProfile();
  }, [user, router]);

  const addToCart = (course: Course) => {
    if (userProfile.enrolledCourses.some(c => c.code === course.code)) {
      toast.error('Already enrolled in this course');
      return;
    }

    // Get existing cart
    const cartData = localStorage.getItem(`cart_${user?.email}`);
    const cart = cartData ? JSON.parse(cartData) : [];

    // Check if course is already in cart
    if (cart.some((c: Course) => c.code === course.code)) {
      toast.error('Course is already in your cart');
      return;
    }

    // Add to cart
    const updatedCart = [...cart, course];
    localStorage.setItem(`cart_${user?.email}`, JSON.stringify(updatedCart));
    toast.success(`${course.title} added to cart`);
  };

  const handleUnenrollRequest = (course: EnrolledCourse) => {
    setSelectedCourse(course);
    setShowUnenrollModal(true);
  };

  const confirmUnenrollRequest = () => {
    if (selectedCourse) {
      toast.success('Your unenrollment request has been submitted. A staff member will contact you soon.');
      setShowUnenrollModal(false);
      setSelectedCourse(null);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <ActiveNavLink />
      <div className={styles.profileWrapper}>
        <div className={styles.profileCard}>
          <h1 className={styles.title}>My Profile</h1>
          
          {/* Personal Information Section */}
          <div className={styles.section}>
            <h2>Personal Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Email:</label>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          <div className={styles.section}>
            <h2>My Courses</h2>
            <div className={styles.coursesList}>
              {userProfile.enrolledCourses.map((course, index) => (
                <div key={index} className={styles.courseCard}>
                  <h3>{course.title}</h3>
                  <p>{course.code} • {course.credits} Credits</p>
                  <p className={styles.courseStatus}>{course.status}</p>
                  <button 
                    onClick={() => handleUnenrollRequest(course)}
                    className={styles.unenrollButton}
                  >
                    Request Unenrollment
                  </button>
                </div>
              ))}
              {userProfile.enrolledCourses.length === 0 && (
                <p className={styles.noCourses}>No courses enrolled yet</p>
              )}
            </div>
          </div>

          {/* Available Courses Section */}
          <div className={styles.section}>
            <h2>Available Courses</h2>
            <div className={styles.coursesList}>
              {availableCourses.map((course, index) => (
                <div key={index} className={styles.courseCard}>
                  <h3>{course.title}</h3>
                  <p>{course.code} • {course.credits} Credits</p>
                  <p className={styles.coursePrice}>${course.credits * 350}</p>
                  <p className={styles.courseDescription}>{course.description}</p>
                  <p className={styles.prerequisites}>Prerequisites: {course.prerequisites}</p>
                  <button 
                    onClick={() => addToCart(course)}
                    className={styles.enrollButton}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Progress Section */}
          <div className={styles.section}>
            <h2>Academic Progress</h2>
            <div className={styles.progressGrid}>
              <div className={styles.progressItem}>
                <label>Credits Completed:</label>
                <p>{userProfile.completedCredits}/{userProfile.totalCredits}</p>
              </div>
              <div className={styles.progressItem}>
                <label>Current GPA:</label>
                <p>{userProfile.gpa.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Add Modal */}
          {showUnenrollModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2>Unenrollment Request</h2>
                <p>Are you sure you want to request unenrollment from {selectedCourse?.title}?</p>
                <p className={styles.modalNote}>
                  Note: A staff member will contact you to confirm this request and discuss any potential refunds or academic implications.
                </p>
                <div className={styles.modalButtons}>
                  <button 
                    onClick={confirmUnenrollRequest}
                    className={styles.confirmButton}
                  >
                    Confirm Request
                  </button>
                  <button 
                    onClick={() => setShowUnenrollModal(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 