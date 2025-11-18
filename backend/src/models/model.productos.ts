import mongoose, { Schema, Document} from "mongoose";
export interface IProducto extends Document{
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
    imagen: string;
    orden: "asc" | "desc"

} 

const ProductoSchema: Schema = new Schema({
    nombre: { type: String, required: true},
    precio: { type: Number, required: true},
    stock: { type: Number, required: true},
    categoria: { type: String, required: true},
    imagen: { type: String, required: true},

});

export default mongoose.model<IProducto>("Producto", ProductoSchema);