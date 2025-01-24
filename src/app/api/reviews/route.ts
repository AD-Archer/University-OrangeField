import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId, courseId, rating, comment } = await req.json();

    const review = await prisma.courseReview.create({
      data: {
        userId,
        courseId,
        rating,
        comment
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { reviewId, userId } = await req.json();

    // Verify user owns the review
    const review = await prisma.courseReview.findFirst({
      where: {
        id: reviewId,
        userId
      }
    });

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found or unauthorized' },
        { status: 404 }
      );
    }

    await prisma.courseReview.delete({
      where: { id: reviewId }
    });

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
} 