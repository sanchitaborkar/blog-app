'use server'

import authGuard from "@/lib/authGuard";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/User";
import { FormDataPayload } from "./auth";

export interface UserData {
  _id?: string;
  name: string;
  email: string;
  dateOfBirth: string;
  password?: string;
}


export interface APIResponse {
  success: boolean;
  message?: string;
}

export async function updateProfile(payload: FormDataPayload) {
  try {
    await connectDB()
    const authData = await authGuard()
    if (authData.authenticated === false) {
      return { success: false, message: authData.message };
    }

    await User.findByIdAndUpdate(authData?.user?._id, { $set: payload });
    return { success: true, message: "User details updated successfully" };

  } catch (error) {
    console.log(3434, error)
  }
}

