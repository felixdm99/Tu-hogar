"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#333",   // gris oscuro
        color: "white",
      }}
    >
      {/* Nombre de la página */}
      <Link href="/" style={{ textDecoration: "none", color: "white" }}>
        <h2 style={{ margin: 0 }}>📦 Tu Hogar</h2>
      </Link>

      {/* Navegación */}
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link href="/home">Home</Link>
        <Link href="/products">Productos</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
