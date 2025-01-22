export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithEnrollments extends User {
  enrollments: {
    id: string;
    courseId: string;
    status: string;
    course: {
      id: string;
      code: string;
      title: string;
      description: string;
      credits: number;
      prerequisites?: string;
      price: number;
    };
  }[];
} 