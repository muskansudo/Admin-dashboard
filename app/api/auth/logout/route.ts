"use server";

import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Clear auth cookie (adjust name if different)
  res.cookies.set("admin-auth", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}
