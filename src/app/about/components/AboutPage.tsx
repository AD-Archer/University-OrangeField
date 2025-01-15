import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Orangefield University</h1>

      <section className="mb-5">
        <h2>Our Mission</h2>
        <p>
          At Orangefield University, our mission is to provide high-quality education that fosters
          creativity, critical thinking, and innovation. We aim to equip our students with the skills
          necessary to succeed in a rapidly changing world while instilling a strong sense of
          social responsibility.
        </p>
      </section>

      <section className="mb-5">
        <h2>Our History</h2>
        <p>
          Founded in 1950, Orangefield University has a long-standing tradition of excellence in
          education. Over the years, we have expanded our programs to include a wide variety of
          disciplines, offering degrees at the undergraduate, graduate, and doctoral levels.
          Throughout our history, we have remained committed to providing an inclusive, supportive,
          and challenging environment for all students.
        </p>
      </section>

      <section className="mb-5">
        <h2>Core Values</h2>
        <ul>
          <li><strong>Excellence:</strong> Striving for the highest standards in all areas of education.</li>
          <li><strong>Innovation:</strong> Encouraging creativity, exploration, and a forward-thinking approach.</li>
          <li><strong>Diversity:</strong> Fostering an inclusive environment that celebrates different perspectives.</li>
          <li><strong>Integrity:</strong> Upholding the highest ethical standards in all aspects of university life.</li>
          <li><strong>Community:</strong> Building a strong and supportive network of students, faculty, and alumni.</li>
        </ul>
      </section>

      <section>
        <h2>Why Choose Us?</h2>
        <p>
          Orangefield University offers a comprehensive education in a vibrant and supportive
          environment. With experienced faculty, state-of-the-art facilities, and a strong emphasis on
          practical experience, we prepare our graduates to be leaders in their fields.
        </p>
        <p>
          Our extensive student support services, diverse extracurricular activities, and commitment
          to lifelong learning ensure that each student has the resources they need to succeed both
          academically and personally.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
