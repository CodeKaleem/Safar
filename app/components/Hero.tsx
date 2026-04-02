"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
function norm(lng: number, lat: number): [number, number] {
  return [(lng - 60.87) / (77.84 - 60.87), 1 - (lat - 23.63) / (37.09 - 23.63)];
}
 
const PROVINCES = [
  {
    id: "balochistan",
    label: "Balochistan",
    color: { fill: "rgba(255,255,255,0)", stroke: "rgba(255,255,255,0.3)" },
    labelPos: norm(64.5, 28.0),
    points: [
      norm(60.87, 25.5), norm(61.5, 24.5), norm(62.8, 23.8), norm(64.5, 23.63),
      norm(66.0, 23.65), norm(67.8, 24.0), norm(68.5, 24.8), norm(68.8, 25.5),
      norm(68.5, 26.8), norm(67.8, 27.5), norm(67.0, 28.2), norm(66.5, 28.8),
      norm(66.0, 29.2), norm(65.5, 29.8), norm(65.0, 30.5), norm(64.2, 31.2),
      norm(63.5, 31.5), norm(62.8, 31.2), norm(62.0, 30.8), norm(61.5, 30.2),
      norm(61.2, 29.5), norm(60.87, 28.5), norm(60.87, 25.5),
    ],
  },
  {
    id: "sindh",
    label: "Sindh",
    color: { fill: "rgba(255,255,255,0)", stroke: "rgba(255,255,255,0.3)" },
    labelPos: norm(69.5, 27.0),
    points: [
      norm(68.5, 24.8), norm(69.2, 24.0), norm(70.5, 23.65), norm(72.0, 23.63),
      norm(73.2, 24.0), norm(73.8, 24.8), norm(73.5, 25.5), norm(72.8, 26.2),
      norm(72.0, 26.8), norm(71.0, 27.2), norm(70.0, 27.5), norm(69.2, 27.8),
      norm(68.8, 27.5), norm(68.5, 26.8), norm(68.5, 24.8),
    ],
  },
  {
    id: "punjab",
    label: "Punjab",
    color: { fill: "rgba(255,255,255,0)", stroke: "rgba(255,255,255,0.3)" },
    labelPos: norm(72.5, 31.0),
    points: [
      norm(70.0, 27.8), norm(71.0, 27.2), norm(72.0, 26.8), norm(72.8, 26.2),
      norm(73.5, 27.0), norm(74.2, 27.8), norm(74.8, 28.5), norm(75.5, 29.2),
      norm(76.0, 30.0), norm(76.2, 31.0), norm(75.8, 31.8), norm(75.2, 32.5),
      norm(74.5, 32.8), norm(73.8, 33.0), norm(73.0, 32.8), norm(72.2, 32.2),
      norm(71.5, 31.5), norm(70.8, 30.8), norm(70.2, 30.0), norm(70.0, 27.8),
    ],
  },
  {
    id: "kpk",
    label: "KPK",
    color: { fill: "rgba(255,255,255,0)", stroke: "rgba(255,255,255,0.3)" },
    labelPos: norm(70.5, 34.0),
    points: [
      norm(68.8, 31.5), norm(69.5, 31.0), norm(70.0, 30.2), norm(70.8, 30.8),
      norm(71.5, 31.5), norm(72.2, 32.2), norm(73.0, 32.8), norm(73.8, 33.0),
      norm(74.2, 33.8), norm(74.0, 34.5), norm(73.5, 35.0), norm(72.8, 35.5),
      norm(71.8, 35.8), norm(70.8, 35.5), norm(70.0, 35.0), norm(69.2, 34.2),
      norm(68.8, 33.5), norm(68.8, 31.5),
    ],
  },
  {
    id: "gilgit",
    label: "Gilgit-Baltistan",
    color: { fill: "rgba(255,255,255,0)", stroke: "rgba(255,255,255,0.3)" },
    labelPos: norm(75.0, 36.2),
    points: [
      norm(73.5, 35.0), norm(74.2, 33.8), norm(75.0, 34.0), norm(75.8, 34.3),
      norm(76.5, 34.8), norm(77.2, 35.5), norm(77.84, 36.2), norm(77.5, 37.09),
      norm(76.5, 37.09), norm(75.5, 36.5), norm(74.8, 36.2), norm(73.5, 35.0),
    ],
  },
  {
    id: "kashmir",
    label: "Kashmir",
    color: { fill: "rgba(255,255,255,0)", stroke: "rgba(255,255,255,0.3)" },
    labelPos: norm(74.0, 34.5),
    points: [
      norm(72.8, 33.8), norm(73.5, 33.5), norm(74.2, 33.8), norm(75.0, 34.0),
      norm(75.2, 35.0), norm(74.5, 35.2), norm(73.8, 35.0), norm(73.2, 34.5),
      norm(72.8, 33.8),
    ],
  },
];
 
const CITIES = [
  { name: "Karachi",    lng: 67.01, lat: 24.86, major: true  },
  { name: "Hyderabad",  lng: 68.37, lat: 25.39, major: false },
  { name: "Sukkur",     lng: 68.86, lat: 27.70, major: false },
  { name: "Quetta",     lng: 66.99, lat: 30.18, major: true  },
  { name: "Multan",     lng: 71.47, lat: 30.19, major: true  },
  { name: "Faisalabad", lng: 73.09, lat: 31.42, major: false },
  { name: "Lahore",     lng: 74.34, lat: 31.55, major: true  },
  { name: "Islamabad",  lng: 73.06, lat: 33.72, major: true  },
  { name: "Peshawar",   lng: 71.53, lat: 34.01, major: true  },
  { name: "Gilgit",     lng: 74.31, lat: 35.92, major: false },
  { name: "Skardu",     lng: 75.63, lat: 35.29, major: false },
  { name: "Hunza",      lng: 74.65, lat: 36.32, major: true  },
  { name: "Muzaffarabad",lng:73.47, lat: 34.37, major: false },
];
 
// Route: Karachi → Hyderabad → Sukkur → Multan → Lahore → Islamabad → Peshawar → Gilgit → Hunza
const ROUTE = [0, 1, 2, 4, 6, 7, 8, 9, 11];
 
const TRAVEL_DURATION = 20000; // ms for full loop
 
export default function SafarHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [currentCity, setCurrentCity] = useState("Karachi");
  const [isJourneyStarting, setIsJourneyStarting] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    function getSize() {
      return { w: canvas!.offsetWidth, h: canvas!.offsetHeight };
    }
 
    function setSize() {
      const { w, h } = getSize();
      canvas!.width = w * devicePixelRatio;
      canvas!.height = h * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }
 
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);
 
    function toCanvasXY(lng: number, lat: number) {
      const p = norm(lng, lat);
      const { w, h } = getSize();
      // Map occupies right 60% of canvas
      const mapLeft = w * 0.30;
      const mapRight = w * 0.98;
      const mapTop = h * 0.04;
      const mapBottom = h * 0.96;
      return {
        x: mapLeft + p[0] * (mapRight - mapLeft),
        y: mapTop + p[1] * (mapBottom - mapTop),
      };
    }
 
    function normToCanvas(nx: number, ny: number) {
      const { w, h } = getSize();
      const mapLeft = w * 0.30, mapRight = w * 0.98;
      const mapTop = h * 0.04, mapBottom = h * 0.96;
      return {
        x: mapLeft + nx * (mapRight - mapLeft),
        y: mapTop + ny * (mapBottom - mapTop),
      };
    }
 
    function drawStars() {
      const { w, h } = getSize();
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * w * 0.38;
        const y = Math.random() * h;
        const r = Math.random() * 1.1 + 0.2;
        const a = Math.random() * 0.5 + 0.1;
        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${a})`;
        ctx!.fill();
      }
    }
 
    let bgDrawn = false;
    const bgBuf = document.createElement("canvas");
 
    function ensureBg() {
      const { w, h } = getSize();
      const hw = Math.floor(w * devicePixelRatio);
      const hh = Math.floor(h * devicePixelRatio);
      if (bgDrawn && bgBuf.width === hw && bgBuf.height === hh) return;
      
      bgBuf.width = hw;
      bgBuf.height = hh;
      const bctx = bgBuf.getContext("2d");
      if (!bctx) return;
      bctx.scale(devicePixelRatio, devicePixelRatio);
      bctx.clearRect(0, 0, w, h);

      // Draw Stars
      for (let i = 0; i < 220; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.1 + 0.15;
        const a = Math.random() * 0.55 + 0.08;
        bctx.beginPath();
        bctx.arc(x, y, r, 0, Math.PI * 2);
        bctx.fillStyle = `rgba(255,255,255,${a})`;
        bctx.fill();
      }

      // Draw mountains
      const mx = w * 0.70;
      bctx.beginPath();
      bctx.moveTo(mx, h * 0.06);
      const peaks: [number, number][] = [
        [mx + 0.05*(w-mx), h*0.02], [mx + 0.12*(w-mx), h*0.07],
        [mx + 0.20*(w-mx), h*0.01], [mx + 0.28*(w-mx), h*0.05],
        [mx + 0.36*(w-mx), h*0.00], [mx + 0.44*(w-mx), h*0.03],
        [mx + 0.55*(w-mx), h*0.06],
      ];
      peaks.forEach(([x, y]) => bctx.lineTo(x, y));
      bctx.lineTo(mx + 0.6*(w-mx), h*0.06);
      bctx.closePath();
      bctx.fillStyle = "rgba(100,140,180,0.12)";
      bctx.fill();

      // Draw Provinces
      PROVINCES.forEach(prov => {
        const pts = prov.points.map(([nx, ny]: [number, number]) => normToCanvas(nx, ny));
        bctx.beginPath();
        bctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) bctx.lineTo(pts[i].x, pts[i].y);
        bctx.closePath();
        bctx.fillStyle = prov.color.fill;
        bctx.fill();
      });

      // Draw Province Labels
      PROVINCES.forEach(prov => {
        const pos = normToCanvas(prov.labelPos[0], prov.labelPos[1]);
        bctx.font = "bold 9px 'Courier New', monospace";
        bctx.fillStyle = "rgba(255,255,255,0.35)";
        bctx.textAlign = "center";
        bctx.fillText(prov.label.toUpperCase(), pos.x, pos.y);
      });

      bgDrawn = true;
    }
 
    function drawRoute(progress: number) {
      const t = Date.now() * 0.05;
      for (let i = 0; i < ROUTE.length - 1; i++) {
        const a = CITIES[ROUTE[i]];
        const b = CITIES[ROUTE[i + 1]];
        const pa = toCanvasXY(a.lng, a.lat);
        const pb = toCanvasXY(b.lng, b.lat);
        const segStart = i / (ROUTE.length - 1);
        const segEnd = (i + 1) / (ROUTE.length - 1);
        if (progress < segStart) break;
        const segT = progress >= segEnd ? 1 : (progress - segStart) / (segEnd - segStart);
        ctx!.save();
        ctx!.setLineDash([6, 5]);
        ctx!.lineDashOffset = -(t % 11);
        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pa.x + (pb.x - pa.x) * segT, pa.y + (pb.y - pa.y) * segT);
        ctx!.strokeStyle = "rgba(200,169,110,0.7)";
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
        ctx!.restore();
      }
    }
 
    function drawCities(progress: number) {
      CITIES.forEach((city, idx) => {
        const routeIdx = ROUTE.indexOf(idx);
        const visited = routeIdx >= 0 && progress >= routeIdx / (ROUTE.length - 1);
        const pos = toCanvasXY(city.lng, city.lat);
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.003 + idx);
 
        if (city.major && visited) {
          ctx!.beginPath();
          ctx!.arc(pos.x, pos.y, 12 + pulse * 4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(200,169,110,${0.07 + pulse * 0.05})`;
          ctx!.fill();
        }
 
        ctx!.beginPath();
        ctx!.arc(pos.x, pos.y, city.major ? (visited ? 5 : 3.5) : 2.2, 0, Math.PI * 2);
        ctx!.fillStyle = visited ? "#c8a96e" : city.major ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)";
        ctx!.fill();
 
        if (city.major) {
          ctx!.beginPath();
          ctx!.arc(pos.x, pos.y, city.major ? (visited ? 8 : 6) : 4, 0, Math.PI * 2);
          ctx!.strokeStyle = visited ? "rgba(200,169,110,0.5)" : "rgba(255,255,255,0.15)";
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        }
 
        if (city.major || visited) {
          ctx!.font = `${visited ? "600" : "400"} ${city.major ? 11 : 9.5}px 'Courier New', monospace`;
          ctx!.fillStyle = visited ? "#e8d5a0" : "rgba(255,255,255,0.45)";
          ctx!.textAlign = "left";
          ctx!.fillText(city.name, pos.x + 10, pos.y + 4);
        }
      });
    }
 
    function getCarPos(progress: number) {
      const clamped = Math.min(progress, 0.9999);
      const total = ROUTE.length - 1;
      const raw = clamped * total;
      const seg = Math.floor(raw);
      const t = raw - seg;
      const i = Math.min(seg, total - 1);
      const a = CITIES[ROUTE[i]];
      const b = CITIES[ROUTE[i + 1]];
      const pa = toCanvasXY(a.lng, a.lat);
      const pb = toCanvasXY(b.lng, b.lat);
      return {
        x: pa.x + (pb.x - pa.x) * t,
        y: pa.y + (pb.y - pa.y) * t,
        angle: Math.atan2(pb.y - pa.y, pb.x - pa.x),
      };
    }
 
    function drawCar(cx: number, cy: number, angle: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(angle);
      // glow
      ctx!.beginPath();
      ctx!.arc(0, 0, 14, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(200,169,110,0.12)";
      ctx!.fill();
      // body
      ctx!.fillStyle = "#e8d5a0";
      ctx!.beginPath();
      ctx!.roundRect(-9, -4.5, 18, 9, 2.5);
      ctx!.fill();
      // cabin
      ctx!.fillStyle = "#c8a96e";
      ctx!.beginPath();
      ctx!.roundRect(-4, -4, 10, 8, 1.5);
      ctx!.fill();
      // windshield
      ctx!.fillStyle = "rgba(150,220,255,0.8)";
      ctx!.fillRect(4, -3.5, 4, 3.5);
      ctx!.fillRect(4, 0, 4, 3.5);
      // headlights
      ctx!.fillStyle = "rgba(255,255,200,0.9)";
      ctx!.beginPath();
      ctx!.arc(9, -2.5, 1.8, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(9, 2.5, 1.8, 0, Math.PI * 2);
      ctx!.fill();
      // taillights
      ctx!.fillStyle = "#ff4444";
      ctx!.beginPath();
      ctx!.arc(-9, -2.5, 1.5, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(-9, 2.5, 1.5, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }
 
    function frame(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = (elapsed % TRAVEL_DURATION) / TRAVEL_DURATION;
 
      const { w, h } = getSize();
      ctx!.clearRect(0, 0, w, h);
 
      ensureBg();
      ctx!.drawImage(bgBuf, 0, 0, w, h);
 
      drawRoute(progress);
      drawCities(progress);
 
      const car = getCarPos(progress);
      drawCar(car.x, car.y, car.angle);
 
      // current city tracker
      const idx = Math.min(Math.floor(progress * (ROUTE.length - 1)), ROUTE.length - 2);
      setCurrentCity(CITIES[ROUTE[idx]].name);
 
      animRef.current = requestAnimationFrame(frame);
    }
 
    animRef.current = requestAnimationFrame(frame);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);
 
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#050a12",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Radial vignette overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse at 25% 50%, transparent 40%, rgba(5,10,18,0.7) 100%)",
      }} />
 
      {/* Scanline texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", opacity: 0.03,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)",
      }} />
 
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      />
 
      {/* Left panel — hero content */}
      <div className="hero-content" style={{
        position: "absolute", left: 0, top: 0, width: "42%", height: "100%",
        zIndex: 10, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 48px",
      }}>
        {/* Brand mark */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 28,
          animation: "fadeUp 0.7s 0.3s both",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1.5px solid #c8a96e",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <span style={{ color: "#c8a96e", letterSpacing: "6px", fontSize: 11, fontWeight: 700 }}>
            SAFAR
          </span>
        </div>
 
        {/* Headline */}
        <div style={{ animation: "fadeUp 0.7s 0.5s both" }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "4px", marginBottom: 12 }}>
            PAKISTAN TRAVEL AGENCY
          </div>
          <h1 style={{
            fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 900, lineHeight: 1.05,
            color: "#fff", margin: "0 0 16px",
            fontFamily: "'Georgia', serif",
            letterSpacing: "-1px",
          }}>
            Discover<br />
            <span style={{ color: "#c8a96e" }}>Beautiful</span><br />
            Pakistan
          </h1>
        </div>
 
        {/* Tagline */}
        <p style={{
          color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.8,
          margin: "0 0 36px", maxWidth: 320,
          animation: "fadeUp 0.7s 0.7s both",
        }}>
          From the shores of Karachi to the peaks of Hunza —<br />
          every road through Pakistan tells a timeless story.
        </p>
 
        {/* Live city tracker */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          marginBottom: 32, animation: "fadeUp 0.7s 0.9s both",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c8a96e", animation: "blink 1.2s infinite" }} />
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "2px" }}>NOW IN</span>
          <span style={{ color: "#c8a96e", fontSize: 12, fontWeight: 700, letterSpacing: "2px", transition: "all 0.3s" }}>
            {currentCity.toUpperCase()}
          </span>
        </div>
 
        {/* CTA Button */}
        <div style={{ animation: "fadeUp 0.7s 1.1s both" }}>
          <button
            onClick={() => {
              setIsJourneyStarting(true);
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "transparent", border: "1.5px solid #c8a96e",
              color: "#c8a96e", padding: "16px 36px", borderRadius: "2px",
              fontSize: 13, fontWeight: 700, letterSpacing: "3px",
              cursor: "pointer", fontFamily: "'Courier New', monospace",
              position: "relative", overflow: "hidden",
              transition: "all 0.3s",
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            START YOUR JOURNEY
          </button>
        </div>
 
        {/* Stats */}
        <div className="hero-stats" style={{
          display: "flex", gap: 0, marginTop: 48,
          animation: "fadeUp 0.7s 1.3s both",
        }}>
          {[
            { num: "50+", lbl: "Destinations" },
            { num: "12K+", lbl: "Travelers" },
            { num: "8 Yrs", lbl: "Experience" },
          ].map((s, i) => (
            <div key={i} className="hero-stat-item" style={{
              paddingRight: 28, marginRight: 28,
              borderRight: i < 2 ? "1px solid rgba(200,169,110,0.2)" : "none",
            }}>
              <div style={{ color: "#c8a96e", fontSize: 22, fontWeight: 900, fontFamily: "'Georgia', serif" }}>{s.num}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "2px", marginTop: 2 }}>{s.lbl.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Province legend */}
      <div className="province-legend" style={{
        position: "absolute", right: 16, bottom: 20, zIndex: 10,
        display: "flex", flexDirection: "column", gap: 5,
        animation: "fadeUp 0.7s 1.5s both",
      }}>
        {[
          { label: "Balochistan", color: "#c86432" },
          { label: "Sindh",       color: "#6496ff" },
          { label: "Punjab",      color: "#64c864" },
          { label: "KPK",         color: "#ff9664" },
          { label: "Gilgit-Baltistan", color: "#96c8ff" },
          { label: "Kashmir",     color: "#ff96c8" },
        ].map(p => (
          <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 1, background: p.color, opacity: 0.8 }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "1.5px" }}>
              {p.label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
 
      {/* Bottom scroll hint */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        animation: "fadeIn 1s 2s both",
      }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: "3px" }}>SCROLL</span>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(200,169,110,0.5), transparent)", animation: "scrollLine 1.5s infinite" }} />
      </div>
 
      {/* Transition Overlay */}
      {isJourneyStarting && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#000",
          animation: "blackoutFade 0.5s forwards",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden"
        }}>
          {/* Animated Luxury Coach */}
          <div 
            onAnimationEnd={() => router.push("/all-trips")}
            style={{
            animation: "busDrive 2.5s cubic-bezier(0.5, 0, 0.2, 1) 0.5s forwards",
            transform: "translateX(calc(-50vw - 160px))", /* perfectly off screen left */
            willChange: "transform"
          }}>
            <svg width="300" height="90" viewBox="0 0 200 70" fill="none">
               {/* body */}
               <path d="M 10 60 L 190 60 Q 200 60 200 50 L 195 20 Q 192 10 180 10 L 20 10 Q 10 10 5 20 L 0 50 Q 0 60 10 60 Z" fill="#050a12" stroke="#c8a96e" strokeWidth="2" />
               
               <rect x="15" y="15" width="30" height="20" rx="3" fill="rgba(200,169,110,0.3)" />
               <rect x="55" y="15" width="40" height="20" rx="3" fill="rgba(200,169,110,0.3)" />
               <rect x="105" y="15" width="40" height="20" rx="3" fill="rgba(200,169,110,0.3)" />
               <rect x="155" y="15" width="30" height="20" rx="3" fill="rgba(200,169,110,0.3)" />
               {/* wheels */}
               <circle cx="45" cy="60" r="10" fill="#050a12" stroke="#c8a96e" strokeWidth="3" />
               <circle cx="155" cy="60" r="10" fill="#050a12" stroke="#c8a96e" strokeWidth="3" />
               {/* wheel spokes */}
               <circle cx="45" cy="60" r="3" fill="#c8a96e" />
               <circle cx="155" cy="60" r="3" fill="#c8a96e" />
               {/* headlights */}
               <circle cx="196" cy="45" r="3" fill="#fff" filter="drop-shadow(0 0 8px #fff)" />
               {/* taillights */}
               <rect x="-1" y="40" width="4" height="10" fill="#f00" />
            </svg>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes blackoutFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes busDrive {
          0% { transform: translateX(calc(-50vw - 160px)); }
          100% { transform: translateX(calc(50vw + 160px)); }
        }
        @media (max-width: 768px) {
          .hero-content {
            width: 100% !important;
            padding: 0 24px !important;
            background: linear-gradient(to right, rgba(5,10,18,0.98) 40%, rgba(5,10,18,0.5) 100%) !important;
          }
          .hero-stats {
            flex-direction: column !important;
            gap: 16px !important;
            margin-top: 32px !important;
          }
          .hero-stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(200,169,110,0.2) !important;
            padding-right: 0 !important;
            margin-right: 0 !important;
            padding-bottom: 16px !important;
          }
          .hero-stat-item:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
          .province-legend {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
