import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import AdminDashboard from './components/AdminDashboard';

export default async function AdminPage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');
  
  if (!userCookie) {
    redirect('/sign-in');
  }

  try {
    const userData = JSON.parse(userCookie.value);
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
      select: {
        isAdmin: true,
      },
    });

    if (!user?.isAdmin) {
      redirect('/');
    }

    const courses = await prisma.course.findMany({
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <AdminDashboard courses={courses} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in admin page:', error);
    redirect('/sign-in');
  }
} 