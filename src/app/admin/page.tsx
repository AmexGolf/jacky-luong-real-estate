"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SiteData {
  name: string; company: string; tagline: string;
  phone: string; phoneHref: string; email: string; dre: string;
  location: string; social: { instagram: string; linkedin: string; facebook: string };
}
interface HeroData {
  preHeadline: string; headline1: string; headline2: string;
  subheadline: string; cta1: string; cta2: string;
}
interface Property {
  id: string; price: string; location: string;
  status: string; statusLabel: string; image: string; imageAlt: string;
}
interface Testimonial {
  id: string; quote: string; name: string; location: string;
}
interface AboutData {
  name: string; subtitle: string; photo: string; bio: string[];
}
interface BlogPost {
  id: string; category: string; title: string; excerpt: string;
  date: string; readTime: string; slug: string; image: string; imageAlt: string;
  gradient: string; patternColor: string;
}
interface ImageFile { name: string; url: string; }

// ─── Helpers ─────────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2, 9); }

const STATUS_OPTIONS = [
  { value: "sold", label: "Sold" },
  { value: "sold-over", label: "Sold Over Asking" },
  { value: "in-contract", label: "In Contract" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
];

// ─── Shared UI Components ─────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 px-5 py-3 text-sm font-[family-name:var(--font-body)] shadow-xl"
      style={{
        background: type === "success" ? "#2C2825" : "#7C2D12",
        color: "#F5F0EB",
        borderLeft: `3px solid ${type === "success" ? "#B8956A" : "#EF4444"}`,
      }}
    >
      {message}
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8 pb-6 border-b" style={{ borderColor: "#E8E0D8" }}>
      <h2 className="font-[family-name:var(--font-heading)] text-3xl font-normal mb-1" style={{ color: "#2C2825" }}>
        {title}
      </h2>
      <p className="font-[family-name:var(--font-body)] text-sm" style={{ color: "#6B6560" }}>{description}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-[family-name:var(--font-body)] text-[10px] tracking-[0.2em] uppercase font-medium mb-1.5" style={{ color: "#8B6F47" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 font-[family-name:var(--font-body)] text-sm outline-none border transition-colors duration-150";
const inputStyle = { background: "#FFFCF8", borderColor: "#E8E0D8", color: "#2C2825" };

function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputCls}
      style={inputStyle}
      onFocus={(e) => (e.target.style.borderColor = "#B8956A")}
      onBlur={(e) => (e.target.style.borderColor = "#E8E0D8")}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={inputCls + " resize-y"}
      style={inputStyle}
      onFocus={(e) => (e.target.style.borderColor = "#B8956A")}
      onBlur={(e) => (e.target.style.borderColor = "#E8E0D8")}
    />
  );
}

function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
      style={inputStyle}
      onFocus={(e) => (e.target.style.borderColor = "#B8956A")}
      onBlur={(e) => (e.target.style.borderColor = "#E8E0D8")}
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="px-8 py-3 font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-200 disabled:opacity-50"
      style={{ background: "#B8956A", color: "#FFFCF8" }}
      onMouseEnter={(e) => { if (!saving) (e.currentTarget.style.background = "#8B6F47"); }}
      onMouseLeave={(e) => { (e.currentTarget.style.background = "#B8956A"); }}
    >
      {saving ? "Saving..." : "Save Changes"}
    </button>
  );
}

function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-xs font-[family-name:var(--font-body)] transition-colors duration-150"
      style={{ background: "#FEE2E2", color: "#991B1B" }}
      onMouseEnter={(e) => { (e.currentTarget.style.background = "#FCA5A5"); }}
      onMouseLeave={(e) => { (e.currentTarget.style.background = "#FEE2E2"); }}
    >
      Delete
    </button>
  );
}

// ─── Image Picker Modal ───────────────────────────────────────────────────────
function ImagePicker({ currentUrl, onSelect }: { currentUrl: string; onSelect: (url: string) => void }) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadImages = useCallback(async () => {
    const res = await fetch("/api/admin/images");
    if (res.ok) setImages(await res.json());
  }, []);

  useEffect(() => { if (open) loadImages(); }, [open, loadImages]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.ok) {
      await loadImages();
    }
    setUploading(false);
    e.target.value = "";
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        {currentUrl && (
          <div className="relative w-16 h-16 overflow-hidden border" style={{ borderColor: "#E8E0D8" }}>
            <Image src={currentUrl} alt="Selected" fill className="object-cover" />
          </div>
        )}
        <div className="flex-1">
          <Input value={currentUrl} onChange={onSelect} placeholder="/images/photo.jpg" />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2.5 font-[family-name:var(--font-body)] text-xs tracking-wide border transition-colors duration-150 whitespace-nowrap"
          style={{ borderColor: "#2C2825", color: "#2C2825", background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#2C2825"; e.currentTarget.style.color = "#F5F0EB"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2C2825"; }}
        >
          Browse
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(28,22,18,0.7)" }}>
          <div className="w-full max-w-2xl max-h-[80vh] flex flex-col" style={{ background: "#FFFCF8", border: "1px solid #E8E0D8" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#E8E0D8" }}>
              <h3 className="font-[family-name:var(--font-heading)] text-lg" style={{ color: "#2C2825" }}>Select Image</h3>
              <button onClick={() => setOpen(false)} style={{ color: "#6B6560", fontSize: 20 }}>×</button>
            </div>

            <div className="px-6 py-4 border-b" style={{ borderColor: "#E8E0D8" }}>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="px-5 py-2.5 font-[family-name:var(--font-body)] text-xs tracking-widest uppercase border transition-colors duration-150"
                style={{ borderColor: "#B8956A", color: "#B8956A", background: "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#B8956A"; e.currentTarget.style.color = "#FFFCF8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B8956A"; }}
              >
                {uploading ? "Uploading..." : "+ Upload New Image"}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-3 gap-3">
              {images.map((img) => (
                <button
                  key={img.url}
                  onClick={() => { onSelect(img.url); setOpen(false); }}
                  className="relative aspect-square overflow-hidden border-2 transition-all duration-150"
                  style={{ borderColor: currentUrl === img.url ? "#B8956A" : "transparent" }}
                >
                  <Image src={img.url} alt={img.name} fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 px-2 py-1 text-[9px] font-[family-name:var(--font-body)] truncate" style={{ background: "rgba(28,22,18,0.7)", color: "#F5F0EB" }}>
                    {img.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Site Settings ───────────────────────────────────────────────────────
function SiteTab({ onToast }: { onToast: (m: string, t: "success" | "error") => void }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data/site").then((r) => r.json()).then(setData);
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/admin/data/site", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    setSaving(false);
    onToast(res.ok ? "Site settings saved!" : "Failed to save.", res.ok ? "success" : "error");
  }

  if (!data) return <div className="text-sm" style={{ color: "#6B6560" }}>Loading...</div>;

  const set = (k: keyof SiteData, v: string) => setData((d) => d ? { ...d, [k]: v } : d);
  const setSocial = (k: keyof SiteData["social"], v: string) =>
    setData((d) => d ? { ...d, social: { ...d.social, [k]: v } } : d);

  return (
    <div>
      <SectionHeader title="Site Settings" description="Global contact info, branding, and social links" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <Field label="Your Name"><Input value={data.name} onChange={(v) => set("name", v)} /></Field>
        <Field label="Company"><Input value={data.company} onChange={(v) => set("company", v)} /></Field>
        <Field label="Tagline"><Input value={data.tagline} onChange={(v) => set("tagline", v)} /></Field>
        <Field label="Location"><Input value={data.location} onChange={(v) => set("location", v)} /></Field>
        <Field label="Phone (display)"><Input value={data.phone} onChange={(v) => set("phone", v)} placeholder="415.572.1220" /></Field>
        <Field label="Phone (href)"><Input value={data.phoneHref} onChange={(v) => set("phoneHref", v)} placeholder="tel:4155721220" /></Field>
        <Field label="Email"><Input value={data.email} onChange={(v) => set("email", v)} type="email" /></Field>
        <Field label="DRE Number"><Input value={data.dre} onChange={(v) => set("dre", v)} placeholder="02254871" /></Field>
      </div>
      <div className="mb-8">
        <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: "#8B6F47" }}>Social Links</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field label="Instagram URL"><Input value={data.social.instagram} onChange={(v) => setSocial("instagram", v)} placeholder="https://instagram.com/..." /></Field>
          <Field label="LinkedIn URL"><Input value={data.social.linkedin} onChange={(v) => setSocial("linkedin", v)} placeholder="https://linkedin.com/in/..." /></Field>
          <Field label="Facebook URL"><Input value={data.social.facebook} onChange={(v) => setSocial("facebook", v)} placeholder="https://facebook.com/..." /></Field>
        </div>
      </div>
      <SaveButton onClick={save} saving={saving} />
    </div>
  );
}

// ─── Tab: Hero ────────────────────────────────────────────────────────────────
function HeroTab({ onToast }: { onToast: (m: string, t: "success" | "error") => void }) {
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data/hero").then((r) => r.json()).then(setData);
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/admin/data/hero", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    setSaving(false);
    onToast(res.ok ? "Hero section saved!" : "Failed to save.", res.ok ? "success" : "error");
  }

  if (!data) return <div className="text-sm" style={{ color: "#6B6560" }}>Loading...</div>;
  const set = (k: keyof HeroData, v: string) => setData((d) => d ? { ...d, [k]: v } : d);

  return (
    <div>
      <SectionHeader title="Hero Section" description="The first thing visitors see — your headline and call-to-action" />
      <div className="space-y-5 mb-6">
        <Field label="Pre-headline (small text above title)">
          <Input value={data.preHeadline} onChange={(v) => set("preHeadline", v)} placeholder="San Francisco Bay Area Real Estate" />
        </Field>
        <Field label="Headline — Line 1">
          <Input value={data.headline1} onChange={(v) => set("headline1", v)} placeholder="Coaching You to Your" />
        </Field>
        <Field label="Headline — Line 2 (italic)">
          <Input value={data.headline2} onChange={(v) => set("headline2", v)} placeholder="Future Home" />
        </Field>
        <Field label="Subheadline">
          <Textarea value={data.subheadline} onChange={(v) => set("subheadline", v)} rows={3} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Primary Button Text">
            <Input value={data.cta1} onChange={(v) => set("cta1", v)} placeholder="Explore Properties" />
          </Field>
          <Field label="Secondary Button Text">
            <Input value={data.cta2} onChange={(v) => set("cta2", v)} placeholder="Schedule a Consultation" />
          </Field>
        </div>
      </div>
      <SaveButton onClick={save} saving={saving} />
    </div>
  );
}

// ─── Tab: Properties ──────────────────────────────────────────────────────────
function PropertiesTab({ onToast }: { onToast: (m: string, t: "success" | "error") => void }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Property | null>(null);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data/properties").then((r) => r.json()).then(setProperties);
  }, []);

  async function saveAll(updated: Property[]) {
    setSaving(true);
    const res = await fetch("/api/admin/data/properties", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated),
    });
    setSaving(false);
    return res.ok;
  }

  function startNew() {
    setIsNew(true);
    setEditing({ id: uid(), price: "", location: "", status: "sold", statusLabel: "Sold", image: "", imageAlt: "" });
  }

  async function handleSave() {
    if (!editing) return;
    const updated = isNew
      ? [...properties, editing]
      : properties.map((p) => p.id === editing.id ? editing : p);
    const ok = await saveAll(updated);
    if (ok) { setProperties(updated); setEditing(null); setIsNew(false); }
    onToast(ok ? "Properties saved!" : "Failed to save.", ok ? "success" : "error");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this property?")) return;
    const updated = properties.filter((p) => p.id !== id);
    const ok = await saveAll(updated);
    if (ok) setProperties(updated);
    onToast(ok ? "Property deleted." : "Failed to delete.", ok ? "success" : "error");
  }

  const setField = (k: keyof Property, v: string) => setEditing((e) => e ? { ...e, [k]: v } : e);

  // Auto-fill statusLabel when status changes
  function handleStatusChange(v: string) {
    const opt = STATUS_OPTIONS.find((o) => o.value === v);
    setEditing((e) => e ? { ...e, status: v, statusLabel: opt?.label || v } : e);
  }

  const statusColors: Record<string, string> = {
    "sold": "#2C2825", "sold-over": "#B8956A", "in-contract": "#8B6F47", "active": "#15803D", "pending": "#6B7280",
  };

  return (
    <div>
      <SectionHeader title="Properties" description="Manage your featured property listings" />

      {!editing ? (
        <>
          <div className="space-y-3 mb-6">
            {properties.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4 border" style={{ background: "#FFFCF8", borderColor: "#E8E0D8" }}>
                {p.image && (
                  <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden">
                    <Image src={p.image} alt={p.imageAlt || ""} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-[family-name:var(--font-heading)] text-lg" style={{ color: "#2C2825" }}>{p.price}</p>
                  <p className="font-[family-name:var(--font-body)] text-xs" style={{ color: "#6B6560" }}>{p.location}</p>
                </div>
                <span
                  className="font-[family-name:var(--font-body)] text-[9px] tracking-[0.15em] uppercase px-2.5 py-1"
                  style={{ background: statusColors[p.status] || "#2C2825", color: p.status === "sold-over" ? "#2C2825" : "#F5F0EB" }}
                >
                  {p.statusLabel}
                </span>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setIsNew(false); setEditing(p); }}
                    className="px-3 py-1.5 text-xs font-[family-name:var(--font-body)] border transition-colors"
                    style={{ borderColor: "#2C2825", color: "#2C2825", background: "transparent" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#2C2825"; e.currentTarget.style.color = "#F5F0EB"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2C2825"; }}
                  >
                    Edit
                  </button>
                  <DeleteBtn onClick={() => handleDelete(p.id)} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={startNew}
            className="px-6 py-3 font-[family-name:var(--font-body)] text-xs tracking-widest uppercase border transition-colors duration-150"
            style={{ borderColor: "#B8956A", color: "#B8956A", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#B8956A"; e.currentTarget.style.color = "#FFFCF8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B8956A"; }}
          >
            + Add Property
          </button>
        </>
      ) : (
        <div className="border p-6" style={{ background: "#FFFCF8", borderColor: "#E8E0D8" }}>
          <h3 className="font-[family-name:var(--font-heading)] text-xl mb-5" style={{ color: "#2C2825" }}>
            {isNew ? "Add New Property" : "Edit Property"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <Field label="Price"><Input value={editing.price} onChange={(v) => setField("price", v)} placeholder="$1,200,000" /></Field>
            <Field label="Location"><Input value={editing.location} onChange={(v) => setField("location", v)} placeholder="San Francisco" /></Field>
            <Field label="Status">
              <Select value={editing.status} onChange={handleStatusChange} options={STATUS_OPTIONS} />
            </Field>
            <Field label="Status Label (badge text)">
              <Input value={editing.statusLabel} onChange={(v) => setField("statusLabel", v)} placeholder="Sold — $60K Over Asking" />
            </Field>
          </div>
          <div className="mb-5">
            <Field label="Property Image">
              <ImagePicker currentUrl={editing.image} onSelect={(v) => setField("image", v)} />
            </Field>
          </div>
          <div className="mb-6">
            <Field label="Image Alt Text">
              <Input value={editing.imageAlt} onChange={(v) => setField("imageAlt", v)} placeholder="Sold home in San Francisco..." />
            </Field>
          </div>
          <div className="flex gap-3">
            <SaveButton onClick={handleSave} saving={saving} />
            <button
              onClick={() => { setEditing(null); setIsNew(false); }}
              className="px-6 py-3 font-[family-name:var(--font-body)] text-xs tracking-widest uppercase border"
              style={{ borderColor: "#E8E0D8", color: "#6B6560" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Testimonials ────────────────────────────────────────────────────────
function TestimonialsTab({ onToast }: { onToast: (m: string, t: "success" | "error") => void }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data/testimonials").then((r) => r.json()).then(setTestimonials);
  }, []);

  async function saveAll(updated: Testimonial[]) {
    setSaving(true);
    const res = await fetch("/api/admin/data/testimonials", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated),
    });
    setSaving(false);
    return res.ok;
  }

  function startNew() {
    setIsNew(true);
    setEditing({ id: uid(), quote: "", name: "", location: "" });
  }

  async function handleSave() {
    if (!editing) return;
    const updated = isNew
      ? [...testimonials, editing]
      : testimonials.map((t) => t.id === editing.id ? editing : t);
    const ok = await saveAll(updated);
    if (ok) { setTestimonials(updated); setEditing(null); setIsNew(false); }
    onToast(ok ? "Testimonials saved!" : "Failed to save.", ok ? "success" : "error");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const updated = testimonials.filter((t) => t.id !== id);
    const ok = await saveAll(updated);
    if (ok) setTestimonials(updated);
    onToast(ok ? "Testimonial deleted." : "Failed to delete.", ok ? "success" : "error");
  }

  const setField = (k: keyof Testimonial, v: string) => setEditing((e) => e ? { ...e, [k]: v } : e);

  return (
    <div>
      <SectionHeader title="Testimonials" description="Client reviews displayed on your homepage" />

      {!editing ? (
        <>
          <div className="space-y-3 mb-6">
            {testimonials.map((t) => (
              <div key={t.id} className="p-4 border" style={{ background: "#FFFCF8", borderColor: "#E8E0D8" }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed mb-2 line-clamp-2" style={{ color: "#2C2825" }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="font-[family-name:var(--font-heading)] text-sm" style={{ color: "#B8956A" }}>
                      — {t.name} · <span className="font-[family-name:var(--font-body)] text-xs" style={{ color: "#6B6560" }}>{t.location}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setIsNew(false); setEditing(t); }}
                      className="px-3 py-1.5 text-xs font-[family-name:var(--font-body)] border transition-colors"
                      style={{ borderColor: "#2C2825", color: "#2C2825", background: "transparent" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#2C2825"; e.currentTarget.style.color = "#F5F0EB"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2C2825"; }}
                    >
                      Edit
                    </button>
                    <DeleteBtn onClick={() => handleDelete(t.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={startNew}
            className="px-6 py-3 font-[family-name:var(--font-body)] text-xs tracking-widest uppercase border transition-colors duration-150"
            style={{ borderColor: "#B8956A", color: "#B8956A", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#B8956A"; e.currentTarget.style.color = "#FFFCF8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B8956A"; }}
          >
            + Add Testimonial
          </button>
        </>
      ) : (
        <div className="border p-6" style={{ background: "#FFFCF8", borderColor: "#E8E0D8" }}>
          <h3 className="font-[family-name:var(--font-heading)] text-xl mb-5" style={{ color: "#2C2825" }}>
            {isNew ? "Add Testimonial" : "Edit Testimonial"}
          </h3>
          <div className="space-y-5 mb-6">
            <Field label="Quote">
              <Textarea value={editing.quote} onChange={(v) => setField("quote", v)} rows={5} placeholder="What did your client say..." />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Client Name / Initials"><Input value={editing.name} onChange={(v) => setField("name", v)} placeholder="Y.C." /></Field>
              <Field label="Location"><Input value={editing.location} onChange={(v) => setField("location", v)} placeholder="San Francisco" /></Field>
            </div>
          </div>
          <div className="flex gap-3">
            <SaveButton onClick={handleSave} saving={saving} />
            <button
              onClick={() => { setEditing(null); setIsNew(false); }}
              className="px-6 py-3 font-[family-name:var(--font-body)] text-xs tracking-widest uppercase border"
              style={{ borderColor: "#E8E0D8", color: "#6B6560" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: About ───────────────────────────────────────────────────────────────
function AboutTab({ onToast }: { onToast: (m: string, t: "success" | "error") => void }) {
  const [data, setData] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data/about").then((r) => r.json()).then(setData);
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/admin/data/about", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    setSaving(false);
    onToast(res.ok ? "About section saved!" : "Failed to save.", res.ok ? "success" : "error");
  }

  if (!data) return <div className="text-sm" style={{ color: "#6B6560" }}>Loading...</div>;

  const set = (k: keyof AboutData, v: string) => setData((d) => d ? { ...d, [k]: v } : d);

  function updateBio(i: number, v: string) {
    setData((d) => {
      if (!d) return d;
      const bio = [...d.bio];
      bio[i] = v;
      return { ...d, bio };
    });
  }
  function addBio() { setData((d) => d ? { ...d, bio: [...d.bio, ""] } : d); }
  function removeBio(i: number) {
    setData((d) => d ? { ...d, bio: d.bio.filter((_, idx) => idx !== i) } : d);
  }

  return (
    <div>
      <SectionHeader title="About Section" description="Your bio, photo, and contact details" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <Field label="Your Name"><Input value={data.name} onChange={(v) => set("name", v)} /></Field>
        <Field label="Subtitle"><Input value={data.subtitle} onChange={(v) => set("subtitle", v)} placeholder="Real Estate Specialist · SF Bay Area" /></Field>
      </div>
      <div className="mb-6">
        <Field label="Headshot Photo">
          <ImagePicker currentUrl={data.photo} onSelect={(v) => set("photo", v)} />
        </Field>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-[family-name:var(--font-body)] text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "#8B6F47" }}>
            Bio Paragraphs
          </p>
          <button
            onClick={addBio}
            className="text-xs font-[family-name:var(--font-body)] px-3 py-1 border transition-colors"
            style={{ borderColor: "#B8956A", color: "#B8956A" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#B8956A"; e.currentTarget.style.color = "#FFFCF8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B8956A"; }}
          >
            + Add Paragraph
          </button>
        </div>
        <div className="space-y-4">
          {data.bio.map((p, i) => (
            <div key={i} className="relative">
              <Textarea value={p} onChange={(v) => updateBio(i, v)} rows={3} placeholder={`Paragraph ${i + 1}`} />
              {data.bio.length > 1 && (
                <button
                  onClick={() => removeBio(i)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-xs transition-colors"
                  style={{ color: "#B5ADA5" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#EF4444"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#B5ADA5"; }}
                  title="Remove paragraph"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <SaveButton onClick={save} saving={saving} />
    </div>
  );
}

// ─── Tab: Blog Posts ──────────────────────────────────────────────────────────
function BlogTab({ onToast }: { onToast: (m: string, t: "success" | "error") => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data/blog-posts").then((r) => r.json()).then(setPosts);
  }, []);

  async function saveAll(updated: BlogPost[]) {
    setSaving(true);
    const res = await fetch("/api/admin/data/blog-posts", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated),
    });
    setSaving(false);
    return res.ok;
  }

  function startNew() {
    setIsNew(true);
    setEditing({
      id: uid(), category: "Market Insights", title: "", excerpt: "",
      date: "", readTime: "5 min read", slug: "", image: "", imageAlt: "",
      gradient: "linear-gradient(135deg, #B8956A 0%, #8B6F47 100%)", patternColor: "#8B6F47",
    });
  }

  async function handleSave() {
    if (!editing) return;
    const updated = isNew
      ? [...posts, editing]
      : posts.map((p) => p.id === editing.id ? editing : p);
    const ok = await saveAll(updated);
    if (ok) { setPosts(updated); setEditing(null); setIsNew(false); }
    onToast(ok ? "Blog posts saved!" : "Failed to save.", ok ? "success" : "error");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return;
    const updated = posts.filter((p) => p.id !== id);
    const ok = await saveAll(updated);
    if (ok) setPosts(updated);
    onToast(ok ? "Post deleted." : "Failed to delete.", ok ? "success" : "error");
  }

  const setField = (k: keyof BlogPost, v: string) => setEditing((e) => e ? { ...e, [k]: v } : e);

  return (
    <div>
      <SectionHeader title="Blog Posts" description="Manage blog post cards shown on the homepage" />

      {!editing ? (
        <>
          <div className="space-y-3 mb-6">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4 border" style={{ background: "#FFFCF8", borderColor: "#E8E0D8" }}>
                {p.image && (
                  <div className="relative w-20 h-12 flex-shrink-0 overflow-hidden">
                    <Image src={p.image} alt={p.imageAlt || ""} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-[family-name:var(--font-heading)] text-base truncate" style={{ color: "#2C2825" }}>{p.title || "(No title)"}</p>
                  <p className="font-[family-name:var(--font-body)] text-xs" style={{ color: "#6B6560" }}>
                    {p.category} · {p.date} · {p.readTime}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setIsNew(false); setEditing(p); }}
                    className="px-3 py-1.5 text-xs font-[family-name:var(--font-body)] border transition-colors"
                    style={{ borderColor: "#2C2825", color: "#2C2825", background: "transparent" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#2C2825"; e.currentTarget.style.color = "#F5F0EB"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2C2825"; }}
                  >
                    Edit
                  </button>
                  <DeleteBtn onClick={() => handleDelete(p.id)} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={startNew}
            className="px-6 py-3 font-[family-name:var(--font-body)] text-xs tracking-widest uppercase border transition-colors duration-150"
            style={{ borderColor: "#B8956A", color: "#B8956A", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#B8956A"; e.currentTarget.style.color = "#FFFCF8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B8956A"; }}
          >
            + Add Blog Post
          </button>
        </>
      ) : (
        <div className="border p-6" style={{ background: "#FFFCF8", borderColor: "#E8E0D8" }}>
          <h3 className="font-[family-name:var(--font-heading)] text-xl mb-5" style={{ color: "#2C2825" }}>
            {isNew ? "Add Blog Post" : "Edit Blog Post"}
          </h3>
          <div className="space-y-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Category"><Input value={editing.category} onChange={(v) => setField("category", v)} placeholder="Market Insights" /></Field>
              <Field label="Date"><Input value={editing.date} onChange={(v) => setField("date", v)} placeholder="March 2026" /></Field>
            </div>
            <Field label="Title">
              <Input value={editing.title} onChange={(v) => setField("title", v)} placeholder="Post title..." />
            </Field>
            <Field label="Excerpt">
              <Textarea value={editing.excerpt} onChange={(v) => setField("excerpt", v)} rows={3} placeholder="Short description shown on the blog card..." />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Read Time"><Input value={editing.readTime} onChange={(v) => setField("readTime", v)} placeholder="5 min read" /></Field>
              <Field label="URL Slug"><Input value={editing.slug} onChange={(v) => setField("slug", v)} placeholder="my-blog-post-slug" /></Field>
            </div>
            <Field label="Card Image">
              <ImagePicker currentUrl={editing.image} onSelect={(v) => setField("image", v)} />
            </Field>
            <Field label="Image Alt Text">
              <Input value={editing.imageAlt} onChange={(v) => setField("imageAlt", v)} />
            </Field>
          </div>
          <div className="flex gap-3">
            <SaveButton onClick={handleSave} saving={saving} />
            <button
              onClick={() => { setEditing(null); setIsNew(false); }}
              className="px-6 py-3 font-[family-name:var(--font-body)] text-xs tracking-widest uppercase border"
              style={{ borderColor: "#E8E0D8", color: "#6B6560" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Images ──────────────────────────────────────────────────────────────
function ImagesTab({ onToast }: { onToast: (m: string, t: "success" | "error") => void }) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const loadImages = useCallback(async () => {
    const res = await fetch("/api/admin/images");
    if (res.ok) setImages(await res.json());
  }, []);

  useEffect(() => { loadImages(); }, [loadImages]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      await fetch("/api/admin/upload", { method: "POST", body: fd });
    }
    await loadImages();
    setUploading(false);
    onToast(`${files.length} image${files.length > 1 ? "s" : ""} uploaded!`, "success");
    e.target.value = "";
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 2000);
  }

  return (
    <div>
      <SectionHeader title="Images" description="Upload and manage images used across your website" />

      <div className="mb-8">
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-8 py-3.5 font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-150 border"
          style={{ borderColor: "#B8956A", color: "#B8956A", background: "transparent" }}
          onMouseEnter={(e) => { if (!uploading) { e.currentTarget.style.background = "#B8956A"; e.currentTarget.style.color = "#FFFCF8"; } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B8956A"; }}
        >
          {uploading ? "Uploading..." : "+ Upload Images"}
        </button>
        <p className="font-[family-name:var(--font-body)] text-xs mt-2" style={{ color: "#B5ADA5" }}>
          Accepted: JPG, PNG, WEBP, GIF, AVIF
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.url} className="group border overflow-hidden" style={{ background: "#FFFCF8", borderColor: "#E8E0D8" }}>
            <div className="relative aspect-square overflow-hidden" style={{ background: "#EDE8E2" }}>
              <Image src={img.url} alt={img.name} fill className="object-cover" />
            </div>
            <div className="p-2">
              <p className="font-[family-name:var(--font-body)] text-[10px] truncate mb-1.5" style={{ color: "#6B6560" }} title={img.name}>
                {img.name}
              </p>
              <button
                onClick={() => copy(img.url)}
                className="w-full py-1 font-[family-name:var(--font-body)] text-[10px] tracking-wide transition-colors"
                style={{
                  background: copied === img.url ? "#2C2825" : "#F5F0EB",
                  color: copied === img.url ? "#B8956A" : "#6B6560",
                  border: "1px solid #E8E0D8",
                }}
              >
                {copied === img.url ? "Copied!" : "Copy URL"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "site", label: "Site Settings", icon: "⚙" },
  { id: "hero", label: "Hero Section", icon: "✦" },
  { id: "properties", label: "Properties", icon: "🏠" },
  { id: "testimonials", label: "Testimonials", icon: "★" },
  { id: "about", label: "About", icon: "◉" },
  { id: "blog", label: "Blog Posts", icon: "✍" },
  { id: "images", label: "Images", icon: "⬜" },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("site");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "var(--font-body)" }}>

      {/* ── Sidebar ── */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col h-full overflow-y-auto"
        style={{ background: "#1A1610", borderRight: "1px solid #2C2420" }}
      >
        {/* Brand */}
        <div className="px-5 py-6 border-b" style={{ borderColor: "#2C2420" }}>
          <p
            className="font-[family-name:var(--font-heading)] text-base tracking-[0.12em] uppercase"
            style={{ color: "#F5F0EB", fontVariant: "small-caps" }}
          >
            Jacky Luong
          </p>
          <p
            className="font-[family-name:var(--font-body)] text-[9px] tracking-[0.3em] uppercase mt-0.5"
            style={{ color: "#B8956A" }}
          >
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-150"
              style={{
                background: activeTab === item.id ? "#2C2825" : "transparent",
                borderLeft: activeTab === item.id ? "2px solid #B8956A" : "2px solid transparent",
                color: activeTab === item.id ? "#B8956A" : "#6B6560",
              }}
              onMouseEnter={(e) => { if (activeTab !== item.id) e.currentTarget.style.color = "#F5F0EB"; }}
              onMouseLeave={(e) => { if (activeTab !== item.id) e.currentTarget.style.color = "#6B6560"; }}
            >
              <span style={{ fontSize: 13 }}>{item.icon}</span>
              <span className="font-[family-name:var(--font-body)] text-xs tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t space-y-2" style={{ borderColor: "#2C2420" }}>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 w-full text-left transition-colors duration-150"
            style={{ color: "#6B6560" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#B8956A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6B6560"; }}
          >
            <span style={{ fontSize: 12 }}>↗</span>
            <span className="font-[family-name:var(--font-body)] text-xs">View Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 w-full text-left transition-colors duration-150"
            style={{ color: "#6B6560" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#EF4444"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6B6560"; }}
          >
            <span style={{ fontSize: 12 }}>⏻</span>
            <span className="font-[family-name:var(--font-body)] text-xs">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto" style={{ background: "#F5F0EB" }}>
        <div className="max-w-3xl mx-auto px-8 py-10">
          {activeTab === "site" && <SiteTab onToast={showToast} />}
          {activeTab === "hero" && <HeroTab onToast={showToast} />}
          {activeTab === "properties" && <PropertiesTab onToast={showToast} />}
          {activeTab === "testimonials" && <TestimonialsTab onToast={showToast} />}
          {activeTab === "about" && <AboutTab onToast={showToast} />}
          {activeTab === "blog" && <BlogTab onToast={showToast} />}
          {activeTab === "images" && <ImagesTab onToast={showToast} />}
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
