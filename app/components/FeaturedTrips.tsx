"use client";
import Link from "next/link";
import { TRIPS } from "../data/trips";

export default function FeaturedTrips() {

  return (
    <section style={{
      background: "#050a12",
      padding: "100px 48px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Courier New', Courier, monospace"
    }}>
      {/* Background elements to match theme */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 1200, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)"
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "4px", marginBottom: 16 }}>
            FEATURED JOURNEYS
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900,
            color: "#fff", margin: "0", fontFamily: "'Georgia', serif",
            letterSpacing: "-0.5px",
          }}>
            Curated <span style={{ color: "#c8a96e", fontStyle: "italic" }}>Expeditions</span>
          </h2>
        </div>

        <div style={{
          display: "flex", flexDirection: "row", flexWrap: "wrap",
          gap: 32, justifyContent: "center"
        }}>
          {TRIPS.slice(0, 3).map((trip) => (
            <div key={trip.id} style={{
              flex: "1 1 350px", maxWidth: 450,
              border: "1px solid rgba(200,169,110,0.15)",
              background: "rgba(255,255,255,0.01)",
              padding: 40,
              display: "flex", flexDirection: "column",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: "pointer", position: "relative",
              bottom: 0
            }}
            onMouseEnter={e => {
              e.currentTarget.style.bottom = "8px";
              e.currentTarget.style.boxShadow = "0 30px 60px -15px rgba(200,169,110,0.1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(200,169,110,0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.bottom = "0px";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(255,255,255,0.01)";
              e.currentTarget.style.borderColor = "rgba(200,169,110,0.15)";
            }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <h3 style={{
                  color: "#fff", fontSize: 22, margin: 0,
                  fontFamily: "'Georgia', serif", lineHeight: 1.3
                }}>{trip.title}</h3>
                <div style={{
                  background: "rgba(200,169,110,0.1)", color: "#c8a96e",
                  padding: "4px 12px", fontSize: 11, fontWeight: "bold",
                  letterSpacing: "1px", borderRadius: 2
                }}>
                  {trip.days}
                </div>
              </div>

              <p style={{
                color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6,
                marginBottom: 32, flex: 1
              }}>
                {trip.desc}
              </p>

              <div style={{ borderTop: "1px dashed rgba(200,169,110,0.2)", paddingTop: 24, paddingBottom: 24 }}>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "2px", marginBottom: 8 }}>
                  ESTIMATED BUDGET
                </div>
                <div style={{ color: "#c8a96e", fontSize: 20, fontWeight: "bold", fontFamily: "'Georgia', serif" }}>
                  {trip.budget}
                </div>
              </div>

              <Link 
                href={`/trips/${trip.id}`}
                style={{
                  width: "100%", padding: "16px", background: "transparent",
                  border: "1.5px solid #c8a96e", color: "#c8a96e",
                  fontSize: 13, fontWeight: "bold", letterSpacing: "3px", textDecoration: "none",
                  cursor: "pointer", transition: "all 0.3s", boxSizing: "border-box",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#c8a96e";
                  e.currentTarget.style.color = "#050a12";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#c8a96e";
                }}
              >
                MORE DETAILS
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <Link 
            href="/all-trips"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "18px 48px", background: "transparent",
              border: "1.5px solid #c8a96e", color: "#c8a96e",
              fontSize: 14, fontWeight: "bold", letterSpacing: "3px", textDecoration: "none",
              cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#c8a96e";
              e.currentTarget.style.color = "#050a12";
              e.currentTarget.style.boxShadow = "0 15px 30px -10px rgba(200,169,110,0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#c8a96e";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            EXPLORE ALL JOURNEYS
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
