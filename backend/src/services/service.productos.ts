import Productos from "../models/model.productos";

interface ProductoData {
     nombre: string;
    precio: number;
    stock: number;
    categoria: string;
    imagen: string;

}

export const crearProductoService = async ( data: ProductoData)=>{
    const existe = await Productos.findOne({nombre: data.nombre});
    if (existe) {
        throw new Error("El producto ya existe");
    }

    const nuevoProducto = new Productos(data);
    return await nuevoProducto.save();
}

export const obtenerPorCategoriaService = async (
    categoria: string,
    orden: "asc" | "desc" = "asc"
) => {
    if (!categoria) {
        throw new Error("Elige una categoría");
    }

    const sortOrder = orden === "desc" ? -1 : 1;

    const productos = await Productos.find({ categoria }).sort({ precio: sortOrder });

    if (productos.length === 0) {
        throw new Error("No se encontraron productos para esta categoría");
    }

    return productos;
};