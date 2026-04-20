"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 200, suffix: "+", label: "Homes Closed", description: "Across SF & Silicon Valley" },
  { value: 500, prefix: "$", suffix: "M+", label: "Sales Volume", description: "In total real estate transactions" },
  { value: 15, suffix: "+", label: "Years Experience", description: "Deep Bay Area market knowledge" },
  { value: 100, suffix: "%", label: "5-Star Reviews", description: "Client satisfaction is everything" },
];

function CountUp({ target, prefix = "", suffix = "", inView }: {
  target: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, inView]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Agent statistics"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1C1612 0%, #2C2118 50%, #1A150F 100%)",
      }}
    >
      {/* Decorative grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8956A]/40 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8956A]/40 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] font-light mb-2">
            Kinetic Real Estate Team
          </p>
          <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-light text-[#F5F0EB]/80">
            By the Numbers
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center px-6"
            >
              {/* Vertical divider between items on desktop */}
              {i > 0 && (
                <span
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[#B8956A]/20"
                  aria-hidden="true"
                />
              )}

              {/* Number */}
              <span
                className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-light text-[#F5F0EB] mb-3 leading-none"
              >
                <CountUp
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </span>

              {/* Label */}
              <span className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.25em] uppercase text-[#B8956A] font-medium mb-2">
                {stat.label}
              </span>

              {/* Description */}
              <span className="font-[family-name:var(--font-body)] text-[#F5F0EB]/35 text-xs leading-relaxed">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
