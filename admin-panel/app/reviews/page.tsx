import { supabase } from '@/utils/supabase';
import { deleteReview } from '@/app/actions';

export const revalidate = 0;

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#c8a96e" : "none"} stroke="#c8a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default async function ReviewsAdminPage() {
  const { data: reviews } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-serif text-[#c8a96e] mb-2">Customer Reviews</h1>
          <p className="text-white/50 text-sm tracking-widest">MODERATE TESTIMONIALS SHOWN ON HOME PAGE</p>
        </div>
      </div>

      <div className="border border-[#c8a96e]/20 bg-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-[#c8a96e]/10 text-white/50 border-b border-[#c8a96e]/20 text-xs tracking-widest">
            <tr>
              <th className="p-4 font-normal">DATE / RATING</th>
              <th className="p-4 font-normal">CUSTOMER</th>
              <th className="p-4 font-normal w-1/2">REVIEW CONTENT</th>
              <th className="p-4 font-normal text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {(reviews || []).map((review) => (
              <tr key={review.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                
                <td className="p-4 align-top">
                  <div className="mb-2 text-white/50">{new Date(review.created_at).toLocaleDateString()}</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= review.rating} />
                    ))}
                  </div>
                </td>

                <td className="p-4 align-top">
                  <div className="text-white font-bold mb-1">{review.author_name}</div>
                  <div className="text-[#c8a96e] text-xs uppercase tracking-widest">{review.trip_taken || 'General Feedback'}</div>
                </td>

                <td className="p-4 align-top text-white/60 italic leading-relaxed">
                  "{review.content}"
                </td>

                <td className="p-4 align-top text-right">
                  <form action={async () => {
                    "use server";
                    await deleteReview(review.id);
                  }}>
                    <button type="submit" className="text-red-400 hover:text-red-300 text-xs tracking-widest border border-red-900/50 px-4 py-2 bg-red-950/20 hover:bg-red-900/40 transition-colors">
                      DELETE
                    </button>
                  </form>
                </td>

              </tr>
            ))}
            {(!reviews || reviews.length === 0) && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-white/30 tracking-widest text-sm uppercase">No reviews in database.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
