"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const contactItems = [
  {
    label: "415.572.1220",
    href: "tel:4155721220",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2.5 1.5h2.25l1 2.5-1.25 1.25a8.5 8.5 0 003.25 3.25L9 7.25l2.5 1v2.25A1 1 0 0110.5 11.5C4.977 11.5 1.5 8.023 1.5 2.5A1 1 0 012.5 1.5z"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "jacky@kineticrealestate.com",
    href: "mailto:jacky@kineticrealestate.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1.5" y="3" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1.5 4l5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "DRE #02254871",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1.5l1.3 2.6 2.9.4-2.1 2 .5 2.9L7 8l-2.6 1.4.5-2.9-2.1-2 2.9-.4L7 1.5z"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} aria-label="About Jacky Luong" className="bg-[#FAF7F3] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">

          {/* ── Left Column: Photo ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-[40%] flex-shrink-0"
          >
            <div className="relative">
              {/* Gold accent border */}
              <div className="absolute -left-3 top-6 bottom-6 w-px bg-[#B8956A]" aria-hidden="true" />

              {/* Professional headshot */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "3 / 4" }}
              >
                <Image
                src="/images/Headshot.png"
                alt="Jacky Luong, San Francisco Bay Area Real Estate Agent"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
                quality={90}
                style={{ borderRadius: 0 }}
              />
              </div>
            </div>

            {/* DRE below photo */}
            <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.22em] uppercase text-[#6B6560] mt-4 pl-1">
              DRE #02254871
            </p>
          </motion.div>

          {/* ── Right Column: Text ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-full md:w-[60%]"
          >
            {/* Pre-title */}
            <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] mb-4 font-light">
              Meet Your Agent
            </p>

            {/* Name */}
            <h2
              className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-normal mb-2 leading-tight"
              style={{ color: "#2C2825" }}
            >
              Jacky Luong
            </h2>

            {/* Subtitle */}
            <p className="font-[family-name:var(--font-body)] text-[#B8956A] text-xs tracking-[0.18em] uppercase font-light mb-8">
              Real Estate Specialist · SF Bay Area
            </p>

            {/* Divider */}
            <div className="w-10 h-px bg-[#B8956A]/50 mb-8" />

            {/* Bio */}
            <div className="space-y-5 mb-10">
              <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm leading-relaxed">
                Born and raised in San Francisco, Jacky Luong brings a lifelong connection to
                the city and its surrounding communities. With deep local roots and an
                entrepreneurial mindset, Jacky is passionate about helping others navigate the
                often complex world of real estate.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm leading-relaxed">
                Jacky enters the real estate space with a strong foundation in client service,
                problem-solving, and strategic planning — skills honed over nearly a decade as
                a coach at Equinox and through his academic background in Exercise Science. He
                understands how to identify key needs, create personalized plans, and deliver
                results, all while maintaining clear and open communication. He believes that
                every successful client relationship begins with listening and ends with a
                shared sense of achievement.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm leading-relaxed">
                Jacky&apos;s first brush with real estate came at home — watching his parents
                negotiate and renovate their family home ignited a natural curiosity that grew
                into a professional calling. Today, he channels that curiosity into a career
                driven by purpose, integrity, and a desire to exceed expectations.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm leading-relaxed">
                Whether guiding first-time buyers to their dream home or working with investors
                to explore new opportunities, Jacky is committed to transparency, hard work,
                and doing right by his clients. His love for photography and design gives him
                an eye for visual storytelling, and his obsession with golf reflects the same
                focus and discipline he brings to every transaction.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm leading-relaxed">
                With Jacky, clients can expect honest guidance, strategic solutions, and a
                partner who&apos;s always one step ahead.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-10">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 group w-fit"
                >
                  <span className="text-[#B8956A] group-hover:text-[#8B6F47] transition-colors duration-200">
                    {item.icon}
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[#6B6560] text-xs tracking-wide group-hover:text-[#2C2825] transition-colors duration-200">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-block font-[family-name:var(--font-body)] text-[11px] tracking-[0.18em] uppercase font-medium px-8 py-4 bg-[#B8956A] text-[#FFFCF8] hover:bg-[#8B6F47] transition-all duration-300"
            >
              Schedule a Consultation
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
