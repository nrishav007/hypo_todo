import { Document, Model, model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  mobile: number;
}

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  mobile: Number,
});

const UserModel: Model<IUser> = model<IUser>("User", UserSchema);

export default UserModel;
