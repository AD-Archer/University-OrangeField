export interface Course {
  title: string;
  code: string;
  credits: number;
  description: string;
  prerequisites: string;
  skills: string[];
}

export interface EnrolledCourse extends Course {
  status: 'In Progress' | 'Completed' | 'Enrolled';
  grade?: string;
}

export interface UserProfile {
  enrolledCourses: EnrolledCourse[];
  totalCredits: number;
  completedCredits: number;
  gpa: number;
} 