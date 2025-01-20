'use client';

import React from 'react';
import styles from '@/app/styles/components/courses.module.css';
import ActiveNavLink from '@/app/components/ActiveNavLink';

const EngineeringPage = () => {
  const courses = [
    {
      title: "Introduction to Engineering",
      code: "ENG101",
      credits: 3,
      description: "Begin your engineering journey! Learn fundamental principles, problem-solving methodologies, and engineering design thinking. Perfect for aspiring engineers.",
      prerequisites: "None",
      skills: ["CAD", "Problem Solving", "Technical Drawing"]
    },
    {
      title: "Engineering Mathematics",
      code: "ENG201",
      credits: 4,
      description: "Master advanced mathematical concepts essential for engineering applications. Covers calculus, differential equations, and linear algebra.",
      prerequisites: "ENG101",
      skills: ["Calculus", "Linear Algebra", "Differential Equations"]
    },
    {
      title: "Mechanical Engineering Principles",
      code: "ENG301",
      credits: 3,
      description: "Explore core concepts of mechanical engineering including thermodynamics, mechanics, and material science.",
      prerequisites: "ENG201",
      skills: ["Thermodynamics", "Mechanics", "Material Science"]
    },
    {
      title: "Electrical Engineering Fundamentals",
      code: "ENG302",
      credits: 4,
      description: "Learn the basics of electrical engineering, circuit analysis, and electronic systems design.",
      prerequisites: "ENG201",
      skills: ["Circuit Analysis", "Electronics", "Power Systems"]
    },
    {
      title: "Civil Engineering Design",
      code: "ENG303",
      credits: 3,
      description: "Study structural design, construction materials, and project management in civil engineering.",
      prerequisites: "ENG201",
      skills: ["Structural Design", "Construction", "Project Management"]
    },
    {
      title: "Chemical Process Engineering",
      code: "ENG304",
      credits: 4,
      description: "Understand chemical processes, reactor design, and process control in industrial applications.",
      prerequisites: "ENG201",
      skills: ["Process Control", "Reactor Design", "Chemical Kinetics"]
    }
  ];

  return (
    <div className={styles.coursesContainer}>
      <ActiveNavLink />
      <header className={styles.heroSection}>
        <h1 className={styles.pageTitle}>Explore Our Engineering Programs</h1>
        <p className={styles.pageDescription}>
          Shape the future through innovation and design. Our engineering programs combine theoretical knowledge with hands-on experience to prepare you for a career in engineering.
        </p>
      </header>

      <section className={styles.statsSection}>
        {[
          { value: "94%", label: "Employment Rate" },
          { value: "$90K+", label: "Average Starting Salary" },
          { value: "300+", label: "Industry Partners" },
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
            { title: "Mechanical Engineer", salary: "$85,000" },
            { title: "Civil Engineer", salary: "$82,000" },
            { title: "Chemical Engineer", salary: "$88,000" },
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

export default EngineeringPage; 