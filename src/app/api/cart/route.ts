import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Get cart items
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { course: true }
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add to cart
export async function POST(req: Request) {
  try {
    const { userId, courseId } = await req.json();

    const cartItem = await prisma.cart.create({
      data: {
        userId,
        courseId
      },
      include: {
        course: true
      }
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 