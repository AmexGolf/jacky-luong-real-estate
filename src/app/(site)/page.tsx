import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

/* Lazy-load below-fold sections for faster initial page load */
const TrustBar        = dynamic(() => import("@/components/TrustBar"));
const Stats           = dynamic(() => import("@/components/Stats"));
const FeaturedProperties = dynamic(() => import("@/components/FeaturedProperties"));
const Process         = dynamic(() => import("@/components/Process"));
const Neighborhoods   = dynamic(() => import("@/components/Neighborhoods"));
const About           = dynamic(() => import("@/components/About"));
const Testimonials    = dynamic(() => import("@/components/Testimonials"));
const CTABanner       = dynamic(() => import("@/components/CTABanner"));
const Blog            = dynamic(() => import("@/components/Blog"));
const Contact         = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <main role="main">
      <Hero />
      <TrustBar />
      <Stats />
      <FeaturedProperties />
      <Process />
      <Neighborhoods />
      <About />
      <Testimonials />
      <CTABanner />
      <Blog />
      <Contact />
    </main>
  );
}
