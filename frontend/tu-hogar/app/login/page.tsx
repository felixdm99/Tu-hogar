"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/users/login", form);

      console.log("LOGIN OK:", res.data);

      alert("Inicio de sesión exitoso");

      // Si querés guardar token:
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

    } catch (err: any) {
      console.error(err);
      alert("Error al iniciar sesión");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Iniciar sesión</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
