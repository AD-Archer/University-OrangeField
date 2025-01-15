"use client"
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Simulating fetching course data from an API
    const fetchCourses = () => {
      const fetchedCourses: Course[] = [
        {
          id: 1,
          name: 'Introduction to Computer Science',
          description: 'Learn the fundamentals of computer science and programming.',
          instructor: 'Dr. John Doe',
        },
        {
          id: 2,
          name: 'Calculus I',
          description: 'A deep dive into the basics of calculus and mathematical reasoning.',
          instructor: 'Prof. Jane Smith',
        },
        {
          id: 3,
          name: 'Physics for Engineers',
          description: 'An introduction to the physical principles applied in engineering.',
          instructor: 'Dr. Emily Johnson',
        },
      ];
      setCourses(fetchedCourses);
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Courses Offered at Orangefield University</h2>
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Instructor: {course.instructor}</h6>
                <p className="card-text">{course.description}</p>
                <a href={`/course/${course.id}`} className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
