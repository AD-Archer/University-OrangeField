import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await req.json();
    const { courseId } = params;

    await prisma.cart.delete({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });

    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 