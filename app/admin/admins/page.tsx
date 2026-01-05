import AddAdminForm from "./AddAdminForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Admin = {
  _id: string;
  email: string;
};

async function getAdmins(): Promise<Admin[]> {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(), // ✅ forward auth cookie
      },
    }
  );
  if (res.status === 401 || res.status === 403) {
    redirect("/login");
  }
  
  if (!res.ok) {
    throw new Error("Failed to fetch admins");
  }

  const data = await res.json();
  return data.admins;
}


export default async function AdminsPage() {
  const admins = await getAdmins();

  return (
    <div style={{ padding: "1px 20px"}}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 900, marginBottom: "6px" }}>
        🔐 Administration
      </h1>

      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Administrator account creation and oversight
      </p>

      {/* Client component for creating admin */}
      <AddAdminForm />

      {/* Admin list */}
      <div style={box}>
        <h2 style={heading}>Existing Admin Emails</h2>

        <table style={table}>
  <thead>
    <tr>
      <th style={th}></th>
    </tr>
  </thead>
  <tbody>
    {admins.map((a) => (
      <tr key={a._id}>
        <td style={td}>{a.email}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}

/* styles */
const box = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  marginBottom: "32px",
  width: "600px",
};

const heading = {
  fontFamily: "'Playfair Display', serif",
  marginBottom: "0px",
  fontSize: "20px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  textAlign: "left" as const,
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "15px",
};
