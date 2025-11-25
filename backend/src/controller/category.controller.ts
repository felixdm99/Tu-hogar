import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {

    async create(req: Request, res: Response) {
        try {
            const category = await categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };

    async getAll(req: Request, res: Response) {
        try {
          const category = await categoryService.getCategory();
          res.json(category);
        } catch (error) {
          res.status(500).json({ error: (error as Error).message });
        }
      };
    async update(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const updated = await categoryService.updateCategory(name, req.body);

            if (!updated) {
                return res.status(404).json({ error: "Categoría no encontrada" });
            }

            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
      async delete(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const deleted = await categoryService.deleteCategory(name);

            if (!deleted) {
                return res.status(404).json({ error: "Categoría no encontrada" });
            }

            res.json({ message: "Categoría eliminada", deleted });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}
export const categoryController = new CategoryController();

 