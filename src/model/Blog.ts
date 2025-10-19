import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IBlog extends Document {
  title: string;
  author: IUser["_id"];
  content: string;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to User model
  },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
