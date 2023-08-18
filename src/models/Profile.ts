import { Schema, Document, model, Model, ObjectId } from "mongoose";
import { addressSchema, IAddress } from "../extra/adress_schema";
import { posteSchema, IPoste } from "../extra/poste_schema";
import { experienceSchema, IExperience } from "../extra/experience_schema";
import { diplomeSchema, IDiplome } from "../extra/diplome_schema";

interface ProfileModel extends Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

interface ProfileDoc extends Document {
  user_id: string;
  fullname: string;
  birth_date: string;
  tel: string;
  adress: IAddress;
  posteActuelle: IPoste;
  diplomes: [IDiplome];
  competences: [string];
  experiences: [IExperience];
}

interface ProfileAttrs {
  user_id: string;
  fullname?: string;
  birth_date?: Date;
  tel?: string;
  adress?: IAddress;
  posteActuelle?: IPoste;
  diplomes?: [IDiplome];
  competences?: [string];
  experiences?: [IExperience];
  linkedin?: string;
  facebook?: string;
  instagrame?: string;
}

const profileSchema = new Schema(
  {
    user_id: {
      type: String
    },
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
        delete ret.__v;
      },
    },
  }
);

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = model<ProfileDoc, ProfileModel>("Profile", profileSchema);

export { Profile };
