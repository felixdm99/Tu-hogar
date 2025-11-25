import { Router } from "express";
import { categoryController } from "../controller/category.controller";

const router = Router();

router.post("/", categoryController.create.bind(categoryController));

router.get("/", categoryController.getAll.bind(categoryController));

router.put("/:name", categoryController.update.bind(categoryController));

router.delete("/:name", categoryController.delete.bind(categoryController));

export default router;
