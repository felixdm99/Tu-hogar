import { Request, Response } from "express";
import { productService } from "../services/service.productos";

export class ProductController {
  
  async create(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });

      res.json(product);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await productService.deleteProduct(req.params.id);
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const productController = new ProductController();