export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  prerequisites?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnrolledCourse extends Course {
  status: string;
}

export interface UserProfile {
  enrolledCourses: EnrolledCourse[];
  totalCredits: number;
  completedCredits: number;
  gpa: number;
} 