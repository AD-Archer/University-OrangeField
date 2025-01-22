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
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
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

    const loadUserProfile = async () => {
      try {
        // Fetch user profile
        const profileRes = await fetch(`/api/user/profile?email=${user.email}`);
        const profile = await profileRes.json();
        
        if (profileRes.ok) {
          setUserProfile(profile);
        }

        // Fetch available courses
        const coursesRes = await fetch('/api/courses');
        const allCourses = await coursesRes.json();
        
        if (coursesRes.ok) {
          // Filter out enrolled courses
          const enrolledCodes = new Set(profile.enrolledCourses.map((c: EnrolledCourse) => c.code));
          setAvailableCourses(allCourses.filter((course: Course) => !enrolledCodes.has(course.code)));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Failed to load profile data');
      }
    };

    loadUserProfile();
  }, [user, router]);

  const addToCart = async (course: Course) => {
    if (!user) return;

    if (userProfile.enrolledCourses.some(c => c.code === course.code)) {
      toast.error('Already enrolled in this course');
      return;
    }

    try {
      const cartRes = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: course.id
        }),
      });

      if (cartRes.ok) {
        toast.success(`${course.title} added to cart`);
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add course to cart');
    }
  };

  const handleUnenrollRequest = async (course: EnrolledCourse) => {
    setSelectedCourse(course);
    setShowUnenrollModal(true);
  };

  const confirmUnenrollRequest = async () => {
    if (!selectedCourse || !user?.id) return;

    try {
      const response = await fetch('/api/enrollments/unenroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: selectedCourse.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to request unenrollment');
      }

      toast.success('Your unenrollment request has been submitted. A staff member will contact you soon.');
      
      // Refresh user profile to show updated status
      const profileRes = await fetch(`/api/user/profile?email=${user.email}`);
      if (profileRes.ok) {
        const profile = await profileRes.json();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error requesting unenrollment:', error);
      toast.error('Failed to submit unenrollment request');
    } finally {
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