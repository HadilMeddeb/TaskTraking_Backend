import { Schema, Document } from 'mongoose';
import { fraisLicenceLogicielSchema } from './fraisLicenceLogiciel';
import { fraisOutilDeveloppementSchema } from './fraisOutilDeveloppement';
import { IFraisLicenceLogiciel } from './fraisLicenceLogiciel';
import { IFraisOutilDeveloppement } from './fraisOutilDeveloppement';

//adress
interface IFraisRessourceLogicielle  {
  fraisLicences?: [IFraisLicenceLogiciel];
  fraisOutilsDeveloppement?: [IFraisOutilDeveloppement];
}

interface I_FraisRessourceLogicielle extends Document {
    fraisLicences: [IFraisLicenceLogiciel];
    fraisOutilsDeveloppement: [IFraisOutilDeveloppement];
    fraisTotalDesLicences: number,
    fraisTotalDedOutilsDeveloppement:number,
    total:number
}


  
const fraisRessourceLogicielleSchema = new Schema<I_FraisRessourceLogicielle>({
    fraisLicences:{type:[fraisLicenceLogicielSchema], default:[]},
    fraisOutilsDeveloppement: {type:[fraisOutilDeveloppementSchema], default:[]},             
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
});


fraisRessourceLogicielleSchema.virtual("fraisTotalDesLicences").get(function () {
  let sum = 0;
  this.fraisLicences.forEach((element) => {
    sum += element.frais;
  });
  return sum;
});


fraisRessourceLogicielleSchema.virtual("fraisTotalDedOutilsDeveloppement").get(function () {
  let sum = 0;
  this.fraisOutilsDeveloppement.forEach((element) => {
    console.log("new sum :", sum)
    sum += element.fraisTotal;
  });
  console.log("fraisTotalDedOutilsDeveloppement result sum :", sum)
  return sum;
});



fraisRessourceLogicielleSchema.virtual("total").get(function () {
  let sum = this.fraisTotalDedOutilsDeveloppement+this.fraisTotalDesLicences;
  console.log("fraisTotalDedOutilsDeveloppement result sum :", sum)
  return sum;
});


export  {fraisRessourceLogicielleSchema ,IFraisRessourceLogicielle } 


  