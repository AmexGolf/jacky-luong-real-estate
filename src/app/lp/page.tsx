"use client";

import { useState } from "react";
import Image from "next/image";

const INTEREST_OPTIONS = [
  { value: "Buy",    label: "Buying a Home" },
  { value: "Sell",   label: "Selling a Home" },
  { value: "Both",   label: "Buying & Selling" },
  { value: "Invest", label: "Investing in Real Estate" },
];

const TESTIMONIALS = [
  {
    quote: "Jacky zeroed in on exactly what we needed and secured our dream home with a single offer — negotiating us in under the sellers' asking price of $1.25M.",
    name: "Y.C.",
    location: "San Francisco",
  },
  {
    quote: "When I told him I wanted $880,000, he didn't just meet that number — he secured an additional $60K above my asking price.",
    name: "C.L.",
    location: "Daly City",
  },
  {
    quote: "He coordinated directly with the city, managed every requirement, and even took care of mandatory repairs. He truly went above and beyond.",
    name: "J.Z.",
    location: "San Francisco",
  },
];

function StarRow() {
  return (
    <div className="flex gap-1" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#B8956A" aria-hidden="true">
          <path d="M6.5 1l1.35 2.74 3.02.44-2.19 2.13.52 3.02L6.5 7.9 3.8 9.33l.52-3.02L2.13 4.18l3.02-.44L6.5 1z" />
        </svg>
      ))}
    </div>
  );
}

const inputBase =
  "w-full px-4 py-3 font-[family-name:var(--font-body)] text-sm outline-none border transition-colors duration-150";
const inputStyle = { background: "#FFFCF8", borderColor: "#E8E0D8", color: "#2C2825" };

function Input({
  label, name, type = "text", value, onChange, placeholder, required,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-[family-name:var(--font-body)] text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5"
        style={{ color: "#8B6F47" }}
      >
        {label}{required && <span style={{ color: "#B8956A" }}> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={inputBase}
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#B8956A")}
        onBlur={(e) => (e.target.style.borderColor = "#E8E0D8")}
      />
    </div>
  );
}

function ThankYou() {
  return (
    <div className="text-center py-8 px-2">
      {/* Checkmark circle */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ background: "#B8956A" }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14l6 6 10-12" stroke="#FFFCF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3
        className="font-[family-name:var(--font-heading)] text-2xl font-normal mb-3"
        style={{ color: "#2C2825" }}
      >
        You&apos;re All Set!
      </h3>
      <p
        className="font-[family-name:var(--font-body)] text-sm leading-relaxed mb-6"
        style={{ color: "#6B6560" }}
      >
        Thanks for reaching out. Jacky will personally be in touch within 24 hours to answer your questions and get started.
      </p>
      <div className="space-y-2">
        <p className="font-[family-name:var(--font-body)] text-xs" style={{ color: "#B5ADA5" }}>
          Questions? Call directly:
        </p>
        <a
          href="tel:4155721220"
          className="font-[family-name:var(--font-heading)] text-xl"
          style={{ color: "#B8956A" }}
        >
          415.572.1220
        </a>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "", interest: "Buy",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/lp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen font-[family-name:var(--font-body)]"
      style={{ background: "#FFFCF8" }}
    >
      {/* ── Main hero area ─────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* ── LEFT: Hero panel ── */}
        <div
          className="flex flex-col justify-between px-8 py-10 lg:px-14 lg:py-14 lg:w-[52%]"
          style={{
            background: "linear-gradient(160deg, #1C1612 0%, #2C2118 50%, #1A150F 100%)",
          }}
        >
          {/* Top: Logo */}
          <div className="mb-10 lg:mb-0">
            <p
              className="font-[family-name:var(--font-heading)] text-xl tracking-[0.15em] uppercase font-semibold"
              style={{ fontVariant: "small-caps", color: "#F5F0EB" }}
            >
              Jacky Luong
            </p>
            <p
              className="font-[family-name:var(--font-body)] text-[9px] tracking-[0.3em] uppercase mt-0.5"
              style={{ color: "#B8956A" }}
            >
              Real Estate · DRE #02254871
            </p>
          </div>

          {/* Middle: Headline + bullets */}
          <div className="flex-1 flex flex-col justify-center py-10 lg:py-0">
            {/* Pre-headline */}
            <p
              className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase font-light mb-4"
              style={{ color: "#B8956A" }}
            >
              San Francisco Bay Area
            </p>

            {/* Main headline */}
            <h1
              className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-normal leading-[1.1] mb-6"
              style={{ color: "#FFFFFF" }}
            >
              Your Expert Guide
              <br />
              to the{" "}
              <em className="font-light" style={{ fontStyle: "italic", color: "#B8956A" }}>
                Bay Area
              </em>
            </h1>

            {/* Divider */}
            <div className="w-10 h-px mb-6" style={{ background: "#B8956A" }} />

            {/* Subheadline */}
            <p
              className="font-[family-name:var(--font-body)] text-sm leading-relaxed max-w-md mb-10 font-light"
              style={{ color: "#F5F0EB99" }}
            >
              Whether you&apos;re buying your dream home, selling for top dollar, or exploring investment opportunities — get personalized, expert guidance from a trusted local specialist.
            </p>

            {/* Trust bullets */}
            <div className="space-y-3 mb-10">
              {[
                "5-Star rated — every transaction, every time",
                "Deep knowledge of SF, Daly City & the Peninsula",
                "Proven results: sold $60K over asking, secured homes under list price",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "#B8956A22", border: "1px solid #B8956A66" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3" stroke="#B8956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-sm font-light" style={{ color: "#F5F0EBB3" }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { value: "5★", label: "Rated" },
                { value: "$60K+", label: "Over Asking" },
                { value: "100%", label: "Committed" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-[family-name:var(--font-heading)] text-2xl font-normal"
                    style={{ color: "#B8956A" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.15em] uppercase font-light"
                    style={{ color: "#F5F0EB40" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Agent photo */}
          <div className="hidden lg:flex items-end gap-5 mt-10">
            <div
              className="relative w-16 h-16 overflow-hidden flex-shrink-0"
              style={{ border: "1px solid #B8956A40" }}
            >
              <Image
                src="/images/Headshot.png"
                alt="Jacky Luong"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="font-[family-name:var(--font-heading)] text-base font-normal" style={{ color: "#F5F0EB" }}>
                Jacky Luong
              </p>
              <p className="font-[family-name:var(--font-body)] text-[10px] tracking-wide" style={{ color: "#B8956A" }}>
                Real Estate Specialist · Kinetic Real Estate
              </p>
              <a
                href="tel:4155721220"
                className="font-[family-name:var(--font-body)] text-xs mt-0.5 block"
                style={{ color: "#F5F0EB60" }}
              >
                415.572.1220
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form panel ── */}
        <div
          className="flex items-center justify-center px-6 py-12 lg:py-0 lg:w-[48%]"
          style={{ background: "#F5F0EB" }}
        >
          <div className="w-full max-w-md">
            {/* Card */}
            <div
              className="px-8 py-10 shadow-[0_8px_48px_rgba(44,40,37,0.10)]"
              style={{ background: "#FFFCF8", border: "1px solid #E8E0D8" }}
            >
              {submitted ? (
                <ThankYou />
              ) : (
                <>
                  {/* Card header */}
                  <div className="mb-7">
                    <div className="w-6 h-px mb-4" style={{ background: "#B8956A" }} />
                    <h2
                      className="font-[family-name:var(--font-heading)] text-2xl font-normal mb-1"
                      style={{ color: "#2C2825" }}
                    >
                      Get Your Free Consultation
                    </h2>
                    <p
                      className="font-[family-name:var(--font-body)] text-xs leading-relaxed"
                      style={{ color: "#6B6560" }}
                    >
                      No pressure, no obligation — just expert advice tailored to you.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="First Name" name="firstName" value={form.firstName} onChange={set("firstName")} placeholder="Jacky" required />
                      <Input label="Last Name" name="lastName" value={form.lastName} onChange={set("lastName")} placeholder="Luong" />
                    </div>
                    <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(415) 000-0000" required />
                    <Input label="Email" name="email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" required />

                    {/* Interest */}
                    <div>
                      <label
                        htmlFor="interest"
                        className="block font-[family-name:var(--font-body)] text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5"
                        style={{ color: "#8B6F47" }}
                      >
                        I&apos;m Interested In
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {INTEREST_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => set("interest")(opt.value)}
                            className="px-3 py-2.5 text-left font-[family-name:var(--font-body)] text-xs transition-all duration-150 border"
                            style={{
                              background: form.interest === opt.value ? "#2C2825" : "#FFFCF8",
                              borderColor: form.interest === opt.value ? "#2C2825" : "#E8E0D8",
                              color: form.interest === opt.value ? "#B8956A" : "#6B6560",
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {error && (
                      <p className="font-[family-name:var(--font-body)] text-xs" style={{ color: "#DC2626" }}>
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-200 disabled:opacity-60 mt-2"
                      style={{ background: "#B8956A", color: "#FFFCF8" }}
                      onMouseEnter={(e) => { if (!loading) (e.currentTarget.style.background = "#8B6F47"); }}
                      onMouseLeave={(e) => { (e.currentTarget.style.background = "#B8956A"); }}
                    >
                      {loading ? "Sending..." : "Schedule My Free Consultation →"}
                    </button>
                  </form>

                  {/* Trust signals */}
                  <div className="mt-6 pt-5 border-t flex items-center justify-center gap-6" style={{ borderColor: "#E8E0D8" }}>
                    {["No Obligation", "Response in 24hrs", "100% Free"].map((t) => (
                      <div key={t} className="flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5 3.5-4" stroke="#B8956A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-[family-name:var(--font-body)] text-[10px]" style={{ color: "#B5ADA5" }}>
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Below card: phone CTA */}
            <div className="text-center mt-6">
              <p className="font-[family-name:var(--font-body)] text-xs mb-1" style={{ color: "#B5ADA5" }}>
                Prefer to call directly?
              </p>
              <a
                href="tel:4155721220"
                className="font-[family-name:var(--font-heading)] text-xl transition-colors duration-200"
                style={{ color: "#2C2825" }}
                onMouseEnter={(e) => { (e.currentTarget.style.color = "#B8956A"); }}
                onMouseLeave={(e) => { (e.currentTarget.style.color = "#2C2825"); }}
              >
                415.572.1220
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonials section ─────────────────────────────────────── */}
      <section style={{ background: "#2C2825" }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.35em] uppercase font-light mb-3"
              style={{ color: "#B8956A" }}
            >
              Client Experiences
            </p>
            <h2
              className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-normal"
              style={{ color: "#F5F0EB" }}
            >
              Real Results. Real Clients.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="p-6 border"
                style={{ background: "#FFFFFF08", borderColor: "#B8956A20" }}
              >
                <StarRow />
                <blockquote
                  className="font-[family-name:var(--font-body)] text-sm leading-relaxed mt-4 mb-5"
                  style={{ color: "#F5F0EBCC" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t pt-4" style={{ borderColor: "#B8956A20" }}>
                  <p className="font-[family-name:var(--font-heading)] text-sm" style={{ color: "#B8956A" }}>
                    — {t.name}
                  </p>
                  <p
                    className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.18em] uppercase mt-0.5"
                    style={{ color: "#F5F0EB30" }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p
              className="font-[family-name:var(--font-body)] text-sm font-light mb-5"
              style={{ color: "#F5F0EB60" }}
            >
              Ready to get started?
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 transition-all duration-300"
              style={{ background: "#B8956A", color: "#FFFCF8" }}
              onMouseEnter={(e) => { (e.currentTarget.style.background = "#8B6F47"); }}
              onMouseLeave={(e) => { (e.currentTarget.style.background = "#B8956A"); }}
            >
              Get Your Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer bar ───────────────────────────────────────────────── */}
      <div className="py-5 px-6 text-center border-t" style={{ background: "#1A1610", borderColor: "#2C2420" }}>
        <p className="font-[family-name:var(--font-body)] text-[10px]" style={{ color: "#3D3530" }}>
          © {new Date().getFullYear()} Jacky Luong | Kinetic Real Estate · DRE #02254871 · All rights reserved.
        </p>
      </div>
    </div>
  );
}
