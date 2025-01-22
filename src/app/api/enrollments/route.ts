import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId, courseId } = await req.json();

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'Enrolled'
      },
      include: {
        course: true
      }
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 