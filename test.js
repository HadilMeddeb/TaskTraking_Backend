
  id_workspace: String;
  id_TrelloWorkspace: String;
  id_TrelloBoard: String;
  lists: [Schema.Types.ObjectId]
  
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
      type: [Schema.Types.ObjectId],
      ref: "List",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},




















import { Schema, model, Model, Document } from "mongoose";

interface BoardAttrs {
  name: String,
  gitLink:string,
  demoServerURL: string,
  client: string,
  
}

interface BoardModel extends Model<BoardDoc> {
  build(attrs: BoardAttrs): BoardDoc;
}

interface BoardDoc extends Document {
  name: String,
  createdAt: Date,
  gitLink:string,
  demoServerURL: string,
  client: string,
  
}

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique : true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    gitLink: {
        type: String,
        required: true,
        unique : true,
    },
    demoServerURL: {
        type: String,
        required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
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
