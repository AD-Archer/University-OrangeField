'use client';

import React from 'react';
import styles from '@/app/styles/components/courses.module.css';
import ActiveNavLink from '@/app/components/ActiveNavLink';

const BusinessPage = () => {
  const courses = [
    {
      title: "Introduction to Business",
      code: "BUS101",
      credits: 3,
      description: "Start your business journey! Learn fundamental business concepts, management principles, and organizational structures. Perfect for future entrepreneurs.",
      prerequisites: "None",
      skills: ["Management", "Business Basics", "Organization"]
    },
    {
      title: "Marketing Principles",
      code: "BUS201",
      credits: 3,
      description: "Master essential marketing strategies and consumer behavior analysis. Learn to create effective marketing campaigns and build strong brands.",
      prerequisites: "BUS101",
      skills: ["Marketing Strategy", "Market Analysis", "Brand Management"]
    },
    {
      title: "Financial Management",
      code: "BUS301",
      credits: 4,
      description: "Dive into financial planning and analysis. Learn investment strategies, risk management, and corporate finance principles.",
      prerequisites: "BUS201",
      skills: ["Financial Analysis", "Investment", "Risk Management"]
    },
    {
      title: "Business Analytics",
      code: "BUS302",
      credits: 3,
      description: "Learn to make data-driven business decisions using statistical analysis and business intelligence tools.",
      prerequisites: "BUS201",
      skills: ["Data Analysis", "Statistics", "Business Intelligence"]
    },
    {
      title: "Entrepreneurship",
      code: "BUS401",
      credits: 3,
      description: "Develop your entrepreneurial mindset and learn to build successful startups. Covers business planning, funding, and growth strategies.",
      prerequisites: "BUS301",
      skills: ["Business Planning", "Leadership", "Innovation"]
    },
    {
      title: "International Business",
      code: "BUS402",
      credits: 4,
      description: "Explore global business operations and international markets. Learn about cross-cultural management and global trade.",
      prerequisites: "BUS301",
      skills: ["Global Markets", "Cross-cultural Management", "International Trade"]
    }
  ];

  return (
    <div className={styles.coursesContainer}>
      <ActiveNavLink />
      <header className={styles.heroSection}>
        <h1 className={styles.pageTitle}>Explore Our Business Programs</h1>
        <p className={styles.pageDescription}>
          Transform your passion for business into expertise. Our comprehensive business programs prepare you for leadership roles in the global marketplace through practical experience and industry insights.
        </p>
      </header>

      <section className={styles.statsSection}>
        {[
          { value: "92%", label: "Employment Rate" },
          { value: "$75K+", label: "Average Starting Salary" },
          { value: "200+", label: "Corporate Partners" },
        ].map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className={styles.pageTitle}>Available Courses</h2>
        <div className={styles.courseGrid}>
          {courses.map((course, index) => (
            <article key={index} className={styles.courseCard}>
              <h2 className={styles.courseTitle}>{course.title}</h2>
              <p className={styles.courseCode}>Code: {course.code}</p>
              <p className={styles.courseCredits}>{course.credits} Credits</p>
              <p className={styles.courseDescription}>{course.description}</p>
              <div className={styles.skillTags}>
                {course.skills.map((skill, i) => (
                  <span key={i} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
              <p className={styles.prerequisites}>
                <strong>Prerequisites:</strong> {course.prerequisites}
              </p>
              <button className={styles.learnMoreBtn}>Learn More</button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.careerSection}>
        <h2>Career Opportunities</h2>
        <div className={styles.careerGrid}>
          {[
            { title: "Business Analyst", salary: "$85,000" },
            { title: "Marketing Manager", salary: "$95,000" },
            { title: "Financial Advisor", salary: "$90,000" },
          ].map((career, index) => (
            <div key={index} className={styles.careerCard}>
              <h3>{career.title}</h3>
              <p>Average Salary: {career.salary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BusinessPage; 