import { Schema, model, Model, Document } from "mongoose";

// member
interface IMemberAttrs {
  id_user:string,
  email:string
}

interface IMemberModel extends Model<IMemberDoc> {
  build(attrs: IMemberAttrs): IMemberDoc;
}

interface IMemberDoc extends Document {
  id_user:string,
  email:string,
  workspacesMembership: string [],
  workspacesToHandle: string [],
  PropositionsToClarify: string [],
  PropositionsToValidate:string [],  
}

const MemberSchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    workspacesMembership:{
      type: [Schema.Types.ObjectId],
      ref: 'Workspace',
    },
    workspacesToHandle:{
      type: [Schema.Types.ObjectId],
      ref: 'Workspace',
    },
    PropositionsToClarify:{
      type: [Schema.Types.ObjectId],
      ref: 'TaskProposition',
    },
    PropositionsToValidate:{
      type: [Schema.Types.ObjectId],
      ref: 'TaskProposition',
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
MemberSchema.statics.build = (attrs: IMemberAttrs) => {
  return new Member(attrs);
};


const Member = model<IMemberDoc,IMemberModel>("Member", MemberSchema);

export { Member };

