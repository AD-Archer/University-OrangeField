import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const department = searchParams.get('department');

  try {
    const courses = await prisma.course.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { code: { contains: query, mode: 'insensitive' } }
            ]
          },
          department ? { code: { startsWith: department } } : {}
        ]
      },
      orderBy: { code: 'asc' }
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error searching courses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 