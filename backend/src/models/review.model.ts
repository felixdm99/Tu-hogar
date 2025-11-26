import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
    product: Types.ObjectId;
    user: Types.ObjectId;
    rating: number; // 1-5
    title: string;
    comment: string;
    verifiedPurchase: boolean;
    status: "pending" | "approved" | "rejected";
    helpful: {
        yes: number;
        no: number;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

const ReviewSchema = new Schema<IReview>(
    {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        title: { type: String, required: true },
        comment: { type: String, required: true },
        verifiedPurchase: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        helpful: {
            yes: { type: Number, default: 0 },
            no: { type: Number, default: 0 },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const ReviewModel = model<IReview>("Review", ReviewSchema);
