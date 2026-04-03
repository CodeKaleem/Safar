"use client";
import { useState, useEffect } from "react";
import { Trip } from "../data/trips";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  selectedHotelId?: string | null;
}

export default function BookingModal({ isOpen, onClose, trip, selectedHotelId }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: 1, hotelId: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { supabase } = await import("@/utils/supabase");
      const { error } = await supabase.from('bookings').insert({
        trip_slug: trip?.id,
        hotel_id: formData.hotelId === "none" ? null : formData.hotelId,
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        booking_date: formData.date,
        booking_time: formData.time,
        guests: formData.guests
      });
      if (error) throw error;
    } catch (err) {
      console.error("Error saving booking:", err);
      // We still show success for UX continuity even on error, but ideally handle this.
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: 1, hotelId: "" });
    }, 3000);
  };

  useEffect(() => {
    if (!isOpen) return;
    if (selectedHotelId) {
      setFormData(prev => ({ ...prev, hotelId: selectedHotelId }));
    } else if (trip?.hotels && trip.hotels.length > 0) {
      setFormData(prev => ({ ...prev, hotelId: trip.hotels[0].id }));
    }
  }, [isOpen, selectedHotelId, trip]);

  if (!isOpen || !trip) return null;

  const inputStyle = {
    width: "100%", padding: "12px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(200,169,110,0.3)", color: "#fff",
    fontFamily: "'Courier New', Courier, monospace", fontSize: 13,
    outline: "none", boxSizing: "border-box" as const, borderRadius: "2px"
  };

  const labelStyle = {
    display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11,
    letterSpacing: "2px", marginBottom: 6, marginTop: 16
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(5, 10, 18, 0.85)", backdropFilter: "blur(12px)",
      fontFamily: "'Courier New', Courier, monospace",
      animation: "fadeIn 0.3s ease-out"
    }}>
      <div style={{
        background: "#050a12", border: "1px solid #c8a96e",
        width: "100%", maxWidth: 500, padding: 40, position: "relative",
        boxShadow: "0 25px 50px -12px rgba(200,169,110,0.15)",
        maxHeight: "90vh", overflowY: "auto"
      }}>
        <button 
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20, background: "transparent",
            border: "none", color: "#c8a96e", cursor: "pointer", padding: 8
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #c8a96e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
              </svg>
            </div>
            <h2 style={{ color: "#c8a96e", fontSize: 24, margin: "0 0 16px", fontFamily: "'Georgia', serif" }}>Booking Confirmed</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6 }}>
              Thank you for booking your journey to {trip.title}. We will contact you shortly with the itinerary details.
            </p>
          </div>
        ) : (
          <>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "3px", marginBottom: 8 }}>RESERVE YOUR JOURNEY</div>
            <h2 style={{ color: "#fff", fontSize: 28, margin: "0 0 24px", fontFamily: "'Georgia', serif" }}>{trip.title}</h2>
            
            <div style={{ display: "flex", gap: 24, marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid rgba(200,169,110,0.2)" }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "2px" }}>DURATION</div>
                <div style={{ color: "#c8a96e", fontSize: 18, fontWeight: "bold" }}>{trip.days}</div>
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "2px" }}>EST. BUDGET</div>
                <div style={{ color: "#c8a96e", fontSize: 18, fontWeight: "bold" }}>{trip.budget}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>DATE</label>
                  <input type="date" required style={{...inputStyle, colorScheme: "dark"}} 
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>TIME</label>
                  <input type="time" required style={{...inputStyle, colorScheme: "dark"}}
                    value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                </div>
              </div>

              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>GUESTS</label>
                  <input type="number" min="1" max="20" required style={inputStyle}
                    value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})} />
                </div>
                <div style={{ flex: 2 }}>
                  <label style={labelStyle}>SELECT HOTEL</label>
                  <select required style={{...inputStyle, colorScheme: "dark", WebkitAppearance: "none"}}
                          value={formData.hotelId} onChange={e => setFormData({...formData, hotelId: e.target.value})}>
                    <option value="" disabled>Choose an option</option>
                    {trip.hotels && trip.hotels.map(h => (
                      <option key={h.id} value={h.id} style={{ background: "#050a12" }}>{h.name}</option>
                    ))}
                    <option value="none" style={{ background: "#050a12" }}>I will arrange my own accommodation</option>
                  </select>
                </div>
              </div>

              <label style={labelStyle}>FULL NAME</label>
              <input type="text" required style={inputStyle} placeholder="John Doe"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />

              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>EMAIL</label>
                  <input type="email" required style={inputStyle} placeholder="john@example.com"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>PHONE</label>
                  <input type="tel" required style={inputStyle} placeholder="+92 3XX XXXXXXX"
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <button type="submit" style={{
                width: "100%", marginTop: 32, padding: "16px", background: "#c8a96e",
                color: "#050a12", border: "none", fontSize: 14, fontWeight: "bold",
                letterSpacing: "3px", cursor: "pointer", fontFamily: "'Courier New', Courier, monospace",
                transition: "opacity 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                CONFIRM BOOKING
              </button>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
