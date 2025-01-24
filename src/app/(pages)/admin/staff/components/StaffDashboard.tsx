'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

interface Enrollment {
  id: string;
  user: User;
}

interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  prerequisites: string | null;
  price: number;
  enrollments: Enrollment[];
}

interface StaffDashboardProps {
  courses: Course[];
}

export default function StaffDashboard({ courses }: StaffDashboardProps) {
  const router = useRouter();
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    description: '',
    credits: 3,
    prerequisites: '',
    price: 350,
  });

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) throw new Error('Failed to create course');
      router.refresh();
      setNewCourse({
        code: '',
        title: '',
        description: '',
        credits: 3,
        prerequisites: '',
        price: 350,
      });
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`/api/admin?courseId=${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');
      router.refresh();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const handleRemoveStudent = async (userId: string, courseId: string) => {
    if (!confirm('Are you sure you want to remove this student from the course?')) return;

    try {
      const response = await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseId }),
      });

      if (!response.ok) throw new Error('Failed to remove student');
      router.refresh();
    } catch (error) {
      console.error('Error removing student:', error);
      alert('Failed to remove student');
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col">
          <h1>Staff Dashboard</h1>
        </div>
      </div>

      {/* Create Course Form */}
      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h2>Create New Course</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreateCourse}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Course Code</label>
                    <input
                      type="text"
                      placeholder="e.g., CS101"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Course Title</label>
                    <input
                      type="text"
                      placeholder="Introduction to Programming"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Course description..."
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      className="form-control"
                      rows={3}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Credits</label>
                    <input
                      type="number"
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Price ($)</label>
                    <input
                      type="number"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">Prerequisites</label>
                    <input
                      type="text"
                      placeholder="e.g., CS100, MATH101"
                      value={newCourse.prerequisites}
                      onChange={(e) => setNewCourse({ ...newCourse, prerequisites: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="row mb-4">
        <div className="col">
          <h2>Manage Courses</h2>
        </div>
      </div>
      
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="mb-0">{course.title}</h3>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
              <div className="card-body">
                <p className="text-muted small">Code: {course.code}</p>
                <div className="mb-3">
                  <h4 className="h6">Description</h4>
                  <p>{course.description}</p>
                </div>
                <div className="mb-3">
                  <h4 className="h6">Credits</h4>
                  <p>{course.credits}</p>
                </div>
                <div className="mb-3">
                  <h4 className="h6">Price</h4>
                  <p>${course.price}</p>
                </div>
                {course.prerequisites && (
                  <div className="mb-3">
                    <h4 className="h6">Prerequisites</h4>
                    <p>{course.prerequisites}</p>
                  </div>
                )}
                <div className="mt-4">
                  <h4 className="h6">Enrolled Students ({course.enrollments.length})</h4>
                  {course.enrollments.length > 0 ? (
                    <div className="list-group">
                      {course.enrollments.map((enrollment) => (
                        <div
                          key={enrollment.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>
                            {enrollment.user.firstName} {enrollment.user.lastName} ({enrollment.user.email})
                          </span>
                          <button
                            onClick={() => handleRemoveStudent(enrollment.user.id, course.id)}
                            className="btn btn-link text-danger p-0"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No students enrolled</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 