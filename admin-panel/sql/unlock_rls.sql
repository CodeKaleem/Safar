-- IMPORTANT: Run this in your Supabase Dashboard SQL Editor ONLY IF 
-- you haven't successfully connected the `SUPABASE_SERVICE_ROLE_KEY` 
-- and want to allow the Admin Panel to edit without security blocks.

-- Warning: This opens up your database logic. It's safe locally, 
-- but in production, you should rely on the Service Role Key.

CREATE POLICY "Allow public update for trips" ON trips FOR UPDATE USING (true);
CREATE POLICY "Allow public insert for trips" ON trips FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete for trips" ON trips FOR DELETE USING (true);

CREATE POLICY "Allow public insert for trip_gallery" ON trip_gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete for trip_gallery" ON trip_gallery FOR DELETE USING (true);

CREATE POLICY "Allow public insert for hotels" ON hotels FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete for hotels" ON hotels FOR DELETE USING (true);
