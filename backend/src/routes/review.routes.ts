import { Router } from "express";
import { 
    createReviewController, 
    getReviewsByProductController, 
    updateReviewStatusController 
} from "../controller/review.controller";

const router = Router();


router.post("/", createReviewController);
router.get("/product/:productId", getReviewsByProductController);
router.patch("/:reviewId/status", updateReviewStatusController);

export default router;
