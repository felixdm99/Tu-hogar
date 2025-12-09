interface ProductProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductProps) {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/api/products/${id}`, {
    cache: "no-store",
  });

  const product = await res.json();

  return (
    <div style={{ padding: 40 }}>
      <h1>{product.name}</h1>

      <img
        src={product.images?.[0]}
        style={{ width: 400, borderRadius: 10 }}
      />

      <p>{product.description}</p>

      <h2>
        {product.price.sale > 0
          ? `$${product.price.sale} (Oferta)`
          : `$${product.price.regular}`}
      </h2>

      <p>Categoria: {product.category?.name || "Sin categoría"}</p>

      <p>
        Stock: {product.inventory?.quantity}
      </p>

      <p>
        Rating: ⭐ {product.ratings?.average} ({product.ratings?.count} votos)
      </p>
    </div>
  );
}
