import { Schema, model, Model, Document } from "mongoose";

// Team
export interface IUnderTaskAttrs {
    id_Checklist : string;
    description: string;
    collaborator: string
}

export interface IUnderTaskModel extends Model<IUnderTaskDoc> {
  build(attrs: IUnderTaskAttrs): IUnderTaskDoc;
}

export interface IUnderTaskDoc extends Document {
    id_Checklist : Schema.Types.ObjectId;
    text: string;
    completed: string;
    collaborator: string
}
const underTaskSchema = new Schema(
  {
    id_Checklist : {
      type: Schema.Types.ObjectId,
      ref: "CheckList",
    },
    collaborator : {
      type: Schema.Types.ObjectId,
      ref: "WorkspaceMember",
    },

    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type:Date ,
      default: new Date(),
    },   
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

underTaskSchema.statics.build = (attrs: IUnderTaskAttrs) => {
  return new UnderTask(attrs);
};

const UnderTask = model<IUnderTaskDoc, IUnderTaskModel>("UnderTask", underTaskSchema);
export { UnderTask };
