import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/* ─── SEO: Comprehensive Metadata ─────────────────────────────── */
const siteUrl = "https://jackyluongrealestate.com";

export const metadata: Metadata = {
  title: "Jacky Luong | San Francisco Bay Area Luxury Real Estate Agent",
  description:
    "Discover luxury homes in San Francisco, Hillsborough, Atherton, Palo Alto and the Bay Area with Jacky Luong. Personalized guidance for discerning buyers and sellers. DRE #02254871",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jacky Luong | San Francisco Bay Area Luxury Real Estate Agent",
    description:
      "Discover luxury homes in San Francisco, Hillsborough, Atherton, Palo Alto and the Bay Area with Jacky Luong. Personalized guidance for discerning buyers and sellers.",
    url: siteUrl,
    siteName: "Jacky Luong Real Estate",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jacky Luong — San Francisco Bay Area Luxury Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacky Luong | San Francisco Bay Area Luxury Real Estate Agent",
    description:
      "Discover luxury homes in San Francisco, Hillsborough, Atherton, Palo Alto and the Bay Area with Jacky Luong. Personalized guidance for discerning buyers and sellers.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "San Francisco real estate",
    "Bay Area luxury homes",
    "Jacky Luong realtor",
    "SF Bay Area real estate agent",
    "Hillsborough homes",
    "Atherton real estate",
    "Palo Alto homes for sale",
    "San Francisco luxury properties",
    "Bay Area home buying",
    "DRE 02254871",
  ],
  authors: [{ name: "Jacky Luong" }],
  creator: "Jacky Luong",
  publisher: "Jacky Luong Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${outfit.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
