'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/components/profile.module.css';
import ActiveNavLink from '@/app/components/ActiveNavLink';
import { Course, EnrolledCourse, UserProfile } from '@/app/types/course';
import toast from 'react-hot-toast';
import { calculateRandomAcademics, shouldUpdateAcademics } from '@/utils/academicUtils';
import EditProfileForm from './EditProfileForm';

// Combined courses data
const allCoursesData: Course[] = [
  // CS Courses
  {
    id: "1",
    code: "CS301",
    title: "Web Development",
    credits: 3,
    description: "Learn modern web development using React, Next.js, and other cutting-edge technologies.",
    prerequisites: "CS201",
    price: 1050.0,
    skills: ["React", "JavaScript", "Web Development"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    code: "CS302",
    title: "Cybersecurity Fundamentals",
    credits: 3,
    description: "Learn to protect systems and networks from cyber threats.",
    prerequisites: "CS201",
    price: 1050.0,
    skills: ["Network Security", "Cryptography", "Ethical Hacking"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Business Courses
  {
    id: "3",
    code: "BUS301",
    title: "Marketing Management",
    credits: 3,
    description: "Study marketing strategies and consumer behavior. Learn to create effective marketing campaigns and build strong brands.",
    prerequisites: "BUS201",
    price: 1050.0,
    skills: ["Marketing Strategy", "Market Analysis", "Digital Marketing"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    code: "BUS302",
    title: "Financial Management",
    credits: 3,
    description: "Learn financial planning and investment strategies. Master corporate finance principles and risk management.",
    prerequisites: "BUS201",
    price: 1050.0,
    skills: ["Financial Analysis", "Investment", "Risk Management"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Engineering Courses
  {
    id: "5",
    code: "ENG301",
    title: "Mechanical Systems",
    credits: 3,
    description: "Study mechanical engineering principles and system design. Learn thermodynamics, mechanics, and material science.",
    prerequisites: "ENG201",
    price: 1050.0,
    skills: ["CAD", "Thermodynamics", "Mechanics"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    code: "ENG302",
    title: "Civil Engineering Design",
    credits: 3,
    description: "Learn structural design and construction principles. Master AutoCAD and project management techniques.",
    prerequisites: "ENG201",
    price: 1050.0,
    skills: ["Structural Analysis", "AutoCAD", "Construction Management"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    enrolledCourses: [],
    totalCredits: 0,
    completedCredits: 0,
    gpa: 0.0
  });
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    if (isLoading) return;

    if (!isLoading && !user) {
      router.push('/sign-in');
      return;
    }

    const loadUserProfile = async () => {
      try {
        if (!user?.email) return;

        const profileRes = await fetch(`/api/user/profile?email=${user.email}`);
        const profile = await profileRes.json();
        
        console.log('Fetched user profile:', profile);

        if (profileRes.ok) {
          setUserProfile(profile);
        }

        const coursesRes = await fetch('/api/courses');
        const allCourses = await coursesRes.json();
        
        if (coursesRes.ok) {
          const enrolledCodes = new Set(profile.enrolledCourses.map((c: EnrolledCourse) => c.code));
          setAvailableCourses(allCourses.filter((course: Course) => !enrolledCodes.has(course.code)));
        }

        if (user?.id) {
          const userDetailsRes = await fetch(`/api/user/details?userId=${user.id}`);
          if (userDetailsRes.ok) {
            const details = await userDetailsRes.json();
            setPersonalDetails(details);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Failed to load profile data');
      }
    };

    loadUserProfile();
  }, [user, router, isLoading]);

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

  if (isLoading) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.loadingState}>
          Loading...
        </div>
      </div>
    );
  }

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
              <div className={styles.infoItem}>
                <label>Name:</label>
                <p>{personalDetails.firstName} {personalDetails.lastName}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Phone:</label>
                <p>{personalDetails.phoneNumber || 'Not set'}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Address:</label>
                <p>{personalDetails.address || 'Not set'}</p>
              </div>
              <button
                onClick={() => setShowEditProfile(true)}
                className={styles.editButton}
              >
                Edit Details
              </button>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          <div className={styles.section}>
            <h2>My Courses</h2>
            <div className={styles.coursesList}>
              {userProfile.enrolledCourses && userProfile.enrolledCourses.length > 0 ? (
                userProfile.enrolledCourses.map((course, index) => (
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
                ))
              ) : (
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
                <p>{userProfile.gpa !== undefined ? userProfile.gpa.toFixed(2) : 'N/A'}</p>
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

          {showEditProfile && (
            <EditProfileForm
              initialDetails={personalDetails}
              onClose={() => setShowEditProfile(false)}
              onUpdate={setPersonalDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
} 