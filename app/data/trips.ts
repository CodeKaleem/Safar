export interface Hotel {
  id: string;
  name: string;
  desc: string;
  img: string;
}

export interface Trip {
  id: string;
  title: string;
  days: string;
  budget: string;
  desc: string;
  type: "national" | "abroad";
  gallery: string[];
  hotels: Hotel[];
}

import { supabase } from '@/utils/supabase';

export async function getTrips(): Promise<Trip[]> {
  const { data: tripsData, error } = await supabase
    .from('trips')
    .select(`
      slug, title, days, budget, "desc", type,
      trip_gallery(image_url, display_order),
      hotels(id, name, "desc", img)
    `);

  if (error || !tripsData) {
    console.error("Error fetching trips:", error);
    return [];
  }

  return tripsData.map(t => {
    // Sort gallery by display_order just in case
    const sortedGallery = (t.trip_gallery as any[])
      .sort((a, b) => a.display_order - b.display_order)
      .map(g => g.image_url);

    return {
      id: t.slug,
      title: t.title,
      days: t.days,
      budget: t.budget,
      desc: t.desc,
      type: t.type as "national" | "abroad",
      gallery: sortedGallery,
      hotels: t.hotels as Hotel[]
    };
  });
}

export async function getTripById(id: string): Promise<Trip | null> {
  const { data: t, error } = await supabase
    .from('trips')
    .select(`
      slug, title, days, budget, "desc", type,
      trip_gallery(image_url, display_order),
      hotels(id, name, "desc", img)
    `)
    .eq('slug', id)
    .single();

  if (error || !t) return null;

  const sortedGallery = (t.trip_gallery as any[])
    .sort((a, b) => a.display_order - b.display_order)
    .map(g => g.image_url);

  return {
    id: t.slug,
    title: t.title,
    days: t.days,
    budget: t.budget,
    desc: t.desc,
    type: t.type as "national" | "abroad",
    gallery: sortedGallery,
    hotels: t.hotels as Hotel[]
  };
}
