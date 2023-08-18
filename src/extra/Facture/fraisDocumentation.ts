import { Schema, Document } from 'mongoose';

//FraisDocumentation
interface IDocumentation  {
    fraisRedaction:Number,
    fraisSupportClient: Number,
  }

interface I_Documentation extends Document {
    fraisRedaction:Number,
    fraisSupportClient: Number,
    total: number
  }


const documentationSchema = new Schema<I_Documentation>({
    fraisRedaction: {type:Number, default:0},
    fraisSupportClient: {type:Number, default:0},
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


  documentationSchema.virtual('total').get(function() {
 return (this.fraisSupportClient as number) + (this.fraisRedaction as number);

  });

  export  {documentationSchema ,IDocumentation } 