"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BookingModal from "../../components/BookingModal";
import { TRIPS } from "../../data/trips";

export default function TripDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [trip, setTrip] = useState(TRIPS[0]); 
  const [mounted, setMounted] = useState(false);

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setMounted(true);
    const foundTrip = TRIPS.find(t => t.id === id);
    if (foundTrip) {
      setTrip(foundTrip);
    }
  }, [id]);

  if (!mounted) return null; // Prevent hydration mismatch

  const locations = trip.title.split(" to ");
  const departureName = locations[0]?.toUpperCase() || "DEPARTURE";
  const destinationName = locations[1]?.toUpperCase() || "DESTINATION";

  return (
    <main style={{
      background: "#050a12",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "'Courier New', Courier, monospace",
      position: "relative",
      padding: "40px 24px",
      overflowX: "hidden"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          color: "rgba(255,255,255,0.5)", textDecoration: "none",
          fontSize: 12, letterSpacing: "2px", marginBottom: 40,
          transition: "color 0.2s"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          RETURN TO EXPEDITIONS
        </Link>

        {/* Hero Info */}
        <div style={{ textAlign: "center", marginBottom: 60, animation: "fadeInUp 0.8s ease-out" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "4px", marginBottom: 16 }}>
            EXPEDITION DETAILS
          </div>
          <h1 style={{
            fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 900,
            color: "#fff", margin: "0 0 24px", fontFamily: "'Georgia', serif",
            letterSpacing: "-1px"
          }}>
            {trip.title}
          </h1>
          <p style={{
            maxWidth: 600, margin: "0 auto", color: "rgba(255,255,255,0.6)",
            fontSize: 16, lineHeight: 1.8,
          }}>
            {trip.desc}
          </p>
        </div>

        {/* Animated Map Route */}
        <div style={{ 
          width: "100%", height: "350px", position: "relative", marginBottom: 80,
          background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.02) 50%, transparent)",
          borderTop: "1px solid rgba(200,169,110,0.1)",
          borderBottom: "1px solid rgba(200,169,110,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "fadeIn 1s ease-in 0.3s both"
        }}>
          <svg viewBox="0 0 1000 300" style={{ width: "100%", height: "100%", maxWidth: "900px", overflow: "visible" }}>
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background dashed route */}
            <path d="M 50 250 Q 300 50 500 150 T 950 50" 
                  fill="none" stroke="rgba(200,169,110,0.2)" strokeWidth="3" strokeDasharray="12 12" />
            
            {/* Animated solid route tracing the path */}
            <path d="M 50 250 Q 300 50 500 150 T 950 50" 
                  fill="none" stroke="#c8a96e" strokeWidth="2" strokeDasharray="1100" strokeDashoffset="1100">
              <animate attributeName="stroke-dashoffset" values="1100;0" dur="5s" repeatCount="indefinite" />
            </path>

            {/* Glowing moving vehicle (spark) */}
            <g>
               {/* Core glow */}
               <circle cx="0" cy="0" r="12" fill="rgba(200,169,110,0.2)" filter="url(#glow)" />
               <circle cx="0" cy="0" r="4" fill="#fff" />
               {/* Abstract vehicle pointing forward */}
               <polygon points="-8,-6 10,0 -8,6" fill="#c8a96e" />
               <animateMotion dur="5s" repeatCount="indefinite" 
                              path="M 50 250 Q 300 50 500 150 T 950 50" rotate="auto" />
            </g>

            {/* Departure Pin */}
            <g transform="translate(50, 250)">
              <circle cx="0" cy="0" r="16" fill="rgba(200,169,110,0.1)" />
              <circle cx="0" cy="0" r="6" fill="#050a12" stroke="#c8a96e" strokeWidth="3" />
              <text x="0" y="30" fill="#c8a96e" fontSize="12" textAnchor="middle" letterSpacing="2px">{departureName}</text>
            </g>

            {/* Destination Pin */}
            <g transform="translate(950, 50)">
              <circle cx="0" cy="0" r="24" fill="rgba(200,169,110,0.15)" />
              <circle cx="0" cy="0" r="8" fill="#c8a96e" filter="url(#glow)" />
              <text x="0" y="-20" fill="#c8a96e" fontSize="12" textAnchor="middle" letterSpacing="2px">{destinationName}</text>
            </g>
          </svg>
        </div>

        {/* Details & Action */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 60, justifyContent: "center", alignItems: "center" }}>
          
          <div style={{ display: "flex", gap: 40, borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: 60, flexWrap: "wrap", justifyContent: "center" }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "2px", marginBottom: 8 }}>
                DURATION
              </div>
              <div style={{ color: "#fff", fontSize: 28, fontWeight: "bold", fontFamily: "'Georgia', serif" }}>
                {trip.days}
              </div>
            </div>
            
            <div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "2px", marginBottom: 8 }}>
                ESTIMATED BUDGET
              </div>
              <div style={{ color: "#fff", fontSize: 28, fontWeight: "bold", fontFamily: "'Georgia', serif" }}>
                {trip.budget}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: "20px 48px", background: "#c8a96e",
              color: "#050a12", border: "none",
              fontSize: 14, fontWeight: "bold", letterSpacing: "3px",
              cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              fontFamily: "'Courier New', Courier, monospace",
              boxShadow: "0 10px 30px -10px rgba(200,169,110,0.5)",
              display: "inline-block"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(200,169,110,0.6)";
              e.currentTarget.style.background = "#d4b87e";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(200,169,110,0.5)";
              e.currentTarget.style.background = "#c8a96e";
            }}
          >
            BOOK AN APPOINTMENT
          </button>
        </div>

        {/* Destination Gallery */}
        {trip.gallery && trip.gallery.length > 0 && (
          <div style={{ marginTop: 100, animation: "fadeInUp 0.8s ease-out 0.5s both" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "4px", marginBottom: 16 }}>
                DESTINATION IN SIGHT
              </div>
              <h2 style={{ fontSize: 32, fontFamily: "'Georgia', serif", color: "#c8a96e" }}>The Landscape</h2>
            </div>
            
            <div style={{ display: "flex", gap: 24, overflowX: "auto", paddingBottom: 24 }}>
              {trip.gallery.map((img, idx) => (
                <div key={idx} style={{ 
                  flex: "0 0 auto", width: "80%", maxWidth: 600, aspectRatio: "16/9",
                  borderRadius: 2, overflow: "hidden", border: "1px solid rgba(200,169,110,0.2)" 
                }}>
                  <img src={img} alt="Destination" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accommodations */}
        {trip.hotels && trip.hotels.length > 0 && (
          <div style={{ marginTop: 80, paddingBottom: 60, animation: "fadeInUp 0.8s ease-out 0.7s both" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "4px", marginBottom: 16 }}>
                CURATED STAYS
              </div>
              <h2 style={{ fontSize: 32, fontFamily: "'Georgia', serif", color: "#c8a96e" }}>Featured Accommodations</h2>
            </div>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
              {trip.hotels.map(hotel => (
                <div key={hotel.id} style={{ 
                  flex: "1 1 300px", maxWidth: 400, background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(200,169,110,0.15)", borderRadius: 2, overflow: "hidden",
                  display: "flex", flexDirection: "column"
                }}>
                  <div style={{ width: "100%", height: 200 }}>
                    <img src={hotel.img} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontFamily: "'Georgia', serif", margin: "0 0 12px", color: "#fff" }}>{hotel.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{hotel.desc}</p>
                    <button 
                      onClick={() => handleHotelSelect(hotel.id)}
                      style={{
                        padding: "12px", background: "transparent", color: "#c8a96e",
                        border: "1px solid #c8a96e", fontFamily: "'Courier New', monospace",
                        fontSize: 12, fontWeight: "bold", letterSpacing: "2px", cursor: "pointer",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#c8a96e"; e.currentTarget.style.color = "#050a12"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8a96e"; }}
                    >
                      SELECT THIS HOTEL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedHotelId(null); }} 
        trip={trip} 
        selectedHotelId={selectedHotelId}
      />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
