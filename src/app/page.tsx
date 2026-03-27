import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedOn from "@/components/FeaturedOn";
import Analytics from "@/components/Analytics";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedOn />
        <Analytics />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
