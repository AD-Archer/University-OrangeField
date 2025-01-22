import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); // Assuming you pass email as a query parameter

  // Check if email is null or empty
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            course: true // Ensure you include the course details
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Format the response to include enrolled courses
    const userProfile = {
      enrolledCourses: user.enrollments.map(enrollment => ({
        ...enrollment.course,
        status: enrollment.status
      })),
      totalCredits: 120, // Adjust as necessary
      completedCredits: user.enrollments.reduce((sum, enrollment) => 
        sum + (enrollment.status === 'Completed' ? enrollment.course.credits : 0), 0),
      gpa: 3.5 // Adjust as necessary
    };

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 