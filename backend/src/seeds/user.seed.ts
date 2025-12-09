import bcrypt from "bcrypt";
import { connectDB } from "../config/config";
import User from "../models/user.model";

async function seedUser() {
  await connectDB();
  console.log("🔥 Conectado a MongoDB");

  const email = "admin@admin.com";

  // Verificar si ya existe el usuario
  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log("⚠️ El usuario ya existe. Seed cancelado.");
    process.exit(0);
  }

  // Crear usuario con contraseña sin hashear (se hashea sola por el pre("save"))
  const newUser = new User({
    email,
    password: "admin123",   // 👈 El pre-save hook la va a hashear
    profile: {
      firstName: "Admin",
      lastName: "Master",
      phone: "",
      avatar: "",
    },
    role: "admin",
    addresses: [],
    wishlist: [],
    isActive: true,
  });

  await newUser.save();

  console.log("✅ Usuario seed creado con éxito:");
  console.log({
    email: "admin@admin.com",
    password: "admin123 (antes de hash)",
  });

  process.exit(0);
}

seedUser();
