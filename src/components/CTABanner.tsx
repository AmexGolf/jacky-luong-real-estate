"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Call to action"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1C1612 0%, #2C2118 40%, #3D2E1E 100%)",
      }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Large decorative letter */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-[family-name:var(--font-heading)] text-[30rem] leading-none font-light opacity-[0.025]"
          style={{ color: "#B8956A" }}
        >
          J
        </span>
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8956A]/50 to-transparent" aria-hidden="true" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Pre-headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
          aria-hidden="true"
        >
          <div className="h-px w-10 bg-[#B8956A]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8956A]" />
          <div className="h-px w-10 bg-[#B8956A]/50" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.4em] uppercase text-[#B8956A] mb-6 font-light"
        >
          Your Next Chapter Starts Here
        </motion.p>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
          style={{ color: "#F5F0EB" }}
        >
          Ready to Find Your<br />
          <em className="italic" style={{ color: "#B8956A" }}>Dream Home?</em>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="font-[family-name:var(--font-body)] text-[#F5F0EB]/55 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-12"
        >
          Whether you&apos;re buying your first home or your fifth, I bring the same
          dedication, market expertise, and personal touch to every transaction.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 bg-[#B8956A] text-[#FFFCF8] hover:bg-[#8B6F47] transition-all duration-300 min-w-[220px] text-center"
          >
            Start the Conversation
          </a>
          <a
            href="tel:4155721220"
            className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 border border-[#F5F0EB]/30 text-[#F5F0EB] hover:border-[#B8956A] hover:text-[#B8956A] transition-all duration-300 min-w-[220px] text-center"
          >
            Call 415.572.1220
          </a>
        </motion.div>

      </div>
    </section>
  );
}
