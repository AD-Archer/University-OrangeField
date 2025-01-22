import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId, courseId } = await req.json();

    // Update enrollment status to 'Unenrollment Requested'
    const enrollment = await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      },
      data: {
        status: 'Unenrollment Requested'
      }
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error('Error requesting unenrollment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 