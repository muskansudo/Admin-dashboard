"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin");
  }

  return (
    <div style={container}>
      <div style={box}>
        <h2 style={title}>Admin Login</h2>

        <input
          style={input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={errorText}>{error}</p>}

        <button onClick={login} style={button}>
          Login
        </button>
      </div>
    </div>
  );
}

/* ---------------- styles ---------------- */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
};

const box = {
  background: "white",
  padding: "36px",
  borderRadius: "14px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "14px",
  width: "340px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const title = {
  textAlign: "center" as const,
  marginBottom: "10px",
  fontSize: "22px",
  fontWeight: 600,
  color: "#1b2231ff",
  fontFamily: "'Playfair Display', serif",
};

const input = {
  height: "42px",
  padding: "0 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
};

const button = {
  marginTop: "10px",
  height: "32px",
  borderRadius: "8px",
  background: "#373737ff",
  color: "white",
  border: "none",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  width: "80px",
  alignSelf:"center"
};

const errorText = {
  color: "#dc2626",
  fontSize: "13px",
  textAlign: "center" as const,
  marginBottom: "1px"
};
