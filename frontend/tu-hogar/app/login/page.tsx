"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/users/login",
        form
      );

      console.log("LOGIN OK:", res.data);

      // Guarda token si existe (cuando lo agreguemos)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Inicio de sesión exitoso");
      router.push("/home");

    } catch (err: any) {
      console.error("LOGIN ERROR:", err.response?.data);

      alert(err.response?.data?.msg || "Email o contraseña incorrectos");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3", // 🌎 Fondo global gris claro
      }}
    >
      <div
        style={{
          width: 350,
          padding: 30,
          background: "white",
          borderRadius: 10,
          boxShadow: "0 0 12px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <h1 style={{ marginBottom: 10, color: "black" }}>Iniciar sesión</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{
              width: "100%",               // ✔ más corto
              padding: 10,
              borderRadius: 6,
              border: "1px solid #999",    // ✔ contorno gris
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #999",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              padding: 10,
              borderRadius: 6,
              border: "1px solid #333", // ✔ contorno
              background: "#444",       // ✔ gris oscuro
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
              transition: "0.2s",
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}