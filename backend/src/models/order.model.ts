import {Schema, ObjectId, Document, model } from "mongoose";

export interface IOrder extends Document{
    orderNumber: string; 
    customer: ObjectId;

    items: {
        product: ObjectId;
        name: string;
        price: number;
        quantity: number;
        subtotal: number,
        attributes:{
            color: string;
            size:string;
        };
    }[];

    totals:{
        subtotal:number;
        shipping: number,
        tax: number,
        discount: number,
        total: number;
    };

    shippingAddress:{
        firstName: string;
        lastName: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
    };

    billingAddress:{
         firstName: string;
        lastName: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;

    };

    payment:{
        method: string;
        status: string;
        transactionId: string;
        paidAt: Date;
    };

    shipping:{
        method:string;
        trackingNumber: string;
        status: string;
        cost: number;
    };
    status: string,
    notes?: string;


};

const OrderSchema = new Schema <IOrder>(
    {
         orderNumber: {type : String, required: true, unique: true}, 
    customer: {type: Schema.Types.ObjectId, ref: "User", required: true},
    
    items: [{
        product: {type: Schema.Types.ObjectId, ref: "Product", required: true},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        subtotal: {type: Number, required: true},
        attributes:{
            color: {type:String},
            size:{type:String},
        },
    },],

    totals:{
        subtotal:{type: Number, required: true},
        shipping: {type: Number, required: true},
        tax: {type: Number, required: true},
        discount: {type: Number, required: true},
        total: {type: Number, required: true},
    },

    shippingAddress:{
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phone: String,
    },

    billingAddress:{
         firstName: String,
        lastName: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phone: String,

    },

    payment:{
        method: {type: String},
        status: {type: String},
        transactionId: {type: String},
        paidAt: {type: Date},
    },

    shipping:{
        method:{type: String},
        trackingNumber: {type: String},
        status: {type: String},
        cost: {type: Number},
    },
      status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    notes: {type: String},
    },
    {
    timestamps: true,
    versionKey: false,
    },
);

export const OrderModel = model<IOrder>("Order", OrderSchema)
