import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function requireAdmin() {
  const token = cookies().get("admin-auth")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("/login");
  }
}
