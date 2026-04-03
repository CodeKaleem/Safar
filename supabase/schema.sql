-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Trips Table
CREATE TABLE trips (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    days TEXT NOT NULL,
    budget TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Trip Gallery Table
CREATE TABLE trip_gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_slug TEXT REFERENCES trips(slug) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Hotels Table
CREATE TABLE hotels (
    id TEXT PRIMARY KEY,
    trip_slug TEXT REFERENCES trips(slug) ON DELETE CASCADE,
    name TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    img TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_slug TEXT REFERENCES trips(slug) ON DELETE CASCADE,
    hotel_id TEXT REFERENCES hotels(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    guests INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Inquiries Table (Contact Us)
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- set up Row Level Security (RLS) policies

-- Enable RLS for all tables
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Trips, Gallery, and Hotels: Anyone can read (public access)
CREATE POLICY "Allow public read-only access for trips" ON trips FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for trip_gallery" ON trip_gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for hotels" ON hotels FOR SELECT USING (true);

-- Bookings and Inquiries: Anyone can insert, but only authenticated users (admins) can read.
CREATE POLICY "Allow public insert for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Optional: If you will use Supabase Auth for an admin dashboard later, 
-- you might want admins to manage trips. We won't add admin policies yet broadly,
-- but the above ensures the app works properly.
