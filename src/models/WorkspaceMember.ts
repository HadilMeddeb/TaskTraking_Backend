import {Schema, model , Model,Document} from "mongoose";
import { addressSchema, IAddress } from "../extra/adress_schema";
import { diplomeSchema, IDiplome } from "../extra/diplome_schema";
import { experienceSchema, IExperience } from "../extra/experience_schema";
import { IPoste, posteSchema } from "../extra/poste_schema";
import { Password } from "../services/password";

// An interface that describes the properties
// that are requried to create a new User
interface WorkspaceMemberAttrs {
  username:string,
  email: string;
  password: string;
  role: string;
}

// An interface that describes the properties
// that a User Model has
interface WorkspaceMemberModel extends Model<WorkspaceMemberDoc> {
  build(attrs: WorkspaceMemberAttrs): WorkspaceMemberDoc;
}

// An interface that describes the properties
// that a WorkspaceMember Document has
export interface WorkspaceMemberDoc extends Document {
  username:string,
  email: string;
  password: string;
  role: string;
  status: string;
  imagePath: string;
  workspacesMembership: string [],
  workspacesToHandle: string [],
  PropositionsToClarify: string [],
  PropositionsToValidate:string [],  
  fullname: string;
  birth_date: string;
  tel: string;
  adress: IAddress;
  posteActuelle: IPoste;
  diplomes: [IDiplome];
  competences: [string];
  experiences: [IExperience];
}

const workspaceMemberSchema = new Schema(
  {  username:{
    type: String,
    required: true,
    unique: true,
  },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["gestionnaire", "collaborateur", "Admin"],
      default: "employee",
    },
    status: {
      type: String,
      required: true,
      default: "Connecté",
      enum: ["Non Connecté", "Connecté"],
    },
//member data :
workspacesMembership:{
    type: [Schema.Types.ObjectId],
    default:[],
    ref: 'Workspace',
  },
  workspacesToHandle:{
    type: [Schema.Types.ObjectId],
    default:[],
    ref: 'Workspace',
  },
  PropositionsToClarify:{
    type: [Schema.Types.ObjectId],
    default:[],
    ref: 'TaskProposition',
  },
  PropositionsToValidate:{
    type: [Schema.Types.ObjectId],
    default:[],
    ref: 'TaskProposition',
  },
  //profile data 
  fullname: {
    type: String,
    default: null,
  },
  birth_date: {
    type: Date,
    default: null,
  },
  tel: {
    type: String,
    default: null,
  },
  adress: {
    type: addressSchema,
    default: null,
  },
  posteActuelle: {
    type: posteSchema,
    default: null,
  },
  imagePath:{
   type: String,
   default: ""
  },
  diplomes: {
    type: [diplomeSchema],
    default: [],
  },
  competences: {
    type: [String],
    default: [],
  },
  experiences: {
    type: [experienceSchema],
    default: [],
  },
  linkedin: { type: String, default: null },
  facebook: { type: String, default: null },
  instagrame: { type: String, default: null },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

workspaceMemberSchema.statics.build = (attrs: WorkspaceMemberAttrs) => {
  return new WorkspaceMember(attrs);
};

workspaceMemberSchema.pre("save", async function (done) {

  // hash password
  if (this.isModified("password")) {
    const hashed = await Password.Tohash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const WorkspaceMember = model<WorkspaceMemberDoc, WorkspaceMemberModel>("WorkspaceMember", workspaceMemberSchema);

export { WorkspaceMember };

