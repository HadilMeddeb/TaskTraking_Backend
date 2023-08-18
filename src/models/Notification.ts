import { Schema, model, Model, Document } from "mongoose";

interface NotificationAttrs {
  designation: string;
}

interface NotificationModel extends Model<NotificationDoc> {
  build(attrs: NotificationAttrs): NotificationDoc;
}

interface NotificationDoc extends Document {
  designation: String,
  createdAt : Date
}

const notificationSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
      },
    message: {
      type: String,
      required: true,
    },
    sender: {
        type: String,
        required: true,
      },
    reciever: {
        type: String,
        required: true,
      },
      extra: {
        type: String,
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

notificationSchema.statics.build = (attrs: NotificationAttrs) => {
  return new Notification(attrs);
};

const Notification = model<NotificationDoc, NotificationModel>("Notification", notificationSchema);
export { Notification };
