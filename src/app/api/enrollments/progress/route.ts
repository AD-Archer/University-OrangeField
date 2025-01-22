import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true
      }
    });

    const progress = {
      totalCredits: 120, // This could be configurable
      completedCredits: enrollments.reduce((sum, enrollment) => 
        sum + (enrollment.status === 'Completed' ? enrollment.course.credits : 0), 0),
      enrolledCredits: enrollments.reduce((sum, enrollment) => 
        sum + enrollment.course.credits, 0),
      gpa: 3.5, // This should be calculated based on grades
      enrollments: enrollments
    };

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 