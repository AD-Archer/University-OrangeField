import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(req: Request) {
  try {
    const { enrollmentId, status } = await req.json();

    const enrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { status },
      include: {
        course: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error('Error updating enrollment status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 