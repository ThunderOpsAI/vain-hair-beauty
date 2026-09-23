import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { brideName, email, phone, weddingDate, venue, partySize, notes } = body;

    if (!brideName || !phone) {
      return NextResponse.json(
        { error: 'Bride name and phone number are required.' },
        { status: 400 }
      );
    }

    await sql`
      CREATE TABLE IF NOT EXISTS bridal_inquiries (
        id SERIAL PRIMARY KEY,
        bride_name TEXT NOT NULL,
        email TEXT,
        phone TEXT NOT NULL,
        wedding_date TEXT,
        venue TEXT,
        party_size INT,
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    const parsedPartySize = partySize ? parseInt(String(partySize), 10) || null : null;

    const result = await sql`
      INSERT INTO bridal_inquiries (bride_name, email, phone, wedding_date, venue, party_size, notes)
      VALUES (
        ${brideName},
        ${email || null},
        ${phone},
        ${weddingDate || null},
        ${venue || null},
        ${parsedPartySize},
        ${notes || null}
      )
      RETURNING id;
    `;

    const id = result[0]?.id;
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating bridal inquiry:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create bridal inquiry' },
      { status: 500 }
    );
  }
}
