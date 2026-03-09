"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const neighborhoods = [
  {
    name: "Pacific Heights",
    region: "San Francisco",
    description: "Grand Victorians, panoramic bay views, and some of the city's most prestigious addresses.",
    image: "/images/pacific-heights.jpg",
    imageAlt: "Pacific Heights neighborhood in San Francisco — luxury Victorian homes with bay views",
  },
  {
    name: "Hillsborough",
    region: "San Mateo County",
    description: "Secluded estates on lush, tree-lined lots just 25 minutes south of the city.",
    image: "/images/hillsborough.jpg",
    imageAlt: "Hillsborough, San Mateo County — luxury estate homes on wooded lots",
  },
  {
    name: "Atherton",
    region: "Silicon Valley",
    description: "One of the most affluent zip codes in the nation — tech wealth meets old-money elegance.",
    image: "/images/atherton.jpg",
    imageAlt: "Atherton, Silicon Valley — one of the most exclusive residential communities in the US",
  },
  {
    name: "Palo Alto",
    region: "Silicon Valley",
    description: "World-class schools, walkable downtown, and a vibrant innovation ecosystem.",
    image: "/images/palo-alto.jpg",
    imageAlt: "Palo Alto, Silicon Valley — charming homes near Stanford University",
  },
  {
    name: "Noe Valley",
    region: "San Francisco",
    description: "Sun-drenched, village-like charm with boutique shops and young family energy.",
    image: "/images/noe-valley.jpg",
    imageAlt: "Noe Valley neighborhood in San Francisco — sunny streets with Victorian and Edwardian homes",
  },
  {
    name: "Tiburon",
    region: "Marin County",
    description: "Waterfront living with breathtaking views of the bay and San Francisco skyline.",
    image: "/images/tiburon.jpg",
    imageAlt: "Tiburon, Marin County — luxury waterfront homes with San Francisco bay views",
  },
];

/* Gradient placeholder palette for each card (shows until image loads) */
const cardGradients = [
  "from-[#3D2E1E] to-[#1A120A]",
  "from-[#1E2E2A] to-[#0D1A17]",
  "from-[#1E1E2E] to-[#0D0D1A]",
  "from-[#2E2A1E] to-[#1A160A]",
  "from-[#1E2E1E] to-[#0D1A0D]",
  "from-[#2E1E2A] to-[#1A0D16]",
];

function NeighborhoodCard({
  n,
  gradient,
  delay,
  inView,
}: {
  n: (typeof neighborhoods)[number];
  gradient: string;
  delay: number;
  inView: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden cursor-pointer"
      style={{ aspectRatio: "4 / 3" }}
    >
      {/* Gradient placeholder — always present as base */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} aria-hidden="true" />

      {/* Photo — hidden on load failure so no broken-image icon shows */}
      {!imgFailed && (
        <Image
          src={n.image}
          alt={n.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          quality={75}
          onError={() => setImgFailed(true)}
          style={{ borderRadius: 0 }}
        />
      )}

      {/* Permanent gradient overlay (bottom) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(14,11,8,0.88) 0%, rgba(14,11,8,0.4) 45%, rgba(14,11,8,0.05) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Hover darkening */}
      <div
        className="absolute inset-0 bg-[#2C2825]/0 group-hover:bg-[#2C2825]/20 transition-colors duration-500"
        aria-hidden="true"
      />

      {/* Gold top accent line — slides in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-[#B8956A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        aria-hidden="true"
      />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="font-[family-name:var(--font-body)] text-[9px] tracking-[0.3em] uppercase text-[#B8956A] mb-1.5 font-light">
          {n.region}
        </p>
        <h3
          className="font-[family-name:var(--font-heading)] text-2xl font-normal mb-2 leading-tight"
          style={{ color: "#F5F0EB" }}
        >
          {n.name}
        </h3>
        <p className="font-[family-name:var(--font-body)] text-[#F5F0EB]/0 group-hover:text-[#F5F0EB]/70 text-xs leading-relaxed transition-all duration-500 max-w-[260px]">
          {n.description}
        </p>
        <p className="font-[family-name:var(--font-body)] text-[9px] tracking-[0.2em] uppercase text-[#B8956A]/0 group-hover:text-[#B8956A] transition-all duration-500 mt-3 font-light">
          Explore →
        </p>
      </div>
    </motion.div>
  );
}

export default function Neighborhoods() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="neighborhoods"
      aria-label="Featured neighborhoods"
      className="bg-[#2C2825] py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-8 h-px bg-[#B8956A] mx-auto mb-5 origin-center"
            aria-hidden="true"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] mb-4 font-light"
          >
            Explore the Area
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light mb-4"
            style={{ color: "#F5F0EB" }}
          >
            Featured Neighborhoods
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="font-[family-name:var(--font-body)] text-[#F5F0EB]/50 text-sm font-light max-w-md mx-auto"
          >
            Deep local knowledge across the Bay Area&apos;s most sought-after communities
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {neighborhoods.map((n, i) => (
            <NeighborhoodCard
              key={n.name}
              n={n}
              gradient={cardGradients[i]}
              delay={0.1 + i * 0.1}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
