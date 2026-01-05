// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin-auth"); // or whatever you set

  if (!isAdmin) {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
