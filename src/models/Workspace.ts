import { Schema, model, Model, Document } from "mongoose";
import axios from "axios";
import { configData } from "../config/ConfigData";

// Workspace
interface IWorkspaceAttrs {
  name: string;
  detailsAbout: string;
  idResponsable: string;
  icon: string;
  trelloWorkspace?: string;
  initialBoard?: string; 
  boardLists?: string[]
}

interface IWorkspaceModel extends Model<IWorkspaceDoc> {
  build(attrs: IWorkspaceAttrs): IWorkspaceDoc;
}

interface IWorkspaceDoc extends Document {
  name: string;
  image:string;
  initialBoard: string;
  icon: string;
  idResponsable: string;
  detailsAbout: string;
  members: string[];
  taskPropositions:string[];
  createdAt: Date;
  callBackUrl:string;
  trelloWorkspace: string;
}

const workspaceSchema = new Schema(
  {

    name: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:""
    },
    detailsAbout: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    idResponsable: {
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceMember',
      required: true,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'WorkspaceMember',
      default:[]
    },
    taskPropositions:{
      type: [Schema.Types.ObjectId],
      ref: 'TaskProposition',
      default:[]
    },
    trelloWorkspace:{
      type: String,
      required: true,
      unique: true,
    },
    initialBoard: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      default: null,
    },
    callBackUrl:{
      type: String,
      default: null,
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


workspaceSchema.statics.build = (attrs: IWorkspaceAttrs) => {
  console.log("aatttttttttttttttttrs :", attrs )
  return new Workspace(attrs);
};
/*
workspaceSchema.pre("save", async function (doc, next) {
  try {
    //create associated organization
    const organization = await axios.post(
      `${configData.baseURL}organizations?displayName=${this.name}&${configData.auth}`
    );

    if (organization) {
      //create associated board if organization has been created
      const boardName = "initial Board";
      console.log("------------------- organization.data : ",organization.data)
      const board = await axios.post(
        `${configData.baseURL}boards?name=${boardName}&${configData.auth}`,
        {
          idOrganization: organization.data.id,
        }
      );
      console.log("------------ board : ",board)
      if (board) {
        //create associated list if board has been created
        const list = await axios.post(
          `${configData.baseURL}boards/${board.data.id}/lists?name=ToDo&${configData.auth}`
        );
        if (list) {
          this.idTrelloOrganisation = organization.data.id;
          this.idInitialBoard = board.data.id;
          this.idInitialList = list.data.id;
        }
      }
    }
  } catch (err: any) {
    console.log("errrror :", err);
    
  }
});
*/



const Workspace = model<IWorkspaceDoc, IWorkspaceModel>(
  "Workspace",
  workspaceSchema
);

export { Workspace };
