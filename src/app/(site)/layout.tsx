import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#B8956A] focus:text-white focus:text-sm"
      >
        Skip to main content
      </a>
      <Header />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
