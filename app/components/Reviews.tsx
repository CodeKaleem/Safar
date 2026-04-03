import { supabase } from '@/utils/supabase';

// Star icon SVG component to maintain the golden aesthetic
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg 
    width="16" height="16" viewBox="0 0 24 24" 
    fill={filled ? "#c8a96e" : "none"} 
    stroke="#c8a96e" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default async function Reviews() {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error || !reviews || reviews.length === 0) {
    return null; // Fail gracefully if table isn't created yet or empty
  }

  return (
    <section style={{
      background: "#050a12",
      padding: "100px 48px",
      position: "relative",
      fontFamily: "'Courier New', Courier, monospace"
    }}>
      <style>{`
        .review-card {
          flex: 1 1 350px;
          max-width: 450px;
          border: 1px solid rgba(200,169,110,0.15);
          background: rgba(255,255,255,0.01);
          padding: 40px;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(0);
        }
        .review-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px -15px rgba(200,169,110,0.1);
          background: rgba(255,255,255,0.03);
          border-color: rgba(200,169,110,0.4);
        }
      `}</style>
      
      {/* Decorative border top */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 1200, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)"
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "4px", marginBottom: 16 }}>
            CLIENT EXPERIENCES
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900,
            color: "#fff", margin: "0", fontFamily: "'Georgia', serif",
            letterSpacing: "-0.5px",
          }}>
            Traveler <span style={{ color: "#c8a96e", fontStyle: "italic" }}>Testimonials</span>
          </h2>
        </div>

        <div style={{
          display: "flex", flexDirection: "row", flexWrap: "wrap",
          gap: 32, justifyContent: "center"
        }}>
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              
              <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= review.rating} />
                ))}
              </div>

              <p style={{
                color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8,
                marginBottom: 32, flex: 1, fontStyle: "italic"
              }}>
                "{review.content}"
              </p>

              <div style={{ borderTop: "1px dashed rgba(200,169,110,0.2)", paddingTop: 24 }}>
                <div style={{ color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "'Georgia', serif", marginBottom: 4 }}>
                  {review.author_name}
                </div>
                {review.trip_taken && (
                  <div style={{ color: "#c8a96e", fontSize: 11, letterSpacing: "1px" }}>
                    {review.trip_taken}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
