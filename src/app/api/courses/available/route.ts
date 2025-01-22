import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get all courses
    const allCourses = await prisma.course.findMany();

    // Get user's enrolled course IDs
    const enrolledCourses = await prisma.enrollment.findMany({
      where: { userId },
      select: { courseId: true }
    });

    const enrolledCourseIds = new Set(enrolledCourses.map(e => e.courseId));

    // Filter out enrolled courses
    const availableCourses = allCourses.filter(course => !enrolledCourseIds.has(course.id));

    return NextResponse.json(availableCourses);
  } catch (error) {
    console.error('Error fetching available courses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 