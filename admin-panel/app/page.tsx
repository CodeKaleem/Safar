import { supabase } from '@/utils/supabase';

export default async function Dashboard() {
  const { count: tripCount } = await supabase.from('trips').select('*', { count: 'exact', head: true });
  const { count: bookingCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
  const { count: hotelCount } = await supabase.from('hotels').select('*', { count: 'exact', head: true });
  const { count: inquiryCount } = await supabase.from('inquiries').select('*', { count: 'exact', head: true });

  const stats = [
    { label: "Active Expeditions", value: tripCount ?? 0 },
    { label: "Total Bookings", value: bookingCount ?? 0 },
    { label: "Curated Hotels", value: hotelCount ?? 0 },
    { label: "Pending Inquiries", value: inquiryCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif text-[#c8a96e] mb-2">Overview</h1>
      <p className="text-white/50 text-sm tracking-widest mb-12">SYSTEM STATUS AND QUICK METRICS</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="border border-[#c8a96e]/20 bg-white/5 p-6 rounded-sm">
            <div className="text-white/40 text-xs tracking-widest mb-4 uppercase">{stat.label}</div>
            <div className="text-4xl font-serif text-white">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
