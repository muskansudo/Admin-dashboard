import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string; // optional image URL
};

async function getDashboardData(): Promise<Product[]> {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/home`,
    {
      headers: {
        Cookie: cookieStore.toString(), // 👈 THIS is the fix
      },
      cache: "no-store",
    }
  );
  if (res.status === 401 || res.status === 403) {
    redirect("/login");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const data = await res.json();
  return data.products;
}

export default async function AdminDashboard() {
  const products = await getDashboardData();

  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock < 5);
  const lowStockCount = lowStockProducts.length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  return (
    <div style={{ padding: "1px 20px"}}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 900, marginBottom: "6px" }}>
        📋 Overview
      </h1>
      <p style={{ color: "#565c67ff", marginBottom: "24px" }}>
        Store Overview, Inventory & Key Metrics
      </p>

      {/* Summary Cards */}
      <div style={cardGrid}>
        <Card title="Total Categories" value={7} />
        <Card title="Total Products" value={totalProducts} />
        <Card title="Low Stock Items" value={lowStockCount} />
        <Card title="Total Inventory Value" value={inventoryValue} prefix="₹" />
      </div>

      {/* Low Stock Alerts */}
      {lowStockCount > 0 && (
        <div style={alertCard}>
          <h2 style={alertTitle}>⚠ Low Stock Alerts</h2>
          <ul style={alertList}>
            {lowStockProducts.map((p) => (
              <li key={p._id} style={alertItem}>
                <span>{p.name}</span>
                <span style={stockBadge}>{p.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product List */}
<div style={box}>
  <h2
    style={{
      fontFamily: "'Playfair Display', serif",
      color: "#2f3237ff",
      marginBottom: "20px",
    }}
  >
    Product Inventory
  </h2>

  <table style={table}>
    <thead>
      <tr style={{ background: "#f9fafb" }}>
        <th style={{...th, padding: "12px 23px"}}>Image</th>
        <th style={th}>Name</th>
        <th style={th}>Category</th>
        <th style={th}>Price</th>
        <th style={th}>Stock</th>
      </tr>
    </thead>

    <tbody>
      {products.map((p) => (
        <tr key={p._id}>
          <td style={td}>
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "75px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
             <span style={{ paddingLeft: "25px" }}>—</span>
            )}
          </td>

          <td style={td}>{p.name}</td>
          <td style={td}>{p.category}</td>
          <td style={td}>₹{p.price}</td>

          <td
            style={{
              ...td,
              color: p.stock < 5 ? "#dc2626" : "#111827",
              fontWeight: p.stock < 5 ? 600 : 400,
            }}
          >
            {p.stock}
            {p.stock < 5 && " (LOW)"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}

/* ---------- Card Component ---------- */
function Card({ title, value, prefix = "" }: { title: string; value: number; prefix?: string }) {
  return (
    <div style={card}>
      <p style={{ fontSize: "20px", color: "#2f2a2aa0", marginBottom: "6px" }}>{title}</p>
      <h2 style={{ fontSize: "23px", color: "#3b3f47ee", fontWeight: 510 }}>
        {prefix}{value}
      </h2>
    </div>
  );
}

/* ---------- Styles ---------- */
const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "32px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease",
};

const box = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  marginTop: "20px",
};

const recentHeading = {
  fontFamily: "'Playfair Display', serif",
  fontStyle: "normal",
  color: "#2f3237ff",
  marginBottom: "20px",
};

const alertCard = {
  background: "linear-gradient(135deg, #fff7f5, #fff1f2)",
  border: "1px solid #fca5a5",
  borderRadius: "14px",
  padding: "20px",
  marginBottom: "24px",
  width: "700px",
};

const alertTitle = {
  fontFamily: "'Playfair Display', serif",
  color: "#7f1d1d",
  marginBottom: "16px",
  fontSize: "22px",
  fontWeight: 600,
};

const alertList = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};

const alertItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "white",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #fecaca",
};

const stockBadge = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 600,
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "18px",
  padding: "12px",
  textAlign: "left" as const,
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};
