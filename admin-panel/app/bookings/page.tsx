import { supabase } from '@/utils/supabase';

export const revalidate = 0;

export default async function BookingsPage() {
  const { data: bookings } = await supabase.from('bookings').select('*, trips(title), hotels(name)').order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-serif text-[#c8a96e] mb-2">Bookings Registry</h1>
          <p className="text-white/50 text-sm tracking-widest">REVIEW CLIENT EXPEDITION REQUESTS</p>
        </div>
      </div>

      <div className="border border-[#c8a96e]/20 bg-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-[#c8a96e]/10 text-white/50 border-b border-[#c8a96e]/20 text-xs tracking-widest">
            <tr>
              <th className="p-4 font-normal">DATE</th>
              <th className="p-4 font-normal">CLIENT</th>
              <th className="p-4 font-normal">CONTACT</th>
              <th className="p-4 font-normal">EXPEDITION</th>
              <th className="p-4 font-normal">HOTEL</th>
              <th className="p-4 font-normal">GUESTS</th>
            </tr>
          </thead>
          <tbody>
            {(bookings || []).map((booking) => (
              <tr key={booking.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="p-4 whitespace-nowrap">
                  {new Date(booking.created_at).toLocaleDateString()}
                  <div className="text-xs text-white/40">{new Date(booking.created_at).toLocaleTimeString()}</div>
                </td>
                <td className="p-4 text-white font-medium">{booking.full_name}</td>
                <td className="p-4">
                  <div>{booking.email}</div>
                  <div className="text-xs text-[#c8a96e]">{booking.phone}</div>
                </td>
                <td className="p-4 text-[#c8a96e]">{booking.trips?.title}</td>
                <td className="p-4">{booking.hotels?.name || <span className="text-white/30 italic">Not Required</span>}</td>
                <td className="p-4">{booking.guests}</td>
              </tr>
            ))}
            {(!bookings || bookings.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-white/30">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
