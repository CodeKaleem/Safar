import Hero from "./components/Hero";
import FeaturedTrips from "./components/FeaturedTrips";
import AboutUs from "./components/AboutUs";
import Reviews from "./components/Reviews";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { getTrips } from "./data/trips";

export default async function Home() {
  const trips = await getTrips();
  
  return (
    <main style={{ background: "#050a12", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Hero />
      <FeaturedTrips trips={trips} />
      <AboutUs />
      <Reviews />
      <ContactUs />
      <Footer />
    </main>
  );
}
