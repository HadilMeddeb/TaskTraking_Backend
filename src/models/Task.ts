import { Schema, model, Model, Document } from "mongoose";
import { fileSchema,IFile } from "../extra/file";

// Team
export interface ITaskAttrs {
  id_workspace: string;
  name: string;
  description: string;
  id_responsable: string;
  paimentStatus:string;
  id_taskProposition?: string;
  idTrelloCard?: string;
  idCardWebhhok?:string;
  CardTrelloUrl?:string;
  relatedProject?:Schema.Types.ObjectId;
  currentTrelloListId?:string;
  start?:Date;
  end?:Date;
  dateEcheance?:Date;
  completed?: boolean;
  idFacturePrevisionnelle?:string;
  idFactureReelle?:string;
  idFactureFacturee?:string;
  collaborators?:string[];
  checkLists?:string;
  files?:any[]
}

export interface ITaskModel extends Model<ITaskDoc> {
  build(attrs: ITaskAttrs): ITaskDoc;
}

export interface ITaskDoc extends Document {
  id_taskProposition: Schema.Types.ObjectId;
  id_workspace: Schema.Types.ObjectId;
  idTrelloCard: string;
  idCardWebhhok: string;
  currentTrelloListId:  Schema.Types.ObjectId;
  CardTrelloUrl: string;
  id_responsable: string;
  name: string;
  description: string;
  relatedProject : Schema.Types.ObjectId;
  start: Date;
  end: Date;
  dateEcheance: Date;
  completed: Boolean;
  paimentStatus: string;
  idFacturePrevisionnelle: Schema.Types.ObjectId;
  idFactureReelle: Schema.Types.ObjectId;
  idFactureFacturee: Schema.Types.ObjectId;
  collaborators: string[];
  checkLists:Schema.Types.ObjectId[];
  createdAt:Date;
  files:Schema.Types.ObjectId[]
}

const TaskSchema = new Schema(
  {
    id_taskProposition: {
      type: Schema.Types.ObjectId,
      ref: "TaskProposition",
    },
    id_workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    idTrelloCard: {
      type: String,
      default: null,
    },
    idCardWebhhok: {
      type: String,
      default: null,
    },
    currentTrelloListId: {
      type: String,
      default: null,
    },
    CardTrelloUrl: {
      type: String,
      default: null,
    },
    id_responsable: {
      type: Schema.Types.ObjectId,
      ref: "WorkspaceMember",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    files: {
      type: [fileSchema],
      required: true,
      default :[]
    },
    description: {
      type: String,
      required: true,
    },
    relatedProject :{
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    /*
    emergencyDegree:{
      type: Number,
    },
    emergency:{
      type: String,
      required: true,
      default: "Free",
      enum: ["urgent","le plus tot que possible","peut attendre"],
    },
    // yomken twelli virtual selon lemergencyDegree
    ordre:{
      type: Number,
    },
    */
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    dateEcheance: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    paimentStatus: {
      type: String,
      enum: ["Free", "Paid"],
      default:"Free"
    },
    idFacturePrevisionnelle: {
      type: Schema.Types.ObjectId,
      ref: "Facture",
    },
    idFactureReelle: {
      type: Schema.Types.ObjectId,
      ref: "Facture",
    },
    idFactureFacturee: {
      type: Schema.Types.ObjectId,
      ref: "Facture",
    },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'WorkspaceMember' }],
    checkLists: [{ type: Schema.Types.ObjectId, ref: 'CheckList' }],
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

TaskSchema.statics.build = (attrs: ITaskAttrs) => {
  console.log("-------------> attrs :", attrs)
  const task= new Task(attrs);
  console.log('ttttttttttttttttttttttt ------------------> :',task)
  return task;
};

const Task = model<ITaskDoc, ITaskModel>("Task", TaskSchema);
export { Task };
