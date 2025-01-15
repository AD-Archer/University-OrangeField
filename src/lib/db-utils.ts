import { PrismaClient } from '@prisma/client';
import { cache } from 'react';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

export const getUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      studentId: true,
      facultyId: true,
      phoneNumber: true,
      department: true,
    },
  });

  return user;
});

export const getCurrentUser = cache(async () => {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}); 