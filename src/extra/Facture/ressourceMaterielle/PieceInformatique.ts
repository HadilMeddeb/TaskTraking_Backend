import { Schema, Document } from "mongoose";

//FraisLicence
interface IFraisPieceInformatique {
  nomPiece: String;
  fraisUnitaire: Number;
  NombrePiece: Number;
  total:number
}

interface I_FraisPieceInformatique extends Document {
  nomPiece: String;
  fraisUnitaire: Number;
  NombrePiece: Number;
  total:number
}
const fraisPieceInformatiqueSchema = new Schema<I_FraisPieceInformatique>(
  {
    nomPiece: { type: String },
    fraisUnitaire: { type: Number, default: 0 },
    NombrePiece: { type: Number, default: 0 },
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

fraisPieceInformatiqueSchema.virtual("total").get(function () {
  return (this.fraisUnitaire as number) * (this.NombrePiece as number);
});

export { fraisPieceInformatiqueSchema, IFraisPieceInformatique };
