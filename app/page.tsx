import Hero from "./components/Hero";
import FeaturedTrips from "./components/FeaturedTrips";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#050a12", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Hero />
      <FeaturedTrips />
      <AboutUs />
      <ContactUs />
      <Footer />
    </main>
  );
}
