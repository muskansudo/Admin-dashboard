"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  window.location.href = "/login";
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
            
          </button> 
          {!collapsed && <h2 className="sidebar-title">Admin Panel</h2>}

        </div>

        <Link
          href="/admin"
          className={`sidebar-link ${
            pathname === "/admin" ? "active" : ""
          }`}
        >
           📋 <span>Overview</span>
        </Link>

        <Link
          href="/admin/products"
          className={`sidebar-link ${
            pathname === "/admin/products" ? "active" : ""
          }`}
        >
          📦 <span>Product Management</span>
        </Link>

        <Link
          href="/admin/analytics"
          className={`sidebar-link ${
            pathname === "/admin/analytics" ? "active" : ""
          }`}
        >
          📈 <span>Analytics</span>
        </Link>

        <Link 
          href="/admin/admins"
          className={`sidebar-link ${
            pathname === "/admin/admins" ? "active" : ""
          }`}
        >
          🔐 <span>Admin Management</span>
        </Link>

      </aside>

      {/* Main Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="navbar">
          <div className="navbar-title"></div>

          <div className="navbar-actions">
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
