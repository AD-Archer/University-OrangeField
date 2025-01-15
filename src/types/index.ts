export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN' | 'STAFF';
}

export interface Session {
  user?: {
    email?: string | null;
  };
} 