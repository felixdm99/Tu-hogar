"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/users/register", form);
      console.log("Usuario creado:", res.data);
      alert("Registro exitoso");
    } catch (err) {
      console.error(err);
      alert("Error al registrarse");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}
