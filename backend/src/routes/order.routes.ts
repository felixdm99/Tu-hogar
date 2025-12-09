import { Router } from "express";
import { 
    OrderController,
    getOrdersController,
    cancelOrderController,
    updateOrderStatusController
} from "../controller/order.controller";

const router = Router();

router.post("/", OrderController.createOrder);

router.get("/", getOrdersController);
router.put("/:id/cancel", cancelOrderController);
router.put("/:id/status", updateOrderStatusController);

export default router;
