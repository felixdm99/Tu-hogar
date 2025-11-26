import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";

export const createReviewController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const review = await ReviewService.createReview(data);
        return res.status(201).json({ ok: true, review });
    } catch (error: any) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};


export const getReviewsByProductController = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const reviews = await ReviewService.getReviewsByProduct(productId);
        return res.json({ ok: true, reviews });
    } catch (error: any) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};


export const updateReviewStatusController = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;
        const { status } = req.body; // "approved" | "rejected"

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ ok: false, message: "Estado inválido" });
        }

        const updatedReview = await ReviewService.updateReviewStatus(reviewId, status as "approved" | "rejected");
        return res.json({ ok: true, review: updatedReview });
    } catch (error: any) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};
