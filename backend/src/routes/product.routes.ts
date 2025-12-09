import { Router } from "express";
import { productController } from "../controller/product.controller";

const router = Router();

router.post("/", productController.create.bind(productController));
router.get("/", productController.getAll.bind(productController));
router.get("/:id", productController.getById.bind(productController));
router.put("/:id", productController.update.bind(productController));
router.delete("/:id", productController.delete.bind(productController));
//router.get("/:id", getProductById);

export default router;
