import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TripBasicForm from '@/components/TripBasicForm';
import GalleryManager from '@/components/GalleryManager';
import HotelManager from '@/components/HotelManager';

export default async function TripEditPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const { data: trip } = await supabase
    .from('trips')
    .select('*, trip_gallery(*), hotels(*)')
    .eq('slug', slug)
    .single();

  if (!trip) return notFound();

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-serif text-[#c8a96e] mb-2">Edit Expedition</h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">{trip.title}</p>
        </div>
        <Link href="/trips" className="text-[#c8a96e] hover:text-white border border-[#c8a96e] px-6 py-2 tracking-widest text-sm transition-colors">
          RETURN TO EXPEDITIONS
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        
        {/* Left Col: Basics & Gallery */}
        <div className="flex flex-col gap-12">
          
          <section className="bg-white/5 border border-[#c8a96e]/20 p-8 rounded-sm">
            <h2 className="text-xl font-serif text-[#c8a96e] mb-6">Core Details</h2>
            <TripBasicForm trip={trip} />
          </section>

          <section className="bg-white/5 border border-[#c8a96e]/20 p-8 rounded-sm">
            <h2 className="text-xl font-serif text-[#c8a96e] mb-2">Media Gallery</h2>
            <p className="text-white/40 text-xs tracking-widest mb-6">MANAGE THE IMAGE CAROUSEL</p>
            <GalleryManager tripSlug={trip.slug} gallery={trip.trip_gallery || []} />
          </section>

        </div>

        {/* Right Col: Hotels */}
        <div className="flex flex-col gap-12">
          <section className="bg-white/5 border border-[#c8a96e]/20 p-8 rounded-sm">
            <h2 className="text-xl font-serif text-[#c8a96e] mb-2">Associated Accommodations</h2>
            <p className="text-white/40 text-xs tracking-widest mb-6">CURATED HOTELS FOR THIS JOURNEY</p>
            <HotelManager tripSlug={trip.slug} hotels={trip.hotels || []} />
          </section>
        </div>

      </div>
    </div>
  );
}
