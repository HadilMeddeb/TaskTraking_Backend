import { Schema, model, Model, Document } from "mongoose";

// Team
interface IsousTacheAttrs {
    PrinciplesousTache:string;
    Responsable:string;
    date_debut: string;
    date_livraison: string;
    description:string
}

interface IsousTacheModel extends Model<IsousTacheDoc> {
  build(attrs: IsousTacheAttrs): IsousTacheDoc;
}

interface IsousTacheDoc extends Document {
    PrincipleTask:string;
    Responsable:string;
    date_debut: string;
    date_livraison: string;
    description:string
}

const SousTacheSchema = new Schema(
  {
    PrincipleTask: {
      type: String,
      required: true,
    },

    Responsable: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date_livraison: {
      type: Date,
      required: true,
    },
    date_debut: {
      type: Date,
      required: true,
    },
    tools: {
      type: [String],
      required: true,
      default: [],
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

SousTacheSchema.statics.build = (attrs: IsousTacheAttrs) => {
  return new SousTache(attrs);
};

const SousTache = model<IsousTacheDoc, IsousTacheModel>("SousTache", SousTacheSchema);
export { SousTache };
