import { Schema, model, Model, Document } from "mongoose";

interface ListAttrs {
  listName: String;
}

interface ListModel extends Model<ListDoc> {
  build(attrs: ListAttrs): ListDoc;
}

interface ListDoc extends Document {
  listName: String,
}

const listSchema = new Schema(
  {
    listName: {
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

listSchema.statics.build = (attrs: ListAttrs) => {
  return new List(attrs);
};

const List = model<ListDoc, ListModel>("List", listSchema);
export { List };
