import { Schema, Document } from "mongoose";

//FraisLicence
interface IFraisPersonnel {
  categorie: String;
  fraisHoraire: Number;
  dureeParMois: Number;
  nombreHeure: Number;
  total:number;
}

interface I_FraisPersonnel extends Document {
  categorie: String;
  fraisHoraire: Number;
  dureeParMois: Number;
  nombreHeure: Number;
  total:Number;
}

const fraisPersonnelSchema = new Schema<I_FraisPersonnel>(
  {
    categorie: {
      type: String,
      enum: ["Developpeur", "testeur", "Responsable Qualité", "Chef de Projet","manager"],
      require: true,
    },
    fraisHoraire: { type: Number, default: 0, required: true },
    nombreHeure: { type: Number, default: 0, required: true },
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

fraisPersonnelSchema.virtual("total").get(function () {
  return (this.fraisHoraire as number) * (this.nombreHeure as number);
});

export { fraisPersonnelSchema, IFraisPersonnel };
