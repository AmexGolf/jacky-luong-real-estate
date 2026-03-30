"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#1A1610" }}>
      <div className="w-full max-w-sm px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <p
            className="font-[family-name:var(--font-heading)] text-2xl tracking-[0.15em] uppercase mb-1"
            style={{ color: "#F5F0EB", fontVariant: "small-caps" }}
          >
            Jacky Luong
          </p>
          <p
            className="font-[family-name:var(--font-body)] text-[9px] tracking-[0.35em] uppercase font-light"
            style={{ color: "#B8956A" }}
          >
            Website Admin
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-none border p-8"
          style={{ background: "#221E19", borderColor: "#B8956A26" }}
        >
          <h1
            className="font-[family-name:var(--font-heading)] text-xl font-normal mb-1"
            style={{ color: "#F5F0EB" }}
          >
            Sign In
          </h1>
          <p
            className="font-[family-name:var(--font-body)] text-xs mb-7 font-light"
            style={{ color: "#6B6560" }}
          >
            Enter your admin password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block font-[family-name:var(--font-body)] text-[10px] tracking-[0.2em] uppercase mb-2 font-medium"
                style={{ color: "#B8956A" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="Enter password"
                className="w-full px-4 py-3 font-[family-name:var(--font-body)] text-sm outline-none transition-colors duration-200"
                style={{
                  background: "#2C2825",
                  border: "1px solid #3D3530",
                  color: "#F5F0EB",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#B8956A")}
                onBlur={(e) => (e.target.style.borderColor = "#3D3530")}
              />
            </div>

            {error && (
              <p
                className="font-[family-name:var(--font-body)] text-xs"
                style={{ color: "#E07070" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-[family-name:var(--font-body)] text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-200 disabled:opacity-50"
              style={{ background: "#B8956A", color: "#FFFCF8" }}
              onMouseEnter={(e) => {
                if (!loading) (e.target as HTMLElement).style.background = "#8B6F47";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "#B8956A";
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p
          className="text-center font-[family-name:var(--font-body)] text-[10px] mt-6"
          style={{ color: "#3D3530" }}
        >
          Jacky Luong Real Estate · Admin Panel
        </p>
      </div>
    </div>
  );
}
