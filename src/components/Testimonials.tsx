"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Our family was outgrowing our home, and after months of searching on our own, we couldn't secure the right place. From our very first consultation, Jacky zeroed in on exactly what we needed. He secured our dream home with a single offer — and negotiated us in under the sellers' asking price of $1.25M. We couldn't believe it.",
    name: "Y.C.",
    location: "San Francisco",
  },
  {
    quote:
      "I'd been going back and forth on whether to sell, and Jacky made the decision easy. He laid out a clear roadmap and guided me every step of the way. When I told him I wanted $880,000, he didn't just meet that number — he secured an additional $60K above my asking price. I couldn't have asked for a better outcome.",
    name: "C.L.",
    location: "Daly City",
  },
  {
    quote:
      "Selling a BMR unit is incredibly complex, but Jacky handled it all with patience and expertise. He coordinated directly with the city, managed every requirement, and even took care of the mandatory repairs needed for resale. He truly went above and beyond — I never had to worry about a thing.",
    name: "J.Z.",
    location: "San Francisco",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#B8956A" aria-hidden="true">
          <path d="M6.5 1l1.35 2.74 3.02.44-2.19 2.13.52 3.02L6.5 7.9 3.8 9.33l.52-3.02L2.13 4.18l3.02-.44L6.5 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" aria-label="Client testimonials" className="bg-[#2C2825] py-24 px-6 relative overflow-hidden">

      {/* ── Decorative large quotation mark ── */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-[family-name:var(--font-heading)] text-[18rem] leading-none text-[#B8956A]/8 font-normal"
        >
          &ldquo;
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] mb-4 font-light"
          >
            Client Experiences
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light"
            style={{ color: "#F5F0EB" }}
          >
            Words From Those I&apos;ve Served
          </motion.h2>
        </div>

        {/* ── Cards ── */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col p-7 border border-[#B8956A]/20 bg-white/[0.04]"
            >
              <Stars />

              {/* Quote */}
              <blockquote className="font-[family-name:var(--font-body)] text-[#F5F0EB]/80 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="border-t border-[#B8956A]/20 pt-5">
                <p className="font-[family-name:var(--font-heading)] text-[#B8956A] text-base font-normal">
                  — {t.name}
                </p>
                <p className="font-[family-name:var(--font-body)] text-[#F5F0EB]/40 text-[10px] tracking-[0.2em] uppercase mt-0.5">
                  {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
