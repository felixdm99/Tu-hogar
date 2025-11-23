import { ProductModel, IProduct } from "../models/product.model";

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
