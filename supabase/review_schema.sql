-- 1. Create Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    trip_taken TEXT,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for the table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the reviews
CREATE POLICY "Allow public read-only access for reviews" ON reviews FOR SELECT USING (true);

-- Allow public to insert reviews (for when you build that feature)
CREATE POLICY "Allow public insert for reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update for reviews" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Allow public delete for reviews" ON reviews FOR DELETE USING (true);

-- 2. Insert Dummy Data (Seed)
INSERT INTO reviews (author_name, trip_taken, content, rating)
VALUES 
    ('Sarah Jenkins', 'Islamabad to Skardu', 'An absolutely breathtaking experience! The views of the Karakoram Highway were surreal, and the accommodations were incredibly luxurious. SafarTravel handled all the logistics flawlessly.', 5),
    ('Ahmed Raza', 'Dubai to Abu Dhabi', 'Very professional service. The curated hotels were magnificent, especially the Emirates Palace. Our travel concierge was helpful every step of the way. Highly recommended!', 5),
    ('Emily Chen', 'Zurich to Swiss Alps', 'The Glacier Express journey was perfect. Everything from the dining to the breathtaking snow-capped views was exactly what I was hoping for. Worth every penny.', 4);
