import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';

export async function PUT(req: Request) {
  try {
    const { id, firstName, lastName, currentPassword, newPassword } = await req.json();

    // If changing password, verify current password
    if (newPassword) {
      const user = await prisma.user.findUnique({
        where: { id },
        select: { password: true }
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const isValid = await compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {
      firstName,
      lastName,
    };

    if (newPassword) {
      updateData.password = await hash(newPassword, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 