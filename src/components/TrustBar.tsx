"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "Bay Area", label: "Market Expert" },
  { value: "5-Star", label: "Client Reviews" },
  { value: "DRE #02254871", label: "Licensed Agent" },
];

export default function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Credentials and trust indicators"
      className="bg-[#FFFCF8] border-t border-[#B8956A]/30"
    >
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-y-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center px-4"
            >
              {/* Divider — between items on desktop */}
              {i > 0 && (
                <span
                  className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-[#B8956A]/30"
                  aria-hidden="true"
                />
              )}

              <span
                className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-normal tracking-wide text-[#2C2825] mb-1"
              >
                {stat.value}
              </span>

              <span className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.28em] uppercase text-[#B8956A] font-light">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
