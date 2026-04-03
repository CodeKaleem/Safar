import { supabase } from '@/utils/supabase';
import InquiriesClient from '@/components/InquiriesClient';

export const revalidate = 0;

export default async function InquiriesPage() {
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  const pendingCount = (inquiries || []).filter(i => !i.replied).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-serif text-[#c8a96e] mb-2">Inquiries Inbox</h1>
          <p className="text-white/50 text-sm tracking-widest">
            CUSTOMER CONTACT FORM SUBMISSIONS
            {pendingCount > 0 && (
              <span className="ml-4 bg-amber-900/40 text-amber-400 border border-amber-900 text-xs px-2 py-0.5 tracking-widest">
                {pendingCount} PENDING
              </span>
            )}
          </p>
        </div>
      </div>

      <InquiriesClient initialInquiries={inquiries || []} />
    </div>
  );
}
