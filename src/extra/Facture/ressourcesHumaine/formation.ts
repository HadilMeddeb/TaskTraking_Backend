import { Schema, Document } from 'mongoose';

//FraisLicence
interface IFraisFormation  {
  genre: String,
  fraisFormateur:Number,
  nomFormation: String,
  fraisInscription: Number,
  nombreInscription: Number,
  total:number

  }

interface I_FraisFormation extends Document {
    genre: String,
    fraisFormateur:Number,
    nomFormation: String,
    fraisInscription: Number,
    nombreInscription: Number,
    total:number
  }


const fraisFormationSchema = new Schema<I_FraisFormation>({
    genre:{type:String, enum:["parFormateur","parInscription"],required:true},
    fraisFormateur:Number,
    nomFormation: {type:String ,required:true},
    fraisInscription: {type:Number},
    nombreInscription: {type:Number},
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


  fraisFormationSchema.virtual('total').get(function() {
    if(this.genre=="parFormateur")
  {return this.fraisFormateur as number;}
  else
  {
 return (this.fraisInscription as number) * (this.nombreInscription as number);
  }
  });

  export  {fraisFormationSchema ,IFraisFormation } 