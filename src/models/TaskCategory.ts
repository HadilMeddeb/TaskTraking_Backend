import { Schema, model, Model, Document } from "mongoose";

interface CategoryAttrs {
  designation: string;
}

interface CategoryModel extends Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

interface CategoryDoc extends Document {
  designation: String,
  createdAt : Date
}

const categorySchema = new Schema(
  {
    designation: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    toObject: { virtuals: true },
  }
);

categorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs);
};

const Category = model<CategoryDoc, CategoryModel>("Category", categorySchema);
export { Category };
