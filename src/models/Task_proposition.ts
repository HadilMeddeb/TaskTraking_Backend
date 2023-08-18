import { Schema, model, Model, Document } from "mongoose";
import { ITaskDoc } from "./Task";

// Team
interface ITaskPropositionAttrs {
    id_workspace: string;
    id_creator:string;
    id_responsable_validation:string;
    title: string;
    description: string;
    categorie:string;
    email_bénéficiaire:string;
    relatedProject:Schema.Types.ObjectId;
}

interface ITaskPropositionModel extends Model<ITaskPropositionDoc> {
  build(attrs: ITaskPropositionAttrs): ITaskPropositionDoc;
 
}

interface ITaskPropositionDoc extends Document {
  id_workspace: string;
  id_creator:string;
  id_responsable_validation:string;
  title: string;
  description: string;
  categorie:string;
  createdAt:Date;
  status:string;
  accepted:Boolean;
  email_beneficiaires:string;
  clarifications: string[];
  refuseReason:string;
  id_task:string;
  relatedProject :Schema.Types.ObjectId;
  clarifyTask(status:string): ITaskPropositionDoc;
  accept(start:Date,end:Date,dateEcheance:Date):ITaskDoc;
}

const TaskPropositionSchema = new Schema(
  {
    id_workspace:{
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required:true,
    },
    id_creator:
    {
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceMember',
      required:true
    },
    id_responsable_validation:{
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceMember',
      required:true
     },
     title:{
        type: String,
        required: true,
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
    categorie: {
      type: String,
      required: true,
      enum: ["Amelioration", "Nouvelle","Correction","Maintenance"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
        type: String,
        required: true,
        default: "à valider",
        enum: ["refusée", "acceptée","à clarifier","à valider", "false claim"],
      },
      accepted: {
        type: Boolean,
        default: false,
      },
  
      email_beneficiaires:{
      type: [String]
    },
    clarifications:
    {
      type: [String],
      default:[]
    },
    refuseReason:{
      type: String,
      default:null
    },
    id_task:
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      default:null
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


TaskPropositionSchema.statics.build = (attrs: ITaskPropositionAttrs) => {
  return new TaskProposition(attrs);
};

const TaskProposition = model<ITaskPropositionDoc,ITaskPropositionModel>("TaskProposition", TaskPropositionSchema);
export { TaskProposition };
