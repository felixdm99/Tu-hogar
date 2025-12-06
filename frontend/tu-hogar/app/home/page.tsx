'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then(res => res.json())
      .then(data => console.log("FRONTEND CONECTADO AL BACKEND:", data))
      .catch(err => console.log("Error:", err));
  }, []);

  return <h1>Home</h1>;
}
