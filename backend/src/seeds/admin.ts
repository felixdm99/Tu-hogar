import mongoose from "mongoose";
import { connectDB } from "../config/config";
import Usuario from "../models/model.usuario";
import bcrypt from "bcrypt";

const crearAdmin = async ()=> {
    await connectDB();

    const emailAdmin="adminQecommerce.com";
     //verifica si ya existe

    const adminExistente = await Usuario.findOne({email : emailAdmin});
    if (adminExistente){
        console.log("El administrador ya existe.");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123 ", 10);
//crea un admin con correo y contraseña
    const admin= new Usuario({
        nombre:"Admin",
        apellido: "Ecommerce",
        email: emailAdmin,
        password: hashedPassword,//la contraseña se guarda hasheada
        role:"admin"
    });

    await admin.save();
    console.log("Administrador creado exitosamente");
    process.exit(0);
};

crearAdmin();
