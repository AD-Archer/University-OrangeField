import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test user creation
    const testUser = await prisma.user.create({
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'hashedpassword',
        studentType: 'freshman',
      },
    });

    // Fetch the created user
    const users = await prisma.user.findMany();

    return NextResponse.json({ 
      message: 'Database connection successful',
      testUser,
      totalUsers: users.length 
    });
  } catch (error) {
    console.error('Test failed:', error);
    return NextResponse.json({ 
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 