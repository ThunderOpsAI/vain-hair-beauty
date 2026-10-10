import { NextResponse } from 'next/server';
import { insertBridalInquiry } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { brideName, email, phone, weddingDate, venue, partySize, notes } = body;

    if (!brideName || !phone) {
      return NextResponse.json(
        { success: false, error: 'Bride name and phone number are required.' },
        { status: 400 }
      );
    }

    const inquiry = await insertBridalInquiry({
      brideName,
      email,
      phone,
      weddingDate,
      venue,
      partySize,
      notes,
    });

    return NextResponse.json({ success: true, id: inquiry?.id || 'received' }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating bridal inquiry:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create bridal inquiry' },
      { status: 500 }
    );
  }
}
