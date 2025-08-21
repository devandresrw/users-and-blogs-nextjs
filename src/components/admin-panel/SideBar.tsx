"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTachometerAlt, FaBlog, FaTags, FaUsers, FaThList } from "react-icons/fa";

export default function SideBar() {
 const [collapsed, setCollapsed] = useState(false);

 return (
  <aside
   style={{
    width: collapsed ? 60 : 220,
    background: "#black",
    minHeight: "calc(100vh - 64px)", // Ajusta según la altura de tu header
    padding: 16,
    transition: "width 0.2s",
    borderRight: "1px solid #e5e5e5",
    display: "flex",
    flexDirection: "column",
    alignItems: collapsed ? "center" : "flex-start",
    color: 'text-white'
   }}
  >
   <button
    aria-label="Toggle sidebar"
    onClick={() => setCollapsed((c) => !c)}
    style={{
     background: "none",
     border: "none",
     cursor: "pointer",
     marginBottom: 24,
     fontSize: 22,
     alignSelf: collapsed ? "center" : "flex-end",
    }}
   >
    <FaBars />
   </button>
   <nav style={{ width: "100%" }}>
    <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
     <li>
      <Link href="/admin-panel" passHref
       style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 8px",
        borderRadius: 6,
        textDecoration: "none",
        color: "#222",
        fontWeight: 500,
        width: "100%",
        transition: "background 0.2s",
       }}
      >

       <FaTachometerAlt />
       {!collapsed && <span>Dashboard</span>}

      </Link>
     </li>
     <li>
      <Link href="/admin-panel/blogs" passHref
       style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderRadius: 6, color: "#222", fontWeight: 500, textDecoration: "none" }}
      >
       <FaBlog />
       {!collapsed && <span>Blogs</span>}
      </Link>
     </li>
     <li>
      <Link href="/admin-panel/categories" passHref
       style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderRadius: 6, color: "#222", fontWeight: 500, textDecoration: "none" }}
      >

       <FaThList />
       {!collapsed && <span>Categorías</span>}

      </Link>
     </li>
     <li>
      <Link href="/admin-panel/tags" passHref
       style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderRadius: 6, color: "#222", fontWeight: 500, textDecoration: "none" }}>
       <FaTags />
       {!collapsed && <span>Tags</span>}
      </Link>
     </li>
     <li>
      <Link href="/admin-panel/users" passHref
       style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderRadius: 6, color: "#222", fontWeight: 500, textDecoration: "none" }}>


       <FaUsers />
       {!collapsed && <span>Usuarios</span>}

      </Link>
     </li>
    </ul>
   </nav>
  </aside >
 );
}