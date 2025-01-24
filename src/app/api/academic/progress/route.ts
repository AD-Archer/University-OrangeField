import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        academicProgress: true,
        enrollments: {
          include: {
            course: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const response = {
      ...user.academicProgress,
      enrollments: user.enrollments
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching academic progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch academic progress' },
      { status: 500 }
    );
  }
} 