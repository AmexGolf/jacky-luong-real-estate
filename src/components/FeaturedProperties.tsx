"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const properties = [
  {
    price: "$1,100,000",
    location: "San Francisco",
    tag: "Sold",
    tagStyle: "bg-[#2C2825] text-[#B8956A]",
    image: "/images/Property1.webp",
    imageAlt: "Sold home in San Francisco for $1,100,000",
  },
  {
    price: "$940,000",
    location: "Daly City",
    tag: "Sold — $60K Over Asking",
    tagStyle: "bg-[#B8956A] text-[#2C2825]",
    image: "/images/property2.jpeg",
    imageAlt: "Sold home in Daly City for $940,000 — $60K over asking price",
  },
  {
    price: "$422,000",
    location: "San Francisco",
    tag: "In Contract",
    tagStyle: "bg-[#8B6F47] text-[#F5F0EB]",
    image: "/images/Property3.jpg",
    imageAlt: "Property in contract in San Francisco at $422,000",
  },
];

export default function FeaturedProperties() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="properties" aria-label="Featured properties" className="bg-[#FFFCF8] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-8 h-px bg-[#B8956A] mx-auto mb-5 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] mb-4 font-light"
          >
            Curated Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light mb-4"
            style={{ color: "#2C2825" }}
          >
            Featured Properties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm font-light max-w-md mx-auto"
          >
            Hand-selected homes in the Bay Area&apos;s most prestigious neighborhoods
          </motion.p>
        </div>

        {/* ── Cards Grid ── */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group cursor-pointer"
            >
              <div className="bg-[#FAF7F3] border border-[#E8E0D8] overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(44,40,37,0.12)]">

                {/* Property photo */}
                <div className="relative overflow-hidden h-56 bg-[#EDE8E2]">
                  <Image
                    src={property.image}
                    alt={property.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    quality={80}
                    style={{ borderRadius: 0 }}
                  />

                  {/* Tag badge */}
                  <span
                    className={[
                      "absolute top-4 left-4 z-10",
                      "font-[family-name:var(--font-body)] text-[9px] tracking-[0.18em] uppercase font-medium",
                      "px-3 py-1.5",
                      property.tagStyle,
                    ].join(" ")}
                  >
                    {property.tag}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-5 pt-5 pb-0">
                  <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-normal text-[#2C2825] mb-1 leading-none">
                    {property.price}
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-xs tracking-[0.12em] uppercase font-light mb-5">
                    {property.location}
                  </p>

                  {/* Gold bottom line */}
                  <div className="h-px bg-[#B8956A]/40 -mx-5 transition-colors duration-300 group-hover:bg-[#B8956A]" />
                </div>

                {/* Card footer */}
                <div className="px-5 py-4">
                  <span className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.2em] uppercase text-[#B8956A] font-light group-hover:text-[#8B6F47] transition-colors duration-300">
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-block font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 border border-[#2C2825] text-[#2C2825] hover:bg-[#2C2825] hover:text-[#FFFCF8] transition-all duration-300"
          >
            View All Properties
          </a>
        </motion.div>

      </div>
    </section>
  );
}
