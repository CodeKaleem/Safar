import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "SafarTravel Administrative Dashboard",
  description: "Secure panel for SafarTravel expedition management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-black/50 border-r border-[#c8a96e]/20 flex flex-col p-6">
          <div className="text-[12px] tracking-[4px] text-white/50 mb-12">SAFARTRAVEL ADMIN</div>
          <nav className="flex flex-col gap-6 font-bold tracking-widest text-[#c8a96e]/70 text-sm">
            <Link href="/" className="hover:text-[#c8a96e] transition-colors">DASHBOARD</Link>
            <Link href="/trips" className="hover:text-[#c8a96e] transition-colors">EXPEDITIONS</Link>
            <Link href="/bookings" className="hover:text-[#c8a96e] transition-colors">BOOKINGS</Link>
            <Link href="/inquiries" className="hover:text-[#c8a96e] transition-colors">INQUIRIES</Link>
            <Link href="/reviews" className="hover:text-[#c8a96e] transition-colors">REVIEWS</Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#050a12] p-12">
          {children}
        </main>
        
      </body>
    </html>
  );
}
