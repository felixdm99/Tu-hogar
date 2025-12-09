import mongoose from "mongoose";
import { connectDB } from "../config/config";
import User from "../models/user.model";
import bcrypt from "bcrypt";

const crearAdmin = async ()=> {
    await connectDB();

    const emailAdmin="admin@ecommerce.com";
    

    const adminExistente = await User.findOne({email : emailAdmin});
    if (adminExistente){
        console.log("El administrador ya existe.");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin= new User({
        nombre:"Admin",
        apellido: "Ecommerce",
        email: emailAdmin,
        password: hashedPassword,
        role:"admin"
    });

    await admin.save();
    console.log("Administrador creado exitosamente");
    process.exit(0);
};

crearAdmin();
