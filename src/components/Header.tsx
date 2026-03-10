"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "Properties",  href: "#properties" },
  { label: "Blog",        href: "#blog" },
  { label: "About",       href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",     href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleMobileLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#FFFCF8] shadow-[0_2px_24px_rgba(44,40,37,0.08)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20 lg:h-24">
          {/* ── Brand ── */}
          <a
            href="#home"
            className="flex flex-col leading-none group"
            aria-label="Jacky Luong Real Estate — Home"
          >
            <span
              className={[
                "font-[family-name:var(--font-heading)] text-lg lg:text-xl font-semibold tracking-[0.18em] uppercase",
                "transition-colors duration-300",
                scrolled ? "text-[#2C2825]" : "text-[#F5F0EB]",
              ].join(" ")}
              style={{ fontVariant: "small-caps" }}
            >
              Jacky Luong
            </span>
            <span
              className={[
                "font-[family-name:var(--font-body)] text-[9px] tracking-[0.3em] uppercase font-light mt-0.5",
                "transition-colors duration-300",
                scrolled ? "text-[#B8956A]" : "text-[#B8956A]",
              ].join(" ")}
            >
              Real Estate
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={[
                  "font-[family-name:var(--font-body)] text-[13px] tracking-[0.12em] uppercase font-light",
                  "relative pb-px transition-colors duration-300",
                  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#B8956A]",
                  "after:transition-[width] after:duration-300 hover:after:w-full",
                  scrolled
                    ? "text-[#6B6560] hover:text-[#2C2825]"
                    : "text-[#F5F0EB]/80 hover:text-[#F5F0EB]",
                ].join(" ")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop Right ── */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Phone */}
            <a
              href="tel:4155721220"
              aria-label="Call 415-572-1220"
              className={[
                "font-[family-name:var(--font-body)] text-[12px] tracking-[0.1em] transition-colors duration-300",
                scrolled
                  ? "text-[#6B6560] hover:text-[#2C2825]"
                  : "text-[#F5F0EB]/70 hover:text-[#F5F0EB]",
              ].join(" ")}
            >
              415.572.1220
            </a>

            {/* CTA Button */}
            <a
              href="#contact"
              className={[
                "font-[family-name:var(--font-body)] text-[11px] tracking-[0.15em] uppercase font-medium",
                "px-6 py-3 border transition-all duration-300",
                scrolled
                  ? "border-[#B8956A] text-[#B8956A] hover:bg-[#B8956A] hover:text-[#FFFCF8]"
                  : "border-[#B8956A]/70 text-[#B8956A] hover:border-[#B8956A] hover:bg-[#B8956A]/10",
              ].join(" ")}
            >
              Schedule Consultation
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2 group"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={[
                  "block h-px w-6 transition-all duration-300 origin-center",
                  scrolled ? "bg-[#2C2825]" : "bg-[#F5F0EB]",
                  menuOpen && i === 0 ? "translate-y-[8.5px] rotate-45" : "",
                  menuOpen && i === 1 ? "opacity-0 scale-x-0" : "",
                  menuOpen && i === 2
                    ? "-translate-y-[8.5px] -rotate-45"
                    : "",
                ].join(" ")}
                aria-hidden="true"
              />
            ))}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#2C2825]/40 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-label="Mobile navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: [0.32, 0, 0.17, 1],
              }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-[#FFFCF8] shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-8 h-20 border-b border-[#E8E0D8]">
                <span
                  className="font-[family-name:var(--font-heading)] text-base tracking-[0.18em] uppercase text-[#2C2825]"
                  style={{ fontVariant: "small-caps" }}
                >
                  Jacky Luong
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-[#6B6560] hover:text-[#2C2825] transition-colors duration-200 p-1"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 4l12 12M16 4L4 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-8 pt-8 gap-1 flex-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleMobileLinkClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.3 }}
                    className={[
                      "font-[family-name:var(--font-heading)] text-2xl font-light text-[#2C2825]",
                      "py-3 border-b border-[#E8E0D8] hover:text-[#B8956A]",
                      "transition-colors duration-200",
                    ].join(" ")}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-8 pb-10 pt-6 flex flex-col gap-4">
                <a
                  href="tel:4155721220"
                  aria-label="Call 415-572-1220"
                  className="font-[family-name:var(--font-body)] text-sm text-[#6B6560] tracking-wide"
                >
                  415.572.1220
                </a>
                <a
                  href="#contact"
                  onClick={handleMobileLinkClick}
                  className={[
                    "font-[family-name:var(--font-body)] text-[11px] tracking-[0.15em] uppercase font-medium",
                    "text-center px-6 py-4 border border-[#B8956A] text-[#B8956A]",
                    "hover:bg-[#B8956A] hover:text-[#FFFCF8] transition-all duration-300",
                  ].join(" ")}
                >
                  Schedule Consultation
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
