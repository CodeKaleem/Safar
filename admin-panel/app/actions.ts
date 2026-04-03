"use server"

import { supabase } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';

// Update core trip info
export async function updateTrip(slug: string, formData: FormData) {
  const title = formData.get('title') as string;
  const days = formData.get('days') as string;
  const budget = formData.get('budget') as string;
  const type = formData.get('type') as string;
  const desc = formData.get('desc') as string;

  const { error } = await supabase
    .from('trips')
    .update({ title, days, budget, type, desc })
    .eq('slug', slug);

  if (error) throw new Error(error.message);
  revalidatePath(`/trips/${slug}`);
  revalidatePath('/trips');
}

// Create new trip
export async function createTrip(formData: FormData) {
  const slug = formData.get('slug') as string;
  const title = formData.get('title') as string;

  const { error } = await supabase
    .from('trips')
    .insert({
      slug, title,
      days: 'TBD', budget: 'TBD', type: 'national', desc: 'New Trip'
    });

  if (error) throw new Error(error.message);
  revalidatePath('/trips');
  return slug;
}

// Add hotel
export async function addHotel(trip_slug: string, formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const desc = formData.get('desc') as string;
  const img = formData.get('img') as string;

  const { error } = await supabase
    .from('hotels')
    .insert({ id, trip_slug, name, desc, img });

  if (error) throw new Error(error.message);
  revalidatePath(`/trips/${trip_slug}`);
}

// Delete hotel
export async function deleteHotel(hotel_id: string, trip_slug: string) {
  const { error } = await supabase.from('hotels').delete().eq('id', hotel_id);
  if (error) throw new Error(error.message);
  revalidatePath(`/trips/${trip_slug}`);
}

// Add gallery image
export async function addGalleryImage(trip_slug: string, image_url: string, display_order: number) {
  const { error } = await supabase
    .from('trip_gallery')
    .insert({ trip_slug, image_url, display_order });

  if (error) throw new Error(error.message);
  revalidatePath(`/trips/${trip_slug}`);
}

// Delete gallery image
export async function deleteGalleryImage(id: string, trip_slug: string) {
  const { error } = await supabase.from('trip_gallery').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath(`/trips/${trip_slug}`);
}

// Delete review
export async function deleteReview(id: string) {
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/reviews');
}
