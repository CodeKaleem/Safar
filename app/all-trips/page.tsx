"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getTrips, Trip } from "../data/trips";
import Footer from "../components/Footer";

export default function AllTripsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "national" | "abroad">("all");
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    getTrips().then(setTrips);
  }, []);

  const filteredTrips = trips.filter(trip => activeTab === "all" || trip.type === activeTab);

  const tabStyle = (isActive: boolean) => ({
    background: isActive ? "rgba(200,169,110,0.15)" : "transparent",
    border: `1px solid ${isActive ? "#c8a96e" : "rgba(255,255,255,0.1)"}`,
    color: isActive ? "#c8a96e" : "rgba(255,255,255,0.4)",
    padding: "10px 24px",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: "2px",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "'Courier New', Courier, monospace"
  });

  return (
    <main style={{ background: "#050a12", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <section style={{
        padding: "100px 48px",
        flex: 1,
        fontFamily: "'Courier New', Courier, monospace",
        animation: "fadeIn 0.5s ease-in"
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            fontSize: 12, letterSpacing: "2px", marginBottom: 64,
            transition: "color 0.2s"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            BACK TO HOME
          </Link>

          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "4px", marginBottom: 16 }}>
              COMPLETE CATALOG
            </div>
            <h1 style={{
              fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900,
              color: "#fff", margin: "0", fontFamily: "'Georgia', serif",
              letterSpacing: "-0.5px",
            }}>
              Explore <span style={{ color: "#c8a96e", fontStyle: "italic" }}>All Journeys</span>
            </h1>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 64, flexWrap: "wrap" }}>
            <button style={tabStyle(activeTab === "all")} onClick={() => setActiveTab("all")}>ALL</button>
            <button style={tabStyle(activeTab === "national")} onClick={() => setActiveTab("national")}>NATIONAL</button>
            <button style={tabStyle(activeTab === "abroad")} onClick={() => setActiveTab("abroad")}>ABROAD</button>
          </div>

          <div style={{
            display: "flex", flexDirection: "row", flexWrap: "wrap",
            gap: 32, justifyContent: "center"
          }}>
            {filteredTrips.map((trip) => (
              <div key={trip.id} style={{
                flex: "1 1 350px", maxWidth: 450,
                border: "1px solid rgba(200,169,110,0.15)",
                background: "rgba(255,255,255,0.01)",
                padding: 40,
                display: "flex", flexDirection: "column",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                bottom: 0,
                animation: "fadeUp 0.6s ease-out both"
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

                <div style={{ color: "rgba(200,169,110,0.5)", fontSize: 11, letterSpacing: "2px", marginBottom: 24, textTransform: "uppercase" }}>
                  {trip.type}
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
            
            {filteredTrips.length === 0 && (
              <div style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", width: "100%", padding: "40px" }}>
                No trips found for this category.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
