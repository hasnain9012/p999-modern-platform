"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent) { e.preventDefault(); setLoading(true); setError(""); const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); const data = await res.json(); setLoading(false); if (!res.ok) return setError(data.error || "Login failed"); router.push("/admin"); router.refresh(); }
  return <div className="admin-login"><form onSubmit={submit} className="login-card"><span className="eyebrow">P999 CMS</span><h1>Admin Login</h1><p>Sign in to manage games, categories and SEO.</p><label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>{error && <div className="form-error">{error}</div>}<button className="primary-button" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button></form></div>;
}
