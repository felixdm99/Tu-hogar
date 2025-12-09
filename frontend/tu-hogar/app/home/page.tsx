import Link from "next/link";

export default async function HomePage() {
  const res = await fetch("http://localhost:4000/api/products", {
    cache: "no-store"
  });
  const products = await res.json();

  return (
    <div style={{ padding: 40 }}>
      <h1>Productos</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 20
      }}>
        
        {products.map((prod: any) => (
          <Link
            key={prod._id}
            href={`/products/${prod._id}`}   // 👈 Acá va el link dinámico
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              cursor: "pointer",
              transition: "0.2s"
            }}>
              <img
                src={prod.images?.[0] || "https://via.placeholder.com/300"}
                alt={prod.name}
                style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6 }}
              />

              <h3>{prod.name}</h3>

              <p>{prod.shortDescription}</p>

              <strong>
                {prod.price.sale > 0
                  ? `$${prod.price.sale} (Oferta)`
                  : `$${prod.price.regular}`}
              </strong>

              <p style={{ color: "#888" }}>
                ⭐ {prod.ratings?.average || 0} | {prod.ratings?.count || 0} votos
              </p>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
