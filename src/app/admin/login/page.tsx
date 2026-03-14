"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAdmin } from "@/contexts/AdminContext";

export default function AdminLoginPage() {
  const { login, user, isLoading } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) router.push("/admin");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await login(email, password);
      toast.success("Login berhasil!");
      router.push("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f1f5f9, #e0f2fe, #f1f5f9)", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "64px", height: "64px", background: "#2563eb", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "20px", margin: "0 auto 1rem" }}>
            EDU
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e293b" }}>Admin Panel</h1>
          <p style={{ color: "#64748b", marginTop: "0.25rem" }}>Educare Academy</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.5rem" }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@educareacademy.my.id"
              style={{ width: "100%", padding: "0.75rem 1rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "0.875rem", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#334155", marginBottom: "0.5rem" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "0.75rem 1rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "0.875rem", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "0.75rem" }}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{ width: "100%", padding: "0.75rem", background: submitting ? "#94a3b8" : "#2563eb", color: "white", border: "none", borderRadius: "12px", fontWeight: "600", fontSize: "0.875rem", cursor: submitting ? "not-allowed" : "pointer" }}
          >
            {submitting ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#94a3b8", marginTop: "1.5rem" }}>
          <a href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>← Kembali ke Beranda</a>
        </p>
      </div>
    </div>
  );
}
