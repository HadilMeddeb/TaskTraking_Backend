import { Schema, Document } from "mongoose";

//FraisLicence
interface IFraisOutilDeveloppement {
  nomOutilDeveloppement: String;
  fraisTotal: number;
  maniereAchat: String;
  unite: String;
  fraisParUnite: Number;
  nombreUnite: Number;
  prixAchat: Number;
}

interface I_FraisOutilDeveloppement extends Document {
  nomOutilDeveloppement: String;
  fraisTotal: number;
  maniereAchat: String;
  unite: String;
  fraisParUnite: Number;
  nombreUnite: Number;
  prixAchat: Number;
}

const fraisOutilDeveloppementSchema = new Schema<I_FraisOutilDeveloppement>(
  {
    nomOutilDeveloppement: { type: String, required: true },
    maniereAchat: {
      type: String,
      required: true,
      enum: ["totale", "location"],
    },
    unite: {
      type: String,
      enum: ["jour", "heure", "mois", "année",''],
    },
    fraisParUnite: { type: Number },
    nombreUnite: { type: Number },
    prixAchat: { type: Number },
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



fraisOutilDeveloppementSchema.virtual("fraisTotal").get(function () {
  if (this.maniereAchat == "location") {
    return (this.fraisParUnite as number) * (this.nombreUnite as number);
  } else {
    console.log("this.prixAchat :",this.prixAchat)
    return this.prixAchat;
  }
});

export { fraisOutilDeveloppementSchema, IFraisOutilDeveloppement };
