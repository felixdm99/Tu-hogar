<<<<<<< HEAD
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
=======
import { ProductModel, IProduct } from "../models/model.productos";

export class ProductService {
  async createProduct(data: Partial<IProduct>) {
    const product = await ProductModel.create(data);
    return product;
  }

  async getProducts() {
    return ProductModel.find().lean();
  }

  async getProductById(id: string) {
    return ProductModel.findById(id);
  }

  async updateProduct(id: string, data: Partial<IProduct>) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id: string) {
    return ProductModel.findByIdAndDelete(id);
  }

  async getProductBySlug(slug: string) {
    return ProductModel.findOne({ "seo.slug": slug });
  }
}

export const productService = new ProductService();
>>>>>>> 57292a5e3af94c0779710718f230f8f3660c4e8a
