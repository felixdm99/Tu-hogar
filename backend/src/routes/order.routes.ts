import { Router } from "express";

import { 
    orderController,
    getOrdersController,
    cancelOrderController,
    updateOrderStatusController
} from "../controller/order.controller";

const router = Router();


router.post("/", orderController.createOrder);

router.get("/", getOrdersController);

router.put("/cancel/:id", cancelOrderController);

router.put("/status/:id", updateOrderStatusController);

export default router;
