import { Schema, model, Model, Document } from "mongoose";

// member
interface IDemandeAttrs {
    member:string,
    workspace:string,
    message:string
}

interface IDemandeModel extends Model<IDemandeDoc> {
  build(attrs: IDemandeAttrs): IDemandeDoc;
}

interface IDemandeDoc extends Document {
    member:Schema.Types.ObjectId,
    workspace:Schema.Types.ObjectId,
    message:string,
    acceptance_status:Boolean,
    createdAt:Date
}

const DemandeSchema = new Schema(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: 'WorkspaceMember',
      required: true,

    },
    workspace:{
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
        required:true
      },
    acceptance_status :{
      type: Boolean,
      required: true,
      default: false 
    },
    message:{
        type: String,
        default:''
    },
    createdAt:{
     type:Date,
     default : new Date()
    }

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
DemandeSchema.statics.build = (attrs: IDemandeAttrs) => {
  return new Demande(attrs);
};


const Demande = model<IDemandeDoc,IDemandeModel>("Demande", DemandeSchema);

export { Demande };

