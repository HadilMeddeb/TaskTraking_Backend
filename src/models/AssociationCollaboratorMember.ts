import { Schema, model, Model, Document } from "mongoose";

interface AssociationCollaboratorMemberAttrs {
    trelloCollaborator:string,
    idWorkspaceMember: string;
}

interface AssociationCollaboratorMemberModel extends Model<AssociationCollaboratorMemberDoc> {
  build(attrs: AssociationCollaboratorMemberAttrs): AssociationCollaboratorMemberDoc;
}

interface AssociationCollaboratorMemberDoc extends Document {
    trelloCollaborator:string,
    idWorkspaceMember: string;
}

const associationCollaboratorMemberSchema = new Schema(
  {
    trelloCollaborator: {
      type: String,
      required: true,
    },
    idWorkspaceMember: {
        type: String,
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

associationCollaboratorMemberSchema.statics.build = (attrs: AssociationCollaboratorMemberAttrs) => {
  return new AssociationCollaboratorMember(attrs);
};

const AssociationCollaboratorMember = model<AssociationCollaboratorMemberDoc, AssociationCollaboratorMemberModel>("AssociationCollaboratorMember", associationCollaboratorMemberSchema);
export { AssociationCollaboratorMember };
