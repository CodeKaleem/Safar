import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Since this is a script, we need to load env vars manually if not using Next.js runtime
import { loadEnvConfig } from '@next/env';
const projectDir = path.resolve(process.cwd());
loadEnvConfig(projectDir);

import { TRIPS } from '../app/data/trips';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key to bypass RLS if you have it, otherwise publishable key works 
// if you temporarily turn off RLS or add insert policies for public.
// Since we are inserting data, we'll try with the publishable key.
// But wait, the public policy we added in schema.sql is only for SELECT. 
// We would need to add an INSERT policy for trips, hotels, galleries, or run this with Service Role!
// IMPORTANT: If this fails with 401/403, please use the SUPABASE_SERVICE_ROLE_KEY or temporarily enable public INSERT on trips, hotels, and trip_gallery.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env.local!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting data migration...");

  for (const trip of TRIPS) {
    console.log(`Processing trip: ${trip.title}...`);

    // 1. Insert Trip
    const { error: tripError } = await supabase
      .from('trips')
      .upsert({
        slug: trip.id,
        title: trip.title,
        days: trip.days,
        budget: trip.budget,
        desc: trip.desc,
        type: trip.type
      });

    if (tripError) {
      console.error(`Error inserting trip ${trip.title}:`, tripError.message);
      continue;
    }

    // 2. Insert Gallery
    const galleryItems = trip.gallery.map((img, index) => ({
      trip_slug: trip.id,
      image_url: img,
      display_order: index
    }));

    // Before inserting, we could delete existing to avoid duplicates easily on re-runs
    await supabase.from('trip_gallery').delete().eq('trip_slug', trip.id);

    const { error: galleryError } = await supabase
      .from('trip_gallery')
      .insert(galleryItems);

    if (galleryError) {
      console.error(`Error inserting gallery for ${trip.title}:`, galleryError.message);
    }

    // 3. Insert Hotels
    const hotelItems = trip.hotels.map(h => ({
      id: h.id,
      trip_slug: trip.id,
      name: h.name,
      desc: h.desc,
      img: h.img
    }));

    await supabase.from('hotels').delete().eq('trip_slug', trip.id);

    const { error: hotelError } = await supabase
      .from('hotels')
      .insert(hotelItems);

    if (hotelError) {
      console.error(`Error inserting hotels for ${trip.title}:`, hotelError.message);
    }
  }

  console.log("Migration complete!");
}

seed();
