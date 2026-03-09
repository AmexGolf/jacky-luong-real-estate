import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

/* Lazy-load below-fold sections for faster initial page load */
const TrustBar = dynamic(() => import("@/components/TrustBar"));
const FeaturedProperties = dynamic(() => import("@/components/FeaturedProperties"));
const About = dynamic(() => import("@/components/About"));
const Neighborhoods = dynamic(() => import("@/components/Neighborhoods"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <main role="main">
      <Hero />
      <TrustBar />
      <FeaturedProperties />
      <About />
      <Neighborhoods />
      <Testimonials />
      <Contact />
    </main>
  );
}
