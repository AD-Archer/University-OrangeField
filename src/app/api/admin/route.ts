import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

// Middleware to check if user is admin
async function isAdmin(request: Request) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');
  
  if (!userCookie) {
    return false;
  }

  try {
    const userData = JSON.parse(userCookie.value);
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
      select: {
        isAdmin: true,
      },
    });
    
    return user?.isAdmin || false;
  } catch (error) {
    return false;
  }
}

// Create a new course
export async function POST(request: Request) {
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { code, title, description, credits, prerequisites, price } = body;

    const course = await prisma.course.create({
      data: {
        code,
        title,
        description,
        credits,
        prerequisites,
        price,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

// Delete a course
export async function DELETE(request: Request) {
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    // Delete all related records first
    await prisma.$transaction([
      prisma.enrollment.deleteMany({ where: { courseId } }),
      prisma.cart.deleteMany({ where: { courseId } }),
      prisma.courseReview.deleteMany({ where: { courseId } }),
      prisma.course.delete({ where: { id: courseId } }),
    ]);

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}

// Remove student from course
export async function PATCH(request: Request) {
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { userId, courseId } = body;

    await prisma.enrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return NextResponse.json({ message: 'Student removed from course successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove student from course' }, { status: 500 });
  }
} 