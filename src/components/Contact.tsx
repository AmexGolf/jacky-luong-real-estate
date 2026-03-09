"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const contactDetails = [
  {
    label: "415.572.1220",
    href: "tel:4155721220",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M2.5 1.5h2.25l1 2.5L4.5 5.25a8.5 8.5 0 003.25 3.25L9 7.25l2.5 1v2.25A1 1 0 0110.5 11.5C4.977 11.5 1.5 8.023 1.5 2.5A1 1 0 012.5 1.5z"
          stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "jacky@kineticrealestate.com",
    href: "mailto:jacky@kineticrealestate.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M1.5 4.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "DRE #02254871",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M5 7.5h5M7.5 5v5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 17v-4a2 2 0 014 0v4M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 8h-1.5A1.5 1.5 0 0012 9.5V12h3l-.5 3H12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const inputClass = [
  "w-full bg-white border border-[#E8E0D8] px-4 py-3",
  "font-[family-name:var(--font-body)] text-sm text-[#2C2825] placeholder-[#B5ADA5]",
  "focus:outline-none focus:border-[#B8956A] transition-colors duration-200",
  "rounded-none",
].join(" ");

const labelClass =
  "block font-[family-name:var(--font-body)] text-[10px] tracking-[0.18em] uppercase text-[#6B6560] mb-1.5";

interface FormState {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  interest:  string;
  priceRange: string;
  message:   string;
}

const emptyForm: FormState = {
  firstName:  "",
  lastName:   "",
  email:      "",
  phone:      "",
  interest:   "",
  priceRange: "",
  message:    "",
};

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form,    setForm]    = useState<FormState>(emptyForm);
  const [status,  setStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(emptyForm); // clear the form
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" ref={ref} aria-label="Contact Jacky Luong" className="bg-[#FAF7F3] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-14 lg:gap-20">

          {/* ── Left Column ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="w-full md:w-[42%] flex-shrink-0"
          >
            <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase text-[#B8956A] mb-4 font-light">
              Get in Touch
            </p>

            <h2
              className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-normal leading-tight mb-5"
              style={{ color: "#2C2825" }}
            >
              Let&apos;s Find Your<br />Future Home
            </h2>

            <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm leading-relaxed mb-10">
              Whether you&apos;re buying or selling in the San Francisco Bay Area,
              I&apos;d love to learn about your real estate goals. Every journey
              starts with a conversation.
            </p>

            <div className="w-10 h-px bg-[#B8956A]/40 mb-8" />

            <div className="space-y-4 mb-10">
              {contactDetails.map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-3 group w-fit">
                  <span className="text-[#B8956A] group-hover:text-[#8B6F47] transition-colors duration-200 flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm group-hover:text-[#2C2825] transition-colors duration-200">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="text-[#6B6560] hover:text-[#B8956A] transition-colors duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right Column: Form ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
            className="w-full md:w-[58%]"
          >
            {/* ── Success state ── */}
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#B8956A] flex items-center justify-center text-[#B8956A]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[#2C2825] font-normal">
                  Message Received
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#6B6560] text-sm max-w-xs">
                  Thank you! I&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Error banner */}
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm font-[family-name:var(--font-body)] text-red-700">
                    Something went wrong. Please call me directly at{" "}
                    <a href="tel:4155721220" className="underline font-medium">415.572.1220</a>
                  </div>
                )}

                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First Name</label>
                    <input
                      id="firstName" name="firstName" type="text"
                      placeholder="Jane" required
                      value={form.firstName} onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>Last Name</label>
                    <input
                      id="lastName" name="lastName" type="text"
                      placeholder="Smith"
                      value={form.lastName} onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="jane@example.com" required
                    value={form.email} onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone Number</label>
                  <input
                    id="phone" name="phone" type="tel"
                    placeholder="(415) 000-0000"
                    value={form.phone} onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Interest dropdown */}
                <div>
                  <label htmlFor="interest" className={labelClass}>I&apos;m Interested In...</label>
                  <select
                    id="interest" name="interest"
                    value={form.interest} onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>Select one</option>
                    <option value="Buying">Buying</option>
                    <option value="Selling">Selling</option>
                    <option value="Both">Both</option>
                    <option value="Just Exploring">Just Exploring</option>
                  </select>
                </div>

                {/* Price range */}
                <div>
                  <label htmlFor="priceRange" className={labelClass}>Preferred Price Range</label>
                  <select
                    id="priceRange" name="priceRange"
                    value={form.priceRange} onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="Under $1M">Under $1M</option>
                    <option value="$1M – $2M">$1M – $2M</option>
                    <option value="$2M – $5M">$2M – $5M</option>
                    <option value="$5M – $10M">$5M – $10M</option>
                    <option value="$10M+">$10M+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message" name="message"
                    rows={4}
                    placeholder="Tell me a little about what you're looking for..."
                    value={form.message} onChange={handleChange}
                    className={inputClass + " resize-none"}
                  />
                </div>

                {/* Submit */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium py-4 bg-[#B8956A] text-[#FFFCF8] hover:bg-[#8B6F47] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending…" : "Start the Conversation"}
                  </button>
                  <p className="font-[family-name:var(--font-body)] text-[#B5ADA5] text-[10px] text-center mt-3 tracking-wide">
                    Your information is kept strictly confidential.
                  </p>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
