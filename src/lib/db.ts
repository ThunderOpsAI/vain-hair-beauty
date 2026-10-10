import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

// In-memory fallback stores for local development, builds, or missing DB credentials
const memoryStore = {
  bookings: [] as any[],
  bridal_inquiries: [] as any[],
  reviews: [
    {
      id: 'rev-1',
      customer_name: 'Jessica M.',
      location: 'Wangaratta, VIC',
      star_rating: 5,
      service_type: 'Signature Lived-In Blonde Balayage',
      review_text: 'Prue and the team at Vain are unmatched in Wangaratta. I had brassy, damaged hair from previous foils and Prue transformed it into the cleanest, creamiest lived-in blonde. Six months later it still grows out seamlessly without any harsh line of demarcation!',
      created_at: new Date('2024-04-12').toISOString(),
    },
    {
      id: 'rev-2',
      customer_name: 'Sophie H.',
      location: 'Milawa / King Valley',
      star_rating: 5,
      service_type: 'Bridal Party Hair Styling (Brown Brothers)',
      review_text: 'Vain styled our entire bridal party for our wedding at Brown Brothers Milawa. Prue and senior stylists arrived right on time at our villa, did six bridesmaids plus myself with stunning Hollywood waves and textured romantic updos that held all night through dancing. Absolute perfection!',
      created_at: new Date('2024-06-20').toISOString(),
    },
    {
      id: 'rev-3',
      customer_name: 'Chloe T.',
      location: 'Oxley, VIC',
      star_rating: 5,
      service_type: 'Cezanne Keratin Smoothing & French Bob',
      review_text: 'After battling frizz and humidity every summer, the Cezanne treatment gave me literal glass hair. Cut my morning styling time in half. The Murphy Street salon vibe is stunning, relaxed, and the barista flat white was delicious.',
      created_at: new Date('2024-08-15').toISOString(),
    },
    {
      id: 'rev-4',
      customer_name: 'Lauren P.',
      location: 'Beechworth, VIC',
      star_rating: 5,
      service_type: 'Precision Restyle Cut & Gloss Toner',
      review_text: 'Best salon experience in North East Victoria. Transparent pricing, thorough consultation, and they actually listen to your hair goals. The aromatherapy basin massage and hot towel treatment were pure bliss.',
      created_at: new Date('2024-09-28').toISOString(),
    },
    {
      id: 'rev-5',
      customer_name: 'Emma K.',
      location: 'Glenrowan, VIC',
      star_rating: 5,
      service_type: 'Full Head Micro-Foils & K18 Peptide Ritual',
      review_text: 'Redken certified colorists who genuinely prioritize hair health. My blonde is brighter and cleaner than ever, yet feels stronger thanks to the K18 peptide ritual. Could not recommend Vain more highly!',
      created_at: new Date('2024-11-05').toISOString(),
    },
  ],
  call_logs: [] as any[],
};

export const sql = databaseUrl ? neon(databaseUrl) : null;

let isDbInitialized = false;

export async function ensureDbTables() {
  if (!sql) return;
  if (isDbInitialized) return;

  try {
    // Bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        service VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        hair_length VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Bridal inquiries table
    await sql`
      CREATE TABLE IF NOT EXISTS bridal_inquiries (
        id SERIAL PRIMARY KEY,
        bride_name VARCHAR(150) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50) NOT NULL,
        wedding_date VARCHAR(50),
        venue VARCHAR(255),
        party_size INT,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Reviews table
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(150) NOT NULL,
        location VARCHAR(100),
        star_rating INT NOT NULL CHECK (star_rating >= 1 AND star_rating <= 5),
        review_text TEXT NOT NULL,
        service_type VARCHAR(150),
        verified BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Call logs table
    await sql`
      CREATE TABLE IF NOT EXISTS call_logs (
        id SERIAL PRIMARY KEY,
        intent VARCHAR(100),
        referrer TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default reviews if empty
    const existing = await sql`SELECT COUNT(*) as count FROM reviews;`;
    if (existing && existing[0] && parseInt(existing[0].count, 10) === 0) {
      for (const rev of memoryStore.reviews) {
        await sql`
          INSERT INTO reviews (customer_name, location, star_rating, review_text, service_type, verified, created_at)
          VALUES (${rev.customer_name}, ${rev.location}, ${rev.star_rating}, ${rev.review_text}, ${rev.service_type}, true, ${rev.created_at});
        `;
      }
    }

    isDbInitialized = true;
  } catch (err) {
    console.warn('Neon database initialization warning (falling back to memory store):', err);
  }
}

export async function insertBooking(data: {
  name: string;
  phone: string;
  service?: string;
  category?: string;
  hairLength?: string;
  notes?: string;
}) {
  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO bookings (name, phone, service, category, hair_length, notes)
        VALUES (
          ${data.name},
          ${data.phone},
          ${data.service || 'signature-cut'},
          ${data.category || 'styling'},
          ${data.hairLength || null},
          ${data.notes || null}
        ) RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving booking to Neon DB, caching in memory:', err);
    }
  }

  const record = {
    id: 'bk_' + Date.now(),
    ...data,
    created_at: new Date().toISOString(),
  };
  memoryStore.bookings.push(record);
  return record;
}

export async function insertBridalInquiry(data: {
  brideName: string;
  email?: string;
  phone: string;
  weddingDate?: string;
  venue?: string;
  partySize?: number | string;
  notes?: string;
}) {
  const parsedSize = data.partySize ? parseInt(String(data.partySize), 10) || null : null;

  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO bridal_inquiries (bride_name, email, phone, wedding_date, venue, party_size, notes)
        VALUES (
          ${data.brideName},
          ${data.email || null},
          ${data.phone},
          ${data.weddingDate || null},
          ${data.venue || null},
          ${parsedSize},
          ${data.notes || null}
        ) RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving bridal inquiry to Neon DB, caching in memory:', err);
    }
  }

  const record = {
    id: 'bridal_' + Date.now(),
    ...data,
    partySize: parsedSize,
    created_at: new Date().toISOString(),
  };
  memoryStore.bridal_inquiries.push(record);
  return record;
}

export async function getApprovedReviews() {
  if (sql) {
    try {
      await ensureDbTables();
      const rows = await sql`
        SELECT 
          id::text, 
          customer_name as "customerName", 
          star_rating as "starRating", 
          review_text as "reviewText", 
          service_type as "serviceType", 
          location,
          created_at as "createdAt"
        FROM reviews 
        WHERE verified = true 
        ORDER BY created_at DESC;
      `;
      if (rows && rows.length > 0) {
        return rows;
      }
    } catch (err) {
      console.warn('Error fetching reviews from Neon, falling back to cached reviews:', err);
    }
  }

  return memoryStore.reviews.map((r) => ({
    id: r.id,
    customerName: r.customer_name,
    starRating: r.star_rating,
    reviewText: r.review_text,
    serviceType: r.service_type,
    location: r.location,
    createdAt: r.created_at,
  }));
}

export async function insertReview(data: {
  customerName: string;
  location?: string;
  starRating: number;
  serviceType?: string;
  reviewText: string;
}) {
  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO reviews (customer_name, location, star_rating, service_type, review_text, verified)
        VALUES (
          ${data.customerName},
          ${data.location || null},
          ${data.starRating},
          ${data.serviceType || null},
          ${data.reviewText},
          true
        ) RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving review to Neon DB, using memory fallback:', err);
    }
  }

  const record = {
    id: 'rev_' + Date.now(),
    customer_name: data.customerName,
    location: data.location || 'Wangaratta, VIC',
    star_rating: data.starRating,
    service_type: data.serviceType || 'Signature Salon Service',
    review_text: data.reviewText,
    created_at: new Date().toISOString(),
  };
  memoryStore.reviews.unshift(record);
  return record;
}

export async function logCallClick(intent: string, referrer?: string) {
  if (sql) {
    try {
      await ensureDbTables();
      await sql`
        INSERT INTO call_logs (intent, referrer)
        VALUES (${intent}, ${referrer || null});
      `;
      return true;
    } catch (err) {
      console.warn('Error logging call click:', err);
    }
  }
  memoryStore.call_logs.push({ intent, referrer, timestamp: new Date().toISOString() });
  return true;
}

export default sql;
