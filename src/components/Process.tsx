"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a conversation — your goals, timeline, and what your ideal home (or sale) looks like. No pressure, just clarity.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M11 7v4.5l3 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "I build a custom game plan tailored to your situation — market positioning, pricing strategy, neighborhood targets, and timing.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.25" />
        <path d="M7 11h8M7 7.5h5M7 14.5h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Negotiation",
    description:
      "I leverage deep market knowledge and a proven negotiation approach to protect your interests — whether buying below ask or selling above.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 16L8 12L11 15L15 9L18 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 18h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Close with Confidence",
    description:
      "I guide you through every document, deadline, and decision — so you arrive at closing day informed, calm, and ready to celebrate.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M5 11l4 4 8-8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      ref={ref}
      aria-label="How I work"
      className="bg-[#FFFCF8] py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] mb-4 font-light"
          >
            My Approach
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light leading-tight"
            style={{ color: "#2C2825" }}
          >
            A Proven Process,<br />
            <em className="font-light italic">Tailored for You</em>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-10 h-px bg-[#B8956A]/50 mt-6 origin-left"
            aria-hidden="true"
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative group"
            >
              {/* Connector line between steps (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-full w-full h-px bg-[#E8E0D8] z-0"
                  style={{ width: "calc(100% - 24px)", left: "calc(100% - 12px)" }}
                  aria-hidden="true"
                />
              )}

              {/* Step number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-[family-name:var(--font-heading)] text-[11px] tracking-[0.3em] text-[#B8956A]/60 font-light">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-[#E8E0D8] lg:hidden" aria-hidden="true" />
              </div>

              {/* Icon */}
              <div className="text-[#B8956A] mb-5 group-hover:text-[#8B6F47] transition-colors duration-300">
                {step.icon}
              </div>

              {/* Title */}
              <h3
                className="font-[family-name:var(--font-heading)] text-xl font-normal mb-3 leading-tight"
                style={{ color: "#2C2825" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
