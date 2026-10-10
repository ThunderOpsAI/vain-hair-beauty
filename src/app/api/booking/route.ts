import { NextResponse } from 'next/server';
import { insertBooking } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, category, hairLength, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    const booking = await insertBooking({
      name,
      phone,
      service,
      category,
      hairLength,
      notes,
    });

    return NextResponse.json({ success: true, id: booking?.id || 'confirmed' }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}
