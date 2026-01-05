"use client";

import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import "./page.css";

const fetcher = (url: string) =>
  fetch(url, {
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  });


type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
};

const CATEGORIES = ["All", "Electronics", "Fashion", "Beauty & care", "Grocery", "Furniture", "Toys", "Others"];

export default function ProductsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const limit = 5;

  const { data, mutate } = useSWR(
    `/api/products?page=${page}&limit=${limit}`,
    fetcher
  );

  const products: Product[] = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || p.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  async function addOrUpdate() {
    if (!name || !price || !stock || !category) {
      alert("Fill all fields");
      return;
    }
    const hasLetter = /[a-zA-Z]/.test(name);
    if (!hasLetter) {
      alert("Invalid name");
      return;
    }

    let imageBase64 = "";
    if (imageFile) {
      const reader = new FileReader();
      imageBase64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageFile);
      });
    }

    const body = {
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      image: imageBase64,
    };

    const url = editId ? `/api/products?id=${editId}` : "/api/products";
    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });


    setName("");
    setPrice("");
    setStock("");
    setCategory("");
    setImageFile(null);
    setEditId(null);

    mutate();
    router.refresh();
  }

  function editProduct(p: Product) {
    setName(p.name);
    setPrice(String(p.price));
    setStock(String(p.stock));
    setCategory(p.category);
    setEditId(p._id);
  }

  async function deleteProduct(id: string) {
    await fetch("/api/products", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    mutate();
    router.refresh();
  }

  return (
    <div style={{ padding: "1px 20px"}}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 900, marginBottom: "6px" }}>
        📦 Product Management
      </h1>
      <p style={{ color: "#565c67ff", marginBottom: "24px" }}>
        Product catalog & inventory operations
      </p>

      <div className="dashboard">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, marginBottom: "6px" }}>
        Manage Products
      </h1>
      <p style={{ color: "#565c67ff", marginBottom: "1px" }}>
        Add, update & maintain product records
      </p>
      <hr
  style={{
    border: "none",
    borderTop: "1px solid #e5e7eb", // light gray
    margin: "8px 0 20px 0",
  }}
/>

      {/* Product Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            const filtered = value.replace(/[^a-zA-Z0-9 ]/g, "");
            setName(filtered);
          }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{

            flex: "1 1 150px",
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            outline: "none",
            fontSize: "1rem",
          }}
        >
          <option value="">Select Category</option>
          {CATEGORIES.filter((c) => c !== "All").map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

       
  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setImageFile(e.target.files ? e.target.files[0] : null)
    }
    
  />


        <button onClick={addOrUpdate}>
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>
      <hr
  style={{
    border: "none",
    borderTop: "1px solid #e5e7eb", // light gray
    margin: "8px 0 20px 0",
  }}
/>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, marginBottom: "6px" }}>
        Product Records
      </h1>
      <p style={{ color: "#565c67ff", marginBottom: "2px" }}>
        Searchable product information
      </p>
      <hr
  style={{
    border: "none",
    borderTop: "1px solid #e5e7eb", // light gray
    margin: "8px 0 20px 0",
  }}
/>

      {/* Search + Category Filter */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={categorySelect}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
     <hr
  style={{
    border: "none",
    borderTop: "1px solid #e5e7eb", // light gray
    margin: "8px 0 20px 0",
  }}
/> 

      {/* Product List */}
      <ul className="product-list">
        {filteredProducts.map((p) => (
          <li key={p._id} className="product-item">
            {p.image && <img src={p.image} alt={p.name} />}

            <strong>{p.name}</strong>
            <span>₹{p.price}</span>

            <span
              style={{
                color: p.stock < 5 ? "#df3333ff" : "#4b5563",
                fontWeight: p.stock < 5 ? 600 : "normal",
              }}
            >
              Stock: {p.stock} {p.stock < 5 && "(⚠ LOW STOCK)"}
            </span>
            <span>{p.category}</span>

            <div className="product-actions">              
              <button className="edit-btn" onClick={() => editProduct(p)}>
              Edit
              </button>
              <button className="delete-btn" onClick={() => deleteProduct(p._id)}>
              Delete
              </button>
            </div>

          </li>
        ))}
      </ul>
      <hr
  style={{
    border: "none",
    borderTop: "1px solid #e5e7eb", // light gray
    margin: "20px 0 20px 0",
  }}
/> 
      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}
const categorySelect = {
  height: "42px",
  padding: "0 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  backgroundColor: "white",
  fontSize: "14px",
  cursor: "pointer",
};


