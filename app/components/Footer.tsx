import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-section" style={{
      background: "#03060a", // slightly darker than main #050a12 for distinction
      color: "#fff",
      fontFamily: "'Courier New', Courier, monospace",
      padding: "60px 48px 32px",
      borderTop: "1px solid rgba(200,169,110,0.15)",
      position: "relative"
    }}>
      <div className="footer-container" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between", marginBottom: 60 }}>
        
        {/* Brand */}
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{
            color: "#c8a96e", fontFamily: "'Georgia', serif", margin: "0 0 16px",
            fontSize: 24, fontStyle: "italic", letterSpacing: "1px"
          }}>
            Safar<span style={{ color: "#fff", fontStyle: "normal" }}>Travel</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.8, maxWidth: 300 }}>
            Curating luxury journeys and exclusive expeditions across the breathtaking landscapes of Pakistan.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#fff", fontSize: 12, letterSpacing: "3px", marginBottom: 20, fontWeight: "bold" }}>EXPEDITIONS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href="/trips/skardu" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 13 }}>Skardu Journey</Link>
              <Link href="/trips/naran" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 13 }}>Naran Valley</Link>
              <Link href="/trips/northern" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 13 }}>Northern Explorer</Link>
            </div>
          </div>
          
          <div>
            <div style={{ color: "#fff", fontSize: 12, letterSpacing: "3px", marginBottom: 20, fontWeight: "bold" }}>COMPANY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 13 }}>About Us</Link>
              <Link href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 13 }}>Journal</Link>
              <Link href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 13 }}>Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{
        maxWidth: 1200, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.05)",
        paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16
      }}>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "1px" }}>
          &copy; {new Date().getFullYear()} SAFAR TRAVEL. ALL RIGHTS RESERVED.
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 11, letterSpacing: "1px" }}>PRIVACY</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 11, letterSpacing: "1px" }}>TERMS</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-section { padding: 40px 24px 24px !important; }
          .footer-container { gap: 40px !important; flex-direction: column !important; }
          .footer-bottom { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
