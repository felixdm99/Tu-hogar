import mongoose, { Schema, Document } from "mongoose";

// Definimos la interfaz para TypeScript
export interface IUsuario extends Document {
	nombre: string;
	apellido: string;
	email: string;
	password: string;
	role: "admin" | "user";
	// Mongoose añade automáticamente _id, así que no necesitamos definirlo aquí
}

// Definimos el Esquema de Mongoose
const UsuarioSchema: Schema = new Schema({
	nombre: { type: String, required: true },
	apellido: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }, // unique evita emails duplicados
});

// Creamos y exportamos el Modelo
// Mongoose creará una colección llamada 'usuarios' (en minúsculas y plural)
export default mongoose.model<IUsuario>("Usuario", UsuarioSchema);