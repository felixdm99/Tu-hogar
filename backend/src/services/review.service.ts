import { ReviewModel, IReview } from "../models/review.model";

interface CreateReviewData {
    product: string;
    user: string;
    rating: number;
    title: string;
    comment: string;
    verifiedPurchase?: boolean;
}

export class ReviewService {


    static async createReview(data: CreateReviewData): Promise<IReview> {
        const newReview = new ReviewModel({
            ...data,
            verifiedPurchase: data.verifiedPurchase || false,
            status: "pending",
        });

        return await newReview.save();
    }

   
    static async getReviewsByProduct(productId: string): Promise<IReview[]> {
        return await ReviewModel.find({ product: productId, status: "approved" })
            .populate("user", "name email")
            .sort({ createdAt: -1 });
    }

    static async updateReviewStatus(reviewId: string, status: "approved" | "rejected"): Promise<IReview | null> {
        return await ReviewModel.findByIdAndUpdate(
            reviewId,
            { status },
            { new: true }
        );
    }
}
