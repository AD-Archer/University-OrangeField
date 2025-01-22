import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            course: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Format the response to match your existing structure
    const userProfile = {
      enrolledCourses: user.enrollments.map(enrollment => ({
        ...enrollment.course,
        status: enrollment.status
      })),
      totalCredits: 120, // You might want to make this configurable
      completedCredits: user.enrollments.reduce((sum, enrollment) => 
        sum + (enrollment.status === 'Completed' ? enrollment.course.credits : 0), 0),
      gpa: 3.5 // You might want to calculate this based on grades
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