import { Schema, Document } from 'mongoose';

//FraisFraisSupplementaires
interface IFraisSupplementaire  {
    name:Number,
    details: String,
    frais: number
}

interface I_FraisSupplementaire extends Document {
    name:Number,
    details: String,
    frais: number
  }


const fraisSupplementaireSchema = new Schema<I_FraisSupplementaire>({
    name: {type:String, required:true},
    details: {type:String, required:true},
    frais: {
        type: Number,
    },
  }, {
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
  });


  export  {fraisSupplementaireSchema ,IFraisSupplementaire } 