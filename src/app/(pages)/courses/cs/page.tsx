'use client';

import React from 'react';
import styles from '@/app/styles/components/courses.module.css';
import ActiveNavLink from '@/app/components/ActiveNavLink';

const ComputerSciencePage = () => {
  const courses = [
    {
      title: "Introduction to Programming",
      code: "CS101",
      credits: 3,
      description: "Start your coding journey with Python! Learn fundamental programming concepts, problem-solving techniques, and build your first applications. Perfect for beginners.",
      prerequisites: "None",
      skills: ["Python", "Problem Solving", "Basic Algorithms"]
    },
    {
      title: "Data Structures and Algorithms",
      code: "CS201",
      credits: 4,
      description: "Master essential data structures and algorithms. Learn to write efficient code and solve complex computational problems. Crucial for technical interviews.",
      prerequisites: "CS101",
      skills: ["Java", "Algorithm Analysis", "Data Structures"]
    },
    {
      title: "Web Development",
      code: "CS301",
      credits: 3,
      description: "Build modern, responsive websites using the latest technologies. Learn HTML5, CSS3, JavaScript, and popular frameworks like React and Next.js.",
      prerequisites: "CS201",
      skills: ["HTML/CSS", "JavaScript", "React"]
    },
    {
      title: "Artificial Intelligence",
      code: "CS401",
      credits: 4,
      description: "Explore the fascinating world of AI! Learn machine learning algorithms, neural networks, and build intelligent systems that can learn and adapt.",
      prerequisites: "CS201",
      skills: ["Python", "Machine Learning", "Neural Networks"]
    },
    {
      title: "Cybersecurity Fundamentals",
      code: "CS302",
      credits: 3,
      description: "Learn to protect systems and networks from cyber threats. Covers encryption, security protocols, and ethical hacking techniques.",
      prerequisites: "CS201",
      skills: ["Network Security", "Cryptography", "Ethical Hacking"]
    },
    {
      title: "Mobile App Development",
      code: "CS303",
      credits: 3,
      description: "Create engaging mobile applications for iOS and Android using React Native. Learn app design principles and mobile-first development.",
      prerequisites: "CS301",
      skills: ["React Native", "Mobile UI/UX", "API Integration"]
    }
  ];

  return (
    <div className={styles.coursesContainer}>
      <ActiveNavLink />
      <header className={styles.heroSection}>
        <h1 className={styles.pageTitle}>Explore Our Computer Science Programs</h1>
        <p className={styles.pageDescription}>
          Embark on a journey into the digital frontier. Gain in-demand skills through hands-on learning and prepare for exciting career opportunities in technology.
        </p>
      </header>

      <section className={styles.statsSection}>
        {[
          { value: "96%", label: "Employment Rate" },
          { value: "$85K+", label: "Average Starting Salary" },
          { value: "500+", label: "Industry Partners" },
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
            { title: "Software Engineer", salary: "$120,000" },
            { title: "Data Scientist", salary: "$115,000" },
            { title: "AI Engineer", salary: "$130,000" },
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

export default ComputerSciencePage; 