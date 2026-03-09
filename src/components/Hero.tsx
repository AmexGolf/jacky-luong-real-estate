"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Hero — Coaching You to Your Future Home"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* ── Background gradient with parallax ───────────────────── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: bgY,
          background: `
            radial-gradient(ellipse at 70% 40%, #3D2E1E 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, #2A1F14 0%, transparent 55%),
            linear-gradient(160deg, #1C1612 0%, #2C2118 35%, #1A150F 70%, #0E0B08 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* ── Texture grain overlay ───────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* ── Bottom readability gradient ─────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(14,11,8,0.85) 0%, rgba(14,11,8,0.3) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Hero Content (fades on scroll) ───────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto will-change-transform"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Decorative element */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="flex items-center gap-4 mb-8"
          aria-hidden="true"
        >
          <div className="h-px w-10 bg-[#B8956A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8956A]" />
          <div className="h-px w-10 bg-[#B8956A]" />
        </motion.div>

        {/* Pre-headline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="font-[family-name:var(--font-body)] text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#B8956A] mb-6 font-light"
        >
          San Francisco Bay Area Real Estate
        </motion.p>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-6"
          style={{
            color: "#ffffff",
            textShadow: "0 2px 24px rgba(0,0,0,0.4)",
          }}
        >
          Coaching You to Your
          <br />
          <em className="font-light" style={{ fontStyle: "italic" }}>
            Future Home
          </em>
        </motion.h1>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.52}
          className="w-12 h-px bg-[#B8956A]/60 mb-6"
          aria-hidden="true"
        />

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.62}
          className="font-[family-name:var(--font-body)] text-[#F5F0EB]/60 text-sm md:text-base font-light leading-relaxed max-w-xl mb-10"
        >
          Personalized guidance for discerning buyers and sellers across the San
          Francisco Bay Area&apos;s most coveted neighborhoods
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.75}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#properties"
            className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.18em] uppercase font-medium px-8 py-4 bg-[#B8956A] text-[#FFFCF8] hover:bg-[#8B6F47] transition-all duration-300 min-w-[200px] text-center"
          >
            Explore Properties
          </a>
          <a
            href="#contact"
            className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.18em] uppercase font-medium px-8 py-4 border border-[#F5F0EB]/40 text-[#F5F0EB] hover:border-[#F5F0EB] hover:bg-[#F5F0EB]/5 transition-all duration-300 min-w-[200px] text-center"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-[family-name:var(--font-body)] text-[9px] tracking-[0.3em] uppercase text-[#F5F0EB]/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#B8956A]/60"
          >
            <path
              d="M2 5l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
