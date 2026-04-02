export default function AboutUs() {
  return (
    <section style={{
      background: "#050a12",
      padding: "100px 48px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Courier New', Courier, monospace"
    }}>
      {/* Background line separator */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 1200, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)"
      }} />

      <div className="about-container" style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}>
        
        {/* Left Content */}
        <div style={{ flex: "1 1 500px" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "4px", marginBottom: 16 }}>
            OUR HERITAGE
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900,
            color: "#fff", margin: "0 0 32px", fontFamily: "'Georgia', serif",
            letterSpacing: "-0.5px",
          }}>
            Redefining <span style={{ color: "#c8a96e", fontStyle: "italic" }}>Exploration</span>
          </h2>
          
          <p style={{
            color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8,
            marginBottom: 24
          }}>
            At Safar Travel, we believe that a journey is more than just reaching a destination. It is the pursuit of the extraordinary, the appreciation of untamed beauty, and the seamless blend of rugged adventure with uncompromising luxury.
          </p>
          <p style={{
            color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8,
            marginBottom: 40
          }}>
            Curating exclusive expeditions across Pakistan’s most breathtaking landscapes, our mission is to deliver experiences that leave an indelible mark on your soul. From the towering peaks of the Karakoram to the serene valleys of Kaghan, your expedition awaits.
          </p>

          <div className="about-stats" style={{ display: "flex", gap: 40, justifyContent: "space-between" }}>
            <div>
              <div className="stat-number" style={{ color: "#c8a96e", fontSize: 32, fontFamily: "'Georgia', serif", fontWeight: "bold" }}>15+</div>
              <div className="stat-label" style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "2px", marginTop: 8 }}>YEARS EXP.</div>
            </div>
            <div>
              <div className="stat-number" style={{ color: "#c8a96e", fontSize: 32, fontFamily: "'Georgia', serif", fontWeight: "bold" }}>50+</div>
              <div className="stat-label" style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "2px", marginTop: 8 }}>LOCATIONS</div>
            </div>
            <div>
              <div className="stat-number" style={{ color: "#c8a96e", fontSize: 32, fontFamily: "'Georgia', serif", fontWeight: "bold" }}>10k</div>
              <div className="stat-label" style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "2px", marginTop: 8 }}>EXPLORERS</div>
            </div>
          </div>
        </div>

        {/* Right Geometric Design (Instead of image) */}
        <div style={{ flex: "1 1 400px", position: "relative", display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "100%", maxWidth: 400, aspectRatio: "4/5",
            border: "1px solid rgba(200,169,110,0.3)",
            position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
            background: "radial-gradient(circle at center, rgba(200,169,110,0.05) 0%, transparent 70%)"
          }}>
             {/* Offset Border accent */}
             <div style={{
               position: "absolute", top: 20, right: -20, bottom: -20, left: 20,
               border: "1px solid rgba(200,169,110,0.1)", zIndex: -1
             }} />
             
             {/* Simple Compass/Abstract SVG */}
             <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="rgba(200,169,110,0.5)" strokeWidth="1">
               <circle cx="60" cy="60" r="50" strokeDasharray="4 4" />
               <circle cx="60" cy="60" r="30" />
               <path d="M60 10 L60 30 M60 90 L60 110 M10 60 L30 60 M90 60 L110 60" />
               <polygon points="60,35 65,55 85,60 65,65 60,85 55,65 35,60 55,55" fill="rgba(200,169,110,0.2)" stroke="#c8a96e" />
             </svg>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .about-container {
            gap: 40px !important;
          }
          .about-stats {
            gap: 16px !important;
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
          }
          .stat-number {
            fontSize: 24px !important;
          }
          .stat-label {
            fontSize: 9px !important;
            letter-spacing: 1px !important;
          }
        }
      `}</style>
    </section>
  );
}
