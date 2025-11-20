import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IBlog extends Document {
  title: string;
  content: string;
  image?: string; // 👈 Add this
  author: IUser["_id"];
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // 👈 This will store Cloudinary image URL
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
