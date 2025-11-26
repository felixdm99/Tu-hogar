import { Router } from "express";
import { addItemController, getCartController, clearCartController } from "../controller/cart.controller";

const router = Router();


router.post("/add", addItemController);


router.get("/", getCartController);


router.delete("/clear", clearCartController);

export default router;
