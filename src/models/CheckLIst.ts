import { Schema, model, Model, Document } from "mongoose";

// Team
export interface ICheckListAttrs {
    id_Task:string;
    name: string;
}

export interface ICheckListModel extends Model<ICheckListDoc> {
  build(attrs: ICheckListAttrs): ICheckListDoc;
}

export interface ICheckListDoc extends Document {
    id_Task: Schema.Types.ObjectId;
    name: string;
    items: [string];
    nbFineshedItems: number;
    nbUnFinishedItems: number;
}
const checkListSchema = new Schema(
  {
    idTrelloCheckList: {
      type: String,
      default: null,
    },
    id_Task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    name: {
      type: String,
      required: true,
    },
    items: {
      type: [Schema.Types.ObjectId],
      ref: "UnderTask",
      default: [],
    },
    nbFineshedItems: {
      type: Number,
      default: 0,
    },
    nbUnFinishedItems: {
      type: Number,
      default: 0,
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

checkListSchema.statics.build = (attrs: ICheckListAttrs) => {
  return new CheckList(attrs);
};

const CheckList = model<ICheckListDoc, ICheckListModel>(
  "CheckList",
  checkListSchema
);
export { CheckList };
