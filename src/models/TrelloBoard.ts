import { Schema, model, Model, Document } from "mongoose";
import { IList,listSchema } from "../extra/listWithOrderForBoard";

interface BoardAttrs {
  id_workspace: String;
  id_TrelloWorkspace: String;
  id_TrelloBoard: String;
  lists: IList[]
  
}

interface BoardModel extends Model<BoardDoc> {
  build(attrs: BoardAttrs): BoardDoc;
}

interface BoardDoc extends Document {
  id_workspace: String;
  id_TrelloWorkspace: String;
  id_TrelloBoard: String;
  lists: IList[]
  
}

const boardSchema = new Schema(
  {
    id_workspace:{
      type: String,
      required: true,
  },
  id_TrelloWorkspace:{
      type: String,
      required: true,
  },
  id_TrelloBoard:{
      type: String,
      required: true,
  },
  lists: {
    type: [listSchema],
    default: [],
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

boardSchema.statics.build = (attrs: BoardAttrs) => {
  return new Board(attrs);
};

const Board = model<BoardDoc, BoardModel>("Board", boardSchema);
export { Board };
