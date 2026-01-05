import AnalyticsCharts from "./AnalyticsCharts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
};

async function getAnalyticsData() {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`,
    {
      headers: {
        Cookie: cookieStore.toString(), 
      },
      cache: "no-store", 
    }
  );
  if (res.status === 401 || res.status === 403) {
    redirect("/login");
  }
  
  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();
  const products: Product[] = data.products;

  return (
    <div style={{ padding: "1px 20px" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 900, marginBottom: "6px"  }}>📈 Inventory Analytics</h1>
      <p style={{ color: "#6b7280", marginBottom: "32px" }}>
        Track stock trends, low inventory, and key metrics
      </p>

      <AnalyticsCharts products={products} />
    </div>
  );
}
