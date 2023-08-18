import { Schema, model, Model, Document } from "mongoose";

interface ProjectAttrs {
  name: String,
  gitLink:string,
  demoServerURL: string,
  client: string,
  idWorkspace:string;
  
}

interface ProjectModel extends Model<ProjectDoc> {
  build(attrs: ProjectAttrs): ProjectDoc;
}

interface ProjectDoc extends Document {
  name: String,
  createdAt: Date,
  gitLink:string,
  demoServerURL: string,
  client: string,
  idWorkspace:string;
  
}

const projectSchema = new Schema(
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
  idWorkspace:{
    type: Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  }
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

projectSchema.statics.build = (attrs: ProjectAttrs) => {
  return new Project(attrs);
};

const Project = model<ProjectDoc, ProjectModel>("Project", projectSchema);
export { Project };
