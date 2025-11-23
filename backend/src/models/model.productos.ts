import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  sku: string;
  name: string;
  description: string;
  shortDescription: string;
  price: {
    regular: number;
    sale: number;
    currency: string;
  };
  category: Schema.Types.ObjectId;
  brand: string;
  images: string[];
  inventory: {
    quantity: number;
    lowStockThreshold: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
  };
  attributes: {
    color: string;
    size: string;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  specifications: Map<string, any>;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    slug: string;
  };
  status: "active" | "inactive" | "draft";
  featured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    shortDescription: String,

    price: {
      regular: { type: Number, required: true },
      sale: { type: Number, default: 0 },
      currency: { type: String, default: "USD" }
    },

    category: { type: Schema.Types.ObjectId, ref: "Category" },
    brand: String,
    images: [String],

    inventory: {
      quantity: { type: Number, default: 0 },
      lowStockThreshold: { type: Number, default: 5 },
      trackQuantity: { type: Boolean, default: true },
      allowBackorder: { type: Boolean, default: false }
    },

    attributes: {
      color: String,
      size: String,
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number
      }
    },

    specifications: {
      type: Map,
      of: Schema.Types.Mixed
    },

    tags: [String],

    seo: {
      metaTitle: String,
      metaDescription: String,
      slug: { type: String, unique: true }
    },

    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "draft"
    },

    featured: { type: Boolean, default: false },

    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>("Product", productSchema);