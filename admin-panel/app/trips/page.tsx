import { supabase } from '@/utils/supabase';
import Link from 'next/link';

export const revalidate = 0; // ensure fresh data

export default async function TripsPage() {
  const { data: trips } = await supabase.from('trips').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-serif text-[#c8a96e] mb-2">Expeditions Management</h1>
          <p className="text-white/50 text-sm tracking-widest">VIEW AND UPDATE JOURNEYS</p>
        </div>
        <Link href="/trips/new" className="bg-[#c8a96e] text-black hover:bg-white px-6 py-2 tracking-widest text-sm font-bold transition-colors">
          + NEW FORMATION
        </Link>
      </div>

      <div className="border border-[#c8a96e]/20 bg-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-[#c8a96e]/10 text-white/50 border-b border-[#c8a96e]/20 text-xs tracking-widest">
            <tr>
              <th className="p-4 font-normal">SLUG / ID</th>
              <th className="p-4 font-normal">TITLE</th>
              <th className="p-4 font-normal">DURATION</th>
              <th className="p-4 font-normal">BUDGET</th>
              <th className="p-4 font-normal text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {(trips || []).map((trip) => (
              <tr key={trip.slug} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-[#c8a96e]">{trip.slug}</td>
                <td className="p-4 text-white">{trip.title}</td>
                <td className="p-4">{trip.days}</td>
                <td className="p-4">{trip.budget}</td>
                <td className="p-4 text-right">
                  {/* For brevity in the MVP, we just show viewing. Editing can be complex form. */}
                  <Link href={`/trips/${trip.slug}`} className="text-[#c8a96e] hover:text-white transition-colors text-xs tracking-widest border border-[#c8a96e] px-4 py-2 hover:bg-[#c8a96e]">
                    EDIT
                  </Link>
                </td>
              </tr>
            ))}
            {(!trips || trips.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/30">No trips found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
