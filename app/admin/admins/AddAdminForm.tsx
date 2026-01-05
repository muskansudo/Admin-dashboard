"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAdminForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/admins", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      setEmail("");
      setPassword("");
      router.refresh();
    }
  }

  return (
    <div style={card}>
      <h2 style={heading}> Add New Admin</h2>

      <div style={field}>
        <label style={label}>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />
      </div>

      <div style={field}>
        <label style={label}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />
      </div>
      <button onClick={submit} disabled={loading} style={button}>
        {loading ? "Creating..." : "Create Admin"}
      </button>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  width: "600px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  marginBottom: "32px",
  display: "flex",
  flexDirection: "column",
};

const heading = {
  fontSize: "20px",
  fontWeight: 600,
  marginBottom: "16px",
  color: "#2f3237",
  fontFamily: "'Playfair Display', serif",
};

const field = {
  display: "flex",
  flexDirection: "column" as const,
  marginBottom: "14px",
};

const label = {
  fontSize: "14px",
  marginBottom: "6px",
  color: "#313741ff",
};

const input = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
};

const button = {
  marginTop: "10px",
  alignSelf: "center",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#1BA0E0",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};
