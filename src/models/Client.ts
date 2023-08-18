import { Schema, model, Model, Document } from "mongoose";
import { addressSchema, IAddress } from "../extra/adress_schema";

interface ClientAttrs {
  name: String,
  emails: [String],
  phones:string,
  adress: IAddress,
}

interface ClientModel extends Model<ClientDoc> {
  build(attrs: ClientAttrs): ClientDoc;
}

interface ClientDoc extends Document {
  name: String,
  emails: [String],
  phones:string,
  adress: IAddress,
}

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emails: {
      type: [String],
      default: [],
    },
    phones: {
      type: [String],
      default: [],
    },
    adress: {
      type: addressSchema,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
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

clientSchema.statics.build = (attrs: ClientAttrs) => {
  return new Client(attrs);
};

const Client = model<ClientDoc, ClientModel>("Client", clientSchema);
export { Client };
