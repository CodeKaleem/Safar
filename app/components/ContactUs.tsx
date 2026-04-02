"use client";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const inputStyle = {
    width: "100%", padding: "16px", background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(200,169,110,0.2)", color: "#fff",
    fontFamily: "'Courier New', Courier, monospace", fontSize: 13,
    outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.3s"
  };

  const labelStyle = {
    display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11,
    letterSpacing: "2px", marginBottom: 8, marginTop: 24
  };

  return (
    <section className="contact-section" style={{
      background: "#050a12",
      padding: "100px 48px",
      position: "relative",
      fontFamily: "'Courier New', Courier, monospace"
    }}>
      <div className="contact-container" style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 10, display: "flex", flexWrap: "wrap", gap: 64 }}>
        
        {/* Contact Info */}
        <div style={{ flex: "1 1 350px" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "4px", marginBottom: 16 }}>
            INQUIRIES
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900,
            color: "#fff", margin: "0 0 32px", fontFamily: "'Georgia', serif",
            letterSpacing: "-0.5px",
          }}>
            Reach <span style={{ color: "#c8a96e", fontStyle: "italic" }}>Out</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
            Curious about a tailored expedition? Our travel concierges are ready to assist you in designing the perfect journey. 
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div style={labelStyle}>EMAIL</div>
              <div style={{ color: "#fff", fontSize: 15 }}>concierge@safartravel.com</div>
            </div>
            <div>
              <div style={labelStyle}>PHONE</div>
              <div style={{ color: "#fff", fontSize: 15 }}>+92 300 1234567</div>
            </div>
            <div>
              <div style={labelStyle}>HEADQUARTERS</div>
              <div style={{ color: "#fff", fontSize: 15, lineHeight: 1.6 }}>Suite 42, The Executive Tower<br/>Islamabad, Pakistan</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ flex: "1 1 400px", background: "rgba(255,255,255,0.01)", padding: 40, border: "1px solid rgba(200,169,110,0.15)" }}>
          {isSubmitted ? (
            <div style={{ textAlign: "center", padding: "60px 0", animation: "fadeIn 0.5s" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #c8a96e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <h3 style={{ color: "#c8a96e", fontSize: 24, margin: "0 0 16px", fontFamily: "'Georgia', serif" }}>Message Sent</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6 }}>
                Our team will be in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ ...labelStyle, marginTop: 0 }}>FULL NAME</div>
              <input type="text" required style={inputStyle} placeholder="Jane Doe"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                onFocus={e => e.target.style.borderColor = "#c8a96e"}
                onBlur={e => e.target.style.borderColor = "rgba(200,169,110,0.2)"}
              />

              <div style={labelStyle}>EMAIL ADDRESS</div>
              <input type="email" required style={inputStyle} placeholder="jane@example.com"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                onFocus={e => e.target.style.borderColor = "#c8a96e"}
                onBlur={e => e.target.style.borderColor = "rgba(200,169,110,0.2)"}
              />

              <div style={labelStyle}>MESSAGE</div>
              <textarea required rows={4} style={{...inputStyle, resize: "none"}} placeholder="How can we help?"
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                onFocus={e => e.target.style.borderColor = "#c8a96e"}
                onBlur={e => e.target.style.borderColor = "rgba(200,169,110,0.2)"}
              />

              <button type="submit" style={{
                width: "100%", marginTop: 32, padding: "16px", background: "transparent",
                color: "#c8a96e", border: "1.5px solid #c8a96e", fontSize: 13, fontWeight: "bold",
                letterSpacing: "3px", cursor: "pointer", fontFamily: "'Courier New', Courier, monospace",
                transition: "all 0.3s"
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
                SEND INQUIRY
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-section {
            padding: 60px 24px !important;
          }
          .contact-container {
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
