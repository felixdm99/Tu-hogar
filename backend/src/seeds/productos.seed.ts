import mongoose from "mongoose";
import { connectDB } from "../config/config";
import { ProductModel } from "../models/product.model";

const createProducts = async () => {
  try {
    await connectDB();
    console.log("🔥 Conectado a MongoDB");

    // Limpia productos anteriores
    await ProductModel.deleteMany({});
    console.log("🗑️  Productos eliminados");

    const products = [
      {
        sku: "SKU001",
        name: "Zapatillas Urban Style",
        shortDescription: "Zapatillas cómodas estilo urbano",
        description: "Zapatillas ideales para uso diario, con diseño moderno.",
        price: { regular: 120, sale: 99, currency: "USD" },
        brand: "UrbanWalk",
        category: null, // opcional: podés asignar categorías reales
        images: ["https://picsum.photos/seed/urban1/600"],
        inventory: {
          quantity: 50,
          lowStockThreshold: 5,
          trackQuantity: true,
          allowBackorder: false
        },
        attributes: {
          color: "Negro",
          size: "42",
          weight: 0.9,
          dimensions: { length: 30, width: 20, height: 12 }
        },
        specifications: { material: "Cuero sintético", uso: "Urbano" },
        tags: ["zapatillas", "urbano", "moda"],
        status: "active",
        featured: true,
        ratings: { average: 4.5, count: 120 }
      },

      {
        sku: "SKU002",
        name: "Auriculares Bluetooth Pro",
        shortDescription: "Sonido premium con cancelación de ruido",
        description: "Auriculares inalámbricos con gran autonomía y sonido envolvente.",
        price: { regular: 180, sale: 149, currency: "USD" },
        brand: "SoundMax",
        category: null,
        images: ["https://picsum.photos/seed/headphones/600"],
        inventory: {
          quantity: 35,
          lowStockThreshold: 5,
          trackQuantity: true,
          allowBackorder: false
        },
        attributes: {
          color: "Blanco",
          size: "Único",
          weight: 0.3,
          dimensions: { length: 18, width: 8, height: 20 }
        },
        specifications: { bluetooth: "5.2", bateria: "20h" },
        tags: ["audio", "bluetooth"],
        status: "active",
        featured: true,
        ratings: { average: 4.8, count: 450 }
      },

      {
        sku: "SKU003",
        name: "Smartwatch Fit",
        shortDescription: "Reloj deportivo con monitor de ritmo cardíaco",
        description: "Pantalla HD, medición de pasos, calorías y más.",
        price: { regular: 90, sale: 0, currency: "USD" },
        brand: "FitLife",
        category: null,
        images: ["https://picsum.photos/seed/watch/600"],
        inventory: {
          quantity: 80,
          lowStockThreshold: 10,
          trackQuantity: true,
          allowBackorder: false
        },
        attributes: {
          color: "Azul",
          size: "M",
          weight: 0.2,
          dimensions: { length: 25, width: 4, height: 1 }
        },
        specifications: { resistencia: "IP67", bateria: "7 días" },
        tags: ["fitness", "smartwatch"],
        status: "active",
        featured: false,
        ratings: { average: 4.2, count: 300 }
      },

      {
        sku: "SKU004",
        name: "Mochila Explorer 40L",
        shortDescription: "Mochila resistente al agua para trekking",
        description: "Ideal para aventureros y viajes largos.",
        price: { regular: 75, sale: 65, currency: "USD" },
        brand: "MountainX",
        category: null,
        images: ["https://picsum.photos/seed/backpack/600"],
        inventory: {
          quantity: 40,
          lowStockThreshold: 4,
          trackQuantity: true,
          allowBackorder: false
        },
        attributes: {
          color: "Rojo",
          size: "40L",
          weight: 1.2,
          dimensions: { length: 50, width: 30, height: 22 }
        },
        specifications: { impermeable: true },
        tags: ["mochila", "trekking"],
        status: "active",
        featured: false,
        ratings: { average: 4.6, count: 190 }
      },

      {
        sku: "SKU005",
        name: "Teclado Mecánico RGB",
        shortDescription: "Switches rojos, iluminación completa",
        description: "Ideal para gaming. Duración de 50 millones de pulsaciones.",
        price: { regular: 110, sale: 89, currency: "USD" },
        brand: "KeyForce",
        category: null,
        images: ["https://picsum.photos/seed/keyboard/600"],
        inventory: {
          quantity: 29,
          lowStockThreshold: 3,
          trackQuantity: true,
          allowBackorder: false
        },
        attributes: {
          color: "Negro",
          size: "Full-size",
          weight: 1.1,
          dimensions: { length: 44, width: 14, height: 4 }
        },
        specifications: { switches: "rojos", rgb: true },
        tags: ["gaming", "teclado"],
        status: "active",
        featured: false,
        ratings: { average: 4.7, count: 520 }
      }
    ];

    await ProductModel.insertMany(products);

    console.log("✅ Productos insertados con éxito");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear productos:", error);
    process.exit(1);
  }
};

createProducts();
