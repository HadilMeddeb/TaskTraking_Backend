import { Schema, Document } from 'mongoose';

//FraisLicence
interface IFraisLicenceLogiciel  {
    nomLicenceLogiciel: String,
    dureeParMois: Number,
    frais:number
  }

interface I_FraisLicenceLogiciel extends Document {
    nomLicenceLogiciel: String,
    dureeParMois: Number,
    frais:Number

  }

const fraisLicenceLogicielSchema = new Schema<I_FraisLicenceLogiciel>({
    nomLicenceLogiciel: {type:String , required:true},
    dureeParMois: {type:Number,required:true, default:0},
    frais: { type: Number,required:true, default:0 },
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

  export  {fraisLicenceLogicielSchema ,IFraisLicenceLogiciel } 