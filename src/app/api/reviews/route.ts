import { NextResponse } from 'next/server';
import { getApprovedReviews, insertReview } from '@/lib/db';

export async function GET() {
  try {
    const reviews = await getApprovedReviews();
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    console.error('API /api/reviews GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, location, starRating, serviceType, reviewText } = body;

    if (!customerName || !reviewText || !starRating) {
      return NextResponse.json(
        { success: false, error: 'Name, star rating, and review text are required.' },
        { status: 400 }
      );
    }

    const newReview = await insertReview({
      customerName: customerName.trim(),
      location: location?.trim(),
      starRating: Number(starRating),
      serviceType: serviceType?.trim(),
      reviewText: reviewText.trim(),
    });

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    console.error('API /api/reviews POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
