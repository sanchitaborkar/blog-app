'use server'

import authGuard from "@/lib/authGuard";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/User";

export async function getUserDetails() {
  try {
    await connectDB();

    const { authenticated, user, message } = await authGuard();

    // If not authenticated
    if (!authenticated || !user?.id) {
      return { success: false, message: message || "User not authenticated" };
    }

    // Get user details
    const userDetails = await User.findById(user.id).select("-password").lean();

    if (!userDetails) {
      return { success: false, message: "User not found" };
    }

    return { success: true, user: JSON.parse(JSON.stringify(userDetails)) };
  } catch (error: any) {
    console.error("Error in getUserDetails:", error);
    return { success: false, message: error.message || "Internal Server Error" };
  }
}
export async function updateProfile(payload){
    try {
        console.log(3434, payload)
        await connectDB()
        const authData = await authGuard()
        if(authData.authenticated === false){
            return { success: false, message: "Unauthorized access" };
        }
        const user = await User.findById(authData?.user?.id);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        await User.findByIdAndUpdate(authData?.user?.id, {$set:payload});
        return { success: true, message: "User details updated successfully" };

    } catch (error) {
        console.log(3434, error)
    }
}

