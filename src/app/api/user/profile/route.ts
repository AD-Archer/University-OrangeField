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

// Add PUT endpoint for profile updates
export async function PUT(req: Request) {
  try {
    const { userId, firstName, lastName, phoneNumber, address } = await req.json();

    // First check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName || null,
        lastName: lastName || null,
        phoneNumber: phoneNumber || null,
        address: address || null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        address: true,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 