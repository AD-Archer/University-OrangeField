import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const progress = await prisma.academicProgress.findUnique({
      where: { userId },
      include: {
        enrollments: {
          include: {
            course: true
          }
        }
      }
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching academic progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch academic progress' },
      { status: 500 }
    );
  }
} 