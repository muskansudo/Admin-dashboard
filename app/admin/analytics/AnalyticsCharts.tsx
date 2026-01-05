"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
};

const COLORS = ["#C8B4F4", "#929CEA", "#6F98EA","#5EACEB", "#6ED0EA", "#75DBCF", "#8BEBB8"];
const renderPercentageLabel = ({
 cx,
 cy,
 midAngle,
 innerRadius,
 outerRadius,
 percent,
}: any) => {
 const RADIAN = Math.PI / 180;
 const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
 const x = cx + radius * Math.cos(-midAngle * RADIAN);
 const y = cy + radius * Math.sin(-midAngle * RADIAN);


 return (
   <text
     x={x}
     y={y}
     fill="white"
     textAnchor="middle"
     dominantBaseline="central"
     fontSize={14}
     fontWeight={600}
   >
     {(percent * 100).toFixed(0)}%
   </text>
 );
};

export default function AnalyticsCharts({ products }: { products: Product[] }) {
  /* ---------- Summary ---------- */
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  /* ---------- Category aggregation ---------- */
  const categoryStats = products.reduce<Record<
    string,
    { category: string; count: number; stock: number }
  >>((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = { category: p.category, count: 0, stock: 0 };
    }
    acc[p.category].count += 1;
    acc[p.category].stock += p.stock;
    return acc;
  }, {});

  const categoryData = Object.values(categoryStats);

  return (
    <>
      {/* Summary Cards */}
      <div style={cardGrid}>
        <Card title="Total Categories" value={7} />
        <Card title="Total Products" value={totalProducts} />
        <Card title="Total Stock Units" value={totalStock} />
      </div>

      {/* Stock per Category */}
      <div style={chartBox}>
        <h2 style={heading}>Stock Distribution by Category</h2>
        <BarChart width={800} height={320} data={categoryData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#1BA0E0" />
        </BarChart>
      </div>

      {/* Stock per Product */}
      <div style={chartBox}>
        <h2 style={heading}>Stock per Product</h2>
        <BarChart width={800} height={350} data={products}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock">
            {products.map((p) => (
              <Cell
                key={p._id}
                fill={p.stock < 5 ? "#ef4444" : "#498ddbff"}
              />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* Products per Category */}
      <div style={chartBox}>
        <h2 style={heading}>Products per Category</h2>
        <PieChart width={800} height={320}>
          <Pie
            data={categoryData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={renderPercentageLabel}
            labelLine={false}
          >
            {categoryData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </>
  );
}

/* ---------- UI ---------- */
function Card({ title, value }: { title: string; value: number }) {
  return (
    <div style={card}>
      <p style={{ fontSize: "18px", color: "#6b7280" }}>{title}</p>
      <h2 style={{ fontSize: "24px", fontWeight: 600 }}>{value}</h2>
    </div>
  );
}

const heading = {
  fontFamily: "'Playfair Display', serif",
  marginBottom: "20px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "32px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const chartBox = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  marginBottom: "24px",
};
