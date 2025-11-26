import { Schema, model, Document, ObjectId, Types } from "mongoose";

export interface ICart extends Document {
    user?: ObjectId; 
    sessionId?: string;  
    items: {
        product: Types.ObjectId;
        quantity: number;
        price: number;
        addedAt: Date;
        attributes: {
            color?: string;
            size?: string;
        };
    }[];
    expiresAt?: Date;
}

const CartSchema = new Schema<ICart>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        sessionId: { type: String },
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                addedAt: { type: Date, default: Date.now },
                attributes: {
                    color: { type: String },
                    size: { type: String },
                },
            },
        ],
        expiresAt: { type: Date },
    },
    {
        timestamps: true, 
        versionKey: false,
    }
);

export const CartModel = model<ICart>("Cart", CartSchema);
