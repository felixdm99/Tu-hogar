import {Schema, model, Document } from "mongoose"

export interface ICategory extends Document {
    name: string;
    description: string;
    parent?: string;
    image: string[];
    seo: {
        metaTitle: string;
        metaDescription: string;
        slug: string;
    };
    isActive: boolean;
    displayOrder: number;
};

const categorySchema = new Schema<ICategory>(
    {
    name: {type: String, required: true},
    description: {type: String},
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    image: [{type:String}],
    seo: {
        metaTitle: String,
        metaDescription: String,
        slug: {type:String, unique: true},
    },
    isActive: {type:Boolean, default: true},
    displayOrder:{type: Number, default: 0},
    },
    {timestamps: true}
);
categorySchema.pre("save", function (next) {
  if (this.isModified("name") || !this.seo?.slug) {
    const slug = this.name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9 ]/g, "")                       
      .replace(/\s+/g, "-");                            

    this.seo = { ...this.seo,slug };
  }
  next();
});
export const CategoryModel =model <ICategory>("Category", categorySchema);