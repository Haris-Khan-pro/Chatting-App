import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true, // Remove whitespace from the beginning and end of the string
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Convert the email to lowercase
      trim: true,
    },
    avatar: {
      type: String, // URL of the avatar image
      default: "",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
