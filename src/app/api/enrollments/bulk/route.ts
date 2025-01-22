import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId, courseIds } = await req.json();

    // Create all enrollments in a transaction
    const enrollments = await prisma.$transaction(
      courseIds.map((courseId: string) =>
        prisma.enrollment.create({
          data: {
            userId,
            courseId,
            status: 'Enrolled'
          },
          include: {
            course: true
          }
        })
      )
    );

    return NextResponse.json(enrollments);
  } catch (error) {
    console.error('Error creating enrollments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 