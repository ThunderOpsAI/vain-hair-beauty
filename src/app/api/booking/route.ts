import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, category } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        service TEXT NOT NULL,
        category TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    const result = await sql`
      INSERT INTO bookings (name, phone, service, category)
      VALUES (${name}, ${phone}, ${service || 'signature-cut'}, ${category || 'styling'})
      RETURNING id;
    `;

    const id = result[0]?.id;
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}
