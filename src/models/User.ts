import {Schema, model , Model,Document} from "mongoose";
import { Password } from "../services/password";
import { Profile } from "./Profile";

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  username:string,
  email: string;
  password: string;
  role: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends Document {
  username:string,
  email: string;
  password: string;
  role: string;
  status: string;
  profile:Schema.Types.ObjectId
}

const userSchema = new Schema(
  {  username:{
    type: String,
    required: true,
    unique: true,
  },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["gestionnaire", "collaborateur"],
      default: "employee",
    },
    status: {
      type: String,
      required: true,
      default: "Connecté",
      enum: ["Non Connecté", "Connecté"],
    },
   profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (done) {

  // hash password
  if (this.isModified("password")) {
    const hashed = await Password.Tohash(this.get("password"));
    this.set("password", hashed);
  }
    // Create a profile
    if (!this.profile) {
   try
   {
    const profile =Profile.build({user_id:this.id});
    await profile.save();
    this.profile = profile.id;
   }catch(err)
   {
      console.log(err)
   }
    }
  done();
});

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };

