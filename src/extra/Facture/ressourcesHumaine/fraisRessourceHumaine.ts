import { Schema, Document } from "mongoose";
import { fraisFormationSchema, IFraisFormation } from "./formation";
import { fraisPersonnelSchema, IFraisPersonnel } from "./fraisPersonnel";

//adress
interface IFraisRessourceHumaine {
  fraisPersonnel: [IFraisPersonnel];
  fraisFormations: [IFraisFormation];
  totalFraisFormation:number;
  totalFraisPersonnel:number;
  
  
}
interface I_FraisRessourceHumaine extends Document {
  fraisPersonnel: [IFraisPersonnel];
  fraisFormations: [IFraisFormation];
  totalFraisFormation:number;
  totalFraisPersonnel:number;
  total:number;
}

const fraisRessourceHumaineSchema = new Schema<I_FraisRessourceHumaine>(
  {
    fraisPersonnel: { type: [fraisPersonnelSchema], default: [] },
    fraisFormations: { type: [fraisFormationSchema], default: [] },
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

fraisRessourceHumaineSchema.virtual("totalFraisPersonnel").get(function () {
  let sum = 0;
  this.fraisPersonnel.forEach((element) => {
    sum += element.total;
  });
  return sum;
});

fraisRessourceHumaineSchema.virtual("totalFraisFormation").get(function () {
  let sum = 0;
  this.fraisFormations.forEach((element) => {
    sum += element.total;
  });
  return sum;
});


fraisRessourceHumaineSchema.virtual("total").get(function () {
  
  const sum = this.totalFraisFormation+this.totalFraisPersonnel;
  console.log("----------------- totalFraisFormation", this.totalFraisFormation)
  console.log("----------------- totalFraisPersonnel", this.totalFraisPersonnel)
  console.log("----------------- sum ressource humaine", sum)
  return sum;
});


export { fraisRessourceHumaineSchema, IFraisRessourceHumaine };
