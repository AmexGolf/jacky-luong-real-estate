const quickLinks = [
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Neighborhoods", href: "#neighborhoods" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 8h-1.5A1.5 1.5 0 0012 9.5V12h3l-.5 3H12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-[#2C2825] text-[#F5F0EB]">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-8">

        {/* ── Top Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">

          {/* Col 1 — Brand */}
          <div>
            <p
              className="font-[family-name:var(--font-heading)] text-xl tracking-[0.15em] uppercase font-semibold mb-1"
              style={{ fontVariant: "small-caps", color: "#F5F0EB" }}
            >
              Jacky Luong
            </p>
            <p className="font-[family-name:var(--font-body)] text-[9px] tracking-[0.3em] uppercase text-[#B8956A] font-light mb-5">
              Real Estate
            </p>
            <p className="font-[family-name:var(--font-heading)] text-sm italic text-[#F5F0EB]/50 mb-4 leading-relaxed">
              Coaching You to Your Future Home
            </p>
            <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.2em] uppercase text-[#F5F0EB]/30">
              DRE #02254871
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.3em] uppercase text-[#B8956A] mb-5 font-light">
              Quick Links
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-body)] text-sm text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.3em] uppercase text-[#B8956A] mb-5 font-light">
              Contact
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href="tel:4155721220"
                className="font-[family-name:var(--font-body)] text-sm text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors duration-200"
              >
                415.572.1220
              </a>
              <a
                href="mailto:jacky@kineticrealestate.com"
                className="font-[family-name:var(--font-body)] text-sm text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors duration-200"
              >
                jacky@kineticrealestate.com
              </a>
              <p className="font-[family-name:var(--font-body)] text-sm text-[#F5F0EB]/40">
                San Francisco Bay Area, CA
              </p>
            </div>

            {/* Social icons */}
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-[#F5F0EB]/40 hover:text-[#B8956A] transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-[#B8956A]/25 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-4">
            <p className="font-[family-name:var(--font-body)] text-[10px] text-[#F5F0EB]/30 tracking-wide">
              &copy; 2026 Jacky Luong | Kinetic Real Estate. All rights reserved.
            </p>
            <span className="hidden md:inline text-[#F5F0EB]/15">|</span>
            <p className="font-[family-name:var(--font-body)] text-[10px] text-[#F5F0EB]/30 tracking-wide">
              DRE #02254871
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="font-[family-name:var(--font-body)] text-[10px] text-[#F5F0EB]/30 hover:text-[#F5F0EB]/60 transition-colors duration-200 tracking-wide">
              Privacy Policy
            </a>
            <span className="text-[#F5F0EB]/15">|</span>
            <a href="#" className="font-[family-name:var(--font-body)] text-[10px] text-[#F5F0EB]/30 hover:text-[#F5F0EB]/60 transition-colors duration-200 tracking-wide">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
